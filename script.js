/* ============================================================
   NANCY HAZEL — script.js (FINAL v15 — Videos removed)
   6 Tabs: Comics | 2D Arts | Emotes | 3D Models |
   Mascot Logos | Websites — Image lightbox
   ============================================================ */

/* 1. IMAGE LOAD — fade-in jab image load ho */
function setupImageLoading() {
  document.querySelectorAll('img.gallery-img').forEach(img => {
    if (img.complete) {
      img.classList.add('loaded');
    } else {
      img.addEventListener('load', () => img.classList.add('loaded'), { once: true });
      img.addEventListener('error', () => {
        img.classList.add('loaded');
        img.style.background = '#FFE8EE';
      }, { once: true });
    }
  });
}

/* 2. SCROLL REVEAL */
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

/* 3. CATEGORY HEADINGS */
const CATEGORY_META = {
  comics:   { title: "Comics",       desc: "Story-driven comic pages made with love for amazing clients." },
  art2d:    { title: "2D Arts",      desc: "Character illustrations, portraits and concept artwork." },
  emotes:   { title: "Emotes",       desc: "Twitch & Discord emote packs — expressive, cute and readable." },
  models3d: { title: "3D Models",    desc: "Detailed 3D models & renders — characters, props and scenes." },
  mascots:  { title: "Mascot Logos", desc: "Esports & stream mascot logos with bold shield designs." },
  websites: { title: "Websites",     desc: "Modern, responsive websites designed and built from scratch." }
};

/* 4. TAB ORDER — 6 tabs */
const TAB_ORDER = [
  { key: "comics",   label: "Comics" },
  { key: "art2d",    label: "2D Arts" },
  { key: "emotes",   label: "Emotes" },
  { key: "models3d", label: "3D Models" },
  { key: "mascots",  label: "Mascot Logos" },
  { key: "websites", label: "Websites" }
];

/* 5. BUILD GALLERY — website cards + image cards */
const galleryGrid = document.getElementById('galleryGrid');
const galleryTitle = document.getElementById('galleryTitle');
const galleryDesc = document.getElementById('galleryDesc');

function buildGallery() {
  if (!galleryGrid) return;

  allImages.forEach((img) => {

    /* ----- 🌐 WEBSITE CARD (Live Preview button) ----- */
    if (img.title && img.desc) {
      const btnHTML = img.link
        ? `<a href="${img.link}" target="_blank" rel="noopener" class="btn-preview">Live Preview <i class="fa-solid fa-arrow-up-right-from-square"></i></a>`
        : '';
      galleryGrid.insertAdjacentHTML("beforeend", `
        <figure class="gallery-card custom-card reveal" data-category="${img.category}">
          <div class="img-box">
            <img src="${img.src}" data-full="${img.full}"
                 alt="${img.title} by Nancy Hazel" loading="lazy" class="gallery-img">
          </div>
          <div class="card-info custom-info">
            <h3>${img.title}</h3>
            <p class="card-desc">${img.desc}</p>
            ${btnHTML}
          </div>
        </figure>
      `);
      return;
    }

    /* ----- 🖼️ NORMAL IMAGE CARD ----- */
    const cat = CATEGORIES[img.category];
    galleryGrid.insertAdjacentHTML("beforeend", `
      <figure class="gallery-card reveal" data-category="${img.category}">
        <div class="img-box">
          <img src="${img.src}" data-full="${img.full}"
               alt="${cat.label} artwork #${img.id} by Nancy Hazel" loading="lazy" class="gallery-img">
        </div>
        <div class="card-info">
          <h3>${cat.label} #${img.id}</h3>
          <span class="card-cat">${cat.label}</span>
        </div>
      </figure>
    `);
  });
}

/* 6. FILTER TABS */
function buildFilterTabs() {
  const tabsWrap = document.getElementById('filterTabs');
  if (!tabsWrap) return;

  const counts = {};
  allImages.forEach(x => counts[x.category] = (counts[x.category] || 0) + 1);

  let html = '';
  TAB_ORDER.forEach((t, idx) => {
    html += `<button class="tab${idx === 0 ? ' active' : ''}" data-filter="${t.key}">${t.label} <span class="tab-count">${counts[t.key] || 0}</span></button>`;
  });

  tabsWrap.innerHTML = html;
}

/* 7. FILTER + VIEW ALL */
const filterTabs = document.getElementById('filterTabs');
const viewAllBtn = document.getElementById('viewAllBtn');
const loadMoreWrap = document.getElementById('loadMoreWrap');

const INITIAL_COUNT = 6;
let currentFilter = 'comics';
let isExpanded = false;

function applyFilter() {
  const allCards = Array.from(galleryGrid.querySelectorAll('.gallery-card'));
  let shownCount = 0;
  let totalMatched = 0;

  allCards.forEach(card => {
    const isMatch = card.dataset.category === currentFilter;
    if (!isMatch) { card.classList.add('card-hidden'); return; }
    totalMatched++;

    const shouldShow = isExpanded || shownCount < INITIAL_COUNT;
    if (shouldShow) {
      shownCount++;
      card.classList.remove('card-hidden', 'filter-in');
      void card.offsetWidth;
      card.classList.add('filter-in');
    } else {
      card.classList.add('card-hidden');
    }
  });

  const meta = CATEGORY_META[currentFilter];
  if (meta) {
    galleryTitle.textContent = meta.title;
    galleryDesc.textContent = meta.desc;
  }

  const hasMore = totalMatched > shownCount;
  loadMoreWrap.classList.toggle('hidden-btn', isExpanded || !hasMore);
  if (!isExpanded && hasMore) {
    viewAllBtn.innerHTML = `View All ${totalMatched - shownCount} More <i class="fa-solid fa-arrow-down"></i>`;
  }
}

function setActiveTab(filterKey) {
  filterTabs.querySelectorAll('.tab').forEach(t =>
    t.classList.toggle('active', t.dataset.filter === filterKey)
  );
}

filterTabs.addEventListener('click', (e) => {
  const tab = e.target.closest('.tab');
  if (!tab) return;
  currentFilter = tab.dataset.filter;
  isExpanded = false;
  setActiveTab(currentFilter);
  applyFilter();
  setActiveNav(currentFilter);
});

viewAllBtn.addEventListener('click', () => {
  isExpanded = true;
  applyFilter();
  viewAllBtn.innerHTML = `Showing Everything ✦ <i class="fa-solid fa-heart"></i>`;
});

/* 8. NAVBAR ROUTING */
const navLinks = document.querySelectorAll('.nav-link');
const navbar = document.getElementById('navbar');

function setActiveNav(key) {
  navLinks.forEach(l => {
    const matches = l.dataset.cat === key || l.dataset.section === key;
    l.classList.toggle('active', matches);
  });
}

const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navLinks');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    const cat = link.dataset.cat;
    if (cat) {
      currentFilter = cat;
      isExpanded = false;
      setActiveTab(cat);
      applyFilter();
      setActiveNav(cat);
    }
    hamburger.classList.remove('open');
    navMenu.classList.remove('open');
    document.body.style.overflow = '';
  });
});

/* 9. SCROLL — navbar, progress, active link */
const progressBar = document.getElementById('scrollProgress');
const brandingSection = document.getElementById('branding-case');

function updateNavOnScroll() {
  const scrollY = window.scrollY;

  navbar.classList.toggle('scrolled', scrollY > 30);

  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  progressBar.style.width = (docHeight > 0 ? (scrollY / docHeight) * 100 : 0) + '%';

  const brandingTop = brandingSection ? brandingSection.offsetTop - 150 : Infinity;

  if (scrollY >= brandingTop) {
    setActiveNav('branding');
  } else {
    setActiveNav(currentFilter);
  }
}

window.addEventListener('scroll', updateNavOnScroll, { passive: true });

/* 10. HAMBURGER */
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navMenu.classList.toggle('open');
  document.body.style.overflow = navMenu.classList.contains('open') ? 'hidden' : '';
});

/* 11. LIGHTBOX — Images only */
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');
const lightboxPrev = document.getElementById('lightboxPrev');
const lightboxNext = document.getElementById('lightboxNext');

let currentGallery = [];
let currentIndex = 0;

function openLightbox(img) {
  currentGallery = Array.from(
    galleryGrid.querySelectorAll('.gallery-card:not(.card-hidden) img.gallery-img')
  ).map(i => ({ src: i.dataset.full || i.src, alt: i.alt }));

  currentIndex = currentGallery.findIndex(item => item.src === (img.dataset.full || img.src));
  if (currentIndex < 0) currentIndex = 0;

  showLightboxImage();
  lightbox.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function showLightboxImage() {
  const item = currentGallery[currentIndex];
  if (!item) return;
  lightboxImg.style.opacity = '0';
  const temp = new Image();
  temp.onload = () => {
    lightboxImg.src = item.src;
    lightboxImg.alt = item.alt;
    lightboxImg.style.opacity = '1';
  };
  temp.src = item.src;
  lightboxCaption.textContent = item.alt;
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = '';
}

function prevImage() {
  currentIndex = (currentIndex - 1 + currentGallery.length) % currentGallery.length;
  showLightboxImage();
}
function nextImage() {
  currentIndex = (currentIndex + 1) % currentGallery.length;
  showLightboxImage();
}

/* Gallery click — image lightbox khulegi */
galleryGrid.addEventListener('click', (e) => {
  if (e.target.closest('.btn-preview')) return;
  const img = e.target.closest('img.gallery-img');
  if (img) openLightbox(img);
});

lightboxClose.addEventListener('click', closeLightbox);
lightboxPrev.addEventListener('click', prevImage);
lightboxNext.addEventListener('click', nextImage);
lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;
  if (e.key === 'Escape') closeLightbox();
  if (e.key === 'ArrowLeft') prevImage();
  if (e.key === 'ArrowRight') nextImage();
});

/* Swipe — mobile pe left/right swipe */
let touchStartX = 0;
lightbox.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
}, { passive: true });
lightbox.addEventListener('touchend', (e) => {
  const diff = e.changedTouches[0].screenX - touchStartX;
  if (Math.abs(diff) > 60) diff > 0 ? prevImage() : nextImage();
}, { passive: true });

/* 12. INIT */
buildFilterTabs();
buildGallery();
applyFilter();
setupImageLoading();
updateNavOnScroll();

document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

console.log('%c✦ Nancy Hazel Portfolio ✦', 'color:#FF6B9D;font-size:20px;font-weight:bold;');
console.log('%cTotal items loaded: ' + allImages.length, 'color:#FF8E53;font-size:14px;');