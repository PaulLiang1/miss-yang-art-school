/* 05-ink artwork viewer.
   Every .work button on the Little Artists wall opens one rice-paper
   sheet; arrows and Esc are handled here, focus returns to the work. */
(function () {
  "use strict";

  var dlg = document.querySelector("dialog.viewer");
  var works = Array.prototype.slice.call(document.querySelectorAll(".work"));
  if (!dlg || !works.length) return;

  var img = dlg.querySelector(".viewer-img");
  var caption = dlg.querySelector(".viewer-cap");
  var prev = dlg.querySelector('[data-act="prev"]');
  var next = dlg.querySelector('[data-act="next"]');
  var close = dlg.querySelector('[data-act="close"]');
  var current = -1;
  var opener = null;

  function show(index) {
    if (index < 0) index = works.length - 1;
    if (index >= works.length) index = 0;
    current = index;

    var btn = works[index];
    var source = btn.querySelector("img");
    var name = btn.getAttribute("data-name") || "";
    var age = btn.getAttribute("data-age") || "";
    var n = btn.getAttribute("data-n") || "1";
    var total = btn.closest(".pair") ? btn.closest(".pair").querySelectorAll(".work").length : 1;

    img.src = source.getAttribute("src");
    img.alt = source.getAttribute("alt") || "";
    img.setAttribute("width", source.getAttribute("width") || "");
    img.setAttribute("height", source.getAttribute("height") || "");

    caption.textContent = "";
    var who = document.createElement("span");
    who.textContent = name;
    var yrs = document.createElement("span");
    yrs.className = "age";
    yrs.textContent = age;
    var line = document.createElement("small");
    line.textContent = "Artwork " + n + " of " + total + " / 第" + n + "幅，共" + total + "幅";
    caption.appendChild(who);
    caption.appendChild(yrs);
    caption.appendChild(line);

    dlg.setAttribute("aria-label", "Artwork " + n + " of " + total + " by " + name + ", " + age);
    prev.disabled = false;
    next.disabled = false;
  }

  function open(index, button) {
    opener = button;
    show(index);
    if (typeof dlg.showModal === "function") {
      dlg.showModal();
    } else {
      dlg.setAttribute("open", "");
    }
    close.focus();
  }

  function shut() {
    if (dlg.open && typeof dlg.close === "function") {
      dlg.close();
    } else {
      dlg.removeAttribute("open");
      if (opener) opener.focus();
    }
  }

  works.forEach(function (btn, i) {
    btn.addEventListener("click", function () {
      open(i, btn);
    });
  });

  prev.addEventListener("click", function () { show(current - 1); });
  next.addEventListener("click", function () { show(current + 1); });
  close.addEventListener("click", shut);

  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      show(current - 1);
      prev.focus();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      show(current + 1);
      next.focus();
    }
  });

  dlg.addEventListener("click", function (e) {
    if (e.target === dlg) shut();
  });

  dlg.addEventListener("close", function () {
    if (opener) opener.focus();
  });
})();
