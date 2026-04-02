# Step 1: Analyze

## What Happens Here

All agents read their source inputs and extract what they need before any building begins.

This step has two paths depending on the workflow mode. Follow only the path that matches your current mode.

---

## Doc-first Path

### Inputs

| Document | Agent | Path | Required? |
|---|---|---|---|
| UX Spec | design-system-builder, ux-prototyper | `docs/ux-spec.md` | **Required** |
| Product Brief | design-system-builder, ux-prototyper | `_bmad-output/planning-artifacts/product-brief.md` | Optional |
| PRD | design-system-builder, ux-prototyper | `_bmad-output/planning-artifacts/PRD.md` | Optional |
| Architecture | arch-visualizer | `_bmad-output/planning-artifacts/architecture.md` | Optional — required only if running Step 2 |

If `docs/ux-spec.md` is missing, stop and notify the user. Do not proceed without it.

For each optional doc: check if the file exists before reading. If missing, note the gap and continue — do not block.

**Priority when multiple docs are available:** PRD > Product Brief > UX Spec for business context. UX Spec is always primary for screen and flow decisions.

---

### Fidelity Question

Before proceeding with analysis, ask the user:

> Is this prototype for UX validation first (lo-fi), or should it be production-ready from the start (hi-fi)?
>
> - **Lo-fi** — focus on flows and structure, visual is basic. After UX is validated and feedback is safe, we run a second phase to polish the UI and finalize the design system — in parallel with system design.
> - **Hi-fi** — one phase, prototype is production-quality from the start.

Record the answer in `prototype-spec.yaml → fidelity`. Do not proceed until this is answered.

---

### @arch-visualizer — *analyze

Reads `_bmad-output/planning-artifacts/architecture.md` to identify:
- Primary system and its boundaries
- External actors (user personas)
- External systems and integrations
- Critical user flows for sequence diagrams
- Container types and their technologies

**Skip this agent's analysis entirely if architecture doc is not available.**

---

### @design-system-builder — *analyze

Reads UX spec and any available supplementary docs to identify:
- Brand language and visual tone
- Color preferences and any brand guidelines
- Typography preferences
- Component inventory (all UI patterns needed across the product)
- Platform target (web / mobile / both)

**Reading priority:**
1. `docs/ux-spec.md` — primary source for visual direction
2. `_bmad-output/planning-artifacts/PRD.md` — business context, feature scope
3. `_bmad-output/planning-artifacts/product-brief.md` — problem space, target users

Populates: `templates/design-system-spec.yaml`

For **lo-fi**: populate only base tokens and core 6 components. Flag extended components as deferred.
For **hi-fi**: populate full token set and complete component list including custom components.

---

### @ux-prototyper — *analyze

Reads UX spec and any available supplementary docs to identify:
- Complete screen inventory (every screen/page)
- User flows and navigation paths
- Interactive elements (buttons, links, form submits)
- Content requirements per screen
- Error/edge case screens needed

**Reading priority:**
1. `docs/ux-spec.md` — primary source for screens and flows
2. `_bmad-output/planning-artifacts/PRD.md` — feature requirements, edge cases, business rules
3. `_bmad-output/planning-artifacts/product-brief.md` — user context, success definition

Populates: `templates/prototype-spec.yaml` → screens, flows, and fidelity sections

---

### Checklist (Doc-first)

- [ ] `docs/ux-spec.md` confirmed present — if missing, stop
- [ ] Fidelity confirmed: lo-fi or hi-fi — recorded in `prototype-spec.yaml → fidelity`
- [ ] Optional docs checked: note which of product-brief.md / PRD.md / architecture.md are available
- [ ] Arch Visualizer: identified at least 1 external actor, 1 system, 1 external dependency (skip if no arch doc)
- [ ] Arch Visualizer: identified 2+ critical flows for sequence diagrams (skip if no arch doc)
- [ ] Design System Builder: populated `design-system-spec.yaml` with token values and component list
- [ ] UX Prototyper: listed all screens in `prototype-spec.yaml`
- [ ] UX Prototyper: defined at least the primary happy path in `prototype-spec.yaml → flows`
- [ ] Any gaps or missing information flagged

---

## Prototype-first Path

Step 0 (Intake) has already run. `prototype-spec.yaml` and `design-system-spec.yaml` are populated and confirmed by the user. Fidelity is already set.

This step is a **review pass only** — agents verify the populated specs are internally consistent and complete enough to build from. No new inference happens here.

---

### @design-system-builder — *review

Read `design-system-spec.yaml` and verify:
- Fidelity is set (lo-fi or hi-fi)
- Tone and platform are specified
- At least a primary color or font direction is present (or confirmed to use defaults)
- Component inventory aligns with the screen list in `prototype-spec.yaml`
- For lo-fi: deferred components are clearly marked

---

### @ux-prototyper — *review

Read `prototype-spec.yaml` and verify:
- Fidelity is set
- All screens have a name, device, and description
- All flows have a source frame, trigger element, and target frame
- Primary happy path is complete end-to-end (no dead ends)
- No screen is referenced in flows but missing from the screens list

If any flow references a screen not in the screens list, flag it and ask the user to resolve before proceeding.

---

### Checklist (Prototype-first)

- [ ] `prototype-spec.yaml` confirmed populated (from Step 0)
- [ ] `design-system-spec.yaml` confirmed populated (from Step 0)
- [ ] Fidelity confirmed in `prototype-spec.yaml → fidelity` (set in Step 0)
- [ ] Design System Builder: no blocking gaps in design-system-spec.yaml
- [ ] UX Prototyper: all screens present and described
- [ ] UX Prototyper: primary happy path complete with no dead ends
- [ ] UX Prototyper: all flow references point to valid screen names
- [ ] Any inconsistencies flagged and resolved before proceeding

---

## Proceed To

Step 2 (Arch Diagrams) — **doc-first only, and only if `_bmad-output/planning-artifacts/architecture.md` is available**. Otherwise skip to Step 3.

Step 3 (Design System) and Step 2 can run in parallel when both are applicable.
