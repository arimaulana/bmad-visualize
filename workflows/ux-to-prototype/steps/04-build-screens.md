# Step 4: Build Prototype Screens

## What Happens Here

`@ux-prototyper` builds all screens in Penpot using design system components. Screens must be complete before flows are wired in Step 5.

**Prerequisite:** Step 3 (Design System) must be complete.

---

## Agent: @ux-prototyper

### Run *build (screen construction phase)

1. Create the Penpot Prototype file: `[Project Name] — Prototype`
2. Record file ID in `prototype-spec.yaml → penpot.file_id`
3. Build each screen from `prototype-spec.yaml → screens` in flow order

**Per screen:**
- Create frame at correct device dimensions
- Name the frame exactly as in `prototype-spec.yaml` (case-sensitive)
- Build layout using design system components from `docs/design-system.md`
- Use realistic content throughout (no Lorem ipsum)
- Name interactive elements exactly as defined in `prototype-spec.yaml → flows[].trigger_element`

**Build order:** Primary happy path first → secondary flows → error/edge case screens.

---

## Naming Rules (Critical)

Frame names and element names in Penpot must exactly match `prototype-spec.yaml`:

```
prototype-spec.yaml → screens[].name  ←→  Penpot frame name
prototype-spec.yaml → flows[].source_frame  ←→  Penpot frame name (same)
prototype-spec.yaml → flows[].trigger_element  ←→  Penpot element name inside frame
```

`flow-wirer.js` uses exact string matching — any mismatch means the interaction won't wire.

---

## Quality Gate

Before moving to Step 5:

- [ ] All screens in `prototype-spec.yaml` are built in Penpot
- [ ] All frame names exactly match `prototype-spec.yaml → screens[].name`
- [ ] All trigger element names match `prototype-spec.yaml → flows[].trigger_element`
- [ ] No screen uses Lorem ipsum or placeholder CTAs
- [ ] All screens use only design system components
- [ ] `prototype-spec.yaml → penpot.file_id` is set

---

## Output

Penpot Prototype file with all screens built — ready for interaction wiring in Step 5.

## Proceed To

Step 5 (Wire Flows) immediately.
