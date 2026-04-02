# bmad-visualize

A BMAD module that bridges the gap between UX documents (or a rough brainstorm) and a validated, clickable Penpot prototype — before Epic & Stories are written.

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
- [BMAD Core](https://github.com/bmad-method/BMAD-METHOD) set up
- Self-hosted [Penpot](https://penpot.app) running (Docker)
- Node.js 18+

---

## Installation

### 1. Clone this repo into your BMAD modules directory

```bash
git clone https://github.com/arimaulana/bmad-visualize.git
```

Or add it as a submodule if your BMAD workspace is a git repo:

```bash
git submodule add https://github.com/arimaulana/bmad-visualize.git modules/bmad-visualize
```

### 2. Generate a Penpot access token

1. Open your Penpot instance
2. Click your avatar (bottom left) → **Profile settings** → **Access Tokens**
3. Click **+ New Token**, name it (e.g. `bmad-visualize`)
4. Copy the token — you won't see it again

### 3. Configure the Penpot MCP server

Add the Penpot MCP to your Claude Code settings. Choose one option:

**Option A — ancrz/penpot-mcp-server (REST API, no browser extension needed)**

Add to `~/.claude/settings.json` (global) or `.claude/settings.json` (project-level):

```json
{
  "mcpServers": {
    "penpot": {
      "command": "npx",
      "args": ["-y", "penpot-mcp-server"],
      "env": {
        "PENPOT_BASE_URL": "http://localhost:9001",
        "PENPOT_ACCESS_TOKEN": "your-token-here"
      }
    }
  }
}
```

**Option B — official @penpot/mcp (requires browser extension running in Penpot)**

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

Replace `your-token-here` with the token from step 2. Replace `http://localhost:9001` if your Penpot runs on a different URL.

### 4. Set up flow-wirer.js

Install dependencies for the interaction wiring tool:

```bash
cd tools
npm install
```

Set your Penpot credentials so the script can connect:

```bash
export PENPOT_URL=http://localhost:9001
export PENPOT_TOKEN=your-token-here
```

Add these to `~/.zshrc` or `~/.bashrc` to persist them.

### 5. Restart Claude Code

Restart Claude Code to pick up the new MCP config.

Verify the connection by asking Claude: `"List my Penpot files"` — if it responds with your files, the MCP is working.

---

## Usage

### Doc-first

Ensure you have at minimum `docs/ux-spec.md` in your project. Then run the workflow:

```
Run the ux-to-prototype workflow in doc-first mode
```

Optional additional docs Claude will use if present:
- `docs/prd.md` — business context
- `docs/architecture.md` / `docs/system-design.md` — for C4 architecture diagrams

### Prototype-first

Write a `docs/brainstorm.md` with your raw idea — bullet points, paragraphs, rough notes, anything. Then:

```
Run the ux-to-prototype workflow in prototype-first mode
```

Claude will run a structured elicitation session, ask you questions you may not have thought of, infer the full spec, show you a confirmation summary, and only start building after you approve.

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
