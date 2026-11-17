/* Miss Yang's Art School — version 06 “One Line”
   Little Artists viewer: a 24-work sequence with a View Transition morph,
   keyboard navigation, swipe, and click-to-zoom with drag panning.
   Without JS the works stay as still images; nothing is required to read the page. */
(function () {
  "use strict";

  var dialog = document.querySelector(".viewer");
  var works = Array.prototype.slice.call(document.querySelectorAll(".work"));
  if (!dialog || !works.length) return;

  var stage = dialog.querySelector(".viewer-stage");
  var img = dialog.querySelector(".viewer-img");
  var who = dialog.querySelector(".viewer-caption .who");
  var desc = dialog.querySelector(".viewer-caption .desc");
  var num = dialog.querySelector(".viewer-count .num");
  var total = dialog.querySelector(".viewer-count .total");
  var closeBtn = dialog.querySelector(".viewer-close");
  var prevBtn = dialog.querySelector(".viewer-prev");
  var nextBtn = dialog.querySelector(".viewer-next");
  var html = document.documentElement;
  var reduce = html.classList.contains("reduce");

  total.textContent = String(works.length).padStart(2, "0");

  var current = -1;
  var opener = null;
  var zoomed = false;
  var dragging = false;
  var panX = 0;
  var panY = 0;
  var startX = 0;
  var startY = 0;
  var moved = false;

  var data = works.map(function (el) {
    var image = el.querySelector("img");
    return {
      el: el,
      src: image.getAttribute("src"),
      alt: image.getAttribute("alt") || "",
      name: el.getAttribute("data-name") || "",
      age: el.getAttribute("data-age") || "",
      n: el.getAttribute("data-n") || "",
      desc: el.getAttribute("data-desc") || ""
    };
  });

  function paint(i) {
    var w = data[i];
    if (!w) return;
    img.src = w.src;
    img.alt = w.alt;
    img.removeAttribute("width");
    img.removeAttribute("height");
    who.textContent = w.name + ", " + w.age;
    desc.textContent = " " + w.desc.charAt(0) + w.desc.slice(1).toLowerCase() + ". Work " + w.n + " of 2.";
    num.textContent = String(i + 1).padStart(2, "0");
    prevBtn.disabled = i === 0;
    nextBtn.disabled = i === data.length - 1;
    resetZoom();
    current = i;
  }

  function resetZoom() {
    zoomed = false;
    panX = panY = 0;
    stage.classList.remove("is-zoomed");
    img.classList.remove("is-dragging");
    img.style.transform = "";
  }

  function go(step) {
    var next = current + step;
    if (next < 0 || next >= data.length) return;
    paint(next);
  }

  function focusWork(i) {
    var el = data[i] && data[i].el;
    if (el) el.focus({ preventScroll: true });
  }

  var lastThumb = null;

  function lockScroll() {
    html.style.overflow = "hidden";
    if (window.__line && window.__line.lenis) window.__line.lenis.stop();
  }

  function open(i, origin) {
    opener = origin || works[i];
    current = -1;
    var thumb = data[i].el;
    var supportsVT = typeof document.startViewTransition === "function" && !reduce;

    function reveal() {
      lockScroll();
      paint(i);
    }

    if (supportsVT) {
      if (lastThumb) lastThumb.style.viewTransitionName = "";
      thumb.style.viewTransitionName = "work";
      lastThumb = thumb;
      var vt = document.startViewTransition(function () {
        dialog.showModal();
        reveal();
        img.style.viewTransitionName = "work";
        thumb.style.viewTransitionName = "";
      });
      vt.finished
        .then(function () {
          img.style.viewTransitionName = "";
          lastThumb = null;
        })
        .catch(function () {
          img.style.viewTransitionName = "";
        });
    } else {
      dialog.showModal();
      reveal();
    }
  }

  function close() {
    resetZoom();
    if (dialog.open) dialog.close();
  }

  function unlock() {
    if (window.__line && window.__line.lenis) window.__line.lenis.start();
    html.style.overflow = "";
    img.style.viewTransitionName = "";
  }

  works.forEach(function (el, i) {
    el.addEventListener("click", function (e) {
      e.preventDefault();
      open(i, el);
    });
  });

  closeBtn.addEventListener("click", close);
  prevBtn.addEventListener("click", function () {
    go(-1);
  });
  nextBtn.addEventListener("click", function () {
    go(1);
  });

  dialog.addEventListener("close", function () {
    unlock();
    if (opener && document.contains(opener)) opener.focus({ preventScroll: true });
  });
  /* Esc still closes a native dialog; make sure the page unlocks too */
  dialog.addEventListener("cancel", function () {
    unlock();
  });

  document.addEventListener("keydown", function (e) {
    if (!dialog.open) return;
    if (e.key === "ArrowRight") {
      e.preventDefault();
      go(1);
    } else if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(-1);
    } else if (e.key === "Escape") {
      e.preventDefault();
      close();
    }
  });

  /* click to zoom, drag to pan */
  img.addEventListener("pointerdown", function (e) {
    if (!zoomed) return;
    dragging = true;
    moved = false;
    startX = e.clientX - panX;
    startY = e.clientY - panY;
    img.classList.add("is-dragging");
    img.setPointerCapture(e.pointerId);
  });
  img.addEventListener("pointermove", function (e) {
    if (!dragging) return;
    panX = e.clientX - startX;
    panY = e.clientY - startY;
    moved = true;
    img.style.transform = "translate(" + panX + "px," + panY + "px) scale(1.9)";
    e.preventDefault();
  });
  img.addEventListener("pointerup", function (e) {
    dragging = false;
    img.classList.remove("is-dragging");
    if (img.hasPointerCapture && img.hasPointerCapture(e.pointerId)) img.releasePointerCapture(e.pointerId);
  });
  img.addEventListener("click", function () {
    if (moved) {
      moved = false;
      return;
    }
    zoomed = !zoomed;
    stage.classList.toggle("is-zoomed", zoomed);
    if (!zoomed) {
      panX = panY = 0;
      img.style.transform = "";
    } else {
      img.style.transform = "translate(0px,0px) scale(1.9)";
    }
  });

  /* swipe left/right on touch */
  var touchX = 0;
  var touchY = 0;
  var touching = false;
  stage.addEventListener(
    "touchstart",
    function (e) {
      if (e.touches.length !== 1 || zoomed) return;
      touching = true;
      touchX = e.touches[0].clientX;
      touchY = e.touches[0].clientY;
    },
    { passive: true }
  );
  stage.addEventListener(
    "touchend",
    function (e) {
      if (!touching) return;
      touching = false;
      var dx = e.changedTouches[0].clientX - touchX;
      var dy = e.changedTouches[0].clientY - touchY;
      if (Math.abs(dx) > 46 && Math.abs(dx) > Math.abs(dy)) go(dx < 0 ? 1 : -1);
    },
    { passive: true }
  );

  /* keep the reveal classes on the wall consistent with the rest of the site */
  if (!reduce) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { rootMargin: "0px 0px -6% 0px", threshold: 0.06 }
    );
    document.querySelectorAll(".artist, .wall-foot").forEach(function (el) {
      el.classList.add("js-reveal");
      el.style.setProperty("--reveal-y", "18px");
      io.observe(el);
    });
  }

  /* the cobalt wall line fills as you read down the register */
  var wallLine = document.querySelector(".wall-line i");
  if (wallLine && !reduce && window.gsap && window.ScrollTrigger) {
    gsap.fromTo(
      wallLine,
      { scaleY: 0 },
      {
        scaleY: 1,
        ease: "none",
        scrollTrigger: { trigger: ".wall", start: "top 78%", end: "bottom 70%", scrub: 0.5 }
      }
    );
  }
})();
