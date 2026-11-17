# V2 · 02-prospectus — “Prospectus”

Read `versions/_shared/BRIEF.md` first. This file is the design direction for your version.

## Idea

An **information-first school prospectus** in the Swiss / International Typographic Style: strict
grid, oversized type, white ground, one signal colour, and a course-and-fees table treated as the
hero object. Emotion comes from scale, clarity and confidence — not decoration. Parent takeaway:
*these people are organised, excellent and easy to deal with; I can see exactly what my child gets
and what it costs.*

Differentiator: **information design**. Where the other versions are lyrical, this one answers
questions fast and looks like a museum's education programme.

## Colour

| token | hex | use |
|---|---|---|
| white | `#FFFFFF` | ground |
| ink | `#111110` | type, solid panels |
| blue | `#1533CC` | the one signal colour: links, table rules, one reversed panel |
| grey | `#EFEEE9` | section panels, table zebra |

No gradients, no shadows, no rounded corners (radius 0), no tinted off-white page.

## Type

- Display: **Archivo** variable (has width + weight axes), 700–800 at large sizes, tracking
  −0.02 to −0.035em, leading 0.9–0.95. Use the width axis (e.g. `font-variation-settings:
  'wdth' 92`) for a tighter, more deliberate display voice.
- Body: **Archivo** 400, 17px/1.55. Small labels: Archivo 500. One family, many roles — that is
  the point.
- Chinese: system sans (`"PingFang SC","Hiragino Sans GB","Microsoft YaHei",sans-serif`), 600 for
  Chinese heading lines, 400 for body; set Chinese sub-labels one step smaller and in grey/dark.
- Tabular numerals for money (`font-variant-numeric: tabular-nums`).

## Structure (home)

1. **Top bar** — school name left (Archivo 600, small); nav right; `Enquire` as a plain underlined
   link at the end. Colour: ink on white, one 1px ink rule under.
2. **Hero** — a 12-column type block: “Art classes for children and teenagers in Sydney.” at
   clamp(48px, 7vw, 104px), Archivo 800, tight; Chinese line under it. Right-hand 4-column meta
   column, grey: `Ages 4–18` · `Four courses` · `Ten lessons a term` · `Little Artists: 12 artists,
   24 works` — but as short stacked facts with labels, not middle-dot strings.
3. **Image band** — three works edge to edge, cropped to a consistent baseline but honest
   composition; captions beneath in a tight 3-column grid: name, age. This is the "work is good"
   proof.
4. **At a glance** — one reversed panel (ink background, white type) with four facts at large
   scale: `4–18` ages · `4` courses · `10` lessons per term · `12` Little Artists. This is the
   bold move; keep it the only solid panel on the page.
5. **Courses & fees** — the centrepiece. A real table: `Course / School year / Age / Skills /
   Per lesson / Per term`; four rows; right-aligned tabular figures; the term column in blue;
   footnote `Fees are per term of ten lessons`. It must look like a piece of information design,
   not a spreadsheet: strong header rule, generous row height, no zebra unless it helps.
6. **How we teach** — three columns of tight copy (observe / think / create independently), with a
   small number-free label each; aligned to the grid.
7. **Galleries** — four columns, each one work, group name + Chinese, ages, status line (`Open
   now` in ink with a small blue square marker; `Coming soon` in grey). Little Artists links out.
8. **Signature Art Projects** — the comic at large size across 7 columns; the four project types
   as a list with Chinese in the right 5 columns.
9. **Beyond weekly classes** — two blocks: Holiday Art Workshops, Leadership Program 2027.
10. **Enquiry band** — ink panel or white with a huge email address; one sentence; the email as a
    mailto link. Footer: compact grid, © 2026, Sydney.

## Little Artists page

Same top bar. A prospectus-style header: `Little Artists / 小小艺术家`, ages 4–6, `12 artists,
24 works`, two lines of introduction. Then the wall: a strict grid that respects each work's
orientation — e.g. a 4-column grid where portrait works span 3 rows and landscape works span 2, all
baseline-aligned; or two columns of paired works per artist with the name/age as a caption in a
fixed position. Keep it ordered. Lightbox: white, caption ink, blue index. Close with the next
gallery + `Enquire by email`.

## Art direction rules

- Alignment is the design: one 12-column grid, everything snapped, no floating elements.
- Type does the work; resist adding lines, boxes and icons. Rules are structural (grid), not
  decorative.
- The page should feel *engineered*: consistent 8pt spacing scale, consistent caption placement,
  numbers aligned.
- Do not use: tracked-out ALL-CAPS eyebrows, small grey monospace labels, arrow glyphs on links,
  card shadows, pill buttons.
