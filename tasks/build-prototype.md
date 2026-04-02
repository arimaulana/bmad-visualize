# Task: Build Prototype in Penpot

## Purpose
Build all screens in Penpot using established design system components, then wire all prototype interactions using `tools/flow-wirer.js` to produce a fully clickable prototype.

## Applicable Agent
`@ux-prototyper` — run after `*analyze` is complete and Design System Builder's `*build` is done.

## Prerequisites
- `prototype-spec.yaml` is populated with screens and flows from `*analyze`
- `docs/design-system.md` exists (from Design System Builder)
- `design-system-spec.yaml` has `penpot.file_id` for the design system file
- Penpot MCP is configured and running
- Node.js is installed (for flow-wirer.js)

---

## Process

### Step 1: Create the Prototype File

Via Penpot MCP, create a new file:
- **File name:** `[Project Name] — Prototype`
- Create one page per major flow group, or a single `All Screens` page for projects with fewer than 8 screens
- Record the file ID in `prototype-spec.yaml → penpot.file_id`

---

### Step 2: Build Screens

Process screens in flow order — build the primary happy path first, then secondary flows, then error states.

For each screen in `prototype-spec.yaml → screens`:

1. **Create a frame** with correct device dimensions:
   - Desktop: 1440 × 900
   - Mobile: 375 × 812
   - Tablet: 768 × 1024

2. **Name the frame exactly** as defined in `prototype-spec.yaml` (flow-wirer.js uses exact string matching)

3. **Build the layout** using components from the design system:
   - Reference `docs/design-system.md` for component variants and states
   - Use the Navbar component from the design system for navigation
   - Do not create ad-hoc colors or typography — use only design tokens

4. **Use realistic content:**
   - Real product name and labels (not "Button" or "Link")
   - Plausible sample data (real names, real-looking emails, realistic numbers)
   - Correct CTA text from the UX Spec
   - Error messages should be actual error messages, not "Error occurred"

5. **Name interactive elements** that will be trigger points for flows using the exact names defined in `prototype-spec.yaml → flows[].trigger_element`

---

### Step 3: Update prototype-spec.yaml

After all screens are built, verify and update `prototype-spec.yaml`:

- Confirm all frame names in Penpot match the `screens[].name` values exactly
- For each flow, confirm `trigger_element` names match the actual element names in Penpot
- Add `penpot.file_id` if not already set
- Set `penpot.prototype_page` to the page name containing the screens

---

### Step 4: Wire Prototype Interactions

Run the flow-wirer script from the `tools/` directory:

```bash
cd tools
npm install       # first time only
node flow-wirer.js --spec ../prototype-spec.yaml
```

The script will:
1. Connect to Penpot using the configured URL and token
2. Fetch the file data to resolve frame names to IDs
3. Apply interactions to each trigger element via Penpot REST API
4. Report success/failure for each flow

If any flows fail, check:
- Frame names in Penpot match exactly (case-sensitive)
- `penpot.file_id` is correctly set in `prototype-spec.yaml`
- `PENPOT_TOKEN` or module config has a valid access token

---

### Step 5: Verify in Penpot

Open the prototype in Penpot and verify:
- Click "Play" on the prototype to enter preview mode
- Walk through the primary flow end-to-end
- Confirm interactions trigger correctly
- Note any broken connections for fixing before `*validate`

---

## Output

- Penpot file: `[Project Name] — Prototype` with all screens built and flows wired
- Updated `prototype-spec.yaml` with `penpot.file_id`
- Prototype is ready for `*validate`
