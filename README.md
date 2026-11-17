# Miss Yang’s Art School — seven website directions

**中文摘要** 同一所学校、同一批学生作品，七个完整的两页网站（第六、第七个带 GSAP 动效，并保留无脚本可读的降级版）。每个文件夹都是可以直接打开、上传的静态站；字体、图片、脚本全部本地，不需要联网、不需要构建。

---

## What this is

The original handover site is one interpretation of this school. This folder holds **seven complete alternative versions** of the same two-page website, built from the same fixed decisions and the same student artwork, each with its own visual language, typography, layout and content angle.

Nothing was invented: school name, gallery names, course names, fees, ages, student names and ages, contact details, and the absence of an achievements section are identical in all seven. Only the way the school presents itself changes.

| Folder | Direction | In one line | Palette | Type |
| --- | --- | --- | --- | --- |
| `01-atelier/` | **The Monograph** | A printed catalogue about a painter-teacher: chapters, plates, marginalia. | paper `#F3EFE6`, ink `#1D1B18`, stone `#6B6459`, oxblood `#7A2E2A` | Fraunces + Newsreader |
| `02-prospectus/` | **The Prospectus** | A Swiss school prospectus that leads with the facts every parent checks. | white, ink `#111110`, signal blue `#1533CC`, grey `#EFEEE9` | Archivo (variable) |
| `03-scrapbook/` | **The Studio Table** | A working studio table: taped-up work, caption slips, a fee sheet. | paper `#F1EEE6`, charcoal `#2C2A26`, pencil blue `#2C5AA0`, marigold `#E0A93B` | Bricolage Grotesque + Figtree |
| `04-gallery-night/` | **After Hours** | The gallery at night: spotlit work, gilt rules, quiet luxury. | night `#0E0F11`, room `#17181C`, chalk `#EDE6D8`, gilt `#C2A15C` | Bodoni Moda + Figtree |
| `05-ink/` | **Ink & Paper 墨与纸** | Rice paper, three chapters 观 / 思 / 创, a red seal, a lot of 留白. | rice `#F5F1E5`, ink `#1E1D1A`, stone `#6F695C`, seal `#A63A2B` | Cormorant Garamond + Newsreader |
| `06-line/` | **One Line 一条线** | One cobalt line becomes the curriculum: drawn under the headline, down the gutter, through the four age stages, into the fee table, ending in a loop under the email. The animated one. | paper `#F2F3EF`, ink `#14171A`, graphite `#565E5B`, cobalt `#1E3AE0` | Instrument Serif + Instrument Sans |
| `07-gallery/` | **A Quiet Room 安静的房间** | The same scroll-driven line as 06, calmed and warmed: softer paper, slate blue, a taped photograph, a studio stamp. The version that tries least hard. | paper `#F4F3EE`, ink `#2E2F2B`, slate `#4F646E`, clay `#A06F60` | Bodoni Moda + Instrument Sans |

`versions/original/` is not included — the untouched handover site is in `miss-yang-handover/site/` at the repository root.

## Open it

- **Start here:** double-click `versions/index.html`. It is a one-page chooser: each direction’s description, palette, type and a screenshot, with links into both pages.
- Each version also opens directly: `versions/01-atelier/index.html`, and `versions/01-atelier/little-artists/index.html`.
- Everything works from `file://` — no server needed. If your browser restricts anything (rare), run `python3 -m http.server 8000` inside a version folder and open `http://localhost:8000`.
- To preview on a phone on the same Wi-Fi: serve the folder as above and open `http://<your-computer-ip>:8000` on the phone.

## Share a preview

- **Live preview:** https://paulliang1.github.io/miss-yang-art-school/ — all seven directions, free GitHub Pages, rebuilt by pushing `dist/share/` (see `HOSTING.md`).
- `./preview.sh` serves `versions/` on http://127.0.0.1:8080 (needed for folder links such as `little-artists/`).
- `./preview.sh --public` also opens a `cloudflared` quick tunnel and prints a `https://*.trycloudflare.com` link anyone can open. It lasts only while the script and this machine keep running, and it is unlisted, not private — share it only with the people reviewing.
- **Google Sites** cannot host these folders. `sites-pack/` has full-length screenshots, paginated PDFs, phone shots and paste-ready copy, plus `GOOGLE_SITES.md` for the two routes Sites does support.

## What every version shares

- Two pages: **home** and **Little Artists 小小艺术家** (12 artists, 24 works, click a work for the larger view, arrow keys / Esc).
- English first, then Chinese, in `<span class="zh" lang="zh-Hans">`; student names are never translated.
- Galleries: Little Artists 小小艺术家 (4–6), Young Creators 小创作家 (6–8), Creative Explorers 创意探索者 (9–11), Emerging Artists 新锐艺术家 (12–18) — the last three honestly marked “coming soon”.
- Courses: Creative Foundations, Art Foundations, Advanced Art, HSC Visual Arts Mentoring; **$45 / $50 / $55 / $65 per lesson, $450 / $500 / $550 / $650 per term of 10 lessons**.
- Signature Art Projects (four-panel comics, original picture books, character design, scene design) are teaching projects — there is no achievements section.
- Contact: alinayang800@gmail.com, Sydney, Australia.
- All assets local: artwork and the portrait copied from the handover site, fonts self-hosted as `woff2`, no CDN, no analytics, no external requests. No build step.
- Versions 06 and 07 additionally vendor GSAP 3.15.1, ScrollTrigger, DrawSVGPlugin and Lenis 1.3.27 under `06-line/assets/vendor/` with their licences; 07 uses the same GSAP pair plus native View Transitions in the gallery.
- Responsive from 390 px to 1440 px, keyboard-operable lightbox, visible focus states, reduced-motion respected.

## What is different between them

| | Content angle | Layout idea |
| --- | --- | --- |
| 01 | The teacher as an artist: philosophy, process, lineage. | Monograph spread with Roman-numeral chapters and plate captions. |
| 02 | The parent’s checklist: ages, courses, term, fees — up front. | 12-column grid, one reversed ink facts panel, the fee table as the centrepiece. |
| 03 | The room where it happens: tape, paper, table, work in progress. | Taped collage hero, growing wall, fee slip, hand-placed notes. |
| 04 | The exhibition: the work as art, presented after hours. | Dark stage, spotlit hero work, horizontal hanging rail, gilt rules. |
| 05 | The Chinese aesthetic tradition behind the school’s name. | Rice-paper scroll, vertical chapter markers 观 / 思 / 创, a carved seal. |
| 06 | The teaching method itself: one line that grows in skill and confidence from four to eighteen. | Scroll-driven line: hero rule, left gutter spine, pinned horizontal stage rail, drawn marks, looped signature, custom gallery viewer with a View Transition morph. |
| 07 | The working studio, quiet: the work is the loudest thing in the room. | Same line structure as 06, restyled: taped hero print with a circular studio stamp, hero fact strip, calmer type and colour. |

## Versions 06 and 07 — the motion layer

06 is the one built to show what the site can do when it moves. GSAP + ScrollTrigger draw the line as you scroll, pin the four age stages into a sideways rail, and draw the project icons; Lenis smooths the scroll and is paused while the gallery viewer is open. Every piece degrades:

- **No JavaScript:** the page is fully readable — the stages stack, marks are visible, nothing is hidden behind a script.
- **`prefers-reduced-motion: reduce`:** all animation is off, the rail stacks into a vertical list, and the custom cursor-free reveals show immediately.
- **No View Transitions support** (e.g. older Safari): the lightbox opens with a plain dialog instead of a morph; keyboard, swipe, zoom and focus return all still work.
- **No CDN, no build step:** the libraries are local UMD files inside the version folder; `file://` works.

## Screenshots

`versions/shots/` holds, for every direction (07 included): `-home.png` (1440 × 960), `-fees.png` (the fees section), `-mobile.png` (real 390 px viewport), `-gallery.png` (Little Artists page); 06 also has `06-line-rail.png` (the pinned stage rail mid-scroll), plus:

- `compare-desktop.png` — the seven home pages at desktop width
- `compare-phone-360.png` — the layouts on a small phone (360 px; five directions)
- `compare-tablet-834.png` — the layouts on a tablet in portrait (834 px, iPad; five directions)
- `compare-tablet-1024.png` — the layouts on a tablet in landscape (1024 px; five directions)
- `compare-mobile.png` — the seven phone layouts at 390 px
- `compare-gallery.png` — the seven gallery pages side by side
- `chooser-1440.png` / `chooser-390.png` — the chooser page itself

## Responsive behaviour, checked

Screenshots are taken through Chrome’s device emulation (real viewport, not a cropped window), and every page is audited at **360, 390, 414, 768, 834, 1024, 1280 and 1440 px**:

- no horizontal scrolling or cut-off content at any width, on either page, in any version;
- navigation reflows into a two- or three-row menu on phones and fits on one row from tablet width up (03 keeps a deliberate two-row paper menu on tablets, as part of its scrapbook look);
- the fees table switches to stacked label/value rows on small screens so no column is dropped;
- galleries reflow from a wall of pairs to a single column; the lightbox is full-screen on phones;
- tap targets are at least 32 px high (44 px in the lightboxes), text stays above WCAG AA contrast, `prefers-reduced-motion` is respected.

## Responsiveness notes per direction

| | Phone (≤ 620) | Tablet portrait (768–834) | Tablet landscape / desktop (≥ 1024) |
| --- | --- | --- | --- |
| 01 | plates stack; fee table stacks label/value | 3-up plate strip; two-column hero | full monograph spread with hanging chapter numerals |
| 02 | nav in 3 rows (all five links kept); fact panel below headline; table becomes a definition list | same stack, wider measure | two-column hero, fact panel right, 12-col grid |
| 03 | one taped column; notes become a ruled list | collage hero stacks above copy | collage beside copy, hanging wall in pairs |
| 04 | single dark column; table stacks; rail scrolls | split hero, rail stays horizontal | split hero, museum plates, full programme table |
| 05 | one column; vertical chapter markers move inline | two-column hero with the work bleeding right | full scroll with sticky chapter spine on the left |
| 06 | one column; stages stack; rail wire becomes a scroll progress | stacked stages; nav in two rows | pinned horizontal stage rail (≥1024) with the progress wire and dot; fees table as a printed schedule |
| 07 | one column; stages stack; hero strip becomes a 2×2 grid | stacked stages; nav wraps | pinned stage rail; hero print beside the headline; facts strip in five cells |

## Checks run

- Fact and asset checks on every version (`qa.py`): balances the school name, four galleries, four courses, all eight fee figures, ages, ten-lessons wording, email, Sydney, Signature Art Projects and the four project types; confirms every local `src`/`href` resolves, no external requests, correct student count and names, viewer markup, and valid JavaScript. **All seven: PASS, 0 fails, 0 warns.**
- Browser audit at 390 / 768 / 1024 / 1440 px: no horizontal overflow, no broken images, no missing alt text, exactly one `h1`, no low-contrast text, tap targets sized for phones.
- Lightbox test in a real browser: opens, advances, Escape closes, page scroll is restored, focus returns to the work that was opened — **all seven pass**. 06 additionally tested with the View Transition path, click-to-zoom, drag-pan and swipe.
- 06 and 07 checked with reduced motion emulated and with the rail breakpoints: no hidden content, no clipped stages, no horizontal overflow.
- Chinese headings use a cut-down Noto Serif SC subset rebuilt for each version’s exact characters, so no heading falls back to a system font.

`versions/_shared/` holds the chooser’s stylesheet and the build/QA scripts — it is not part of any website and can be ignored when copying a version out.

`miss-yang-handover/` (and `miss-yang-handover.zip`) is the untouched original handover, kept as the reference.

## Not done here (deliberately)

- No domain, no Cloudflare, no DNS, no deployment — the brief was local files only. The handover site’s `docs/HANDOVER.md` still has the full deployment procedure for whichever version is chosen.
- The three “coming soon” galleries need the client’s artwork; the remaining Canva tidy-up (the Athena cat caption) is unchanged from the handover.
- `miss-yang-handover/` is kept untouched as the reference/original.
