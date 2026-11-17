# Version 02 — Prospectus

A second website for Miss Yang’s Art School, built as a printed prospectus translated to the
screen: one idea per spread, strict grid, facts before adjectives.

## Concept

The site behaves like a school prospectus rather than a marketing page. The first screen is a
title page (statement, bilingual subtitle, a small “the school, in short” panel). Everything
below is numbered like chapters — `01 Courses & fees`, `02 How we teach`, `03 Meet Miss Yang`,
`04 Student galleries`, `05 Signature Art Projects`, `06 Beyond weekly classes` — and each
chapter opens with the same ruled header: number in column 1, title in columns 2–8, a short
standfirst in columns 9–12.

The centre of gravity is the **courses-and-fees table**: four courses, one row each, school year
and age on the same baseline as the course name, skills in two languages, then a blue-ruled
per-term column carrying the tabular figures. The table is meant to be read, compared and acted
on — not skimmed as decoration. It closes with the arithmetic (“ten lessons, so the per-term fee
is the per-lesson fee multiplied by ten”) and the school’s own referencing note.

## Palette

| Token | Value | Use |
| --- | --- | --- |
| `--paper` | `#FFFFFF` | page ground |
| `--ink` | `#111110` | type, rules, reversed panel |
| `--blue` | `#1533CC` | links, per-term column, the one status square, focus |
| `--grey` | `#EFEEE9` | “How we teach” band, hover rows |
| `--line` | `#D9D8D2` | structural hairlines |
| `--muted` | `#5D5C57` | secondary labels (4.9:1 on white) |
| `--on-ink` | `rgba(255,255,255,.72)` | labels on the reversed panel |

Blue is the only signal colour and it always means “action or money”. Rules are 1px; only the
table’s frame, the facts panel and the motto carry 2px lines. No gradients, shadows, rounded
corners or tinted pages.

## Type

One Latin family, Archivo (variable, self-hosted `assets/fonts/archivo-normal-latin.woff2`), used
with both weight and width axes:

- **Display** — Archivo 780, `wdth 88`, tight tracking (−0.033em), leading 0.92. The hero and
  page titles only.
- **Headings** — Archivo 730, `wdth 92`, leading ~1.02.
- **Body** — Archivo 400, 17px/1.55, measure kept to 55–75 characters.
- **Labels and data** — Archivo 500, 12–13.5px, with `font-variant-numeric: tabular-nums` on
  every fee so the digits sit in columns.
- **Chinese** — system sans (`PingFang SC`, `Hiragino Sans GB`, `Microsoft YaHei`): 600 for
  headings, 400 for body, one step smaller and often muted. Every Chinese phrase is in
  `<span class="zh" lang="zh-Hans">` and follows its English.

Nothing is set in all-caps with wide tracking; no monospace micro-labels; no arrow glyphs or
middle dots. Section numbers are tabular, muted and small — a prospectus device, not an eyebrow.

## The bold move

A single full-bleed **ink “At a glance” panel** between the opening images and the fees table:
four numbers at 116px — `4–18` ages taught, `4` courses, `10` lessons a term, `12` artists in the
gallery — reversed out of the black, separated by hairlines, with quiet labels. It is the one
place the palette inverts, and it does the work a page of adjectives usually does. Everything
else on the page stays on white.

## Page notes

### Home (`index.html`)

Top bar → title page with “the school, in short” panel → three Little Artists works (full
artwork, never cropped into) → **At a glance** → `01` courses and fees → `02` how we teach (grey
band, three abilities) → `03` Meet Miss Yang with the school motto → `04` four galleries (only
Little Artists is marked *Open now*; the other three are *Coming soon*) → `05` Signature Art
Projects (four-panel comic plate plus the four project types) → `06` Beyond weekly classes
(holiday workshops, 2027 Little Artists Leadership Program pilot, long-term reward note) →
enquiry band with the email → footer.

### Little Artists (`little-artists/index.html`)

The full gallery: twelve artists in class order, two works each, twenty-four works. Each artist
is a plate with number, name and age; the two works hang as a pair at their true proportions —
no cropping, no forced squares. On wide screens the plates run as a two-column wall; the DOM
order remains 01→12 (it becomes a single sequential column below 860px). Any work opens a
keyboard-accessible lightbox: arrow keys, Home/End, Escape, click outside the stage to close,
focus returns to the work that opened it.

## Build

Plain HTML, one stylesheet, one deferred script. No framework, no fetch, no modules, no external
requests; every path is relative and the pages work from `file://`.

- `assets/css/site.css` — tokens, 12-column grid, all components, breakpoints at 1180/1024/860/620
- `assets/js/viewer.js` — lightbox (dialog, keyboard, focus restoration)
- `assets/fonts/` — seed fonts; only Archivo is referenced (via `@font-face` in `site.css`)
- Images are the supplied files under `assets/img/home/` and `assets/img/little-artists/`

## Verification

```sh
python3 versions/_shared/tools/qa.py versions/02-prospectus           # PASS 0 fails / 0 warns
node   versions/_shared/tools/cdp-audit.js --url file://…/index.html --widths 390,768,1024,1440
node   versions/_shared/tools/cdp-lightbox.js --url file://…/little-artists/index.html
```

- `qa.py`: PASS, 72 files, 4.41 MB, 2 html.
- `cdp-audit`: at 390/768/1024/1440 both pages report `scrollWidth == viewport`, no overflow, no
  external links, no missing `alt`, no duplicate ids, Archivo loaded, exactly one `h1`. The only
  tap target below 32px is the brand link on desktop (30px), which is a mouse environment.
- Lightbox smoke test: opens, advances (image changes), Escape closes, page scroll restored,
  focus returned to the originating work.
- Visual checks were made from full-page captures at 1440 and 390 (`cdp-shot.js --scroll`);
  `loading="lazy"` is used on the gallery images, so those captures were taken from a temporary
  copy with lazy loading disabled so every artwork appears.

## Known limitations

- The coming-soon galleries deliberately show one existing work each and a *Coming soon* status;
  no works, ages or dates are invented for them.
- Home page is long by design (about 7,800px at 1440); it is a prospectus, read in chapters.
