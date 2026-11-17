/* Miss Yang's Art School — version 06 “One Line”
   Progressive motion layer. Everything here is optional: with JS off, or with
   reduced motion, the page is complete and static. */
(function () {
  "use strict";

  var html = document.documentElement;
  var reduce = html.classList.contains("reduce");
  var hasGSAP = typeof window.gsap !== "undefined";
  var hasST = hasGSAP && typeof window.ScrollTrigger !== "undefined";
  var hasDraw = hasGSAP && typeof window.DrawSVGPlugin !== "undefined";

  if (hasGSAP) {
    if (hasST) gsap.registerPlugin(ScrollTrigger);
    if (hasDraw) gsap.registerPlugin(DrawSVGPlugin);
  } else {
    /* GSAP missing: never leave animated elements hidden */
    html.classList.remove("anim");
  }

  /* ---------- smooth scrolling ---------- */
  var lenis = null;
  if (!reduce && window.Lenis && window.matchMedia("(pointer: fine)").matches) {
    lenis = new Lenis({ lerp: 0.085, wheelMultiplier: 1, touchMultiplier: 1.6 });
    if (hasST) {
      lenis.on("scroll", ScrollTrigger.update);
      gsap.ticker.add(function (time) {
        lenis.raf(time * 1000);
      });
      gsap.ticker.lagSmoothing(0);
    }
    html.classList.add("lenis-on");
  }
  /* expose the smoothed scroller so the gallery viewer can pause it */
  window.__line = { lenis: lenis, refresh: function () { if (hasST) ScrollTrigger.refresh(); } };

  /* anchor navigation (works with or without Lenis) */
  var masthead = document.querySelector(".masthead");
  function scrollToTarget(target) {
    var top = target.getBoundingClientRect().top + window.scrollY - (masthead ? masthead.offsetHeight : 0) - 8;
    if (lenis) lenis.scrollTo(top, { duration: 1.1 });
    else window.scrollTo({ top: top, behavior: reduce ? "auto" : "smooth" });
  }
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    var href = a.getAttribute("href");
    if (!href || href === "#") return;
    var target = document.querySelector(href);
    if (!target) return;
    a.addEventListener("click", function (e) {
      e.preventDefault();
      scrollToTarget(target);
      history.replaceState(null, "", href);
    });
  });

  /* ---------- progress line + spine ---------- */
  var progress = document.querySelector(".progress");
  var fill = document.querySelector(".spine-fill");
  var maxScroll = 0;
  function measure() {
    maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
  }
  function setProgress() {
    var y = window.scrollY || window.pageYOffset;
    var p = Math.min(1, Math.max(0, y / maxScroll));
    if (progress) progress.style.transform = "scaleX(" + p + ")";
    if (fill) fill.style.transform = "scaleY(" + p + ")";
  }
  measure();
  setProgress();
  window.addEventListener("resize", function () {
    measure();
    setProgress();
  });
  window.addEventListener(
    "scroll",
    function () {
      setProgress();
    },
    { passive: true }
  );
  if (lenis) {
    lenis.on("scroll", setProgress);
  }

  /* ---------- section ticks on the spine ---------- */
  (function buildsTicks() {
    var spine = document.querySelector(".spine");
    if (!spine) return;
    var marks = document.createElement("div");
    marks.setAttribute("aria-hidden", "true");
    marks.style.cssText = "position:absolute;inset:0;pointer-events:none;z-index:4;";
    document.body.appendChild(marks);
    function draw() {
      marks.textContent = "";
      if (window.innerWidth < 1360) return;
      var left = spine.getBoundingClientRect().left;
      document.querySelectorAll("[data-spine]").forEach(function (sec) {
        var top = sec.getBoundingClientRect().top + window.scrollY;
        if (top < 40) return;
        var tick = document.createElement("span");
        tick.className = "spine-tick";
        tick.style.cssText =
          "position:absolute;left:" + left + "px;top:" + top + "px;width:9px;height:1px;background:var(--cobalt);opacity:.5;";
        marks.appendChild(tick);
      });
    }
    draw();
    var t;
    window.addEventListener("resize", function () {
      clearTimeout(t);
      t = setTimeout(draw, 120);
    });
    window.addEventListener("load", draw);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(draw);
  })();

  /* ---------- reveal helper ----------
     IntersectionObserver is the primary trigger; a rAF-throttled scroll check
     rides along so a missing browser frame can never leave content masked. */
  function watchReveal(nodes, onReveal) {
    var list = Array.prototype.slice.call(nodes);
    var pending = list.slice();
    function run(el) {
      el.classList.add("is-in");
      if (onReveal) onReveal(el);
    }
    function check() {
      pending = pending.filter(function (el) {
        var r = el.getBoundingClientRect();
        var vh = window.innerHeight || 800;
        if (r.top < vh * 0.92 && r.bottom > 0) {
          run(el);
          return false;
        }
        return true;
      });
    }
    if ("IntersectionObserver" in window) {
      var io = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (!entry.isIntersecting) return;
            io.unobserve(entry.target);
            var i = pending.indexOf(entry.target);
            if (i > -1) pending.splice(i, 1);
            run(entry.target);
          });
        },
        { rootMargin: "0px 0px -8% 0px", threshold: 0.08 }
      );
      list.forEach(function (el) { io.observe(el); });
    }
    var queued = false;
    function onScroll() {
      if (queued) return;
      queued = true;
      requestAnimationFrame(function () {
        queued = false;
        check();
        if (!pending.length) {
          window.removeEventListener("scroll", onScroll);
          window.removeEventListener("resize", onScroll);
        }
      });
    }
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    requestAnimationFrame(check);
    window.addEventListener("load", check);
  }

  /* ---------- scroll reveals ---------- */
  (function reveals() {
    if (reduce) return;
    var groups = [
      { sel: ".section-head h2", cls: "js-mask", delay: 0, y: 0 },
      { sel: ".section-head .lede", cls: "js-reveal", delay: 0.08, y: 16 },
      { sel: ".room", cls: "js-reveal", delay: 0, y: 18 },
      { sel: ".about-grid > *", cls: "js-reveal", delay: 0, y: 18 },
      { sel: ".about-body p, .about-motto", cls: "js-reveal", delay: 0, y: 14 },
      { sel: ".teach-item", cls: "js-reveal", delay: 0, y: 18 },
      { sel: ".fee-row", cls: "js-reveal", delay: 0, y: 12 },
      { sel: ".reward", cls: "js-reveal", delay: 0, y: 14 },
      { sel: ".projects-body p, .strands", cls: "js-reveal", delay: 0, y: 14 },
      { sel: ".projects-figure", cls: "js-reveal", delay: 0, y: 18 },
      { sel: ".project-type", cls: "js-reveal", delay: 0, y: 16 },
      { sel: ".beyond-block", cls: "js-reveal", delay: 0, y: 16 },
      { sel: ".contact h2, .contact-mail, .contact-details > div", cls: "js-reveal", delay: 0, y: 16 },
      { sel: ".wall .artist", cls: "js-reveal", delay: 0, y: 18 },
      { sel: ".wall-foot", cls: "js-reveal", delay: 0, y: 16 }
    ];
    groups.forEach(function (g) {
      document.querySelectorAll(g.sel).forEach(function (el, i) {
        el.classList.add(g.cls);
        el.style.setProperty("--reveal-delay", (g.delay + Math.min(i, 6) * 0.055).toFixed(2) + "s");
        el.style.setProperty("--reveal-y", g.y + "px");
      });
    });

    watchReveal(document.querySelectorAll(".js-reveal, .js-mask"));
  })();

  /* ---------- drawn marks ---------- */
  (function marks() {
    if (!hasGSAP || !hasDraw || reduce) return;
    document.querySelectorAll(".draw-mark").forEach(function (svg) {
      var paths = svg.querySelectorAll("path, circle, rect, line");
      if (!paths.length) return;
      gsap.set(paths, { drawSVG: "0%" });
      watchReveal([svg], function () {
        gsap.to(paths, {
          drawSVG: "100%",
          duration: 1.05,
          ease: "power2.inOut",
          stagger: 0.14,
          overwrite: true
        });
      });
    });

    /* the loop at the end of the line */
    var loop = document.querySelector(".loop path");
    if (loop) {
      gsap.set(loop, { drawSVG: "0%" });
      ScrollTrigger.create({
        trigger: ".contact",
        start: "top 70%",
        once: true,
        onEnter: function () {
          gsap.to(loop, { drawSVG: "100%", duration: 1.6, ease: "power2.inOut" });
        }
      });
    }
  })();

  /* ---------- fee figures count up ---------- */
  (function fees() {
    if (!hasGSAP || reduce) return;
    var table = document.querySelector(".fee-table");
    if (!table) return;
    var cells = table.querySelectorAll(".fee");
    var data = [];
    cells.forEach(function (cell) {
      var node = cell.firstChild;
      if (!node || node.nodeType !== 3) return;
      var raw = node.nodeValue.trim();
      var m = /^\$(\d+)$/.exec(raw);
      if (!m) return;
      data.push({ node: node, value: parseInt(m[1], 10) });
      node.nodeValue = " $" + "0";
    });
    if (!data.length) return;
    var run = false;
    ScrollTrigger.create({
      trigger: table,
      start: "top 78%",
      once: true,
      onEnter: function () {
        if (run) return;
        run = true;
        data.forEach(function (item, i) {
          var proxy = { v: 0 };
          gsap.to(proxy, {
            v: item.value,
            duration: 0.9 + i * 0.05,
            ease: "power2.out",
            delay: i * 0.05,
            onUpdate: function () {
              item.node.nodeValue = " $" + Math.round(proxy.v);
            },
            onComplete: function () {
              item.node.nodeValue = " $" + item.value;
            }
          });
        });
      }
    });
  })();

  /* ---------- the line: pinned horizontal rail ---------- */
  (function rail() {
    var track = document.querySelector(".rail-track");
    var viewport = document.querySelector(".rail-viewport");
    var wire = document.querySelector(".rail-wire i");
    var dot = document.querySelector(".rail-wire b");
    if (!track || !viewport) return;
    if (!hasGSAP || !hasST || reduce) {
      if (wire) wire.style.transform = "scaleX(1)";
      return;
    }

    var mm = gsap.matchMedia();

    mm.add("(min-width: 1024px)", function () {
      var distance = track.scrollWidth - viewport.clientWidth;
      if (distance <= 8) {
        if (wire) gsap.set(wire, { scaleX: 1 });
        return;
      }
      var st = {
        trigger: ".rail",
        start: "top top",
        end: function () {
          return "+=" + Math.round(distance * 1.10);
        },
        pin: ".rail-pin",
        pinSpacing: true,
        scrub: 0.7,
        anticipatePin: 1,
        invalidateOnRefresh: true
      };
      gsap.fromTo(track, { x: 0 }, { x: -distance, ease: "none", scrollTrigger: st });
      var travel = dot ? dot.parentElement.clientWidth - 7 : 0;
      if (dot) {
        gsap.fromTo(
          dot,
          { x: 0 },
          {
            x: travel,
            ease: "none",
            scrollTrigger: {
              trigger: ".rail",
              start: "top top",
              end: function () {
                return "+=" + Math.round(distance * 1.10);
              },
              scrub: 0.7
            }
          }
        );
      }
      if (wire) {
        gsap.fromTo(
          wire,
          { scaleX: 0 },
          {
            scaleX: 1,
            ease: "none",
            scrollTrigger: {
              trigger: ".rail",
              start: "top top",
              end: function () {
                return "+=" + Math.round(distance * 1.10);
              },
              scrub: 0.7
            }
          }
        );
      }
      ScrollTrigger.refresh();
    });

    mm.add("(max-width: 1023px)", function () {
      if (dot) gsap.fromTo(dot, { x: 0 }, { x: 0 });
      if (!wire) return;
      gsap.fromTo(
        wire,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: { trigger: ".rail", start: "top 80%", end: "bottom 60%", scrub: 0.5 }
        }
      );
      if (dot) {
        gsap.fromTo(
          dot,
          { x: 0 },
          {
            x: dot.parentElement.clientWidth - 7,
            ease: "none",
            scrollTrigger: { trigger: ".rail", start: "top 80%", end: "bottom 60%", scrub: 0.5 }
          }
        );
      }
    });
  })();

  /* ---------- small parallax on portrait & hero work ---------- */
  (function parallax() {
    if (!hasGSAP || !hasST || reduce) return;
    var pairs = [
      [".portrait img", 34],
      [".hero-frame img", 26]
    ];
    pairs.forEach(function (p) {
      var el = document.querySelector(p[0]);
      if (!el) return;
      gsap.to(el, {
        yPercent: p[1] / 10,
        ease: "none",
        scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true }
      });
    });
  })();

  /* refresh after fonts settle so measurements are right */
  if (document.fonts && document.fonts.ready) {
    document.fonts.ready.then(function () {
      if (hasST) ScrollTrigger.refresh();
    });
  }
})();
