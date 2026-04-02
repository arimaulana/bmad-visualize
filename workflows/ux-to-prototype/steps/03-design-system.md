# Step 3: Build UI Design System

## What Happens Here

`@design-system-builder` creates the full UI design system in Penpot — tokens, base components, and variant frames — then documents it. This runs in parallel with Step 2 and must complete before Step 4.

---

## Agent: @design-system-builder

### Run *build

Create the Penpot Design System file with two pages:

**Page: Tokens**
- Color palette (primary, neutral, semantic, surface)
- Typography scale (H1–H4, body, label, caption)
- Spacing scale (4–96px)
- Border radius tokens (none, sm, md, lg, xl, full)

Use values from `design-system-spec.yaml` (populated in Step 1). Default to `data/design-tokens.yaml` for any values not specified in docs.

**Page: Components**
Build 6 base components with variant frames:
- Button (4 variants × 4 states)
- Input (5 states)
- Card (3 variants)
- Modal (3 size variants)
- Navbar (Top + Sidebar)
- Table (default)

Reference `data/ui-patterns.yaml` for anatomy guidance per component.

After creating the file, record the Penpot file ID in `design-system-spec.yaml → penpot.file_id`.

### Run *document

Generate `docs/design-system.md` using `templates/design-system-doc.md`.

---

## Quality Gate

Before marking this step complete:

- [ ] Penpot Design System file exists and is accessible
- [ ] `design-system-spec.yaml → penpot.file_id` is populated
- [ ] Token page has all 4 color categories, full typography scale, spacing scale, border radius
- [ ] Components page has all 6 base components built
- [ ] All variant frames are clearly labeled with `[Component] / [Variant] / [State]` naming
- [ ] `docs/design-system.md` exists and covers all tokens and components

---

## Output

- Penpot file: `[Project Name] — Design System`
- `docs/design-system.md`
- Updated `design-system-spec.yaml`

These are consumed by:
- `@ux-prototyper` in Step 4 when building screens
- Developers during implementation sprint

## Proceed To

Step 4 (Build Screens) — do not start until this step is complete.
