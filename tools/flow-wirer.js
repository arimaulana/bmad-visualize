#!/usr/bin/env node
/**
 * flow-wirer.js — bmad-ux-visualizer
 *
 * Reads prototype-spec.yaml and wires Penpot prototype interactions
 * via the Penpot REST API. Fills the gap left by Penpot MCP servers
 * which do not currently expose prototype flow methods.
 *
 * Usage:
 *   node flow-wirer.js
 *   node flow-wirer.js --spec ../prototype-spec.yaml
 *   PENPOT_URL=http://localhost:9001 PENPOT_TOKEN=xxx node flow-wirer.js
 */

import { readFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';
import { load } from 'js-yaml';

const __dirname = dirname(fileURLToPath(import.meta.url));

// -----------------------------------------------------------------------
// CONFIG — resolve from environment, then module config, then defaults
// -----------------------------------------------------------------------

function loadModuleConfig() {
  const configPaths = [
    resolve(__dirname, '../.bmad/ux-visualizer/config.yaml'),
    resolve(__dirname, '../config.yaml'),
  ];
  for (const p of configPaths) {
    try {
      return load(readFileSync(p, 'utf8')) ?? {};
    } catch {
      // not found — try next
    }
  }
  return {};
}

const moduleConfig = loadModuleConfig();

const PENPOT_URL   = (process.env.PENPOT_URL   || moduleConfig.penpot_url   || 'http://localhost:9001').replace(/\/$/, '');
const PENPOT_TOKEN = process.env.PENPOT_TOKEN   || moduleConfig.penpot_token || '';

if (!PENPOT_TOKEN) {
  console.error([
    '',
    'Error: Penpot access token not found.',
    '',
    'Set it via one of:',
    '  1. Environment variable:  PENPOT_TOKEN=your-token node flow-wirer.js',
    '  2. Module config:         .bmad/ux-visualizer/config.yaml → penpot_token',
    '',
    'Generate a token at: Penpot → Profile → Access Tokens',
    '',
  ].join('\n'));
  process.exit(1);
}

// -----------------------------------------------------------------------
// CLI ARGS
// -----------------------------------------------------------------------

const args = process.argv.slice(2);
const specFlag = args.indexOf('--spec');
const specPath = specFlag !== -1 && args[specFlag + 1]
  ? resolve(process.cwd(), args[specFlag + 1])
  : resolve(__dirname, '../prototype-spec.yaml');

// -----------------------------------------------------------------------
// LOAD SPEC
// -----------------------------------------------------------------------

let spec;
try {
  spec = load(readFileSync(specPath, 'utf8'));
} catch (err) {
  console.error(`Error: Could not read spec file at ${specPath}`);
  console.error(err.message);
  process.exit(1);
}

const fileId = spec?.penpot?.file_id;
if (!fileId) {
  console.error([
    '',
    'Error: penpot.file_id is not set in prototype-spec.yaml.',
    '',
    'Run @ux-prototyper *build first to create the Penpot prototype file,',
    'then add the file ID to prototype-spec.yaml → penpot.file_id.',
    '',
  ].join('\n'));
  process.exit(1);
}

const flows = spec?.flows ?? [];
if (flows.length === 0) {
  console.log('No flows defined in prototype-spec.yaml. Nothing to wire.');
  process.exit(0);
}

// -----------------------------------------------------------------------
// HTTP HELPERS
// -----------------------------------------------------------------------

const baseHeaders = {
  'Content-Type': 'application/json',
  'Authorization': `Token ${PENPOT_TOKEN}`,
};

async function penpotGet(path) {
  const res = await fetch(`${PENPOT_URL}${path}`, { headers: baseHeaders });
  if (!res.ok) {
    const body = await res.text().catch(() => '');
    throw new Error(`GET ${path} → ${res.status} ${res.statusText}\n${body}`);
  }
  return res.json();
}

async function penpotPost(path, body) {
  const res = await fetch(`${PENPOT_URL}${path}`, {
    method: 'POST',
    headers: baseHeaders,
    body: JSON.stringify(body),
  });
  if (!res.ok) {
    const text = await res.text().catch(() => '');
    throw new Error(`POST ${path} → ${res.status} ${res.statusText}\n${text}`);
  }
  return res.json();
}

// -----------------------------------------------------------------------
// PENPOT FILE HELPERS
// -----------------------------------------------------------------------

async function getFileData(fileId) {
  return penpotGet(`/api/rpc/command/get-file?file-id=${fileId}&features=[]`);
}

/**
 * Build a flat map of frame name → { id, pageId } for all frames in the file.
 * Penpot stores pages and shapes in the file's data object.
 */
function buildFrameMap(fileData) {
  const map = {};

  const pagesIndex = fileData?.data?.pages ?? [];
  const pagesObjects = fileData?.data?.['pages-index'] ?? {};

  for (const pageId of pagesIndex) {
    const page = pagesObjects[pageId];
    if (!page) continue;

    const objects = page.objects ?? {};
    for (const [, shape] of Object.entries(objects)) {
      if (shape.type === 'frame' && shape.name) {
        // Use first match — warn on duplicates
        if (map[shape.name]) {
          console.warn(`  Warning: Duplicate frame name "${shape.name}" found. Using first occurrence.`);
        } else {
          map[shape.name] = { id: shape.id, pageId };
        }
      }
    }
  }

  return map;
}

/**
 * Within a page's objects, find a child shape by exact name under a given parent frame.
 */
function findChildByName(pageObjects, parentId, childName) {
  for (const [, shape] of Object.entries(pageObjects)) {
    if (shape.name === childName && shape.parent === parentId) {
      return shape.id;
    }
  }
  return null;
}

/**
 * Build a Penpot interaction object from a flow definition.
 */
function buildInteraction(flow, targetFrameId) {
  const animationTypeMap = {
    'dissolve':    'dissolve',
    'slide-left':  'slide',
    'slide-right': 'slide',
    'slide-up':    'slide',
    'slide-down':  'slide',
    'push':        'push',
  };

  const directionMap = {
    'slide-left':  'left',
    'slide-right': 'right',
    'slide-up':    'up',
    'slide-down':  'down',
  };

  const animationType = animationTypeMap[flow.transition] ?? 'dissolve';
  const direction = directionMap[flow.transition];

  const animation = {
    'animation-type': animationType,
    duration: flow.duration ?? 300,
    easing: flow.easing ?? 'ease',
  };

  if (direction) {
    animation.direction = direction;
  }

  return {
    'action-type': 'navigate',
    destination: targetFrameId,
    'event-type': flow.trigger ?? 'click',
    animation,
  };
}

/**
 * Apply an interaction to a shape via Penpot's update-file API.
 */
async function applyInteraction(fileId, pageId, shapeId, interaction) {
  const sessionId = crypto.randomUUID();

  return penpotPost('/api/rpc/command/update-file', {
    'file-id':   fileId,
    'session-id': sessionId,
    revn: 0,
    changes: [
      {
        type:      'mod-obj',
        'page-id': pageId,
        id:        shapeId,
        operations: [
          {
            type: 'set',
            attr: 'interactions',
            val:  [interaction],
          },
        ],
      },
    ],
  });
}

// -----------------------------------------------------------------------
// MAIN
// -----------------------------------------------------------------------

async function main() {
  console.log('');
  console.log('flow-wirer.js — bmad-ux-visualizer');
  console.log('─'.repeat(50));
  console.log(`Penpot:   ${PENPOT_URL}`);
  console.log(`File ID:  ${fileId}`);
  console.log(`Spec:     ${specPath}`);
  console.log(`Flows:    ${flows.length} defined`);
  console.log('─'.repeat(50));

  // Fetch file data
  console.log('\nFetching Penpot file data...');
  let fileData;
  try {
    fileData = await getFileData(fileId);
  } catch (err) {
    console.error(`\nFailed to fetch file data:\n${err.message}`);
    console.error('\nCheck that:');
    console.error('  - PENPOT_URL points to a running Penpot instance');
    console.error('  - PENPOT_TOKEN is valid');
    console.error('  - penpot.file_id in prototype-spec.yaml is correct');
    process.exit(1);
  }

  const frameMap = buildFrameMap(fileData);
  const frameCount = Object.keys(frameMap).length;
  console.log(`Found ${frameCount} frames across all pages.\n`);

  if (frameCount === 0) {
    console.error('No frames found in the Penpot file. Build screens first with @ux-prototyper *build.');
    process.exit(1);
  }

  // Wire each flow
  let wired = 0;
  let skipped = 0;
  let failed = 0;

  for (const flow of flows) {
    const flowName = flow.name || `${flow.source_frame} → ${flow.target_frame}`;

    // Resolve source and target frames
    const sourceFrame = frameMap[flow.source_frame];
    const targetFrame = frameMap[flow.target_frame];

    if (!sourceFrame) {
      console.warn(`  SKIP  "${flowName}"`);
      console.warn(`        Source frame "${flow.source_frame}" not found in Penpot.`);
      console.warn(`        Available frames: ${Object.keys(frameMap).slice(0, 5).join(', ')}...`);
      skipped++;
      continue;
    }

    if (!targetFrame) {
      console.warn(`  SKIP  "${flowName}"`);
      console.warn(`        Target frame "${flow.target_frame}" not found in Penpot.`);
      skipped++;
      continue;
    }

    // Resolve trigger shape — default to source frame itself
    const pagesObjects = fileData?.data?.['pages-index'] ?? {};
    const pageObjects = pagesObjects[sourceFrame.pageId]?.objects ?? {};

    let triggerShapeId = sourceFrame.id;
    if (flow.trigger_element) {
      const found = findChildByName(pageObjects, sourceFrame.id, flow.trigger_element);
      if (!found) {
        console.warn(`  SKIP  "${flowName}"`);
        console.warn(`        Trigger element "${flow.trigger_element}" not found in frame "${flow.source_frame}".`);
        console.warn(`        Using whole frame as trigger instead.`);
        // Fall back to frame-level trigger rather than skipping entirely
      } else {
        triggerShapeId = found;
      }
    }

    // Build and apply interaction
    const interaction = buildInteraction(flow, targetFrame.id);

    try {
      await applyInteraction(fileId, sourceFrame.pageId, triggerShapeId, interaction);
      const triggerLabel = flow.trigger_element ? `"${flow.trigger_element}"` : 'whole frame';
      console.log(`  ✓  "${flowName}"`);
      console.log(`     ${flow.source_frame} [${triggerLabel}] → ${flow.target_frame} (${flow.trigger ?? 'click'} / ${flow.transition ?? 'dissolve'})`);
      wired++;
    } catch (err) {
      console.error(`  ✗  "${flowName}"`);
      console.error(`     ${err.message}`);
      failed++;
    }
  }

  // Summary
  console.log('');
  console.log('─'.repeat(50));
  console.log(`Done.  Wired: ${wired}  |  Skipped: ${skipped}  |  Failed: ${failed}`);

  if (wired > 0) {
    console.log('\nOpen Penpot and click ▶ (Play) to preview the prototype.');
  }

  if (skipped > 0 || failed > 0) {
    console.log('\nFor skipped/failed flows, verify that frame and element names in');
    console.log('prototype-spec.yaml exactly match the names in Penpot (case-sensitive).');
  }

  console.log('');

  if (failed > 0) {
    process.exit(1);
  }
}

main().catch(err => {
  console.error('\nFatal error:', err.message);
  process.exit(1);
});
