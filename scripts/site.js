'use strict';

(function () {
  function attachImageFallbacks() {
    document.querySelectorAll('img[data-fallback]').forEach((image) => {
      image.addEventListener(
        'error',
        () => {
          if (image.getAttribute('src') !== image.dataset.fallback) {
            image.setAttribute('src', image.dataset.fallback);
          }
        },
        { once: true }
      );
    });
  }

  function setupMobileNavigation() {
    const navToggle = document.querySelector('[data-nav-toggle]');
    const mobileNav = document.getElementById('mobile-nav');

    if (!navToggle || !mobileNav) {
      return;
    }

    const closeMenu = () => {
      navToggle.setAttribute('aria-expanded', 'false');
      mobileNav.hidden = true;
    };

    navToggle.addEventListener('click', () => {
      const expanded = navToggle.getAttribute('aria-expanded') === 'true';
      navToggle.setAttribute('aria-expanded', String(!expanded));
      mobileNav.hidden = expanded;
    });

    mobileNav.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !mobileNav.hidden) {
        closeMenu();
        navToggle.focus();
      }
    });
  }

  attachImageFallbacks();
  setupMobileNavigation();
})();
