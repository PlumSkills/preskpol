/* PRESKPOL — skrypty interfejsu (bez zależności zewnętrznych) */
(function () {
  "use strict";

  /* Menu mobilne */
  var burger = document.querySelector(".burger");
  var nav = document.getElementById("nav");
  if (burger && nav) {
    burger.addEventListener("click", function () {
      var open = nav.getAttribute("data-open") === "true";
      nav.setAttribute("data-open", String(!open));
      burger.setAttribute("aria-expanded", String(!open));
    });
  }

  /* Rozwijane podmenu */
  document.querySelectorAll(".has-sub").forEach(function (item) {
    var btn = item.querySelector("button");
    if (!btn) return;
    btn.addEventListener("click", function (e) {
      e.stopPropagation();
      var open = item.getAttribute("data-open") === "true";
      document.querySelectorAll('.has-sub[data-open="true"]').forEach(function (o) {
        o.setAttribute("data-open", "false");
      });
      item.setAttribute("data-open", String(!open));
      btn.setAttribute("aria-expanded", String(!open));
    });
    item.addEventListener("mouseenter", function () {
      if (window.innerWidth > 1080) item.setAttribute("data-open", "true");
    });
    item.addEventListener("mouseleave", function () {
      if (window.innerWidth > 1080) item.setAttribute("data-open", "false");
    });
  });
  document.addEventListener("click", function () {
    document.querySelectorAll('.has-sub[data-open="true"]').forEach(function (o) {
      if (window.innerWidth > 1080) o.setAttribute("data-open", "false");
    });
  });
  document.addEventListener("keydown", function (e) {
    if (e.key !== "Escape") return;
    document.querySelectorAll('.has-sub').forEach(function (o) { o.setAttribute("data-open", "false"); });
    if (nav) nav.setAttribute("data-open", "false");
  });

  var calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* Odsłanianie sekcji przy przewijaniu */
  var reveals = document.querySelectorAll(".rv");
  if (!("IntersectionObserver" in window) || calm) {
    reveals.forEach(function (el) { el.classList.add("in"); });
  } else {
    var ro = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting) { en.target.classList.add("in"); ro.unobserve(en.target); }
      });
    }, { rootMargin: "0px 0px -8% 0px", threshold: 0.08 });
    reveals.forEach(function (el) { ro.observe(el); });
  }

  /* Liczniki */
  function runCount(el) {
    var target = parseFloat(el.getAttribute("data-count"));
    var dur = 1400, t0 = null;
    var fmt = new Intl.NumberFormat("pl-PL");
    function step(ts) {
      if (!t0) t0 = ts;
      var p = Math.min((ts - t0) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt.format(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counters = document.querySelectorAll("[data-count]");
  if (counters.length) {
    if (calm || !("IntersectionObserver" in window)) {
      counters.forEach(function (el) {
        el.textContent = new Intl.NumberFormat("pl-PL").format(parseFloat(el.getAttribute("data-count")));
      });
    } else {
      var co = new IntersectionObserver(function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) { runCount(en.target); co.unobserve(en.target); }
        });
      }, { threshold: 0.5 });
      counters.forEach(function (el) { co.observe(el); });
    }
  }
})();
