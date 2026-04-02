# Step 2: Generate Architecture Diagrams

> **Optional step.**
> Skip this step if:
> - Running in **prototype-first** mode, OR
> - Running in doc-first mode but architecture docs (`docs/architecture.md`, `docs/system-design.md`) are not available
>
> If skipped, note it in the project checklist and proceed directly to Step 3.
> The handoff package in Step 7 will omit `docs/arch-diagrams.md` accordingly.

## What Happens Here

`@arch-visualizer` generates the three Mermaid diagrams and exports them to `docs/arch-diagrams.md`.

This step runs in parallel with Step 3 (Design System).

---

## Agent: @arch-visualizer

### Run *diagram
Using the analysis from Step 1, generate:

1. **C4 Level 1** — System Context
   - Reference: `data/mermaid-c4-patterns.yaml` → `c4_context`
   - Must include: primary system, all personas, all external systems

2. **C4 Level 2** — Container Diagram
   - Reference: `data/mermaid-c4-patterns.yaml` → `c4_container`
   - Must include: system boundary, all containers with technology tags, all arrows with protocol labels

3. **Sequence Diagrams** (one per critical flow)
   - Reference: `data/mermaid-c4-patterns.yaml` → `sequence`
   - Must include: authentication flow + primary feature flow minimum

### Run *export
Save all diagrams to `docs/arch-diagrams.md` using `templates/arch-diagrams.md`.

---

## Quality Gate

Before marking this step complete:

- [ ] All three diagram types generated
- [ ] All diagrams render correctly (valid Mermaid syntax)
- [ ] No invented systems — everything traceable to source docs
- [ ] Gaps flagged with `<!-- TODO: clarify with architect -->`
- [ ] `docs/arch-diagrams.md` saved and readable

---

## Output

`docs/arch-diagrams.md` — consumed by:
- Developers during implementation for system context
- UX Prototyper for understanding data flows when building screens

## Proceed To

This step is complete. Step 3 (Design System) continues in parallel or proceeds next.
Step 4 (Build Screens) waits for both Step 2 and Step 3 to complete.
