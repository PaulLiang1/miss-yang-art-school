/* Miss Yang's Art School — version 7
   Progressive page behaviour. The horizontal stage rail is driven by GSAP
   where available; the gallery page keeps version 6's viewer and swipe. */
(function () {
  "use strict";

  var $ = function (selector, root) { return (root || document).querySelector(selector); };
  var $$ = function (selector, root) { return Array.prototype.slice.call((root || document).querySelectorAll(selector)); };
  var html = document.documentElement;
  var reduce = html.classList.contains("reduce") || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  var hasGSAP = typeof window.gsap !== "undefined" && typeof window.ScrollTrigger !== "undefined";

  /* ---------- mobile menu ---------- */
  var menuToggle = $("#menu-toggle");
  var siteNav = $("#site-nav");

  function closeMenu(returnFocus) {
    if (!menuToggle || !siteNav) return;
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
    if (returnFocus) menuToggle.focus();
  }

  if (menuToggle && siteNav) {
    menuToggle.addEventListener("click", function () {
      var isOpen = menuToggle.getAttribute("aria-expanded") === "true";
      if (isOpen) {
        closeMenu(true);
        return;
      }
      menuToggle.setAttribute("aria-expanded", "true");
      menuToggle.setAttribute("aria-label", "Close navigation");
      siteNav.classList.add("is-open");
      var first = siteNav.querySelector("a");
      if (first) requestAnimationFrame(function () { first.focus(); });
    });

    siteNav.addEventListener("click", function (event) {
      if (event.target.closest("a")) closeMenu(false);
    });

    document.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && menuToggle.getAttribute("aria-expanded") === "true") {
        closeMenu(true);
      }
    });

    var navMedia = window.matchMedia("(max-width: 980px)");
    var handleNavMedia = function () { if (!navMedia.matches) closeMenu(false); };
    if (navMedia.addEventListener) navMedia.addEventListener("change", handleNavMedia);
    else if (navMedia.addListener) navMedia.addListener(handleNavMedia);
  }

  /* ---------- reveal ---------- */
  var revealItems = $$(".section-head, .room-card, .about-grid > *, .teach-list li, .fee-table tbody tr, .reward, .projects-figure, .beyond-card, .contact-details > div");
  if (!reduce && "IntersectionObserver" in window && revealItems.length) {
    var revealObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-in");
        revealObserver.unobserve(entry.target);
      });
    }, { threshold: 0.1, rootMargin: "0px 0px -6% 0px" });

    revealItems.forEach(function (item) {
      item.classList.add("v7-reveal");
      revealObserver.observe(item);
    });
  }

  /* ---------- active section in nav ---------- */
  var navLinks = siteNav ? $$("a[href^='#']", siteNav) : [];
  if (navLinks.length && "IntersectionObserver" in window) {
    var sectionLinks = new Map();
    navLinks.forEach(function (link) {
      var section = document.getElementById(link.getAttribute("href").slice(1));
      if (section) sectionLinks.set(section, link);
    });
    if (sectionLinks.size) {
      var navObserver = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          navLinks.forEach(function (link) { link.classList.remove("is-active"); });
          var active = sectionLinks.get(entry.target);
          if (active) active.classList.add("is-active");
        });
      }, { rootMargin: "-28% 0px -64% 0px", threshold: 0 });
      sectionLinks.forEach(function (_, section) { navObserver.observe(section); });
    }
  }

  /* ---------- horizontal stage rail ---------- */
  var stageSection = $(".stage-section");
  var stageViewport = $("#stage-viewport");
  var stageTrack = $("#stage-track");
  var stageFill = $("#stage-wire-fill");
  var stageDot = $("#stage-wire-dot");

  function linearStageProgress() {
    if (!stageViewport || !stageFill) return;
    var max = stageViewport.scrollWidth - stageViewport.clientWidth;
    var p = max > 0 ? Math.min(1, Math.max(0, stageViewport.scrollLeft / max)) : 1;
    stageFill.style.transform = "scaleX(" + p + ")";
    if (stageDot) {
      var travel = Math.max(0, stageFill.parentElement.clientWidth - 7);
      stageDot.style.transform = "translateX(" + (p * travel) + "px)";
    }
  }

  if (stageTrack && stageViewport && stageSection) {
    if (!hasGSAP || reduce) {
      /* No motion layer: the rail stays natively scrollable instead of hiding work. */
      stageSection.classList.remove("is-pinned");
      stageViewport.addEventListener("scroll", linearStageProgress, { passive: true });
      window.addEventListener("resize", linearStageProgress);
      linearStageProgress();
    } else {
      /* Vertical page scroll drives the horizontal rail at every viewport size. */
      window.ScrollTrigger.config({ ignoreMobileResize: true });
      var stageMedia = window.gsap.matchMedia();
      stageMedia.add("(min-width: 1px)", function () {
        stageSection.classList.add("is-pinned");
        var distance = function () { return Math.max(0, stageTrack.scrollWidth - stageViewport.clientWidth); };
        if (distance() < 8) {
          stageSection.classList.remove("is-pinned");
          return;
        }

        var xTo = window.gsap.to(stageTrack, {
          x: function () { return -distance(); },
          ease: "none",
          scrollTrigger: {
            trigger: stageSection,
            start: "top top",
            end: function () { return "+=" + Math.round(distance() * 1.12); },
            pin: ".stage-pin",
            pinSpacing: true,
            scrub: 0.65,
            anticipatePin: 1,
            invalidateOnRefresh: true
          }
        });
        var fillTo = stageFill ? window.gsap.to(stageFill, {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: stageSection,
            start: "top top",
            end: function () { return "+=" + Math.round(distance() * 1.12); },
            scrub: 0.65,
            invalidateOnRefresh: true
          }
        }) : null;
        var dotTo = stageDot ? window.gsap.to(stageDot, {
          x: function () { return Math.max(0, stageFill.parentElement.clientWidth - 7); },
          ease: "none",
          scrollTrigger: {
            trigger: stageSection,
            start: "top top",
            end: function () { return "+=" + Math.round(distance() * 1.12); },
            scrub: 0.65,
            invalidateOnRefresh: true
          }
        }) : null;

        return function () {
          stageSection.classList.remove("is-pinned");
          if (xTo) xTo.kill();
          if (fillTo) fillTo.kill();
          if (dotTo) dotTo.kill();
          window.gsap.set(stageTrack, { clearProps: "transform" });
          if (stageFill) window.gsap.set(stageFill, { clearProps: "transform" });
          if (stageDot) window.gsap.set(stageDot, { clearProps: "transform" });
        };
      });

      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(function () { window.ScrollTrigger.refresh(); });
      }
    }
  }

  /* ---------- Little Artists horizontal wall ---------- */
  var galleryRail = $("#artists-rail");
  if (galleryRail) {
    var prev = $("#gallery-prev");
    var next = $("#gallery-next");
    var progress = $("#gallery-progress");
    var step = function () {
      var first = galleryRail.querySelector(".artist");
      if (!first) return 0;
      var styles = window.getComputedStyle(galleryRail);
      var gap = parseFloat(styles.columnGap || styles.gap || "0") || 0;
      return first.getBoundingClientRect().width + gap;
    };
    var updateGalleryProgress = function () {
      var max = galleryRail.scrollWidth - galleryRail.clientWidth;
      var p = max > 0 ? Math.min(1, Math.max(0, galleryRail.scrollLeft / max)) : 1;
      if (progress) progress.style.transform = "scaleX(" + Math.max(0.06, p) + ")";
      if (prev) prev.disabled = galleryRail.scrollLeft <= 2;
      if (next) next.disabled = galleryRail.scrollLeft >= max - 2;
    };
    var scrollRail = function (direction) {
      galleryRail.scrollBy({ left: direction * step(), behavior: reduce ? "auto" : "smooth" });
    };

    if (prev) prev.addEventListener("click", function () { scrollRail(-1); });
    if (next) next.addEventListener("click", function () { scrollRail(1); });
    galleryRail.addEventListener("scroll", updateGalleryProgress, { passive: true });
    window.addEventListener("resize", updateGalleryProgress);
    window.addEventListener("load", updateGalleryProgress);
    updateGalleryProgress();

    /* Pointer drag for a mouse, while leaving every work as a normal button. */
    var dragging = false;
    var dragStart = 0;
    var dragLeft = 0;
    galleryRail.addEventListener("pointerdown", function (event) {
      if (event.pointerType !== "mouse" || event.button !== 0 || event.target.closest(".work")) return;
      dragging = true;
      dragStart = event.clientX;
      dragLeft = galleryRail.scrollLeft;
      galleryRail.classList.add("is-dragging");
      if (galleryRail.setPointerCapture) galleryRail.setPointerCapture(event.pointerId);
    });
    galleryRail.addEventListener("pointermove", function (event) {
      if (!dragging) return;
      galleryRail.scrollLeft = dragLeft - (event.clientX - dragStart);
      event.preventDefault();
    });
    var releaseDrag = function (event) {
      if (!dragging) return;
      dragging = false;
      galleryRail.classList.remove("is-dragging");
      if (event && event.pointerId && galleryRail.hasPointerCapture && galleryRail.hasPointerCapture(event.pointerId)) {
        galleryRail.releasePointerCapture(event.pointerId);
      }
    };
    galleryRail.addEventListener("pointerup", releaseDrag);
    galleryRail.addEventListener("pointercancel", releaseDrag);
    galleryRail.addEventListener("dragstart", function (event) { event.preventDefault(); });
  }
})();
