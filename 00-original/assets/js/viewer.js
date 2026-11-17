// Lightbox for the gallery pages: opens an artwork larger, with previous / next and keyboard support.
(function () {
  var dlg = document.querySelector("dialog.viewer");
  var buttons = Array.prototype.slice.call(document.querySelectorAll(".pair button"));
  if (!dlg || !buttons.length || typeof dlg.showModal !== "function") return;

  var img = dlg.querySelector("img");
  var cap = dlg.querySelector(".viewer-cap");
  var current = 0;
  var opener = null;

  function show(i) {
    current = (i + buttons.length) % buttons.length;
    var b = buttons[current];
    var src = b.querySelector("img");
    img.src = src.currentSrc || src.src;
    img.alt = src.alt;
    cap.textContent = "";
    cap.append(b.dataset.name);
    var age = document.createElement("span");
    age.className = "age";
    age.textContent = b.dataset.age;
    cap.append(age);
    var small = document.createElement("small");
    small.textContent = "Artwork " + b.dataset.n + " of 2  /  第" + b.dataset.n + "幅，共2幅";
    cap.append(small);
  }

  buttons.forEach(function (b, i) {
    b.addEventListener("click", function () {
      opener = b;
      show(i);
      dlg.showModal();
    });
  });

  dlg.addEventListener("click", function (e) {
    var act = e.target.closest("[data-act]");
    if (act) {
      var a = act.dataset.act;
      if (a === "prev") show(current - 1);
      if (a === "next") show(current + 1);
      if (a === "close") dlg.close();
      return;
    }
    if (e.target === dlg) dlg.close(); // click on backdrop
  });

  dlg.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); show(current - 1); }
    if (e.key === "ArrowRight") { e.preventDefault(); show(current + 1); }
  });

  dlg.addEventListener("close", function () {
    if (opener) opener.focus();
  });
})();
