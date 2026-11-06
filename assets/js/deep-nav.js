/* Keeps the navbar compact while scrolling and lets it stretch across the page
   at the very top, so the menu items glide together as the glass appears. */
(function () {
  var nav = document.getElementById("navbar");
  if (!nav) return;
  var pill = nav.querySelector(".container");
  if (!pill) return;

  var THRESHOLD = 28;
  var desktop = window.matchMedia("(min-width: 901px)");
  var compactWidth = 0;

  function measureCompact() {
    var previous = pill.style.width;
    pill.style.width = "";
    compactWidth = Math.round(pill.getBoundingClientRect().width);
    pill.style.width = previous;
  }

  function update() {
    if (!desktop.matches) {
      nav.classList.toggle("nav-at-top", (window.scrollY || 0) < THRESHOLD);
      pill.style.width = "";
      return;
    }

    var atTop = (window.scrollY || 0) < THRESHOLD;
    nav.classList.toggle("nav-at-top", atTop);

    if (!compactWidth) measureCompact();

    var expanded = Math.min(window.innerWidth - 48, 1120);
    pill.style.width = (atTop ? expanded : compactWidth) + "px";
  }

  var ticking = false;
  function schedule() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(function () {
      ticking = false;
      update();
    });
  }

  window.addEventListener("scroll", schedule, { passive: true });
  window.addEventListener("resize", function () {
    compactWidth = 0;
    measureCompact();
    schedule();
  });

  update();
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      compactWidth = 0;
      measureCompact();
      schedule();
    });
  }
})();
