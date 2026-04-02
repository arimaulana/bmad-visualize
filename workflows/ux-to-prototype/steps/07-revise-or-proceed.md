# Step 7: Revise or Proceed

## What Happens Here

Based on the validation gate result, this step either hands off to the next phase or identifies the correct re-entry point for revision.

---

## If PROCEED

The prototype is validated. Next step depends on **fidelity** and **mode**.

Check `prototype-spec.yaml → fidelity` to determine the handoff path.

---

### PROCEED — Lo-fi

UX is validated. Do not hand off to Story Agent yet. Hand off to the `validated-to-hifi` workflow.

**Handoff package for validated-to-hifi:**
- `docs/prototype-validation.md` — validation report with share link
- `docs/design-system.md` — current design system (to be extended in Phase 2)
- `prototype-spec.yaml` — spec with all screen and flow definitions
- `design-system-spec.yaml` — current token and component spec (to be finalized in Phase 2)
- Penpot prototype file ID — screens to be rebuilt hi-fi in Phase 2

**Parallel actions to trigger alongside validated-to-hifi:**

| Mode | Parallel action |
|---|---|
| doc-first | Run BMAD Architect agent if `_bmad-output/planning-artifacts/architecture.md` is not yet available |
| prototype-first | Run BMAD PM agent (PRD) + BMAD Architect agent — both can start from the validated prototype |

These run in parallel with `validated-to-hifi`. Story Agent starts only after all three are done.

---

### PROCEED — Hi-fi

The prototype is production-ready. Hand off directly to BMAD Story and Epic agents.

**Handoff package:**

| Document | Included when |
|---|---|
| `docs/arch-diagrams.md` | Doc-first mode AND Step 2 was run |
| `docs/design-system.md` | Always |
| `docs/prototype-validation.md` | Always |
| Penpot share link | Always |

For **prototype-first**: `docs/arch-diagrams.md` is not part of this handoff. The BMAD Architect agent will generate architecture separately after the PRD is written.

**Note for Epic/Story agents:**
Every UI-related story should reference the validated prototype. The prototype screens serve as the acceptance criteria visual reference.

---

## If REVISE

`@ux-prototyper` runs `*revise` with the validation report as input.

### Determining Re-entry Point

| Issue Type | Re-entry Point |
|---|---|
| Source docs missing key screens or flows | Step 1 — re-run `*analyze` after updating docs |
| Architecture docs incomplete | Step 2 — re-run arch diagrams after docs updated |
| Design system missing components needed by screens | Step 3 — re-run `*build` on design system |
| Screens need rebuilding (layout, content, component misuse) | Step 4 — re-run screen build |
| Only interactions are wrong | Step 5 — fix `prototype-spec.yaml`, re-run flow-wirer.js |
| Minor issues fixable directly in Penpot | Fix in Penpot, then re-run Step 6 only |
| Fundamental flow is wrong (prototype-first) | Step 0 — re-run elicitation with updated understanding |

### Revision Process

1. `@ux-prototyper` identifies which category the revision falls into
2. Update source documents if the issue is doc-level
3. Re-enter the workflow at the identified step
4. After revision is complete, re-run Step 6 (Validation Gate)
5. A new `docs/prototype-validation.md` is created — it replaces the previous one

### Revision Log

Each revision cycle should be noted in `docs/prototype-validation.md`:
```
## Revision History
- v1: [date] — REVISE — [brief reason]
- v2: [date] — PROCEED — [brief note]
```

---

## Workflow Complete

When PROCEED is reached:
- This workflow instance is closed
- The `ux-to-prototype` workflow is marked complete
- Lo-fi: proceed to `validated-to-hifi` workflow
- Hi-fi: proceed to BMAD Epic and Story creation using the validated prototype as visual reference
