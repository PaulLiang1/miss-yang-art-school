# 06 — One Line 一条线

The sixth version is the one built to move. Where 01–05 are static readings of the
same school, 06 makes the teaching argument itself the device: **one line that grows
from a first mark at four to an independent hand at eighteen.** The line is drawn
under the headline, runs down the left gutter, becomes the four age stages as you
scroll through them, marks the fee table and the project notes, and closes in a loop
under the email address.

Files: `index.html` · `little-artists/index.html` · `assets/css/line.css` ·
`assets/css/gallery.css` · `assets/css/fonts.css` · `assets/css/google-fonts.css` ·
`assets/js/line.js` · `assets/js/gallery.js` · `assets/vendor/`.

## Art direction

- Paper `#F2F3EF` (cool cartridge, not cream), ink `#14171A`, graphite `#565E5B`,
  rule `rgba(20,23,26,.16)`, and one accent: cobalt `#1E3AE0`. No second accent.
- **Instrument Serif** for display (5–7rem hero, single weight, true italic used for
  the one line that turns), **Instrument Sans** for reading — a deliberately narrow
  pairing so the line, not the typography, carries the drama.
- Chinese headings and the vertical spine labels use the local Noto Serif SC 700
  subset; Chinese body and labels use the system sans, as in every other version.
- Layout: 76px sticky masthead with a 2px cobalt scroll-progress rule at its base; a
  fixed spine line in the left gutter from 1360px; 1240px content measure; hairline
  rules instead of cards; one repeated 8px rhythm.

## Motion inventory (all optional)

| Where | What |
| --- | --- |
| Hero | masked line-rise for the three headline lines, then the cobalt rule draws left→right; figure, lede and facts fade up in one sequence |
| Progress | 2px bar under the masthead tracks page progress |
| Spine | left gutter line fills as you scroll; a tick is placed at each section |
| Age rail | from 1024px, the four stages pin and translate sideways; the wire below fills and its dot travels with them. Below 1024px the stages stack and the wire becomes a scroll progress |
| Section titles | clip-path wipe (`js-mask`) |
| Body blocks | small `translateY` + fade (`js-reveal`) with 55ms stagger |
| Project marks | the four project icons (comic panel, book, lightbulb, mountain) are drawn with DrawSVG when reached |
| Contact | the loop at the end of the line draws itself under the email |
| Gallery | wall line fills as you scroll; artist rows lift by 18px into place; the work rules grow on hover/focus; a custom viewer opens with a View Transition morph from thumbnail to full screen |

Stack: **GSAP 3.15.1** (`gsap.min.js`, `ScrollTrigger.min.js`, `DrawSVGPlugin.min.js`),
**Lenis 1.3.27**, all UMD and vendored in `assets/vendor/` with their licences.
No CDN, no build step, works from `file://`. GSAP has been free for every use,
including the former Club plugins, since 3.13.

## Degradation

- **No JavaScript** (`html.no-js`): the stages stack, the rail is not pinned, the
  marks and copy are visible, the progress bar is hidden. The page reads as a static
  site. On the gallery, a `<noscript>` note says the larger view needs JS and that
  every work and caption is already on the page.
- **Reduced motion:** `html.reduce` turns off every animation, and the rail stacks
  with the line still drawn — same content, no movement.
- **No View Transitions** (older Safari/Firefox): the viewer opens with a plain
  `showModal()`; arrows, Escape, swipe, zoom and focus return are unchanged.
- Focus is trapped by the native dialog, goes back to the work that was opened, and
  page scroll unlocks on close.

## Verified

- `qa.py`: **PASS** (0 fails, 0 warns) — facts, fees, names, local assets, valid JS.
- `cdp-audit.js` at 360 / 390 / 768 / 1024 / 1440 on both pages: no horizontal
  overflow, no broken images, no missing alt text, one `h1`, no low-contrast text.
  At ≥1024 the only "clipped" report is the intentional horizontal rail viewport.
- `cdp-lightbox.js`: 24 works / 12 names, opens, next changes the image, Escape
  closes, scroll unlocks, focus returns to the opening button.
- Reduced motion and scripts-disabled emulation: no hidden content, no clipped
  stages, stages reachable at every width.
- Chinese headings use a subset rebuilt from this version's own text (372 CJK chars
  → 17 Noto Serif SC 700 faces).

## Known limits

- Other three galleries remain "coming soon" (client artwork pending).
- Viewer state is not deep-linkable (no URL per work); closing returns to the wall.
- Pinned rail needs ≥1024px; below that it is an honest vertical list, not a
  touch horizontal scroll.
