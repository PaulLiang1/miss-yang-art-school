# 04 — After Hours

An alternative site for **Miss Yang’s Art School** (Sydney, ages 4–18), built as a
dark, curated exhibition that only exists after closing time. The room is nearly black;
the work is lit; everything else gets out of its way.

Pages: `index.html` (the school) and `little-artists/index.html` (Room One of Four).

---

## The bold move

**Treat the website as a gallery at night, not a website in dark mode.** The
photographs already arrive inside pale cream frames — so the frames become the only
frames: no CSS borders, no mats, no shadows stacked on shadows. Each featured work
sits in its own pool of ceiling light on the near-black wall (hero, portrait, comic,
lightbox), and the two "galleries" sections are hung rather than laid out:

- the collection is a **horizontal hanging rail**, works bottom-aligned on one line
  with museum-style plates (`Mia, 4 · Blue bird under a sunset sky`);
- the four rooms hang on a **common label line** so works of different sizes share a
  baseline, like a real salon wall;
- the Little Artists page is a **salon wall of pairs** — every artist gets two works
  hung as an equal-height pair, with a name/age plate under the pair;
- the lightbox is a **black viewing room**: one work under one pool of light, a Bodoni
  italic plate, gilt arrows, nothing else.

The editorial voice is a gallery label, not marketing: Bodoni Moda italic for titles
and names, Figtree for body notes, Noto Serif SC 700 for Chinese headings. No cards,
no gradients between sections, no glass, no glow filters, no fake dates, no scroll cues.

---

## Palette (all on `--night: #0E0F11`)

| token | hex | role | contrast |
| --- | --- | --- | --- |
| `--night` | `#0E0F11` | ground, all pages | — |
| `--room` | `#17181C` | raised rooms only (fees panel, dialog) | — |
| `--chalk` | `#EDE6D8` | primary text, headings | **15.44:1** / 14.28:1 on room |
| `--chalk-85` | rgba(237,230,216,.85) | long body copy, table cells | **11.28:1** / 10.55:1 |
| `--chalk-70` | rgba(237,230,216,.70) | Chinese body copy, meta lines, footnote | **7.89:1** / 7.51:1 |
| `--gilt` | `#C2A15C` | hairlines, small marks, label rule, focus ring, per-term fees | **7.80:1** / 7.22:1 |
| `--smoke` | `#8C8577` | small meta only (≥12px): captions under 1rem, nav sub-labels | **5.24:1** / 4.85:1 |

No colour is used below 4.5:1; every body colour is above 7:1. The only lighter-than-
chalk surface is the raised `--room` panel; contrast was re-measured on it (right
column above). The skip link uses night ground + chalk text + gilt border, so it is
legible when it appears on focus.

## Type roles

- **Bodoni Moda** (400–500, normal + italic) — display: the h1/h2 voice, artist names,
  work titles, the email, per-term fee figures. Leading .97–1.05 for display,
  gallery-label italic at small sizes.
- **Figtree** (300/400) — all English body copy at 17.5px/1.65 at ~85% chalk, UI labels,
  table cells, captions.
- **Noto Serif SC** (700) — Chinese headings; **Noto Serif SC 400** for Chinese body
  below its heading, in the `.zh` voice.
- Bilingual rule everywhere: English first, then `<span class="zh" lang="zh-Hans">`.
  Chinese headings are 700 serif; Chinese body is 400 and sits one step quieter.

---

## Structure

### `index.html`
1. **Header** — school name, one 1px gilt rule at 40%, four gallery/fees/studio/enquire
   links each with a Chinese sub-label.
2. **Hero** — "After Hours · 闭馆之后", h1 *A gallery of work by young artists.*,
   lede, gallery link; on the right `opera-house.jpg` under a radial light pool with
   a caption (`Alina Yang’s students · Sydney`, *The Sydney Opera House at sunset*).
3. **Statement** — *Every work here was made by a student in class.* balanced against
   the data line **12 artists · 24 works**, the open/soon note, ages 4–18 and Sydney.
4. **The collection** — a hanging rail of eight works with plates, then the four rooms
   (Little Artists open; the other three "Gallery coming soon", each hung on one
   representative work).
5. **The programme** — dark fees room: rows are courses; columns school year, age, art
   skills, per lesson, per term (10 lessons); footnote that each term is 10 lessons and
   that year/age are a guide; long-term reward block.
6. **Meet Miss Yang** — portrait, role line, the client’s own philosophy copy, motto.
7. **How we teach** — observation & understanding, creative thinking, independent
   creation, each EN then ZH.
8. **Signature Art Projects** — four-panel comic as the centrepiece; the four project
   types with Chinese names; note that these are class projects across the year.
9. **Beyond weekly classes** — Holiday Art Workshops (four kinds) and the 2027 Little
   Artists Leadership Program pilot (two levels).
10. **Enquire** — *Ask about a place.*, huge mailto `alinayang800@gmail.com`, Sydney.
11. **Footer** — © 2026, ages 4–18, Sydney.

### `little-artists/index.html`
Room header (Room one of four · After Hours, h1 *Little Artists* / 小小艺术家,
ages 4–6, **12 artists · 24 works**, intro + how the lightbox works), then the salon
wall: 12 artists in the required order (Mia, Jiayi, Aurora, Felina, Audrey, Isabella,
Daniel, Olivia Sun, April, Nicole Wang, Chloe Wang, Annika) each with exactly two
works in `miss-yang-handover/scripts/la.json` order, one plate per pair. Ends with
"Next room — Young Creators · 小创作家" and links to fees/enquire, then the footer.

**Coming-soon rooms carry no fake content**: one representative work from
`assets/img/home/`, an honest "Gallery coming soon / 作品集即将上线" label, and the
group’s age range and focus.

---

## Accessible lightbox

`assets/js/night-viewer.js` (vanilla IIFE, no modules/fetch):

- 24 wall buttons → `dialog.showModal()` with the full-size work, artist name/age,
  English + Chinese title, and `Artwork 3 of 24 · 第3幅，共24幅`.
- `←`/`→` move through the room; `Esc` closes; the close button closes; a click on the
  dark stage closes; the page behind is scroll-locked while open.
- On any close path, focus is returned to the thumbnail that opened the viewer (`settle()`
  runs on the close and directly after `close()` so it also works where the headless
  `close` event is not emitted).
- Controls are 44×45px minimum, gilt hairlines, chalk text; focus-visible rings are a
  1px gilt outline with offset.

Everything else: one `h1` per page, landmarks, skip link, `:focus-visible` on every
interactive element, `prefers-reduced-motion` blanket, all images with descriptive alt
text (including the artist and age), width/height on every image, all four interactive
touch targets ≥44px (brand, back, inline links, next-room links, email).

Motion: one orchestrated moment — the hero work settles in over ~600ms (opacity +
2px rise) with its light pool fading up; disabled under `prefers-reduced-motion`.

---

## Facts and where they appear

`versions/_shared/BRIEF.md` is the source of truth; content was cross-checked against
`miss-yang-handover/site/*` and `miss-yang-handover/docs/HANDOVER.md`. All required
strings appear exactly: school name (curly ’), four gallery names + Chinese, four
course names, **$45/$50/$55/$65 per lesson** and **$450/$500/$550/$650 per term**,
10 lessons per term, "Signature Art Projects", 四格漫画/原创绘本/角色设计/场景设计,
`alinayang800@gmail.com`, Sydney, ages 4–18, © 2026, all 12 Little Artists with the
right ages in the right order. No achievements section, no invented facts, no dates
that were not in the handover.

---

## Verification

```
python3 versions/_shared/tools/qa.py versions/04-gallery-night
# == versions/04-gallery-night: 74 files, 4.41 MB, 2 html
# RESULT PASS (0 fails, 0 warns)
```

True-viewport audit (`versions/_shared/tools/cdp-audit.js`, node 24):

| page | widths | scrollWidth | scrollHeight | small targets | low contrast | external |
| --- | --- | --- | --- | --- | --- | --- |
| home | 390 / 768 / 1024 / 1440 | 390 / 768 / 1024 / 1440 | 13597 / 10954 / 8730 / 8125 | 0 | 0 | 0 |
| little-artists | 390 / 768 / 1024 / 1440 | 390 / 768 / 1024 / 1440 | 4648 / 2753 / 3090 / 3681 | 0 | 0 | 0 |

- No horizontal scroll at any width; the only "clipped" entries the auditor reports are
  the decorative light-pool pseudo-elements (intentionally clipped by `overflow-x: clip`)
  and the 1px screen-reader-only table caption.
- The audit lists `brokenImgs` for Little Artists only when it does not scroll — the
  below-the-fold works are `loading="lazy"` and not decoded at audit time. All 24 files
  were verified separately (valid JPEG, dimensions match `la.json`, exactly 24 in order,
  all with alt text), and they render in the full-page screenshots.
- Fonts: Bodoni Moda + Figtree Variable + Noto Serif SC load from local woff2 only.

Screenshots (true viewport, Chrome via CDP):

- `/tmp/04-desk.png` — home, 1440 wide (top 6000px)
- `/tmp/04-mob.png` — home, true 390 wide, DPR 2 (top 2600px)
- `/tmp/04-la.png` — Little Artists, 1440 wide
- full pages: `/tmp/cdp-home-1440.png`, `/tmp/cdp-home-390.png`,
  `/tmp/cdp-la-1440.png`, `/tmp/cdp-la-390.png`
- lightbox: `/tmp/04-box-1440.png` (1440×900), `/tmp/04-box-390.png` (390×844)
- LA at 390: `/tmp/04-la-mob.png`

Self-critique passes that changed the design (after looking at real screenshots):
1. Fees header showed "Per term10 lessons" — added the missing `.th-sub` rule: small
   Figtree line above 每学期; per-term header now reads "Per term / 10 lessons / 每学期".
2. Muted fee-table text was measured too quiet against `--room`: raised header Chinese,
   the 10-lessons sub-label and the footnote from smoke to `--chalk-70` (7.51:1 on the
   panel) and lifted table cell weight to 400; fee numerals confirmed to be lining
   figures at 1.4rem.
3. Studio role line read "Alina Yang, founder… Alina Yang，创始人…" — Chinese now
   repeats only the role.
4. Mobile "Enter the Little Artists gallery 进入小小艺术家作品展" broke mid-phrase —
   the Chinese half now sits on its own line below the English at ≤700px (same for the
   statement link so "…作品集" can’t orphan).
5. Hero figure was inset by the UA `figure` margin — `margin: 0` so the work hangs from
   the section edge, matching the grid on both pages.
6. Lightbox image sat 2px above the caption rule and the backdrop let the page ghost
   through at .95; added stage breathing room, capped the image at `100dvh - 15rem`,
   darkened ::backdrop to `rgba(8,8,9,.985)`, and the lightbox now reads as a black
   viewing room at 390 and 1440.
7. Lightbox caption rendered "MiaAge 4" (missing space) and `Esc` was left to the
   native close-watcher (not observable in headless): explicit `Escape` handler plus
   `settle()` focus restore; keyboard test now passes end-to-end.
8. Mobile 390/768 work: verified with real 390/768 viewports (headless Chrome silently
   clamps `--window-size` to 500 CSS px, so the earlier 390 screenshot was a 500px layout
   cropped — not a layout bug). `overflow-x: clip` on `main` keeps the light pools from
   widening the page.
9. Skip link was chalk-on-chalk for its Chinese half; now a night plate with gilt border,
   chalk-70 Chinese (7.89:1).
10. Audit tap targets: brand, back, inline links, next-room links and the email link were
    21–29px tall; padding/margins give every one ≥44px without moving the type.

## Files

```
index.html
little-artists/index.html
assets/css/night.css          (the whole design system + lightbox)
assets/js/night-viewer.js     (lightbox)
favicon.svg                   (seed)
assets/fonts/, assets/css/fonts.css, assets/css/google-fonts.css (seed)
assets/img/home/ (9 works), assets/img/little-artists/ (24 works)
assets/js/viewer.js (seed, unused — night-viewer.js replaces it)
```

Self-contained: relative URLs only, no external requests, no frameworks, no fetch or
ES modules, works from `file://`. Only files inside `versions/04-gallery-night/` were
written.

## Not finished / limits

- Nothing on the brief is missing. Two honest limits: three galleries are genuinely
  coming soon (by design, with one representative work each), and the site has no
  booking/payment flow because the school takes enquiries by email.
- The rail is a native scroll container with scroll-snap; on trackpads it drags, and on
  desktop it also scrolls with the scrollbar/keyboard when focused. No JS carousel was
  added on purpose (keeps `file://` and reduced-motion behaviour simple).
