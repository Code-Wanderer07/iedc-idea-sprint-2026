/**
 * IEDC Idea Sprint 2026 - Schedule Matrix
 * Data-driven timeline renderer with tab switching, category filtering,
 * live slot highlighting, and accessible keyboard navigation.
 */

export const SCHEDULE_DATA = [
  // Day 1: Saturday
  {
    id: "d1-reg",
    day: 1,
    time: "08:30 AM - 09:30 AM",
    title: "Registration & Hacker Check-in",
    category: "admin",
    stage: "Atrium Desk",
    badge: "CHECK-IN",
    badgeColor: "lavender",
    description: "Collect your credentials, custom hacker ID card, official event stickers, and complimentary welcome fuel kit."
  },
  {
    id: "d1-inaug",
    day: 1,
    time: "09:30 AM - 10:30 AM",
    title: "Inauguration & Keynote Address",
    category: "keynote",
    stage: "Main Auditorium",
    badge: "KEYNOTE",
    badgeColor: "coral",
    description: "Welcome address by IEDC Nodal Officer, principal address, and visionary opening remarks from leading startup founders."
  },
  {
    id: "d1-brief",
    day: 1,
    time: "10:30 AM - 11:30 AM",
    title: "Problem Briefing & Team Finalization",
    category: "hacking",
    stage: "Main Auditorium",
    badge: "TRACKS",
    badgeColor: "yellow",
    description: "Deep dive into the 4 thematic sprint tracks. Solo participants are matched into cohesive 2-4 person squads."
  },
  {
    id: "d1-start",
    day: 1,
    time: "11:30 AM SHARP",
    title: "HACKING COMMENCES: Clock Starts",
    category: "hacking",
    stage: "Innovation Lab & Studios",
    badge: "24H CLOCK",
    badgeColor: "coral",
    description: "The 24-hour sprint clock officially starts. High-speed Wi-Fi active, power strips deployed, and prototyping begins."
  },
  {
    id: "d1-lunch",
    day: 1,
    time: "01:30 PM - 02:30 PM",
    title: "Networking Lunch & Brain Fuel",
    category: "food",
    stage: "Campus Cafeteria",
    badge: "FOOD & DRINK",
    badgeColor: "mint",
    description: "Nutritious traditional Kerala lunch buffet. Step away from keyboards and network with fellow college teams."
  },
  {
    id: "d1-mentor1",
    day: 1,
    time: "03:30 PM - 06:00 PM",
    title: "Mentor Review Round 1: Architecture & Feasibility",
    category: "mentor",
    stage: "Lab Pods",
    badge: "1:1 MENTORSHIP",
    badgeColor: "yellow",
    description: "Industry architects visit each desk. Get critical feedback on technical viability, data models, and user workflow."
  },
  {
    id: "d1-dinner",
    day: 1,
    time: "08:30 PM - 09:30 PM",
    title: "Dinner & Lightning Demos",
    category: "food",
    stage: "Cafeteria & Open Lawn",
    badge: "FOOD & DRINK",
    badgeColor: "mint",
    description: "Dinner service, music playlist curated by hackers, and optional 60-second impromptu lightning demos."
  },
  {
    id: "d1-mini",
    day: 1,
    time: "11:00 PM - 11:45 PM",
    title: "Midnight Mini-Challenge: Cyber Scavenger",
    category: "food",
    stage: "Main Hall",
    badge: "SURPRISE PRIZES",
    badgeColor: "lavender",
    description: "Quick 30-minute brain teaser and typing speed battle to rejuvenate weary minds. Exclusive swag for winners!"
  },

  // Day 2: Sunday
  {
    id: "d2-midnight",
    day: 2,
    time: "12:00 AM MIDNIGHT",
    title: "Midnight Caffeine Surge & Ice Cream",
    category: "food",
    stage: "Hackers Lounge",
    badge: "ENERGY BOOST",
    badgeColor: "mint",
    description: "Fresh hot filter coffee, tea, and late-night snacks to fuel the overnight deep-work sprint phase."
  },
  {
    id: "d2-mentor2",
    day: 2,
    time: "02:30 AM - 04:30 AM",
    title: "Mentor Review Round 2: Pitch Polish & UI Review",
    category: "mentor",
    stage: "Lab Pods",
    badge: "CRITICAL CLINIC",
    badgeColor: "yellow",
    description: "Designers and venture analysts critique pitch slides, value propositions, and polish user journeys."
  },
  {
    id: "d2-breakfast",
    day: 2,
    time: "07:30 AM - 08:30 AM",
    title: "Breakfast & Morning Refreshment",
    category: "food",
    stage: "Campus Cafeteria",
    badge: "FOOD & DRINK",
    badgeColor: "mint",
    description: "Hot appam, stew, idli & fresh tea. Freshen up and finalize the demo environment before the freeze."
  },
  {
    id: "d2-freeze",
    day: 2,
    time: "10:30 AM SHARP",
    title: "SUBMISSION DEADLINE & CODE FREEZE",
    category: "hacking",
    stage: "GitHub Portal",
    badge: "DEADLINE",
    badgeColor: "coral",
    description: "All GitHub commits and slide submissions lock permanently. No exceptions. 24 hours of hacking officially done!"
  },
  {
    id: "d2-pitches",
    day: 2,
    time: "11:00 AM - 01:00 PM",
    title: "Track Semifinals: 5-Minute Pitches",
    category: "pitch",
    stage: "Track Breakout Rooms",
    badge: "EVALUATION",
    badgeColor: "yellow",
    description: "Teams pitch to juries within their thematic track: 3 minutes live demo + 2 minutes strict Q&A."
  },
  {
    id: "d2-lunch",
    day: 2,
    time: "01:00 PM - 02:00 PM",
    title: "Lunch & Finalist Selection",
    category: "food",
    stage: "Cafeteria",
    badge: "LUNCH",
    badgeColor: "mint",
    description: "Jury aggregates scorecards. Top 8 teams across all 4 tracks advance to the Grand Finale."
  },
  {
    id: "d2-finale",
    day: 2,
    time: "02:00 PM - 03:45 PM",
    title: "Grand Finale: Top 8 Finalist Pitches",
    category: "pitch",
    stage: "Main Auditorium",
    badge: "MAIN STAGE",
    badgeColor: "coral",
    description: "The top 8 teams present live on the grand stage before external venture capitalists, alumni, and peers."
  },
  {
    id: "d2-closing",
    day: 2,
    time: "04:00 PM - 05:00 PM",
    title: "Awards Ceremony, Valedictory & Photos",
    category: "admin",
    stage: "Main Auditorium",
    badge: "AWARDS ₹50K+",
    badgeColor: "mint",
    description: "Announcement of track winners, grand champions, certificate distribution, mentor felicitations, and group photos."
  }
];

export class Schedule {
  constructor() {
    this.currentDay = 1;
    this.currentCategory = 'all';
    this.dom = {
      tabButtons: document.querySelectorAll('[data-schedule-tab]'),
      filterButtons: document.querySelectorAll('[data-schedule-filter]'),
      day1Container: document.getElementById('schedule-day-1'),
      day2Container: document.getElementById('schedule-day-2')
    };
  }

  init() {
    this.render();
    this.bindEvents();
    this.initScrollReveal();
  }

  bindEvents() {
    // Mobile Tab switching
    this.dom.tabButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const day = parseInt(btn.dataset.scheduleTab, 10);
        this.switchDay(day);
      });

      // Keyboard accessibility (Left/Right arrows)
      btn.addEventListener('keydown', (e) => {
        if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') {
          e.preventDefault();
          const targetDay = this.currentDay === 1 ? 2 : 1;
          const targetBtn = document.querySelector(`[data-schedule-tab="${targetDay}"]`);
          if (targetBtn) {
            targetBtn.focus();
            this.switchDay(targetDay);
          }
        }
      });
    });

    // Category filtering
    this.dom.filterButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const cat = btn.dataset.scheduleFilter;
        this.currentCategory = cat;
        this.dom.filterButtons.forEach(b => {
          b.classList.remove('is-active');
          b.setAttribute('aria-pressed', 'false');
        });
        btn.classList.add('is-active');
        btn.setAttribute('aria-pressed', 'true');
        this.filterCards();
      });
    });
  }

  switchDay(day) {
    this.currentDay = day;
    this.dom.tabButtons.forEach(btn => {
      const btnDay = parseInt(btn.dataset.scheduleTab, 10);
      const isSelected = btnDay === day;
      btn.classList.toggle('is-active', isSelected);
      btn.setAttribute('aria-selected', isSelected ? 'true' : 'false');
    });

    if (this.dom.day1Container && this.dom.day2Container) {
      if (window.innerWidth < 900) {
        // Mobile view: hide unselected day
        this.dom.day1Container.classList.toggle('is-hidden', day !== 1);
        this.dom.day2Container.classList.toggle('is-hidden', day !== 2);
      } else {
        // Desktop view: both columns visible
        this.dom.day1Container.classList.remove('is-hidden');
        this.dom.day2Container.classList.remove('is-hidden');
      }
    }
  }

  render() {
    const day1Items = SCHEDULE_DATA.filter(item => item.day === 1);
    const day2Items = SCHEDULE_DATA.filter(item => item.day === 2);

    if (this.dom.day1Container) {
      this.dom.day1Container.innerHTML = day1Items.map(item => this.createCardHTML(item)).join('');
    }
    if (this.dom.day2Container) {
      this.dom.day2Container.innerHTML = day2Items.map(item => this.createCardHTML(item)).join('');
    }

    // Call switchDay to properly set mobile visibility
    this.switchDay(this.currentDay);

    // Listen to resize to adapt display
    window.addEventListener('resize', () => {
      this.switchDay(this.currentDay);
    });
  }

  createCardHTML(item) {
    return `
      <article class="timeline-card reveal-item" data-category="${item.category}" id="${item.id}">
        <div class="timeline-card__rail">
          <div class="timeline-card__node"></div>
          <div class="timeline-card__line"></div>
        </div>
        <div class="timeline-card__content">
          <div class="timeline-card__header">
            <time class="timeline-card__time">${item.time}</time>
            <span class="timeline-card__badge badge--${item.badgeColor}">${item.badge}</span>
          </div>
          <h3 class="timeline-card__title">${item.title}</h3>
          <p class="timeline-card__desc">${item.description}</p>
          <div class="timeline-card__footer">
            <span class="timeline-card__stage">
              <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" aria-hidden="true">
                <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path>
                <circle cx="12" cy="10" r="3"></circle>
              </svg>
              ${item.stage}
            </span>
          </div>
        </div>
      </article>
    `;
  }

  filterCards() {
    const allCards = document.querySelectorAll('.timeline-card');
    allCards.forEach(card => {
      const cat = card.dataset.category;
      if (this.currentCategory === 'all' || cat === this.currentCategory) {
        card.style.display = 'flex';
      } else {
        card.style.display = 'none';
      }
    });
  }

  initScrollReveal() {
    if (!('IntersectionObserver' in window)) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      rootMargin: '0px 0px -40px 0px',
      threshold: 0.1
    });

    document.querySelectorAll('.timeline-card').forEach(el => observer.observe(el));
  }
}
