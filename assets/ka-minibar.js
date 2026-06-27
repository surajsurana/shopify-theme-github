/**
 * K&A Product Page — Sticky Mini Bar
 *
 * Slides down from the top when the main "Add to Bag" button
 * group scrolls out of view. Uses IntersectionObserver for
 * optimal performance — zero scroll event listeners.
 *
 * Accessibility:
 *   - aria-hidden toggled on the minibar element
 *   - Clicking mini-bar ATC scrolls to + focuses main button
 */
(function () {
  'use strict';

  var MINIBAR_ID  = 'KAMinibar';
  var SENTINEL_ID = 'KAMinibarSentinel';

  function initMinibar() {
    var minibar  = document.getElementById(MINIBAR_ID);
    var sentinel = document.getElementById(SENTINEL_ID);

    if (!minibar || !sentinel) return;

    /* ── IntersectionObserver ────────────────────────────────── */
    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          var show = !entry.isIntersecting;
          minibar.classList.toggle('ka-minibar--visible', show);
          minibar.setAttribute('aria-hidden', show ? 'false' : 'true');
        });
      },
      { threshold: 0, rootMargin: '0px 0px 0px 0px' }
    );

    observer.observe(sentinel);

    /* ── Mini-bar ATC: scroll to main form ───────────────────── */
    var minibarAtc = minibar.querySelector('.ka-minibar__btn--primary');
    if (minibarAtc) {
      minibarAtc.addEventListener(
        'click',
        function () {
          var buyButtons = document.querySelector('.product-form__buttons');
          if (!buyButtons) return;

          buyButtons.scrollIntoView({ behavior: 'smooth', block: 'center' });

          /* Focus visible ATC after scroll completes */
          setTimeout(function () {
            var mainAtc = buyButtons.querySelector(
              '.product-form__submit:not([disabled])'
            );
            if (mainAtc) mainAtc.focus({ preventScroll: true });
          }, 600);
        },
        { passive: true }
      );
    }
  }

  /* Run after DOM is ready */
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMinibar);
  } else {
    initMinibar();
  }
}());
