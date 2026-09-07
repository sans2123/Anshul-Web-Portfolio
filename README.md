# Anshul Shukla — Portfolio

Product design portfolio. Plain React (UMD) + Babel standalone, no build step —
open `index.html` from any static server and it runs.

## Deploy — Vercel

Pure static, **no build step** — Vercel serves the repo root as-is.
There is deliberately no `package.json`: adding one makes Vercel try to detect
a framework and run a build that does not exist.

Import the repo, then:

| Setting | Value |
| --- | --- |
| Framework preset | **Other** |
| Build command | *(leave empty)* |
| Output directory | `.` |
| Root directory | `./` |
| Install command | *(leave empty)* |

Everything else lives in `vercel.json`:

- **Headers** — `nosniff`, `SAMEORIGIN`, `strict-origin-when-cross-origin`, a
  locked-down `Permissions-Policy`, and an explicit
  `Content-Type: application/javascript` for `.jsx` (not in the default MIME
  table, so a direct hit would otherwise download instead of render).
- **Cache policy** — conservative on purpose. With no bundler there are no
  hashed filenames, so `.html`/`.css`/`.js`/`.jsx` must revalidate on every
  request or a deploy could serve new markup against cached scripts. Only
  `.webp` and `.svg` are cached long (30 days, `stale-while-revalidate`).
- **`/resume`** — 301 to `anshul-shukla-resume.pdf`.
- **Catch-all rewrite** — routing lives in React state, not the URL, so any
  path that isn't a real file gets the app shell instead of a 404. Vercel
  matches the filesystem before rewrites, so real assets are unaffected.

### Hosting files

| File | Purpose |
| --- | --- |
| `vercel.json` | Headers, cache policy, `/resume` redirect, app-shell rewrite |
| `robots.txt` | Allows everything except the archival directories |
| `favicon.svg` | Single-file icon — no PNG set, no extra requests |
| `.gitignore` | OS cruft, `.vercel/`, editor state |

**Still to do before launch:** an `og:image` (1200×630) — the social tags are
in `index.html` but have no image, and `robots.txt` has a commented-out
`Sitemap:` line, both waiting on the production domain.

## Run locally

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. A server is required (the `.jsx` files are
fetched over HTTP; `file://` will be blocked by CORS).

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Entry point — head metadata, the inlined boot loader, fonts, stylesheets, then the scripts in order |
| `styles.css` | Base editorial layer (type scale, layout, components) |
| `glass.css` | **Glass theme** — light monochrome palette + frosted-glass surfaces. Loads *after* `styles.css` and overrides it |
| `app.jsx` | Routing, page transitions, tweaks panel wiring, theme defaults |
| `nav.jsx` | Top navigation + footer |
| `home.jsx` / `work.jsx` / `about.jsx` | Pages |
| `project-data.jsx` | Project copy + gallery grid definitions |
| `shared.jsx` | Reveal-on-scroll, MaskReveal, Placeholder, Sticker |
| `cursor.jsx` | Custom dot + ring cursor |
| `tweaks-panel.jsx` | Live theme editor shell |
| `lava.js` | Background lava field — metaball blobs merged through an SVG goo filter |
| `tilt-fx.js` | 3D tilt + specular glare on glass cards |
| `touch-fx.js` | Touch equivalents of the pointer effects (scroll-triggered reveals) |
| `responsive.css` | Mobile + tablet layer — loads last, only ever adds to the desktop rules |

### Boot loader

The loading screen is inlined in `index.html` (style + script, no extra
requests) so it paints before `styles.css`, React and Babel arrive. It
dismisses on real readiness — `document.fonts.ready`, the first React paint
into `#root`, and `window.load` — then waits for two consecutive cheap frames
before fading, so the handoff doesn't land on the shader compile. The 8s
timeout is a stall guard only, never the normal path.

### Load order matters

`styles.css` defines the dark editorial base; `glass.css` re-declares the
palette as light monochrome and adds the frosted-glass surfaces. Swapping the
two `<link>` tags reverts the site to the old dark theme.

`lava.js` and `tilt-fx.js` are plain scripts (not JSX) and must load *after*
`app.jsx` — they attach to elements React has already rendered.

## Assets

`biobrain-assets/`, `brazil-assets/`, `maxhealth-assets/` and `morework-assets/` hold the project
screenshots referenced by `project-data.jsx`, as **WebP** capped at 2400px wide
(4.1 MB total, down from 61 MB as PNG). `clippings/` and `screenshots/` are
unreferenced extras kept for reference.

`raw-uploads/` holds the 46 original un-processed screenshots, at full
resolution and untouched. Nothing references them — they are the archival
source the assets above were derived from. Re-encode from these if you ever
need different dimensions or quality.

## Reference & archive

`Anshul Shukla - Portfolio.html` (repo root) is the **standalone export** — a
single self-contained file with every script, stylesheet, font and image
inlined as base64. It needs no server and no network. It is the visual
reference the loose source files in this repo were reconciled against, and the
two now render identically.

`archive/` keeps the superseded originals, verbatim:

| File | Note |
| --- | --- |
| `archive/app.jsx` | Pre-glass theme defaults (red `#FF3D2E` accent, lime, purple glows) |
| `archive/index.html` | Older entry point — no `glass.css`, no lava, dark background |
| `archive/Anshul Shukla - Portfolio.html` | Older entry-point variant, same era |
| `archive/.thumbnail` | Bundler-generated preview artifact |

`blobs.js` (repo root) is the earlier background effect that `lava.js` replaced.
Nothing loads it — it is kept for reference only.
