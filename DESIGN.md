---
name: Sundollar — Swipe to Save
description: Bright-Floridian youth-bank demo where saving is one sun-swipe chained into a visible streak.
colors:
  # Flamingo Daylight (light theme, [data-theme='light'])
  guava: "#f2336b"
  tangerine: "#f26a1b"
  sunshine: "#ffc531"
  surf: "#00a99f"
  surf-deep: "#007d76"
  palm: "#1c7a5e"
  ink-lagoon: "#113231"
  ink-soft: "#43655f"
  ink-faint: "#54736c"
  ink-on-loud: "#ffffff"
  warm-white-card: "#fffdf8"
  seafoam-field: "#f2f7f2"
  pill-track-mist: "#eaf6f1"
  # Neon Night Swim (dark theme, [data-theme='dark'])
  night-guava: "#ff5c8a"
  night-tangerine: "#ff8a4c"
  night-sunshine: "#ffd34d"
  night-surf: "#2be5d6"
  night-surf-deep: "#17b3a8"
  night-palm: "#58e0a6"
  night-ink: "#f3f5ff"
  night-ink-soft: "#aeb6e6"
  night-ink-faint: "#7e87c4"
  night-ink-on-loud: "#10142e"
  night-card: "#151b46"
  night-sheet: "#171d4c"
  night-field: "#1e2558"
typography:
  display:
    fontFamily: "Bricolage Grotesque Variable, sans-serif"
    fontSize: "30px–34px"
    fontWeight: 800
    letterSpacing: "-0.02em"
  headline:
    fontFamily: "Bricolage Grotesque Variable, sans-serif"
    fontSize: "24px–27px"
    fontWeight: 800
    lineHeight: 1.1
    letterSpacing: "-0.02em"
  title:
    fontFamily: "Bricolage Grotesque Variable, sans-serif"
    fontSize: "19px–22px"
    fontWeight: 800
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Rubik Variable, system-ui, sans-serif"
    fontSize: "13.5px–15px"
    fontWeight: 400
    lineHeight: 1.45
  label:
    fontFamily: "Rubik Variable, system-ui, sans-serif"
    fontSize: "13px–14.5px"
    fontWeight: 600
rounded:
  connector: "3px"
  tile: "12px"
  field: "14px"
  emoji-btn: "16px"
  island: "20px"
  teaser: "24px"
  hero-emoji: "26px"
  card: "28px"
  screen: "52px"
  phone: "64px"
  pill: "999px"
spacing:
  hairline: "2px"
  xs: "6px"
  sm: "8px"
  row: "12px"
  md: "14px"
  card-pad: "20px"
  sheet-pad: "22px"
  section: "26px"
components:
  cta-pill:
    backgroundColor: "{colors.guava}"
    textColor: "#2a0a18"
    rounded: "{rounded.pill}"
    height: "64px"
    width: "100%"
  swipe-pill-track:
    backgroundColor: "{colors.pill-track-mist}"
    textColor: "{colors.ink-soft}"
    rounded: "{rounded.pill}"
    height: "64px"
  chip:
    backgroundColor: "rgba(0, 169, 159, 0.1)"
    textColor: "{colors.ink-lagoon}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 18px"
  chip-selected:
    backgroundColor: "{colors.ink-lagoon}"
    textColor: "{colors.warm-white-card}"
    rounded: "{rounded.pill}"
    height: "48px"
    padding: "0 18px"
  field:
    backgroundColor: "{colors.seafoam-field}"
    textColor: "{colors.ink-lagoon}"
    rounded: "{rounded.field}"
    height: "48px"
    padding: "0 14px"
  emoji-btn:
    backgroundColor: "{colors.seafoam-field}"
    rounded: "{rounded.emoji-btn}"
    size: "48px"
  save-card:
    backgroundColor: "{colors.warm-white-card}"
    rounded: "{rounded.card}"
    padding: "20px 20px 18px"
    height: "482px"
  link-below:
    textColor: "{colors.surf-deep}"
    height: "44px"
---

# Design System: Sundollar — Swipe to Save

## Overview

**Creative North Star: "Flamingo Daylight, Neon Night Swim"**

Sundollar is an invented, clearly synthetic bright-Floridian youth bank, and its
world is one Florida day seen twice. In light mode ("Flamingo Daylight") the
phone screen is open air — a sky-to-sand gradient (`#45cdef → #a9eee6 → #fff1c9
→ #ffdf9e`) with a warm sun-glow radial in the top-right corner — and content
lives on a warm-white card floating in that air. In dark mode ("Neon Night
Swim") the same screen becomes deep-ocean indigo (`#060b26 → #131347 →
#2e1250`) with a guava glow rising from the bottom edge, and every accent
re-inks to neon. The thesis (pinned in `index.html`): saving is one sun-bright
thumb gesture chained into a visible streak; this world explicitly refuses the
gray fintech dashboard-of-toggles.

Energy and saturation are features, not decoration — but numbers stay instantly
legible: amounts and dates always render in high-contrast ink with
`font-variant-numeric: tabular-nums`. The interface is dense in the way a good
phone widget is dense: one 482px card carries the entire product loop (invite →
goal → swipe → streak → finale), and every state of that card shares one fixed
five-slot geometry so the eye always knows where money things live. Delight is
earned, not ambient: celebrations (confetti takeover, piggy pop, fireworks)
fire only in response to a completed save, then get out of the way.

**Key Characteristics:**
- Two fully authored themes — Flamingo Daylight and Neon Night Swim — swapped by a single `data-theme` attribute on the phone screen; components reference only tokens, never raw hex.
- One sacred card geometry: 482px, five fixed grid slots, in every state.
- A four-accent "crayon box" (guava / tangerine / sunshine / surf) where each color has a real job.
- Bricolage Grotesque 800 shouts, Rubik speaks; drawn 1.8-stroke icons.
- Motion is spring-based (framer-motion) with authored reduced-motion equivalents for everything.
- The demo shell is deliberately outside the world: a 393×852 phone frame on an always-black stage.

## Colors

A four-crayon Floridian accent box over airy gradient grounds, fully re-inked
for night. Tokens live in `src/theme/tokens.css`, scoped to `[data-theme]` on
the phone screen (the page around the phone is always black and unthemed).

### Primary
- **Guava** (`--guava`, light `#f2336b` / dark `#ff5c8a`): the action color. Fills the CTA pill ("Start a goal", "Start my chain"), the active stepper dot, the avatar, the piggy bank's body, the selected-emoji border, and the delete link. Guava means "this is the exciting thing to do or the thing in motion."

### Secondary
- **Surf** (`--surf`, light `#00a99f` / dark `#2be5d6`) with **Surf Deep** (light `#007d76` / dark `#17b3a8`): the done/selected/interactive-text color. Completed stepper dots and filled connectors, chip tints and borders, "Edit" and "Add my own" links, field focus borders, and the focus ring (`--focus-ring`: `#007d76` light / `#2be5d6` dark). Surf means "locked in, saved, or tappable text."

### Tertiary
- **Sunshine** (`--sun`, light `#ffc531` / dark `#ffd34d`) and **Tangerine** (`--tang`, light `#f26a1b` / dark `#ff8a4c`): the sun itself. Together they form the radial sun-disc gradient used for the swipe-pill thumb and the wordmark disc (`--pill-thumb`), the dropping coin, and the piggy's snout/cheek. They are the gesture's color; they rarely appear as flat UI fills.
- **Palm** (`--palm`, light `#1c7a5e` / dark `#58e0a6`): supporting green; appears in the confetti/firework palettes only.

### Neutral
- **Ink Lagoon** (`--ink`, light `#113231` / dark `#f3f5ff`): primary text — a deep sea-teal rather than black in daylight.
- **Ink Soft** (`--ink-soft`, light `#43655f` / dark `#aeb6e6`): explainers, secondary copy, pill labels.
- **Ink Faint** (`--ink-faint`, light `#54736c` / dark `#7e87c4`): metadata (goal dates), placeholders.
- **Ink On Loud** (`--ink-on-loud`, light `#ffffff` / dark `#10142e`): text sitting on saturated fills (done stepper dots).
- **Warm White Card** (`--card-bg`, light `#fffdf8` / dark `#151b46`): the card and sheet surface (`--sheet-bg` is `#fffdf8` / `#171d4c`). Never pure white in daylight; warm like sand.
- **Seafoam Field** (`--field-bg`, light `#f2f7f2` / dark `#1e2558`) and **Pill Track Mist** (`--pill-track`, light `#eaf6f1` / dark `#1e2558`): recessed input and track surfaces.
- Borders are ink-derived alphas: `--card-border` rgba(18,52,51,0.08) light / rgba(180,196,255,0.14) dark; `--field-border`, `--chip-border`, `--pill-track-border` follow the same pattern.
- Scrim: `--scrim` rgba(8,34,40,0.42) light / rgba(3,6,22,0.62) dark.

### Celebration palettes
Canvas effects read colors from CSS tokens, never hardcode them:
- `--confetti-colors`: light `#f2336b, #f26a1b, #ffc531, #00a99f, #1c7a5e, #ffffff` / dark `#ff5c8a, #ff8a4c, #ffd34d, #2be5d6, #58e0a6, #f3f5ff`.
- `--firework-colors`: light `#f2336b, #f26a1b, #ffc531, #00a99f` (saturated only — white and palm vanish against the daylight sky) / dark `#ff5c8a, #ff8a4c, #ffd34d, #2be5d6, #58e0a6`.

### Named Rules
**The Crayon Box Rule.** Four accents, four jobs: guava acts, surf confirms,
sunshine-and-tangerine embody the sun gesture, palm only parties. Never swap
their roles, and never introduce a fifth accent.

**The Re-Ink Rule.** Components reference only `--token` custom properties from
`tokens.css`; both themes come for free. A raw hex in a component file is a
bug (the only exceptions in code today are text-on-guava `#2a0a18`, piggy
detail inks `#3d0f22`/`#2a0a18`, and the demo shell, which lives outside the
themed world).

## Typography

**Display Font:** Bricolage Grotesque Variable (fallback: sans-serif) — via `@fontsource-variable/bricolage-grotesque`
**Body Font:** Rubik Variable (fallback: system-ui, sans-serif) — via `@fontsource-variable/rubik`

**Character:** Bricolage at weight 800 with tight negative tracking is the hype
voice — sunny, punchy, a little loud. Rubik is the calm, rounded UI voice that
carries everything else. There is no third font and no mono; numerals stay
trustworthy through `font-variant-numeric: tabular-nums`, not a typeface swap.

### Hierarchy
- **Display** (800, 30–34px, -0.02em): the biggest moments only — the saved-amount figure inside the card (34px `strong` in `.savecard__amount`) and celebration titles (30px). Always Bricolage.
- **Headline** (800, 24–27px, line-height 1.1, -0.02em): the app greeting ("Hey, Riley", 27px, `text-wrap: balance`) and sheet titles (24px).
- **Title** (800, 19–22px, -0.01em): card headers (19px), goal names (22px), the wordmark (21px). Bricolage.
- **Body** (400–600, 13.5–15px, line-height 1.45): explainers (13.5px, ink-soft), amounts context (15px), pill labels (15px/600). Rubik.
- **Label** (600–700, 13–14.5px): chips (14.5px/600), links and edit affordances (13–14px/600), stepper numbers (13px/700), statusbar (15px/600). Rubik.

### Named Rules
**The Two-Voice Rule.** If it celebrates, names, or counts money, it is
Bricolage 800 with negative tracking. Everything that explains or operates is
Rubik. Never use Bricolage below weight 800 or for body copy.

**The Honest Numbers Rule.** Every money amount and date renders in tabular
numerals; big figures are dark ink on the card surface, never on a saturated
fill.

## Layout

The demo shell: an always-black stage (`.stage`, flex-centered, 26px gap)
holding a phone frame and, below it, the demo controls. The phone
(`.phone`) is a 12px-padded `#0b0b10` body with 64px outer radius around a
fixed **393×852** screen at 52px radius; a 118×34 dynamic island floats at top
center and a 54px status bar (9:41, filled iOS-weight glyphs) overlays the
screen at `z-index: 70`. The `data-theme` attribute sits on `.phone__screen`,
which paints `--screen-bg` (the sky/ocean gradient) plus a `--screen-glow`
radial overlay, and crossfades backgrounds over 0.45s on theme change.

Inside the screen, the app column (`.apphome`) pads `72px 20px 0` with a 14px
gap: brand row (wordmark + avatar), greeting block, the save card, then a
round-ups teaser docked to the bottom edge (`margin-top: auto`, top-only 24px
radius, bottom border cut off by the screen edge).

**The card geometry contract.** `.savecard` is exactly **482px tall** with
`padding: 20px 20px 18px` and a five-row grid:

```
grid-template-rows: 26px  minmax(20px, auto)  1fr  48px  64px;   row-gap: 12px
      header row     explainer               hero  stepper  action
```

Every widget state — intro, fresh goal, streak, almost-there, chain-done —
renders through these same slots. Header text, explainer, stepper, and the
swipe pill never move between states.

Sheets are **full-screen modals** covering the entire phone screen (`inset: 0`
against the screen, `z-index` 60 scrim / 61 sheet), with a 74px-top header
clearing the status bar, a scrollable 22px-padded body with 26px section gaps,
and a footer pinned to the device's bottom edge honoring
`env(safe-area-inset-bottom)`.

Chip rows (`.chiprow`) bleed off both screen edges — `margin: 0 -22px; padding:
2px 22px` — and scroll horizontally with hidden scrollbars, always
left-aligned, never wrapping. Any "make your own" affordance is an underlined
link *below* the row, never a chip inside it.

There are no breakpoints: the world is fixed at 393px wide inside the frame.

### Named Rules
**The Five-Slot Rule.** No state of the save card may change the card's 482px
height, its five grid rows, or which slot a element type lives in. New states
compose within the slots.

**The Thumb-Reach Rule (ADA 44px).** Every interactive target is at least
44×44px: chips, fields, and emoji buttons are 48px; pills are 64px; smaller
visual affordances (the 26px-row Edit button, link-below buttons) claim a
44px hit area via `min-height`/negative margins.

## Elevation & Depth

A hybrid: soft tinted shadows lift the card, sheet, and thumb, while recessed
surfaces (field, pill track) sink via darker fills and hairline ink-alpha
borders rather than inner shadows. Light-mode shadows are never gray — they
are tinted deep-sea teal `rgba(9, 58, 66, …)` or accent-colored; dark-mode
shadows go true black with neon glows doing the lifting.

### Shadow Vocabulary
- **Card lift** (`--shadow-card`: light `0 18px 40px -18px rgba(9,58,66,0.4), 0 2px 8px -2px rgba(9,58,66,0.12)`; dark swaps to black at 0.65/0.4): the save card and the docked teaser.
- **Thumb glow** (`--shadow-thumb`: light `0 6px 14px -4px rgba(210,84,0,0.55)`; dark `… rgba(255,92,138,0.6)`): the sun-disc swipe thumb and wordmark disc — a warm cast, as if the sun lights its own track.
- **Sheet lift** (`--shadow-sheet`: `0 -18px 48px -20px …` upward): the modal sheet.
- **Pop** (`--shadow-pop`: light `0 24px 60px -20px rgba(242,51,107,0.45)`; dark guava-tinted): reserved for the guava CTA pill — the loudest shadow for the loudest button.
- **Active step glow** (`0 5px 16px -4px var(--step-active-bg)`): the pulsing current stepper dot.
- **Phone bezel** (on `.phone`, outside the themed world): stacked rings plus a faint `rgba(43,229,214,0.22)` teal aura on black.

### Named Rules
**The Tinted Shadow Rule.** No neutral-gray shadows anywhere. Daylight shadows
carry sea-teal; glow shadows carry the color of the thing casting them (orange
thumb, guava CTA, guava/pink active dot).

## Shapes

Pill-first geometry: anything tappable that spans the card is a full capsule
(`border-radius: 999px`) — the swipe track, the CTA, chips, the demo controls.
Containers are generously rounded rectangles on a rising scale: 14px fields,
16px emoji tiles, 24px teaser, 26px hero-emoji tile, 28px card, 52px screen,
64px phone body. Circles mark identity and progress: avatar, wordmark disc,
36px stepper dots, 52px sun-disc thumb. Borders are 1px hairlines in
ink-derived alpha (1.5px for the selected emoji tile's guava border; 2.5px
inset ring for idle stepper dots; 2px dashed outline for the ghost stepper).
Nothing is sharp-cornered inside the phone; the smallest radius in the world
is the 3px stepper connector.

Iconography is part of the form language: one drawn system (`icons.tsx`) on a
24-unit grid, 1.8 stroke, round caps and joins, always `currentColor` (sun,
moon, reset, close, sliders, chevron, coin, calendar). Status-bar glyphs are
the one exception — filled, matching iOS weight. The piggy bank is an authored
SVG mascot (side view, facing right, coin dropping into the slot) whose fills
ride theme tokens (`var(--guava)`, `var(--tang)`, `var(--sun)`) so it re-inks
itself in dark mode.

## Components

### Save Card (the signature component)
The whole product is one card. Character: a warm, steady stage that never
flinches while its contents change.
- **Shape:** 28px radius, 1px `--card-border`, `--shadow-card`, `overflow: hidden`.
- **Geometry:** 482px tall, five fixed grid rows (26px / minmax(20px,auto) / 1fr / 48px / 64px), 12px row gap, `padding: 20px 20px 18px`.
- **States (5):** intro (piggy + coin loop, ghost stepper, guava CTA), fresh (goal hero + swipe pill), streak (same + progress), almost ("You're almost there!"), chain-done (small piggy + total, "Start tomorrow's chain" CTA).
- **Header row:** 19px Bricolage title left; when a goal is active and the chain isn't done, a surf-colored "Edit" affordance (sliders icon + text, 44px hit area) sits right.
- **Hero:** goal emoji in a 72px tile (26px radius, chip tint + border), 22px goal name, 34px amount, calendar-icon date line in ink-faint.

### Swipe Pill (the sacred gesture)
- **Track:** 64px capsule, `--pill-track` fill, 1px `--pill-track-border`, `touch-action: pan-y`.
- **Thumb:** 52px sun-disc circle (radial `--pill-thumb`: sunshine core → amber → tangerine rim; dark: night-sunshine → night-tangerine → night-guava), `--shadow-thumb` plus a 1.5px inset `--pill-thumb-ring`, dark-brown chevron glyph; `cursor: grab`, scales 1.06 while pressed.
- **Fill:** a surf-to-sunshine gradient (`--pill-fill`) trails the thumb, its width bound to drag position.
- **Label:** 15px/600 `--pill-label` center text ("Swipe to save $10") with three chevrons pulsing opacity in a 1.5s staggered loop; label fades out over the first 55% of the drag.
- **Behavior:** drag right; ≥82% travel completes (spring 420/34 to the end, thumb shows a drawn check), otherwise springs back (260/26). Keyboard: slider role, ArrowRight/Left steps 20%, Enter/Space completes; announces via `aria-valuetext` and a polite `aria-live` status.

### CTA Pill
- **Shape:** identical 64px capsule footprint as the swipe pill — they share the action slot exactly.
- **Style:** guava fill, dark-plum text (`#2a0a18`), Bricolage 16.5px/700, chevron-right icon, `--shadow-pop`.
- **Hover:** `brightness(1.07)` + 1px lift; **disabled:** 45% opacity, shadow removed.

### Stepper (reactbits grammar)
- **Dots:** 36px circles. Idle = transparent with 2.5px inset ring + 13px/700 number in `--step-idle-ink`. Active = guava fill, guava glow shadow, 11px white pulse dot, scale-pop `[1, 1.18, 1]` on becoming active. Done = surf fill, `--ink-on-loud` check drawn via SVG `pathLength` 0→1 (0.3s, 0.1s delay).
- **Connectors:** 5px bars, 3px radius, `--step-connector` base; fill sweeps in `--step-connector-done` with a spring (stiffness 210, damping 28).
- **Ghost variant** (intro card): 45% opacity, dashed 2px outlines instead of rings — a preview of the chain before it exists.
- **Semantics:** `role="img"` with a summary label ("Save chain: 2 of 5 swipes complete").

### Chips + Link-Below (the option-row pattern)
- **Chip:** 48px capsule, surf-alpha tint `--chip-bg` + `--chip-border`, 14.5px/600 ink text, optional leading emoji; hover brightens border to surf.
- **Selected:** `aria-pressed="true"` flips to solid `--chip-active-bg` (ink-lagoon light / night-surf dark) with `--chip-active-ink` text.
- **Row:** never wraps; bleeds off both screen edges and swipe-scrolls, scrollbar hidden.
- **Link-below:** the escape hatch ("Add my own", "Enter my own amount") is an underlined 14px/600 surf-deep link with a 44px hit area, sitting under its row; toggling it open reveals custom fields, toggling back restores the prior chip choice.

### Inputs / Fields
- **Style:** 48px, 14px radius, `--field-bg` recessed fill, 1px `--field-border`, 15px ink text, `--ink-faint` placeholders.
- **Focus:** money field border shifts to surf on `:focus-within`; everything else uses the global focus ring (`outline: 2px solid var(--focus-ring); outline-offset: 2px`).
- **Money variant:** leading `$` in ink-soft/600, borderless inner number input.
- **Emoji picker:** 48px tiles, 16px radius, field fill; hover scales 1.08; selected gets a 1.5px guava border over chip tint.

### Full-Screen Sheet
- **Pattern:** modal covers the entire phone screen (not a partial bottom sheet), rising from the device's bottom edge with a spring (320/34); scrim fades 0.22s. Reduced motion: fade instead of slide.
- **Chrome:** 24px Bricolage title, 44px circular close button (field fill), pinned footer with a top hairline carrying the CTA pill; edit mode adds a guava "Delete this goal" text button beneath.
- **Focus:** dialog semantics, focus trap, Escape closes, focus moves into the sheet on open.

### Celebrations
- **Save takeover:** a full-card overlay (`inset: 0`, card background, 28px radius, `z-index` 10) springs in (opacity+scale 0.28s) with a 130-particle confetti burst fanning from top-center under gravity (canvas, 2s, reads `--confetti-colors`) and a spring-in "You saved $10!" title; holds 2400ms then auto-dismisses upward (1500ms and no particles under reduced motion).
- **Finale:** same takeover with the piggy popping in (scale `0→1.18→0.96→1` with rotation, 0.7s), a coin dropping into its slot, longer confetti (2.6s), and a fireworks canvas that breaks the card's bounds (`inset: -170px -24px`, `z-index` 30): 8 staggered shell bursts ringing the card over ~2.2s, gravity-decayed sparks with 8px glow. Dark mode composites `lighter` with white-hot cores; light mode stays `source-over` with the saturated-only palette. Holds 4300ms (2000ms reduced, no particles — the piggy pop and staged text remain).

### Demo Controls (outside the world)
Under the frame on the black stage: a pill group with two 44px sun/moon
toggle buttons (`aria-pressed`, white-on-selection) and a 48px "Reset demo"
pill; grays (`#969aa3` on `rgba(255,255,255,0.09)`) that deliberately do not
participate in the Sundollar palette.

### Named Rules
**The Sacred Footprint Rule.** The swipe pill and the CTA pill occupy the
exact same 64px capsule footprint in the card's action slot. Whatever the
state, the money action is one thumb-reach away in the same place.

**The Bleed-and-Link Rule.** Preset options are edge-bleeding, left-aligned,
non-wrapping chip swipe-rows; the custom/DIY affordance is always an
underlined link below the row, never a chip in it.

## Do's and Don'ts

### Do:
- **Do** render every save-card state through the fixed 482px five-slot grid (26px / minmax(20px,auto) / 1fr / 48px / 64px, 12px gap) — compose within slots, never restructure them.
- **Do** style exclusively through `tokens.css` custom properties so both Flamingo Daylight and Neon Night Swim stay complete; add any new color to both themes at once.
- **Do** give every interactive target a ≥44px hit area, using negative-margin expansion when the visual element is smaller (see `.savecard__edit`).
- **Do** read celebration colors from `--confetti-colors` / `--firework-colors` at runtime; keep light-mode fireworks to the saturated-only palette.
- **Do** provide a reduced-motion equivalent for every animation: particles off, sheets fade, springs become instant, chevrons hold at 0.7 opacity, celebration holds shorten.
- **Do** draw new icons on the 24-unit grid at 1.8 stroke with round caps, using `currentColor`.
- **Do** set `tabular-nums` on anything numeric users will compare (amounts, balances, dates).

### Don't:
- **Don't** move, resize, or hide the swipe pill in any active-goal state — the gesture is sacred and lives only in the 64px action slot.
- **Don't** use neutral-gray shadows or pure `#ffffff`/`#000000` surfaces inside the phone; daylight shadows are sea-teal-tinted, the card is warm white `#fffdf8`.
- **Don't** hardcode palette hex in components — the piggy, canvas effects, and every control read tokens so dark mode re-inks for free.
- **Don't** wrap chip rows or center them; they bleed off-screen and scroll. Don't put the "add my own" affordance inside the row.
- **Don't** put large money figures on saturated fills, use Bricolage below weight 800, or introduce a fifth accent color.
- **Don't** theme the stage or phone bezel — the page around the screen is always black; only `.phone__screen` carries `data-theme`.
