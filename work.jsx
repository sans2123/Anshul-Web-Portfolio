// WORK PAGE — Asymmetric project list + animated detail overlay
function WorkPage({ openProject, activeProject, closeProject }) {
  return (
    <div className="page" data-screen-label="02 Work">
      <section className="work-hero" data-screen-label="02 Work / Hero">
        <h1>
          <MaskReveal>Selected</MaskReveal><br />
          <MaskReveal delay={120}><em>work</em></MaskReveal>{' '}<MaskReveal delay={200}>↗</MaskReveal>
        </h1>
        <Reveal delay={300} className="work-hero-side">
          <span>(*) 04 projects · 2020 — 2026</span>
          <span style={{ marginTop: 12, color: 'var(--ink-2)' }}>Hover. Click. Open.</span>
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
  const [hover, setHover] = React.useState(false);
  const [pos, setPos] = React.useState({ x: 0, y: 0 });
  const cardRef = React.useRef(null);

  const onMove = (e) => {
    if (!cardRef.current) return;
    const r = cardRef.current.getBoundingClientRect();
    setPos({ x: e.clientX - r.left + 30, y: e.clientY - r.top - 100 });
  };

  return (
    <Reveal
      delay={index * 80}
      className="project-card"
      data-cursor="text"
      data-cursor-label="Open"
      onClick={onOpen}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onMouseMove={onMove}
    >
      <span className="project-card-num">{project.num}</span>
      <h2 className="project-card-title" ref={cardRef}>
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

      {/* hover preview */}
      <div className="project-card-preview" style={{
        left: pos.x, top: pos.y,
        opacity: hover ? 1 : 0,
      }}>
        <PH label={`${project.title} — preview`} variant={index % 2 === 0 ? 'accent' : 'lime'} />
      </div>
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
                  <span className="project-hero-meta-label">Year</span>
                  <span className="project-hero-meta-value">{project.year}</span>
                </div>
                <div className="project-hero-meta-item">
                  <span className="project-hero-meta-label">Org</span>
                  <span className="project-hero-meta-value">{project.company}</span>
                </div>
                <div className="project-hero-meta-item">
                  <span className="project-hero-meta-label">Duration</span>
                  <span className="project-hero-meta-value">{project.duration}</span>
                </div>
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
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 24 }}>
              {project.tags.map((t) => (
                <span key={t} style={{
                  fontFamily: 'var(--font-mono)', fontSize: '0.7rem', textTransform: 'uppercase',
                  letterSpacing: '0.1em', padding: '6px 12px', border: '1px solid var(--ink)',
                  borderRadius: 999,
                }}>{t}</span>
              ))}
            </div>
          </Reveal>
        </section>

        <section className="project-gallery">
          {project.galleryItems.map((item, i) => (
            <Reveal
              key={i}
              delay={i * 60}
              className={`gallery-item ${item.src ? 'has-image' : ''} ${item.variant === 'dark' ? 'dark' : item.variant === 'accent' ? 'accent' : item.variant === 'lime' ? 'lime' : ''}`}
              style={{ gridColumn: item.col, gridRow: item.row }}
              data-cursor="text"
              data-cursor-label={item.src ? 'View' : ''}
              onClick={item.src ? () => setLightbox(i) : undefined}
            >
              {item.src ? (
                <img
                  className="gallery-item-img"
                  src={item.src}
                  alt={item.label}
                  loading="lazy"
                  style={{ objectPosition: item.pos === 'center' ? 'center' : 'top center' }}
                />
              ) : (
                <div className="ph-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.6 }}></div>
              )}
              <span className="gallery-item-label">{String(i + 1).padStart(2, '0')} · {item.label}</span>
              {item.src && <span className="gallery-item-zoom" aria-hidden="true">⤢</span>}
            </Reveal>
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
function Lightbox({ items, index, setIndex, onClose }) {
  // navigable subset = items that have a src
  const imgIdx = items.map((it, i) => (it.src ? i : null)).filter((v) => v !== null);
  const pos = imgIdx.indexOf(index);
  const go = React.useCallback((dir) => {
    const n = (pos + dir + imgIdx.length) % imgIdx.length;
    setIndex(imgIdx[n]);
  }, [pos, imgIdx, setIndex]);

  React.useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowRight') go(1);
      else if (e.key === 'ArrowLeft') go(-1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [go, onClose]);

  const item = items[index];

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
        <img className="lightbox-img" src={item.src} alt={item.label} />
        <div className="lightbox-caption">
          <span className="lightbox-caption-index">{String(pos + 1).padStart(2, '0')} / {String(imgIdx.length).padStart(2, '0')}</span>
          <span>{item.label}</span>
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
