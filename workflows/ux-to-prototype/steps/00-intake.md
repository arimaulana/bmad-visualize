# Step 0: Intake & Elicitation

> **Prototype-first mode only.**
> Skip this step entirely if running in doc-first mode.

## What Happens Here

`@ux-prototyper` reads the brainstorm doc and any available supplementary docs, runs a structured elicitation session with the user, then infers and confirms the full prototype spec before any building begins.

This is the most important step in prototype-first mode. Every decision made here shapes the entire prototype. Getting this right is cheaper than rebuilding screens later.

Two phases — do not skip or merge them:
1. **Elicitation** — ask before inferring
2. **Inference + Confirmation** — generate spec, get explicit approval

---

## Before Starting: Check for Supplementary Docs

Before asking elicitation questions, check if any of these docs exist. If found, read them — they reduce the number of questions needed and improve inference quality.

| Document | Path | What to extract |
|---|---|---|
| Product Brief | `_bmad-output/planning-artifacts/product-brief.md` | Problem space, target users, success definition, constraints |
| PRD | `_bmad-output/planning-artifacts/PRD.md` | Feature list, behaviour rules, edge cases, business requirements |

Note which docs were found and which questions can be skipped or pre-filled from them. Tell the user upfront: "I found [doc], so I already know [X] — I'll only ask about what's still unclear."

---

## Phase 1: Elicitation

### Read the Brainstorm Doc

Read whatever the user has provided — paragraph, bullet points, rough notes, screenshot descriptions. Do not assume anything beyond what is written.

### Ask the Elicitation Questions

Present all questions in one message. Skip any question already answered by the supplementary docs. Group them clearly so the user can answer efficiently.

**Fidelity**
- Is this prototype for UX validation first (lo-fi — focus on flows and structure, visual is basic), or should it be production-ready from the start (hi-fi)?
  - **Lo-fi**: after UX is validated and feedback is safe, we run a second phase to polish the UI and finalize the design system — in parallel with system design.
  - **Hi-fi**: one phase, prototype is production-quality from the start.

**Users & Access**
- Who are the primary users of this product? Describe them specifically.
- Are there multiple user roles? If yes — what changes in the UI per role?
- Is there any content or action that only certain users can see or do?

**Flows & Scope**
- What is the single most important thing a user must be able to do? (primary happy path)
- What happens right before that action? What happens right after?
- Are there secondary flows that must be in this prototype, or can they be deferred?
- What does "done" look like for the user — what screen or state signals success?

**Edge Cases & Failures**
- What happens if the user makes a mistake? Is there an error state?
- What happens if there is no data yet (empty states)?
- Are there any loading states that need to be shown?
- What happens if the user loses connection or the action fails?

**Platform & Context**
- Is this web, mobile, or both? If both — same screens or different layouts?
- What device sizes must the prototype cover?
- Is there an existing brand or visual style to follow? Colors, fonts, tone?

**Business & Constraints** *(skip if answered by product brief or PRD)*
- What does success look like from a business perspective for this flow?
- Are there any hard constraints — legal, compliance, technical — that affect what can be shown in the UI?
- Is there anything this prototype must NOT include or suggest?

---

## Phase 2: Inference + Confirmation

After the user answers, do the following:

### Generate the Spec

Using the brainstorm doc + supplementary docs + elicitation answers, populate:
- `templates/prototype-spec.yaml` — screens, flows, fidelity field
- `templates/design-system-spec.yaml` — tone, platform, token overrides

Use `data/design-tokens.yaml` defaults for any visual values not specified by the user.

For **lo-fi**: set minimal token values, flag complex components as deferred to Phase 2.
For **hi-fi**: populate full token set and complete component list.

### Present Confirmation Summary

Show the user a clear summary before proceeding. Format:

---

**Project:** [name]
**Mode:** prototype-first
**Fidelity:** lo-fi | hi-fi
**Platform:** [web | mobile | both]
**Visual tone:** [e.g., minimal & professional]
**Primary color:** [hex if specified, or "default from design-tokens.yaml"]
**Font:** [font family if specified, or default]

**Supplementary docs used:** [list any product-brief.md / PRD.md that were read]

**Screens ([n] total):**
- [Screen Name] — [one-line description]
- [Screen Name] — [one-line description]
- ...

**Flows ([n] total):**
- [Flow Name]: [Source Screen] → [Target Screen] via [trigger element]
- ...

**Deferred to Phase 2 (lo-fi only):**
- [components or visual decisions deferred to validated-to-hifi workflow]

**Deferred (out of scope for this prototype):**
- [anything the user said to exclude or defer]

**Open questions (could not infer from answers):**
- [list anything still unclear — do not guess]

---

Do not proceed until the user explicitly confirms this summary or provides corrections.

If the user corrects something, update `prototype-spec.yaml` and `design-system-spec.yaml` accordingly and re-show only the changed sections for final confirmation.

---

## Checklist Before Moving to Step 1

- [ ] Supplementary docs checked — found docs noted, questions skipped accordingly
- [ ] Fidelity confirmed: lo-fi or hi-fi
- [ ] All elicitation questions answered (or user explicitly deferred specific items)
- [ ] `prototype-spec.yaml` → screens, flows, and fidelity field fully populated
- [ ] `design-system-spec.yaml` → tone, platform, token overrides populated
- [ ] Confirmation summary shown and explicitly approved by user
- [ ] Open questions listed and user has acknowledged them
- [ ] Nothing inferred without basis — all spec decisions traceable to docs or elicitation answers

## Proceed To

Step 1 (Analyze) — prototype-first path.
