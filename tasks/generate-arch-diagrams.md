# Task: Generate Architecture Diagrams

## Purpose
Translate BMAD architecture documents into three Mermaid diagrams: C4 Level 1 (System Context), C4 Level 2 (Container), and Sequence diagrams for critical flows.

## Applicable Agent
`@arch-visualizer` — run after `*analyze` is complete.

---

## Process

### Diagram 1: C4 Level 1 — System Context

**What to show:**
- The primary software system (one box in the center)
- All external user types / personas as Person elements
- All external systems the software integrates with

**Mermaid syntax:** Use `C4Context` diagram type.
**Reference:** See `data/mermaid-c4-patterns.yaml` → `c4_context` section for syntax examples.

**Rules:**
- The central system box should use the exact product name from the PRD
- Person elements map to user personas from the PRD
- External systems come from integrations mentioned in architecture.md
- Include a `UpdateLayoutConfig($c4ShapeInRow, $c4BoundaryInRow)` directive if there are many elements

---

### Diagram 2: C4 Level 2 — Container Diagram

**What to show:**
- All containers within the system boundary (frontend, API, databases, queues, background workers)
- Technology labels on each container (e.g., "React SPA", "Node.js API", "PostgreSQL")
- Communication arrows between containers with protocol labels
- External systems remain outside the boundary

**Mermaid syntax:** Use `C4Container` diagram type.
**Reference:** See `data/mermaid-c4-patterns.yaml` → `c4_container` section.

**Rules:**
- Group containers under a `System_Boundary` block
- Every container must have a technology tag
- Arrow labels describe the protocol or data being exchanged (e.g., "HTTPS/JSON", "SQL queries", "Publishes events")
- If a service is mentioned in the docs but its container type is unclear, flag with `<!-- TODO: clarify container type -->`

---

### Diagram 3: Sequence Diagrams

**How many:** One per critical flow identified in `*analyze`. Minimum two:
1. Authentication / onboarding flow
2. Primary feature flow (the most important user action in the product)

If 3+ critical flows were identified, generate diagrams for all of them.

**What to show:**
- All participants (user, frontend, backend services, databases, external APIs)
- Every request and response
- Async operations marked with `-->>` notation
- Error paths (use `alt`/`else` blocks for success vs. error branches)
- Background jobs or delayed operations noted in comments

**Mermaid syntax:** Use `sequenceDiagram` type.
**Reference:** See `data/mermaid-c4-patterns.yaml` → `sequence` section.

---

## Output

Generate diagrams and export to `docs/arch-diagrams.md` using `templates/arch-diagrams.md` as the document structure.

Each diagram should be wrapped in a fenced code block:
```
```mermaid
[diagram code here]
```
```

Include a short prose description above each diagram explaining what it shows and any decisions or caveats the reader should be aware of.

---

## Quality Check Before Export

- [ ] C4 L1: At least one Person element, one System element, at least one external system
- [ ] C4 L2: System boundary present, all containers have technology tags, all arrows labeled
- [ ] Sequence: At least the authentication flow and one primary flow covered
- [ ] All diagrams render without syntax errors (validate mentally against Mermaid spec)
- [ ] No invented components — everything traceable to source docs
- [ ] TODOs added for any gaps in source documentation
