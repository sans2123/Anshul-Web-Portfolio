// Custom cursor — dot + ring follower, with hover/text reveal modes
const { useEffect, useRef, useState } = React;

function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const [mode, setMode] = useState('default');
  const [label, setLabel] = useState('');
  const target = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e) => {
      target.current.x = e.clientX;
      target.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const tick = () => {
      ring.current.x += (target.current.x - ring.current.x) * 0.18;
      ring.current.y += (target.current.y - ring.current.y) * 0.18;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      requestAnimationFrame(tick);
    };
    const id = requestAnimationFrame(tick);

    const onOver = (e) => {
      const el = e.target;
      if (!(el instanceof Element)) return;
      const interactive = el.closest('[data-cursor]');
      if (interactive) {
        const m = interactive.getAttribute('data-cursor');
        const l = interactive.getAttribute('data-cursor-label') || '';
        setMode(m);
        setLabel(l);
      } else {
        setMode('default');
        setLabel('');
      }
    };

    window.addEventListener('mousemove', onMove);
    document.addEventListener('mouseover', onOver);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      cancelAnimationFrame(id);
    };
  }, []);

  const ringClass = `cursor-ring ${mode === 'hover' ? 'hover' : ''} ${mode === 'text' ? 'text' : ''}`.trim();
  const dotClass = `cursor-dot ${mode === 'text' ? 'text' : ''} ${mode === 'drag' ? 'drag' : ''}`.trim();

  return (
    <>
      <div ref={dotRef} className={dotClass} />
      <div ref={ringRef} className={ringClass}>
        {mode === 'text' && label && <span className="cursor-label">{label}</span>}
      </div>
    </>
  );
}

window.CustomCursor = CustomCursor;
