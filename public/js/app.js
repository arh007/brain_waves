// ========================================================
// BRAIN WAVES — CLIENT-SIDE APPLICATION ORCHESTRATOR
// ========================================================

const BrainWavesApp = (function() {
  let allProjects = [];
  let allServices = [];
  let currentProjectIndex = 0;

  async function init() {
    initHeaderScroll();
    initMobileNav();
    initAudio();
    initCursor();

    await loadSettings();
    await loadServices();
    await loadWorks();
    await loadArticles();
    await loadTestimonials();

    initContactForm();
    initModals();

    // Init Project Builder & Admin CMS
    if (window.ProjectBuilder) ProjectBuilder.init();
    if (window.AdminCMS) AdminCMS.init();

    // Listen to language change to dynamically update card CTA buttons
    window.addEventListener('brainwaves:langchange', () => {
      if (window.BrainWavesI18n) {
        document.querySelectorAll('.view-service-detail-btn span').forEach(el => {
          el.textContent = BrainWavesI18n.get('btn_view_spec', 'View Specification →');
        });
        document.querySelectorAll('.project-view-btn span').forEach(el => {
          el.textContent = BrainWavesI18n.get('btn_view_study', 'Explore Case Study →');
        });
        document.querySelectorAll('.article-read-btn span').forEach(el => {
          el.textContent = BrainWavesI18n.get('btn_read_article', 'Read Thesis →');
        });
      }
    });
  }

  // Header Scroll Blur
  function initHeaderScroll() {
    const header = document.querySelector('.site-header');
    window.addEventListener('scroll', () => {
      if (window.scrollY > 40) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  // Mobile Navigation Toggle
  function initMobileNav() {
    const btn = document.getElementById('mobile-menu-btn');
    const menu = document.getElementById('nav-menu');
    if (!btn || !menu) return;

    btn.addEventListener('click', () => {
      menu.classList.toggle('mobile-open');
    });

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        menu.classList.remove('mobile-open');
      });
    });
  }

  // Audio Toggle
  function initAudio() {
    const toggleBtn = document.getElementById('audio-toggle-btn');
    if (toggleBtn && window.BrainWavesAudio) {
      toggleBtn.addEventListener('click', () => {
        BrainWavesAudio.toggleAudio();
      });
    }
  }

  // Cursor Follower Glow
  function initCursor() {
    const glow = document.querySelector('.cursor-glow');
    if (!glow) return;

    window.addEventListener('mousemove', (e) => {
      glow.style.left = e.clientX + 'px';
      glow.style.top = e.clientY + 'px';
    });
  }

  // 1. Load Studio Settings
  async function loadSettings() {
    try {
      const res = await fetch('/api/settings');
      if (!res.ok) return;
      const settings = await res.json();

      if (settings.office_location) {
        document.querySelectorAll('.setting-val-location').forEach(el => el.textContent = settings.office_location);
      }
      if (settings.availability_status) {
        document.querySelectorAll('.setting-val-status').forEach(el => el.textContent = settings.availability_status);
      }
      if (settings.primary_email) {
        document.querySelectorAll('.setting-val-email').forEach(el => {
          el.textContent = settings.primary_email;
          if (el.tagName === 'A') el.href = `mailto:${settings.primary_email}`;
        });
      }
      if (settings.hero_title_1) {
        document.querySelectorAll('.hero-headline .text-gradient-cyan').forEach(el => el.textContent = settings.hero_title_1);
      }
      if (settings.hero_title_2) {
        document.querySelectorAll('.hero-headline .text-gradient-violet').forEach(el => el.textContent = settings.hero_title_2);
      }
      if (settings.hero_subtitle) {
        document.querySelectorAll('.hero-subtitle').forEach(el => el.textContent = settings.hero_subtitle);
      }
      if (settings.about_title) {
        const at = document.querySelector('#about .section-title');
        if (at) at.textContent = settings.about_title;
      }
      if (settings.about_lead) {
        const al = document.querySelector('#about .about-text-lead');
        if (al) al.textContent = settings.about_lead;
      }
    } catch (e) {}
  }

  // 2. Load Services
  async function loadServices() {
    const grid = document.getElementById('services-grid-container');
    if (!grid) return;

    try {
      const res = await fetch('/api/services');
      allServices = await res.json();

      grid.innerHTML = allServices.map(s => `
        <div class="service-card" data-service-id="${s.id}">
          <div class="service-icon-box">
            ${getServiceIcon(s.icon)}
          </div>
          <h3 class="service-name">${escapeHtml(s.name)}</h3>
          <p class="service-summary">${escapeHtml(s.summary)}</p>
          <ul class="service-deliverables-list">
            ${s.deliverables.slice(0, 3).map(d => `<li>${escapeHtml(d)}</li>`).join('')}
          </ul>
          <button class="service-action-btn view-service-detail-btn" data-id="${s.id}">
            <span>${window.BrainWavesI18n ? BrainWavesI18n.get('btn_view_spec', 'View Specification →') : 'View Specification →'}</span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </button>
        </div>
      `).join('');

      // Bind deep dive modal
      document.querySelectorAll('.view-service-detail-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const sId = btn.getAttribute('data-id');
          const service = allServices.find(s => s.id == sId);
          if (service) openServiceModal(service);
        });
      });

    } catch (e) {
      console.error('Failed to load services', e);
    }
  }

  function openServiceModal(service) {
    const modal = document.getElementById('service-detail-modal');
    if (!modal) return;

    document.getElementById('service-modal-name').textContent = service.name;
    document.getElementById('service-modal-desc').textContent = service.description;

    const delivsList = document.getElementById('service-modal-deliverables');
    delivsList.innerHTML = service.deliverables.map(d => `<li>${escapeHtml(d)}</li>`).join('');

    const stepsList = document.getElementById('service-modal-steps');
    stepsList.innerHTML = service.process_steps.map(step => `
      <div style="background:var(--surface-elevated); padding:0.85rem 1rem; border-radius:8px; border:1px solid var(--border-subtle); margin-bottom:0.5rem; font-size:0.85rem;">
        <strong style="color:var(--neon-cyan);">${escapeHtml(step.split(' ')[0])}</strong> ${escapeHtml(step.split(' ').slice(1).join(' '))}
      </div>
    `).join('');

    const faqContainer = document.getElementById('service-modal-faq');
    if (service.faq && service.faq.length) {
      faqContainer.innerHTML = service.faq.map(item => `
        <div style="margin-bottom:1rem; border-bottom:1px solid var(--border-subtle); padding-bottom:0.75rem;">
          <h5 style="color:var(--text-primary); font-size:0.9rem; margin-bottom:0.35rem;">Q: ${escapeHtml(item.q)}</h5>
          <p style="color:var(--text-secondary); font-size:0.85rem;">${escapeHtml(item.a)}</p>
        </div>
      `).join('');
    } else {
      faqContainer.innerHTML = '<p class="text-muted">Hubungi studio untuk rincian lingkup kerja khusus.</p>';
    }

    modal.classList.add('open');
  }

  // 3. Load Works (Portfolio)
  async function loadWorks(category = 'all') {
    const grid = document.getElementById('projects-grid-container');
    if (!grid) return;

    try {
      const res = await fetch(`/api/projects?category=${category}`);
      allProjects = await res.json();

      renderProjectsGrid(allProjects);
      bindFilterTabs();
      bindSearch();

    } catch (e) {
      console.error('Failed to load projects', e);
    }
  }

  function renderProjectsGrid(projects) {
    const grid = document.getElementById('projects-grid-container');
    if (!projects.length) {
      grid.innerHTML = '<div style="grid-column: 1 / -1; text-align:center; padding:4rem; color:var(--text-muted);">Tidak ada studi kasus yang cocok dengan kriteria pencarian.</div>';
      return;
    }

    grid.innerHTML = projects.map((p, idx) => `
      <div class="project-card" data-idx="${idx}" data-slug="${p.slug}">
        <div class="project-media-wrap">
          <img src="${p.featured_image}" alt="${escapeHtml(p.title)}" class="project-img" loading="lazy" />
          <span class="project-badge-cat">${escapeHtml(p.category_name || 'Design')}</span>
        </div>
        <div class="project-body">
          <div class="project-meta-row">
            <span>${escapeHtml(p.client)}</span>
            <span>${escapeHtml(p.year)}</span>
          </div>
          <h3 class="project-title">${escapeHtml(p.title)}</h3>
          <p class="project-summary">${escapeHtml(p.summary)}</p>
          <div class="project-footer">
            <div class="project-tech-tags">
              ${p.technologies.slice(0, 3).map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('')}
            </div>
            <div class="project-view-btn">
              <span>${window.BrainWavesI18n ? BrainWavesI18n.get('btn_view_study', 'Explore Case Study →') : 'Explore Case Study →'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M7 17l9.2-9.2M17 17V8H8"/></svg>
            </div>
          </div>
        </div>
      </div>
    `).join('');

    // Bind click to open Case Study modal
    document.querySelectorAll('.project-card').forEach(card => {
      card.addEventListener('click', () => {
        const idx = parseInt(card.getAttribute('data-idx'), 10);
        openCaseStudyModal(idx);
      });
    });
  }

  function bindFilterTabs() {
    document.querySelectorAll('.filter-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const cat = btn.getAttribute('data-category');
        loadWorks(cat);
      });
    });
  }

  function bindSearch() {
    const searchInput = document.getElementById('project-search-input');
    if (!searchInput) return;

    searchInput.addEventListener('input', (e) => {
      const q = e.target.value.toLowerCase().trim();
      if (!q) {
        renderProjectsGrid(allProjects);
        return;
      }
      const filtered = allProjects.filter(p => 
        p.title.toLowerCase().includes(q) ||
        p.summary.toLowerCase().includes(q) ||
        p.client.toLowerCase().includes(q) ||
        p.technologies.some(t => t.toLowerCase().includes(q))
      );
      renderProjectsGrid(filtered);
    });
  }

  function openCaseStudyModal(idx) {
    if (idx < 0 || idx >= allProjects.length) return;
    currentProjectIndex = idx;
    const p = allProjects[idx];
    const modal = document.getElementById('case-study-modal');
    if (!modal) return;

    document.getElementById('cs-modal-client').textContent = p.client;
    document.getElementById('cs-modal-year').textContent = p.year;
    document.getElementById('cs-modal-title').textContent = p.title;
    document.getElementById('cs-modal-category').textContent = p.category_name || 'Design';
    document.getElementById('cs-modal-img').src = p.featured_image;
    document.getElementById('cs-modal-challenge').textContent = p.challenge;
    document.getElementById('cs-modal-solution').textContent = p.solution;
    document.getElementById('cs-modal-results').textContent = p.results;

    // Metrics pills
    const metricsContainer = document.getElementById('cs-modal-metrics');
    if (metricsContainer && p.metrics && p.metrics.length) {
      metricsContainer.innerHTML = p.metrics.map(m => `
        <div style="background:var(--surface-elevated); padding:0.85rem 1.25rem; border-radius:10px; border:1px solid var(--border-card); text-align:center;">
          <div style="font-family:var(--font-display); font-size:1.5rem; font-weight:700; color:var(--neon-cyan);">${escapeHtml(m.value)}</div>
          <div style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(m.label)}</div>
        </div>
      `).join('');
    } else if (metricsContainer) {
      metricsContainer.innerHTML = '';
    }

    // Tech tags
    const techContainer = document.getElementById('cs-modal-tech');
    if (techContainer && p.technologies) {
      techContainer.innerHTML = p.technologies.map(t => `<span class="tech-tag">${escapeHtml(t)}</span>`).join('');
    }

    modal.classList.add('open');
  }

  // 4. Load Articles (Insights)
  async function loadArticles() {
    const grid = document.getElementById('articles-grid-container');
    if (!grid) return;

    try {
      const res = await fetch('/api/articles');
      const articles = await res.json();

      grid.innerHTML = articles.map(a => `
        <div class="article-card" data-slug="${a.slug}">
          <div class="article-img-wrap">
            <img src="${a.cover_image}" alt="${escapeHtml(a.title)}" class="article-img" loading="lazy" />
          </div>
          <div class="article-body">
            <div class="article-meta">
              <span>${escapeHtml(a.category)}</span>
              <span>${escapeHtml(a.read_time)}</span>
            </div>
            <h3 class="article-title">${escapeHtml(a.title)}</h3>
            <p class="article-excerpt">${escapeHtml(a.excerpt)}</p>
            <div class="article-read-btn">
              <span>${window.BrainWavesI18n ? BrainWavesI18n.get('btn_read_article', 'Read Thesis →') : 'Read Thesis →'}</span>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
            </div>
          </div>
        </div>
      `).join('');

      document.querySelectorAll('.article-card').forEach(card => {
        card.addEventListener('click', () => {
          const slug = card.getAttribute('data-slug');
          const article = articles.find(a => a.slug === slug);
          if (article) openArticleModal(article);
        });
      });

    } catch (e) {
      console.error('Failed to load articles', e);
    }
  }

  function openArticleModal(article) {
    const modal = document.getElementById('article-reader-modal');
    if (!modal) return;

    document.getElementById('article-modal-title').textContent = article.title;
    document.getElementById('article-modal-author').textContent = article.author;
    document.getElementById('article-modal-time').textContent = article.read_time;
    document.getElementById('article-modal-category').textContent = article.category;
    document.getElementById('article-modal-img').src = article.cover_image;

    // Format body paragraphs
    const bodyEl = document.getElementById('article-modal-body');
    bodyEl.innerHTML = article.body.split('\n\n').map(p => `<p style="margin-bottom:1.25rem; font-size:1.05rem; line-height:1.75; color:var(--text-secondary);">${escapeHtml(p)}</p>`).join('');

    modal.classList.add('open');
  }

  // 5. Load Testimonials
  async function loadTestimonials() {
    const grid = document.getElementById('testimonials-grid-container');
    if (!grid) return;

    try {
      const res = await fetch('/api/testimonials');
      const testimonials = await res.json();

      grid.innerHTML = testimonials.map(t => `
        <div class="testimonial-card">
          <div class="testimonial-stars">★ ★ ★ ★ ★</div>
          <p class="testimonial-quote">"${escapeHtml(t.quote)}"</p>
          <div class="testimonial-author">
            <h4>${escapeHtml(t.client_name)}</h4>
            <p>${escapeHtml(t.client_title)} · ${escapeHtml(t.company)}</p>
          </div>
        </div>
      `).join('');
    } catch (e) {}
  }

  // 6. Direct Contact Form
  function initContactForm() {
    const form = document.getElementById('direct-contact-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const name = document.getElementById('contact-name-input').value;
      const email = document.getElementById('contact-email-input').value;
      const message = document.getElementById('contact-message-input').value;

      showToast('Transmitting message...', 'info');

      try {
        const res = await fetch('/api/inquiries', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name,
            email,
            brief: message,
            budget_range: 'Diskusi terlebih dahulu',
            timeline: 'Fleksibel',
            preferred_contact: 'email'
          })
        });

        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Pesan gagal dikirim.');

        showToast(`Terima kasih ${name}! Referensi Anda: ${data.reference}`, 'success');
        form.reset();
      } catch (err) {
        showToast(err.message, 'danger');
      }
    });
  }

  // 7. Modals Global Close
  function initModals() {
    document.querySelectorAll('.modal-overlay').forEach(overlay => {
      overlay.addEventListener('click', (e) => {
        if (e.target === overlay) {
          overlay.classList.remove('open');
        }
      });
    });

    document.querySelectorAll('.modal-close-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        btn.closest('.modal-overlay').classList.remove('open');
      });
    });

    // Prev / Next Project in Case Study Modal
    const prevBtn = document.getElementById('cs-modal-prev');
    const nextBtn = document.getElementById('cs-modal-next');
    if (prevBtn) prevBtn.addEventListener('click', () => {
      if (currentProjectIndex > 0) openCaseStudyModal(currentProjectIndex - 1);
    });
    if (nextBtn) nextBtn.addEventListener('click', () => {
      if (currentProjectIndex < allProjects.length - 1) openCaseStudyModal(currentProjectIndex + 1);
    });

    // Legal Modals Links
    const privLink = document.getElementById('open-privacy-modal-btn');
    const termsLink = document.getElementById('open-terms-modal-btn');
    if (privLink) privLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('privacy-modal').classList.add('open');
    });
    if (termsLink) termsLink.addEventListener('click', (e) => {
      e.preventDefault();
      document.getElementById('terms-modal').classList.add('open');
    });
  }

  function getServiceIcon(iconName) {
    // Return cyber SVG icons
    if (iconName === 'fingerprint') {
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.51-.26 3"/><path d="M14 13.12c0 2.38 0 6.38-1 8.88"/><path d="M2 12a10 10 0 0 1 18-6"/><path d="M2 16h.01"/><path d="M21.8 16c.2-2 .131-5.354 0-6"/><path d="M5 19.5C5.5 18 6 15 6 12a6 6 0 0 1 .34-2"/><path d="M8.65 22c.21-.66.45-1.32.57-2"/><path d="M9 6.8a6 6 0 0 1 9 5.2v2"/></svg>`;
    } else if (iconName === 'panels-top-left') {
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect width="18" height="18" x="3" y="3" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`;
    } else if (iconName === 'code-2') {
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m18 16 4-4-4-4"/><path d="m6 8-4 4 4 4"/><path d="m14.5 4-5 16"/></svg>`;
    } else if (iconName === 'megaphone') {
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="m3 11 18-5v12L3 14v-3z"/><path d="M11.6 16.8a3 3 0 1 1-5.8-1.6"/></svg>`;
    } else if (iconName === 'orbit') {
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="3"/><path d="M3 12a9 3 0 0 0 18 0"/><path d="M12 3a3 9 0 0 0 0 18"/></svg>`;
    } else {
      // brain-circuit
      return `<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 5a3 3 0 1 0-5.997.125 4 4 0 0 0-2.526 5.77 4 4 0 0 0 .556 6.588A4 4 0 1 0 12 18Z"/><path d="M12 5a3 3 0 1 1 5.997.125 4 4 0 0 1 2.526 5.77 4 4 0 0 1-.556 6.588A4 4 0 1 1 12 18Z"/><path d="M12 5v14"/><path d="M8 12h8"/></svg>`;
    }
  }

  function escapeHtml(str) {
    if (!str) return '';
    return String(str)
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;')
      .replace(/'/g, '&#039;');
  }

  return { init, loadWorks, openCaseStudyModal };
})();

// Global Toast System
function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <span style="color:var(--neon-cyan);">✦</span>
    <span>${message}</span>
  `;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    setTimeout(() => toast.remove(), 300);
  }, 4000);
}

// Auto Bootstrap
document.addEventListener('DOMContentLoaded', BrainWavesApp.init);
