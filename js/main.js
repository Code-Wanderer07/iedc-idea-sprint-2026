/**
 * IEDC Idea Sprint 2026 - Main Application Entrypoint
 * Orchestrates modules, sticky nav, mobile drawer, FAQ accordions,
 * smooth scrolling, and accessibility listeners.
 */

import { Countdown } from './countdown.js';
import { Schedule } from './schedule.js';
import { IdeaSpinner } from './spinner.js';
import { RegistrationForm } from './form.js';

class App {
  constructor() {
    this.countdown = new Countdown();
    this.schedule = new Schedule();
    this.spinner = new IdeaSpinner();
    this.form = new RegistrationForm();

    this.dom = {
      navToggle: document.getElementById('nav-toggle-btn'),
      navMenu: document.getElementById('nav-menu-drawer'),
      navBackdrop: document.getElementById('nav-backdrop'),
      navLinks: document.querySelectorAll('.nav-link'),
      header: document.querySelector('.site-header'),
      faqItems: document.querySelectorAll('.faq-item'),
      backToTopBtn: document.getElementById('back-to-top-btn')
    };
  }

  init() {
    // Initialize components
    this.countdown.init();
    this.schedule.init();
    this.spinner.init();
    this.form.init();

    // Setup global UI features
    this.setupMobileNav();
    this.setupActiveNavScroll();
    this.setupFaqAccordions();
    this.setupBackToTop();
  }

  setupMobileNav() {
    if (!this.dom.navToggle || !this.dom.navMenu) return;

    const toggleNav = (open) => {
      const isOpen = open !== undefined ? open : !this.dom.navMenu.classList.contains('is-open');
      this.dom.navMenu.classList.toggle('is-open', isOpen);
      this.dom.navToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      if (this.dom.navBackdrop) {
        this.dom.navBackdrop.classList.toggle('is-visible', isOpen);
      }
      document.body.style.overflow = isOpen ? 'hidden' : '';

      if (isOpen) {
        const firstLink = this.dom.navMenu.querySelector('a, button');
        if (firstLink) firstLink.focus();
      } else {
        this.dom.navToggle.focus();
      }
    };

    this.dom.navToggle.addEventListener('click', () => toggleNav());

    if (this.dom.navBackdrop) {
      this.dom.navBackdrop.addEventListener('click', () => toggleNav(false));
    }

    // Close when clicking any nav link
    this.dom.navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (this.dom.navMenu.classList.contains('is-open')) {
          toggleNav(false);
        }
      });
    });

    // Close on Escape key
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        if (this.dom.navMenu.classList.contains('is-open')) {
          toggleNav(false);
        }
        const modal = document.getElementById('registration-success-modal');
        if (modal && modal.classList.contains('is-open')) {
          this.form.closeSuccessModal();
        }
      }
    });
  }

  setupActiveNavScroll() {
    const sections = document.querySelectorAll('section[id]');
    if (!('IntersectionObserver' in window) || sections.length === 0) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          this.dom.navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${id}`) {
              link.classList.add('is-current');
              link.setAttribute('aria-current', 'page');
            } else {
              link.classList.remove('is-current');
              link.removeAttribute('aria-current');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -70% 0px',
      threshold: 0
    });

    sections.forEach(section => observer.observe(section));
  }

  setupFaqAccordions() {
    if (!this.dom.faqItems.length) return;

    this.dom.faqItems.forEach(item => {
      const btn = item.querySelector('.faq-question-btn');
      const answer = item.querySelector('.faq-answer');

      if (!btn || !answer) return;

      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        
        // Close others for clean neo-brutalist broadsheet reading
        this.dom.faqItems.forEach(other => {
          if (other !== item) {
            const otherBtn = other.querySelector('.faq-question-btn');
            const otherAns = other.querySelector('.faq-answer');
            if (otherBtn && otherAns) {
              otherBtn.setAttribute('aria-expanded', 'false');
              otherAns.hidden = true;
              other.classList.remove('is-open');
            }
          }
        });

        // Toggle current
        btn.setAttribute('aria-expanded', (!expanded).toString());
        answer.hidden = expanded;
        item.classList.toggle('is-open', !expanded);
      });
    });
  }

  setupBackToTop() {
    if (!this.dom.backToTopBtn) return;

    window.addEventListener('scroll', () => {
      if (window.scrollY > 400) {
        this.dom.backToTopBtn.classList.add('is-visible');
      } else {
        this.dom.backToTopBtn.classList.remove('is-visible');
      }
    }, { passive: true });

    this.dom.backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}

// Start application when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
  const app = new App();
  app.init();
});
