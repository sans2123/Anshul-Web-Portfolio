// TILT FX — vanilla JS 3D tilt + specular glare on glass cards.
// Delegated at document level so React-rendered cards are covered
// without observers. Skipped on touch devices.
(function () {
  if (window.matchMedia && window.matchMedia('(hover: none)').matches) return;
  if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const SEL = '.bento-card, .gallery-item';
  const MAX = 6.5; // deg
  let current = null;
  let leaveTimer = null;

  function glareFor(el) {
    let g = el.querySelector(':scope > .tilt-glare');
    if (!g) {
      g = document.createElement('div');
      g.className = 'tilt-glare';
      g.setAttribute('aria-hidden', 'true');
      el.appendChild(g);
    }
    return g;
  }

  function reset(el) {
    el.style.transform = '';
    clearTimeout(leaveTimer);
    leaveTimer = setTimeout(() => el.classList.remove('tilt-active'), 260);
  }

  document.addEventListener('pointermove', (e) => {
    const card = e.target && e.target.closest ? e.target.closest(SEL) : null;

    if (card !== current) {
      if (current) reset(current);
      current = card;
      if (card) {
        clearTimeout(leaveTimer);
        card.classList.add('tilt-active');
        glareFor(card);
      }
    }
    if (!card) return;

    const r = card.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (0.5 - py) * MAX;
    const ry = (px - 0.5) * MAX;
    card.style.transform =
      'perspective(950px) rotateX(' + rx.toFixed(2) + 'deg) rotateY(' + ry.toFixed(2) + 'deg) translateY(-2px)';
    card.style.setProperty('--gx', (px * 100).toFixed(1) + '%');
    card.style.setProperty('--gy', (py * 100).toFixed(1) + '%');
  }, { passive: true });

  document.addEventListener('pointerleave', () => {
    if (current) { reset(current); current = null; }
  });
})();
