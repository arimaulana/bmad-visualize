# Step 0: Intake & Elicitation

> **Prototype-first mode only.**
> Skip this step entirely if running in doc-first mode.

## What Happens Here

`@ux-prototyper` reads the brainstorm doc, runs a structured elicitation session with the user, then infers and confirms the full prototype spec before any building begins.

This is the most important step in prototype-first mode. Every decision made here shapes the entire prototype. Getting this right is cheaper than rebuilding screens later.

Two phases — do not skip or merge them:
1. **Elicitation** — ask before inferring
2. **Inference + Confirmation** — generate spec, get explicit approval

---

## Phase 1: Elicitation

### Read the Brainstorm Doc

Read whatever the user has provided — paragraph, bullet points, rough notes, screenshot descriptions. Do not assume anything beyond what is written.

### Ask the Elicitation Questions

Present all questions in one message. Do not ask one at a time. Group them clearly so the user can answer efficiently.

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

**Business & Constraints**
- What does success look like from a business perspective for this flow?
- Are there any hard constraints — legal, compliance, technical — that affect what can be shown in the UI?
- Is there anything this prototype must NOT include or suggest?

---

## Phase 2: Inference + Confirmation

After the user answers, do the following:

### Generate the Spec

Using the brainstorm doc + elicitation answers, populate:
- `templates/prototype-spec.yaml` — screens and flows sections
- `templates/design-system-spec.yaml` — tone, platform, and token overrides

Use `data/design-tokens.yaml` defaults for any visual values not specified by the user.

### Present Confirmation Summary

Show the user a clear summary before proceeding. Format:

---

**Project:** [name]
**Platform:** [web | mobile | both]
**Visual tone:** [e.g., minimal & professional]
**Primary color:** [hex if specified, or "default from design-tokens.yaml"]
**Font:** [font family if specified, or default]

**Screens ([n] total):**
- [Screen Name] — [one-line description]
- [Screen Name] — [one-line description]
- ...

**Flows ([n] total):**
- [Flow Name]: [Source Screen] → [Target Screen] via [trigger element]
- ...

**Deferred (out of scope for this prototype):**
- [anything the user said to exclude or defer]

**Open questions (could not infer from answers):**
- [list anything still unclear — do not guess]

---

Do not proceed until the user explicitly confirms this summary or provides corrections.

If the user corrects something, update `prototype-spec.yaml` and `design-system-spec.yaml` accordingly and re-show only the changed sections for final confirmation.

---

## Checklist Before Moving to Step 1

- [ ] All elicitation questions answered (or user explicitly deferred specific items)
- [ ] `prototype-spec.yaml` → screens and flows fully populated
- [ ] `design-system-spec.yaml` → tone, platform, token overrides populated
- [ ] Confirmation summary shown and explicitly approved by user
- [ ] Open questions listed and user has acknowledged them
- [ ] Nothing inferred without basis — all spec decisions traceable to brainstorm or elicitation answers

## Proceed To

Step 1 (Analyze) — prototype-first path.
