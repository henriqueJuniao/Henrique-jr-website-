# HenriqueJR — Design Direction

## Three Directions Considered

### Theme Name: Editorial Discipline

**Very Brief Intro:** A Swiss-editorial system with athletic restraint: white space, confident black typography, documentary photography, and precise section rules. It feels premium because everything is intentional, not decorative.

**Probability:** 0.04

### Theme Name: Modern Dojo

**Very Brief Intro:** A warmer, tactile direction inspired by Japanese publishing, using off-white paper tones, close crops, and quieter typographic hierarchy. It would feel human and established while keeping the martial-arts reference subtle.

**Probability:** 0.07

### Theme Name: Executive Performance

**Very Brief Intro:** A sharper corporate-performance direction with dense sans-serif typography, darker image bands, and modular information blocks. It would foreground credibility for professional and corporate audiences.

**Probability:** 0.02

## Chosen Direction: Editorial Discipline

### Design Movement

**Swiss International Style filtered through contemporary sports editorial design.** The site combines objective typographic hierarchy, asymmetrical composition, documentary photography, and restrained pacing. It takes cues from Monocle's editorial confidence, Apple's reduction, Porsche's precision, and Nike's respect for the athlete without copying any one reference.

### Core Principles

1. **Content before decoration.** Supplied copy and photography carry the experience; styling clarifies rather than competes.
2. **Restraint signals confidence.** White space, black type, fine rules, and one muted-gold accent replace gradients, glossy effects, and visual noise.
3. **Editorial rhythm over card grids.** Pages unfold through varied image scales, offset text columns, numbered section labels, and quiet transitions rather than repeated rounded containers.
4. **Brazilian Jiu-Jitsu remains central.** Corporate, private, seminar, and children's coaching are presented as applications of Henrique's BJJ expertise, never as a generic lifestyle-coaching brand.

### Color Philosophy

The interface is predominantly **true white** to suggest clarity, trust, and room to think. **Near-black** carries all primary typography and graphic structure. A single **muted gold (#A87418)** appears only as a fine line, active-state marker, eyebrow label, or tiny typographic detail; it denotes earned distinction rather than luxury theatre. Cool greys may support captions and form states, but no additional brand colors are introduced.

### Layout Paradigm

The site uses an **asymmetrical editorial sequence** rather than a centralized grid. Desktop sections commonly pair a narrow contextual rail with a wider content field, while photography alternates between full-bleed bands, edge-aligned portrait crops, and inset documentary frames. Mobile collapses to a single clear reading column while retaining section indices, deliberate image ratios, and generous vertical rhythm.

### Signature Elements

1. **Editorial rules and indices:** hairline black dividers, small uppercase labels, and two-digit section numbers create structure without boxes.
2. **Image-led split frames:** portrait and coaching photography sit against white space with intentional crop anchors, never decorative overlays.
3. **Muted-gold registration mark:** a short gold rule or square appears sparingly beside key labels and active navigation states.

### Interaction Philosophy

Interactions should feel immediate and composed. Links use a precise underline or rule shift; buttons compress slightly on press; the mobile menu opens as a clean full-height editorial sheet. No parallax, sliders, carousels, or attention-seeking effects. Keyboard focus remains explicit and high contrast.

### Animation

Motion is limited to transform and opacity, generally 160–240 ms with a decisive ease-out. Section content may reveal with a subtle 12 px vertical shift and short stagger when it first enters the viewport. Hover states move rules by only a few pixels. The navigation background becomes opaque when needed for contrast. All non-essential motion is disabled under `prefers-reduced-motion`.

### Typography System

**Instrument Sans** is the primary typeface for navigation, body copy, labels, forms, and most headings because it is clean without feeling generic. **Source Serif 4** is reserved for testimonial excerpts and selected editorial statements, adding humanity and reading depth without making the brand feel ornamental. Headings use tight tracking and strong weight contrast; body copy remains 17–20 px with generous line height; metadata and section indices use uppercase sans-serif at 11–12 px with expanded tracking.

### Brand Essence

**HenriqueJR is world-class Brazilian Jiu-Jitsu coaching for people who value technical depth, individual attention, and long-term development.**

Personality: **Assured. Precise. Approachable.**

### Brand Voice

Headlines are direct, natural, and outcome-aware without exaggerated promises. Calls to action are calm and specific. Microcopy answers practical questions rather than performing enthusiasm.

Example headline: **“Coaching built around the person in front of you.”**

Example CTA: **“Request a consultation.”**

### Wordmark & Logo

Use the supplied HenriqueJR SVG exactly as the graphic source. Preserve its silhouette and geometry; only the explicitly approved black, white, and muted-gold color variants may be derived. The mark should appear as a confident editorial signature in the header, footer, favicon, and selected section transitions—never with shadows, gradients, bevels, or added decoration.

### Signature Brand Color

**Henrique Gold — #8A5F0D.** It is deliberately quieter and browner than bright metallic gold, supporting authority without making the site feel ostentatious.

## Style Decisions

- Use only the supplied photography and preserve its natural documentary character.
- Do not generate, enhance, or replace people or environments.
- Testimonial excerpts on the homepage appear as typographic interludes between substantive sections, not as a consolidated component.
- Full testimonials remain unedited on `/testimonials` and are presented as long-form editorial reading with relevant coaching imagery.
- Corners remain mostly square; soft rounding is reserved for form controls only where it aids usability.
- Every page file and shared styling file must begin with a concise reminder of this chosen design philosophy.

### Final Review Amendments

- Every major section pairs generous white space with a visible editorial anchor: a section index, fine rule, documentary image, credential, or typographic statement.
- Henrique Gold `#8A5F0D` remains a registration color only, reserved for section numbers, active navigation markers, fine rules, and key metadata—never broad fills, gradients, or decoration.
- Brand voice favors practical coaching specificity—technical depth, individual attention, confidence under pressure, and long-term development—over generic premium abstraction.

### Version 2 Refinement Decisions

Version 2 preserves Editorial Discipline while making the brand more recognisably HenriqueJR. The supplied logo is rendered approximately 30% larger, the header gains corresponding height, and headings use greater scale rather than additional colour or effects. The homepage hero retains its split architecture but now leads with a human teaching image, a more assertive typographic balance, and a stronger primary consultation CTA.

Photography is treated as documentary evidence of coaching: teaching frames become larger and more recurrent, the existing service list gains bespoke image-led rows, and the Kids page uses a deliberately composed mobile gallery rather than compressed thumbnails. Testimonials retain unboxed long-form reading but receive larger serif typography, more whitespace, clearer author rules, and independently tuned mobile columns. Desktop spacing was reviewed at approximately 1440px and mobile spacing at approximately 390px across every page.

### Version 3 Polishing Decisions

- The mobile navigation is a true document-level modal sheet: it owns the full viewport, locks background scrolling, marks page content inert, traps focus, and restores both focus and scroll position on close.
- Supplied photography follows its source orientation on mobile. Landscape teaching and group photographs remain landscape; portrait photographs retain portrait proportions. Editorial variation comes from relative width and sequencing rather than destructive crops.
- The supplied logo is scaled approximately 30–40% beyond Version 2 and the header height grows proportionally, with no change to the mark itself.
- “Teaching comes first.” replaces internal design language and becomes the only Version 3 visitor-copy change.
- Long testimonial excerpts gain a modest mobile serif-scale increase within the existing archive structure; no pull quotes, new modules, or rewritten testimony are introduced.
- Broader recommendations to create new service-page modules or rewrite brand language are intentionally rejected because they would conflict with the Revision Round 2 no-redesign and supplied-copy constraints.
