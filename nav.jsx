// Top navigation + Footer
function Nav({ page, setPage }) {
  const pages = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
  ];
  return (
    <nav className="nav">
      <div className="nav-logo" data-cursor="hover">
        <span className="nav-logo-dot"></span>
        <span>ANSHUL/SHUKLA</span>
      </div>
      <div className="nav-links">
        {pages.map((p) => (
          <a
            key={p.id}
            href={`#${p.id}`}
            className={`nav-link ${page === p.id ? 'active' : ''}`}
            data-cursor="hover"
            onClick={(e) => {
              e.preventDefault();
              setPage(p.id);
            }}
          >
            {p.label}
          </a>
        ))}
      </div>
      <Magnetic>
        <a className="nav-cta" href="#resume" data-cursor="text" data-cursor-label="Open" onClick={(e) => e.preventDefault()}>
          <span>View Resume</span>
          <span className="nav-cta-arrow">↗</span>
        </a>
      </Magnetic>
    </nav>
  );
}

function Footer({ setPage }) {
  return (
    <footer className="footer" data-screen-label="Footer">
      <Reveal>
        <h2 className="footer-headline">
          Good design starts with a <em>conversation.</em><br />
          Thanks for being here — let&apos;s start one.
        </h2>
      </Reveal>

      <div className="footer-grid">
        <div>
          <div className="footer-col-title">— Get in touch</div>
          <a className="footer-link" href="mailto:Anshulshukla34772@gmail.com" data-cursor="text" data-cursor-label="Email">
            Anshulshukla34772@gmail.com
          </a>
          <a className="footer-link" href="#linkedin" data-cursor="text" data-cursor-label="Visit" onClick={(e) => e.preventDefault()}>
            LinkedIn ↗
          </a>
          <a className="footer-link" href="#resume" data-cursor="text" data-cursor-label="Open" onClick={(e) => e.preventDefault()}>
            View Resume ↗
          </a>
        </div>

        <div>
          <div className="footer-col-title">— Sitemap</div>
          <a className="footer-link" href="#home" data-cursor="hover" onClick={(e) => { e.preventDefault(); setPage('home'); }}>Home</a>
          <a className="footer-link" href="#work" data-cursor="hover" onClick={(e) => { e.preventDefault(); setPage('work'); }}>Work</a>
          <a className="footer-link" href="#about" data-cursor="hover" onClick={(e) => { e.preventDefault(); setPage('about'); }}>About</a>
        </div>

        <div>
          <div className="footer-col-title">— Currently</div>
          <p style={{ fontFamily: 'var(--font-display)', fontWeight: 500, fontSize: '1.4rem', lineHeight: 1.3, marginTop: 6 }}>
            Open to <span style={{ color: 'var(--accent)' }}>UI/UX Lead</span> and<br />
            Senior Product Design roles.
          </p>
          <p style={{ fontFamily: 'var(--font-mono)', fontSize: '0.74rem', textTransform: 'uppercase', letterSpacing: '0.12em', marginTop: 16, color: 'rgba(255,255,255,0.55)' }}>
            ● Based in India · Available worldwide
          </p>
        </div>
      </div>

      <div className="footer-giant" aria-hidden="true">Anshul.</div>

      <div className="footer-bottom">
        <span>© 2026 · Designed &amp; built by Anshul Shukla</span>
        <span>v2.0 · Last updated May 2026</span>
      </div>
    </footer>
  );
}

Object.assign(window, { Nav, Footer });
