// Faded background blob field — drifts and morphs at random across the page.
(function () {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const field = document.createElement('div');
  field.className = 'blob-field';
  field.setAttribute('aria-hidden', 'true');

  const blobs = ['b1', 'b2', 'b3'].map((cls) => {
    const b = document.createElement('div');
    b.className = 'blob ' + cls;
    field.appendChild(b);
    return b;
  });

  // insert as the first child of body so it sits behind #root (z-index 1)
  document.body.insertBefore(field, document.body.firstChild);

  const shapes = [
    '42% 58% 63% 37% / 41% 44% 56% 59%',
    '63% 37% 54% 46% / 49% 60% 40% 51%',
    '38% 62% 47% 53% / 63% 38% 62% 37%',
    '55% 45% 35% 65% / 55% 38% 62% 45%',
    '68% 32% 41% 59% / 46% 67% 33% 54%',
  ];

  const rnd = (a, b) => a + Math.random() * (b - a);
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // each blob roams a loose region so they stay spread out
  const regions = [
    { x: [-25, 25], y: [-15, 35] },
    { x: [35, 80], y: [10, 60] },
    { x: [0, 55], y: [45, 90] },
  ];

  function move(b, i) {
    const r = regions[i % regions.length];
    const x = rnd(r.x[0], r.x[1]);
    const y = rnd(r.y[0], r.y[1]);
    const s = rnd(0.7, 1.35);
    const rot = rnd(-55, 55);
    b.style.transform = `translate(${x}vw, ${y}vh) scale(${s}) rotate(${rot}deg)`;
    b.style.borderRadius = pick(shapes);
  }

  blobs.forEach((b, i) => {
    move(b, i);
    if (!reduce) {
      // stagger the first retarget, then keep wandering on its own clock
      setTimeout(function loop() {
        move(b, i);
        setTimeout(loop, rnd(7000, 11500));
      }, rnd(600, 3000));
    }
  });
})();
