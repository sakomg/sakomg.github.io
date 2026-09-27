(function () {
  var root = document.documentElement;
  var button = document.querySelector(".theme");
  var systemDark = window.matchMedia("(prefers-color-scheme: dark)");

  function current() {
    return root.dataset.theme || (systemDark.matches ? "dark" : "light");
  }

  function label() {
    if (button) button.setAttribute("aria-label", current() === "dark" ? "Switch to light theme" : "Switch to dark theme");
  }

  var still = window.matchMedia("(prefers-reduced-motion: reduce)");

  function apply(next) {
    root.dataset.theme = next;
    try { localStorage.setItem("theme", next); } catch (e) {}
    label();
  }

  function fade(next) {
    root.classList.add("fading");
    apply(next);
    setTimeout(function () { root.classList.remove("fading"); }, 350);
  }

  function reveal(next, x, y) {
    var radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    var transition = document.startViewTransition(function () { apply(next); });
    transition.ready.then(function () {
      root.animate(
        { clipPath: ["circle(0px at " + x + "px " + y + "px)", "circle(" + radius + "px at " + x + "px " + y + "px)"] },
        { duration: 650, easing: "cubic-bezier(0.45, 0, 0.2, 1)", pseudoElement: "::view-transition-new(root)" }
      );
    });
  }

  if (button) {
    button.addEventListener("click", function (event) {
      var next = current() === "dark" ? "light" : "dark";
      if (!document.startViewTransition || still.matches) return fade(next);
      var box = button.getBoundingClientRect();
      var fromPointer = event.detail > 0;
      reveal(next, fromPointer ? event.clientX : box.left + box.width / 2, fromPointer ? event.clientY : box.top + box.height / 2);
    });
    label();
  }

  function drawSky() {
    var seed = 20161;
    function random() {
      seed = (seed + 0x6d2b79f5) | 0;
      var t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }
    var ns = "http://www.w3.org/2000/svg";
    var svg = document.createElementNS(ns, "svg");
    svg.setAttribute("class", "sky");
    svg.setAttribute("aria-hidden", "true");
    for (var i = 0; i < 170; i++) {
      var star = document.createElementNS(ns, "circle");
      var size = random();
      star.setAttribute("cx", (random() * 100).toFixed(2) + "%");
      star.setAttribute("cy", (random() * 100).toFixed(2) + "%");
      star.setAttribute("r", (0.35 + size * size * 0.95).toFixed(2));
      star.setAttribute("opacity", (0.25 + random() * 0.55).toFixed(2));
      if (random() < 0.16) {
        star.setAttribute("class", "twinkle");
        star.style.animationDuration = (2.5 + random() * 4).toFixed(1) + "s";
        star.style.animationDelay = (-random() * 6).toFixed(1) + "s";
      }
      svg.appendChild(star);
    }
    document.body.prepend(svg);
  }

  drawSky();

  var mark = document.querySelector(".mark path");
  var title = document.querySelector("h1");
  if (mark && title && !still.matches) {
    var phase = Math.PI / 2;
    var speed = 0;
    var target = 0;
    var last = 0;
    var running = false;

    function draw() {
      var d = "";
      for (var i = 0; i < 180; i++) {
        var t = (2 * Math.PI * i) / 180;
        var x = 1.5 + 41 * (Math.sin(3 * t + phase) + 1) / 2;
        var y = 1.5 + 29 * (Math.sin(2 * t) + 1) / 2;
        d += (i ? "L" : "M") + x.toFixed(1) + " " + y.toFixed(1);
      }
      mark.setAttribute("d", d + "Z");
    }

    function restPhase() {
      return Math.PI / 2 + Math.round((phase - Math.PI / 2) / Math.PI) * Math.PI;
    }

    function frame(now) {
      var dt = last ? Math.min(now - last, 50) / 1000 : 0;
      last = now;
      if (target) {
        speed += (target - speed) * Math.min(1, dt * 4);
      } else {
        speed += ((restPhase() - phase) * 6 - speed) * Math.min(1, dt * 5);
      }
      phase += speed * dt;
      if (!target && Math.abs(speed) < 0.01 && Math.abs(restPhase() - phase) < 0.003) {
        phase = restPhase();
        draw();
        running = false;
        last = 0;
        return;
      }
      draw();
      requestAnimationFrame(frame);
    }

    function spin(on) {
      target = on ? 1.1 : 0;
      if (!running) {
        running = true;
        requestAnimationFrame(frame);
      }
    }

    title.addEventListener("mouseenter", function () { spin(true); });
    title.addEventListener("mouseleave", function () { spin(false); });
    title.addEventListener("touchstart", function () { spin(true); setTimeout(function () { spin(false); }, 2500); }, { passive: true });
  }

  console.log(
    "%cHi.%c No framework here, just HTML and one stylesheet. Source: github.com/sakomg/sakomg.github.io",
    "font: bold 14px Georgia, serif",
    "font: 13px Georgia, serif"
  );
})();
