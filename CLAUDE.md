# Working notes for this project

## Image uploads — always downscale first
Full-size uploads in `uploads/` stall both the preview and file writes.
Never call `view_image` / `image_metadata` on a raw upload, and never save a
large PNG into the project.

Instead, as the FIRST step after any image is attached, run one `run_script`
that reads the upload, draws it to a canvas at max 1100–1200px on the long
edge, and writes it out with `convertToBlob({type:'image/jpeg', quality:0.82})`.
Lightweight copies live in `uploads/small/`. Only view or use those.

Notes:
- `createCanvas` returns an `OffscreenCanvas` — use `convertToBlob`,
  NOT `toBlob` or `toDataURL` (neither exists).
- JPEG at ~1200px lands around 150–200KB and commits instantly;
  a 1600px PNG stalls the write.
- Site cover art goes in the matching `*-assets/` folder as `.jpg`.
