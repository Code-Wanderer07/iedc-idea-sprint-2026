/**
 * IEDC Idea Sprint 2026 - Countdown Timer
 * High-precision timer using Date.now() to prevent drift.
 * Handles 3 states: Pre-sprint countdown, Live sprint clock, and Concluded event.
 */

import { CONFIG } from './config.js';

export class Countdown {
  constructor() {
    this.timerInterval = null;
    this.eventStartTime = new Date(CONFIG.eventStart).getTime();
    this.eventEndTime = new Date(CONFIG.eventEnd).getTime();
    
    // Check URL override for testing/demoing states
    const params = new URLSearchParams(window.location.search);
    this.stateOverride = params.get('state'); // 'before' | 'live' | 'ended'
    
    this.dom = {
      container: document.getElementById('countdown-container'),
      badge: document.getElementById('countdown-badge'),
      title: document.getElementById('countdown-title'),
      days: document.getElementById('count-days'),
      hours: document.getElementById('count-hours'),
      minutes: document.getElementById('count-minutes'),
      seconds: document.getElementById('count-seconds'),
      daysCard: document.getElementById('card-days'),
      liveNotice: document.getElementById('countdown-live-banner'),
      srAnnouncement: document.getElementById('countdown-sr-status'),
      progressBar: document.getElementById('countdown-progress-bar'),
      stateSwitcherButtons: document.querySelectorAll('[data-timer-state]')
    };

    this.lastSrUpdate = 0;
  }

  init() {
    if (!this.dom.days) return;
    this.bindEvents();
    this.tick();
    this.timerInterval = setInterval(() => this.tick(), 1000);
  }

  bindEvents() {
    if (this.dom.stateSwitcherButtons.length) {
      this.dom.stateSwitcherButtons.forEach(btn => {
        btn.addEventListener('click', () => {
          const state = btn.dataset.timerState;
          this.setManualState(state);
          this.dom.stateSwitcherButtons.forEach(b => b.classList.remove('is-active'));
          btn.classList.add('is-active');
        });
      });
    }
  }

  setManualState(state) {
    this.stateOverride = state;
    this.tick();
  }

  getEffectiveState(now) {
    if (this.stateOverride === 'before') return 'before';
    if (this.stateOverride === 'live') return 'live';
    if (this.stateOverride === 'ended') return 'ended';

    if (now < this.eventStartTime) return 'before';
    if (now >= this.eventStartTime && now < this.eventEndTime) return 'live';
    return 'ended';
  }

  tick() {
    const now = Date.now();
    const state = this.getEffectiveState(now);

    if (state === 'before') {
      const diff = Math.max(0, this.eventStartTime - now);
      this.renderBeforeState(diff);
    } else if (state === 'live') {
      const diff = Math.max(0, this.eventEndTime - now);
      this.renderLiveState(diff, now);
    } else {
      this.renderEndedState();
    }
  }

  renderBeforeState(diffMs) {
    const totalSec = Math.floor(diffMs / 1000);
    const d = Math.floor(totalSec / 86400);
    const h = Math.floor((totalSec % 86400) / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    this.updateDigit(this.dom.days, d);
    this.updateDigit(this.dom.hours, h);
    this.updateDigit(this.dom.minutes, m);
    this.updateDigit(this.dom.seconds, s);

    if (this.dom.daysCard) this.dom.daysCard.style.display = 'flex';
    
    if (this.dom.badge) {
      this.dom.badge.innerHTML = '<span class="status-dot"></span> REGISTRATIONS OPEN';
      this.dom.badge.className = 'status-pill status-pill--open';
    }

    if (this.dom.title) {
      this.dom.title.textContent = 'SPRINT COUNTDOWN';
    }

    if (this.dom.liveNotice) {
      this.dom.liveNotice.classList.add('is-hidden');
    }

    // Accessible periodic update every 60s
    if (Date.now() - this.lastSrUpdate > 60000) {
      this.announceSR(`Event begins in ${d} days, ${h} hours, and ${m} minutes.`);
      this.lastSrUpdate = Date.now();
    }
  }

  renderLiveState(diffMs, now) {
    const totalSec = Math.floor(diffMs / 1000);
    const h = Math.floor(totalSec / 3600);
    const m = Math.floor((totalSec % 3600) / 60);
    const s = totalSec % 60;

    // In live mode, we focus on the 24-hour remaining clock
    if (this.dom.daysCard) this.dom.daysCard.style.display = 'none';

    this.updateDigit(this.dom.hours, h);
    this.updateDigit(this.dom.minutes, m);
    this.updateDigit(this.dom.seconds, s);

    if (this.dom.badge) {
      this.dom.badge.innerHTML = '<span class="status-dot pulse-coral"></span> ⚡ SPRINT IS LIVE NOW';
      this.dom.badge.className = 'status-pill status-pill--live';
    }

    if (this.dom.title) {
      this.dom.title.textContent = '24H HACKING CLOCK RUNNING';
    }

    if (this.dom.liveNotice) {
      this.dom.liveNotice.classList.remove('is-hidden');
      this.dom.liveNotice.innerHTML = `<strong>ALERT:</strong> 24-hour countdown actively running at CEC Campus! Submissions lock when clock reaches 00:00:00.`;
    }

    // Progress bar for 24h
    if (this.dom.progressBar) {
      const sprintDuration = this.eventEndTime - this.eventStartTime;
      const elapsed = Math.max(0, now - this.eventStartTime);
      const pct = Math.min(100, Math.max(0, (elapsed / sprintDuration) * 100));
      this.dom.progressBar.style.width = `${pct.toFixed(1)}%`;
      this.dom.progressBar.setAttribute('aria-valuenow', pct.toFixed(0));
    }
  }

  renderEndedState() {
    this.updateDigit(this.dom.days, 0);
    this.updateDigit(this.dom.hours, 0);
    this.updateDigit(this.dom.minutes, 0);
    this.updateDigit(this.dom.seconds, 0);

    if (this.dom.badge) {
      this.dom.badge.innerHTML = '🏁 EVENT CONCLUDED';
      this.dom.badge.className = 'status-pill status-pill--ended';
    }

    if (this.dom.title) {
      this.dom.title.textContent = 'IDEA SPRINT 2026 HAS CONCLUDED';
    }

    if (this.dom.liveNotice) {
      this.dom.liveNotice.classList.remove('is-hidden');
      this.dom.liveNotice.innerHTML = `<strong>THANK YOU HACKERS!</strong> Judging in progress. Winners will be announced at the closing ceremony. See you in 2027!`;
    }

    if (this.dom.progressBar) {
      this.dom.progressBar.style.width = '100%';
    }
  }

  updateDigit(elem, val) {
    if (!elem) return;
    const formatted = String(val).padStart(2, '0');
    if (elem.textContent !== formatted) {
      elem.textContent = formatted;
    }
  }

  announceSR(text) {
    if (this.dom.srAnnouncement) {
      this.dom.srAnnouncement.textContent = text;
    }
  }
}
