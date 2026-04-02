# tools/ — bmad-ux-visualizer

Node.js tools that extend the Penpot MCP capabilities with prototype interaction wiring.

## flow-wirer.js

Reads `prototype-spec.yaml` and wires all prototype flows (click interactions, screen-to-screen navigation) into your Penpot file via the Penpot REST API.

This fills the gap in current Penpot MCP servers which do not expose `addInteraction()` / `createFlow()` methods.

### Prerequisites

- Node.js 18+
- Running self-hosted Penpot instance
- Valid Penpot access token
- `prototype-spec.yaml` with `penpot.file_id` set and `flows` populated
- Screens already built in Penpot (via `@ux-prototyper *build` using Penpot MCP)

### Setup

```bash
cd tools
npm install
```

### Usage

```bash
# Basic — reads prototype-spec.yaml from parent directory
node flow-wirer.js

# Custom spec path
node flow-wirer.js --spec /path/to/prototype-spec.yaml

# With explicit credentials
PENPOT_URL=http://localhost:9001 PENPOT_TOKEN=your-token node flow-wirer.js
```

### Configuration

The script resolves credentials in this order:

1. **Environment variables** — `PENPOT_URL`, `PENPOT_TOKEN`
2. **Module config** — `.bmad/ux-visualizer/config.yaml` (set during BMAD module installation)
3. **Local config** — `config.yaml` in parent directory

### prototype-spec.yaml — Flows Format

The script reads the `flows` array from `prototype-spec.yaml`:

```yaml
penpot:
  file_id: "your-penpot-file-uuid"   # required

flows:
  - name: "Login → Dashboard"
    source_frame: "Login Screen"      # exact Penpot frame name
    trigger_element: "Sign In Button" # exact element name inside frame (optional)
    trigger: click                    # click | hover | after-delay
    target_frame: "Dashboard"         # exact Penpot frame name
    transition: dissolve              # dissolve | slide-left | slide-right | slide-up | slide-down | push
    duration: 300                     # ms
    easing: ease                      # ease | ease-in | ease-out | ease-in-out | linear
```

**Important:** Frame names and element names are **case-sensitive** and must exactly match what's in Penpot.

### Supported Transitions

| Value | Description |
|---|---|
| `dissolve` | Cross-fade between screens (default) |
| `slide-left` | New screen slides in from right |
| `slide-right` | New screen slides in from left |
| `slide-up` | New screen slides in from bottom |
| `slide-down` | New screen slides in from top |
| `push` | Source screen pushed out by new screen |

### Troubleshooting

**"Source frame X not found in Penpot"**
The frame name in `prototype-spec.yaml` doesn't match the frame name in Penpot. Frame names are case-sensitive. Check in Penpot's layer panel.

**"401 Unauthorized"**
Your access token is invalid or expired. Generate a new one at Penpot → Profile → Access Tokens.

**"penpot.file_id is not set"**
You need to add the Penpot file ID to `prototype-spec.yaml`. Find the file ID in the Penpot URL when the file is open: `https://your-penpot.com/workspace/YOUR-FILE-ID/...`

**Interactions not visible in Penpot after wiring**
Penpot may need a refresh. Try: Ctrl+R (or Cmd+R) to reload the file. Then switch to Prototype mode (the arrow icon in the right panel).
