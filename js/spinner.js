/**
 * IEDC Idea Sprint 2026 - Idea Spinner
 * Interactive 3-reel slot-machine hackathon prompt generator.
 * Features: Reel locking, staggered stops, prompt copying, WhatsApp sharing,
 * pre-filling the registration form, and prefers-reduced-motion compliance.
 */

export const DOMAINS = [
  { id: "health", label: "Healthcare & Patient Care", tag: "MedTech", icon: "🩺" },
  { id: "campus", label: "Smart Campus & Student Life", tag: "Campus", icon: "🎓" },
  { id: "agritech", label: "Regenerative Agritech & Food", tag: "AgriTech", icon: "🌱" },
  { id: "climate", label: "Climate Action & Clean Energy", tag: "CleanTech", icon: "⚡" },
  { id: "civic", label: "Civic Tech & Public Safety", tag: "Civic", icon: "🏛️" },
  { id: "edtech", label: "Vernacular EdTech & Skilling", tag: "EdTech", icon: "📚" },
  { id: "fintech", label: "Financial Inclusion & Micro-credit", tag: "FinTech", icon: "💳" },
  { id: "circular", label: "Zero-Waste Circular Economy", tag: "Green", icon: "♻️" },
  { id: "disaster", label: "Disaster Preparedness & Relief", tag: "Resilience", icon: "🚨" },
  { id: "accessibility", label: "Assistive Tech for Disabled", tag: "A11y", icon: "♿" }
];

export const TECHNOLOGIES = [
  { id: "edge-ai", label: "Edge AI & Small Local LLMs", tag: "AI/ML", icon: "🧠" },
  { id: "iot-sensors", label: "IoT Sensors & ESP32 / Arduino", tag: "Hardware", icon: "📡" },
  { id: "spatial", label: "WebXR & Spatial Interfaces", tag: "AR/VR", icon: "👓" },
  { id: "pwa-offline", label: "Offline-First Progressive Web App", tag: "Web", icon: "📱" },
  { id: "voice-audio", label: "Voice Navigation & Speech Audio", tag: "Speech", icon: "🎙️" },
  { id: "computer-vision", label: "Real-time Computer Vision", tag: "Vision", icon: "👁️" },
  { id: "lora-mesh", label: "Low-Power LoRa Mesh Network", tag: "Networking", icon: "📶" },
  { id: "geospatial", label: "Geospatial Mapping & GPS Trails", tag: "Geo", icon: "🗺️" },
  { id: "zk-privacy", label: "Zero-Knowledge & Decentralized ID", tag: "Crypto", icon: "🛡️" },
  { id: "automated-agents", label: "Autonomous Workflow Agents", tag: "Agents", icon: "🤖" }
];

export const CONSTRAINTS = [
  { id: "no-internet", label: "Works 100% Offline with Zero Cloud", tag: "Offline", icon: "🔌" },
  { id: "zero-cost", label: "Zero Budget & Open Source Only", tag: "FOSS", icon: "💸" },
  { id: "one-hand", label: "Built for One-Handed Mobile Use", tag: "Mobile UX", icon: "👍" },
  { id: "low-bandwidth", label: "Functions Smoothly Under 10 kbps", tag: "Ultra-Light", icon: "⏳" },
  { id: "minimal-code", label: "Under 500 Lines of Total Code", tag: "Minimalist", icon: "✂️" },
  { id: "battery-long", label: "Battery-Powered for 7 Continuous Days", tag: "Ultra-Efficient", icon: "🔋" },
  { id: "voice-only", label: "Usable Entirely Without a Screen", tag: "Audio UX", icon: "🗣️" },
  { id: "hyper-local", label: "Localized in Malayalam & Indian Dialects", tag: "Vernacular", icon: "🇮🇳" },
  { id: "senior-friendly", label: "Designed Exclusively for Non-Tech Seniors", tag: "Simplicity", icon: "👵" },
  { id: "zero-setup", label: "Zero Install / Runs in Pure Browser", tag: "Instant", icon: "⚡" }
];

export class IdeaSpinner {
  constructor() {
    this.isSpinning = false;
    this.audioContext = null;

    // Current indices
    this.state = {
      domainIndex: 0,
      techIndex: 0,
      constraintIndex: 0,
      locks: {
        domain: false,
        tech: false,
        constraint: false
      }
    };

    this.dom = {
      spinBtn: document.getElementById('spinner-spin-btn'),
      reelDomain: document.getElementById('reel-domain-items'),
      reelTech: document.getElementById('reel-tech-items'),
      reelConstraint: document.getElementById('reel-constraint-items'),
      lockDomainBtn: document.getElementById('lock-domain-btn'),
      lockTechBtn: document.getElementById('lock-tech-btn'),
      lockConstraintBtn: document.getElementById('lock-constraint-btn'),
      outputSentence: document.getElementById('spinner-output-sentence'),
      copyBtn: document.getElementById('spinner-copy-btn'),
      shareBtn: document.getElementById('spinner-share-btn'),
      useInFormBtn: document.getElementById('spinner-use-in-form-btn'),
      statusLive: document.getElementById('spinner-live-announcer')
    };
  }

  init() {
    if (!this.dom.spinBtn) return;

    this.populateReels();
    this.bindEvents();
    
    // Set initial random state
    this.state.domainIndex = Math.floor(Math.random() * DOMAINS.length);
    this.state.techIndex = Math.floor(Math.random() * TECHNOLOGIES.length);
    this.state.constraintIndex = Math.floor(Math.random() * CONSTRAINTS.length);

    this.updateReelPosition('domain', this.state.domainIndex, false);
    this.updateReelPosition('tech', this.state.techIndex, false);
    this.updateReelPosition('constraint', this.state.constraintIndex, false);
    this.updateOutputSentence();
  }

  populateReels() {
    this.renderReelContent(this.dom.reelDomain, DOMAINS, 'domain');
    this.renderReelContent(this.dom.reelTech, TECHNOLOGIES, 'tech');
    this.renderReelContent(this.dom.reelConstraint, CONSTRAINTS, 'constraint');
  }

  renderReelContent(container, items, type) {
    if (!container) return;
    
    // We clone items a few times to create an infinite rolling reel illusion
    const duplicates = [...items, ...items, ...items];
    container.innerHTML = duplicates.map((item, idx) => `
      <div class="reel-item" data-index="${idx % items.length}" data-type="${type}">
        <span class="reel-item__icon">${item.icon}</span>
        <div class="reel-item__text">
          <span class="reel-item__tag">${item.tag}</span>
          <strong class="reel-item__label">${item.label}</strong>
        </div>
      </div>
    `).join('');
  }

  bindEvents() {
    // Spin button
    this.dom.spinBtn.addEventListener('click', () => {
      this.spin();
    });

    // Reel Locks
    this.setupLock(this.dom.lockDomainBtn, 'domain');
    this.setupLock(this.dom.lockTechBtn, 'tech');
    this.setupLock(this.dom.lockConstraintBtn, 'constraint');

    // Copy to clipboard
    if (this.dom.copyBtn) {
      this.dom.copyBtn.addEventListener('click', () => this.copyToClipboard());
    }

    // Share on WhatsApp
    if (this.dom.shareBtn) {
      this.dom.shareBtn.addEventListener('click', () => this.shareOnWhatsApp());
    }

    // Use in registration form
    if (this.dom.useInFormBtn) {
      this.dom.useInFormBtn.addEventListener('click', () => this.useInRegistration());
    }
  }

  setupLock(button, key) {
    if (!button) return;
    button.addEventListener('click', () => {
      this.state.locks[key] = !this.state.locks[key];
      const isLocked = this.state.locks[key];
      button.classList.toggle('is-locked', isLocked);
      button.setAttribute('aria-pressed', isLocked ? 'true' : 'false');
      
      const icon = button.querySelector('.lock-icon');
      if (icon) {
        icon.textContent = isLocked ? '🔒' : '🔓';
      }
      const text = button.querySelector('.lock-label');
      if (text) {
        text.textContent = isLocked ? 'Locked' : 'Lock';
      }
    });
  }

  spin() {
    if (this.isSpinning) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    this.isSpinning = true;
    this.dom.spinBtn.disabled = true;
    this.dom.spinBtn.classList.add('is-spinning');

    // Sound effect
    this.playClickSound();

    // Pick target indices
    const targetDomain = this.state.locks.domain 
      ? this.state.domainIndex 
      : Math.floor(Math.random() * DOMAINS.length);

    const targetTech = this.state.locks.tech 
      ? this.state.techIndex 
      : Math.floor(Math.random() * TECHNOLOGIES.length);

    const targetConstraint = this.state.locks.constraint 
      ? this.state.constraintIndex 
      : Math.floor(Math.random() * CONSTRAINTS.length);

    if (prefersReducedMotion) {
      // Instant swap
      this.state.domainIndex = targetDomain;
      this.state.techIndex = targetTech;
      this.state.constraintIndex = targetConstraint;

      this.updateReelPosition('domain', targetDomain, false);
      this.updateReelPosition('tech', targetTech, false);
      this.updateReelPosition('constraint', targetConstraint, false);

      this.finishSpin();
      return;
    }

    // Staggered stop timing:
    // Domain stops at 700ms
    // Tech stops at 1100ms
    // Constraint stops at 1500ms
    if (!this.state.locks.domain) {
      this.animateReel(this.dom.reelDomain, targetDomain, 700, () => {
        this.state.domainIndex = targetDomain;
        this.playStopSound();
      });
    }

    if (!this.state.locks.tech) {
      this.animateReel(this.dom.reelTech, targetTech, 1100, () => {
        this.state.techIndex = targetTech;
        this.playStopSound();
      });
    }

    if (!this.state.locks.constraint) {
      this.animateReel(this.dom.reelConstraint, targetConstraint, 1500, () => {
        this.state.constraintIndex = targetConstraint;
        this.playStopSound();
      });
    }

    // Final finish after 1550ms
    setTimeout(() => {
      this.finishSpin();
    }, 1550);
  }

  animateReel(reelEl, targetIndex, durationMs, onStop) {
    if (!reelEl) return;

    reelEl.classList.add('is-rolling');
    
    // We scroll along the duplicated set for smooth visual spinning
    const itemHeight = 68; // height of each reel item in px
    // Add full loop offset (10 items * height)
    const baseOffset = 10 * itemHeight;
    const finalTranslate = -(baseOffset + (targetIndex * itemHeight));

    reelEl.style.transition = `transform ${durationMs}ms cubic-bezier(0.15, 0.9, 0.25, 1)`;
    reelEl.style.transform = `translateY(${finalTranslate}px)`;

    setTimeout(() => {
      reelEl.classList.remove('is-rolling');
      if (onStop) onStop();
    }, durationMs);
  }

  updateReelPosition(type, index, animate = false) {
    let reelEl;
    if (type === 'domain') reelEl = this.dom.reelDomain;
    else if (type === 'tech') reelEl = this.dom.reelTech;
    else if (type === 'constraint') reelEl = this.dom.reelConstraint;

    if (!reelEl) return;
    const itemHeight = 68;
    const baseOffset = 10 * itemHeight;
    const finalTranslate = -(baseOffset + (index * itemHeight));

    reelEl.style.transition = animate ? 'transform 0.4s ease' : 'none';
    reelEl.style.transform = `translateY(${finalTranslate}px)`;
  }

  finishSpin() {
    this.isSpinning = false;
    this.dom.spinBtn.disabled = false;
    this.dom.spinBtn.classList.remove('is-spinning');
    this.updateOutputSentence();

    // Pulse prompt box
    if (this.dom.outputSentence) {
      this.dom.outputSentence.classList.remove('pulse-highlight');
      void this.dom.outputSentence.offsetWidth; // trigger reflow
      this.dom.outputSentence.classList.add('pulse-highlight');
    }
  }

  getCurrentIdeaSentence() {
    const domain = DOMAINS[this.state.domainIndex].label;
    const tech = TECHNOLOGIES[this.state.techIndex].label;
    const constraint = CONSTRAINTS[this.state.constraintIndex].label;

    return `Build a ${domain} solution using ${tech} that ${constraint}.`;
  }

  updateOutputSentence() {
    const domain = DOMAINS[this.state.domainIndex].label;
    const tech = TECHNOLOGIES[this.state.techIndex].label;
    const constraint = CONSTRAINTS[this.state.constraintIndex].label;

    if (this.dom.outputSentence) {
      this.dom.outputSentence.innerHTML = `
        Build a <mark class="mark-domain">${domain}</mark> solution 
        using <mark class="mark-tech">${tech}</mark> 
        that <mark class="mark-constraint">${constraint}</mark>.
      `;
    }

    if (this.dom.statusLive) {
      this.dom.statusLive.textContent = this.getCurrentIdeaSentence();
    }
  }

  copyToClipboard() {
    const sentence = this.getCurrentIdeaSentence();
    navigator.clipboard.writeText(sentence).then(() => {
      const origText = this.dom.copyBtn.innerHTML;
      this.dom.copyBtn.innerHTML = '<span>✅ Copied!</span>';
      this.dom.copyBtn.classList.add('btn--success');
      setTimeout(() => {
        this.dom.copyBtn.innerHTML = origText;
        this.dom.copyBtn.classList.remove('btn--success');
      }, 2000);
    }).catch(() => {
      // Fallback
      alert('Copied Idea: ' + sentence);
    });
  }

  shareOnWhatsApp() {
    const sentence = this.getCurrentIdeaSentence();
    const text = encodeURIComponent(`💡 Here is our hackathon prompt for IEDC Idea Sprint 2026: "${sentence}" — Join the 24h ideathon at CEC! https://code-wanderer07.github.io/iedc-idea-sprint-2026/`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank', 'noopener,noreferrer');
  }

  useInRegistration() {
    const sentence = this.getCurrentIdeaSentence();
    const ideaInput = document.getElementById('form-idea');
    const registerSection = document.getElementById('register');

    if (ideaInput) {
      ideaInput.value = sentence;
      ideaInput.dispatchEvent(new Event('input', { bubbles: true }));
      ideaInput.classList.add('field-highlight');
      setTimeout(() => ideaInput.classList.remove('field-highlight'), 1800);
    }

    if (registerSection) {
      registerSection.scrollIntoView({ behavior: 'smooth' });
      if (ideaInput) {
        setTimeout(() => ideaInput.focus(), 600);
      }
    }
  }

  playClickSound() {
    try {
      if (!this.audioContext) {
        const AudioCtx = window.AudioContext || window.webkitAudioContext;
        if (AudioCtx) this.audioContext = new AudioCtx();
      }
      if (!this.audioContext) return;
      if (this.audioContext.state === 'suspended') {
        this.audioContext.resume();
      }
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(440, this.audioContext.currentTime);
      osc.frequency.exponentialRampToValueAtTime(880, this.audioContext.currentTime + 0.08);
      gain.gain.setValueAtTime(0.08, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.08);
      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.start();
      osc.stop(this.audioContext.currentTime + 0.08);
    } catch (_) {
      // Audio not supported or blocked
    }
  }

  playStopSound() {
    try {
      if (!this.audioContext) return;
      const osc = this.audioContext.createOscillator();
      const gain = this.audioContext.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(523.25, this.audioContext.currentTime); // C5
      gain.gain.setValueAtTime(0.05, this.audioContext.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
      osc.connect(gain);
      gain.connect(this.audioContext.destination);
      osc.start();
      osc.stop(this.audioContext.currentTime + 0.1);
    } catch (_) {
      // Audio not supported or blocked
    }
  }
}
