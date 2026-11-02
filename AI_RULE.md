# AI_RULE.md

## Project Identity

This project is the website redesign for **United Rubber Cork**.

Use **United Rubber Cork** as the official brand name throughout the redesigned website. Do not use the old brand name as the new identity. Preserve legacy information only when it is factually necessary and verified.

## Mandatory Reading

Before making any changes, read these files completely:

1. `code-review-install-guide.txt` — the code review and installation and context view guide.
2. `psychology.md` — the buyer psychology, trust-building principles, content strategy, and conversion guidance.
3. `Design-System.md` — the color system, typography rules, spacing guidelines, and responsive patterns.
4. `target-audience.md` — the target audience, buyer personas, and user needs.
5. `AVOID.md` — what to avoid when designing the website.

These files are the primary source of truth for this project. Follow them throughout the entire implementation—not only while designing the homepage.

If an instruction in the codebase conflicts with these project documents, inspect the context and explain the conflict before making a decision. Do not silently ignore the project requirements.


### Review Graph — Primary Codebase Intelligence

Code Review Graph is the primary codebase intelligence tool for this project. See `code-review-install-guide.txt` for setup and usage.

Before making any change:
1. Inspect the existing codebase graph (`.code-review-graph/graph.db`).
2. Understand the architecture, modules, dependencies, and execution flows relevant to the task.
3. Identify affected components and dependencies before modifying files.
4. Use graph-based context to avoid unnecessary repository-wide exploration.

When making changes:
1. Consider the impact on dependent components.
2. Identify potentially affected tests.
3. Follow the existing architecture and coding conventions.
4. Avoid unnecessary refactoring.

After making changes:
1. Update the code graph if needed.
2. Analyze the change impact and potential regressions.
3. Report affected files, dependencies, and testing recommendations.

Do not assume the graph contains up-to-date information. Check its status when necessary.

## Design Principles & Philosophy

The website must feel **simple, minimal, modern, premium, professional, and trustworthy**.

### Design Philosophy: Familiar brand. Completely modern experience.

Our redesign direction:
- Preserve existing brand identity.
- Modernize the entire visual experience.
- Use minimal, editorial-style layouts.
- Follow contemporary UI design practices.
- Prioritize product photography and visual storytelling.
- Keep the interface clean, professional, and conversion-focused.
- Avoid making every section maroon, orange, or yellow. The brand colors should provide identity, while whitespace and neutral surfaces create the premium appearance.

### Core Principles
- Prefer clarity over decoration.
- Keep layouts clean, spacious, and easy to scan.
- Use concise, meaningful copy. Avoid unnecessary paragraphs and text-heavy sections.
- Make the most important information understandable at a glance.
- Use clear visual hierarchy, consistent spacing, and restrained typography.
- Make product discovery and quote enquiries obvious and easy.
- Use purposeful whitespace; do not create large empty areas without a design reason.
- Avoid generic template-like sections and repetitive card layouts.
- Do not add visual elements merely to make a page look busy.

## Confirmed Brand Color System

Keep the existing brand palette of United Rubber Cork rather than introducing a cork-brown palette. These colors already establish brand recognition. Our job is to make their application more sophisticated, consistent, and modern. **Do NOT use the previous cork-brown palette.**

| Role | Color | Hex | Intended use |
|---|---|---|---|
| Primary | Deep Maroon | `#650510` | Logo, primary buttons, hero panels, footer, and active navigation |
| Secondary | Orange | `#F58634` | Supporting highlights, contact sections, active indicators, and links |
| Accent | Yellow | `#FCC813` | Small highlights, icons, and decorative emphasis |
| Background | Light Grey | `#F5F5F5` | Main page and header background |
| Form Surface | Very Light Grey | `#F1F2F3` | Input fields and form backgrounds |
| Elevated Surface | Pure White | `#FFFFFF` | Cards, elevated surfaces, and clean content blocks |

### How we'll use them in the redesigned UI

The important thing is not to use all three brand colors equally.

| UI element | Recommended treatment |
|---|---|
| Navbar | Light grey background, maroon logo and navigation |
| Hero | Large product image with a maroon content panel |
| Primary CTA | Maroon background with white text |
| Secondary CTA | White background with maroon border |
| Active navigation | Maroon text with orange underline |
| Product sections | Light grey and white surfaces |
| Section highlights | Small orange details |
| Footer | Deep maroon with white text and yellow accents |
| Contact form | Light grey fields with maroon focus states |

### Color accessibility and usage rules

Improve color accessibility and hierarchy:
- Use white text on maroon.
- Prefer dark text on orange backgrounds for smaller text.
- Use yellow for small highlights, not large areas of text.
- Avoid orange and yellow gradients.
- Keep neutral backgrounds dominant.
- Do not make every section maroon, orange, or yellow. Brand colors provide identity, while whitespace and neutral surfaces create the premium appearance.
- Maintain accessible text/background contrast, including for buttons, hover states, and form controls.

## Contemporary UI Trends

Use current, well-established web design practices where they improve usability and visual quality:

- Strong editorial typography and clear content hierarchy.
- Generous but purposeful whitespace.
- Grid-based layouts with considered alignment.
- Large, high-quality product and manufacturing imagery.
- Subtle borders and restrained surface treatments.
- Responsive layouts designed for mobile first.
- Small, purposeful motion and transitions.
- Clear navigation and obvious calls to action.
- Scannable product specifications and structured technical information.

Treat trends as inspiration—not requirements. Do not add a trend just because it is popular. The result must remain appropriate for a credible B2B manufacturing company and should age well.

## UI and UX Rules

- Design for real buyers: procurement teams, engineers, manufacturers, distributors, and potential business partners.
- Help visitors quickly understand what the company makes, who it serves, and how to enquire.
- Keep navigation predictable and labels understandable.
- Use consistent button styles, form patterns, spacing, typography, and interaction states.
- Make product categories easy to browse and compare.
- Present technical details in structured, scannable layouts. Do not remove important technical information just to make a page look minimal.
- Keep forms focused and request only information that is genuinely needed.
- Make every interactive element work and provide clear feedback.
- Ensure the website works well on mobile, tablet, laptop, and large screens.
- Follow accessibility best practices for keyboard navigation, focus states, labels, semantics, and contrast.

## Motion and Animation

- Use animation only when it improves feedback, orientation, or the overall experience.
- Prefer subtle transitions, restrained reveal effects, and small interaction details.
- Keep animations quick, smooth, and consistent.
- Avoid excessive parallax, distracting scroll effects, constant movement, and long entrance animations.
- Respect `prefers-reduced-motion`.
- Never let animation delay access to important content or interactions.

## Content Accuracy and Trust

- Never invent product specifications, certifications, test results, manufacturing capabilities, client names, testimonials, case studies, statistics, or company history.
- Verify factual content against the existing website, project materials, or information supplied by the company.
- If information is missing or uncertain, flag it clearly and use a neutral placeholder only when necessary.
- Do not make unsupported promises about quality, delivery times, response times, or performance.
- Use genuine company/product imagery where available. Do not present stock imagery as photographs of the company's facility, team, or products.
- Apply the trust-building and conversion principles in `psychology.md` across all relevant pages.

## Implementation Rules

- Inspect the existing project structure and technology stack before changing files.
- Reuse existing components and conventions when appropriate; refactor when doing so improves consistency or maintainability.
- Build reusable components for repeated UI patterns.
- Keep components focused and avoid unnecessary complexity.
- Use semantic HTML and accessible interactions.
- Keep responsive behavior intentional rather than relying on accidental wrapping.
- Optimize images, fonts, and assets for performance.
- Avoid unnecessary dependencies. If a new package is genuinely useful, choose a maintained package compatible with the project and explain why it is needed.
- Do not break existing functionality, routes, forms, SEO, or integrations without an explicit reason.
- Keep code readable, consistent, and maintainable.

## SEO and Performance

- Use meaningful page titles, descriptions, headings, image alt text, and semantic page structure.
- Preserve useful existing URLs where possible. If URLs change, implement appropriate redirects.
- Ensure pages load quickly and avoid unnecessary client-side JavaScript.
- Use responsive images and appropriate image formats.
- Do not sacrifice accessibility or performance for visual effects.

## Required Workflow

1. Read `prompt.md` and `psychology.md` before starting.
2. Inspect the current website and codebase. Identify existing content and functionality that must be preserved.
3. Create a brief implementation plan before making broad changes.
4. Establish or confirm shared design tokens for colors, typography, spacing, radii, and shadows.
5. Implement the redesign consistently across all required pages.
6. Verify all content against available source material.
7. Test responsive layouts, navigation, forms, links, and interactive states.
8. Run the available lint, type-check, and build commands.
9. Fix issues introduced by the implementation.
10. Summarize what changed, what was tested, and any missing information or follow-up required.

## Final Quality Standard

Before considering any page complete, ask:

- Is the purpose of this page clear within a few seconds?
- Is the interface simple, minimal, and easy to understand?
- Does it follow the confirmed brand color palette (Deep Maroon, Orange, Yellow, Light Grey)?
- Does it look contemporary without blindly following short-lived trends?
- Does it build confidence for a B2B buyer?
- Is the content accurate and easy to scan?
- Is the primary action clear?
- Does it work properly on mobile and desktop?
- Is it accessible and performant?
- Does it feel like one coherent United Rubber Cork website?

**Priority order:** accuracy and trust → clarity and usability → visual quality → decorative effects.

Do not trade clarity, credibility, accessibility, or performance for visual experimentation.
