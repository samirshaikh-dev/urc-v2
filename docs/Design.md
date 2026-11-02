# Design System & Visual Architecture — United Rubber Cork

> **Brand:** United Rubber Cork (URC)  
> **Project Codebase:** `urc-v2`  
> **Status:** Active Reference & Single Source of Truth for Visual Design  
> **Governing Standards:** Strict adherence to `AVOID.md` (Anti-AI Slop), `psychology.md` (B2B Buyer Confidence), and `docs/color-theme.md`.

---

## 1. Design Vision & Philosophy

### 1.1 The Premise: Familiar Brand, Completely Modern Experience
United Rubber Cork is an established Indian manufacturer and bulk supplier of engineered industrial cork and rubberised-cork components. The redesign bridges the visual sophistication of contemporary digital craft (inspired by Craftly Studio) with industrial manufacturing precision.

The design is **not** a generic SaaS landing page. It is an authoritative, conversion-focused B2B engineering interface that sells confidence, technical competence, and material suitability to procurement managers, transformer engineers, and automotive OEMs.

### 1.2 Core Principles
1. **Clarity Over Decoration:** Every visual element, hairline border, badge, and interaction must serve a functional purpose.
2. **Restrained Color Hierarchy:** Brand recognition is anchored by Deep Maroon, with purposeful Orange accents and subtle Yellow sparks, supported by dominant neutral surfaces (Light Grey and Pure White).
3. **Editorial Typography & Visual Rhythm:** High-contrast typographic scale paired with authentic product and manufacturing photography, avoiding repetitive identical card grids.
4. **Predictable B2B Procurement:** Every section guides the technical buyer towards informed evaluation and low-friction quotation.

---

## 2. Confirmed Color Palette & Token System

The design system strictly adheres to the established brand colors. Under no circumstances should external palettes (such as Craftly's black/orange or AI purple-blue gradients) or the deprecated cork-brown palette be introduced.

### 2.1 Color Tokens

| Role | Token Name | Hex Code | Tailwind Utility | UI Application |
|---|---|---|---|---|
| **Primary** | Deep Maroon | `#650510` | `bg-maroon`, `text-maroon` | Primary buttons, active indicators, wordmark, key accents, footer background |
| **Primary Deep** | Maroon Dark | `#4F040C` | `bg-maroon-deep` | Hover and active pressed states on primary buttons |
| **Secondary** | Orange | `#F58634` | `text-orange`, `bg-orange` | Status badges, indicator dots, active highlights |
| **Secondary Accessible** | Orange Ink | `#9A4A0B` | `text-orange-ink` | Small text, kickers, and icons on light surfaces (meets WCAG 4.5:1+) |
| **Accent** | Yellow | `#FCC813` | `text-yellow`, `bg-yellow` | Micro-highlights, footer rule accents, selection highlight |
| **Page Canvas** | Light Grey | `#F5F5F5` | `bg-page` | Master page background, providing soft, premium negative space |
| **Field Surface** | Very Light Grey | `#F1F2F3` | `bg-field` | Form inputs, neutral tags, subtle container backdrops |
| **Elevated Surface** | Pure White | `#FFFFFF` | `bg-white` | Elevated cards, bento surfaces, modal dialogs |
| **Hairline Border** | Soft Grey | `#E5E7EB` | `border-line` | Subtle dividers, container borders, table rules |
| **Strong Border** | Slate Border | `#7C8087` | `border-line-strong` | Form input boundaries (meets WCAG 3:1+ boundary requirement) |
| **Text Primary** | Deep Charcoal | `#1A1A1A` | `text-ink` | Main headings, primary labels, and readable body text |
| **Text Muted** | Slate Grey | `#5A5D63` | `text-muted` | Technical parameters, secondary metadata, supporting descriptions |

### 2.2 Contrast & Accessibility Conformance
- **White text on Deep Maroon (`#650510`):** Contrast ratio > 11.8:1 (exceeds WCAG AAA standard).
- **Orange on Light Surfaces:** Use `text-orange-ink` (`#9A4A0B`) for text labels to guarantee a minimum 4.5:1 contrast against `#FFFFFF` and `#F5F5F5`.
- **Focus Indicators:** Unifying focus outline across all interactive elements (`:focus-visible { outline: 2px solid var(--color-maroon); outline-offset: 2px; }`).

---

## 3. Typography & Spacing Hierarchy

### 3.1 Typographic Scale
The system relies on clean, modern sans-serif typography with strict hierarchy and comfortable reading widths (max 65–75 characters per line):

- **Display / Hero H1:** `text-3xl font-semibold tracking-tight sm:text-5xl lg:text-[3.25rem] lg:leading-[1.12]`
- **Section Heading H2:** `text-2xl font-semibold tracking-tight sm:text-3xl lg:text-4xl`
- **Component / Card H3:** `text-lg font-semibold tracking-tight sm:text-xl lg:text-2xl`
- **Subheading / Feature H4:** `text-sm font-semibold sm:text-base`
- **Kickers / Eyebrows:** `text-xs font-semibold uppercase tracking-wider text-orange-ink`
- **Body Text:** `text-sm leading-relaxed text-muted sm:text-base`
- **Micro-copy / Specs:** `text-xs sm:text-[13px] text-muted`

### 3.2 Spacing & Radii System
- **Container Max-Width:** `max-w-6xl` (1152px) for floating navbars; `max-w-7xl` (1280px) for general content containers.
- **Section Vertical Padding:** `py-16 sm:py-24` between major content zones.
- **Corner Radii:**
  - Control Elements (Buttons, Inputs, Badges): `rounded-full` or `rounded-xl`
  - Container Surfaces (Hero, Bento Cards, Modals): `rounded-3xl` (24px)
  - Micro-Tags & Chips: `rounded-full`

---

## 4. Component Architecture & UI Patterns

### 4.1 Modern Floating Elevated Header
- **Layout:** Floating pill centered at the top of the viewport (`max-w-6xl mx-auto my-3 px-5 py-2.5 rounded-full border border-line bg-white/80 backdrop-blur-md shadow-xs`).
- **Scroll Behavior:** Smoothly transitions to `bg-white/95 shadow-sm` when scrolled beyond 20px.
- **Wordmark:** Typographic brand mark *"United Rubber Cork"* accompanied by a live orange indicator dot.
- **Navigation:** Subtle pill hover targets (`hover:bg-field hover:text-maroon`), with active route indicated by `bg-maroon/5 text-maroon font-semibold`.
- **Mobile Experience:** Slide-over sheet with full keyboard focus trap and accessible Escape key dismissal.

### 4.2 Architectural Split Hero
- **Left Panel:** Bold value proposition, supporting engineering narrative, dual CTAs (*Primary: Request a quotation*, *Secondary: Explore product catalogue*), and trust badges (*IS: 4253 / ASTM Compliant*, *Transformer-Oil Proof*, *CAD-Driven CNC Tooling*).
- **Right Panel:** Authentic, high-resolution photography of precision-molded components (`custom-molded-cork-components-manufacturing-vapi-gujarat-02.jpg`) with a floating technical chip displaying factory supply facts.
- **Quick Specs Strip:** Embedded horizontal parameters directly addressing core engineer questions (Thickness range, elastomer matrices, standard formats).

### 4.3 Engineering Proof & Metrics Strip
- Hairline-bordered 4-column metric strip highlighting:
  1. **Dielectric Oil Barrier:** Zero continuous leakage under hot mineral oil and synthetic esters.
  2. **Controlled Compressibility (25%–40%):** Low torque sealing preventing flange warping.
  3. **Elastic Recovery (>75%):** Thermal shock stability from -30°C to +120°C.
  4. **Custom CNC Profiling:** Direct CAD-driven tooling for endless molded rings and dovetail gaskets.

### 4.4 Flagship Product Bento & Interactive Specification Sheet Modal
- **Filter Tabs:** Filter catalog by *All Products*, *Rubberised Cork*, *Gaskets & Molded Parts*, and *Natural Cork & Granules*.
- **Product Cards:** Editorial presentation combining genuine product photography, one-line value prop, key feature checklist, and a preview table of technical parameters.
- **Interactive Spec Sheet Modal:** When clicking *"Detailed specifications"*, an accessible dialog opens showing:
  - Full application tags
  - Verified technical parameter table ([`product-spec-table.js`](file:///s:/client-projects/urc-v2/src/components/products/product-spec-table.js))
  - Direct *"Request quote for this product"* button that seamlessly closes the modal and positions focus on the RFQ form.

### 4.5 B2B Procurement Journey ("From Requirement to Dispatch")
Visual 4-step workflow that eliminates buyer uncertainty:
- **01. Share Specification or Drawing**
- **02. Engineering Review & Material Match**
- **03. Sample Verification & Formal Quote**
- **04. Batch Production & Tracked Dispatch**

### 4.6 Industrial Applications Embla Carousel
- Built with `embla-carousel-react` showcasing real photography across 6 verified industrial sectors:
  1. *Electrical Transformers & Switchgear*
  2. *Automotive & Powertrain*
  3. *Railways & Transit Systems*
  4. *Aerospace & Defense Systems*
  5. *Marine & Offshore Vessels*
  6. *Structural Construction & Civil Works*
- Equipped with smooth dragging, previous/next controls, pagination dots, and component badges.

### 4.7 Technical Clarity & Engineering FAQ
- Semantic `<details>` and `<summary>` accordion explaining:
  - NBR vs. Neoprene vs. SBR binder matrix selection.
  - Endless molded gaskets vs. interlocking dovetail joints.
  - Required parameters for quotation.
  - Conformance standards (IS: 4253, ASTM F104, BS).

### 4.8 High-Conversion RFQ & Quote Section
- Form inputs featuring interactive material selection pills.
- Dedicated fields for thickness, dimensions, and estimated batch quantity.
- Reassurance checklist highlighting 24-hour turnaround, drawing confidentiality, and batch test certification.
- Feedback provided via `sonner` toast notification upon submission.

### 4.9 Refined Engineering Footer
- Architectural multi-column layout with brand story, product anchors, corporate links, factory location in Vapi, Gujarat, and working hours.

---

## 5. Prevention of UI/UX Anti-Patterns (`AVOID.md` Compliance)

| Anti-Pattern to Avoid | Enforced Design Solution |
|---|---|
| **AI Slop & Generic SaaS Gradients** | No glowing neon borders, purple/blue gradients, or abstract floating 3D orbs. Real industrial photography and neutral surfaces only. |
| **Repetitive Cards Inside Cards** | Clean editorial rows, open metric strips, and deliberate bento structures. Hairline borders (`border-line`) used with purpose. |
| **Unsubstantiated Marketing Claims** | No generic claims ("We are the #1 world-class company"). Every claim is tied to verifiable facts (IS: 4253, thickness 1–25 mm, NBR/SBR matrix). |
| **Emoji Interfaces** | Zero emoji used as interface icons. Unified Lucide React icon library with consistent 1.5px/2px stroke weight. |
| **Motion Overuse** | Subtle, purposeful transitions (150ms–200ms). Full `prefers-reduced-motion` override ensuring instantaneous display when preferred. |

---

## 6. Psychology & Persuasion Integration (`psychology.md` Compliance)

1. **Selling Confidence, Not Just Materials:** The interface reassures procurement managers and design engineers that URC understands their technical operating conditions before asking for contact.
2. **Demonstrating Judgement:** The FAQ and specification previews clearly explain trade-offs between elastomeric binders and why specific operating fluids require specific matrices.
3. **Reducing Cognitive Friction:** Progressive disclosure allows engineers to inspect high-level specs on the card or trigger the in-depth specification table without losing their page position.
4. **Transparent Working Relationship:** Showing the 4-step workflow removes anxiety regarding sample availability, CAD drawing review, and delivery timelines.

---

## 7. Quality Assurance & Maintenance Guidelines

When modifying or adding new pages and components:
- **Verify Brand Name:** Always use **United Rubber Cork** (`URC`).
- **Verify Design Tokens:** Always consume Tailwind tokens (`bg-maroon`, `text-orange-ink`, `bg-page`, `border-line`) rather than hardcoded hex values.
- **Preserve Asset Authenticity:** Use verified assets located in `public/images/`. Never present generic stock imagery as company facilities.
- **Maintain Accessibility:** Ensure form fields retain proper `aria-labelledby`, buttons retain clear accessible names, and focus rings remain visible.
- **Run Production Build:** Verify with `npm run build` to guarantee zero compile errors or layout shifts.

