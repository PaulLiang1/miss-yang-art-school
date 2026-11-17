# V1 · 01-atelier — “The Monograph”

Read `versions/_shared/BRIEF.md` first. This file is the design direction for your version.

## Idea

Present the school as a **working artist's studio brought to book**: a small, confident printed
monograph about a painter-teacher and the work her students make. Not a marketing site — a
catalogue you would pick up at an art-book fair and keep. Parent takeaway: *this is a studio with
taste and seriousness, where my child is taken seriously.*

The differentiator is **print structure**: plates with captions, marginal section marks, a real
measure, asymmetry used like a book spread — not just "serif on cream".

## Colour (4 roles)

| token | hex | use |
|---|---|---|
| paper | `#F3EFE6` | page ground (a cooler bone, not the usual warm cream) |
| ink | `#1D1B18` | type |
| stone | `#6B6459` | secondary text, captions |
| oxblood | `#7A2E2A` | the single accent: links, drop cap, small rules, focus rings |

No fifth colour, no white cards, no shadows. Images carry their own colour.

## Type

- Display / headings: **Fraunces** (`assets/css/google-fonts.css`), weight 300–500, optical size
  large for big sizes; italic for pull-quotes and captions. Tight leading (0.95–1.02) on the hero.
- Body: **Newsreader** (variable), 400 weight, 18–19px, line-height 1.62, measure 62ch.
- Chinese headings: `"Noto Serif SC", "Songti SC", serif` 700. Chinese body: system serif.
- No third English family. Hierarchy comes from size, weight and italic — not from more fonts.

## Structure (home)

1. **Masthead** — school name small at left in Fraunces; right: nav `Galleries`, `Classes & fees`,
   `How we teach`, `Contact`, each with Chinese sub-label; hairline oxblood rule beneath.
2. **Hero** — 7 columns: “Learn to draw. Think creatively. Create independently.” at large scale
   (clamp 44–84px), the Chinese motto 学会观察 · 勇于思考 · 独立创作 set directly under it in the
   same optical world. 4 columns to its right: one paragraph of introduction (who, where, ages
   4–18) and a link to the Little Artists page.
3. **Plate strip** — three or four works at honest aspect ratios, captions below in Newsreader
   italic: `Mia, 4 — Blue bird under a sunset sky`. This is the emotional core; make the images
   the biggest thing above the fold on desktop.
4. **I. The studio** — two columns: the portrait as a plate with a caption (`Alina Yang, founder
   and art educator`) | the founder' letter with a genuine drop cap, 3–4 short paragraphs, the
   motto 呵护想象 · 夯实基础 · 激发个性 as a pull-quote.
5. **II. What children learn** — three abilities (learn to observe; think creatively; create
   independently) as short set pieces with marginalia-style marks (small, quiet — no big numerals).
6. **III. The collection** — four rooms. Little Artists gets two works + `View the gallery`; the
   other three get one work each + an honest coming-soon line. Present as plates with captions,
   like a catalogue's collection pages.
7. **IV. Classes & fees** — a fee schedule: a real table, four courses, school year / age / skills
   / per lesson / per term; `Ten lessons per term` as a footnote. Set it like the back-matter of a
   book: small type, perfect alignment, tabular numerals.
8. **V. Signature Art Projects** — the comic as a wide plate; the four project types as a two-column
   list with Chinese; two strands (visual storytelling 视觉叙事, drawing from life 写生观察).
9. **VI. Beyond weekly classes** — Holiday Art Workshops and the 2027 Little Artists Leadership
   Program, two short entries, no cards, no icons.
10. **VII. Contact** — a letter's closing: “Write to Miss Yang.” + email as a large Fraunces link,
    Sydney, Australia. Colophon footer: © 2026, and a quiet line about local assets.

## Little Artists page

Same masthead. A short gallery preface (12 artists, 24 works, ages 4–6), then the 12 artists in
order as **catalogue plates**: each artist a row with two works at natural ratios + the caption
`Mia, 4`. On desktop use an asymmetric 2-up that stays honest to portrait/landscape pairs. Lightbox
on dark ink with a caption. Close with the next room (Young Creators, coming soon) and the email.

## Art direction rules

- Margins generous (6–9vw), one vertical rhythm, no boxed sections. Section marks are quiet:
  a Roman numeral, a rule, a small change of measure.
- Captions are part of the design — every image gets a real caption, set in italic.
- The baked-in frames are the "hanging" — do not add CSS frames, shadows or hover lifts.
- One bold moment: the scale of the hero + the plate strip. Everything else whispers.
- Do not use: fake catalogue numbering ("VOL. 01"), letterspaced caps labels, arrows on links,
  em-dash fragments, gradients, rounded corners above 2px.
