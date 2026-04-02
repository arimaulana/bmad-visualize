# Task: Validation Gate

## Purpose
Run a structured validation checklist to confirm the prototype is complete, consistent, and ready for stakeholder review — before proceeding to Epic & Stories.

## Applicable Agent
`@ux-prototyper` — run after `*build` is complete and prototype interactions are wired.

---

## Process

### Step 1: Run the Completeness Checklist

Go through each item in `templates/validation-checklist.md`. For each item, determine PASS or FAIL and note any issues.

**Screens**
- [ ] All screens defined in `prototype-spec.yaml → screens` are built in Penpot
- [ ] No screen is empty, skeleton-only, or uses Lorem ipsum content
- [ ] Frame names in Penpot match `prototype-spec.yaml` exactly
- [ ] Correct device dimensions used per screen's target device

**Flows & Interactions**
- [ ] All flows defined in `prototype-spec.yaml → flows` are wired and functional
- [ ] Primary happy path is clickable end-to-end without dead ends
- [ ] At least one error/edge case flow is wired (empty state, validation error, not found, etc.)
- [ ] No flow points to a non-existent screen
- [ ] Back navigation works where applicable

**Design Consistency**
- [ ] All screens use only components from the design system
- [ ] No ad-hoc colors outside the token palette
- [ ] No ad-hoc typography outside the type scale
- [ ] Spacing follows the 4px base grid
- [ ] Component states match design-system specs (e.g., buttons are correct size and padding)

**Content Quality**
- [ ] All CTA labels are final or near-final (not "Click Here" or "Button")
- [ ] Form fields have correct labels and placeholder text
- [ ] Sample data is realistic and plausible
- [ ] Error messages are actual error messages, not "Error occurred"

**Coverage**
- [ ] All user personas from the PRD have at least one flow they can walk through
- [ ] All primary features from the PRD have at least one screen representation
- [ ] Edge cases flagged in the UX Spec are either prototyped or explicitly deferred with a note

---

### Step 2: Generate Share Link

In Penpot, enable the prototype share link:
1. Open the prototype file
2. Go to Share (top right) → Enable "Anyone with the link"
3. Set the link to start from the first screen of the primary flow
4. Copy the link

Include the share link in the validation report.

---

### Step 3: Generate Validation Report

Create `docs/prototype-validation.md` with:

```
# Prototype Validation Report
Date: [date]
Prototype file: [Penpot file name]
Share link: [link]

## Checklist Results
[PASS/FAIL per checklist item]

## Known Gaps / TODOs
[List any items that are deferred or incomplete, with reason]

## Recommendation
PROCEED / REVISE

## If REVISE: Next Steps
[Specific items that need to change in docs or prototype before re-validation]
```

---

### Step 4: Determine Outcome

**If all critical items PASS (or only minor TODOs remain):**
- Status: PROCEED
- Hand off to BMAD Story and Epic agents
- The prototype serves as the visual reference for all stories

**If any critical item FAILS:**
- Status: REVISE
- Identify whether the issue is in the prototype (fix in Penpot) or in the source docs (use `*revise`)
- Call `*revise` with the validation report as input
- After revisions are made, re-run `*validate`

---

## Output

- `docs/prototype-validation.md` with full checklist results and recommendation
- Penpot share link for stakeholder review
- Clear PROCEED or REVISE status
