// Theme Management
class ThemeManager {
  constructor() {
    this.themeToggles = document.querySelectorAll(".theme-toggle");
    this.body = document.body;
    this.init();
  }

  init() {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      this.body.classList.toggle("dark-mode", savedTheme === "dark");
    }
    this.updateThemeIcon();

    this.themeToggles.forEach(toggle => {
      toggle.addEventListener("click", () => {
        this.toggleTheme();
      });
    });
  }

  toggleTheme() {
    this.body.classList.toggle("dark-mode");
    const isDark = this.body.classList.contains("dark-mode");
    localStorage.setItem("theme", isDark ? "dark" : "light");
    this.updateThemeIcon();
  }

  updateThemeIcon() {
    const isDark = this.body.classList.contains("dark-mode");
    this.themeToggles.forEach(toggle => {
      const icon = toggle.querySelector("i");
      icon.className = isDark ? "fas fa-sun" : "fas fa-moon";
    });
  }
}

// Mobile Navigation
class MobileNavigation {
  constructor() {
    this.mobileMenuToggle = document.getElementById("mobile-menu-toggle");
    this.navMobile = document.getElementById("nav-mobile");
    this.mobileNavLinks = document.querySelectorAll(".mobile-nav-link");
    this.init();
  }

  init() {
    this.mobileMenuToggle.addEventListener("click", () => {
      this.toggleMobileMenu();
    });

    this.mobileNavLinks.forEach((link) => {
      link.addEventListener("click", () => {
        this.closeMobileMenu();
      });
    });

    document.addEventListener("click", (e) => {
      if (!this.navMobile.contains(e.target) && !this.mobileMenuToggle.contains(e.target)) {
        this.closeMobileMenu();
      }
    });
  }

  toggleMobileMenu() {
    this.navMobile.classList.toggle("active");
    const icon = this.mobileMenuToggle.querySelector("i");
    icon.className = this.navMobile.classList.contains("active") ? "fas fa-times" : "fas fa-bars";
  }

  closeMobileMenu() {
    this.navMobile.classList.remove("active");
    const icon = this.mobileMenuToggle.querySelector("i");
    icon.className = "fas fa-bars";
  }
}

// Scroll Management
class ScrollManager {
  constructor() {
    this.backToTop = document.getElementById("backToTop");
    this.header = document.getElementById("header");
    this.init();
  }

  init() {
    window.addEventListener("scroll", () => {
      this.handleScroll();
    });

    this.backToTop.addEventListener("click", () => {
      this.scrollToTop();
    });

    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute("href"));
        if (target) {
          const headerHeight = this.header.offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;
          window.scrollTo({
            top: targetPosition,
            behavior: "smooth",
          });
        }
      });
    });
  }

  handleScroll() {
    const scrollY = window.scrollY;
    this.backToTop.classList.toggle("show", scrollY > 300);

    if (scrollY > 100) {
      this.header.style.background = document.body.classList.contains("dark-mode")
        ? "rgba(15, 23, 42, 0.98)"
        : "rgba(255, 255, 255, 0.98)";
      this.header.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)";
    } else {
      this.header.style.background = document.body.classList.contains("dark-mode")
        ? "rgba(15, 23, 42, 0.95)"
        : "rgba(255, 255, 255, 0.95)";
      this.header.style.boxShadow = "none";
    }
  }

  scrollToTop() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }
}

// Animation Observer
class AnimationObserver {
  constructor() {
    this.observerOptions = {
      threshold: 0.1,
      rootMargin: "0px 0px -50px 0px",
    };
    this.init();
  }

  init() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("animate");
        }
      });
    }, this.observerOptions);

    document.querySelectorAll("[data-animate]").forEach((el) => {
      observer.observe(el);
    });
  }
}

// Skills Tab Manager
class SkillsTabManager {
  constructor() {
    this.tabs = document.querySelectorAll(".skill-tab");
    this.categories = document.querySelectorAll(".skills-category");
    this.init();
  }

  init() {
    this.tabs.forEach((tab) => {
      tab.addEventListener("click", () => {
        this.switchTab(tab);
      });
    });
  }

  switchTab(activeTab) {
    const category = activeTab.getAttribute("data-category");
    this.tabs.forEach((tab) => tab.classList.remove("active"));
    activeTab.classList.add("active");

    this.categories.forEach((cat) => {
      const catCategory = cat.getAttribute("data-category");
      if (category === "all" || catCategory === category) {
        cat.classList.remove("hidden");
      } else {
        cat.classList.add("hidden");
      }
    });
  }
}

// Certificate Filter
class CertificateFilter {
  constructor() {
    this.filterSelect = document.getElementById("category-filter");
    this.certificates = document.querySelectorAll(".certificate-card");
    this.init();
  }

  init() {
    if (this.filterSelect) {
      this.filterSelect.addEventListener("change", () => {
        this.filterCertificates();
      });
    }
  }

  filterCertificates() {
    const selectedCategory = this.filterSelect.value;
    this.certificates.forEach((cert) => {
      const certCategory = cert.getAttribute("data-category");
      if (selectedCategory === "all" || certCategory === selectedCategory) {
        cert.style.display = "block";
        cert.classList.add("animate");
      } else {
        cert.style.display = "none";
      }
    });
  }
}

// Project Modal Manager
class ProjectModalManager {
  constructor() {
    this.modal = document.getElementById("projectModal");
    this.modalIcon = document.getElementById("modalIcon");
    this.modalTitle = document.getElementById("modalTitle");
    this.modalDescription = document.getElementById("modalDescription");
    this.modalTech = document.getElementById("modalTech");
    this.modalButtons = document.getElementById("modalButtons");

    this.projects = {
      "susu-mbok-darmi": {
        icon: "📱",
        title: "Susu Mbok Darmi (Mobile App)",
        description: "Aplikasi pemesanan susu lokal dengan fitur pemesanan real-time, manajemen keranjang belanja, pengaturan alamat pengiriman, dan sistem notifikasi untuk pelanggan. Dibangun menggunakan Flutter dengan integrasi Firebase untuk backend.",
        tech: ["Flutter", "Dart", "Firebase"],
        github: "https://github.com/ElYoosa/aplikasi_susu_mbok_darmi",
      },
      "perfect-plate-app": {
        icon: "📱",
        title: "Perfect Plate (Mobile App)",
        description: "Aplikasi mobile bertema resep makanan yang dirancang dengan Flutter dan Dart berdasarkan desain modern dari Figma. Menyediakan fitur pencarian resep, detail langkah memasak, dan penyimpanan resep favorit.",
        tech: ["Flutter", "Dart", "Figma"],
        github: "https://github.com/ElYoosa/perfect_plate",
      },
      "web-sparepart": {
        icon: "⚙️",
        title: "Web Penjualan Spare Part",
        description: "Sistem digitalisasi penjualan spare part kendaraan untuk Lestari Motor Kabupaten Bogor yang mencakup fitur katalog produk, keranjang belanja, pembayaran digital (QRIS, Dana, Kartu Kredit), manajemen stok, serta dashboard admin. Dibangun menggunakan framework PHP Laravel dan Bootstrap.",
        tech: ["PHP", "Laravel", "MySQL", "Bootstrap"],
        github: "https://github.com/kamu/web-sparepart",
      },
      "web-tokoonline": {
        icon: "🛒",
        title: "Web Toko Online",
        description:
          "Aplikasi toko online berbasis web yang mendukung manajemen produk, kategori, keranjang belanja, dan transaksi. Sistem ini dibangun secara native untuk pemahaman fundamental pengembangan web dengan PHP dan MySQL.",
        tech: ["PHP", "MySQL", "HTML", "CSS"],
        github: "https://github.com/ElYoosa/Web-Toko-Online",
      },
      "perfect-plate": {
        icon: "🍽️",
        title: "Perfect Plate - UI/UX Design",
        description: "Merancang desain antarmuka pengguna dan pengalaman pengguna untuk aplikasi resep makanan dengan fokus pada kemudahan navigasi dan visual yang menarik. Proses desain meliputi user research, wireframing, prototyping, dan user testing untuk memastikan pengalaman pengguna yang optimal.",
        tech: ["Figma", "UI/UX Design", "Prototyping", "User Research"],
        figma: "https://www.figma.com/design/perfect-plate-app",
      },
      otomart: {
        icon: "🚗",
        title: "OTOMART - UI/UX Design",
        description: "Merancang platform marketplace otomotif dengan pengalaman pengguna yang optimal untuk jual-beli kendaraan dan spare part. Fokus pada kemudahan pencarian, perbandingan produk, dan proses transaksi yang aman dengan desain yang user-friendly.",
        tech: ["Figma", "UI/UX Design", "User Research", "Usability Testing"],
        figma: "https://www.figma.com/design/otomart-marketplace",
      },
    };

    this.init();
  }

  init() {
    this.modal.addEventListener("click", (e) => {
      if (e.target === this.modal || e.target.closest(".modal-close")) {
        this.closeModal();
      }
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && this.modal.classList.contains("show")) {
        this.closeModal();
      }
    });
  }

  showProject(projectId) {
    const project = this.projects[projectId];
    if (!project) return;

    this.modalIcon.textContent = project.icon;
    this.modalTitle.textContent = project.title;
    this.modalDescription.textContent = project.description;

    this.modalTech.innerHTML = "";
    project.tech.forEach((tech) => {
      const tag = document.createElement("span");
      tag.className = "tech-tag";
      tag.textContent = tech;
      this.modalTech.appendChild(tag);
    });

    this.modalButtons.innerHTML = "";
    if (project.figma) {
      const figmaBtn = document.createElement("a");
      figmaBtn.href = project.figma;
      figmaBtn.target = "_blank";
      figmaBtn.className = "project-button figma-btn";
      figmaBtn.innerHTML = '<i class="fab fa-figma"></i> Lihat di Figma';
      this.modalButtons.appendChild(figmaBtn);
    }
    if (project.github) {
      const githubBtn = document.createElement("a");
      githubBtn.href = project.github;
      githubBtn.target = "_blank";
      githubBtn.className = "project-button";
      githubBtn.innerHTML = '<i class="fab fa-github"></i> Lihat di GitHub';
      this.modalButtons.appendChild(githubBtn);
    }

    this.modal.classList.add("show");
    document.body.style.overflow = "hidden";
  }

  closeModal() {
    this.modal.classList.remove("show");
    document.body.style.overflow = "auto";
  }
}

// ============== LOGIKA UNTUK MODAL SERTIFIKAT (VERSI BERSIH) ==============
const certificateModal = document.getElementById("certificateModal");
const certificateModalImage = document.getElementById("certificateModalImage");
const downloadCertificateBtn = document.querySelector(".download-certificate-btn");
const certificateModalCloseBtn = document.querySelector(".certificate-modal-close");

function openCertificateModal(imgElement) {
  if (!certificateModal || !certificateModalImage) return;

  certificateModalImage.src = imgElement.src;
  certificateModalImage.alt = imgElement.alt;
  downloadCertificateBtn.setAttribute("data-src", imgElement.src);
  downloadCertificateBtn.setAttribute("data-alt", imgElement.alt);

  document.body.style.overflow = "hidden";
  certificateModal.classList.add("show");
}

function closeCertificateModal() {
  if (!certificateModal) return;
  document.body.style.overflow = "auto";
  certificateModal.classList.remove("show");
}

document.querySelectorAll(".certificate-img").forEach(img => {
  img.addEventListener("click", function() {
    openCertificateModal(this);
  });
});

downloadCertificateBtn.addEventListener("click", function() {
  const src = this.getAttribute("data-src");
  const alt = this.getAttribute("data-alt");
  if (src && alt) {
    const link = document.createElement("a");
    link.href = src;
    link.download = alt.replace(/[^a-z0-9]/gi, "_").toLowerCase() + ".jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
});

certificateModal.addEventListener("click", function(e) {
  if (e.target === certificateModal) {
    closeCertificateModal();
  }
});

if (certificateModalCloseBtn) {
    certificateModalCloseBtn.addEventListener("click", closeCertificateModal);
}

document.addEventListener("keydown", (e) => {
  if (e.key === "Escape" && certificateModal.classList.contains("show")) {
    closeCertificateModal();
  }
});
// =======================================================================

// Typewriter Effect
class TypewriterEffect {
  constructor() {
    this.init();
  }

  init() {
    window.addEventListener("load", () => {
      const heroTitle = document.querySelector(".hero-title");
      if (heroTitle) {
        const originalText = heroTitle.textContent;
        setTimeout(() => {
          this.typeWriter(heroTitle, originalText, 80);
        }, 1000);
      }
    });
  }

  typeWriter(element, text, speed = 100) {
    let i = 0;
    element.textContent = "";
    function type() {
      if (i < text.length) {
        element.textContent += text.charAt(i);
        i++;
        setTimeout(type, speed);
      }
    }
    type();
  }
}

// Ripple Effect
class RippleEffect {
  constructor() {
    this.init();
  }

  init() {
    document.querySelectorAll("button, .btn-primary, .cta-button, .download-btn").forEach((button) => {
      button.addEventListener("click", (e) => {
        this.createRipple(e, button);
      });
    });
  }

  createRipple(event, element) {
    const ripple = document.createElement("span");
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.style.cssText = `
      position: absolute;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.6);
      transform: scale(0);
      animation: ripple 0.6s linear;
      width: ${size}px;
      height: ${size}px;
      left: ${x}px;
      top: ${y}px;
      pointer-events: none;
    `;

    element.style.position = "relative";
    element.style.overflow = "hidden";
    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
}

// Global Functions
function showProjectDetail(projectId) {
  window.projectModalManager.showProject(projectId);
}

function closeProjectModal() {
  window.projectModalManager.closeModal();
}

function filterCertificates() {
  window.certificateFilter.filterCertificates();
}

// Initialize Everything
document.addEventListener("DOMContentLoaded", () => {
  window.themeManager = new ThemeManager();
  window.mobileNavigation = new MobileNavigation();
  window.scrollManager = new ScrollManager();
  window.animationObserver = new AnimationObserver();
  window.skillsTabManager = new SkillsTabManager();
  window.certificateFilter = new CertificateFilter();
  window.projectModalManager = new ProjectModalManager();
  window.typewriterEffect = new TypewriterEffect();
  window.rippleEffect = new RippleEffect();

  console.log("Portfolio initialized successfully! 🚀");
});