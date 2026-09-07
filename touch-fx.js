// touch-fx.js — scroll-triggered stand-ins for hover states on touch devices.
// Coarse-pointer only: marks whatever card is crossing the middle of the
// viewport with [data-inview]; responsive.css maps that to the same visual
// state hover produces on desktop. Purely additive — no component knows
// about it, and it does nothing at all on a mouse-driven browser.
(function () {
  var isTouch = !window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  if (!isTouch) return;

  var SEL = '.bento-card, .project-card, .skill-card, .exp-row, .gallery-item';
  var els = [];
  var raf = 0;

  function refresh() {
    els = Array.prototype.slice.call(document.querySelectorAll(SEL));
  }

  function tick() {
    raf = 0;
    var h = window.innerHeight;
    var top = h * 0.34;
    var bottom = h * 0.66;
    for (var i = 0; i < els.length; i++) {
      var el = els[i];
      var r = el.getBoundingClientRect();
      var on = r.top < bottom && r.bottom > top;
      if (on) {
        if (!el.hasAttribute('data-inview')) el.setAttribute('data-inview', '');
      } else if (el.hasAttribute('data-inview')) {
        el.removeAttribute('data-inview');
      }
    }
  }

  function schedule() {
    if (!raf) raf = requestAnimationFrame(tick);
  }

  window.addEventListener('scroll', schedule, { passive: true });
  window.addEventListener('resize', function () { refresh(); schedule(); }, { passive: true });
  window.addEventListener('orientationchange', function () { refresh(); schedule(); });

  // React swaps whole pages in; re-collect when #root's tree changes.
  var pending = 0;
  function onMutate() {
    if (pending) return;
    pending = setTimeout(function () {
      pending = 0;
      refresh();
      schedule();
    }, 120);
  }

  function start() {
    var root = document.getElementById('root');
    refresh();
    schedule();
    if (root && window.MutationObserver) {
      new MutationObserver(onMutate).observe(root, { childList: true, subtree: true });
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', start);
  } else {
    start();
  }
})();
