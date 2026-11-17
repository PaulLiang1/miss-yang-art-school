# 01 — Atelier · “The Monograph”

A two-page site for Miss Yang’s Art School, designed as a printed monograph about a painter-teacher: a paper catalogue you might pick up in the studio, with plates, captions and a hanging section numeral.

Pages: `index.html` (the school) and `little-artists/index.html` (the gallery of the Little Artists, ages 4–6).

## Design direction

The original site reads as a warm “growth wall”: sage paint, oak frames, a long scroll of artworks. This version deliberately takes the opposite reading: **a book, not a wall.** Ink on uncoated paper, hairline rules, Roman numerals in the margin, captions set as catalogue entries, images treated as plates rather than cards. Nothing floats: no shadows, no cards, no rounded corners, no hover animation on the works.

- **Palette** — four colours only: paper `#F3EFE6`, ink `#1D1B18`, stone `#6B6459`, oxblood `#7A2E2A`. Rules are ink at 22% / 12%. Oxblood is the single accent and is used sparingly: masthead rule, links, chapter numerals, the pen-stroke rules on pull-quotes and the next-room rule.
- **Type roles** — *Fraunces* is the display face: the hero, chapter titles, plate titles, names, prices and the email address; italic Fraunces carries captions, standfirsts, notes and the pull-quote. *Newsreader* is the reading face at 19px/1.62 with a 62-character measure. Chinese headings are Noto Serif SC 700; Chinese body copy falls back through Songti SC / STSong / Noto Serif SC. No third English family is introduced. All five families are local woff2 files; there are no network requests.
- **Bold move** — the hero: a three-line statement set at up to 4.75rem, followed by a strip of three plates hung at the same baseline, like works pinned above a bench. Their captions hang below in a single rule. This is the only entrance animation on the site (one orchestrated fade-up, disabled under `prefers-reduced-motion`).

## Structure

Home: masthead → hero + three plates → **I** The studio (portrait, drop-cap letter, pull-quote) → **II** What children learn (three numbered abilities) → **III** The collection (Little Artists room with two works and a link to the gallery; Young Creators, Creative Explorers and Emerging Artists each with one representative work and an honest “gallery coming soon”) → **IV** Classes &amp; fees (four courses, per-lesson and per-term fees, 10 lessons per term, the two-continuous-years reward) → **V** Signature Art Projects (comic plate, four project types, two strands) → **VI** Beyond weekly classes (four holiday workshops; the 2027 Little Artists Leadership Program pilot) → **VII** Contact (email, Sydney) → colophon.

Little Artists: breadcrumb → title and preface → a catalogue of twelve entries, one per artist, in the given order. Each entry carries a roman number, the artist’s name and age, “Two works”, and a pair of plates; the pair grid is composed from the images’ real aspect ratios (`pp`, `ll`, `pl`, `lp`) so the bottoms hang together. The page closes with the next room (Young Creators, ages 6–8, coming soon) and links to enquire or return home.

## Lightbox

Plain `<dialog>` + vanilla script (`assets/js/viewer.js`, no modules, no fetch):

- click/tap any work to open it larger (the `img` carries the artwork alt; the button has an “Open larger…” label);
- `Previous` / `Next` wrap around all 24 works, `ArrowLeft` / `ArrowRight` do the same;
- `Esc` closes natively, the `Close` button closes, and clicking the dark stage around the image also closes;
- focus returns to the work that opened the viewer; the page behind is scroll-locked with `html.is-viewing`; controls are at least 44 × 44 px and have a paper-coloured focus ring on the ink stage.

## Accessibility and constraints

Skip link, one `h1` per page, landmark `header`/`main`/`footer`, labelled nav and dialog, `scope` on table headers, stable `width`/`height` on every image, intrinsic-ratio images, `loading="lazy"` on gallery plates, visible focus rings, reduced-motion support, and a stacked fee table on small screens (labels are generated from `data-label`). Relative links only; pages work from `file://`; zero external requests; no frameworks, no build step.

## Honest limits

- Only the Little Artists room has a gallery page; the other three rooms explicitly say “Gallery coming soon” rather than inventing work.
- The three collection images for those rooms are representative artworks from the supplied home assets, not new claims about named students.
- There is no address, phone number, timetable, testimonial or founding date because the brief does not supply them.
- Image frames are the ones baked into the photographs; no CSS mats were added on top.

## Files

- `index.html`, `little-artists/index.html`
- `assets/css/atelier.css` — one stylesheet, design tokens at the top
- `assets/css/fonts.css`, `assets/css/google-fonts.css` — supplied local @font-face files
- `assets/js/viewer.js` — the lightbox
- `assets/img/home/`, `assets/img/little-artists/` — supplied images
- `favicon.svg` — supplied mark

Verified with `versions/_shared/tools/qa.py` (PASS) and by screenshot review at 1440 px and 390 px (mobile true-width check performed by rendering the page in a 390 px frame, because headless Chrome enforces a 500 px minimum window and crops narrower captures).
