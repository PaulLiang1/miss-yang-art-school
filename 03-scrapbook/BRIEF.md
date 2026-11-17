# V3 · 03-scrapbook — “The Studio Table”

Read `versions/_shared/BRIEF.md` first. This file is the design direction for your version.

## Idea

The feeling of **being in the studio on a Saturday morning**: work pinned up, tape, pencil notes,
a warm room, a teacher who notices your child. Aimed at parents of 4–10 year olds and at the
children themselves. Parent takeaway: *my child would be happy and well looked after here.*

Differentiator: **warmth and physicality** — taped works, paper, handwritten-adjacent annotations —
but built on a strict grid and a precise type scale so it is charming rather than childish clutter.

## Colour

| token | hex | use |
|---|---|---|
| paper | `#F1EEE6` | page ground |
| charcoal | `#2C2A26` | type |
| pencil blue | `#2C5AA0` | links, small annotations, underlines |
| marigold | `#E0A93B` | highlights, tape tint, rules on the fee table |
| white | `#FFFDF8` | paper cards / caption slips |

Tape is translucent white with a warm cast, never grey.

## Type

- Display: **Bricolage Grotesque** (variable; has optical size, width and weight axes),
  weight 600–800, normal-ish width, tight leading 0.95–1.0, large sizes. It is friendly and
  characterful without being childish.
- Body: **Figtree** variable (already local), 400–500, 17–18px, 1.6.
- Chinese: system sans (`"PingFang SC","Hiragino Sans GB","Microsoft YaHei"`); Chinese body 15–16px.
- No handwriting font. Warmth comes from layout and colour, not a script face.

## Structure (home)

1. **Header** — school name set like a paper label at left; nav right as underlined items with
   Chinese sub-labels; content in a max-width container, page ground visible.
2. **Hero** — two columns. Left: the headline “Making room for small, serious artists.” (or a
   similarly warm line in your own words), Chinese line under it, two sentences of copy, a link
   into the galleries. Right: a **collage of three works taped to the page**, each with a small
   white caption slip and consistent slight rotations (−1.5°, 1°, −0.6°), one circular badge drawn
   in CSS (`Ages 4–18 · Sydney`) overlapping a corner. The collage must be composed on the grid,
   not scattered.
3. **How we teach** — three notes in a row, each with a pencil-blue hand-underline (CSS), short.
4. **The growing wall** — the four age groups shown as four taped works on one wall line, with age
   ranges and a clear Little Artists → gallery link; the other three honestly "coming soon".
   This replaces a conventional gallery grid and shows *growth*.
5. **Classes & fees** — a "fee slip": a clean table on white paper (radius 2–4px max), marigold row
   rules, courses in charcoal, per-lesson and per-term columns right-aligned; `Ten lessons a term`
   as a pencil note. Not a stack of cards.
6. **Signature Art Projects** — the comic taped at an angle as the star; the four project types as
   four short pinned notes in a row (not identical rounded cards — vary the paper tone/rotation
   slightly, keep the typography identical).
7. **Beyond weekly classes** — Holiday Art Workshops and the 2027 Leadership Program as two notes.
8. **Contact** — “Say hello to Miss Yang.” + email as a big Figtree link; Sydney. Footer © 2026.

## Little Artists page

Same header. Intro line: 12 artists, 24 works, ages 4–6. Present the 12 artists as **pinned pages**
from a sketchbook: each artist a paper sheet with their two works taped on, name + age written on a
paper slip; sheets offset in a masonry that still aligns to a column grid (two/three columns).
Lightbox: the work lifts off the page slightly (scale + shadow), caption slip below, pencil-blue
index. Keep 24 lazy-loaded images. Close with the Young Creators teaser + email.

## Art direction rules

- Tape must be drawn in CSS as a few precise shapes (two pseudo-elements per card), same widths,
  same tint — consistency is what stops it looking amateur.
- Rotations are few and consistent; nothing is randomly tilted. Max 2° either way.
- One orchestrated interaction: on hover/focus a taped work straightens to 0° and lifts 2px over
  140ms. Respect reduced motion. No other hover effects.
- Paper texture: a single very low-contrast CSS/SVG grain on the body is allowed; no gradients.
- Do not use: emoji, doodle SVGs, "hand-drawn" arrows, comic fonts, sticker packs, rounded 20px
  cards, or rainbow palettes.
