/**
 * IEDC Idea Sprint 2026 - Central Configuration
 * Easy single-point editing for dates, venue, tracks, and backend endpoints.
 */

export const CONFIG = {
  // Event Details
  eventTitle: "IEDC Idea Sprint 2026",
  eventSubtitle: "24-hour student ideathon · Hosted by IEDC Bootcamp CEC",
  edition: "2026 Edition",
  
  // Timing (ISO 8601 string with IST +05:30 offset)
  // Default start: November 21, 2026 at 09:30 AM IST
  // Sprint duration: 24 hours -> Ends November 22, 2026 at 09:30 AM IST
  eventStart: "2026-11-21T09:30:00+05:30",
  eventEnd: "2026-11-22T09:30:00+05:30",
  
  // Venue
  venue: {
    name: "College of Engineering Chengannur (CEC)",
    hall: "Central Auditorium & Innovation Labs",
    city: "Chengannur, Alappuzha, Kerala 689121",
    mapQuery: "College of Engineering Chengannur",
    mapUrl: "https://maps.google.com/?q=College+of+Engineering+Chengannur"
  },
  
  // Prize Pool & Stats
  stats: {
    prizePool: "₹50,000+",
    durationHours: "24",
    maxTeamSize: "4",
    mentorCount: "15+",
    teamsLimit: "40"
  },

  // Tracks
  tracks: [
    {
      id: "ai-smart-systems",
      name: "AI & Smart Systems",
      badge: "HOT TRACK",
      color: "#1D4ED8",
      description: "Harness generative AI, computer vision, and machine learning to automate complex tasks, solve localized vernacular challenges, or reimagine everyday tools.",
      keywords: ["Generative AI", "Edge ML", "NLP", "Computer Vision"]
    },
    {
      id: "climate-sustainability",
      name: "Sustainability & CleanTech",
      badge: "IMPACT",
      color: "#34D399",
      description: "Build software and hardware solutions combating climate change, energy waste, water scarcity, sustainable agriculture, and circular zero-waste lifecycles.",
      keywords: ["Renewable Energy", "Smart Agriculture", "Carbon Tracking", "Waste Tech"]
    },
    {
      id: "campus-civic",
      name: "Campus Life & Civic Tech",
      badge: "STUDENT SPECIAL",
      color: "#FDE047",
      description: "Directly improve collegiate experiences, student well-being, public transportation, citizen grievance redressal, or transparent governance.",
      keywords: ["EdTech", "Campus Automation", "Public Safety", "Transit"]
    },
    {
      id: "open-innovation",
      name: "Open Innovation & FinTech",
      badge: "WILDCARD",
      color: "#FF5A36",
      description: "Have a moonshot idea that defies conventional boundaries? Explore micro-finance, decentralized protocols, accessible robotics, or novel developer tooling.",
      keywords: ["FinTech", "Accessibility", "Open Source", "Micro-SaaS"]
    }
  ],

  // Contact Info
  contact: {
    email: "iedc@ceconline.edu",
    phone: "+91 94000 12345",
    whatsapp: "+919400012345",
    whatsappUrl: "https://wa.me/919400012345?text=Hello%20IEDC%20CEC%20Team!%20I%20have%20a%20query%20about%20Idea%20Sprint%202026",
    instagram: "https://instagram.com/iedc_cec",
    linkedin: "https://linkedin.com/company/iedc-bootcamp-cec",
    github: "https://github.com/iedc-cec",
    twitter: "https://x.com/iedc_cec"
  },

  // Backend endpoint:
  // If set to an external webhook (e.g. Google Apps Script / Formspree / Zapier),
  // form.js will send a POST request with the JSON payload.
  // Leave empty ("") to operate purely frontend with localStorage persistence.
  registrationEndpoint: "",

  // Storage key for localStorage registrations
  storageKey: "iedc_idea_sprint_2026_reg"
};
