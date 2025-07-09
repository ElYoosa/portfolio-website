
// Theme toggle functionality
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.classList.toggle('dark-mode', savedTheme === 'dark');
  updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  const isDark = body.classList.contains('dark-mode');
  localStorage.setItem('theme', isDark ? 'dark' : 'light');
  updateThemeIcon();
});

function updateThemeIcon() {
  const isDark = body.classList.contains('dark-mode');
  themeToggle.textContent = isDark ? '☀️' : '🌙';
}

updateThemeIcon();

const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('show', window.scrollY > 300);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const headerHeight = document.querySelector('.header').offsetHeight;
      const targetPosition = target.offsetTop - headerHeight;
      window.scrollTo({ top: targetPosition, behavior: 'smooth' });
    }
  });
});

function showPopup(title, description) {
  document.getElementById('popup-title').textContent = title;
  document.getElementById('popup-description').textContent = description;
  document.getElementById('popup').classList.add('show');
  document.body.style.overflow = 'hidden';
}

function closePopup() {
  document.getElementById('popup').classList.remove('show');
  document.body.style.overflow = 'auto';
}

document.getElementById('popup').addEventListener('click', (e) => {
  if (e.target === document.getElementById('popup')) closePopup();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && document.getElementById('popup').classList.contains('show')) closePopup();
});

const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

document.addEventListener('DOMContentLoaded', () => {
  const cards = document.querySelectorAll('.skill-card, .project-card, .certificate-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
  });

  // Zoom sertifikat sebagai popup dengan tombol Tutup dan Unduh
  const certImgs = document.querySelectorAll('.certificate-img');
  certImgs.forEach(img => {
    img.addEventListener('click', () => {
      const popupWindow = window.open('', 'popupImage', 'width=800,height=600,scrollbars=yes');
      popupWindow.document.write('<html><head><title>Sertifikat</title></head><body style="margin:0;background:#000;display:flex;align-items:center;justify-content:center;">');
      popupWindow.document.write('<div style="position:relative;text-align:center;width:100%;height:100%;">');
      popupWindow.document.write('<button onclick="window.close()" style="position:absolute;top:20px;right:20px;padding:10px 20px;font-size:16px;cursor:pointer;border:none;background:#e53e3e;color:white;border-radius:6px;margin-left:10px;">Tutup</button>');
      popupWindow.document.write('<button onclick="downloadImage()" style="position:absolute;top:20px;right:110px;padding:10px 20px;font-size:16px;cursor:pointer;border:none;background:#3182ce;color:white;border-radius:6px;">Unduh</button>');
      popupWindow.document.write('<img id="popupImg" src="' + img.src + '" style="max-width:100%;max-height:100%;border-radius:8px;">');
      popupWindow.document.write('<script>function downloadImage() {const link = document.createElement("a");link.href = document.getElementById("popupImg").src;link.download = link.href.split("/").pop();document.body.appendChild(link);link.click();document.body.removeChild(link);}</script>');
      popupWindow.document.write('</div></body></html>');
    });
  });
});

window.addEventListener('scroll', () => {
  const header = document.querySelector('.header');
  const currentScrollY = window.scrollY;

  if (currentScrollY > 100) {
    header.style.background = body.classList.contains('dark-mode')
      ? 'rgba(15, 15, 35, 0.98)'
      : 'rgba(255, 255, 255, 0.98)';
    header.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
  } else {
    header.style.background = body.classList.contains('dark-mode')
      ? 'rgba(15, 15, 35, 0.95)'
      : 'rgba(255, 255, 255, 0.95)';
    header.style.boxShadow = 'none';
  }
});

window.addEventListener('scroll', () => {
  const hero = document.querySelector('.hero');
  const scrolled = window.pageYOffset;
  const rate = scrolled * -0.5;
  if (hero) hero.style.transform = `translateY(${rate}px)`;
});

function typeWriter(element, text, speed = 100) {
  let i = 0;
  element.textContent = '';
  function type() {
    if (i < text.length) {
      element.textContent += text.charAt(i);
      i++;
      setTimeout(type, speed);
    }
  }
  type();
}

window.addEventListener('load', () => {
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const originalText = heroTitle.textContent;
    setTimeout(() => {
      typeWriter(heroTitle, originalText, 80);
    }, 1000);
  }
});

document.querySelectorAll('button, .btn, .cta-button, .download-btn').forEach(button => {
  button.addEventListener('click', function (e) {
    const ripple = document.createElement('span');
    ripple.style.position = 'absolute';
    ripple.style.borderRadius = '50%';
    ripple.style.background = 'rgba(255, 255, 255, 0.6)';
    ripple.style.transform = 'scale(0)';
    ripple.style.animation = 'ripple 0.6s linear';
    ripple.style.left = (e.clientX - e.target.offsetLeft) + 'px';
    ripple.style.top = (e.clientY - e.target.offsetTop) + 'px';
    this.style.position = 'relative';
    this.style.overflow = 'hidden';
    this.appendChild(ripple);
    setTimeout(() => {
      ripple.remove();
    }, 600);
  });
});

function filterCertificates() {
  const selected = document.getElementById('category-filter').value;
  const cards = document.querySelectorAll('.certificate-card');

  cards.forEach(card => {
    const category = card.getAttribute('data-category');
    if (selected === 'all' || category === selected) {
      card.style.display = 'block';
    } else {
      card.style.display = 'none';
    }
  });
}
