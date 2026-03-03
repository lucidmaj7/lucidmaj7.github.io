/* ==========================================================================
   Site — Scroll Reveal, Navigation, Kinetic Typography, Smooth Scroll
   No external dependencies. Vanilla ES5+ compatible.
   ========================================================================== */

(function () {
  'use strict';

  /* -----------------------------------------------------------------------
     Reduced Motion Preference
     ----------------------------------------------------------------------- */
  var prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  /* -----------------------------------------------------------------------
     1. Scroll Reveal with IntersectionObserver
     Observes all .reveal elements and adds .is-visible when they
     enter the viewport. Respects reduced-motion preference.
     ----------------------------------------------------------------------- */
  function initScrollReveal() {
    var revealElements = document.querySelectorAll('.reveal');

    if (!revealElements.length) return;

    /* If user prefers reduced motion, show everything immediately */
    if (prefersReducedMotion) {
      revealElements.forEach(function (el) {
        el.classList.add('is-visible');
      });
      return;
    }

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target); /* Animate once */
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px',
      }
    );

    revealElements.forEach(function (el) {
      observer.observe(el);
    });
  }

  /* -----------------------------------------------------------------------
     2. Navigation Scroll Behavior
     Adds .site-nav--scrolled class when the page is scrolled past 50px.
     Uses requestAnimationFrame for debouncing.
     ----------------------------------------------------------------------- */
  function initNavScroll() {
    var nav = document.querySelector('.site-nav');

    if (!nav) return;

    var ticking = false;

    function updateNav() {
      if (window.scrollY > 50) {
        nav.classList.add('site-nav--scrolled');
      } else {
        nav.classList.remove('site-nav--scrolled');
      }
      ticking = false;
    }

    window.addEventListener(
      'scroll',
      function () {
        if (!ticking) {
          window.requestAnimationFrame(updateNav);
          ticking = true;
        }
      },
      { passive: true }
    );

    /* Check initial state (page may already be scrolled on load) */
    updateNav();
  }

  /* -----------------------------------------------------------------------
     3a. Kinetic Typography
     Finds all elements with [data-kinetic], splits their text content
     into words, wraps each in a <span class="hero-word">, and staggers
     the .is-visible class with 50ms delays per word.
     ----------------------------------------------------------------------- */
  function initKineticTypography() {
    var elements = document.querySelectorAll('[data-kinetic]');

    if (!elements.length) return;

    elements.forEach(function (el) {
      var text = el.textContent.trim();
      var words = text.split(/\s+/);

      /* Clear original text and rebuild with wrapped words */
      el.innerHTML = '';

      words.forEach(function (word, index) {
        var span = document.createElement('span');
        span.className = 'hero-word';
        span.textContent = word;
        el.appendChild(span);

        /* Add a space after each word except the last */
        if (index < words.length - 1) {
          el.appendChild(document.createTextNode(' '));
        }
      });

      /* If reduced motion, show all immediately */
      if (prefersReducedMotion) {
        el.querySelectorAll('.hero-word').forEach(function (word) {
          word.classList.add('is-visible');
        });
        return;
      }

      /* Stagger visibility with IntersectionObserver */
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              var heroWords = entry.target.querySelectorAll('.hero-word');
              heroWords.forEach(function (word, i) {
                setTimeout(function () {
                  word.classList.add('is-visible');
                }, i * 50);
              });
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(el);
    });
  }

  /* -----------------------------------------------------------------------
     3b. Typewriter Effect
     Finds all elements with [data-typewriter], types out the text
     character by character with a blinking cursor.
     ----------------------------------------------------------------------- */
  function initTypewriter() {
    var elements = document.querySelectorAll('[data-typewriter]');

    if (!elements.length) return;

    elements.forEach(function (el) {
      var text = el.textContent.trim();
      var speed = parseInt(el.getAttribute('data-typewriter'), 10) || 80;

      /* Clear text, add cursor */
      el.textContent = '';
      var cursor = document.createElement('span');
      cursor.className = 'typewriter-cursor';
      cursor.setAttribute('aria-hidden', 'true');
      el.appendChild(cursor);

      /* If reduced motion, show all immediately */
      if (prefersReducedMotion) {
        el.insertBefore(document.createTextNode(text), cursor);
        cursor.classList.add('typewriter-cursor--hidden');
        return;
      }

      var charIndex = 0;

      function typeChar() {
        if (charIndex < text.length) {
          el.insertBefore(document.createTextNode(text[charIndex]), cursor);
          charIndex++;
          setTimeout(typeChar, speed);
        } else {
          /* Typing done — blink cursor a few times, then hide */
          setTimeout(function () {
            cursor.classList.add('typewriter-cursor--hidden');
          }, 2000);
          /* Reveal subtitle after typing */
          var sub = document.getElementById('heroSub');
          if (sub) {
            setTimeout(function () {
              sub.classList.add('is-visible');
            }, 300);
          }
        }
      }

      /* Start typing when element is in view */
      var observer = new IntersectionObserver(
        function (entries) {
          entries.forEach(function (entry) {
            if (entry.isIntersecting) {
              setTimeout(typeChar, 400); /* Small initial delay */
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.2 }
      );

      observer.observe(el);
    });
  }

  /* -----------------------------------------------------------------------
     4. Smooth Scroll for Anchor Links
     Intercepts clicks on in-page anchor links and scrolls smoothly
     to the target element.
     ----------------------------------------------------------------------- */
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
      anchor.addEventListener('click', function (e) {
        var targetId = this.getAttribute('href');

        /* Skip empty hashes */
        if (targetId === '#') return;

        var target = document.querySelector(targetId);

        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: prefersReducedMotion ? 'auto' : 'smooth',
            block: 'start',
          });
        }
      });
    });
  }

  /* -----------------------------------------------------------------------
     Initialise — Run when DOM is ready
     ----------------------------------------------------------------------- */
  function init() {
    initScrollReveal();
    initNavScroll();
    initKineticTypography();
    initTypewriter();
    initSmoothScroll();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
