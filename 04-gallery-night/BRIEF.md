# V4 · 04-gallery-night — “After Hours”

Read `versions/_shared/BRIEF.md` first. This file is the design direction for your version.

## Idea

A **curated online exhibition**, shown the way a serious gallery shows work after closing: dark
walls, one pool of light per piece, gold-leaf accents, quiet labels. The children's artwork is
treated with real reverence. Parent takeaway: *they respect my child's work as art; this is a
special place.*

Differentiator: **darkness and spotlight** — the only dark version. The works should glow.

## Colour

| token | hex | use |
|---|---|---|
| night | `#0E0F11` | page ground (cool near-black, not warm brown-black) |
| room | `#17181C` | raised panels only |
| chalk | `#EDE6D8` | primary text on dark (warm white, 11:1) |
| gilt | `#C2A15C` | hairlines, small marks, the label rule, focus rings |
| smoke | `#8C8577` | secondary text |

No blue, no neon, no purple. Gilt is a line colour and a small accent — not a gradient.

## Type

- Display: **Bodoni Moda** (variable, optical size + weight), 400–500, large sizes, high contrast
  hairlines against black. Leading 0.95–1.05.
- Body: **Figtree** variable, 300–400, 17–18px/1.65, in chalk at ~85% opacity for long copy.
- Chinese headings: `"Noto Serif SC", "Songti SC", serif` 700 in chalk; Chinese body system serif.
- Labels (art titles, names, ages) in Bodoni italic — gallery label voice, not letterspaced caps.

## Structure (home)

1. **Header** — school name at left (Bodoni, 22–26px), nav right in Figtree 15px, one 1px gilt rule
   under the header (gilt at 40% opacity). Chinese sub-labels under nav items in smoke.
2. **Hero** — full-width dark room. One large work (`opera-house.jpg`) at roughly 38–44vw, **spotlit**:
   a soft radial light pool behind it (very low contrast, physically motivated — like a ceiling
   light on a wall), subtle vignette at the edges of the section. To its left/below: the headline
   “A gallery of work by young artists.” in Bodoni at clamp 40–80px and one sentence. Under the work,
   a label: `Alina Yang's students · Sydney` and the work's caption `Mia, 4 — Blue bird under a
   sunset sky` in Bodoni italic. This is the bold move; make it quiet and perfect.
3. **Statement** — one short paragraph + the real facts as a single quiet line:
   `12 artists · 24 works · ages 4–12` — you may use this middle-dot *only* as a genuine data
   line (it is real counts), set in Bodoni italic.
4. **The collection** — a horizontal scroll-snap rail of 6–8 works, each with a label plate below;
   works of different sizes, aligned by their bottoms like a hung salon wall; then the four rooms
   (Little Artists + three coming soon) as blocks with one work each and honest status.
5. **The programme** — courses and fees as a dark table with gilt rules: course, school year, age,
   skills, per lesson, per term; footnote ten lessons per term.
6. **The studio** — Meet Miss Yang: portrait smaller (a third), essay beside it, in chalk.
7. **Signature Art Projects** — the comic lit as a centrepiece; the four project types as a quiet
   list with Chinese.
8. **After the term** — Beyond weekly classes: two short entries.
9. **Enquire** — a big invitation and the email as a large Bodoni link; the footer: © 2026.

## Little Artists page

Same dark header. A gallery-room header: `Little Artists / 小小艺术家`, ages 4–6, 12 artists, 24
works. The wall: works hung on the dark wall in a salon arrangement with consistent gutters and
baseline alignment; label plates under each; each artist's pair grouped and the artist's name/age
set as a small plate. Lightbox: black overlay, chalk caption, gilt arrows. Close with the next room
+ email.

## Art direction rules

- Light must feel physical: one radial pool per featured work, soft vignettes at section edges,
  no glow filters, no neon outlines, no gradients across whole sections.
- The baked-in frames are the point — let the photos hang; never add CSS frames, mats or borders
  beyond a 1px gilt hairline where a label needs it.
- One orchestrated moment: on load the hero work fades/scale-settles in 600ms; the rail scroll-snaps.
  No per-section reveals. Respect reduced motion.
- Contrast: body text ≥ 7:1 on night; smoke only for meta text ≥ 12px at 4.5:1.
- Do not use: tinted #0B0B0B, letterspaced caps gallery labels, fake exhibition dates, neon,
  purple gradients, glass panels, "SCROLL" cues.
