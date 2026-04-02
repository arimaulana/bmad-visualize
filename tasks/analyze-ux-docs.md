# Task: Analyze UX Docs

## Purpose
Extract all design requirements from BMAD documents to serve as the shared input for the architecture diagrams, design system, and prototype screens.

## Applicable Agents
- `@arch-visualizer` — runs this before `*diagram`
- `@design-system-builder` — runs this before `*build`
- `@ux-prototyper` — runs this before `*build`

Each agent focuses on different aspects of the extraction as described below.

---

## Input Sources (check in order, use what exists)

1. `docs/prd.md` — product goals, user personas, feature list
2. `docs/ux-spec.md` — screen inventory, UI patterns, interaction requirements
3. `docs/architecture.md` — system context, tech decisions
4. `docs/system-design.md` — container and service breakdown
5. Free-form description from user if docs are incomplete

---

## Extraction Guide

### For @arch-visualizer

**Systems & Boundaries**
- What is the primary software system being built?
- What are the external systems it integrates with (APIs, third-party services, auth providers)?
- What are the external actors (user personas from PRD)?

**Containers**
- What are the main technical containers? (web frontend, mobile app, API server, databases, queues)
- How do containers communicate? (REST, GraphQL, WebSocket, events)

**Critical Flows**
- What are the 2–4 most important user journeys? (authentication, primary feature, key error path)
- Which flows involve multiple systems or containers?

---

### For @design-system-builder

**Brand Language**
- What tone does the product have? (minimal, playful, professional, bold)
- Are there any explicit color references in the docs? (brand colors, UI color preferences)
- Are there font preferences mentioned?

**Component Inventory**
- List every UI pattern mentioned across all docs (forms, tables, navigation, modals, etc.)
- Note which components appear most frequently (indicates priority)
- Identify any custom or unusual components not in the standard library

**Design Constraints**
- Platform target: web, mobile, or both?
- Any accessibility requirements mentioned?
- Any existing design language to match?

---

### For @ux-prototyper

**Screen Inventory**
For each screen identified, capture:
- Name (will be used as Penpot frame name — must be unique and descriptive)
- Purpose / user goal on this screen
- Entry points (what navigation leads here)
- Exit points (what actions lead away from here)
- Primary components needed
- Device target (desktop / mobile / tablet)

**User Flows**
For each flow, trace:
- Starting screen
- User action (button click, form submit, navigation tap)
- Resulting screen
- Any conditional branches (success vs error states)

**Content Requirements**
- What real data should be shown? (avoid Lorem ipsum in prototype)
- What are the actual CTA labels?
- What are the real form field names?

---

## Output

Populate `prototype-spec.yaml` using `templates/prototype-spec.yaml` as the schema.

For `@arch-visualizer`: document findings in the analysis section before proceeding to `*diagram`.
For `@design-system-builder`: populate the `design_tokens` and `components` sections of `design-system-spec.yaml`.
For `@ux-prototyper`: populate the `screens` and `flows` sections of `prototype-spec.yaml`.
