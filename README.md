# Anshul Shukla — Portfolio

Product design portfolio. Plain React (UMD) + Babel standalone, no build step —
open `index.html` from any static server and it runs.

## Run locally

```bash
python -m http.server 8000
```

Then open <http://localhost:8000>. A server is required (the `.jsx` files are
fetched over HTTP; `file://` will be blocked by CORS).

## Structure

| File | Purpose |
| --- | --- |
| `index.html` | Entry point — loads fonts, both stylesheets, then the scripts in order |
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

### Load order matters

`styles.css` defines the dark editorial base; `glass.css` re-declares the
palette as light monochrome and adds the frosted-glass surfaces. Swapping the
two `<link>` tags reverts the site to the old dark theme.

`lava.js` and `tilt-fx.js` are plain scripts (not JSX) and must load *after*
`app.jsx` — they attach to elements React has already rendered.

## Assets

`biobrain-assets/`, `brazil-assets/` and `maxhealth-assets/` hold the 40 project
screenshots referenced by `project-data.jsx`. `clippings/` and `screenshots/`
are unreferenced extras kept for reference.

`raw-uploads/` holds the 46 original un-processed screenshots these were cropped
and renamed from. Nothing references them; they are the pre-production source.

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
