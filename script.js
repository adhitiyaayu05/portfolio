document.getElementById('year').textContent = new Date().getFullYear();

// --- Mobile menu toggle ---
const menuToggle = document.getElementById('menuToggle');
const primaryNav = document.getElementById('primaryNav');

menuToggle.addEventListener('click', () => {
  const isOpen = primaryNav.classList.toggle('is-open');
  menuToggle.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

primaryNav.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    primaryNav.classList.remove('is-open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// --- Scrollspy: highlight current section in nav ---
const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.primary-nav a[href^="#"]');

const highlightNav = () => {
  const scrollPos = window.scrollY + 160;
  let currentId = sections[0] ? sections[0].id : null;

  sections.forEach((section) => {
    if (scrollPos >= section.offsetTop) {
      currentId = section.id;
    }
  });

  navLinks.forEach((link) => {
    link.classList.toggle('is-active', link.getAttribute('href') === `#${currentId}`);
  });
};

window.addEventListener('scroll', highlightNav, { passive: true });
window.addEventListener('load', highlightNav);

// --- Back to top: explicit handler (don't rely only on native anchor jump,
// which can misbehave on some mobile browsers when the target sits inside
// a position:sticky header) ---
document.querySelectorAll('a[href="#top"]').forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
});

// --- Certificates gallery ---
// Cara nambahin sertifikat baru:
// 1. Taruh file fotonya di folder assets/img/certificates/
// 2. Tambah satu baris baru di array CERTIFICATES di bawah ini, formatnya:
//    { src: "assets/img/certificates/NAMA-FILE.jpg", title: "Judul Sertifikat" }
// Titik. Nggak perlu ubah HTML atau CSS sama sekali.
const CERTIFICATES = [
  // { src: "assets/img/certificates/bnsp-junior-web-developer.jpg", title: "BNSP — Junior Web Developer (2026)" },
  // { src: "assets/img/certificates/juri-kompetisi-website.jpg", title: "Certificate of Jury, Website Competition (2025)" },
   { src: "assets/img/certificates/bnsp-junior-web-developer.jpeg", title: "BNSP — Junior Web Developer (2026)" },
  { src: "assets/img/certificates/juri-kompetisi-website.jpeg", title: "Certificate of Jury, Website Competition (2025)" },
  { src: "assets/img/certificates/sertifikat-pelatihan-literasi-asuransi.jpeg", title: "Insurance Training and Literacy Certificate (2024)" },
  { src: "assets/img/certificates/piagam-rektor.jpeg", title: "Rector's Certificate of Recognition for High-Achieving Students" },
  { src: "assets/img/certificates/piagam-penghargaan.jpeg", title: "Certificate of Appreciation" },
  { src: "assets/img/certificates/sertif-panitia.jpeg", title: "Organizing Committee Certificate" },
  { src: "assets/img/certificates/sertifikat-panitia2.jpeg", title: "Organizing Committee Certificate2" },
  { src: "assets/img/certificates/sertifikat-bisaai.jpeg", title: "Certificate bisaai" },
];

const certGrid = document.getElementById('certGrid');
const certEmpty = document.getElementById('certEmpty');
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightboxImg');
const lightboxCaption = document.getElementById('lightboxCaption');
const lightboxClose = document.getElementById('lightboxClose');

function openLightbox(src, title) {
  lightboxImg.src = src;
  lightboxImg.alt = title;
  lightboxCaption.textContent = title;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('is-open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (CERTIFICATES.length === 0) {
  certEmpty.classList.add('is-visible');
} else {
  CERTIFICATES.forEach((cert) => {
    const btn = document.createElement('button');
    btn.className = 'cert-item';
    btn.type = 'button';
    btn.setAttribute('aria-label', `Lihat ${cert.title}`);

    const img = document.createElement('img');
    img.src = cert.src;
    img.alt = cert.title;
    img.loading = 'lazy';

    btn.appendChild(img);
    btn.addEventListener('click', () => openLightbox(cert.src, cert.title));
    certGrid.appendChild(btn);
  });
}

lightboxClose.addEventListener('click', closeLightbox);
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) closeLightbox();
});
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeLightbox();
});
