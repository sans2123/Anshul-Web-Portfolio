// HOME PAGE

function HomePage({ setPage, openProject }) {
  // Parallax for hero stickers
  const heroRef = React.useRef(null);
  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      const stickers = heroRef.current?.querySelectorAll('[data-parallax]');
      stickers?.forEach((s) => {
        const speed = parseFloat(s.dataset.parallax);
        s.style.transform = `translateY(${y * speed}px) rotate(${s.dataset.rot || 0}deg)`;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 2 × 2 — each tile opens its project detail; cover art is pulled from that
  // project's own gallery. 'more' has no shot of its own, so it keeps the pattern.
  const bentoItems = [
    { id: 'biobrain', title: 'BioBrain', tags: ['MROps', 'B2B', 'Restech', 'Branding', 'Design System'], variant: 'cream', label: 'BioBrain — analytics dashboard', img: 'biobrain-assets/home-cover.jpg', span: '7x5', flag: 'Start here' },
    { id: 'maxhealth', title: 'Max MyHealth', tags: ['Healthcare', 'iOS', 'Android'], variant: 'accent', label: 'Max MyHealth — booking flow', img: 'maxhealth-assets/home-cover.jpg', span: '5x5' },
    { id: 'brazil', title: 'Brazil Tournament Mgmt', tags: ['Sports', 'B2B', 'B2C'], variant: 'dark', label: 'Brazil TMS — tournament system', img: 'brazil-assets/home-cover.jpg', span: '5x4' },
    { id: 'more', title: 'More Work', tags: ['Website', 'Redesign', 'Mix'], variant: 'lime', label: 'AEW, Felizeek & more', img: 'biobrain-assets/more-cover.jpg', span: '7x4' },
  ];

  const skillTags = [
    'UX Research', 'Wireframes', 'Prototyping', 'Visual Design', 'Design Systems',
    'User Journeys', 'Personas', 'Sitemaps', 'Interaction Design', 'Market Research',
    'Cross-functional', 'Figma', 'Adobe XD', 'Frontend', 'Design × Code',
    'Claude Code', 'Claude Design',
  ];

  return (
    <div className="page" data-screen-label="01 Home">
      {/* ============ HERO ============ */}
      <section className="hero" ref={heroRef} data-screen-label="01 Home / Hero">
        {/* Shader stack (Swirl → blobs → ChromaFlow → FlutedGlass → FilmGrain).
            hero-shader.js adopts this pane and renders into it. */}
        <div className="hero-glass" aria-hidden="true"></div>

        <div>
          <div className="hero-eyebrow">
            <span>Portfolio — Edition One</span>
          </div>
          <div className="hero-name">
            <span>I&apos;m</span>
            <strong>Anshul</strong>
            <span>—</span>
            <span>Product Designer.</span>
            <span className="asterisk-spin" style={{ color: 'var(--accent)', fontSize: '1rem' }}>✸</span>
          </div>
        </div>

        <h1 className="hero-statement">
          <MaskReveal>Designing</MaskReveal>{' '}
          <MaskReveal delay={80}><em>systems</em></MaskReveal>{' '}<br />
          <MaskReveal delay={140}>that scale.</MaskReveal>
        </h1>

        <div className="hero-bottom">
          <Reveal delay={300}>
            <p className="hero-blurb">
              Whether it&apos;s redesigning <em style={{ fontFamily: '"Instrument Serif", serif', color: 'var(--accent)' }}>patient journeys</em>,
              building a ResTech product from the ground up, or shaping design systems for global sports federations —
              I design for complexity, clarity, and scale.
            </p>
          </Reveal>
          <Reveal delay={420}>
            <div className="hero-meta">
              <span>Previously</span>
              <b>Tooliqa · MAX Healthcare · Stupa · AEW</b>
            </div>
          </Reveal>
        </div>

        {/* Stickers */}
        <span className="sticker" data-parallax="-0.25" data-rot="-8" style={{ top: '24%', right: '8%', transform: 'rotate(-8deg)' }}>★ 4+ yrs · B2B + B2C</span>
        <span className="sticker dark" data-parallax="-0.4" data-rot="6" style={{ top: '50%', right: '14%', transform: 'rotate(6deg)' }}>Design × Code</span>
        <span className="sticker lime" data-parallax="-0.15" data-rot="-3" style={{ bottom: '38%', left: '6%', transform: 'rotate(-3deg)' }}>NIFT &apos;19</span>
      </section>

      {/* ============ MARQUEE ============ */}
      <Marquee items={['Selected Work', 'BioBrain', 'Max MyHealth', 'WTT Federation', 'AEW', 'Brazil TMS']} />

      {/* ============ PROJECTS BENTO ============ */}
      <section className="bento-section" data-screen-label="01 Home / Projects">
        <div className="section-head">
          <Reveal as="h2">Selected<br />projects.<span style={{ color: 'var(--accent)' }}>*</span></Reveal>
          <Reveal delay={100} as="span" className="meta">(*) 2020 — 2026 / Click to expand</Reveal>
        </div>

        <div className="bento-grid">
          {bentoItems.map((b, i) => (
            <Reveal
              key={b.id}
              delay={i * 80}
              className={`bento-card ${b.img ? 'has-image' : ''} ${b.flag ? 'is-featured' : ''} ${b.variant === 'accent' ? 'accent' : b.variant === 'dark' ? 'dark' : b.variant === 'lime' ? 'lime' : ''}`}
              data-span={b.span}
              data-cursor="text"
              data-cursor-label="Open"
              onClick={() => openProject && openProject(b.id)}
            >
              {b.flag ? <span className="bento-flag">{b.flag}</span> : null}
              {b.img ? (
                <img className="bento-card-img" src={b.img} alt={b.label} loading="lazy" decoding="async" />
              ) : (
                <div className="ph" style={{
                  position: 'absolute', inset: 0, zIndex: 0,
                  opacity: b.variant === 'accent' || b.variant === 'dark' ? 0.15 : 0.4
                }}>
                  <div className={`ph-pattern ${b.variant === 'accent' || b.variant === 'dark' ? 'dark' : ''}`} style={{ position: 'absolute', inset: 0 }}></div>
                </div>
              )}
              <span className="pill-cta">View →</span>
              <span style={{
                position: 'absolute', top: b.flag ? 58 : 18, left: 22, fontFamily: 'var(--font-mono)',
                fontSize: '0.66rem', textTransform: 'uppercase', letterSpacing: '0.12em',
                opacity: 0.65, zIndex: 2,
              }}>
                {b.label}
              </span>
              <div className="bento-card-body">
                <div className="tags">
                  {b.tags.map((t) => <span className="tag" key={t}>{t}</span>)}
                </div>
                <h3>{b.title}</h3>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ OUTRO ============ */}
      <section className="outro" data-screen-label="01 Home / Outro">
        <div className="glass-pane" data-glass-pane data-glass-intensity="0.32" aria-hidden="true"></div>
        <Reveal>
          <div className="mono-cap" style={{ color: 'var(--muted)', marginBottom: 24 }}>— A little about me</div>
          <p className="outro-text">
            I&apos;m a Product Designer with <em>4+ years of experience</em> across healthcare, sports tech,
            research platforms, and enterprise. I trained at <em>NIFT</em> in design and technology — where I learned
            that good design is, above all else, a way of <em>communicating</em>.
          </p>
        </Reveal>
        <Reveal delay={150}>
          <div className="outro-skills">
            <h3>— Things I&apos;m good at</h3>
            <div className="skill-tags">
              {skillTags.map((s, i) => (
                <Magnetic key={s} strength={0.2}>
                  <span className="skill-tag" data-cursor="hover">{s}</span>
                </Magnetic>
              ))}
            </div>
          </div>
        </Reveal>
      </section>
    </div>
  );
}

window.HomePage = HomePage;
