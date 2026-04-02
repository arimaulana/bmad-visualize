# Task: Build Design System in Penpot

## Purpose
Create a production-ready UI design system in Penpot via MCP — design tokens, base components, and variant frames — to serve as the foundation for all prototype screens.

## Applicable Agent
`@design-system-builder` — run after `*analyze` is complete and `design-system-spec.yaml` is populated.

## Prerequisites
- Penpot MCP is configured and running (`setup/penpot-mcp-setup.md`)
- `design-system-spec.yaml` is populated from `*analyze`
- Penpot instance is accessible at the configured URL

---

## Process

### Step 1: Create the Design System File

Via Penpot MCP, create a new file:
- **File name:** `[Project Name] — Design System`
- Create two pages: `Tokens` and `Components`

---

### Step 2: Build the Token Page

On the `Tokens` page, build visual token documentation in organized sections. Each token is a labeled frame containing the visual representation.

**Section: Color Palette**

Primary colors (each as a filled rectangle 80×80px with hex label below):
- primary-50 through primary-900 (9 swatches)
- neutral-50 through neutral-900 (9 swatches)
- Semantic row: success-light, success, success-dark, warning-light, warning, warning-dark, error-light, error, error-dark, info-light, info, info-dark
- Surface row: background, surface, surface-raised, border, border-subtle

Use values from `data/design-tokens.yaml` as defaults. Override with project-specific values extracted from docs during `*analyze`.

**Section: Typography Scale**

Each entry: a text element showing the style applied to itself, with font size and weight label.
- Heading: H1 (32px/700), H2 (24px/700), H3 (20px/600), H4 (18px/600)
- Body: Large (18px/400), Default (16px/400), Small (14px/400)
- Label: Default (14px/500), Small (12px/500)
- Caption: 12px/400

**Section: Spacing Scale**

Each entry: a horizontal rectangle showing the spacing dimension visually, with pixel label.
- 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px

**Section: Border Radius**

Each entry: a rectangle with the corresponding border radius applied.
- none (0px), sm (4px), md (8px), lg (12px), xl (16px), full (9999px)

---

### Step 3: Build the Component Page

On the `Components` page, build one section per component.

For each component:
1. Create the **main component** (right-click → Create Component in Penpot) using correct component naming
2. Create **variant frames** next to it — one frame per state, laid out horizontally, clearly labeled

**Naming convention for variant frames:** `[Component] / [Variant] / [State]`
Example: `Button / Primary / Hover`

---

#### Button
Variants × States matrix:

|  | Default | Hover | Active | Disabled |
|---|---|---|---|---|
| Primary | ✓ | ✓ | ✓ | ✓ |
| Secondary | ✓ | ✓ | ✓ | ✓ |
| Ghost | ✓ | ✓ | ✓ | ✓ |
| Destructive | ✓ | ✓ | ✓ | ✓ |

Anatomy: label text + optional leading icon + optional trailing icon, correct padding per spacing scale.

#### Input
States: Default, Focus, Filled, Error, Disabled
Anatomy: label above, input field with placeholder text, optional helper text below, error message for Error state.

#### Card
Variants: Default (no elevation), Elevated (box shadow), Outlined (border)
Anatomy: optional header area, body area, optional footer/action area.

#### Modal
Variants: Small (480px), Medium (640px), Large (800px)
Anatomy: header with title + close button, body content area, footer with action buttons.

#### Navbar — Top
Anatomy: logo/brand left, nav links center or right, CTA button and avatar/profile right.

#### Navbar — Sidebar
Anatomy: logo top, nav items with icons + labels stacked vertically, user profile section at bottom.

#### Table
Anatomy: column headers row, 3–5 data rows with realistic sample data, pagination controls below.

---

### Step 4: Record File ID

After the file is created, retrieve the Penpot file ID and record it in `design-system-spec.yaml` under `penpot.file_id`. The UX Prototyper will need this to reference components.

---

## Output

- Penpot file: `[Project Name] — Design System` with pages `Tokens` and `Components`
- Updated `design-system-spec.yaml` with `penpot.file_id` and `penpot.page_ids`
- Proceed to `*document` to generate `docs/design-system.md`
