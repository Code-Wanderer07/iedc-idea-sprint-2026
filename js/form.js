/**
 * IEDC Idea Sprint 2026 - Registration Form Handler
 * Robust client-side validation, Constraint Validation API, aria error binding,
 * honeypot bot trap, localStorage persistence, celebratory confetti pass modal,
 * and seamless external endpoint compatibility.
 */

import { CONFIG } from './config.js';

export class RegistrationForm {
  constructor() {
    this.form = document.getElementById('registration-form');
    this.ideaTextarea = document.getElementById('form-idea');
    this.ideaCounter = document.getElementById('idea-char-count');
    this.successModal = document.getElementById('registration-success-modal');
    this.ticketCard = document.getElementById('ticket-container');
    this.honeypot = document.getElementById('bot-field-check');

    this.touchedFields = new Set();
    this.validationRules = {
      fullName: {
        validate: (val) => {
          if (!val.trim()) return "Full name is required.";
          if (val.trim().length < 2) return "Name must be at least 2 characters.";
          if (val.trim().length > 60) return "Name must not exceed 60 characters.";
          if (!/^[a-zA-Z\s.'-]+$/.test(val.trim())) return "Only letters, spaces, dots, and hyphens allowed.";
          return null;
        }
      },
      email: {
        validate: (val) => {
          if (!val.trim()) return "Email address is required.";
          const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
          if (!emailRegex.test(val.trim())) return "Please enter a valid email address.";
          return null;
        }
      },
      phone: {
        validate: (val) => {
          if (!val.trim()) return "Mobile number is required.";
          // Normalize Indian phone: strip spaces, dashes, +91 or 0 prefix
          const clean = val.replace(/[\s\-()]/g, '').replace(/^(\+91|91|0)/, '');
          if (!/^[6-9]\d{9}$/.test(clean)) {
            return "Enter a valid 10-digit Indian mobile number (e.g. 9876543210).";
          }
          return null;
        }
      },
      college: {
        validate: (val) => {
          if (!val.trim()) return "College or institution name is required.";
          if (val.trim().length < 2) return "Please enter a valid institution name.";
          return null;
        }
      },
      year: {
        validate: (val) => {
          if (!val || val === "") return "Please select your academic year.";
          return null;
        }
      },
      department: {
        validate: (val) => {
          if (!val || val === "") return "Please select your department / branch.";
          return null;
        }
      },
      teamName: {
        validate: (val) => {
          if (val && val.trim().length > 0) {
            if (val.trim().length < 3) return "Team name must be at least 3 characters.";
            if (val.trim().length > 30) return "Team name must not exceed 30 characters.";
          }
          return null;
        }
      },
      teamSize: {
        validate: (val) => {
          if (!val || val === "") return "Please select your team size (1-4).";
          return null;
        }
      },
      track: {
        validate: (val) => {
          if (!val || val === "") return "Please select a preferred problem track.";
          return null;
        }
      },
      idea: {
        validate: (val) => {
          if (val && val.length > 280) return "Idea prompt cannot exceed 280 characters.";
          return null;
        }
      },
      consent: {
        validate: (val, input) => {
          if (!input.checked) return "You must agree to the code of conduct and rules to participate.";
          return null;
        }
      }
    };
  }

  init() {
    if (!this.form) return;
    this.checkExistingRegistration();
    this.bindEvents();
    this.updateIdeaCounter();
  }

  bindEvents() {
    // Character counter for idea
    if (this.ideaTextarea && this.ideaCounter) {
      this.ideaTextarea.addEventListener('input', () => this.updateIdeaCounter());
    }

    // Individual field validation on blur and input
    const inputs = this.form.querySelectorAll('input, select, textarea');
    inputs.forEach(input => {
      input.addEventListener('blur', () => {
        this.touchedFields.add(input.name);
        this.validateField(input);
      });

      input.addEventListener('input', () => {
        if (this.touchedFields.has(input.name)) {
          this.validateField(input);
        }
      });

      input.addEventListener('change', () => {
        if (this.touchedFields.has(input.name)) {
          this.validateField(input);
        }
      });
    });

    // Form submission
    this.form.addEventListener('submit', (e) => this.handleSubmit(e));

    // Modal close & ticket actions
    const modalCloseBtn = document.getElementById('modal-close-btn');
    if (modalCloseBtn) {
      modalCloseBtn.addEventListener('click', () => this.closeSuccessModal());
    }

    const printTicketBtn = document.getElementById('ticket-print-btn');
    if (printTicketBtn) {
      printTicketBtn.addEventListener('click', () => window.print());
    }

    const calendarBtn = document.getElementById('ticket-calendar-btn');
    if (calendarBtn) {
      calendarBtn.addEventListener('click', () => this.downloadIcsFile());
    }

    const newRegBtn = document.getElementById('new-reg-btn');
    if (newRegBtn) {
      newRegBtn.addEventListener('click', () => {
        this.closeSuccessModal();
        this.form.reset();
        this.touchedFields.clear();
        this.updateIdeaCounter();
      });
    }
  }

  updateIdeaCounter() {
    if (!this.ideaTextarea || !this.ideaCounter) return;
    const len = this.ideaTextarea.value.length;
    this.ideaCounter.textContent = `${len} / 280`;
    if (len > 280) {
      this.ideaCounter.classList.add('is-over-limit');
    } else {
      this.ideaCounter.classList.remove('is-over-limit');
    }
  }

  validateField(input) {
    const name = input.name;
    const rule = this.validationRules[name];
    if (!rule) return true;

    const error = rule.validate(input.value, input);
    const errorEl = document.getElementById(`error-${name}`);

    if (error) {
      input.setAttribute('aria-invalid', 'true');
      input.classList.add('has-error');
      if (errorEl) {
        errorEl.textContent = error;
        errorEl.classList.remove('is-hidden');
      }
      return false;
    } else {
      input.removeAttribute('aria-invalid');
      input.classList.remove('has-error');
      if (errorEl) {
        errorEl.textContent = '';
        errorEl.classList.add('is-hidden');
      }
      return true;
    }
  }

  validateAll() {
    let isValid = true;
    let firstInvalid = null;

    const fields = Object.keys(this.validationRules);
    fields.forEach(name => {
      const input = this.form.elements[name];
      if (input) {
        this.touchedFields.add(name);
        const valid = this.validateField(input);
        if (!valid && !firstInvalid) {
          firstInvalid = input;
          isValid = false;
        } else if (!valid) {
          isValid = false;
        }
      }
    });

    if (firstInvalid) {
      firstInvalid.focus();
    }

    return isValid;
  }

  async handleSubmit(e) {
    e.preventDefault();

    // Check honeypot trap
    if (this.honeypot && this.honeypot.value.trim() !== '') {
      console.warn('Spam submission detected by honeypot.');
      return;
    }

    const isValid = this.validateAll();
    if (!isValid) return;

    // Submit button state
    const submitBtn = this.form.querySelector('button[type="submit"]');
    const origBtnHTML = submitBtn.innerHTML;
    submitBtn.disabled = true;
    submitBtn.innerHTML = `
      <span class="btn-spinner" aria-hidden="true"></span>
      <span>Confirming Registration...</span>
    `;

    // Extract form data
    const formData = new FormData(this.form);
    const payload = {
      fullName: formData.get('fullName').trim(),
      email: formData.get('email').trim(),
      phone: formData.get('phone').trim(),
      college: formData.get('college').trim(),
      year: formData.get('year'),
      department: formData.get('department'),
      teamName: formData.get('teamName')?.trim() || 'Solo Challenger',
      teamSize: formData.get('teamSize') || '1',
      track: formData.get('track'),
      idea: formData.get('idea')?.trim() || 'To be shaped during Sprint kick-off',
      registeredAt: new Date().toISOString(),
      ticketId: this.generateTicketId()
    };

    try {
      // If external endpoint is provided in config, dispatch POST
      if (CONFIG.registrationEndpoint && CONFIG.registrationEndpoint.trim() !== "") {
        await fetch(CONFIG.registrationEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload)
        });
      } else {
        // Fallback simulation delay
        await new Promise(res => setTimeout(res, 600));
      }

      // Persist to localStorage
      this.saveToStorage(payload);

      // Render digital pass and display success modal
      this.renderTicket(payload);
      this.openSuccessModal();
      this.triggerConfetti();

    } catch (err) {
      console.error('Submission error:', err);
      // Fallback save in localStorage anyway
      this.saveToStorage(payload);
      this.renderTicket(payload);
      this.openSuccessModal();
      this.triggerConfetti();
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = origBtnHTML;
    }
  }

  generateTicketId() {
    const randomHex = Math.floor(Math.random() * 0xFFFFFF).toString(16).toUpperCase().padStart(6, '0');
    return `CEC-IS26-${randomHex}`;
  }

  saveToStorage(data) {
    try {
      const existing = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
      existing.push(data);
      localStorage.setItem(CONFIG.storageKey, JSON.stringify(existing));
    } catch (e) {
      console.warn('Storage unavailable', e);
    }
  }

  checkExistingRegistration() {
    try {
      const existing = JSON.parse(localStorage.getItem(CONFIG.storageKey) || '[]');
      if (existing.length > 0) {
        const lastReg = existing[existing.length - 1];
        const banner = document.getElementById('existing-reg-banner');
        if (banner) {
          banner.classList.remove('is-hidden');
          banner.innerHTML = `
            <div class="existing-reg-content">
              <span>🎟️ You previously registered team <strong>${this.escapeHTML(lastReg.teamName)}</strong> (Ticket ID: <code>${lastReg.ticketId}</code>).</span>
              <button type="button" class="btn btn--xs btn--outline" id="view-last-ticket-btn">View My Ticket</button>
            </div>
          `;
          const btn = document.getElementById('view-last-ticket-btn');
          if (btn) {
            btn.addEventListener('click', () => {
              this.renderTicket(lastReg);
              this.openSuccessModal();
            });
          }
        }
      }
    } catch (_) {}
  }

  renderTicket(data) {
    if (!this.ticketCard) return;

    // Track label lookup
    const trackObj = CONFIG.tracks.find(t => t.id === data.track);
    const trackName = trackObj ? trackObj.name : data.track;

    this.ticketCard.innerHTML = `
      <div class="hacker-pass" id="printable-hacker-pass">
        <div class="pass-header">
          <div class="pass-brand">
            <img src="./assets/iedc-logo-light.png" alt="IEDC Bootcamp CEC" class="pass-logo-img">
            <span class="pass-title">IDEA SPRINT '26 // PASS</span>
          </div>
          <span class="pass-status-pill">OFFICIAL ADMISSION</span>
        </div>

        <div class="pass-body">
          <div class="pass-field-group">
            <div class="pass-field">
              <span class="pass-label">HACKER NAME</span>
              <strong class="pass-value">${this.escapeHTML(data.fullName)}</strong>
            </div>
            <div class="pass-field">
              <span class="pass-label">COLLEGE / CAMPUS</span>
              <span class="pass-value">${this.escapeHTML(data.college)}</span>
            </div>
          </div>

          <div class="pass-field-group">
            <div class="pass-field">
              <span class="pass-label">ACADEMIC YEAR</span>
              <span class="pass-value">${this.escapeHTML(data.year || 'Student')}</span>
            </div>
            <div class="pass-field">
              <span class="pass-label">DEPARTMENT / BRANCH</span>
              <span class="pass-value">${this.escapeHTML(data.department || 'Engineering')}</span>
            </div>
          </div>

          <div class="pass-field-group">
            <div class="pass-field">
              <span class="pass-label">TEAM / SQUAD</span>
              <strong class="pass-value">${this.escapeHTML(data.teamName)} (${data.teamSize} Member${data.teamSize > 1 ? 's' : ''})</strong>
            </div>
            <div class="pass-field">
              <span class="pass-label">SPRINT TRACK</span>
              <span class="pass-value pass-track-highlight">${this.escapeHTML(trackName)}</span>
            </div>
          </div>

          <div class="pass-field pass-field--full">
            <span class="pass-label">TICKET SERIAL NO.</span>
            <code class="pass-code">${data.ticketId}</code>
          </div>

          <div class="pass-field pass-field--full">
            <span class="pass-label">VENUE & TIMELINE</span>
            <span class="pass-value">College of Engineering Chengannur • Nov 21-22, 2026 (24H)</span>
          </div>
        </div>

        <div class="pass-stub">
          <div class="pass-barcode" aria-hidden="true">
            <div class="barcode-lines"></div>
            <span class="barcode-num">${data.ticketId}</span>
          </div>
          <div class="pass-stamp">
            <div class="stamp-circle">
              <span>IEDC</span>
              <span>VERIFIED</span>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  openSuccessModal() {
    if (this.successModal) {
      this.successModal.classList.add('is-open');
      this.successModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
      const focusTarget = this.successModal.querySelector('button, [tabindex="0"]');
      if (focusTarget) focusTarget.focus();
    }
  }

  closeSuccessModal() {
    if (this.successModal) {
      this.successModal.classList.remove('is-open');
      this.successModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    }
  }

  triggerConfetti() {
    const canvas = document.getElementById('confetti-canvas');
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles = [];
    const colors = ['#1D4ED8', '#FF5A36', '#FDE047', '#34D399', '#DDD6FE', '#18181B'];

    for (let i = 0; i < 90; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        w: Math.random() * 10 + 6,
        h: Math.random() * 6 + 4,
        color: colors[Math.floor(Math.random() * colors.length)],
        vx: (Math.random() - 0.5) * 16,
        vy: (Math.random() - 0.7) * 16,
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 10,
        gravity: 0.35,
        alpha: 1
      });
    }

    let animationFrame;
    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      let alive = false;

      particles.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += p.gravity;
        p.rotation += p.vRot;
        p.alpha -= 0.008;

        if (p.alpha > 0) {
          alive = true;
          ctx.save();
          ctx.globalAlpha = p.alpha;
          ctx.translate(p.x, p.y);
          ctx.rotate((p.rotation * Math.PI) / 180);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
          ctx.restore();
        }
      });

      if (alive) {
        animationFrame = requestAnimationFrame(render);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        cancelAnimationFrame(animationFrame);
      }
    };

    render();
  }

  downloadIcsFile() {
    const icsContent = [
      'BEGIN:VCALENDAR',
      'VERSION:2.0',
      'PRODID:-//IEDC Bootcamp CEC//Idea Sprint 2026//EN',
      'CALSCALE:GREGORIAN',
      'BEGIN:VEVENT',
      'SUMMARY:IEDC Idea Sprint 2026 (24-Hour Ideathon)',
      'DESCRIPTION:24-hour student ideathon hosted by IEDC Bootcamp CEC at College of Engineering Chengannur.',
      'LOCATION:College of Engineering Chengannur, Alappuzha, Kerala',
      'DTSTART:20261121T040000Z',
      'DTEND:20261122T040000Z',
      'STATUS:CONFIRMED',
      'END:VEVENT',
      'END:VCALENDAR'
    ].join('\r\n');

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = 'IEDC-Idea-Sprint-2026.ics';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  escapeHTML(str) {
    if (!str) return '';
    return str
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }
}
