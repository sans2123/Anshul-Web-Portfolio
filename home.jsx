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

  const bentoItems = [
    { id: 'biobrain', title: 'BioBrain', tags: ['MROps', 'AI', 'B2B'], variant: 'cream', col: 'span 7', row: 'span 4', label: 'BioBrain — hero shot' },
    { id: 'maxhealth', title: 'Max MyHealth', tags: ['Healthcare', 'iOS', 'Android'], variant: 'accent', col: 'span 5', row: 'span 4', label: 'Max MyHealth — app' },
    { id: 'brazil', title: 'Brazil Tournament Mgmt', tags: ['Sports', 'B2B'], variant: 'dark', col: 'span 5', row: 'span 3', label: 'Brazil TMS — dashboard' },
    { id: 'more', title: 'More Work', tags: ['Mix'], variant: 'lime', col: 'span 4', row: 'span 3', label: 'WTT, AEW & more' },
    { id: 'wtt', title: 'WTT Federation', tags: ['Design System'], variant: 'cream', col: 'span 3', row: 'span 3', label: 'Components' },
  ];

  const skillTags = [
    'UX Research', 'Wireframes', 'Prototyping', 'Visual Design', 'Design Systems',
    'User Journeys', 'Personas', 'Sitemaps', 'Interaction Design', 'Market Research',
    'Cross-functional', 'Figma', 'Adobe XD', 'Frontend', 'Design × Code',
  ];

  return (
    <div className="page" data-screen-label="01 Home">
      {/* ============ HERO ============ */}
      <section className="hero" ref={heroRef} data-screen-label="01 Home / Hero">
        <div>
          <div className="hero-eyebrow">
            <span className="hero-eyebrow-dot"></span>
            <span>Portfolio · 2026 — Edition One</span>
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
              <span>Currently</span>
              <b>UI/UX Lead, Tooliqa</b>
              <span style={{ marginTop: 8 }}>Previously</span>
              <b>MAX Healthcare · Stupa · AEW</b>
            </div>
          </Reveal>
        </div>

        {/* Stickers */}
        <span className="sticker" data-parallax="-0.25" data-rot="-8" style={{ top: '24%', right: '8%', transform: 'rotate(-8deg)' }}>★ 5+ yrs · B2B + B2C</span>
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
              className={`bento-card ${b.variant === 'accent' ? 'accent' : b.variant === 'dark' ? 'dark' : b.variant === 'lime' ? 'lime' : ''}`}
              style={{ gridColumn: b.col, gridRow: b.row }}
              data-cursor="text"
              data-cursor-label="Open"
              onClick={() => openProject && openProject(b.id)}
            >
              <div className="ph" style={{
                position: 'absolute', inset: 0, zIndex: 0,
                opacity: b.variant === 'accent' || b.variant === 'dark' ? 0.15 : 0.4
              }}>
                <div className={`ph-pattern ${b.variant === 'accent' || b.variant === 'dark' ? 'dark' : ''}`} style={{ position: 'absolute', inset: 0 }}></div>
              </div>
              <span className="pill-cta">View →</span>
              <span style={{
                position: 'absolute', top: 18, left: 22, fontFamily: 'var(--font-mono)',
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
        <Reveal>
          <div className="mono-cap" style={{ color: 'var(--muted)', marginBottom: 24 }}>— A little about me</div>
          <p className="outro-text">
            I&apos;m a Product Designer with <em>5+ years</em> of experience across healthcare, sports tech,
            research platforms, and enterprise. I trained at <em>NIFT</em> in fashion technology — where I learned
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
