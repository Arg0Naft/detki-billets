# DESIGN_AUDIT

Draft design-system specification for `Arg0Naft/detki-billets`.

Status: audit only. This document proposes a controlled refinement path and requires approval before any implementation.

## 1. Verified Git State

- Remote: `origin = https://github.com/Arg0Naft/detki-billets.git`
- Default branch: `main`
- Current branch for this audit: `design/ui-audit-system`
- `main` HEAD: `28e3283e85e9e931537d631aeab9820b0c3c2cb5`
- Latest `main` commit: `2026-06-17 10:06:32 +0300` — `Synchronize Directus schema documentation (#7)`
- Expected HEAD from task: confirmed exactly, no discrepancy
- Open pull requests: none found via GitHub PR search for `Arg0Naft/detki-billets`
- Working tree before local checks: clean fresh clone on `main`

## 2. Current UI Architecture

Public UI is a single TanStack Start route in `src/routes/index.tsx` with the current fixed order:

`Header -> Hero -> Speakers -> About -> Program -> Tickets -> FAQ -> Footer`

Data flow:

- `src/hooks/useEventData.ts` loads `site_settings`, `event_config`, `event_descriptions`, `event_highlights`, `tickets`, `speakers`, `program`, `faq`, and `legal_pages`
- `src/lib/directus.ts` and `src/lib/event-highlights.ts` provide Directus reads with demo fallbacks
- Each public section is a separate component under `src/components/sections`

Styling architecture today is split in two layers:

- `src/styles.css` defines generic semantic tokens for colors and radii
- the public page largely bypasses those tokens through direct Tailwind classes and hard-coded hex values inside section components

Shared primitives exist, but they are only partially used as a real system:

- `src/components/ui/button.tsx` provides a shared button API, but `Header.tsx`, `Hero.tsx`, and `Tickets.tsx` override it with local colors, shadows, gradients, and widths
- `src/components/ui/accordion.tsx` provides the interaction shell, but `About.tsx` and `Faq.tsx` restyle each instance locally

Result: the site is recognizable and broadly coherent, but it behaves like a collection of individually styled sections rather than one controlled interface system.

## 3. Prioritized Issues

### Critical

- `src/components/sections/About.tsx`: the known defects are real. Fallback title text is corrupted (`"Ϛ конфесренции"`), fallback accordion label is corrupted (`"�одробнее"`), and highlight cards use invalid class `p6` instead of `p-6`. Desktop impact: fallback copy looks broken and highlight cards lose internal spacing. Mobile impact: the same defects become more obvious because cards are full-width and text touches edges.

### High

- `src/styles.css` plus all public sections: the public page does not actually consume a unified token system. Semantic colors exist, but the live UI uses repeated `#0EA5E9`, `#EC4899`, `#1E293B`, `#64748B`, `bg-white`, `bg-[#F8FAFC]`, `rounded-xl`, `rounded-2xl`, and custom shadows directly in section files. Desktop impact: inconsistent cards and CTA hierarchy. Mobile impact: inconsistencies are amplified because similar blocks stack next to each other.
- `src/components/sections/Header.tsx`, `Hero.tsx`, `Tickets.tsx`, `Footer.tsx`: shared `Button` behavior is overridden repeatedly with section-local backgrounds, gradients, hover states, and widths. This makes later refinement risky because button changes will not propagate consistently.
- `src/components/sections/Hero.tsx`, `Speakers.tsx`, `Program.tsx`, `Tickets.tsx`, `Faq.tsx`, `About.tsx`, `Footer.tsx`: typography is visually close but not systematically controlled. There is no explicit public font source or family assignment, no guaranteed Cyrillic-optimized primary font, repeated ad hoc heading/body sizes, and frequent uppercase tracking for decorative labels. Long Directus strings have no guardrails.
- `src/components/sections/Header.tsx`, `Footer.tsx`, `About.tsx`, `Faq.tsx`, `Hero.tsx`: keyboard and focus treatment is inconsistent. Shared `Button` has `focus-visible` styling, but many raw buttons and links do not. The mobile menu trigger, section nav buttons, logo button, footer links, and social icons rely on hover more than keyboard-visible state.
- `src/components/sections/Header.tsx` and `Hero.tsx`: smooth scrolling is always enabled and does not respect reduced-motion preferences.
- `src/components/sections/Hero.tsx`, `Tickets.tsx`, `Speakers.tsx`, `Header.tsx`: gradients, blob backgrounds, gradient text, gradient badges, and gradient CTA fills are all used at once. The palette itself is approved, but the decorative density is too high for a controlled refinement path.

### Medium

- `src/components/sections/Header.tsx`, `Hero.tsx`, `About.tsx`, `Program.tsx`, `Speakers.tsx`, `Tickets.tsx`, `Faq.tsx`, `Footer.tsx`: containers are close but not unified. The page alternates between `max-w-4xl`, `max-w-5xl`, `max-w-6xl`, `max-w-3xl`, `max-w-2xl`, `max-w-lg`, and per-card `max-w-md`, with repeated `px-4 md:px-6`. The result is acceptable but drifts in rhythm from section to section.
- `src/components/sections/Tickets.tsx`: the visual emphasis system is too strong for every ticket card. All cards use prominent borders and large shadows, and the “popular” badge adds another gradient layer. Desktop impact: cards compete rather than form a clear primary-secondary hierarchy. Mobile impact: stacked cards feel heavy and repetitive.
- `src/components/sections/Speakers.tsx`: avatar treatment is not yet systematic. Photo cards use circular crops with a soft ring, while placeholders use a much louder gradient fill and white ring. The layout is recognizable, but missing-photo states do not feel like the same component family.
- `src/components/sections/Footer.tsx` and `Hero.tsx`: external platform and social links use mixed treatments. Some are icon circles, one is plain `VK` text in a circle, and Hero uses bright platform colors (`#FF0000`, `#7C3AED`) that step outside the core blue-pink-slate-white palette.
- `src/routes/__root.tsx`: metadata contains duplicated description and `og:description` entries in two languages. This is not a visual issue, but it is public-interface inconsistency and should be documented for a later non-UI cleanup task.

### Low

- `src/routes/__root.tsx`: `404` and error screens use generic token-based styles that do not match the conference page system. This is acceptable for now, but later stages should decide whether these screens belong to the same public visual language.
- `src/components/sections/Footer.tsx`: footer headings rely on uppercase tracking rather than stronger hierarchy through spacing and weight alone. This is readable, but part of the current overuse of decorative uppercase patterns.

## 4. Issues By Public Section

### Header

- File: `src/components/sections/Header.tsx`
- Strength: simple information architecture and mobile fallback are already present.
- Issue: header width uses the common `max-w-6xl`, but styling is local and detached from system tokens.
- Issue: desktop nav buttons and logo button are raw buttons without shared focus-visible treatment.
- Issue: mobile menu trigger has no explicit hit-area sizing beyond icon size, so touch comfort is not guaranteed at `360 px` and `390 px`.
- Issue: menu panel opens as a content block under the header rather than as a clearly separated mobile navigation layer; this is workable, but spacing and state treatment are lighter than the rest of the page.
- Desktop impact: acceptable structure with slightly mismatched CTA/button language.
- Mobile impact: likely the weakest interactive section because it depends on bare buttons and narrow tap rows.

### Hero

- File: `src/components/sections/Hero.tsx`
- Strength: strong recognizable first impression and clear primary CTA.
- Issue: Hero is the densest visual area and combines gradient background, two decorative blobs, badge ring, icon row, shadow-heavy CTA, and colored platform links.
- Issue: no explicit text-width token beyond `max-w-2xl` on the subtitle; long `config.title`, `config.subtitle`, or `config.location` can grow vertically fast.
- Issue: two CTA buttons restyle the shared button component locally instead of using a controlled variant set.
- Issue: platform links at the bottom use brand-specific colors that break the otherwise approved palette.
- Desktop impact: still visually appealing but noisier than the rest of the page.
- Mobile impact: long titles, subtitles, and location strings are the first likely wrapping stress points at `360 px` and `390 px`.

### Speakers

- File: `src/components/sections/Speakers.tsx`
- Strength: simple grid and readable card hierarchy.
- Issue: card shell is local, not a shared card primitive.
- Issue: missing-photo placeholder is much louder than the photo state and therefore visually inconsistent.
- Issue: long speaker names, titles, and bios have no width or length management; all cards simply expand.
- Issue: `sm:grid-cols-2 lg:grid-cols-3` is reasonable, but there is no separate mobile tuning for bio length, card padding, or avatar size.
- Desktop impact: the grid works with short content.
- Mobile impact: stacked bios can make the section feel long and visually flat when speaker count increases.

### About

- File: `src/components/sections/About.tsx`
- Strength: accordion structure and highlight-card idea fit the product well.
- Issue: confirmed technical defects make this section the current highest-risk public section.
- Issue: accordion shell is repeated with local border/padding classes instead of a shared section pattern reused with FAQ.
- Issue: highlight cards use different card language than speakers/program/tickets and currently lose padding due to invalid class.
- Issue: unknown `highlight.icon` values silently collapse to `sparkles`, which is acceptable technically but increases the need for a documented icon policy.
- Desktop impact: broken fallback text and collapsed highlight padding are immediately visible.
- Mobile impact: the same defects become more severe because each item occupies the full width.

### Program

- File: `src/components/sections/Program.tsx`
- Strength: timeline content is easy to scan.
- Issue: `md:grid-cols-[120px_1fr]` introduces a hard-coded time column that may not hold longer labels or localized strings gracefully.
- Issue: time labels use uppercase tracking and blue accent while the card shell is otherwise neutral; visually this works, but it is another local pattern.
- Issue: there is no separate style handling for long titles, long speaker names, or long descriptions from Directus.
- Desktop impact: likely stable with current short sample data.
- Mobile impact: long content will turn into tall single-column cards quickly, increasing perceived density.

### Tickets

- File: `src/components/sections/Tickets.tsx`
- Strength: commercial hierarchy is clear and CTA placement is strong.
- Issue: ticket cards are visually heavier than every other card family because they combine thick borders, large shadows, large prices, gradient badges, and gradient CTA fills.
- Issue: every ticket card uses the same loud outline even when not popular.
- Issue: price row can wrap awkwardly with longer numbers or currency formats because `text-4xl` is paired with old price inline.
- Issue: feature lists, descriptions, and large ticket counts are allowed to grow without compensating layout rules.
- Desktop impact: usable but visually over-emphasized.
- Mobile impact: stacked heavy cards can feel repetitive and oversized, especially with many features.

### FAQ

- File: `src/components/sections/Faq.tsx`
- Strength: structurally close to About and already simple.
- Issue: FAQ duplicates About’s accordion shell instead of sharing a section-level accordion style contract.
- Issue: accordion trigger/button styling still depends on local overrides and lacks a dedicated focus-visible look.
- Issue: long Directus answers will simply expand without text-width moderation.
- Desktop impact: stable with current short content.
- Mobile impact: long answers may produce a very long final content block before the footer.

### Footer

- File: `src/components/sections/Footer.tsx`
- Strength: contact grouping is clear and readable.
- Issue: footer is the only full dark section, which is fine, but its link/icon system is mixed: Lucide icons, plain text `VK`, hover-only emphasis, and placeholder `"#"` links when URLs are missing.
- Issue: social circles are visually neat but not yet part of a reusable icon-button pattern.
- Issue: legal links and contact links have no shared focus-visible treatment.
- Desktop impact: footer remains readable but stylistically separate from the rest of the system.
- Mobile impact: stacked columns remain functional, but interaction affordances are subtle.

## 5. Separate Technical-Defect List

- `src/components/sections/About.tsx`: fallback title typo/corruption confirmed in `title: "Ϛ конфесренции"`.
- `src/components/sections/About.tsx`: fallback accordion label corruption confirmed in ``item.title?.trim() || `�одробнее ${index + 1}```.
- `src/components/sections/About.tsx`: invalid Tailwind utility `p6` confirmed on highlight cards; expected utility format is `p-6`.
- `src/routes/__root.tsx`: duplicate `description` and `og:description` meta entries in Russian and English create public metadata ambiguity.

## 6. Repeated Hard-Coded Values

| Value or pattern | Current repetition | Main locations |
| --- | --- | --- |
| `max-w-6xl` | primary wide container | `Header.tsx`, `Speakers.tsx`, `Tickets.tsx`, `Footer.tsx` |
| `max-w-5xl` | mid-width content sections | `About.tsx`, `Program.tsx` |
| `px-4 md:px-6` | default horizontal padding | almost every public section |
| `py-20 md:py-28` | default section vertical rhythm | `About.tsx`, `Speakers.tsx`, `Program.tsx`, `Tickets.tsx`, `Faq.tsx` |
| `text-3xl md:text-4xl` | section heading pattern | `About.tsx`, `Speakers.tsx`, `Program.tsx`, `Tickets.tsx`, `Faq.tsx` |
| `text-base md:text-lg` | section intro/body pattern | `Hero.tsx`, `Speakers.tsx`, `Program.tsx`, `Tickets.tsx`, `Faq.tsx` |
| `text-[#1E293B]` | primary text color | all public sections |
| `text-[#64748B]` | secondary text color | all public sections |
| `#0EA5E9` and `#0284C7` | primary brand blue and hover | `Header.tsx`, `Hero.tsx`, `About.tsx`, `Program.tsx`, `Tickets.tsx`, `Footer.tsx` |
| `#EC4899` | accent pink | `Header.tsx`, `Hero.tsx`, `About.tsx`, `Program.tsx`, `Tickets.tsx`, `Footer.tsx` |
| `bg-white` / `bg-[#F8FAFC]` | alternating section surfaces | most public sections |
| `rounded-xl` / `rounded-2xl` / `rounded-full` | card and control radii | all public sections |
| `shadow-sm` / `shadow-lg` | inconsistent elevation scale | `Header.tsx`, `Hero.tsx`, `Speakers.tsx`, `Program.tsx`, `Tickets.tsx`, `About.tsx` |
| `bg-gradient-to-r` or `bg-gradient-to-br` | decorative emphasis | `Header.tsx`, `Hero.tsx`, `Speakers.tsx`, `Tickets.tsx` |

Conclusion: the current UI already hints at a system, but the system lives as repeated literals rather than reusable tokens and variants.

## 7. Draft Design System

This section is a draft only and requires approval before implementation.

### Onest and proposed weights

- Future primary font: `Onest`
- Recommended weights: `400`, `500`, `600`, `700`
- Use one font family across all public sections and shared UI primitives
- Do not install or connect Onest in this task

### Typography scale

Recommended public scale:

| Token | Proposed use | Size / line-height / weight |
| --- | --- | --- |
| `display-hero` | main hero title | `40/46 700` mobile, `56/62 700` desktop |
| `heading-1` | large standalone pages if needed | `36/42 700` mobile, `48/54 700` desktop |
| `heading-2` | section titles | `30/36 700` mobile, `36/44 700` desktop |
| `heading-3` | card titles | `24/30 600` |
| `title` | compact subheadings | `20/28 600` |
| `body-lg` | key intro copy | `18/30 400` |
| `body` | default paragraphs | `16/26 400` |
| `body-sm` | secondary content | `14/22 400` |
| `caption` | metadata, helper text | `12/18 500` |

Rules:

- reserve uppercase only for tiny metadata labels, not for major headings
- keep tracking tight only on hero and section headings
- use one body line-height rhythm for all long Directus copy
- keep Cyrillic-safe font metrics as a mandatory selection criterion for Onest rollout

### Containers

- Main container: `72rem / 1152px`
- Narrow content container: `48rem / 768px`
- Medium content container: `56rem / 896px` for hero or long intro blocks when needed
- Avoid section-specific max-width improvisation unless a component has a documented exception

### Responsive horizontal padding

- `16px` at `360-389 px`
- `20px` at `390-767 px`
- `24px` at `768-1023 px`
- `32px` at `1024 px+`

### Section vertical rhythm

- Hero: visually special, but normalize inner spacing to the same scale
- Standard section top/bottom padding: `80px` mobile, `112px` desktop
- Tight content groups inside a section: `12px`, `16px`, `24px`
- Section intro to content block gap: `40px` mobile, `48px` desktop

### Spacing scale

- Base scale: `4, 8, 12, 16, 24, 32, 48, 64, 80, 112`
- Use `24` as the default card padding
- Use `32` only for emphasized cards such as ticket panels

### Radii

- `12px`: small controls, badges, accordion shells
- `16px`: default buttons and compact cards
- `24px`: feature cards, speaker cards, ticket cards
- `999px`: pills and circular elements

### Borders

- Default border: `1px solid` semantic soft border
- Emphasis border: `2px solid` only for truly promoted ticket or callout states
- Border color should be semantic, not component-local hex in most cases

### Shadows

- `shadow-xs`: subtle controls only
- `shadow-sm`: default card elevation
- `shadow-md`: emphasized CTA or one promoted surface
- Remove the current habit of combining many gradients with many shadows in the same block

### Palette and semantic tokens

Preserve the current palette family:

- `brand-blue`: `#0EA5E9`
- `brand-blue-hover`: `#0284C7`
- `brand-pink`: `#EC4899`
- `surface-soft-blue`: `#E0F2FE`
- `surface-soft-pink`: `#FCE7F3`
- `surface-alt`: `#F8FAFC`
- `surface-base`: `#FFFFFF`
- `text-primary`: `#1E293B`
- `text-secondary`: `#64748B`
- `text-tertiary`: `#94A3B8`
- `border-soft`: slate-200 equivalent
- `footer-bg`: `#0F172A`

Rules:

- keep current blue, pink, slate, and white palette
- reduce arbitrary extra colors such as bright red and purple in the public interface
- gradients should become selective accents, not the default answer for every highlighted element

### Buttons

- Primary button: solid blue, white text, one standard hover state
- Secondary button: white or surface background with blue border/text
- Ghost/text button: neutral text treatment for supporting actions
- Promoted gradient button: at most one controlled variant, not multiple section-local implementations
- Shared sizes: `sm`, `md`, `lg` with one height system
- All public button-like links should use one shared focus-visible ring treatment

### Cards

- One default public card shell for speakers, highlights, program items, and FAQ shells where appropriate
- One promoted card shell for featured ticket emphasis only
- Shared ingredients: neutral surface, soft border, consistent radius, consistent padding, restrained shadow
- Local section classes should not redefine card identity unless the difference is intentional and documented

### Icons

- Use Lucide for interface icons
- Keep one stroke weight and one common size family: `16`, `20`, `24`
- If Lucide lacks an official brand icon, prefer a neutral text link or unobtrusive label rather than an invented pseudo-brand badge

### Images and placeholders

- Keep speaker avatars visually consistent with one crop rule
- Proposed rule: square source area, circular presentation, `object-cover`, predictable ring treatment
- Placeholder treatment should be calmer than the current loud gradient version
- Initials placeholder should use the same component shell as real photos, not feel like a separate art direction

### Breakpoints

- Preserve Tailwind baseline breakpoints already in use
- Add manual QA targets for `360 px`, `390 px`, `768 px`, `1024 px`, and `1440 px`
- Treat mobile as a separate adaptation pass, not just desktop styles collapsing naturally

## 8. Risks From Dynamic Directus Content

- `src/components/sections/Hero.tsx`: long `title`, `subtitle`, `date`, `time`, or `location` can increase vertical height quickly and disturb hero balance.
- `src/components/sections/Speakers.tsx`: long names, titles, and bios can create uneven card heights and very tall mobile stacks.
- `src/components/sections/About.tsx`: long accordion `text` values can create very tall panels.
- `src/components/sections/Program.tsx`: long `time_slot`, `title`, `speaker`, and `description` values can destabilize timeline rhythm.
- `src/components/sections/Tickets.tsx`: long ticket names, feature lists, and prices can wrap awkwardly inside the large-price row and CTA stack.
- `src/components/sections/Faq.tsx`: long answers can create an oversized final section block without visual pacing helpers.
- `src/components/sections/Footer.tsx`: missing URLs fall back to `"#"` and remain interactive, which is acceptable for staging but risky for public polish.
- `src/lib/directus.ts`: demo fallback data can mask layout stress because current fallback content is shorter and cleaner than likely real content.

## 9. Recommended Staged Implementation Sequence

### Stage 1: foundation tokens and typography

Goal: introduce the approved design-system primitives without changing section order or business logic.

Expected files:

- `src/styles.css`
- `src/components/ui/button.tsx`
- `src/components/ui/accordion.tsx`
- `src/routes/__root.tsx`

### Stage 2: shared container and section rhythm pass

Goal: normalize width, horizontal padding, heading blocks, and section spacing across the public page.

Expected files:

- `src/routes/index.tsx`
- `src/components/sections/Header.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/Speakers.tsx`
- `src/components/sections/About.tsx`
- `src/components/sections/Program.tsx`
- `src/components/sections/Tickets.tsx`
- `src/components/sections/Faq.tsx`
- `src/components/sections/Footer.tsx`

### Stage 3: component cohesion and decoration reduction

Goal: unify buttons, cards, badges, shadows, radii, and controlled gradient usage while preserving recognizability.

Expected files:

- `src/components/ui/button.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/Speakers.tsx`
- `src/components/sections/About.tsx`
- `src/components/sections/Program.tsx`
- `src/components/sections/Tickets.tsx`
- `src/components/sections/Footer.tsx`

### Stage 4: manual mobile adaptation

Goal: handle `360 px` and `390 px` deliberately instead of relying on desktop collapse.

Expected files:

- `src/components/sections/Header.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/Speakers.tsx`
- `src/components/sections/About.tsx`
- `src/components/sections/Program.tsx`
- `src/components/sections/Tickets.tsx`
- `src/components/sections/Faq.tsx`
- `src/components/sections/Footer.tsx`

### Stage 5: accessibility and content-hardening pass

Goal: add consistent focus-visible treatment, reduced-motion handling, placeholder cleanup, and long-content resilience.

Expected files:

- `src/components/ui/button.tsx`
- `src/components/ui/accordion.tsx`
- `src/components/sections/Header.tsx`
- `src/components/sections/Hero.tsx`
- `src/components/sections/Speakers.tsx`
- `src/components/sections/About.tsx`
- `src/components/sections/Program.tsx`
- `src/components/sections/Tickets.tsx`
- `src/components/sections/Faq.tsx`
- `src/components/sections/Footer.tsx`

## 10. Questions Requiring User Approval

- Should future Onest integration be self-hosted in the repository or loaded from an external provider?
- Should social and platform links without an official Lucide brand icon be normalized to accessible text links or neutral pills instead of colorful pseudo-brand buttons?
- Is the intended direction to keep gradients only as sparse accents, for example Hero emphasis and possibly one promoted ticket badge, instead of using them in buttons, avatars, headings, and badges simultaneously?

## 11. Responsive And Browser Verification Status

- Code-based responsive audit was completed against the required target widths: `360 px`, `390 px`, `768 px`, `1024 px`, `1440 px`
- Local app server was started successfully and responded with HTTP `200` on `http://127.0.0.1:4173`
- Real browser visual verification was attempted but not completed because the in-app browser bootstrap failed in this desktop session with a local permission/runtime error before a page could be opened
- Therefore this report does not claim completed visual browser verification

## 12. Summary Direction

The current UI is already approved in concept and should not be redesigned. The right next move is a staged refinement that:

- standardizes typography around future `Onest`
- turns repeated literals into one approved container/spacing/token system
- unifies buttons, accordions, and cards
- reduces decorative noise without losing the current blue-pink-slate identity
- performs a separate mobile pass
- fixes the confirmed About defects first

No changes are proposed here to routes, Directus integration, SSR, business logic, dependencies, section order, or content model.
