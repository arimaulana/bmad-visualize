# Design System — [Project Name]

> Maintained by `@design-system-builder`. Reference for all prototype screens and implementation.
> Penpot file: [link to Penpot file]
> Last updated: [date]

---

## Overview

**Design language:** [Describe the visual tone — e.g., "Clean and professional with a focus on data clarity. Uses a blue primary palette to convey trust and reliability."]

**Platform target:** [Web / Mobile / Both]

**Base grid:** 4px spacing unit, 12-column layout grid.

---

## Design Tokens

### Colors

#### Primary Palette
| Token | Value | Usage | Do Not Use For |
|---|---|---|---|
| `primary-50` | `#EFF6FF` | Hover backgrounds, light tints | Text, borders |
| `primary-500` | `#3B82F6` | Primary actions, buttons, links | Large background areas |
| `primary-700` | `#1D4ED8` | Hover state on primary buttons | — |
| `primary-900` | `#1E3A8A` | Dark text on light primary backgrounds | — |

#### Neutral Palette
| Token | Value | Usage |
|---|---|---|
| `neutral-50` | `#F9FAFB` | Page background |
| `neutral-100` | `#F3F4F6` | Surface, table row alternating |
| `neutral-600` | `#4B5563` | Secondary text, labels |
| `neutral-900` | `#111827` | Primary text |

#### Semantic Colors
| Token | Value | Usage |
|---|---|---|
| `success` | `#10B981` | Success states, positive indicators |
| `warning` | `#F59E0B` | Warning states, caution messages |
| `error` | `#EF4444` | Error states, destructive actions |
| `info` | `#3B82F6` | Informational messages |

---

### Typography

**Font family:** [Font name]

| Style | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| H1 | 32px | 700 | 1.25 | Page titles |
| H2 | 24px | 700 | 1.3 | Section headings |
| H3 | 20px | 600 | 1.3 | Card titles, modal titles |
| H4 | 18px | 600 | 1.4 | Subsection headings |
| Body Large | 18px | 400 | 1.6 | Intro paragraphs |
| Body Default | 16px | 400 | 1.6 | General body text |
| Body Small | 14px | 400 | 1.5 | Secondary information |
| Label Default | 14px | 500 | 1.4 | Form labels, nav items |
| Label Small | 12px | 500 | 1.4 | Tags, badges |
| Caption | 12px | 400 | 1.4 | Timestamps, helper text |

---

### Spacing Scale

Base unit: **4px**

| Token | Value | Common Usage |
|---|---|---|
| `space-1` | 4px | Icon padding, tight gaps |
| `space-2` | 8px | Between label and input |
| `space-3` | 12px | Between form fields |
| `space-4` | 16px | Default padding, card inner spacing |
| `space-6` | 24px | Section spacing |
| `space-8` | 32px | Large section gaps |
| `space-12` | 48px | Page section separation |

---

### Border Radius

| Token | Value | Usage |
|---|---|---|
| `radius-none` | 0px | Tables, full-bleed elements |
| `radius-sm` | 4px | Inputs, select dropdowns |
| `radius-md` | 8px | Cards, panels |
| `radius-lg` | 12px | Modals, tooltips |
| `radius-xl` | 16px | Feature cards |
| `radius-full` | 9999px | Pills, avatar, badge |

---

## Components

### Button

**Purpose:** Triggers an action. Primary is for the most important action per context. Only one Primary button per view.

**Variants:**

| Variant | Usage |
|---|---|
| Primary | Main CTA — save, submit, create |
| Secondary | Secondary action — cancel, back, alternative |
| Ghost | Tertiary action — often in tables or alongside primary |
| Destructive | Irreversible actions — delete, remove, revoke |

**States:**

| State | Visual Change | When it Occurs |
|---|---|---|
| Default | Base appearance | Resting state |
| Hover | Background darkens (primary-600) | Mouse over |
| Active | Background darkens further (primary-700), scale 0.98 | Mouse press |
| Disabled | Opacity 40%, cursor not-allowed | Action unavailable |

**Do:** Use consistent CTA text — "Save Changes" not "Save" + "Submit".
**Don't:** Stack two Primary buttons next to each other.

---

### Input

**Purpose:** Single-line text input for forms.

**States:**

| State | Visual Change | When it Occurs |
|---|---|---|
| Default | neutral-300 border | Resting |
| Focus | primary-500 border, primary-50 background | User clicks in |
| Filled | neutral-400 border | Has value, not focused |
| Error | error border, error helper text below | Validation failure |
| Disabled | neutral-100 background, neutral-400 text, cursor not-allowed | Field locked |

**Do:** Always include a visible label above (not placeholder-only).
**Don't:** Use error state before the user has attempted to submit.

---

### Card

**Purpose:** Contained surface for grouping related content.

| Variant | Usage |
|---|---|
| Default | Flat surface, subtle border — for listed items |
| Elevated | Box shadow — for prominent content, feature highlights |
| Outlined | Border only, no shadow — for secondary content, filters |

---

### Modal

**Purpose:** Overlay dialog requiring user attention or action.

| Variant | Width | Usage |
|---|---|---|
| Small | 480px | Confirmation dialogs, simple forms |
| Medium | 640px | Multi-field forms, detail views |
| Large | 800px | Complex workflows, rich content |

**Anatomy:** Header (title + close button) / Body (content) / Footer (actions — max 2 buttons, primary right).
**Do:** Always provide a way to dismiss (close button or cancel).
**Don't:** Stack modals — use steps within a single modal instead.

---

### Navbar — Top

**Anatomy:** Brand/logo (left) → Primary navigation links (center or right) → CTA button + user avatar (right).
**Behavior:** Active link has primary-500 indicator. Mobile: collapses to hamburger menu.

---

### Navbar — Sidebar

**Anatomy:** Brand/logo (top) → Nav items with icon + label (stacked) → User profile (bottom).
**Behavior:** Collapsed state shows icons only. Active item has primary-50 background, primary-500 text.

---

### Table

**Anatomy:** Column headers (neutral-50 background, label style) → Data rows (alternating neutral-50/white) → Pagination (bottom right).
**Do:** Sort indicators on column headers when sorting is supported.
**Don't:** Show more than 50 rows without pagination.

---

## Composition Guidelines

- Use 24px padding as the default inner spacing for cards and panels
- Separate major sections with 48px vertical gap
- Stack form fields with 16px gap between them
- Group related buttons with 8px gap; separate primary from secondary with 16px

---

## Handoff Notes

- Implement as CSS custom properties with the token names above (e.g., `--primary-500`)
- Buttons should be implemented as `<button>` elements, not `<div>` (accessibility)
- All interactive elements must have `:focus-visible` styles using `primary-500` ring
- Transition duration: 150ms ease for hover states, 200ms ease for modals
