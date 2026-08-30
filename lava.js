// LAVA FIELD v2 — dark metaball blobs with lava-lamp motion.
// Blobs wander, stretch, split into droplets and get re-absorbed,
// merging visually through an SVG "goo" filter. Sits behind #root
// so frosted-glass panels above refract them.
(function () {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // ---- goo filter defs ----
  const svgNS = 'http://www.w3.org/2000/svg';
  const svg = document.createElementNS(svgNS, 'svg');
  svg.setAttribute('width', '0');
  svg.setAttribute('height', '0');
  svg.setAttribute('aria-hidden', 'true');
  svg.style.position = 'absolute';
  svg.innerHTML =
    '<defs><filter id="lava-goo">' +
    '<feGaussianBlur in="SourceGraphic" stdDeviation="30" result="b"/>' +
    '<feColorMatrix in="b" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 24 -10"/>' +
    '</filter></defs>';
  document.body.appendChild(svg);

  // ---- layers ----
  const field = document.createElement('div');
  field.className = 'lava-field';
  field.setAttribute('aria-hidden', 'true');
  const goo = document.createElement('div');
  goo.className = 'lava-goo';
  field.appendChild(goo);
  document.body.insertBefore(field, document.body.firstChild);

  const rnd = (a, b) => a + Math.random() * (b - a);
  const TAU = Math.PI * 2;
  let W = innerWidth, H = innerHeight;
  addEventListener('resize', () => { W = innerWidth; H = innerHeight; });
  const vmin = () => Math.min(W, H) / 100;

  function makeEl(shade) {
    const el = document.createElement('div');
    el.className = 'lava-blob g' + shade;
    // uneven, organic silhouette — random asymmetric radii per blob
    const rr = () => Math.round(rnd(28, 72));
    el.style.borderRadius = rr() + '% ' + rr() + '% ' + rr() + '% ' + rr() + '% / ' + rr() + '% ' + rr() + '% ' + rr() + '% ' + rr() + '%';
    goo.appendChild(el);
    return el;
  }

  // ---- primary blobs: lanes biased to the center band, behind content ----
  // Each blob rises/sinks slowly (lava lamp) with asymmetric stretch + wobble.
  const bigs = [];
  const lanes = [0.28, 0.62, 0.86];
  for (let i = 0; i < 3; i++) {
      const r = rnd(13, 22); // vmin
    const el = makeEl((i % 3) + 1);
    el.style.width = el.style.height = (r * 2) + 'vmin';
    bigs.push({
      el, r,
      lane: lanes[i] + rnd(-0.05, 0.05),
      // vertical oscillation (rise & sink) — big, slow, per-blob rhythm;
      // kept below the top band so headings stay readable
      yc: rnd(0.52, 0.72), yAmp: rnd(0.18, 0.3), yW: rnd(0.05, 0.09) / r * 8, yP: rnd(0, TAU),
      // horizontal sway — two incommensurate sines = never-repeating drift
      xA1: rnd(0.04, 0.09), xW1: rnd(0.08, 0.14), xP1: rnd(0, TAU),
      xA2: rnd(0.02, 0.05), xW2: rnd(0.21, 0.34), xP2: rnd(0, TAU),
      // asymmetric stretch & slow rotation
      sW: rnd(0.12, 0.2), sP: rnd(0, TAU), sAmp: rnd(0.22, 0.38),
      rotW: rnd(0.04, 0.09), rotP: rnd(0, TAU),
      breathe: rnd(0.05, 0.1), bW: rnd(0.15, 0.28), bP: rnd(0, TAU),
      x: 0, y: 0,
    });
  }

  // ---- droplets: split off a parent, drift, then home back & get absorbed ----
  const drops = [];
  function spawnSplit() {
    const parent = bigs[Math.floor(Math.random() * bigs.length)];
    const n = 1 + Math.floor(Math.random() * 2); // 1–2 droplets
    for (let k = 0; k < n; k++) {
      const r = rnd(2.6, 6.4);
      const el = makeEl(Math.floor(rnd(1, 3.99)));
      el.style.width = el.style.height = (r * 2) + 'vmin';
      const ang = rnd(0, TAU);
      drops.push({
        el, r,
        x: parent.x, y: parent.y,
        vx: Math.cos(ang) * rnd(0.9, 2.1) * vmin() / 60, // px per frame-ish
        vy: Math.sin(ang) * rnd(0.9, 2.1) * vmin() / 60 - rnd(0.2, 0.9) * vmin() / 60,
        born: now, life: rnd(6000, 11000),
        wob: rnd(0, TAU), wobW: rnd(1.5, 3.2),
      });
    }
  }

  function nearestBig(d) {
    let best = bigs[0], bd = Infinity;
    for (const b of bigs) {
      const dx = b.x - d.x, dy = b.y - d.y, q = dx * dx + dy * dy;
      if (q < bd) { bd = q; best = b; }
    }
    return best;
  }

  // ---- animation loop ----
  let now = 0;
  function frame(ms) {
    now = ms;
    const t = ms / 1000;

    for (const b of bigs) {
      const x = (b.lane + b.xA1 * Math.sin(t * b.xW1 + b.xP1) + b.xA2 * Math.sin(t * b.xW2 + b.xP2)) * W;
      const y = (b.yc + b.yAmp * Math.sin(t * b.yW + b.yP)) * H;
      b.x = x; b.y = y;
      const stretch = b.sAmp * Math.sin(t * b.sW + b.sP);
      const breathe = 1 + b.breathe * Math.sin(t * b.bW + b.bP);
      const rot = 24 * Math.sin(t * b.rotW + b.rotP);
      b.el.style.transform =
        'translate(' + (x - b.r * vmin()) + 'px,' + (y - b.r * vmin()) + 'px) ' +
        'rotate(' + rot + 'deg) ' +
        'scale(' + (breathe * (1 + stretch)) + ',' + (breathe * (1 - stretch)) + ')';
    }

    for (let i = drops.length - 1; i >= 0; i--) {
      const d = drops[i];
      const age = (ms - d.born) / d.life;
      if (age >= 1) { d.el.remove(); drops.splice(i, 1); continue; }
      let scale = 1;
      if (age < 0.75) {
        // free drift with a wobble — unorganized motion
        d.x += d.vx * 16 + Math.sin(t * d.wobW + d.wob) * 0.6;
        d.y += d.vy * 16 + Math.cos(t * d.wobW * 0.8 + d.wob) * 0.5;
        d.vx *= 0.999; d.vy *= 0.999;
        if (age < 0.12) scale = age / 0.12; // grow out of the parent
      } else {
        // homing phase — collect back into the nearest large blob
        const target = nearestBig(d);
        const k = (age - 0.75) / 0.25;
        d.x += (target.x - d.x) * (0.02 + k * 0.09);
        d.y += (target.y - d.y) * (0.02 + k * 0.09);
        scale = Math.max(0.001, 1 - k * k);
      }
      d.el.style.transform =
        'translate(' + (d.x - d.r * vmin()) + 'px,' + (d.y - d.r * vmin()) + 'px) scale(' + scale + ')';
    }

    requestAnimationFrame(frame);
  }

  if (reduce) {
    // static, asymmetric placement — no motion
    bigs.forEach((b, i) => {
      const x = b.lane * W, y = (0.25 + i * 0.18) * H;
      b.el.style.transform = 'translate(' + (x - b.r * vmin()) + 'px,' + (y - b.r * vmin()) + 'px) scale(1.06,0.94)';
    });
  } else {
    requestAnimationFrame(frame);
    setTimeout(function splitLoop() {
      spawnSplit();
      setTimeout(splitLoop, rnd(7000, 13000));
    }, 2500);
  }

  // ---- small frosted lenses, arranged radially around the section center ----
  const orbLayer = document.createElement('div');
  orbLayer.style.cssText = 'position:absolute;inset:0;';
  field.appendChild(orbLayer);
  const orbs = [];
  const ORBN = 3;
  for (let i = 0; i < ORBN; i++) {
    const el = document.createElement('div');
    el.className = 'glass-orb';
    const s = rnd(30, 60);
    el.style.width = el.style.height = s + 'px';
    orbLayer.appendChild(el);
    orbs.push({
      el, s,
      ang: (i / ORBN) * TAU + rnd(-0.2, 0.2),
      rad: rnd(0.46, 0.58),
      spd: rnd(0.02, 0.045) * (Math.random() < 0.5 ? -1 : 1),
      bobW: rnd(0.3, 0.6), bobP: rnd(0, TAU),
    });
  }
  let orbCheck = 0;
  function orbFrame(ms) {
    const t = ms / 1000;
    // hide the lenses on the Work (project listing) page
    if (ms - orbCheck > 300) {
      orbCheck = ms;
      orbLayer.style.display = document.querySelector('[data-screen-label="02 Work"]') ? 'none' : '';
    }
    for (const o of orbs) {
      const a = o.ang + t * o.spd;
      const x = W / 2 + Math.cos(a) * o.rad * W - o.s / 2;
      const y = H / 2 + Math.sin(a) * o.rad * H * 0.86 - o.s / 2 + Math.sin(t * o.bobW + o.bobP) * 14;
      o.el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    }
    requestAnimationFrame(orbFrame);
  }
  if (reduce) {
    orbs.forEach((o) => {
      const x = W / 2 + Math.cos(o.ang) * o.rad * W - o.s / 2;
      const y = H / 2 + Math.sin(o.ang) * o.rad * H * 0.86 - o.s / 2;
      o.el.style.transform = 'translate(' + x + 'px,' + y + 'px)';
    });
  } else {
    requestAnimationFrame(orbFrame);
  }
})();
