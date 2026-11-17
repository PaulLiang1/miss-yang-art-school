# Version 03 — “The Studio Table”

An alternative two-page site for Miss Yang’s Art School. The idea: the website is the
studio table on a Saturday morning — works taped down, paper slips, a fee sheet, a note
pinned for the holidays — but every object sits on a strict grid and one type scale, so
the warmth is composed rather than scattered.

Pages:

- `index.html` — home (hero, Meet Miss Yang, how we teach, the growing wall, classes & fees,
  Signature Art Projects, beyond weekly classes, contact, footer)
- `little-artists/index.html` — the Little Artists gallery (12 artists, 24 works, lightbox)

---

## Palette

| Token | Hex | Use |
| --- | --- | --- |
| paper | `#F1EEE6` | page ground — warm off-white, never pure white |
| ink | `#2C2A26` | body and display type (soft charcoal, not black) |
| pencil blue | `#2C5AA0` | links, annotations, the hand-underlines, gallery index numbers |
| marigold | `#E0A93B` | tape tint, pin heads, table row rules, highlight marks |
| paper white | `#FFFDF8` | taped works’ slips, fee sheet, contact letter, pinned notes |
| gold tint | `#F4E6C6` | “ages” labels and the 2027 pilot tag |
| cream | `#F6EFDC` | one pinned note tone (fees aside) |
| tape | `rgba(255, 250, 236, .78)` | the translucent tape shapes; warm cast, never grey |
| rule | `rgba(44, 42, 38, .14–.17)` | hairlines and the project-list rules |

Only these hues are in play; no gradients, no glass, no drop-shadow cards.

## Type

- **Display — Bricolage Grotesque Variable** (600–800, tracking −2 to −2.6%, leading .97–1.02).
  Used for the wordmark, h1–h3 and the fee figures. It has a slightly physical, poster-like
  character that suits taped-up work.
- **Body — Figtree Variable** (400–500, 17–19px / 1.55–1.7, measure 55–75ch). UI, paragraphs,
  labels, buttons, table cells.
- **Chinese — system sans stack** (`PingFang SC`, `Hiragino Sans GB`, `Microsoft YaHei`),
  15–16px in body copy, one step down from the English in labels. Chinese follows the English
  everywhere (EN first, then `<span class="zh" lang="zh-Hans">`); student names stay untranslated.
- No handwriting or comic fonts. Note-slips are text + tape, not doodles.

## Layout concept

- 12-column grid, max 1240px, generous but consistent section rhythm (`--section` 64–112px
  per side). Nothing is centred except the contact letter.
- Every content unit is a physical object placed on the grid: a taped work + white caption
  slip, a pinned note, the fee sheet taped at its top edge, the studio letter, the black
  growing wall shelf.
- Tape is two CSS pseudo-elements per object, always the same width and tint, rotated ∓3–3.4°.
  Rotations are few and small (max 2° on the objects themselves).
- Home section order deliberately differs from the original site: hero → Meet Miss Yang →
  how we teach → **the growing wall** (four taped works on one shelf, one per age group) →
  classes & fees as one fee sheet → Signature Art Projects → beyond weekly classes → contact.
- The gallery is a masonry of sketchbook pages (3 / 2 / 1 columns), each sheet with two taped
  works, a name-and-age slip and a pencil-blue archive number.

## The bold move

The hero: three framed children’s works taped down at three fixed angles, caption slips
tucked under them, and a circular **“Ages 4–18 / Sydney”** paper badge sitting in the
collage — the works overlap each other and the column edge so the collage reads as a
composed pile on the table, not a three-up card row.

## Interaction

One orchestrated motion, used everywhere: a taped work straightens to 0° and lifts 2px over
140ms on hover or keyboard focus (the growing wall, the gallery sheets, the comic, the fee
sheet). Reduced-motion users get no movement.

The gallery lightbox is a native `<dialog showModal>`: works lift in (190ms), the caption
slip reports name, age and “Work n of 2”, a blue index reports “07 / 24”. Keyboard: Enter/
Space opens, ←/→ step, Home/End jump, Esc closes, focus returns to the thumbnail that opened
it. Clicking the dark room or the Close tag also closes.

## Differences from the finished handover site

- Paper ground and taped paper objects instead of the sage wall and oak frames.
- Bricolage Grotesque display instead of Young Serif; no serif anywhere.
- No banded “hero / wall / meet / classes / projects” strips — one continuous table with
  objects laid on it.
- The four galleries are shown as one growing wall with one representative work each and an
  honest “Coming soon” tag, instead of a gallery grid of cards.

## Assets used

- `assets/img/home/` — 9 photographs (squirrels, numbat, quokka, toucan, Opera House,
  Miss Yang, the four-panel comic, the cat, the portrait). Used at their native aspect
  ratios with fixed `width`/`height` (no layout shift). They already contain frames and mats,
  so no CSS frame is added.
- `assets/img/little-artists/` — all 24 works, same files, slugs and order as the handover
  `scripts/la.json`; alt text follows “<original description>, by Name, Age”; 24 lazy-loaded
  images.
- `assets/fonts/` — Bricolage Grotesque and Figtree woff2 from the seeded `fonts.css` /
  `google-fonts.css`. Only those two families are referenced; the other seeded families
  (Young Serif, Noto Serif SC, Fraunces, Archivo, Bodoni, Cormorant, Newsreader) are not used
  by these pages and therefore never requested.
- `favicon.svg` reused.

## Verification

- `python3 versions/_shared/tools/qa.py versions/03-scrapbook` → **PASS, 0 fails, 0 warns**
  (all required facts, bilingual spans, 24 gallery images with alt text, local references).
- `cdp-audit.js` at 390 / 768 / 1024 / 1440: `scrollWidth == innerWidth` on both pages,
  no overflowing elements, no broken images, no images without alt, no external links,
  fonts loaded, one `<h1>` on home, contrast AA (secondary ink was darkened for this pass).
- Lightbox tested in-page: open/close, prev/next, ←/→, Home/End, Esc, backdrop click, and
  focus return to the opener all verified.
- Screenshots: `/tmp/final-desk.png` (1440), `/tmp/final-la.png` (1440 gallery),
  `/tmp/final-mob.png` (true 390, home), `/tmp/final-mobla.png` (true 390, gallery),
  plus dialog states `/tmp/03-dialog.png`.

## Limitations

- Only the Little Artists gallery has a page; Young Creators, Creative Explorers and Emerging
  Artists each show one representative work on the growing wall and are marked “Coming soon”.
  No works are invented for them.
- Lightbox images are the same single-resolution JPGs as the thumbnails (up to ~800px wide),
  so on very large screens they are displayed at roughly 1.3–1.5× their pixel size.
- No testimonials, staff, timetable, address, phone, awards or term dates anywhere — the
  site contains only facts confirmed in `versions/_shared/BRIEF.md`.
- Built as plain HTML/CSS/JS only: no framework, no fetch, no modules; everything is relative
  and opens from `file://` with zero external requests.

## Files

```
versions/03-scrapbook/
  index.html
  little-artists/index.html
  NOTES.md
  favicon.svg
  assets/css/studio.css        (all page styles, tokens and responsive rules)
  assets/js/viewer.js          (gallery lightbox)
  assets/css/fonts.css         (seeded)
  assets/css/google-fonts.css  (seeded)
  assets/fonts/*.woff2         (seeded)
  assets/img/home/*.jpg        (9)
  assets/img/little-artists/*.jpg (24)
```
