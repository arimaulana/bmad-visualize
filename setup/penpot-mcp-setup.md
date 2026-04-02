# Penpot MCP Setup Guide

This guide sets up the Penpot MCP server so `@design-system-builder` and `@ux-prototyper` can create frames, components, and shapes in your self-hosted Penpot instance.

---

## Prerequisites

- Self-hosted Penpot running (Docker)
- Claude Code CLI installed

---

## Step 1: Generate a Penpot Access Token

1. Open your Penpot instance in the browser
2. Click your avatar (bottom left) → **Profile settings**
3. Navigate to **Access Tokens**
4. Click **+ New Token** → give it a name (e.g., `bmad-visualize`)
5. Copy the token — you will not be able to see it again

---

## Step 2: Choose a Penpot MCP Server

There are multiple `penpot-mcp-server` packages on npm — they are **not the same**. Only some support write operations (creating frames, shapes, components). Choose carefully.

### Option A: @ancrz/penpot-mcp-server (recommended — 68 tools, full write support)

Python-based. Supports creating frames, shapes, text, components, design tokens, and more via Penpot's RPC API.

**Requires `uv`:**
```bash
brew install uv   # macOS
```

Config:
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

### Option B: @zcubekr/penpot-mcp-server (Node.js, write support)

Node.js alternative with write capabilities. No additional runtime needed beyond Node.js.

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

### Option C: @penpot/mcp (official — arbitrary code execution via browser extension)

The official MCP from the Penpot team. Instead of predefined tools, it lets the LLM execute arbitrary code directly inside the Penpot Plugin environment — maximum flexibility.

Requires a browser extension running in your Penpot instance.

```bash
npx @penpot/mcp@latest
```

Follow setup instructions at: https://github.com/penpot/penpot-mcp

---

> **Warning: `penpot-mcp-server` (without scope) is read-only**
>
> The unscoped `penpot-mcp-server` package on npm (by Mart1M) only exposes 3 read tools:
> `get_board`, `debug_board`, `get_tokens`. It cannot create or modify content in Penpot.
> Do not use it for this workflow.

---

## Step 3: Configure Claude Code

Add the chosen MCP config to your Claude Code settings:

**Global (applies to all projects):** `~/.claude/settings.json`
**Project-level (only this project):** `.claude/settings.json`

Copy the relevant snippet from `setup/claude-mcp-config.json` and merge it into your settings file.

Replace:
- `your-token-here` → your token from Step 1
- `http://localhost:9001` → your Penpot URL if different

---

## Step 4: Configure flow-wirer.js

The `tools/flow-wirer.js` script also needs access to your Penpot instance. Set credentials via:

**Option A — Environment variables (recommended for local dev):**
```bash
export PENPOT_URL=http://localhost:9001
export PENPOT_TOKEN=your-token-here
```

Add these to your shell profile (`~/.zshrc` or `~/.bashrc`) to persist them.

**Option B — Module config:**

Add to `_bmad/ux-visualizer/config.yaml`:
```yaml
penpot_url: http://localhost:9001
penpot_token: your-token-here
```

The `flow-wirer.js` script reads this file automatically.

---

## Step 5: Verify the Setup

Test that the MCP server connects to Penpot:

1. Restart Claude Code (to pick up the new MCP config)
2. In a new conversation, try: `"List my Penpot files"` or `"Create a test frame in Penpot"`
3. If it responds with actual data or creates a frame — the MCP is configured correctly

Test that flow-wirer.js can connect:

```bash
cd tools
npm install
PENPOT_URL=http://localhost:9001 PENPOT_TOKEN=your-token node flow-wirer.js --help
```

---

## Troubleshooting

**Claude can only read Penpot but not create anything**
You have the wrong MCP server installed. Check which package is in your config:
- `penpot-mcp-server` (no scope) → read-only, replace with `@ancrz/penpot-mcp-server` or `@zcubekr/penpot-mcp-server`
- `@ancrz/penpot-mcp-server` → correct, check token permissions
- `@zcubekr/penpot-mcp-server` → correct, check token permissions

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

**`uvx` not found (Option A)**
- Install `uv`: `brew install uv` (macOS) or follow https://docs.astral.sh/uv/getting-started/installation/

**Penpot Docker default ports**
| Service | Default Port |
|---|---|
| Frontend + API | 9001 |
| Exporter | 6061 |
| Backend (internal) | 6060 |
