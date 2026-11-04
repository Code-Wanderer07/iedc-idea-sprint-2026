# IEDC Idea Sprint 2026 Microsite ⚡

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![Stack](https://img.shields.io/badge/Stack-Vanilla%20HTML%20%2B%20CSS%20%2B%20ES%20Modules-brightgreen)](#tech-stack)
[![Design System](https://img.shields.io/badge/Design%20System-Kinetic%20Forum-coral)](#brand--design-system)

Official event microsite for **IEDC Idea Sprint 2026**, a 24-hour student ideathon hosted by **IEDC Bootcamp CEC** (College of Engineering Chengannur, Kerala).

**Live URL:** [https://code-wanderer07.github.io/iedc-idea-sprint-2026/](https://code-wanderer07.github.io/iedc-idea-sprint-2026/)

---

## 📸 Overview & Features

- **24-Hour Monospace Sprint Clock:** Drift-free `Date.now()` countdown that smoothly transitions across 3 lifecycle states:
  - *Pre-Sprint:* Days, Hours, Minutes, Seconds countdown.
  - *Live Sprint:* Real-time 24-hour countdown clock with pulsing live indicators.
  - *Ended:* Celebratory wrap-up and post-event announcement.
- **Interactive Idea Spinner:** A 3-reel slot-machine generator combining **Problem Domain + Technology + Constraint** into hackathon challenge prompts:
  - Individual reel locking (e.g. lock a domain and re-spin technology & constraint).
  - Staggered mechanical stop animations with Web Audio synthesized sound feedback.
  - "Copy Prompt", "Share on WhatsApp", and "Use in Registration" (instant pre-fill into form).
  - Respects `prefers-reduced-motion` settings.
- **Festival Timetable Matrix:** Side-by-side broadsheet view on desktop (>=900px) and accessible tab-switched view on mobile (<900px). Supports category filters (Hacking, Mentoring, Food, Pitches).
- **Hacker Registration System:**
  - Client-side validation using Constraint Validation API and ARIA live error messaging.
  - Indian mobile number validator (`^[6-9]\d{9}$`).
  - Honeypot bot trap to filter spam.
  - Live 280-character counter for project ideas.
  - Duplicate registration protection with `localStorage`.
  - Confetti celebration and digital **Hacker Admission Pass / Ticket Generator** (with serial code, printable pass, and `.ics` Calendar download).
- **Zero Build Step:** 100% plain HTML, modern CSS tokens, and ES modules. No node_modules, webpack, or npm scripts needed. Instant GitHub Pages deployment.

---

## 🎨 Brand & Design System: "Kinetic Forum"

The visual language channels the electric atmosphere of global design and innovation festivals:
- **Aesthetic:** Editorial neo-brutalism tempered by warm paper goods, crisp 2px charcoal rules (`#18181B`), offset hard drop-shadows (`4px 4px 0px #18181B`), and dynamic tilted sticker badges (`rotate(-2deg)` to `rotate(2.5deg)`).
- **Color Palette:**
  - *Canvas:* Warm Cream (`#FFFDF8`)
  - *Ink & Rules:* Charcoal (`#18181B`)
  - *Royal Blue (`#1D4ED8`):* Primary CTAs, active anchors
  - *Risograph Coral (`#FF5A36`):* Urgent alerts, live badges, spin triggers
  - *Sunny Yellow (`#FDE047`):* Highlight ribbons, badges, stickers
  - *Mint Green (`#34D399`):* Open status, confirmation pills
  - *Lavender (`#DDD6FE`):* Secondary panels, metadata tags
- **Typography:**
  - **Display:** `Syne` (Weights 700, 800)
  - **Body / Interface:** `Plus Jakarta Sans` (Weights 400, 500, 600, 700)
  - **Utility & Metadata:** `JetBrains Mono` (Weights 500, 600, 700)

---

## 📂 File Architecture

```
/
├── index.html            # Main semantic markup, accessible landmarks, SEO/OG meta
├── css/
│   └── styles.css        # Kinetic Forum tokens, reset, typography, components, print rules
├── js/
│   ├── config.js         # Single-file configuration (dates, tracks, venue, backend URL)
│   ├── countdown.js      # Drift-free timer with state handling
│   ├── schedule.js       # Data-driven timetable matrix with filters
│   ├── spinner.js        # 3-reel interactive hackathon prompt slot machine
│   ├── form.js           # Registration validation, confetti, ticket generator
│   └── main.js           # Entrypoint, sticky nav, mobile drawer, accordions
├── assets/
│   ├── logo.svg          # Custom neo-brutalist IEDC Idea Sprint logo
│   ├── favicon.svg       # Lightning badge favicon
│   └── og-image.svg      # 1200x630 social preview card
├── LICENSE               # MIT License
└── README.md             # Documentation & deployment guide
```

---

## 🛠️ How to Customize & Deploy

### 1. Modify Event Dates or Tracks
All event parameters live in a single file: `js/config.js`.

```javascript
export const CONFIG = {
  eventTitle: "IEDC Idea Sprint 2026",
  eventStart: "2026-11-21T09:30:00+05:30", // IST start time
  eventEnd: "2026-11-22T09:30:00+05:30",   // IST 24-hour end
  venue: {
    name: "College of Engineering Chengannur (CEC)",
    // ...
  },
  // Connect your Google Sheet / Formspree webhook here:
  registrationEndpoint: ""
};
```

### 2. Connecting a Backend (Google Forms / Formspree / Zapier)
By default, submissions persist to the browser's `localStorage` and generate a client-side digital pass. To send entries directly to a spreadsheet or email:

1. Create a free endpoint on [Formspree](https://formspree.io) or deploy a [Google Apps Script Web App](https://github.com/levinunnink/google-sheet-web-app).
2. Set `registrationEndpoint` in `js/config.js`:
   ```javascript
   registrationEndpoint: "https://formspree.io/f/your_form_id"
   ```
3. That's it! When participants click "Confirm Team Registration", `form.js` will automatically dispatch a `POST` request with the JSON payload.

### 3. Deploying to GitHub Pages
1. Push this repository to GitHub on branch `main`.
2. Go to **Settings → Pages**.
3. Under **Branch**, select `main` and folder `/ (root)`.
4. Click **Save**. Your site is live in ~30 seconds at `https://<username>.github.io/<repo-name>/`.

---

## 🧪 Testing the 3 Countdown States

For ease of evaluation, you can test the 3 states of the countdown timer in two ways:
1. **Interactive Demo Bar:** Use the subtle toggle buttons in the Hero section ("Countdown", "Live Sprint", "Ended").
2. **URL Parameters:**
   - Pre-sprint countdown: `index.html?state=before`
   - Active 24-hour sprint clock: `index.html?state=live`
   - Concluded event: `index.html?state=ended`

---

## 📜 Credits & License

- **Hosted by:** IEDC Bootcamp CEC (College of Engineering Chengannur)
- **Typography:** [Google Fonts](https://fonts.google.com/) (`Syne`, `Plus Jakarta Sans`, `JetBrains Mono`)
- **Icons & Graphics:** Handcrafted inline SVG vector assets
- **License:** [MIT License](LICENSE)
