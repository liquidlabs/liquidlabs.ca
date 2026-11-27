document.addEventListener('DOMContentLoaded', () => {
  const header = document.getElementById('header');
  const backToTop = document.querySelector('.back-to-top');
  const hero = document.getElementById('hero') || document.getElementById('privacy-hero');

  // Fixed header and Back to top button via IntersectionObserver
  if (hero && (header || backToTop)) {
    const scrollObserver = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        const scrolledPastHero = !entry.isIntersecting;
        if (header) {
          header.classList.toggle('header-fixed', scrolledPastHero);
        }
        if (backToTop) {
          backToTop.classList.toggle('is-visible', scrolledPastHero);
        }
      },
      { threshold: 0.1 }
    );
    scrollObserver.observe(hero);
  }

  // Native <dialog> mobile navigation drawer
  const mobileToggle = document.getElementById('mobile-nav-toggle');
  const mobileDialog = document.getElementById('mobile-nav-dialog');
  const mobileClose = document.getElementById('mobile-nav-close');

  if (mobileToggle && mobileDialog) {
    const openDrawer = () => {
      mobileDialog.showModal();
      mobileToggle.setAttribute('aria-expanded', 'true');
    };

    const closeDrawer = () => {
      if (mobileDialog.open) {
        mobileDialog.close();
      }
      mobileToggle.setAttribute('aria-expanded', 'false');
    };

    mobileToggle.addEventListener('click', () => {
      if (mobileDialog.open) {
        closeDrawer();
      } else {
        openDrawer();
      }
    });

    if (mobileClose) {
      mobileClose.addEventListener('click', closeDrawer);
    }

    // Light-dismiss on backdrop click
    mobileDialog.addEventListener('click', (event) => {
      if (event.target === mobileDialog) {
        closeDrawer();
      }
    });

    mobileDialog.addEventListener('close', () => {
      mobileToggle.setAttribute('aria-expanded', 'false');
    });

    // Close drawer when navigating via any link inside it
    mobileDialog.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeDrawer);
    });
  }

  // Update active nav item on click
  document.querySelectorAll('.nav-menu a').forEach((link) => {
    link.addEventListener('click', () => {
      const activeItem = document.querySelector('.nav-menu .menu-active');
      if (activeItem) {
        activeItem.classList.remove('menu-active');
      }
      const parentLi = link.closest('li');
      if (parentLi) {
        parentLi.classList.add('menu-active');
      }
    });
  });

  // Facts counter animation using IntersectionObserver
  const counters = document.querySelectorAll('[data-toggle="counter-up"]');
  if (counters.length > 0) {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const animateCounter = (el) => {
      const rawText = el.textContent.trim();
      const targetValue = parseInt(rawText.replace(/,/g, ''), 10);
      if (Number.isNaN(targetValue) || prefersReducedMotion) {
        return;
      }

      const hasCommas = rawText.includes(',');
      const duration = 1000;
      const startTime = performance.now();

      const step = (now) => {
        const progress = Math.min((now - startTime) / duration, 1);
        const current = Math.floor(progress * targetValue);
        el.textContent = hasCommas ? current.toLocaleString('en-US') : String(current);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = rawText;
        }
      };

      requestAnimationFrame(step);
    };

    const counterObserver = new IntersectionObserver(
      (entries, observer) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            animateCounter(entry.target);
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.3 }
    );

    counters.forEach((counter) => counterObserver.observe(counter));
  }

  // Cookie consent functionality
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptCookieBtn = document.getElementById('accept-cookies');
  const declineCookieBtn = document.getElementById('decline-cookies');

  if (cookieBanner && acceptCookieBtn && declineCookieBtn) {
    if (!localStorage.getItem('cookiesAccepted') && !localStorage.getItem('cookiesDeclined')) {
      cookieBanner.style.display = 'block';
    }

    acceptCookieBtn.addEventListener('click', () => {
      localStorage.setItem('cookiesAccepted', 'true');
      localStorage.removeItem('cookiesDeclined');
      cookieBanner.style.display = 'none';
    });

    declineCookieBtn.addEventListener('click', () => {
      localStorage.setItem('cookiesDeclined', 'true');
      localStorage.removeItem('cookiesAccepted');
      cookieBanner.style.display = 'none';
    });
  }
});
