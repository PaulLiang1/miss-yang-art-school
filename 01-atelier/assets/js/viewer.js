/* Little Artists — keyboard-accessible artwork viewer.
   Plain script, no modules, no dependencies. Works from file://. */
(function () {
  'use strict';

  var dialog = document.querySelector('dialog.viewer');
  if (!dialog) return;

  var works = Array.prototype.slice.call(document.querySelectorAll('.work[data-i]'));
  if (!works.length) return;

  var stage = dialog.querySelector('.viewer-stage');
  var img = dialog.querySelector('.viewer-img');
  var nameEl = dialog.querySelector('.viewer-name');
  var metaEl = dialog.querySelector('.viewer-meta');
  var controls = dialog.querySelector('.viewer-ctrl');
  var opener = null;
  var current = 0;

  function render(index) {
    current = (index + works.length) % works.length;
    var work = works[current];
    var source = work.querySelector('img');
    img.src = source.getAttribute('src');
    img.alt = source.getAttribute('alt') || '';
    nameEl.textContent = work.getAttribute('data-name') + ', ' + work.getAttribute('data-age');
    metaEl.textContent = 'Artwork ' + work.getAttribute('data-n') + ' of 2 · 第' + work.getAttribute('data-n') + '幅，共2幅';
    works[current].setAttribute('aria-current', 'true');
    works.forEach(function (other, i) {
      if (i !== current) other.removeAttribute('aria-current');
    });
  }

  function open(index, trigger) {
    opener = trigger;
    render(index);
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    document.documentElement.classList.add('is-viewing');
    var first = controls.querySelector('button');
    if (first) first.focus();
  }

  function close() {
    if (dialog.open && typeof dialog.close === 'function') {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
    }
    afterClose();
  }

  /* Idempotent: called by our own close() and again by the native close event. */
  function afterClose() {
    document.documentElement.classList.remove('is-viewing');
    if (!opener) return;
    var target = opener;
    opener = null;
    if (typeof target.focus === 'function') {
      setTimeout(function () { target.focus(); }, 0);
    }
  }

  works.forEach(function (work) {
    work.addEventListener('click', function () {
      open(parseInt(work.getAttribute('data-i'), 10), work);
    });
  });

  controls.addEventListener('click', function (event) {
    var button = event.target.closest('button[data-act]');
    if (!button) return;
    var action = button.getAttribute('data-act');
    if (action === 'prev') render(current - 1);
    else if (action === 'next') render(current + 1);
    else if (action === 'close') close();
  });

  /* Click the dark stage around the image closes; clicking the image itself does not. */
  stage.addEventListener('click', function (event) {
    if (event.target === stage) close();
  });

  dialog.addEventListener('click', function (event) {
    if (event.target === dialog) close();
  });

  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      render(current - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      render(current + 1);
    }
  });

  /* Esc: take over the cancel so the page is always unlocked and focus restored,
     even if the browser delays the close event. */
  dialog.addEventListener('cancel', function (event) {
    event.preventDefault();
    close();
  });

  /* Fallback for browsers that close the dialog without firing cancel. */
  dialog.addEventListener('close', afterClose);
})();
