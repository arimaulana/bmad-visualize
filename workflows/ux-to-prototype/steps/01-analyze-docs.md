# Step 1: Analyze

## What Happens Here

All agents read their source inputs and extract what they need before any building begins.

This step has two paths depending on the workflow mode. Follow only the path that matches your current mode.

---

## Doc-first Path

### Inputs

| Document | Agent | Required? |
|---|---|---|
| `docs/ux-spec.md` | design-system-builder, ux-prototyper | **Required** |
| `docs/prd.md` | design-system-builder, ux-prototyper | Optional — use if available for business context |
| `docs/architecture.md` / `docs/system-design.md` / `docs/tech-stack.md` | arch-visualizer | Optional — required only if running Step 2 |

If `docs/ux-spec.md` is missing, stop and notify the user. Do not proceed without it.

If `docs/prd.md` is missing, proceed — note gaps in business context when flagging issues.

If architecture docs are missing, skip Step 2 entirely. Note this in the checklist.

---

### @arch-visualizer — *analyze

Reads architecture docs to identify:
- Primary system and its boundaries
- External actors (user personas)
- External systems and integrations
- Critical user flows for sequence diagrams
- Container types and their technologies

**Skip this agent's analysis entirely if architecture docs are not available.**

---

### @design-system-builder — *analyze

Reads UX spec (and PRD if available) to identify:
- Brand language and visual tone
- Color preferences and any brand guidelines
- Typography preferences
- Component inventory (all UI patterns needed across the product)
- Platform target (web / mobile / both)

Populates: `templates/design-system-spec.yaml`

If PRD is absent, note any business context gaps but do not block.

---

### @ux-prototyper — *analyze

Reads UX spec (and PRD if available) to identify:
- Complete screen inventory (every screen/page)
- User flows and navigation paths
- Interactive elements (buttons, links, form submits)
- Content requirements per screen
- Error/edge case screens needed

Populates: `templates/prototype-spec.yaml` → screens and flows sections

---

### Checklist (Doc-first)

- [ ] `docs/ux-spec.md` confirmed present — if missing, stop
- [ ] Arch Visualizer: identified at least 1 external actor, 1 system, 1 external dependency (skip if no arch docs)
- [ ] Arch Visualizer: identified 2+ critical flows for sequence diagrams (skip if no arch docs)
- [ ] Design System Builder: populated `design-system-spec.yaml` with token values and component list
- [ ] UX Prototyper: listed all screens in `prototype-spec.yaml`
- [ ] UX Prototyper: defined at least the primary happy path in `prototype-spec.yaml → flows`
- [ ] Any gaps or missing information flagged

---

## Prototype-first Path

Step 0 (Intake) has already run. `prototype-spec.yaml` and `design-system-spec.yaml` are populated and confirmed by the user.

This step is a **review pass only** — agents verify the populated specs are internally consistent and complete enough to build from. No new inference happens here.

---

### @design-system-builder — *review

Read `design-system-spec.yaml` and verify:
- Tone and platform are specified
- At least a primary color or font direction is present (or confirmed to use defaults)
- Component inventory can be derived from the screen list in `prototype-spec.yaml`

If values are missing and cannot be defaulted, flag to user before proceeding.

---

### @ux-prototyper — *review

Read `prototype-spec.yaml` and verify:
- All screens have a name, device, and description
- All flows have a source frame, trigger element, and target frame
- Primary happy path is complete end-to-end (no dead ends)
- No screen is referenced in flows but missing from the screens list

If any flow references a screen not in the screens list, flag it and ask the user to resolve before proceeding.

---

### Checklist (Prototype-first)

- [ ] `prototype-spec.yaml` confirmed populated (from Step 0)
- [ ] `design-system-spec.yaml` confirmed populated (from Step 0)
- [ ] Design System Builder: no blocking gaps in design-system-spec.yaml
- [ ] UX Prototyper: all screens present and described
- [ ] UX Prototyper: primary happy path complete with no dead ends
- [ ] UX Prototyper: all flow references point to valid screen names
- [ ] Any inconsistencies flagged and resolved before proceeding

---

## Proceed To

Step 2 (Arch Diagrams) — **doc-first only, and only if architecture docs are available**. Otherwise skip to Step 3.

Step 3 (Design System) and Step 2 can run in parallel when both are applicable.
