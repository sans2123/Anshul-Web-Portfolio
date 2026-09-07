// GLASS SHADER ENGINE — WebGL reimplementation of the spec's `shaders/react` pipeline:
//   Swirl (colorA #ffffff, colorB #f0f0f0, detail 1.7)
//   → lava metaballs (theme --glow-1/2/3 at --blob-opacity)
//   → ChromaFlow (baseColor #ffffff, dir colors #ff5f03, momentum 13, radius 3.5)
//   → FlutedGlass (angle 31, frequency 8, refraction 4, aberration 0.61,
//                  highlight 0.12, highlightSoftness 0, lightAngle -90,
//                  shape rounded, softness 1, speed 0.15)
//   → FilmGrain (strength 0.05)
// Everything below the glass is evaluated as a function, so the flutes refract it
// for real (three samples per pixel = genuine chromatic aberration).
//
// One engine, many panes. Any element with [data-glass-pane] gets its own canvas +
// context; `data-glass-intensity` (0–1) dials the stack down for secondary sections
// while keeping the flutes legible. The home hero (.hero-glass) runs at 1.0 and is
// rendered exactly as before — full DPR, full framerate, unchanged math.
(function () {
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const VERT = `
    attribute vec2 aPos;
    void main(){ gl_Position = vec4(aPos, 0.0, 1.0); }
  `;

  const FRAG = `
    precision highp float;
    uniform vec2  uRes;
    uniform float uTime;
    uniform vec2  uMouse;
    uniform float uMomentum;
    uniform float uPointerActive;
    uniform float uBlobOpacity;
    uniform vec3  uGlow1, uGlow2, uGlow3;
    uniform float uIntensity;   // 1.0 = the hero stack, verbatim

    const float SWIRL_DETAIL   = 1.7;
    const float CF_MOMENTUM    = 13.0;
    const float CF_RADIUS      = 3.5;
    const float FG_ANGLE       = 31.0;
    const float FG_FREQUENCY   = 8.0;
    const float FG_REFRACTION  = 4.0;
    const float FG_ABERRATION   = 0.61;
    const float FG_HIGHLIGHT   = 0.12;
    const float FG_LIGHTANGLE  = -90.0;
    const float FG_SOFTNESS    = 1.0;
    const float FG_SPEED       = 0.15;
    const float GRAIN_STRENGTH = 0.05;

    float hash(vec2 p){ return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

    float vnoise(vec2 p){
      vec2 i = floor(p), f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
                 mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
    }

    float fbm(vec2 p){
      float v = 0.0, a = 0.5;
      for (int i = 0; i < 4; i++) { v += a * vnoise(p); p *= 2.02; a *= 0.5; }
      return v;
    }

    // ---- Swirl -------------------------------------------------------------
    vec3 swirl(vec2 uv){
      vec2 c = uv - 0.5;
      float r = length(c);
      float a = atan(c.y, c.x);
      float warp = fbm(c * SWIRL_DETAIL * 3.2 + uTime * 0.025);
      float s = sin(a * 2.0 + r * 7.0 - uTime * 0.07 + warp * 3.4) * 0.5 + 0.5;
      s = mix(s, fbm(c * SWIRL_DETAIL * 1.6 - uTime * 0.02), 0.35);
      return mix(vec3(1.0), vec3(0.9412), clamp(s, 0.0, 1.0)); // #ffffff → #f0f0f0
    }

    // ---- lava metaballs ----------------------------------------------------
    void blobs(vec2 q, float aspect, out float field, out vec3 tint){
      field = 0.0;
      tint  = vec3(0.0);
      for (int i = 0; i < 3; i++) {
        float fi = float(i);
        vec2 c = vec2(
          (0.24 + fi * 0.30 + 0.065 * sin(uTime * 0.10 + fi * 2.1)
                            + 0.03  * sin(uTime * 0.27 + fi * 1.3)) * aspect,
           0.68 + 0.20 * sin(uTime * 0.065 + fi * 1.7)
        );
        float r = 0.150 + 0.024 * sin(uTime * 0.085 + fi * 2.6);
        float d = length(q - c);
        float w = (r * r) / max(d * d, 1e-4);
        field += w;
        vec3 cc = i == 0 ? uGlow1 : (i == 1 ? uGlow2 : uGlow3);
        tint += cc * w;
      }
      tint /= max(field, 1e-4);
    }

    // ---- ChromaFlow -------------------------------------------------------
    // Pointer-driven in the spec; with no pointer yet it drifts on its own so
    // the flow is present at rest, then hands over once the cursor moves.
    vec3 chromaFlow(vec3 base, vec2 uv, float aspect){
      vec2 amb = vec2(0.50 + 0.30 * sin(uTime * 0.085),
                      0.40 + 0.22 * sin(uTime * 0.127 + 1.7));
      vec2 m = mix(amb, uMouse / uRes, uPointerActive);
      float d = length((uv - m) * vec2(aspect, 1.0));
      float g = exp(-(d * d) * (9.5 / CF_RADIUS));
      float mo = clamp(uMomentum / CF_MOMENTUM, 0.0, 1.0);
      vec3 oc = vec3(1.0, 0.3725, 0.0118); // #ff5f03
      return base + oc * g * (0.34 + 0.52 * mo) * uIntensity;
    }

    // ---- everything beneath the glass -------------------------------------
    vec3 scene(vec2 uv){
      float aspect = uRes.x / max(uRes.y, 1.0);
      vec3 col = swirl(uv);

      float field; vec3 tint;
      blobs(uv * vec2(aspect, 1.0), aspect, field, tint);
      // gentle two-stage falloff — a soft halo around a softer core, so the
      // metaballs read organic instead of threshold-cut
      float core = smoothstep(0.80, 2.10, field);
      float halo = smoothstep(0.16, 0.90, field) * 0.42;
      float mask = clamp(core + halo * (1.0 - core), 0.0, 1.0);
      col = mix(col, tint, mask * uBlobOpacity * uIntensity);

      return chromaFlow(col, uv, aspect);
    }

    // ---- FlutedGlass ------------------------------------------------------
    vec3 flutedGlass(vec2 uv){
      float ang = radians(FG_ANGLE);
      vec2 dir = vec2(cos(ang), sin(ang));           // across the flutes

      float f = dot(uv, dir) * FG_FREQUENCY + uTime * FG_SPEED;
      float p = fract(f);

      // shape: "rounded" — semicircular flute cross-section
      float x = p * 2.0 - 1.0;
      float k = sqrt(max(1.0 - x * x, 1e-3));
      float slope = clamp(-x / k, -3.0, 3.0);

      // softness 1 — relax the seam between flutes so it doesn't hard-clip
      float seam = smoothstep(0.0, 0.05 * FG_SOFTNESS, p)
                 * smoothstep(0.0, 0.05 * FG_SOFTNESS, 1.0 - p);
      slope *= seam;

      // the glass itself stays legible on light panes — it fades far less than
      // the colour layers do, so the fluting remains the shared visual signature
      float glass = mix(0.45, 1.0, uIntensity);

      float amt = slope * FG_REFRACTION * 0.0042 * glass;
      float ab  = FG_ABERRATION * 0.02;
      vec2 off  = dir * amt;

      vec3 col;
      col.r = scene(uv + off * (1.0 + ab)).r;
      col.g = scene(uv + off).g;
      col.b = scene(uv + off * (1.0 - ab)).b;

      // highlight — lightAngle -90 lands the specular line on each flute crest;
      // highlightSoftness 0 keeps that line crisp
      float bias = cos(radians(FG_LIGHTANGLE + 90.0));
      float spec = 1.0 - clamp(abs(slope * bias) * 2.0, 0.0, 1.0);
      spec = smoothstep(0.86, 0.975, pow(spec, 6.0)) * seam;
      col += spec * FG_HIGHLIGHT * glass;

      // flute edges read slightly deeper
      col *= 1.0 - 0.07 * glass * smoothstep(0.72, 1.0, abs(x));
      return col;
    }

    void main(){
      vec2 uv = gl_FragCoord.xy / uRes;
      uv.y = 1.0 - uv.y;

      vec3 col = flutedGlass(uv);

      // FilmGrain
      float g = hash(gl_FragCoord.xy + fract(uTime * 3.0) * vec2(41.0, 19.0));
      col += (g - 0.5) * GRAIN_STRENGTH * mix(0.4, 1.0, uIntensity);

      gl_FragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
    }
  `;

  const UNIFORMS = ['uRes', 'uTime', 'uMouse', 'uMomentum', 'uPointerActive',
    'uBlobOpacity', 'uGlow1', 'uGlow2', 'uGlow3', 'uIntensity'];

  // ---- theme tokens (app.jsx writes these inline on <html>) — read once for
  // every pane, since they all share the same palette ----
  const hex = (v, fb) => {
    const s = (v || '').trim();
    const m = /^#?([0-9a-f]{6})$/i.exec(s);
    if (!m) return fb;
    const n = parseInt(m[1], 16);
    return [(n >> 16 & 255) / 255, (n >> 8 & 255) / 255, (n & 255) / 255];
  };
  let theme = { o: 0.46, g1: [0.04, 0.04, 0.07], g2: [0.14, 0.15, 0.20], g3: [0.02, 0.02, 0.03] };
  function readTheme() {
    const cs = getComputedStyle(document.documentElement);
    const o = parseFloat(cs.getPropertyValue('--blob-opacity'));
    theme = {
      o: isNaN(o) ? 0.46 : o,
      g1: hex(cs.getPropertyValue('--glow-1'), theme.g1),
      g2: hex(cs.getPropertyValue('--glow-2'), theme.g2),
      g3: hex(cs.getPropertyValue('--glow-3'), theme.g3),
    };
  }
  readTheme();
  setInterval(readTheme, 600);

  // ---- shared pointer with momentum (client-space; panes localise it) ----
  let cx = -1e4, cy = -1e4, scx = cx, scy = cy, momentum = 0;
  let pointerSeen = false, pointerActive = 0;
  window.addEventListener('pointermove', (e) => {
    cx = e.clientX; cy = e.clientY;
    if (!pointerSeen) { pointerSeen = true; scx = cx; scy = cy; }
  }, { passive: true });

  function makePane(el) {
    const intensity = Math.max(0, Math.min(1, parseFloat(el.dataset.glassIntensity || '1') || 1));
    const isHero = intensity >= 0.999;

    const canvas = document.createElement('canvas');
    canvas.className = 'hero-shader-canvas';
    canvas.setAttribute('aria-hidden', 'true');

    // alpha:true + a transparent clear means a pane that has not drawn yet
    // composites as nothing rather than as opaque black
    const gl = canvas.getContext('webgl', { antialias: false, alpha: true, depth: false, premultipliedAlpha: true });
    if (!gl) return null; // the pane's CSS gradient fallback stays visible
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    canvas.style.opacity = '0';
    canvas.style.transition = 'opacity 220ms linear';

    const compile = (type, src) => {
      const s = gl.createShader(type);
      gl.shaderSource(s, src);
      gl.compileShader(s);
      if (!gl.getShaderParameter(s, gl.COMPILE_STATUS)) {
        console.error('glass-shader:', gl.getShaderInfoLog(s));
        return null;
      }
      return s;
    };
    const vs = compile(gl.VERTEX_SHADER, VERT);
    const fs = compile(gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return null;

    const prog = gl.createProgram();
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) {
      console.error('glass-shader:', gl.getProgramInfoLog(prog));
      return null;
    }
    gl.useProgram(prog);

    const buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
    const aPos = gl.getAttribLocation(prog, 'aPos');
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const U = {};
    UNIFORMS.forEach((n) => { U[n] = gl.getUniformLocation(prog, n); });

    el.appendChild(canvas);

    const pane = {
      el, gl, canvas, U, intensity, isHero,
      // every pane starts on and draws once immediately; the observer only ever
      // switches a pane OFF once it has scrolled away
      visible: true,
      drawn: false,
      last: 0,
      // secondary panes cost less: softer DPR ceiling and ~30fps
      dprCap: isHero ? 1.5 : 1.15,
      interval: isHero ? 0 : 1000 / 30,
      resize() {
        const r = el.getBoundingClientRect();
        if (!r.width || !r.height) return;
        const dpr = Math.min(window.devicePixelRatio || 1, this.dprCap);
        const w = Math.round(r.width * dpr), h = Math.round(r.height * dpr);
        if (canvas.width !== w || canvas.height !== h) {
          canvas.width = w; canvas.height = h;
          gl.viewport(0, 0, w, h);
        }
      },
      key: el.classList.contains('hero-glass') ? 'hero' : (el.className + '|' + intensity),
      adopt(next) {
        this.el = next;
        if (canvas.parentNode !== next) next.appendChild(canvas);
        this.resize();
      },
      dispose() {
        const ext = gl.getExtension('WEBGL_lose_context');
        if (ext) ext.loseContext();
        if (canvas.parentNode) canvas.parentNode.removeChild(canvas);
      },
    };
    pane.resize();
    if (io) io.observe(el);
    return pane;
  }

  // Only the panes on screen draw — pages are long and several carry a pane.
  const io = 'IntersectionObserver' in window
    ? new IntersectionObserver((entries) => {
        entries.forEach((e) => {
          const p = panes.get(e.target);
          if (p) p.visible = e.isIntersecting;
        });
      }, { rootMargin: '120px' })
    : null;

  const panes = new Map();
  // Pages remount on every route change. Rather than tearing a context down and
  // paying for a fresh one (which left the hero on its flat fallback for ~1s),
  // an unmounted pane parks here and is re-adopted by the next matching element.
  const parked = new Map();
  let parkedAt = new Map();

  // Pages remount across route transitions, so keep syncing panes to the DOM.
  function sync() {
    const found = new Set();
    document.querySelectorAll('.hero-glass, [data-glass-pane]').forEach((el) => {
      found.add(el);
      const existing = panes.get(el);
      if (existing) { existing.resize(); return; }

      const key = el.classList.contains('hero-glass')
        ? 'hero' : (el.className + '|' + (el.dataset.glassIntensity || '1'));
      const reuse = parked.get(key);
      if (reuse) {
        parked.delete(key);
        parkedAt.delete(key);
        reuse.adopt(el);
        reuse.visible = true;
        if (io) io.observe(el);
        panes.set(el, reuse);
        drawPane(reuse, clock);   // paint immediately — no gap on return
        return;
      }

      const p = makePane(el);
      if (p) { panes.set(el, p); drawPane(p, clock); }
    });
    const now = performance.now();
    panes.forEach((p, el) => {
      if (!found.has(el) || !el.isConnected) {
        if (io) io.unobserve(el);
        panes.delete(el);
        if (parked.has(p.key)) { p.dispose(); return; }
        parked.set(p.key, p);
        parkedAt.set(p.key, now);
      }
    });
    // a pane that never comes back (a page left for good) is released
    parked.forEach((p, key) => {
      if (now - (parkedAt.get(key) || now) > 30000) {
        p.dispose();
        parked.delete(key);
        parkedAt.delete(key);
      }
    });
  }
  sync();
  setInterval(sync, 400);
  window.addEventListener('resize', () => panes.forEach((p) => p.resize()), { passive: true });

  function drawPane(p, t) {
    if (!p.canvas.width) return;
    const r = p.el.getBoundingClientRect();
    const dpr = r.width ? p.canvas.width / r.width : 1;
    const mx = (scx - r.left) * dpr;
    const my = (r.bottom - scy) * dpr;

    const gl = p.gl, U = p.U;
    gl.uniform2f(U.uRes, p.canvas.width, p.canvas.height);
    gl.uniform1f(U.uTime, t);
    gl.uniform2f(U.uMouse, mx, my);
    gl.uniform1f(U.uMomentum, momentum);
    gl.uniform1f(U.uPointerActive, pointerActive);
    gl.uniform1f(U.uBlobOpacity, theme.o);
    gl.uniform3fv(U.uGlow1, theme.g1);
    gl.uniform3fv(U.uGlow2, theme.g2);
    gl.uniform3fv(U.uGlow3, theme.g3);
    gl.uniform1f(U.uIntensity, p.intensity);
    gl.drawArrays(gl.TRIANGLES, 0, 3);

    if (!p.drawn) { p.drawn = true; p.canvas.style.opacity = '1'; }
  }

  let t0 = null;
  let clock = 0;
  function frame(ms) {
    requestAnimationFrame(frame);
    if (t0 === null) t0 = ms;
    const t = reduce ? 12.0 : (ms - t0) / 1000;
    clock = t;

    const pdx = cx - scx, pdy = cy - scy;
    scx += pdx * 0.09; scy += pdy * 0.09;
    momentum += (Math.hypot(pdx, pdy) * 0.2 - momentum) * 0.08;
    if (pointerSeen) pointerActive += (1 - pointerActive) * 0.03;

    panes.forEach((p) => {
      if (!p.visible) return;
      if (p.interval && ms - p.last < p.interval) return;
      p.last = ms;
      drawPane(p, t);
    });
  }
  requestAnimationFrame(frame);
})();
