/* Marks the navbar as "at top" while the page is unscrolled, so the
   liquid-glass capsule can dissolve into the page background and fade in
   as soon as the visitor scrolls. No-JS visitors simply keep the glass bar. */
(function () {
  var nav = document.getElementById("navbar");
  if (!nav) return;

  var THRESHOLD = 28;
  var ticking = false;

  function update() {
    var y = window.scrollY || document.documentElement.scrollTop || 0;
    nav.classList.toggle("nav-at-top", y < THRESHOLD);
    ticking = false;
  }

  function onScroll() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("resize", onScroll);
  update();
})();
