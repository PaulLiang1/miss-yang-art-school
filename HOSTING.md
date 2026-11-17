# Hosting the preview

## The live link

**https://paulliang1.github.io/miss-yang-art-school/**

- The original handover site (version 00) plus all seven new directions, and the chooser page, on GitHub Pages. Free, no domain needed,
  no bandwidth bill, HTTPS included.
- Source lives in the public repo `PaulLiang1/miss-yang-art-school`; the content is the folder
  `dist/share/` in this workspace. Pages rebuilds automatically about a minute after a push.
- Every version still works offline from this folder too — GitHub is just where the preview sits.

## Updating it

```bash
# edit files, then
cd dist/share
git add -A && git commit -m "update" && git push
```

Or copy an updated version folder from `versions/` into `dist/share/` first, then commit.

## If you would rather not keep a public repo

GitHub Pages on a free account only builds from public repositories. Two ways out:

1. **Cloudflare Pages** (unlisted `*.pages.dev`, repo stays private or absent):
   ```bash
   npx wrangler pages deploy dist/share --project-name miss-yang-art-school
   ```
   The first run opens a browser to sign in to (or create) a Cloudflare account. Free plan,
   20,000 files, 25 MiB per file — this site is about 510 files / 33 MB.
2. **Make the repo private again** (`gh repo edit PaulLiang1/miss-yang-art-school --visibility private`).
   The live site stops serving at that point.
3. **Delete it entirely:** `gh repo delete PaulLiang1/miss-yang-art-school`.

## What was checked, and what is not worth trying

- Verified live: chooser, `01-atelier`, `01-atelier/little-artists`, `03-scrapbook`,
  `05-ink/little-artists`, `07-gallery` all return 200; fonts and screenshots load over HTTPS.
- `.nojekyll` is committed — without it GitHub ignores the `_shared/` folder and the chooser loses
  its stylesheet.
- **Google Sites** cannot host these folders: it is a page builder, and its "Embed code" box is for
  snippets, not a whole site. `sites-pack/GOOGLE_SITES.md` covers what it can do.
- **Netlify Drop** accepts a folder without an account, but anonymous drops stay password-protected
  until someone signs in and claims them, so it is not a share link by itself.
- **Tiiny.host** free plan caps a project at 3 MB — the smallest direction here is about 4 MB, and
  the upload is 33 MB.
- The earlier `https://*.trycloudflare.com` link was only a tunnel from this machine; it is gone once
  the terminal or the machine stops.
