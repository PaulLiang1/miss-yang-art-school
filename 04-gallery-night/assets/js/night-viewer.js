/* Miss Yang’s Art School — version 04 “After Hours”
   Lightbox for the Little Artists wall: one work under one light.
   Keeps the seeded viewer behaviour: click a work for a larger view,
   ← / → to move through the room, Esc or the close button to leave,
   a click on the dark stage closes it, and focus returns to the thumbnail. */
(function () {
  "use strict";

  var dlg = document.querySelector("dialog.viewer");
  if (!dlg || typeof dlg.showModal !== "function") return;

  var works = Array.prototype.slice.call(document.querySelectorAll(".wall .pair button"));
  if (!works.length) return;

  var big = dlg.querySelector(".viewer-img");
  var nameEl = dlg.querySelector(".cap-name");
  var descEl = dlg.querySelector(".cap-desc");
  var countEl = dlg.querySelector(".cap-count");
  if (!big || !nameEl || !descEl || !countEl) return;

  var index = 0;
  var opener = null;
  var total = works.length;

  function span(cls, text, lang) {
    var el = document.createElement("span");
    el.className = cls;
    if (lang) el.lang = lang;
    el.textContent = text;
    return el;
  }

  function paint() {
    var b = works[index];
    var thumb = b.querySelector("img");
    if (!thumb) return;

    var name = b.getAttribute("data-name") || "";
    var age = b.getAttribute("data-age") || "";
    var desc = b.getAttribute("data-desc") || "";
    var descZh = b.getAttribute("data-desc-zh") || "";

    nameEl.textContent = name;
    if (age) {
      var page = span("page", " Age " + age + " · ");
      page.appendChild(span("zh-inline", age + "岁", "zh-Hans"));
      nameEl.appendChild(page);
    }

    descEl.textContent = desc;
    if (descZh) {
      descEl.appendChild(document.createElement("br"));
      descEl.appendChild(span("zh", descZh, "zh-Hans"));
    }

    countEl.textContent = "Artwork " + (index + 1) + " of " + total +
      " · 第" + (index + 1) + "幅，共" + total + "幅";

    big.src = thumb.currentSrc || thumb.src;
    big.alt = thumb.alt;
    var w = thumb.getAttribute("width");
    var h = thumb.getAttribute("height");
    if (w) big.setAttribute("width", w);
    if (h) big.setAttribute("height", h);
  }

  function show(i) {
    index = (i % total + total) % total;
    paint();
  }

  function settle() {
    document.documentElement.classList.remove("viewer-open");
    if (opener) {
      var back = opener;
      opener = null;
      if (back && back.focus) back.focus();
    }
  }

  function closeViewer() {
    dlg.close();
    settle();
  }

  function open(button) {
    opener = button;
    show(works.indexOf(button));
    dlg.showModal();
    document.documentElement.classList.add("viewer-open");
  }

  works.forEach(function (button) {
    button.addEventListener("click", function () {
      open(button);
    });
  });

  dlg.addEventListener("click", function (e) {
    var act = e.target.closest("[data-act]");
    if (act) {
      var name = act.getAttribute("data-act");
      if (name === "prev") { show(index - 1); return; }
      if (name === "next") { show(index + 1); return; }
      closeViewer();
      return;
    }
    var keep = e.target.closest(".viewer-img, .viewer-bar");
    if (!keep) closeViewer();
  });

  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); show(index - 1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); show(index + 1); }
    else if (e.key === "Escape") { e.preventDefault(); closeViewer(); }
  });

  dlg.addEventListener("close", settle);
})();
