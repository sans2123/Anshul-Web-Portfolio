// WORK PAGE — Asymmetric project list + animated detail overlay
function WorkPage({ openProject, activeProject, closeProject }) {
  return (
    <div className="page" data-screen-label="02 Work">
      <section className="work-hero" data-screen-label="02 Work / Hero">
        <div className="glass-pane top" data-glass-pane data-glass-intensity="0.4" aria-hidden="true"></div>
        <h1>
          <MaskReveal>Selected</MaskReveal><br />
          <MaskReveal delay={120}><em>work</em></MaskReveal>{' '}<MaskReveal delay={200}>↗</MaskReveal>
        </h1>
        <Reveal delay={300} className="work-hero-side">
          <span>(*) 04 projects · 2020 — 2026</span>
          <span style={{ marginTop: 12, color: 'var(--ink-2)' }}>Click. Open.</span>
        </Reveal>
      </section>

      <section className="work-list" data-screen-label="02 Work / List">
        {PROJECTS.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} onOpen={() => openProject(p.id)} />
        ))}
      </section>

      {activeProject && (
        <ProjectDetail
          project={PROJECTS.find((p) => p.id === activeProject)}
          onClose={closeProject}
        />
      )}
    </div>
  );
}

function ProjectCard({ project, index, onOpen }) {
  return (
    <Reveal
      delay={index * 80}
      className="project-card"
      data-cursor="text"
      data-cursor-label="Open"
      onClick={onOpen}
    >
      <span className="project-card-num">{project.num}</span>
      <h2 className="project-card-title">
        {project.title} <em style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>{project.title_em}</em>
      </h2>
      <div className="project-card-meta">
        <p className="project-card-tagline">{project.tagline}</p>
        <div className="project-card-tags">
          {project.tags.map((t) => <span className="tag" key={t} style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.66rem', textTransform: 'uppercase',
            letterSpacing: '0.1em', padding: '4px 10px', border: '1px solid var(--ink)',
            borderRadius: 999, background: 'var(--cream)',
          }}>{t}</span>)}
        </div>
      </div>
      <span className="project-card-arrow">↗</span>
    </Reveal>
  );
}

// One gallery tile. An image tile is sized by the image itself rather than by a
// fixed row track, so the full shot is visible in the grid. Only images longer
// than ~2.0:1 (full webpage scrolls) stay cropped, with a "full view" hint.
const LONG_RATIO = 2.0;

// Below this width the authored 12-column spans don't fit, so tiles stack one
// per row. This has to be decided here rather than in CSS: the span is written
// as an inline style, which no stylesheet rule can override.
const STACK_QUERY = '(max-width: 980px)';

function useStacked() {
  const [stacked, setStacked] = React.useState(
    () => typeof window !== 'undefined' && window.matchMedia(STACK_QUERY).matches
  );
  React.useEffect(() => {
    const mq = window.matchMedia(STACK_QUERY);
    const onChange = (e) => setStacked(e.matches);
    setStacked(mq.matches);
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);
  return stacked;
}

function GalleryTile({ item, index, onOpen }) {
  const [ratio, setRatio] = React.useState(null);   // height / width
  const stacked = useStacked();

  const measure = (e) => {
    const img = e.currentTarget;
    if (img.naturalWidth) setRatio(img.naturalHeight / img.naturalWidth);
  };
  const ref = React.useCallback((img) => {
    if (img && img.complete && img.naturalWidth) setRatio(img.naturalHeight / img.naturalWidth);
  }, []);

  // A tap opens the tile the pointer went DOWN on, not whatever sits under the
  // pointer when the click resolves. Lazy gallery images finish decoding as you
  // scroll and each one sets its own aspect-ratio on load, so the grid can
  // reflow between press and release — which is how a tap on tile 5 could open
  // tile 6. Capturing the pointer pins the gesture to this tile.
  const press = React.useRef(null);
  const onPointerDown = (e) => {
    if (!item.src || e.button > 0) return;
    press.current = { id: e.pointerId, x: e.clientX, y: e.clientY };
    try { e.currentTarget.setPointerCapture(e.pointerId); } catch (err) { /* no capture: fall back to plain click */ }
  };
  const onPointerUp = (e) => {
    const p = press.current;
    press.current = null;
    if (!p || p.id !== e.pointerId) return;
    // a scroll or drag is not a tap
    if (Math.abs(e.clientX - p.x) > 10 || Math.abs(e.clientY - p.y) > 10) return;
    onOpen();
  };
  const cancelPress = () => { press.current = null; };

  const isLong = ratio !== null && ratio > LONG_RATIO;
  const variant = item.variant === 'dark' ? 'dark'
    : item.variant === 'accent' ? 'accent'
    : item.variant === 'lime' ? 'lime' : '';

  // placeholders keep their authored row span (the old 140px row track);
  // image tiles are content-height, so they take no row span at all
  const spanRows = !item.src && item.row ? parseInt(String(item.row).replace(/\D/g, ''), 10) || 1 : 0;

  return (
    <Reveal
      delay={index * 60}
      className={`gallery-item ${item.src ? 'has-image' : ''} ${isLong ? 'is-long' : ''} ${variant}`}
      style={{
        gridColumn: stacked ? '1 / -1' : item.col,
        ...(spanRows ? { minHeight: spanRows * 140 } : null),
      }}
      data-cursor="text"
      data-cursor-label={item.src ? (isLong ? 'Full view' : 'Zoom') : ''}
      onPointerDown={item.src ? onPointerDown : undefined}
      onPointerUp={item.src ? onPointerUp : undefined}
      onPointerCancel={item.src ? cancelPress : undefined}
    >
      {item.src ? (
        <img
          className="gallery-item-img"
          src={item.src}
          alt={item.label}
          ref={ref}
          onLoad={measure}
          loading="lazy"
          decoding="async"
          style={ratio ? { aspectRatio: `1 / ${ratio}` } : undefined}
        />
      ) : (
        <div className="ph-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.6 }}></div>
      )}
      <span className="gallery-item-label">{String(index + 1).padStart(2, '0')} · {item.label}</span>
      {isLong && <span className="gallery-item-more">Full view ↗</span>}
      {item.src && !isLong && <span className="gallery-item-zoom" aria-hidden="true">⤢</span>}
    </Reveal>
  );
}

function ProjectDetail({ project, onClose }) {
  const [lightbox, setLightbox] = React.useState(null);
  React.useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = ''; };
  }, []);

  return (
    <>
      <div className="project-detail-curtain"></div>
      <div className="project-detail" data-screen-label={`02 Work / ${project.title}`}>
        <button className="project-back" onClick={onClose} data-cursor="hover">
          <span className="back-arrow">←</span>
          <span>Back to work</span>
        </button>

        <section className="project-hero" style={{ animation: 'fadeUp 800ms 600ms backwards var(--ease-out)' }}>
          <div className="glass-pane top" data-glass-pane data-glass-intensity="0.28" aria-hidden="true"></div>
          <h1>
            <MaskReveal delay={650}>{project.title}</MaskReveal>{' '}
            <MaskReveal delay={750}><em>{project.title_em}</em></MaskReveal>
          </h1>
          <div className="project-hero-side">
            <Reveal delay={700}>
              <p className="project-hero-tagline">{project.tagline}</p>
            </Reveal>
            <Reveal delay={800}>
              <div className="project-hero-meta">
                <div className="project-hero-meta-item">
                  <span className="project-hero-meta-label">Role</span>
                  <span className="project-hero-meta-value">{project.role}</span>
                </div>
                <div className="project-hero-meta-item">
                  <span className="project-hero-meta-label">Org</span>
                  <span className="project-hero-meta-value">{project.company}</span>
                </div>
                {project.link ? (
                  <div className="project-hero-meta-item">
                    <span className="project-hero-meta-label">Live</span>
                    <a className="project-hero-meta-value project-hero-meta-link"
                      href={project.link.href} target="_blank" rel="noopener noreferrer"
                      data-cursor="hover" onClick={(e) => e.stopPropagation()}>
                      {project.link.label} <span aria-hidden="true">↗</span>
                    </a>
                  </div>
                ) : null}
              </div>
            </Reveal>
          </div>
        </section>

        <section className="project-body">
          <Reveal>
            <span className="project-body-label">— About the project</span>
          </Reveal>
          <Reveal delay={120}>
            <p className="project-body-text">{project.body}</p>
            <div className="skill-tags project-body-tags">
              {project.tags.map((t) => (
                <Magnetic key={t} strength={0.2}>
                  <span className="skill-tag" data-cursor="hover">{t}</span>
                </Magnetic>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="project-gallery">
          {project.galleryItems.map((item, i) => (
            <GalleryTile key={i} item={item} index={i} onOpen={() => setLightbox(i)} />
          ))}
        </section>

        {lightbox !== null && (
          <Lightbox
            items={project.galleryItems}
            index={lightbox}
            setIndex={setLightbox}
            onClose={() => setLightbox(null)}
          />
        )}

        <section className="project-foot">
          <Reveal>
            <h3>Next up<br />— another story.</h3>
          </Reveal>
          <Magnetic>
            <a
              href="#next"
              data-cursor="text"
              data-cursor-label="Open"
              onClick={(e) => {
                e.preventDefault();
                const idx = PROJECTS.findIndex((p) => p.id === project.id);
                const next = PROJECTS[(idx + 1) % PROJECTS.length];
                onClose();
                setTimeout(() => {
                  document.dispatchEvent(new CustomEvent('open-project', { detail: next.id }));
                }, 200);
              }}
            >
              <span>{PROJECTS[(PROJECTS.findIndex((p) => p.id === project.id) + 1) % PROJECTS.length].title}</span>
              <span>↗</span>
            </a>
          </Magnetic>
        </section>
      </div>
    </>
  );
}

window.WorkPage = WorkPage;

// Fullscreen image preview / lightbox
const ZOOM_MIN = 1, ZOOM_MAX = 6, ZOOM_STEP = 2.4;

function Lightbox({ items, index, setIndex, onClose }) {
  // navigable subset = items that have a src
  const imgIdx = items.map((it, i) => (it.src ? i : null)).filter((v) => v !== null);
  const pos = imgIdx.indexOf(index);
  const go = React.useCallback((dir) => {
    const n = (pos + dir + imgIdx.length) % imgIdx.length;
    setIndex(imgIdx[n]);
  }, [pos, imgIdx, setIndex]);

  // ---- zoom / pan ----
  const [view, setView] = React.useState({ scale: 1, x: 0, y: 0 });
  const [dragging, setDragging] = React.useState(false);
  const viewportRef = React.useRef(null);
  const drag = React.useRef(null);

  const clamp = (s) => Math.min(ZOOM_MAX, Math.max(ZOOM_MIN, s));
  const imgRef = React.useRef(null);

  // How far the image may travel before its own edge enters the frame: half the
  // overscan on each axis. Once zoomed the frame is the whole screen (the image
  // is no longer clipped to its tile), so panning gets the full real estate.
  const clampPan = (x, y, scale) => {
    const vp = viewportRef.current, img = imgRef.current;
    if (!vp || !img) return { x, y };
    const vr = vp.getBoundingClientRect();
    const free = scale > 1.01;
    const fw = free ? window.innerWidth : vr.width;
    const fh = free ? window.innerHeight : vr.height;
    // layout size at scale 1 — offsetWidth is unaffected by the transform
    const maxX = Math.max(0, (img.offsetWidth * scale - fw) / 2);
    const maxY = Math.max(0, (img.offsetHeight * scale - fh) / 2);
    return {
      x: Math.min(maxX, Math.max(-maxX, x)),
      y: Math.min(maxY, Math.max(-maxY, y)),
    };
  };

  // zoom around a point (client coords) so whatever is under the cursor stays put
  const zoomTo = React.useCallback((nextScale, clientX, clientY) => {
    setView((v) => {
      const s = clamp(nextScale);
      const el = viewportRef.current;
      if (!el) return { scale: s, x: 0, y: 0 };
      const r = el.getBoundingClientRect();
      const px = (clientX ?? r.left + r.width / 2) - (r.left + r.width / 2);
      const py = (clientY ?? r.top + r.height / 2) - (r.top + r.height / 2);
      const k = s / v.scale;
      if (s === ZOOM_MIN) return { scale: 1, x: 0, y: 0 };
      return { scale: s, ...clampPan(px - (px - v.x) * k, py - (py - v.y) * k, s) };
    });
  }, []);

  const reset = () => setView({ scale: 1, x: 0, y: 0 });
  React.useEffect(reset, [index]);

  // non-passive wheel listener — React's onWheel can't preventDefault
  React.useEffect(() => {
    const el = viewportRef.current;
    if (!el) return;
    const onWheel = (e) => {
      e.preventDefault();
      setView((v) => {
        const s = clamp(v.scale * Math.exp(-e.deltaY * 0.0022));
        const r = el.getBoundingClientRect();
        const px = e.clientX - (r.left + r.width / 2);
        const py = e.clientY - (r.top + r.height / 2);
        const k = s / v.scale;
        if (s === ZOOM_MIN) return { scale: 1, x: 0, y: 0 };
        return { scale: s, ...clampPan(px - (px - v.x) * k, py - (py - v.y) * k, s) };
      });
    };
    el.addEventListener('wheel', onWheel, { passive: false });
    return () => el.removeEventListener('wheel', onWheel);
  }, []);

  const onPointerDown = (e) => {
    e.preventDefault();
    // recorded at every scale so a still pointer can toggle zoom either way;
    // pannable only once zoomed
    drag.current = {
      id: e.pointerId, sx: e.clientX, sy: e.clientY,
      ox: view.x, oy: view.y, moved: false, pannable: view.scale > 1.01,
    };
    if (drag.current.pannable) setDragging(true);
    e.currentTarget.setPointerCapture(e.pointerId);
  };
  const onPointerMove = (e) => {
    const d = drag.current;
    if (!d || d.id !== e.pointerId) return;
    const dx = e.clientX - d.sx, dy = e.clientY - d.sy;
    if (Math.abs(dx) > 3 || Math.abs(dy) > 3) d.moved = true;
    if (!d.pannable) return;
    setView((v) => ({ ...v, ...clampPan(d.ox + dx, d.oy + dy, v.scale) }));
  };
  const onPointerUp = (e) => {
    const d = drag.current;
    drag.current = null;
    setDragging(false);
    // a drag is not a click — only a still pointer toggles zoom
    if (d && !d.moved) toggleZoom(e.clientX, e.clientY);
  };

  const toggleZoom = (cx, cy) => {
    if (view.scale > 1.01) reset();
    else zoomTo(ZOOM_STEP, cx, cy);
  };

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') { if (view.scale > 1) reset(); else onClose(); }
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
      else if (e.key === '+' || e.key === '=') zoomTo(view.scale * 1.5);
      else if (e.key === '-' || e.key === '_') zoomTo(view.scale / 1.5);
      else if (e.key === '0') reset();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose, view.scale, zoomTo]);

  const item = items[index];
  const zoomed = view.scale > 1.01;

  return (
    <div className="lightbox" onClick={onClose} data-cursor="hover">
      <button className="lightbox-close" onClick={onClose} aria-label="Close" data-cursor="hover">✕</button>
      <button
        className="lightbox-nav prev"
        onClick={(e) => { e.stopPropagation(); go(-1); }}
        aria-label="Previous"
        data-cursor="hover"
      >←</button>
      <div className="lightbox-stage" onClick={(e) => e.stopPropagation()}>
        <div
          className={`lightbox-viewport ${zoomed ? 'zoomed' : ''} ${dragging ? 'dragging' : ''}`}
          ref={viewportRef}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          data-cursor="text"
          data-cursor-label={zoomed ? (dragging ? 'Panning' : 'Drag to pan') : 'Zoom in'}
        >
          <img
            /* keyed by index: without it React reuses this DOM node across
               navigation and the browser keeps painting the previous image
               until the new src decodes */
            key={index}
            className="lightbox-img"
            src={item.src}
            alt={item.label}
            ref={imgRef}
            draggable={false}
            style={{
              transform: `translate(${view.x}px, ${view.y}px) scale(${view.scale})`,
              transition: dragging ? 'none' : 'transform 0.28s var(--ease-out)',
            }}
          />
        </div>
        <div className="lightbox-caption">
          <span className="lightbox-caption-index">{String(pos + 1).padStart(2, '0')} / {String(imgIdx.length).padStart(2, '0')}</span>
          <span>{item.label}</span>
          <span className="lightbox-zoom-ctrl">
            <button onClick={(e) => { e.stopPropagation(); zoomTo(view.scale / 1.5); }} aria-label="Zoom out" data-cursor="hover">−</button>
            <b>{Math.round(view.scale * 100)}%</b>
            <button onClick={(e) => { e.stopPropagation(); zoomTo(view.scale * 1.5); }} aria-label="Zoom in" data-cursor="hover">+</button>
          </span>
          <span className="lightbox-hint">{zoomed ? 'Drag to pan · click to reset' : 'Scroll or click to zoom'}</span>
        </div>
      </div>
      <button
        className="lightbox-nav next"
        onClick={(e) => { e.stopPropagation(); go(1); }}
        aria-label="Next"
        data-cursor="hover"
      >→</button>
    </div>
  );
}
window.Lightbox = Lightbox;
