# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Stack

Vite + React 19 + TypeScript. Custom hand-built components styled with CSS variables, animated with framer-motion (user-confirmed 2026-08-03). MUI, Emotion, and the external design-system submodule are removed by explicit user request. No router — single demo page.

## Users

Primary: 20–30 year-old Floridians (and Florida-at-heart youth) inside their mobile banking app. They are impulse-spenders with real goals (trips, concerts, moving out, a car) who respond to momentum, streaks, and celebration — not to lectures about compound interest. Secondary: stakeholders viewing this as a framed desktop demo of the mobile experience.

## Product Purpose

A "Swipe to Save" widget for a mobile banking experience. One physical gesture — swiping a pill from left to right — moves a small fixed amount into a named savings goal. Success means the user swipes today, comes back, and swipes again tomorrow: the widget exists to convert saving from a chore into a streak.

## Positioning

The mechanism is the gesture: saving is a single satisfying swipe with an immediate celebration, chained into a visible streak (chain/behavior psychology). Competing savings features are forms and toggles; this is a slot-machine-grade moment of delight pointed at a healthy behavior.

## Operating Context

Rendered as a 393×852 phone frame centered on a black page, with a light/dark mode toggle and a demo reset control beneath the frame. All widget interaction happens inside the frame. Demo state persists in localStorage; the reset control restarts the demo from the initial card (user-confirmed 2026-08-03).

## Capabilities and Constraints

- Widget card states: (1) initial prompt card with piggy-bank-and-coin graphic; (2) goal setup in a bottom sheet (predefined goal chips, custom goal with emoji, target amount, goal date or open-ended); (3) active goal card with swipe-to-save pill and edit affordance; (4) streak card with step bar (reactbits-style stepper), amount saved, goal date; (5) finale card, all steps but the last complete, ending in piggy-bank pop + fireworks.
- Every card state shares identical width, height, and slot layout: header text, explainer text, stepper, and swipe pill each live in a fixed position across states (user-pinned).
- Step indicators follow the reactbits.dev Stepper animation grammar: number → active dot → checkmark drawn with an SVG pathLength animation; connectors fill with a spring.
- Successful swipes trigger a full-card congratulations takeover with confetti, a brief pause, then an automatic transition to the next state.
- Demo only: no real accounts, transfers, or bank integration. Amounts are demo data.

## Brand Commitments

- Bank identity: **Sundollar** — an invented, clearly synthetic bright-Floridian youth bank authored for this demo (user approved inventing a brand 2026-08-03). Replace wordmark/name if a real client brand arrives.
- Voice: sunny, brief, second-person, hype-without-bank-speak ("You saved!", "Keep the streak alive"). Never guilt, never jargon.
- Aesthetic pinned by user: bright Floridian, aimed at 20–30 year-olds. Both light and dark modes required.

## Evidence on Hand

None — greenfield demo. All goals, amounts, and streak data are authored demo content and must read as such. No real testimonials, rates, or bank claims may be invented.

## Product Principles

1. The swipe is sacred: the save gesture must always be one thumb-reach away, in the same place, in every active state.
2. Celebrate instantly, then get out of the way: every save earns a full celebration, then returns the user to a clear next step.
3. The chain is the product: visible streak progress (stepper) is the retention mechanic; never hide it in active states.
4. Consistency builds trust: identical card geometry and slot placement across states so the eye always knows where money things live.
5. Bright is the brand: energy and saturation are features, not decoration — but numbers (amounts, dates) stay instantly legible.

## Accessibility & Inclusion

Swipe pill must also be operable by keyboard (arrow keys / enter to complete) and announce results via aria-live. Respect prefers-reduced-motion by shortening celebrations to non-particle equivalents.
