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

  if (button) {
    button.addEventListener("click", function () {
      var next = current() === "dark" ? "light" : "dark";
      root.classList.add("fading");
      root.dataset.theme = next;
      try { localStorage.setItem("theme", next); } catch (e) {}
      label();
      setTimeout(function () { root.classList.remove("fading"); }, 350);
    });
    label();
  }

  var mark = document.querySelector(".mark path");
  var title = document.querySelector("h1");
  var still = window.matchMedia("(prefers-reduced-motion: reduce)");
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

    function frame(now) {
      var dt = last ? Math.min(now - last, 50) / 1000 : 0;
      last = now;
      speed += (target - speed) * Math.min(1, dt * 4);
      phase += speed * dt;
      draw();
      if (target || Math.abs(speed) > 0.01) {
        requestAnimationFrame(frame);
      } else {
        running = false;
        last = 0;
      }
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
