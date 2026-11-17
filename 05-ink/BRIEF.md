# V5 · 05-ink — “墨与纸 / Ink & Paper”

Read `versions/_shared/BRIEF.md` first. This file is the design direction for your version.

## Idea

A bilingual art school where **Chinese painting tradition and Western drawing sit together**. Rice
paper, ink, a red seal, and the discipline of 留白 (empty space as material). The page structure
follows the school's own motto — 学会观察 · 勇于思考 · 独立创作 — into three chapters:
**一 观 (Look) · 二 思 (Think) · 三 创 (Make)**. Parent takeaway: *this is a school with genuine
culture, where my child's Chinese heritage and their drawing practice belong together.*

Differentiator: **cultural identity through structure** — vertical Chinese chapter marks, seal,
ink rules, silence — not "Chinese-style" ornaments.

## Colour

| token | hex | use |
|---|---|---|
| rice | `#F5F1E5` | page ground |
| ink | `#1E1D1A` | type, rules |
| stone | `#8A8375` | secondary text |
| seal | `#A63A2B` | only the seal, link hover/focus, tiny marks, one accent per screen |

Ink rules: 1px `rgba(30,29,26,.22)`. No shadows, no cards, no gradients.

## Type

- Display: **Cormorant Garamond** (variable 300–700 + italic), 400–500 at large sizes, high
  contrast strokes against paper; italic for captions and for one phrase per section.
- Body: **Newsreader** (variable 300–500), 400, 18px/1.7, measure 62ch.
- Chinese headings: `"Noto Serif SC", "Songti SC", serif` 700. Chinese body:
  `"Songti SC", "Noto Serif SC", serif` where available, system serif otherwise.
- Chapter markers: single Chinese characters (观 / 思 / 创) set **vertically**
  (`writing-mode: vertical-rl`) in the margin, large (clamp 48–88px), ink at 85% opacity, with the
  English word and a thin rule beside them. This is the bold move — compose it carefully, and hide
  it gracefully on mobile (inline, smaller).
- A CSS-drawn **seal**: a 26–32px square, seal red, white 「杨」 (this character is already in the
  Chinese font subset), slightly rotated, used in the header and once in the contact section.
  No other "Chinese ornament".

## Structure (home)

1. **Header** — school name in Cormorant at left with the seal beside it; nav right, small
   (Figtree for the Chinese sub-label under each English item); one ink rule below at page width.
2. **Hero** — asymmetric: left 6 columns with the headline “Learn to draw. Think creatively. Create
   independently.” in Cormorant (clamp 40–72px), the Chinese motto under it
   (学会观察 · 勇于思考 · 独立创作), then one paragraph; right 5 columns with one work
   (`quokka.jpg` or `squirrels.jpg`) hanging in the page with a lot of air, and a small italic
   caption below it. Leave real empty space between them (留白 is the material).
3. **一 观 Look** — the collection: Little Artists gets two works and a link to the gallery; the
   other three rooms get one work each with an honest coming-soon line. Present as an ink-ruled
   sequence of plates, not a grid of cards. Age-range labels in stone.
4. **二 思 Think** — the founder: portrait on the left (plate, thin ink hairline), the letter on the
   right; then the three abilities (observe / think / create independently) as three short
   paragraphs offset progressively to the right (like a scroll's reading rhythm) — keep alignment
   disciplined.
5. **三 创 Make** — courses and fees table (four courses, school year, age, skills, per lesson, per
   term; `Ten lessons per term` footnote); Signature Art Projects with the comic and the four
   project types listed with Chinese; Holiday Art Workshops and the 2027 Leadership Program in two
   short entries.
6. **Contact** — a quiet closing: “Write to Miss Yang.” in Cormorant, email as a link that turns
   seal red on hover/focus, Sydney, Australia, and the seal. Footer: © 2026 Miss Yang’s Art School.

## Little Artists page

Same ink language: header with seal, a short preface (`12 artists · 24 works · ages 4–6` in Chinese
and English), then each artist as a **scroll-like plate**: two works side by side with generous
space, the artist's name and age in Cormorant with Chinese-free proper nouns, an ink hairline
between artists. All 12 in order. Lightbox: rice paper ground, ink caption, seal-red arrows, close
returns focus. Close with the next room (coming soon) + the email, and a return link.

## Art direction rules

- Space is material: margins 8–12vw on desktop, sections separated by air and one hairline, never by
  boxes or background blocks. Never fill the page.
- Ink rules are thin and used structurally (under header, between plates, under the fee table).
- Seal red appears at most 3–4 times per screen; it is a mark, not a theme colour.
- Vertical Chinese markers must remain legible and not collide with content at 1024–1280px; test.
- One orchestrated moment: none is required; if you add one, make it the ink rule drawing in under
  the header on load, 400ms. Respect reduced motion.
- Do not use: brush-stroke SVG textures, watercolour blobs, "Chinese font" clichés (e.g. Kai/Weibei
  display faces you cannot ship locally), fake calligraphy, cloud/wave patterns, red envelopes.
