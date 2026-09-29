/* ============================================================
   NANCY HAZEL — data.js (FINAL v12 — Apps tab removed)
   Applications ab dedicated "Brand Applications" section me hain
   ============================================================ */

const CATEGORIES = {
  comics: {
    label: "Comics",
    tools: ["Clip Studio", "Photoshop", "Procreate"],
    count: 45,
    prefix: "comic"
  },
  art2d: {
    label: "2D Arts",
    tools: ["Photoshop", "Clip Studio", "Krita"],
    count: 40,
    prefix: "art"
  },
  emotes: {
    label: "Emotes",
    tools: ["Photoshop", "Aseprite", "Clip Studio"],
    count: 30,
    prefix: "emote"
  },
  mascots: {
    label: "Mascot Logos",
    tools: ["Illustrator", "Photoshop", "Clip Studio"],
    count: 15,
    prefix: "mascot"
  },
  tattoos: {
    label: "Tattoos",
    tools: ["Photoshop", "Procreate", "Clip Studio"],
    count: 15,
    prefix: "tattoo"
  },
  /* Websites loop se NAHI — neeche custom array se (links ke sath) */
  websites: {
    label: "Website",
    count: 0,
    prefix: "website"
  }
};

/* ---------- 🌐 WEBSITES — 5 cards with Live Preview ---------- */
const WEBSITES = [
  {
    category: "websites",
    title: "Autoparts Website",
    desc: "A modern auto parts store with clean product listings, categories and fast navigation for car enthusiasts.",
    img: "images/websites/website-1.webp",
    link: "https://autoparts-website-phi.vercel.app/"
  },
  {
    category: "websites",
    title: "Construction Website",
    desc: "A bold construction company website showcasing projects, services and expertise with a professional layout.",
    img: "images/websites/website-2.webp",
    link: "https://construction-website-ochre.vercel.app/"
  },
  {
    category: "websites",
    title: "Gym & Fitness Website",
    desc: "An energetic gym website featuring training programs, trainer profiles and membership plans with punchy design.",
    img: "images/websites/website-3.webp",
    link: "https://gym-website-three-kohl.vercel.app/"
  },
  {
    category: "websites",
    title: "School Website",
    desc: "A friendly school website with admissions, courses and campus highlights — clean and easy to navigate.",
    img: "images/websites/website-4.webp",
    link: "https://school-website-beige-omega.vercel.app/"
  },
  {
    category: "websites",
    title: "Hospital Website",
    desc: "A trust-building hospital website with departments, doctors and appointment info in a calm, clean design.",
    img: "images/websites/website-5.webp",
    link: "https://hospital-website-ochre.vercel.app/"
  }
];

/* ================================================================
   ⚠️ NEECHE KUCH MAT BADLO — AUTO ASSEMBLY
   ================================================================ */

const allImages = [];

Object.keys(CATEGORIES).forEach(catKey => {
  const cat = CATEGORIES[catKey];
  for (let i = 1; i <= cat.count; i++) {
    allImages.push({
      src: `images/${catKey}/${cat.prefix}-${i}.webp`,
      full: `images/${catKey}/${cat.prefix}-${i}.webp`,
      category: catKey,
      id: i
    });
  }
});

// Websites (5 cards with Live Preview)
WEBSITES.forEach((w, i) => {
  allImages.push({ ...w, src: w.img, full: w.img, id: i + 1 });
});

console.log('✦ Images loaded:', allImages.length);