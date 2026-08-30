// Shared utilities: Reveal-on-scroll, MaskReveal, Placeholder, Sticker
const { useEffect, useRef: useRefShared, useState: useStateShared } = React;

function useInView(options = {}) {
  const ref = useRefShared(null);
  const [inView, setInView] = useStateShared(false);
  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            setInView(true);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.18, rootMargin: '0px 0px -80px 0px', ...options }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return [ref, inView];
}

function Reveal({ children, delay = 0, as: As = 'div', className = '', ...rest }) {
  const [ref, inView] = useInView();
  return (
    <As
      ref={ref}
      className={`reveal ${inView ? 'in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
      {...rest}
    >
      {children}
    </As>
  );
}

function MaskReveal({ children, delay = 0, as: As = 'span', className = '', style = {} }) {
  const [ref, inView] = useInView();
  return (
    <As ref={ref} className={`reveal-mask ${inView ? 'in' : ''} ${className}`} style={style}>
      <span className="reveal-mask-inner" style={{ transitionDelay: `${delay}ms` }}>
        {children}
      </span>
    </As>
  );
}

// Placeholder — striped block with monospace label
function PH({ label = 'IMAGE', variant = 'cream', className = '', style = {} }) {
  // variants: cream, dark, accent, lime
  const variantClass = variant === 'dark' ? 'dark' : variant === 'accent' ? 'accent' : variant === 'lime' ? 'lime' : '';
  return (
    <div className={`ph ph-${variant} ${className}`} style={{
      position: 'absolute', inset: 0,
      background: variant === 'dark' ? 'var(--ink)' : variant === 'accent' ? 'var(--accent)' : variant === 'lime' ? 'var(--lime)' : 'var(--cream-2)',
      color: variant === 'dark' || variant === 'accent' ? 'var(--paper)' : 'var(--ink)',
      ...style
    }}>
      <div className={`ph-pattern ${variant === 'dark' || variant === 'accent' ? 'dark' : ''}`} style={{ position: 'absolute', inset: 0 }}></div>
      <span style={{
        position: 'absolute', top: 14, left: 16,
        fontFamily: 'var(--font-mono)',
        fontSize: '0.66rem',
        textTransform: 'uppercase',
        letterSpacing: '0.12em',
        opacity: 0.75,
        zIndex: 2
      }}>{label}</span>
    </div>
  );
}

// Magnetic button wrapper
function Magnetic({ children, strength = 0.25, className = '', ...rest }) {
  const ref = useRefShared(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e) => {
      const r = el.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      el.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
    };
    const onLeave = () => { el.style.transform = ''; };
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
    };
  }, [strength]);
  return (
    <div ref={ref} className={className} style={{ display: 'inline-block', transition: 'transform 0.4s var(--ease-out)' }} {...rest}>
      {children}
    </div>
  );
}

// Animated marquee
function Marquee({ items }) {
  return (
    <div className="marquee" data-cursor="hover">
      <div className="marquee-track">
        <span>
          {items.map((t, i) => (
            <React.Fragment key={`a${i}`}>
              <span>{t}</span>
              <span className="asterisk-spin">✸</span>
            </React.Fragment>
          ))}
        </span>
        <span aria-hidden="true">
          {items.map((t, i) => (
            <React.Fragment key={`b${i}`}>
              <span>{t}</span>
              <span className="asterisk-spin">✸</span>
            </React.Fragment>
          ))}
        </span>
      </div>
    </div>
  );
}

Object.assign(window, { useInView, Reveal, MaskReveal, PH, Magnetic, Marquee });
