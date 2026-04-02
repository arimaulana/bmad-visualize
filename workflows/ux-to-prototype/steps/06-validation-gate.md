# Step 6: Validation Gate

## What Happens Here

`@ux-prototyper` runs the validation checklist, generates a Penpot share link, and produces `docs/prototype-validation.md` with a PROCEED or REVISE recommendation.

**Nothing proceeds to Epic & Stories without a PROCEED result here.**

---

## Agent: @ux-prototyper

### Run *validate

#### Part 1: Completeness Check
Go through `templates/validation-checklist.md` — screens, flows, design consistency, content quality, coverage.

Mark each item PASS or FAIL. Note specific issues for any FAIL.

#### Part 2: Generate Share Link

In Penpot:
1. Open the Prototype file
2. Click Share (top right) → toggle "Anyone with the link" ON
3. Set starting screen to the first screen of the primary flow
4. Copy the link

Include the share link in `docs/prototype-validation.md`.

#### Part 3: Stakeholder Distribution (optional but recommended)

Share the Penpot link with:
- Product owner / stakeholder for business validation
- Designer or UX lead for visual validation
- A sample end-user representative if available

Collect feedback before finalizing the PROCEED/REVISE decision if time allows.

#### Part 4: Write Validation Report

Create `docs/prototype-validation.md` with:
- Date and prototype file name
- Share link
- Checklist results (PASS/FAIL per category)
- Known gaps and deferred items
- **PROCEED** or **REVISE** recommendation
- If REVISE: specific changes needed and re-entry point

---

## Decision Criteria

**PROCEED when:**
- All screens built, no dead-end flows
- Primary happy path fully clickable
- Design consistency passes (no ad-hoc styles)
- Content is realistic and final/near-final
- Minor gaps are documented as TODOs acceptable for this stage

**REVISE when:**
- Missing screens that are critical to the primary flow
- Primary happy path broken (dead ends)
- Significant design inconsistencies
- Stakeholder feedback identifies missing or incorrect flows
- Content too vague to validate UX

---

## Quality Gate

- [ ] Validation report created at `docs/prototype-validation.md`
- [ ] Share link included in report
- [ ] PROCEED or REVISE decision made and clearly stated
- [ ] If REVISE: re-entry point identified

## Proceed To

If **PROCEED**: Step 7 (hand off to Epic & Stories).
If **REVISE**: Step 7 to determine re-entry point, then loop back.
