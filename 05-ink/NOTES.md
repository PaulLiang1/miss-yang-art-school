# 05-ink — 墨与纸 / Ink & Paper

An alternative site for Miss Yang’s Art School, Sydney. Two pages, hand-written
HTML and CSS, no framework, no build step, no external request. Open
`index.html` directly from the filesystem; everything is relative and local.

## Why this direction

The original site is a warm gallery wall. This version treats the page as a
sheet of rice paper that the school has been written and stamped onto: ink type,
hairline rules instead of boxes, and a great deal of unpainted space that the
composition has to earn. The Chinese layer is not decoration — it carries the
structure (chapter marks), the voice (motto, inscriptions) and the one stamp of
colour (the seal).

## Palette

| token | value | role |
|---|---|---|
| `--rice` | `#F5F1E5` | paper ground for the whole site, dialog ground |
| `--ink` | `#1E1D1A` | text, rules at low alpha, the seal’s home colour |
| `--stone` | `#6F695C` | Chinese body, captions, secondary labels and figures |
| `--seal` | `#A63A2B` | seal, links on hover/focus, lightbox arrows, selection |
| `--rule` | `rgba(30,29,26,.22)` | 1px hairline rules everywhere |
| `--rule-strong` | `rgba(30,29,26,.42)` | stronger rules under links and the lightbox bar |

No gradients, no shadows, no rounded cards, no filled panels. Depth comes from
rules and whitespace only. Stone was darkened from the brief’s `#8A8375`
(3.3:1) to `#6F695C` (4.83:1 on rice) so the Chinese layer passes WCAG AA — it
was the only palette change and it makes the second language read properly.

## Type

| role | family | usage |
|---|---|---|
| display | Cormorant Garamond 400/500 + italic | h1–h4, artist names, prices, poem-like leads |
| body | Newsreader 300–500, 18px/1.7 | English prose, links, captions, table text |
| Chinese display | Noto Serif SC 700 | headings inside `h1–h4`, the seal 杨, the vertical marks 观 / 思 / 创 |
| Chinese body | Songti SC → Noto Serif SC | `.zh` prose, captions, table sub-labels |
| small sans | Figtree 300–900 | only the Chinese sub-labels in the main nav |

All four are local woff2 (see `assets/css/fonts.css`,
`assets/css/google-fonts.css`). `.zh` is a block by default and always follows
its English line; only “label + value” pairs (ages, contact labels, the pilot
year) are allowed inline.

## Structure

**Home** — masthead (seal + name left, nav right, drawn hairline under both) /
asymmetric hero (7-column headline + motto + lede + “Ask about a place” link;
4-column student painting pushed off the right edge) / 一 观 Student galleries:
four ink-ruled plates, Little Artists carrying the only live link / 二 思 Meet
Miss Yang: portrait beside her letter, then three abilities stepped to the right
(observe → think → make) / 三 创 Courses and fees table, Signature Art Projects
(comic plate + four-project list), Beyond weekly classes (workshops + 2027
leadership pilot) / quiet closing “Write to Miss Yang.” with the seal set into
the inscription / footer.

**Little Artists** — same masthead, h1 with a vertical 小小艺术家 beside it,
preface and count in the right column, then twelve artists in the brief’s order:
Cormorant name + age at the left margin, their two works pinned to the right
edge of the page like plates in a catalogue. Each pair is a `<button>` opening a
lightbox. Closes with the next room (Young Creators), the email and a way back.

## The bold move

The **vertical chapter marks 观 / 思 / 创** are the spine of the home page. Each
sits in its own rail in the left margin, set in Noto Serif SC at
`clamp(2.75rem, 5.5vw, 5rem)` in 85% ink, with a hairline and the English word
*Look / Think / Make* rotated beneath it. They are `position: sticky`, so while
you read a chapter its single character stays with you in the margin. Below
900px they fold down into a horizontal mark (character, rule, word) rather than
squeezing into a sliver; verified clean from 390 to 1440.

Two supporting gestures rather than extra decoration:

- the hero painting **bleeds off the right edge** of the paper (the page frame
  ends 122px in; the quokka runs to the viewport edge), so the artwork leaves
  the page;
- the contact seal is not a badge next to a heading — it is **set into the
  inscription** after 给杨老师写信。, slightly rotated, the way a stamp closes a
  colophon. The only other red is the header seal and the lightbox arrows.

## Details decided during the build

- Student work chosen from the real site: quokka hero; Mia for the gallery
  link; aely-chai-numbat, athena-cat and joseph-portrait as the single
  representative work for the three rooms that are still being prepared; the
  four-panel comic for Signature Art Projects.
- Fees are one honest table (course / reference age / skills / per lesson / per
  term) with the course names and figures joined visibly. At ≤820px the table
  restacks into one block per course (course, age, skills, then the two prices)
  so it never needs sideways scrolling on a phone.
- "艺术" abbreviations in the table header stack on their own line, keeping
  参考年龄 / 每节课 / 每学期 unbroken.
- Long-term reward and the "reference only" note are kept because they are in
  the source; nothing about prizes, results or achievements was added.
- The only motion is the masthead rule drawing in over 400ms; it is disabled
  under `prefers-reduced-motion`. Links, cards and images do not animate.
- Focus is always visible (2px seal outline). `.brand`, every nav item, the
  gallery buttons, the email link and the lightbox controls meet the 44px
  target. The lightbox is a native `<dialog>`: Esc closes, ←/→ move between the
  two works, the backdrop closes, focus returns to the button you opened from,
  page scroll is locked while it is open, and the caption carries the artist,
  age and “Artwork N of 2 / 第N幅，共2幅”.
- Home images are eager (820 KB total, all above the fold in a normal read);
  the 24 gallery works are `loading="lazy"`.

## Verification

- `python3 versions/_shared/tools/qa.py versions/05-ink` → **PASS** (0 fails,
  0 warns; 72 files, 4.39 MB).
- `versions/_shared/tools/cdp-audit.js` at 390 / 768 / 1024 / 1440: home has
  0 horizontal overflow, 0 small tap targets, 0 broken images, 0 contrast
  failures, 0 clipped text; Little Artists matches, its only flags being
  `loading="lazy"` images below the viewport, which load on scroll.
- Screenshots reviewed at 1440, 1024 and 390 with the shared CDP tools, plus
  viewport-scroll checks of the sticky marks and the lightbox in both sizes.
  Known tooling caveat: `shot.sh` 390 is a 500px-Chrome layout cropped to 390,
  so true mobile judgement uses `cdp-shot.js --width 390 --mobile`.

## Files

```
index.html                  home
little-artists/index.html   the Little Artists room
assets/css/ink.css          the whole stylesheet
assets/css/fonts.css        Noto Serif SC, Figtree, Young Serif (local)
assets/css/google-fonts.css Cormorant Garamond, Newsreader (local)
assets/js/viewer.js         lightbox, ~100 lines, no dependencies
assets/fonts/               local woff2
assets/img/home/            home works and portrait
assets/img/little-artists/  the 24 little-artists works
favicon.svg
```
