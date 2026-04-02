# Penpot MCP Setup Guide

This guide sets up the Penpot MCP server so `@design-system-builder` and `@ux-prototyper` can create frames, components, and shapes in your self-hosted Penpot instance.

---

## Prerequisites

- Self-hosted Penpot running (Docker)
- Node.js 18+ installed
- Claude Code CLI installed

---

## Step 1: Generate a Penpot Access Token

1. Open your Penpot instance in the browser
2. Click your avatar (bottom left) → **Profile settings**
3. Navigate to **Access Tokens**
4. Click **+ New Token** → give it a name (e.g., `bmad-ux-visualizer`)
5. Copy the token — you will not be able to see it again

---

## Step 2: Choose a Penpot MCP Server

Two options — pick one:

### Option A: Official Penpot MCP (recommended)

The official MCP from the Penpot team. Uses the Plugin API via a browser extension.

```bash
npx @penpot/mcp@latest
```

Follow the setup instructions at: https://github.com/penpot/penpot-mcp

### Option B: ancrz/penpot-mcp-server

Community MCP server that connects via REST API directly — no browser extension needed.

```bash
npm install -g penpot-mcp-server
```

Repository: https://github.com/ancrz/penpot-mcp-server

---

## Step 3: Configure Claude Code

Add the Penpot MCP server to your Claude Code settings.

Copy the appropriate snippet from `setup/claude-mcp-config.json` and merge it into your Claude Code settings:

**Location:** `~/.claude/settings.json` (global) or `.claude/settings.json` (project-level)

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

Replace `your-token-here` with the token from Step 1.
Replace `http://localhost:9001` with your Penpot URL if different.

---

## Step 4: Configure flow-wirer.js

The `tools/flow-wirer.js` script also needs access to your Penpot instance. Set credentials via:

**Option A — Environment variables (recommended for local dev):**
```bash
export PENPOT_URL=http://localhost:9001
export PENPOT_TOKEN=your-token-here
```

Add these to your shell profile (`~/.zshrc` or `~/.bashrc`) to persist them.

**Option B — BMAD module config (set automatically during installation):**

When the BMAD installer runs `module.yaml → configPrompts`, it saves config to:
`.bmad/ux-visualizer/config.yaml`

The `flow-wirer.js` script reads this file automatically.

---

## Step 5: Verify the Setup

Test that the MCP server connects to Penpot:

1. Restart Claude Code (to pick up the new MCP config)
2. In a new conversation, try: `"List my Penpot files"` or `"Create a test frame in Penpot"`
3. If it works — the MCP is configured correctly

Test that flow-wirer.js can connect:

```bash
cd tools
npm install
PENPOT_URL=http://localhost:9001 PENPOT_TOKEN=your-token node flow-wirer.js --help
```

---

## Troubleshooting

**MCP server not responding**
- Check that the MCP process started: look for it in Claude Code's status
- Verify the token is correct and not expired
- Verify the Penpot URL is reachable from your machine

**401 Unauthorized in flow-wirer.js**
- Regenerate the access token in Penpot (Profile → Access Tokens)
- Update both MCP config and environment variable

**Penpot URL not reachable**
- Confirm your Docker Penpot containers are running: `docker ps`
- Check the port — default is 9001 for the frontend + API

**Penpot Docker default ports**
| Service | Default Port |
|---|---|
| Frontend + API | 9001 |
| Exporter | 6061 |
| Backend (internal) | 6060 |

The URL for the API is the same as the frontend: `http://localhost:9001`
