/* ============================================================
   NANCY HAZEL — data.js (FINAL v16)
   Comics 25 | 2D Arts 25 | Emotes 30 | 3D Models 5 |
   Mascot Logos 15 | Websites 2 (Gym img path fixed)
   ============================================================ */

const CATEGORIES = {
  comics: {
    label: "Comics",
    count: 25,
    prefix: "comic"
  },
  art2d: {
    label: "2D Arts",
    count: 25,
    prefix: "art"
  },
  emotes: {
    label: "Emotes",
    count: 30,
    prefix: "emote"
  },
  models3d: {
    label: "3D Models",
    count: 5,
    prefix: "model"
  },
  mascots: {
    label: "Mascot Logos",
    count: 15,
    prefix: "mascot"
  }
};

/* ---------- 🌐 WEBSITES — sirf 2 (Autoparts + Gym & Fitness) ---------- */
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
    title: "Gym & Fitness Website",
    desc: "An energetic gym website featuring training programs, trainer profiles and membership plans with punchy design.",
    img: "images/websites/website-2.webp",
    link: "https://gym-website-three-kohl.vercel.app/"
  }
];

/* ================================================================
   ⚠️ NEECHE KUCH MAT BADLO — AUTO ASSEMBLY
   ================================================================ */

const allImages = [];

// Normal image categories (comics, 2d, emotes, 3d, mascots)
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

// Websites (2 cards with Live Preview)
WEBSITES.forEach((w, i) => {
  allImages.push({ ...w, src: w.img, full: w.img, id: i + 1 });
});

console.log('✦ Total items loaded:', allImages.length);