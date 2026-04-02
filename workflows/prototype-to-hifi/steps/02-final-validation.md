# Step 2: Final Validation

## What Happens Here

`@ux-prototyper` validates the hi-fi prototype against both UX quality (carried over from Phase 1) and visual production quality. Produces `docs/hifi-validation.md` with a PROCEED or REVISE decision.

**Nothing proceeds to Story Agent without a PROCEED result here.**

---

## Agent: @ux-prototyper

### Part 1: UX Continuity Check

Verify the hi-fi rebuild did not break anything from the validated lo-fi prototype:

- [ ] All screens from Phase 1 are present — none removed or renamed
- [ ] All flows from `prototype-spec.yaml` are still wired correctly
- [ ] Primary happy path is fully clickable end-to-end
- [ ] No new dead-end screens introduced
- [ ] Frame names and trigger element names unchanged

If any UX regressions are found, this is a REVISE — return to Step 1 (Track B).

### Part 2: Visual Production Quality Check

- [ ] All screens use only design system components — no ad-hoc styles
- [ ] Color tokens applied consistently across all screens
- [ ] Typography follows the defined scale throughout
- [ ] Spacing consistent — follows spacing scale
- [ ] All interactive states represented (hover, active, disabled, error where applicable)
- [ ] Empty states present where relevant
- [ ] No Lorem ipsum or placeholder content anywhere
- [ ] Naming conventions consistent throughout Penpot layer panel

### Part 3: Generate Share Link

In Penpot:
1. Open the hi-fi Prototype file
2. Click Share (top right) → toggle "Anyone with the link" ON
3. Set starting screen to the first screen of the primary flow
4. Copy the link

### Part 4: Write Final Validation Report

Create `docs/hifi-validation.md`:

```markdown
# Hi-Fi Prototype Validation

Date: [date]
Prototype file: [Penpot file name]
Share link: [Penpot share link]
Phase 1 validation: docs/prototype-validation.md

## UX Continuity
[PASS / FAIL per check]

## Visual Production Quality
[PASS / FAIL per check]

## Known gaps / deferred items
[List anything acceptable to defer to implementation]

## Decision: PROCEED | REVISE
[Clear statement]

## If REVISE: changes needed
[Specific list of what must change and re-entry point]
```

---

## Decision Criteria

**PROCEED when:**
- All UX continuity checks pass — no regressions from Phase 1
- All screens use only design system components
- No hardcoded styles remaining
- Content is realistic and final
- Minor documented gaps are acceptable for this stage

**REVISE when:**
- Any UX regression found (missing screen, broken flow, renamed element)
- Ad-hoc styles present on more than isolated instances
- Significant visual inconsistencies across screens
- Content still placeholder in key screens

---

## Quality Gate

- [ ] `docs/hifi-validation.md` created
- [ ] Share link included
- [ ] PROCEED or REVISE decision clearly stated
- [ ] If REVISE: re-entry point identified (Track A or Track B of Step 1)

---

## Proceed To

If **PROCEED**: workflow complete. Wait for parallel agents (BMAD Architect, BMAD PM if prototype-first) before handing off to Story Agent.

If **REVISE**: return to Step 1 at the appropriate track.

---

## Workflow Complete — Handoff to Story Agent

When PROCEED is reached and all parallel agents are done, hand off with:

| Document | Source |
|---|---|
| `docs/hifi-validation.md` | This step — hi-fi validation report + share link |
| `docs/prototype-validation.md` | Phase 1 — original UX validation report |
| `docs/design-system.md` | Finalized in Step 1 Track A |
| `_bmad-output/planning-artifacts/PRD.md` | BMAD PM agent (prototype-first) or existing (doc-first) |
| `_bmad-output/planning-artifacts/architecture.md` | BMAD Architect agent |

**Note for Story Agent:**
Every UI-related story should reference the hi-fi prototype share link from `docs/hifi-validation.md`. The hi-fi screens are the visual acceptance criteria for implementation.
