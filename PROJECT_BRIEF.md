# Swipe to Save

*Draft brief — 31 July 2026. Open questions at the end.*

## Why

People save, but inconsistently. Setting aside money usually means one big
deliberate transfer, and for people living paycheck to paycheck that's a
commitment they can rarely make — so it doesn't happen. Swipe to Save breaks it
into small incremental saves at given intervals: small enough not to feel like a
sacrifice, frequent enough to add up.

This is a portfolio piece, so the real job is showing a hiring manager how you
think about a behavioral problem, not shipping a savings product.

## What done looks like

- Figma designs of the widget, built with the MUI kit
- A coded working demo someone can actually interact with
- Both finished and shareable within roughly two weeks
- A recruiter grasps the mechanic in under a minute, without you narrating it *(assumption — no metric was set)*

## Who it's for

Two audiences, and they want different things:

- **In the concept:** people living paycheck to paycheck who save inconsistently
- **In reality:** hiring managers and recruiters looking at your portfolio

When these conflict, the recruiter wins — this piece is judged on legibility,
not on retention.

## Scope

**In:**

- The Swipe to Save widget itself — the swipe interaction and its feedback
- Three save mechanics: fixed schedule (daily/weekly), spending-triggered round-ups, and manual swipe anytime
- Enough surrounding screen to give the widget context *(assumption)*
- Figma designs plus a coded demo, using MUI components

**Out:**

- Real bank or account linking
- Any working backend — mock data only
- Withdrawals / getting money back out

## Constraints

- **Time:** a couple of weeks from 31 July 2026 — self-imposed, no external date
- **Design system:** MUI, source of truth in Figma. The kit is still stock — no custom colors, fonts, or spacing yet
- **Build:** Windows, Git installed, no codebase yet. The coded demo will lean on Claude Code
- **People:** solo — you design it, you build it

## Decisions and owners

You, on all of it. No sign-off, no stakeholders, no one to consult by default.
That removes the usual bottleneck and also removes the usual reality check — see
the last open question.

## Open questions

- [ ] Three save mechanics in a two-week concept is a lot of surface area. Which one is the hero, and can the other two be shown rather than built? — you
- [ ] Are signup / onboarding screens in scope, or does the piece start with the widget already live? — you
- [ ] Where does the demo live so a recruiter can open it in one click — hosted link, screen recording, or local only? — you
- [ ] Does the stock MUI kit stay stock, or does this piece need a themed pass so it doesn't read as a default template? — you
- [ ] Anyone who actually lives paycheck to paycheck you could show it to for five minutes before you call it done? — you

---

## Decisions (2026-07-31)

Answered while scaffolding the coded demo with Claude Code:

- **Hero mechanic:** manual swipe anytime. It's the most direct interaction to build well in the time available — a satisfying gesture with clear feedback. Fixed schedule and round-ups are shown as static preview cards, not built out.
- **Onboarding:** in scope, but light — a goal-setup step and a short explainer of the three mechanics before the widget goes live.
- **Demo hosting:** local only for now. Hosting (e.g. a one-click link) is a later decision, not blocking the build.
- **Theming:** gets a themed pass on top of MUI — custom palette, type, and spacing — so it doesn't read as a stock template. (Note: this contradicts the original constraint that the kit "is still stock" — the constraint was written before this decision and is now superseded by it.)

Still open, not needed to start the coded scaffold:

- [ ] Figma designs of the widget, built with the MUI kit — blocked until the Figma MCP connector is authorized in this environment
- [ ] Anyone who actually lives paycheck to paycheck to show it to before calling it done — still unanswered
