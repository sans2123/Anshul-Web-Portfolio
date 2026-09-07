repo: sans2123/Anshul-Web-Portfolio
branch: main

## Last sync
date: 2026-09-07T00:00:00Z

### Updated in this project
- Added static-hosting config so Vercel can serve the repo root with no build step: `vercel.json` (headers, cache policy, `/resume` redirect, app-shell rewrite), `.gitignore`, `robots.txt`, `favicon.svg`.
- Added the document head metadata `index.html` was missing — description, author, theme-color, icon, Open Graph and Twitter card tags.
- Documented deployment in README.md (Vercel preset Other / empty build command / output `.`), plus the boot loader, responsive layer and `morework-assets/`.
- Local-only changes so far — not yet committed or pushed upstream.

## Sync history
date: 2026-08-31T22:00:47Z
- Re-read upstream home.jsx to recover the original hero markup and copy; restored it verbatim (eyebrow, name line, "Designing systems that scale.", blurb + Currently/Previously meta, parallax stickers).
- Kept the local WebGL hero shader pane (hero-shader.js) behind the restored text; glass.css hero block trimmed to the shader pane + scrim only.

date: 2026-08-30T09:43:00Z
- Pulled the full runnable site (index.html, both CSS layers, all .jsx/.js, 40 project .webp assets) so it renders live here.
- Excluded archival paths per the brief: raw-uploads/, archive/, blobs.js, clippings/.
- Read-only baseline pass — no source changes yet.

## Screen map
| Screen / area | Repo files |
| --- | --- |
| Hosting config (Vercel) | vercel.json, robots.txt, favicon.svg, .gitignore |
| Shell, head metadata, boot loader, routing, tweaks defaults | index.html, app.jsx, tweaks-panel.jsx |
| Theme layers (base, then glass override, then responsive) | styles.css, glass.css, responsive.css |
| Top nav + footer | nav.jsx |
| Home (hero, marquee, bento, outro) | home.jsx, shared.jsx, hero-shader.js |
| Work list + project detail + lightbox | work.jsx, project-data.jsx |
| About (bio, skills, experience) | about.jsx |
| Cursor / background blobs / card tilt / touch | cursor.jsx, lava.js, tilt-fx.js, touch-fx.js |
| Project imagery | biobrain-assets/, brazil-assets/, maxhealth-assets/, morework-assets/ |
