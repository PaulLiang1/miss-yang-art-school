# Version 06 — “One Line” / 一条线

A motion-led sixth direction. The other five are static designs with hover states; this one is
built around movement, and the movement carries the school's argument.

## The idea

Every student at the school starts with a line. What changes between four and eighteen is what
they do with it: line and colour, then shape and story, then observation and skill, then
independence. **One cobalt line runs through the whole site** — under the headline, down the left
margin, through the four age rooms, into the fee table rules and the project marks, and it ends
in a small loop under the email address. The line *is* the curriculum, and scrolling draws it.

That is also why the site is animated rather than merely decorative: the motion is the promise
(“learn to draw, then learn to think”), not a demo reel.

## Palette

| token | value | use |
|---|---|---|
| paper | `#F2F3EF` | page, cool cartridge paper |
| paper-2 | `#E6E8E2` | quiet panels |
| ink | `#14171A` | text, headings |
| graphite | `#565E5B` | secondary text, captions |
| cobalt | `#1E3AE0` | the line: spine, focal rules, focus, active nav |
| rule | `rgba(20,23,26,.16)` | hairlines, table rules |
| tint | `rgba(30,58,224,.10)` | rare cobalt wash (rail stage behind the line) |

Colour comes from the children's work; the interface stays paper, ink and one cobalt.

## Type

- **Instrument Serif** 400 / italic — display: hero, section titles, quotes, numerals. High-contrast,
  slightly literary, not the expected editorial serif.
- **Instrument Sans** 400–700 — body, nav, captions, table figures (tabular numerals for fees).
- **Noto Serif SC 700** (local subset) for Chinese headings; Chinese body falls back to the system
  sans, as in the original site.

Scale: hero `clamp(3.4rem, 8.4vw, 8.6rem)`; section titles `clamp(2rem, 4.2vw, 3.6rem)`; body
17px/1.6, measure ≤ 62ch; captions 13px.

## Layout

12-column max-1200 grid, 6vw gutters, zero border-radius, hairlines instead of boxes. A fixed
1px cobalt spine sits in the left gutter from ≥1100px; the page scrolls, the spine fills.

Sections, top to bottom:

1. **Masthead** — serif wordmark, bilingual nav, 2px cobalt scroll-progress line along the top edge.
2. **Hero** — the three-line statement, bilingual sub-sentence, intro, “Ask about a place” mailto,
   one framed work (Quokka, Young Creators) and the four facts in a ruled row.
3. **The line** — pinned horizontal rail: 4–6 · 6–8 · 9–11 · 12–18, one work and one sentence per
   stage, cobalt line drawing left to right as you scroll. Vertical, unpinned fallback below 1024px.
4. **Four rooms** — the four galleries as editorial rows; Little Artists links to its page, the
   other three are honestly “coming soon”.
5. **Meet Miss Yang** — portrait with parallax, bio, motto in large serif italic.
6. **How we teach** — three abilities, each with a hand-drawn cobalt mark that draws itself once.
7. **Classes & fees** — real `<table>`, hairlines drawing in, fee figures counting up once.
8. **Signature Art Projects** — four project types with drawn marks, two strands, the “teaching
   projects, not achievements” note.
9. **Beyond weekly classes** — holiday workshops and the 2027 Leadership Program pilot, plus the
   two-year reward note.
10. **Contact** — the line ends in a loop under the email; Sydney, the Gmail address, footer.

Little Artists page: intro, then the wall — 12 artists, 24 works, framed photos hung on paper,
hover lifts the work and draws a cobalt rule, click opens a viewing room (morph, zoom, keyboard,
swipe) built by hand rather than with a lightbox library.

## Motion inventory (deliberately short)

| where | what | fires |
|---|---|---|
| load | hero lines rise out of masks; cobalt rule under the Chinese line draws | once |
| whole page | spine fills with scroll; section ticks | scrub |
| the line | pin + horizontal draw through four stages | scrub, ≥1024px |
| section titles | mask reveal, 400ms | once, on enter |
| teaching marks / project marks | SVG strokes drawn | once, on enter |
| fee table | hairlines draw; figures count up | once, on enter |
| rooms / wall | images rise 14px + caption rule draws, small stagger | once, on enter |
| hover | work lifts 2px, caption rule draws; no shadows, no scale-bounce | hover |
| viewer | shared-element morph (View Transitions where supported), zoom, swipe | interaction |
| reduced motion | all of the above off; content in final position; no pin, no smooth scroll | always respected |

Smooth scrolling uses Lenis on fine pointers only; GSAP ScrollTrigger drives the scrubbed
sections. Everything is progressive: with JS off the page is complete and readable.

## Stack (all local, no CDN, no build step)

- GSAP 3.15.1 (`gsap.min.js`, `ScrollTrigger.min.js`, `DrawSVGPlugin.min.js`) — free licence,
  including plugins, since 3.13 (<https://gsap.com/blog/3-13/>).
- Lenis 1.3.27 — MIT, smooth scroll only.
- Native View Transitions for the viewer morph (Chrome 111+, Safari 18+; falls back to a fade).
- Hand-written HTML, CSS, JS. Fonts self-hosted woff2. Images copied from the original site.

Vendored files and licences: `assets/vendor/`.
