/* Miss Yang’s Art School · 03-scrapbook
   Gallery viewer: a paper slip lifts out of the sketchbook page.
   No modules, no fetch, no dependencies. */

(function () {
  'use strict';

  var dialog = document.querySelector('.viewer');
  if (!dialog) return;

  var buttons = Array.prototype.slice.call(document.querySelectorAll('.work[data-work]'));
  if (!buttons.length) return;

  var img = dialog.querySelector('.viewer__img');
  var figure = dialog.querySelector('.viewer__figure');
  var nameEl = dialog.querySelector('.viewer__name');
  var ageEl = dialog.querySelector('.viewer__age');
  var metaEl = dialog.querySelector('.viewer__meta');
  var indexEl = dialog.querySelector('.viewer__index');
  var closeBtn = dialog.querySelector('[data-act="close"]');

  var current = 0;
  var opener = null;
  var total = buttons.length;

  function pad(n) {
    return (n < 10 ? '0' : '') + n;
  }

  function paint(i) {
    current = (i + total) % total;
    var button = buttons[current];
    var thumb = button.querySelector('img');
    if (!thumb) return;

    if (img.getAttribute('src') !== thumb.getAttribute('src')) {
      img.setAttribute('src', thumb.getAttribute('src'));
    }
    img.setAttribute('alt', thumb.getAttribute('alt') || '');
    if (thumb.getAttribute('width')) img.setAttribute('width', thumb.getAttribute('width'));
    if (thumb.getAttribute('height')) img.setAttribute('height', thumb.getAttribute('height'));

    // restart the lift animation on every change
    img.style.animation = 'none';
    // force reflow so the animation can replay
    void img.offsetWidth;
    img.style.animation = '';

    nameEl.textContent = button.getAttribute('data-name') || '';
    ageEl.textContent = 'age ' + (button.getAttribute('data-age') || '');
    metaEl.textContent = 'Work ' + (button.getAttribute('data-n') || '1') + ' of 2';
    indexEl.textContent = pad(current + 1) + ' / ' + pad(total);
    figure.setAttribute('aria-label', 'Artwork ' + (current + 1) + ' of ' + total);
  }

  function open(button) {
    opener = button;
    paint(buttons.indexOf(button));
    if (typeof dialog.showModal === 'function') {
      dialog.showModal();
    } else {
      dialog.setAttribute('open', '');
    }
    if (closeBtn) closeBtn.focus();
  }

  function close() {
    if (dialog.open) {
      dialog.close();
    } else {
      dialog.removeAttribute('open');
      restoreFocus();
    }
  }

  function restoreFocus() {
    if (opener && typeof opener.focus === 'function') {
      opener.focus();
    }
    opener = null;
  }

  buttons.forEach(function (button) {
    button.addEventListener('click', function () {
      open(button);
    });
  });

  dialog.querySelectorAll('[data-act]').forEach(function (control) {
    control.addEventListener('click', function (event) {
      event.preventDefault();
      var act = control.getAttribute('data-act');
      if (act === 'prev') paint(current - 1);
      if (act === 'next') paint(current + 1);
      if (act === 'close') close();
    });
  });

  // clicking the dark room (but not the work, the caption or the controls) closes the viewer
  dialog.addEventListener('click', function (event) {
    if (event.target === dialog || event.target === dialog.querySelector('.viewer__stage')) {
      close();
    }
  });

  dialog.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      paint(current - 1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      paint(current + 1);
    } else if (event.key === 'Home') {
      event.preventDefault();
      paint(0);
    } else if (event.key === 'End') {
      event.preventDefault();
      paint(total - 1);
    }
  });

  if (typeof dialog.showModal === 'function') {
    dialog.addEventListener('close', restoreFocus);
  } else {
    dialog.addEventListener('keydown', function (event) {
      if (event.key === 'Escape') {
        event.preventDefault();
        close();
      }
    });
  }

  // if the browser restores the dialog open on back/forward, close it
  window.addEventListener('pageshow', function () {
    if (dialog.open) {
      dialog.close();
    }
  });
})();
