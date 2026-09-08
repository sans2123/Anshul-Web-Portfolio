// Top navigation + Footer
function Nav({ page, setPage }) {
  const pages = [
    { id: 'home', label: 'Home' },
    { id: 'work', label: 'Work' },
    { id: 'about', label: 'About' },
  ];
  return (
    <nav className="nav">
      <a
        className="nav-logo"
        href="#home"
        data-cursor="hover"
        onClick={(e) => { e.preventDefault(); setPage('home'); }}
      >
        <span className="nav-logo-dot"></span>
        <span>ANSHUL/SHUKLA</span>
      </a>
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
        <a className="nav-cta" href="anshul-shukla-resume.pdf" target="_blank" rel="noopener noreferrer" data-cursor="text" data-cursor-label="Open">
          <span>View Resume</span>
          <span className="nav-cta-arrow">↗</span>
        </a>
      </Magnetic>
    </nav>
  );
}

function Footer({ setPage }) {
  const EMAIL = 'Anshulshukla34772@gmail.com';
  const [copied, setCopied] = React.useState(false);
  const copyEmail = () => {
    const done = () => { setCopied(true); setTimeout(() => setCopied(false), 1600); };
    // execCommand path: works inside sandboxed iframes where the async API is blocked
    const legacyCopy = () => {
      const ta = document.createElement('textarea');
      ta.value = EMAIL;
      ta.setAttribute('readonly', '');
      ta.style.cssText = 'position:fixed;top:0;left:0;width:1px;height:1px;opacity:0;';
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      ta.setSelectionRange(0, EMAIL.length);
      let ok = false;
      try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      return ok;
    };
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(EMAIL).then(done, () => { legacyCopy(); done(); });
    } else {
      legacyCopy();
      done();
    }
  };
  return (
    <footer className="footer" data-screen-label="Footer">
      <Reveal>
        <h2 className="footer-headline">
          Let&apos;s start<br />
          a <em>conversation.</em>
        </h2>
      </Reveal>

      <div className="footer-grid">
        <div>
          <div className="footer-col-title">— Get in touch</div>
          <div className="footer-email-row">
            <a className="footer-link" href={`mailto:${EMAIL}`} data-cursor="text" data-cursor-label="Email">
              {EMAIL}
            </a>
            <button
              type="button"
              className="copy-btn"
              onClick={copyEmail}
              data-cursor="hover"
              aria-label={copied ? 'Email copied' : 'Copy email address'}
            >
              {copied ? (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><polyline points="20 6 9 17 4 12"></polyline></svg>
              ) : (
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="9" y="9" width="12" height="12" rx="2"></rect><path d="M5 15V5a2 2 0 0 1 2-2h10"></path></svg>
              )}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <a className="footer-link" href="https://www.linkedin.com/in/anshul-shukla-a7938825b/" target="_blank" rel="noopener noreferrer" data-cursor="text" data-cursor-label="Visit">
            LinkedIn ↗
          </a>
          <a className="footer-link" href="anshul-shukla-resume.pdf" target="_blank" rel="noopener noreferrer" data-cursor="text" data-cursor-label="Open">
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
