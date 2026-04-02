# Task: Document Design System

## Purpose
Generate `docs/design-system.md` — a comprehensive reference that developers and designers use when implementing the design system in code and when building new screens beyond the initial prototype.

## Applicable Agent
`@design-system-builder` — run after `*build` is complete.

---

## Process

Use `templates/design-system-doc.md` as the document structure. Fill each section as described below.

---

### Section 1: Overview

- Project name and design system name
- Design language description (tone, personality, key characteristics)
- Link to Penpot file (from `design-system-spec.yaml → penpot.file_id`)
- Last updated date

---

### Section 2: Design Tokens

For each token category, produce a table with columns: Token Name | Value | Usage | Do Not Use For.

**Colors**
Document every token defined in the Token page. Group by: Primary, Neutral, Semantic, Surface.
Include the hex value and a one-line description of when to use it.

Example row:
| `primary-500` | `#3B82F6` | Main brand actions, primary buttons, links | Backgrounds (use primary-50 instead) |

**Typography**
Document each scale entry with: Style Name | Font | Size | Weight | Line Height | Usage.

**Spacing**
Document the spacing scale and explain the 4px base grid.

**Border Radius**
Document when to use each radius (e.g., sm for inputs, md for cards, full for pills/badges).

---

### Section 3: Components

For each component, write a subsection with:

#### [Component Name]

**Purpose:** One sentence on what this component is for.

**Variants:** List all variants with a description of when to use each.

**States:**
| State | Visual Change | When it Occurs |
|---|---|---|
| Default | — | Normal rendering |
| Hover | Background lightens, cursor pointer | User mouses over |
| ... | ... | ... |

**Usage Guidelines:**
- Do: bullet points on correct usage
- Don't: bullet points on misuse to avoid

**Props / Overrides (for developers):**
List the key properties that change per variant/state (colors, border, opacity, etc.) so developers can implement without guessing.

---

### Section 4: Composition Guidelines

- How to combine components on a screen (spacing between components, grouping patterns)
- Layout grid recommendations (12-column, 8-column, etc.)
- Responsive breakpoints and behavior expectations

---

### Section 5: Handoff Notes

Anything a developer implementing the design system in code needs to know:
- CSS variable naming convention recommendation
- Which components should be built as atomic primitives vs. compound components
- Any animation or transition specs (duration, easing)
- Known limitations of the Penpot representation vs. intended coded behavior

---

## Output

Save to `docs/design-system.md`.

This document is referenced by:
- `@ux-prototyper` when building screens
- Developers during implementation sprint
- Anyone reviewing the prototype (gives context for design decisions)
