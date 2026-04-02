# Prototype Validation Checklist

> Used by `@ux-prototyper` during `*validate` before proceeding to Epic & Stories.
> Date: [date] | Prototype: [Penpot file name] | Share link: [link]

---

## Part 1: Developer Self-Review

### Screens Completeness
- [ ] All screens defined in `prototype-spec.yaml` are built in Penpot
- [ ] No screen is empty, skeleton-only, or uses Lorem ipsum content
- [ ] Frame names in Penpot exactly match `prototype-spec.yaml → screens[].name`
- [ ] Correct device dimensions per screen (desktop 1440×900 / mobile 375×812 / tablet 768×1024)

### Flows & Interactions
- [ ] All flows in `prototype-spec.yaml → flows` are wired and functional
- [ ] Primary happy path is clickable end-to-end without dead ends
- [ ] At least one error/edge case flow is wired (e.g., validation error, empty state, not found)
- [ ] No flow points to a non-existent frame
- [ ] Back navigation works where applicable (modal close, back button, breadcrumb)

### Design Consistency
- [ ] All screens use only components from the design system
- [ ] No ad-hoc colors outside the token palette
- [ ] No ad-hoc typography outside the type scale
- [ ] Spacing follows the 4px base grid
- [ ] Component variants and states match design-system specs

### Content Quality
- [ ] All CTA labels are final or near-final (not "Button", "Click Here", "Link")
- [ ] Form fields have correct labels and placeholder text
- [ ] Sample data is realistic and plausible (real-looking names, emails, numbers)
- [ ] Error messages are actual error messages

### Coverage
- [ ] All user personas from the PRD can walk through at least one flow
- [ ] All primary features from the PRD have at least one screen
- [ ] Edge cases from UX Spec are either prototyped or explicitly noted as deferred

---

## Part 2: Stakeholder Review (via Share Link)

Share the Penpot prototype link with stakeholders and collect feedback on:

**Usability**
- [ ] Primary flow is intuitive without explanation
- [ ] Navigation is clear and consistent across screens
- [ ] CTAs are prominent and their purpose is obvious

**Completeness**
- [ ] All expected screens are present
- [ ] No major flows are missing
- [ ] Content and labels feel correct for the target users

**Design Alignment**
- [ ] Visual style matches the product's intended tone
- [ ] Component usage feels consistent
- [ ] Nothing feels out of place or confusing

---

## Results

| Category | Status | Notes |
|---|---|---|
| Screens Completeness | PASS / FAIL | |
| Flows & Interactions | PASS / FAIL | |
| Design Consistency | PASS / FAIL | |
| Content Quality | PASS / FAIL | |
| Coverage | PASS / FAIL | |
| Stakeholder Review | PASS / FAIL / PENDING | |

---

## Known Gaps / Deferred Items

| Item | Reason Deferred | Owner |
|---|---|---|
| | | |

---

## Recommendation

**[ ] PROCEED** — Prototype is complete. Hand off to BMAD Story and Epic agents.

**[ ] REVISE** — Issues found. See next steps below.

### If REVISE: Required Changes

1. [Specific change needed]
2. [Specific change needed]

**Re-entry point after revision:**
- [ ] Restart from `*analyze` (source docs changed significantly)
- [ ] Restart from `*build` (screens need rebuilding)
- [ ] Fix in Penpot directly, then re-run `*validate`
