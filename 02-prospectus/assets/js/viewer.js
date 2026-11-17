// Artwork viewer for the Little Artists wall.
// Click a work to enlarge it; arrow keys or the buttons move between works;
// Escape or Close returns to the wall and restores focus to the work opened.
(function () {
  "use strict";

  var dialog = document.querySelector("dialog.lb");
  var works = Array.prototype.slice.call(document.querySelectorAll(".wall .work"));
  if (!dialog || !works.length || typeof dialog.showModal !== "function") return;

  var img = dialog.querySelector(".lb-stage img");
  var nameEl = dialog.querySelector(".lb-name");
  var ageEl = dialog.querySelector(".lb-age");
  var countEl = dialog.querySelector(".lb-count");
  var opener = null;
  var current = 0;
  var total = works.length;

  function pad(n) {
    return (n < 10 ? "0" : "") + n;
  }

  function show(i) {
    current = (i + total) % total;
    var button = works[current];
    var source = button.querySelector("img");
    img.src = source.currentSrc || source.src;
    img.alt = source.alt;
    nameEl.textContent = button.dataset.name;
    ageEl.textContent = button.dataset.age;
    countEl.textContent = pad(current + 1) + " / " + pad(total);
  }

  function open(i, button) {
    opener = button;
    show(i);
    document.documentElement.classList.add("lb-open");
    dialog.showModal();
  }

  works.forEach(function (button, i) {
    button.addEventListener("click", function () {
      open(i, button);
    });
  });

  dialog.addEventListener("click", function (e) {
    var action = e.target.closest("[data-act]");
    if (action) {
      var act = action.dataset.act;
      if (act === "prev") show(current - 1);
      if (act === "next") show(current + 1);
      if (act === "close") dialog.close();
      return;
    }
    // Clicking the empty stage around the artwork closes the viewer.
    if (e.target.classList.contains("lb-stage")) dialog.close();
  });

  dialog.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      show(current - 1);
    }
    if (e.key === "ArrowRight") {
      e.preventDefault();
      show(current + 1);
    }
    if (e.key === "Home") {
      e.preventDefault();
      show(0);
    }
    if (e.key === "End") {
      e.preventDefault();
      show(total - 1);
    }
  });

  dialog.addEventListener("close", function () {
    document.documentElement.classList.remove("lb-open");
    img.removeAttribute("src");
    if (opener) opener.focus();
  });
})();
