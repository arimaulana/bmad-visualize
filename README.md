# bmad-visualize

A BMAD expansion pack that bridges the gap between UX documents (or a rough brainstorm) and a validated, clickable Penpot prototype — before Epic & Stories are written.

Generates C4 architecture diagrams, builds a full UI design system in Penpot, constructs all screens, wires interactions, and runs a validation gate.

---

## Two Modes

**Doc-first** — you already have BMAD documents and want to visualize them as a prototype before writing stories.

```
UX Spec (required) + PRD + Arch Docs (optional)
  → Design System → Screens → Clickable Prototype → Validation
  → Hand off to Story Agent
```

**Prototype-first** — you have a rough idea and want to validate it visually before writing any formal document.

```
Brainstorm doc (free-form notes)
  → Elicitation → Spec Confirmation
  → Design System → Screens → Clickable Prototype → Validation
  → PRD → Architecture → Hand off to Story Agent
```

---

## Prerequisites

- [Claude Code](https://claude.ai/code) installed
- [BMAD Core](https://github.com/bmad-code-org/BMAD-METHOD) set up in your project (`npx bmad-method install`)
- Self-hosted [Penpot](https://penpot.app) running (Docker)
- Node.js 18+

---

## Installation

BMAD's community module marketplace is coming — for now, installation is manual.

### 1. Add this pack to your BMAD project

From your project root (where `_bmad/` lives), clone this repo into the `expansion-packs/` directory:

```bash
mkdir -p expansion-packs
git clone https://github.com/arimaulana/bmad-visualize.git expansion-packs/bmad-visualize
```

Or as a submodule:

```bash
git submodule add https://github.com/arimaulana/bmad-visualize.git expansion-packs/bmad-visualize
```

Your project structure will look like:

```
your-project/
├── _bmad/                          # BMAD Core
├── expansion-packs/
│   └── bmad-visualize/             # this pack
│       ├── agents/
│       ├── workflows/
│       ├── templates/
│       ├── data/
│       ├── tools/
│       └── module.yaml
├── docs/                           # your project docs
└── ...
```

### 2. Register the agents with Claude Code

Copy the agent files into your project's Claude commands directory so Claude Code can reference them:

```bash
mkdir -p .claude/commands
cp expansion-packs/bmad-visualize/agents/*.md .claude/commands/
```

### 3. Save the module config

Create the config file that stores your Penpot connection details:

```bash
mkdir -p _bmad/ux-visualizer
```

Create `_bmad/ux-visualizer/config.yaml`:

```yaml
penpot_url: http://localhost:9001
penpot_token: your-token-here
```

Replace with your actual Penpot URL and token (see step 4 for how to get the token).

### 4. Generate a Penpot access token

1. Open your Penpot instance
2. Click your avatar (bottom left) → **Profile settings** → **Access Tokens**
3. Click **+ New Token**, name it (e.g. `bmad-visualize`)
4. Copy the token — you won't see it again
5. Paste it into `_bmad/ux-visualizer/config.yaml`

### 5. Configure the Penpot MCP server

> **Warning:** There are multiple `penpot-mcp-server` packages on npm and they are not the same. The unscoped `penpot-mcp-server` (no `@` prefix) is **read-only** — it cannot create content in Penpot. Use one of the scoped packages below.

Add to `~/.claude/settings.json` (global) or `.claude/settings.json` (project-level):

**Option A — `@ancrz/penpot-mcp-server` (recommended — Python, 68 tools, full write support)**

Requires `uv`: `brew install uv`

```json
{
  "mcpServers": {
    "penpot": {
      "command": "uvx",
      "args": ["@ancrz/penpot-mcp-server"],
      "env": {
        "PENPOT_BASE_URL": "http://localhost:9001",
        "PENPOT_ACCESS_TOKEN": "your-token-here"
      }
    }
  }
}
```

**Option B — `@zcubekr/penpot-mcp-server` (Node.js, write support)**

```json
{
  "mcpServers": {
    "penpot": {
      "command": "npx",
      "args": ["-y", "@zcubekr/penpot-mcp-server"],
      "env": {
        "PENPOT_BASE_URL": "http://localhost:9001",
        "PENPOT_ACCESS_TOKEN": "your-token-here"
      }
    }
  }
}
```

**Option C — `@penpot/mcp` (official, requires browser extension)**

```json
{
  "mcpServers": {
    "penpot": {
      "command": "npx",
      "args": ["-y", "@penpot/mcp"],
      "env": {
        "PENPOT_BASEURL": "http://localhost:9001",
        "PENPOT_ACCESS_TOKEN": "your-token-here"
      }
    }
  }
}
```

Replace `your-token-here` with the token from step 4. Replace `http://localhost:9001` if your Penpot runs on a different URL.

### 6. Set up flow-wirer.js

Install dependencies for the interaction wiring tool:

```bash
cd expansion-packs/bmad-visualize/tools
npm install
```

### 7. Restart Claude Code

Restart Claude Code to pick up the new MCP config and agent files.

Verify the connection by asking Claude: `"List my Penpot files"` — if it responds with your files, the MCP is working.

---

## Usage

### Doc-first

Ensure you have at minimum `docs/ux-spec.md` in your project. Then tell Claude:

```
Read expansion-packs/bmad-visualize/workflows/ux-to-prototype/workflow.yaml
and run the ux-to-prototype workflow in doc-first mode.
```

Optional additional docs Claude will use if present:
- `docs/prd.md` — business context
- `docs/architecture.md` / `docs/system-design.md` — for C4 architecture diagrams

### Prototype-first

Write a `docs/brainstorm.md` with your raw idea — bullet points, paragraphs, rough notes, anything. Then tell Claude:

```
Read expansion-packs/bmad-visualize/workflows/ux-to-prototype/workflow.yaml
and run the ux-to-prototype workflow in prototype-first mode.
My brainstorm doc is at docs/brainstorm.md.
```

Claude will run a structured elicitation session, ask questions you may not have thought of, infer the full spec, show a confirmation summary, and only start building after you approve.

---

## Workflow Overview

| Step | Doc-first | Prototype-first |
|---|---|---|
| 00 — Intake & Elicitation | — | Brainstorm → questions → spec confirmation |
| 01 — Analyze | Read UX spec, PRD, arch docs | Review confirmed spec |
| 02 — Arch Diagrams | Optional (needs arch docs) | Skipped |
| 03 — Design System | Build in Penpot | Build in Penpot |
| 04 — Build Screens | Build in Penpot | Build in Penpot |
| 05 — Wire Flows | flow-wirer.js | flow-wirer.js |
| 06 — Validation Gate | PROCEED or REVISE | PROCEED or REVISE |
| 07 — Revise or Proceed | Hand off to Story Agent | Hand off to PM Agent → Arch Agent → Story Agent |

---

## Agents

| Agent | Role |
|---|---|
| `@arch-visualizer` | Reads architecture docs, generates C4 diagrams (doc-first only) |
| `@design-system-builder` | Builds Penpot design system — tokens, components |
| `@ux-prototyper` | Runs elicitation, builds screens, wires flows, validates |

---

## Troubleshooting

See [`setup/penpot-mcp-setup.md`](setup/penpot-mcp-setup.md) for detailed troubleshooting on MCP connection issues.

See [`tools/README.md`](tools/README.md) for flow-wirer.js troubleshooting.
