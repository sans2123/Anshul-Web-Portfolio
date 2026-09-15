// ABOUT PAGE
const SKILLS = [
  { num: '01', title: 'Wireframes, prototypes & detailed visual design', tag: 'Craft' },
  { num: '02', title: 'Market research & competitive analysis', tag: 'Research' },
  { num: '03', title: 'Personas, journeys, user flows & sitemaps', tag: 'UX' },
  { num: '04', title: 'Consistent, flexible, scalable product design', tag: 'Systems' },
  { num: '05', title: 'Working effectively across cross-functional teams', tag: 'Collab' },
  { num: '06', title: 'Simple, elegant flows, interactions & experiences', tag: 'Interaction' },
  { num: '07', title: 'Adapting to current trends in UX/UI', tag: 'Trends' },
  { num: '08', title: 'Industry-standard tooling — Figma & Adobe XD', tag: 'Tools' },
  { num: '09', title: 'Frontend & design through integrated tools like Claude', tag: 'Design × Code' },
];

const EXPERIENCE = [
  {
    role: 'UI/UX Lead',
    company: 'Allied Engineering Works',
    note: 'Last worked at',
    bullets: [
      'Led UX and UI design for large-scale water and electrical distribution system projects.',
      'Partially built frontend components alongside design — bridging the design-to-development workflow.',
    ],
  },
  {
    role: 'UI/UX Lead',
    company: 'Tooliqa Innovations',
    bullets: [
      'Reworked and revamped a ResTech product (BioBrain) from the ground up — targeted for Q4 2024 launch.',
      'Established brand guidelines and a comprehensive design system.',
      'Redesigned logo, branding, website architecture, product navigation, process flows, and user journeys.',
    ],
  },
  {
    role: 'UI/UX Designer',
    company: 'MAX Healthcare · Noida',
    bullets: [
      'Worked across Product and Marketing, collaborating with cross-functional teams end-to-end.',
      'Created new feature modules and revamped existing user journeys for the main website and mobile app.',
    ],
  },
  {
    role: 'UI/UX Designer',
    company: 'Work Companion, Impulse · Gurgaon',
    bullets: [
      'Contributed to early-stage product design and UX across multiple internal and client-facing projects.',
    ],
  },
  {
    role: 'UI/UX Designer',
    company: 'Stupa Analytics · Remote Freelance',
    bullets: [
      'Designed complete design systems for the Brazil Sports Federation and World Table Tennis Federation (WTT).',
      'Delivered B2B and B2C solutions for event creation, management, analysis, and broadcasting.',
    ],
  },
];

function AboutPage() {
  return (
    <div className="page" data-screen-label="03 About">
      {/* ============ HERO ============ */}
      <section className="about-hero" data-screen-label="03 About / Hero">
        <div className="glass-pane top" data-glass-pane data-glass-intensity="0.4" aria-hidden="true"></div>
        <div className="about-hero-eyebrow">
          <span className="hero-eyebrow-dot"></span>
          <span>About — the human behind the pixels</span>
        </div>
        <h1>
          <MaskReveal>Designer.</MaskReveal>{' '}
          <MaskReveal delay={80}><em>Systems</em></MaskReveal>{' '}
          <MaskReveal delay={140}>thinker.</MaskReveal>{' '}<br />
          <MaskReveal delay={220}>Occasional</MaskReveal>{' '}
          <MaskReveal delay={300}><em>front-end</em></MaskReveal>{' '}
          <MaskReveal delay={360}>tinkerer.</MaskReveal>
        </h1>

        {/* floating stickers */}
        <span className="sticker" style={{ top: '70%', right: '8%', transform: 'rotate(-6deg)' }}>★ Based in India</span>
        <span className="sticker dark" style={{ top: '82%', right: '22%', transform: 'rotate(4deg)' }}>4+ yrs</span>
        <span className="sticker lime" style={{ top: '74%', right: '38%', transform: 'rotate(-2deg)' }}>NIFT &apos;19</span>
      </section>

      {/* ============ BIO ============ */}
      <section className="about-bio" data-screen-label="03 About / Bio">
        <Reveal>
          <span className="about-bio-label">— Hello there</span>
        </Reveal>
        <Reveal delay={120}>
          <div className="about-bio-text">
            <p>
              I earned my bachelor&apos;s in <em>Design and Technology</em> from <strong>NIFT</strong>.
            </p>
            <p>
              Since then, I&apos;ve spent <em>5+ years</em> shipping design across B2B and B2C — in product, distribution,
              services, healthcare, and research orgs like <strong>BioBrain</strong>, <strong>AEW</strong>, and
              <strong> Max Healthcare</strong>. Most recently as a Sr. UI/UX Lead, where I&apos;ve been responsible
              for cross-functional collaboration from concept all the way through launch.
            </p>
          </div>
        </Reveal>
      </section>

      {/* ============ SKILLS ============ */}
      <section className="skills-section" data-screen-label="03 About / Skills">
        <div className="section-head">
          <Reveal as="h2">What I&apos;m<br />good at.<span style={{ color: 'var(--accent)' }}>*</span></Reveal>
          <Reveal delay={120} as="span" className="meta">(*) 09 disciplines · Built over 4+ yrs</Reveal>
        </div>

        <div className="skills-grid">
          {SKILLS.map((s, i) => (
            <Reveal key={s.num} delay={i * 50} className="skill-card" data-cursor="hover" tabIndex={0}>
              <span className="skill-card-num">{s.num}/09</span>
              <h3>{s.title}</h3>
              <p>— {s.tag}</p>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ============ EXPERIENCE ============ */}
      <section className="exp-section" data-screen-label="03 About / Experience">
        <div className="section-head">
          <Reveal as="h2">Experience<br /><em style={{ fontFamily: '"Instrument Serif", serif', fontStyle: 'italic', fontWeight: 400, color: 'var(--accent)' }}>so far.</em></Reveal>
          <Reveal delay={120} as="span" className="meta">(*) 2019 — 2026</Reveal>
        </div>

        <div className="exp-list">
          {EXPERIENCE.map((e, i) => (
            <Reveal key={i} delay={i * 80} className="exp-row" data-cursor="hover">
              <div className="exp-row-co">
                <h3 className="exp-role">{e.role}</h3>
                <span className="exp-company">{e.company}</span>
                {e.note && <span className="exp-note">{e.note}</span>}
              </div>
              <ul className="exp-bullets">
                {e.bullets.map((b, j) => <li key={j}>{b}</li>)}
              </ul>
              <span className="exp-row-mark"></span>
            </Reveal>
          ))}
        </div>
      </section>
    </div>
  );
}

window.AboutPage = AboutPage;
