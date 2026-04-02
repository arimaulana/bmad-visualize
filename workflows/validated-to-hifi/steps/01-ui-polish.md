# Step 1: UI Polish

## What Happens Here

`@design-system-builder` and `@ux-prototyper` work in parallel to produce a production-ready hi-fi prototype from the validated lo-fi prototype.

UX decisions are locked — do not change any flow, screen, or navigation. This step is purely visual elevation.

Two tracks run simultaneously:

- **Track A** (`@design-system-builder`) — finalize the design system
- **Track B** (`@ux-prototyper`) — rebuild screens with final visual design

Track B cannot complete until Track A is done.

---

## Track A: Finalize Design System — @design-system-builder

### Inputs

- `design-system-spec.yaml` — extend from lo-fi baseline
- `docs/design-system.md` — current state
- `_bmad-output/planning-artifacts/PRD.md` — if available, check for any visual requirements missed in Phase 1
- `_bmad-output/planning-artifacts/product-brief.md` — if available, recheck brand direction

### Run *extend

Starting from the existing Penpot Design System file (ID in `design-system-spec.yaml → penpot.file_id`):

**Tokens page — finalize all values:**
- Complete the full color palette (all 10 shades per color role)
- Finalize semantic colors (success, warning, error, info — light/main/dark)
- Finalize surface tokens (background, surface, surface_raised, border, border_subtle)
- Confirm typography scale — all weights and sizes production-final
- Confirm spacing and border radius — no changes needed unless Phase 1 used placeholder values

**Components page — upgrade to production-ready:**
- Button — all 4 variants × 4 states, final visual style applied
- Input — all 5 states, final style applied
- Card — all 3 variants, final style applied
- Modal — all 3 size variants, final style applied
- Navbar — top and sidebar variants, final style applied
- Table — default, final style applied
- **Add any project-specific components** identified from screen inventory in `prototype-spec.yaml` that were deferred in Phase 1

All variant frames must follow naming: `[Component] / [Variant] / [State]`

### Run *document

Update `docs/design-system.md` to reflect all finalized values and new components.
Update `design-system-spec.yaml` with any new component IDs added.

### Track A Quality Gate

Before signalling Track B to proceed:

- [ ] All color tokens finalized — no placeholder values remaining
- [ ] All 6 base components upgraded to final visual style
- [ ] All deferred project-specific components now built
- [ ] `docs/design-system.md` updated
- [ ] `design-system-spec.yaml` updated

---

## Track B: Rebuild Screens — @ux-prototyper

**Wait for Track A quality gate before starting.**

### Inputs

- `prototype-spec.yaml` — screen and flow definitions (unchanged from Phase 1)
- `docs/design-system.md` — finalized design system (from Track A)
- Existing lo-fi Penpot Prototype file

### Run *polish

For each screen in `prototype-spec.yaml → screens`:

1. Open the existing lo-fi frame in Penpot
2. Rebuild using finalized design system components — replace all placeholder or basic styles
3. Apply final typography, color tokens, spacing, and border radius consistently
4. Use realistic, production-quality content throughout (no Lorem ipsum)
5. Ensure all interactive element names remain exactly as defined in `prototype-spec.yaml → flows[].trigger_element` — do not rename

**Visual elevation checklist per screen:**
- All components sourced from finalized design system (no ad-hoc styles)
- Color tokens applied consistently — no hardcoded hex values
- Typography uses defined scale — no arbitrary font sizes
- Spacing follows the spacing scale
- All states represented where applicable (empty, loading, error)

Frame names must remain exactly as in `prototype-spec.yaml → screens[].name` — flow-wirer.js uses exact string matching.

### Re-wire Flows

After all screens are rebuilt, re-run `tools/flow-wirer.js` to ensure all interactions are intact:

```bash
cd tools
node flow-wirer.js --spec ../templates/prototype-spec.yaml
```

Verify the primary happy path is fully clickable in Penpot prototype mode.

### Track B Quality Gate

- [ ] All screens rebuilt with finalized design system
- [ ] No ad-hoc styles — all values from design tokens
- [ ] All frame names unchanged from Phase 1
- [ ] All trigger element names unchanged from Phase 1
- [ ] No Lorem ipsum or placeholder content
- [ ] flow-wirer.js re-run successfully
- [ ] Primary happy path clickable end-to-end

---

## Proceed To

Step 2 (Final Validation) immediately.
