// ========================================================
// BRAIN WAVES — ADMIN CMS DASHBOARD CONTROLLER
// Complete Full-Stack Content Management & Operations Engine
// Full CRUD: Projects, Services, Articles, Testimonials, Settings, Inquiries
// ========================================================

const AdminCMS = (function() {
  let authToken = localStorage.getItem('bw_admin_token') || null;
  let currentUser = JSON.parse(localStorage.getItem('bw_admin_user') || 'null');
  let currentTab = 'overview';

  // State caches
  let cachedProjects = [];
  let cachedServices = [];
  let cachedArticles = [];
  let cachedTestimonials = [];
  let cachedInquiries = [];

  // Centralized robust API client with auto 401 handling & static GitHub Pages fallback
  async function apiFetch(url, options = {}) {
    authToken = localStorage.getItem('bw_admin_token') || authToken;
    const headers = {
      'Authorization': `Bearer ${authToken}`,
      ...(options.headers || {})
    };
    if (options.body && typeof options.body === 'string' && !headers['Content-Type']) {
      headers['Content-Type'] = 'application/json';
    }

    try {
      const res = await fetch(url, { ...options, headers });
      if (res.status === 401) {
        localStorage.removeItem('bw_admin_token');
        localStorage.removeItem('bw_admin_user');
        showToast('Sesi login telah kedaluwarsa. Mengalihkan ke login...', 'danger');
        setTimeout(() => {
          if (window.location.pathname.includes('/admin')) {
            window.location.href = 'login.html';
          } else {
            showLoginView();
          }
        }, 1000);
        throw new Error('Unauthorized');
      }
      if (res.ok) return res;
    } catch (netErr) {
      // Network failed or 404 (e.g. on GitHub Pages)
    }

    // Static fallback using ClientStorage (GitHub Pages Mode)
    if (window.ClientStorage) {
      const method = (options.method || 'GET').toUpperCase();
      let payload = null;
      if (options.body && typeof options.body === 'string') {
        try { payload = JSON.parse(options.body); } catch(e){}
      }

      // Stats
      if (url.includes('/api/admin/stats')) {
        const p = ClientStorage.getProjects();
        const s = ClientStorage.getServices();
        return new Response(JSON.stringify({
          stats: { inquiriesTotal: 0, inquiriesNew: 0, projectsTotal: p.length, servicesTotal: s.length },
          recentInquiries: []
        }), { status: 200, headers: { 'Content-Type': 'application/json' } });
      }

      // Projects
      if (url.includes('/api/admin/projects')) {
        const idMatch = url.match(/\/api\/admin\/projects\/(\d+)/);
        if (idMatch && method === 'DELETE') {
          ClientStorage.deleteProject(Number(idMatch[1]));
          return new Response(JSON.stringify({ success: true, message: 'Proyek berhasil dihapus.' }), { status: 200 });
        }
        if (idMatch && (method === 'PUT' || method === 'POST')) {
          ClientStorage.saveProject({ ...payload, id: Number(idMatch[1]) });
          return new Response(JSON.stringify({ success: true, message: 'Proyek berhasil diperbarui.' }), { status: 200 });
        }
        if (method === 'POST') {
          const saved = ClientStorage.saveProject(payload);
          return new Response(JSON.stringify({ success: true, id: saved.id }), { status: 201 });
        }
        return new Response(JSON.stringify(ClientStorage.getProjects()), { status: 200 });
      }

      // Services
      if (url.includes('/api/admin/services')) {
        const idMatch = url.match(/\/api\/admin\/services\/(\d+)/);
        if (idMatch && method === 'DELETE') {
          ClientStorage.deleteService(Number(idMatch[1]));
          return new Response(JSON.stringify({ success: true, message: 'Layanan berhasil dihapus.' }), { status: 200 });
        }
        if (idMatch && (method === 'PUT' || method === 'POST')) {
          ClientStorage.saveService({ ...payload, id: Number(idMatch[1]) });
          return new Response(JSON.stringify({ success: true }), { status: 200 });
        }
        if (method === 'POST') {
          const saved = ClientStorage.saveService(payload);
          return new Response(JSON.stringify({ success: true, id: saved.id }), { status: 201 });
        }
        return new Response(JSON.stringify(ClientStorage.getServices()), { status: 200 });
      }

      // Articles
      if (url.includes('/api/admin/articles')) {
        const idMatch = url.match(/\/api\/admin\/articles\/(\d+)/);
        if (idMatch && method === 'DELETE') {
          ClientStorage.deleteArticle(Number(idMatch[1]));
          return new Response(JSON.stringify({ success: true, message: 'Artikel berhasil dihapus.' }), { status: 200 });
        }
        if (idMatch && (method === 'PUT' || method === 'POST')) {
          ClientStorage.saveArticle({ ...payload, id: Number(idMatch[1]) });
          return new Response(JSON.stringify({ success: true }), { status: 200 });
        }
        if (method === 'POST') {
          const saved = ClientStorage.saveArticle(payload);
          return new Response(JSON.stringify({ success: true, id: saved.id }), { status: 201 });
        }
        return new Response(JSON.stringify(ClientStorage.getArticles()), { status: 200 });
      }

      // Testimonials
      if (url.includes('/api/admin/testimonials')) {
        const idMatch = url.match(/\/api\/admin\/testimonials\/(\d+)/);
        if (idMatch && method === 'DELETE') {
          ClientStorage.deleteTestimonial(Number(idMatch[1]));
          return new Response(JSON.stringify({ success: true, message: 'Testimonial berhasil dihapus.' }), { status: 200 });
        }
        if (idMatch && (method === 'PUT' || method === 'POST')) {
          ClientStorage.saveTestimonial({ ...payload, id: Number(idMatch[1]) });
          return new Response(JSON.stringify({ success: true }), { status: 200 });
        }
        if (method === 'POST') {
          const saved = ClientStorage.saveTestimonial(payload);
          return new Response(JSON.stringify({ success: true, id: saved.id }), { status: 201 });
        }
        return new Response(JSON.stringify(ClientStorage.getTestimonials()), { status: 200 });
      }
    }

    throw new Error('Endpoint tidak dapat dihubungi.');
  }

  function init() {
    authToken = localStorage.getItem('bw_admin_token') || null;
    currentUser = JSON.parse(localStorage.getItem('bw_admin_user') || 'null');

    bindPortalTriggers();
    bindLoginActions();
    bindNavTabs();
    bindInquiryActions();
    bindProjectActions();
    bindServiceActions();
    bindArticleActions();
    bindTestimonialActions();
    bindSettingsActions();

    const isStandaloneAdmin = window.location.pathname === '/admin' || window.location.pathname === '/admin.html' || window.location.pathname.endsWith('/admin');
    if (isStandaloneAdmin) {
      if (!authToken || !currentUser) {
        window.location.href = '/login';
        return;
      }
      showDashboardView();
      loadActiveTab();
    } else if (window.location.hash === '#admin') {
      openPortal();
    }
  }

  function switchTab(tabName) {
    const targetBtn = document.querySelector(`.admin-sidebar-nav button[data-tab="${tabName}"]`);
    if (targetBtn) {
      targetBtn.click();
    }
  }

  function openPortal() {
    const portal = document.getElementById('admin-portal-overlay');
    if (!portal) return;
    portal.classList.add('open');

    authToken = localStorage.getItem('bw_admin_token') || null;
    currentUser = JSON.parse(localStorage.getItem('bw_admin_user') || 'null');

    if (authToken && currentUser) {
      showDashboardView();
      loadActiveTab();
    } else {
      showLoginView();
    }
  }

  function closePortal() {
    const portal = document.getElementById('admin-portal-overlay');
    if (portal) portal.classList.remove('open');
    if (window.location.hash === '#admin') {
      history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  }

  function showLoginView() {
    const loginView = document.getElementById('admin-login-view');
    const dashView = document.getElementById('admin-dashboard-view');
    if (loginView) loginView.style.display = 'block';
    if (dashView) dashView.style.display = 'none';
  }

  function showDashboardView() {
    const loginView = document.getElementById('admin-login-view');
    const dashView = document.getElementById('admin-dashboard-view');
    if (loginView) loginView.style.display = 'none';
    if (dashView) dashView.style.display = 'flex';

    const uName = document.getElementById('admin-username-display');
    const uRole = document.getElementById('admin-role-display');
    if (uName) uName.textContent = currentUser?.name || 'Admin';
    if (uRole) uRole.textContent = (currentUser?.role || 'CREATIVE DIRECTOR').toUpperCase();
  }

  function bindPortalTriggers() {
    document.querySelectorAll('.open-admin-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        openPortal();
      });
    });

    const exitBtn = document.getElementById('exit-admin-btn');
    if (exitBtn) exitBtn.addEventListener('click', closePortal);

    const logoutBtn = document.getElementById('admin-logout-btn');
    if (logoutBtn) {
      logoutBtn.addEventListener('click', () => {
        authToken = null;
        currentUser = null;
        localStorage.removeItem('bw_admin_token');
        localStorage.removeItem('bw_admin_user');
        showToast('Berhasil logout dari Admin CMS.', 'info');
        if (window.location.pathname === '/admin') {
          window.location.href = '/login';
        } else {
          showLoginView();
        }
      });
    }
  }

  function bindLoginActions() {
    const loginForm = document.getElementById('admin-login-form');
    if (!loginForm) return;

    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('admin-email-input').value;
      const password = document.getElementById('admin-password-input').value;
      const submitBtn = loginForm.querySelector('button[type="submit"]');

      submitBtn.disabled = true;
      submitBtn.textContent = 'Authenticating...';

      try {
        const response = await fetch('/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.error || 'Authentication failed');

        authToken = data.token;
        currentUser = data.user;
        localStorage.setItem('bw_admin_token', authToken);
        localStorage.setItem('bw_admin_user', JSON.stringify(currentUser));

        showToast(`Selamat datang kembali, ${currentUser.name}!`, 'success');
        showDashboardView();
        loadActiveTab();
      } catch (err) {
        showToast(err.message, 'danger');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Sign In to Control Center';
      }
    });
  }

  function bindNavTabs() {
    document.querySelectorAll('.admin-nav-item button').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.admin-nav-item').forEach(item => item.classList.remove('active'));
        btn.parentElement.classList.add('active');

        currentTab = btn.getAttribute('data-tab');
        const titleEl = document.getElementById('admin-stage-title');
        const labelEl = btn.querySelector('.tab-label');
        if (titleEl && labelEl) {
          titleEl.textContent = labelEl.textContent;
        }

        document.querySelectorAll('.admin-tab-pane').forEach(pane => pane.style.display = 'none');
        const activePane = document.getElementById(`admin-pane-${currentTab}`);
        if (activePane) activePane.style.display = 'block';

        loadActiveTab();
      });
    });
  }

  function loadActiveTab() {
    if (currentTab === 'overview') loadOverviewKPIs();
    else if (currentTab === 'inquiries') loadInquiriesPipeline();
    else if (currentTab === 'projects') loadProjectsManager();
    else if (currentTab === 'services') loadServicesManager();
    else if (currentTab === 'articles') loadArticlesManager();
    else if (currentTab === 'testimonials') loadTestimonialsManager();
    else if (currentTab === 'logs') loadActivityLogs();
    else if (currentTab === 'settings') loadSettingsManager();
  }

  // ========================================================
  // 1. OVERVIEW & STATS
  // ========================================================
  async function loadOverviewKPIs() {
    try {
      const res = await apiFetch('/api/admin/stats');
      const data = await res.json();

      const inqTotal = document.getElementById('kpi-inquiries-total');
      const inqNew = document.getElementById('kpi-inquiries-new');
      const projCount = document.getElementById('kpi-projects-count');
      const servCount = document.getElementById('kpi-services-count');

      if (inqTotal) inqTotal.textContent = data.stats?.inquiriesTotal ?? 0;
      if (inqNew) inqNew.textContent = data.stats?.inquiriesNew ?? 0;
      if (projCount) projCount.textContent = data.stats?.projectsTotal ?? 0;
      if (servCount) servCount.textContent = data.stats?.servicesTotal ?? 0;

      const container = document.getElementById('recent-inquiries-snippet');
      if (container) {
        if (!data.recentInquiries || !data.recentInquiries.length) {
          container.innerHTML = '<p class="text-muted" style="padding:1rem;">Belum ada inquiry terbaru.</p>';
        } else {
          container.innerHTML = data.recentInquiries.map(inq => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.75rem 0; border-bottom:1px solid var(--border-subtle);">
              <div>
                <strong style="color:var(--text-primary);">${escapeHtml(inq.name)}</strong>
                <span style="font-size:0.75rem; color:var(--text-muted); margin-left:0.5rem;">${inq.reference}</span>
                <div style="font-size:0.75rem; color:var(--text-secondary);">${escapeHtml(inq.company || inq.email)}</div>
              </div>
              <span class="status-pill status-${inq.status}">${inq.status.replace('_', ' ')}</span>
            </div>
          `).join('');
        }
      }

      // Also populate the quick content management cards
      loadOverviewContentLists();
    } catch (e) {
      console.error(e);
    }
  }

  async function loadOverviewContentLists() {
    // 1. Projects
    const projContainer = document.getElementById('overview-projects-list');
    if (projContainer) {
      try {
        const res = await apiFetch('/api/admin/projects');
        const projects = await res.json();
        if (Array.isArray(projects) && projects.length > 0) {
          cachedProjects = projects;
          projContainer.innerHTML = projects.map(p => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.5rem 0; border-bottom:1px solid var(--border-subtle);">
              <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:150px;">
                <strong style="color:var(--text-primary); font-size:0.85rem;" title="${escapeHtml(p.title)}">${escapeHtml(p.title)}</strong>
                <div style="font-size:0.7rem; color:var(--text-muted);">${escapeHtml(p.client || 'Client')} · ${p.year}</div>
              </div>
              <div style="display:flex; gap:0.35rem; flex-shrink:0;">
                <button class="btn-cta-secondary" onclick="AdminCMS.openProjectModalById(${p.id})" style="padding:0.25rem 0.55rem; font-size:0.72rem; color:var(--neon-cyan);">✏️ Edit</button>
                <button class="btn-cta-secondary" onclick="AdminCMS.deleteProjectById(${p.id})" style="padding:0.25rem 0.55rem; font-size:0.72rem; color:var(--danger); border-color:rgba(255,107,131,0.35);">🗑️ Hapus</button>
              </div>
            </div>
          `).join('');
        } else {
          projContainer.innerHTML = '<p class="text-muted" style="padding:0.5rem 0;">Belum ada proyek.</p>';
        }
      } catch (e) {
        projContainer.innerHTML = '<p style="color:var(--danger);">Gagal memuat proyek.</p>';
      }
    }

    // 2. Services
    const servContainer = document.getElementById('overview-services-list');
    if (servContainer) {
      try {
        const res = await apiFetch('/api/admin/services');
        const services = await res.json();
        if (Array.isArray(services) && services.length > 0) {
          cachedServices = services;
          servContainer.innerHTML = services.map(s => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.5rem 0; border-bottom:1px solid var(--border-subtle);">
              <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:150px;">
                <strong style="color:var(--text-primary); font-size:0.85rem;" title="${escapeHtml(s.name)}">${escapeHtml(s.name)}</strong>
                <div style="font-size:0.7rem; color:var(--neon-cyan);">${s.is_published ? 'Aktif' : 'Draft'}</div>
              </div>
              <div style="display:flex; gap:0.35rem; flex-shrink:0;">
                <button class="btn-cta-secondary" onclick="AdminCMS.openServiceModalById(${s.id})" style="padding:0.25rem 0.55rem; font-size:0.72rem; color:var(--neon-cyan);">✏️ Edit</button>
                <button class="btn-cta-secondary" onclick="AdminCMS.deleteServiceById(${s.id})" style="padding:0.25rem 0.55rem; font-size:0.72rem; color:var(--danger); border-color:rgba(255,107,131,0.35);">🗑️ Hapus</button>
              </div>
            </div>
          `).join('');
        } else {
          servContainer.innerHTML = '<p class="text-muted" style="padding:0.5rem 0;">Belum ada layanan.</p>';
        }
      } catch (e) {
        servContainer.innerHTML = '<p style="color:var(--danger);">Gagal memuat layanan.</p>';
      }
    }

    // 3. Articles
    const artContainer = document.getElementById('overview-articles-list');
    if (artContainer) {
      try {
        const res = await apiFetch('/api/admin/articles');
        const articles = await res.json();
        if (Array.isArray(articles) && articles.length > 0) {
          cachedArticles = articles;
          artContainer.innerHTML = articles.map(a => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.5rem 0; border-bottom:1px solid var(--border-subtle);">
              <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:150px;">
                <strong style="color:var(--text-primary); font-size:0.85rem;" title="${escapeHtml(a.title)}">${escapeHtml(a.title)}</strong>
                <div style="font-size:0.7rem; color:var(--text-muted);">${escapeHtml(a.category)}</div>
              </div>
              <div style="display:flex; gap:0.35rem; flex-shrink:0;">
                <button class="btn-cta-secondary" onclick="AdminCMS.openArticleModalById(${a.id})" style="padding:0.25rem 0.55rem; font-size:0.72rem; color:var(--neon-cyan);">✏️ Edit</button>
                <button class="btn-cta-secondary" onclick="AdminCMS.deleteArticleById(${a.id})" style="padding:0.25rem 0.55rem; font-size:0.72rem; color:var(--danger); border-color:rgba(255,107,131,0.35);">🗑️ Hapus</button>
              </div>
            </div>
          `).join('');
        } else {
          artContainer.innerHTML = '<p class="text-muted" style="padding:0.5rem 0;">Belum ada artikel.</p>';
        }
      } catch (e) {
        artContainer.innerHTML = '<p style="color:var(--danger);">Gagal memuat artikel.</p>';
      }
    }

    // 4. Testimonials
    const testiContainer = document.getElementById('overview-testimonials-list');
    if (testiContainer) {
      try {
        const res = await apiFetch('/api/admin/testimonials');
        const testimonials = await res.json();
        if (Array.isArray(testimonials) && testimonials.length > 0) {
          cachedTestimonials = testimonials;
          testiContainer.innerHTML = testimonials.map(t => `
            <div style="display:flex; justify-content:space-between; align-items:center; padding:0.5rem 0; border-bottom:1px solid var(--border-subtle);">
              <div style="overflow:hidden; text-overflow:ellipsis; white-space:nowrap; max-width:150px;">
                <strong style="color:var(--text-primary); font-size:0.85rem;">${escapeHtml(t.client_name)}</strong>
                <div style="font-size:0.7rem; color:var(--text-muted);">${escapeHtml(t.company)}</div>
              </div>
              <div style="display:flex; gap:0.35rem; flex-shrink:0;">
                <button class="btn-cta-secondary" onclick="AdminCMS.openTestimonialModalById(${t.id})" style="padding:0.25rem 0.55rem; font-size:0.72rem; color:var(--neon-cyan);">✏️ Edit</button>
                <button class="btn-cta-secondary" onclick="AdminCMS.deleteTestimonialById(${t.id})" style="padding:0.25rem 0.55rem; font-size:0.72rem; color:var(--danger); border-color:rgba(255,107,131,0.35);">🗑️ Hapus</button>
              </div>
            </div>
          `).join('');
        } else {
          testiContainer.innerHTML = '<p class="text-muted" style="padding:0.5rem 0;">Belum ada testimoni.</p>';
        }
      } catch (e) {
        testiContainer.innerHTML = '<p style="color:var(--danger);">Gagal memuat testimoni.</p>';
      }
    }
  }

  // Direct ID Actions for Overview and Tab Manager
  async function deleteProjectById(pId) {
    if (!confirm('Yakin ingin menghapus proyek ini? Tindakan tidak dapat dibatalkan.')) return;
    try {
      const delRes = await apiFetch(`/api/admin/projects/${pId}`, { method: 'DELETE' });
      if (!delRes.ok) throw new Error('Gagal menghapus proyek.');
      showToast('Proyek berhasil dihapus.', 'info');
      loadOverviewKPIs();
      loadProjectsManager();
      if (window.BrainWavesApp) window.BrainWavesApp.loadWorks();
    } catch (e) {
      showToast(e.message, 'danger');
    }
  }

  async function deleteServiceById(sId) {
    if (!confirm('Yakin ingin menghapus layanan ini?')) return;
    try {
      const delRes = await apiFetch(`/api/admin/services/${sId}`, { method: 'DELETE' });
      if (!delRes.ok) throw new Error('Gagal menghapus layanan.');
      showToast('Layanan berhasil dihapus.', 'info');
      loadOverviewKPIs();
      loadServicesManager();
      if (window.BrainWavesApp) window.BrainWavesApp.loadServices();
    } catch (e) {
      showToast(e.message, 'danger');
    }
  }

  async function deleteArticleById(aId) {
    if (!confirm('Yakin ingin menghapus artikel ini?')) return;
    try {
      const delRes = await apiFetch(`/api/admin/articles/${aId}`, { method: 'DELETE' });
      if (!delRes.ok) throw new Error('Gagal menghapus artikel.');
      showToast('Artikel berhasil dihapus.', 'info');
      loadOverviewKPIs();
      loadArticlesManager();
      if (window.BrainWavesApp) window.BrainWavesApp.loadArticles();
    } catch (e) {
      showToast(e.message, 'danger');
    }
  }

  async function deleteTestimonialById(tId) {
    if (!confirm('Yakin ingin menghapus testimonial ini?')) return;
    try {
      const delRes = await apiFetch(`/api/admin/testimonials/${tId}`, { method: 'DELETE' });
      if (!delRes.ok) throw new Error('Gagal menghapus testimonial.');
      showToast('Testimonial berhasil dihapus.', 'info');
      loadOverviewKPIs();
      loadTestimonialsManager();
      if (window.BrainWavesApp) window.BrainWavesApp.loadTestimonials();
    } catch (e) {
      showToast(e.message, 'danger');
    }
  }

  async function openProjectModalById(pId) {
    let p = cachedProjects.find(item => item.id == pId);
    if (!p) {
      try {
        const res = await apiFetch(`/api/admin/projects/${pId}`);
        p = await res.json();
      } catch (e) {}
    }
    if (p) openProjectModal(p);
  }

  async function openServiceModalById(sId) {
    let s = cachedServices.find(item => item.id == sId);
    if (!s) {
      try {
        const res = await apiFetch(`/api/admin/services/${sId}`);
        s = await res.json();
      } catch (e) {}
    }
    if (s) openServiceModal(s);
  }

  async function openArticleModalById(aId) {
    let a = cachedArticles.find(item => item.id == aId);
    if (!a) {
      try {
        const res = await apiFetch(`/api/admin/articles/${aId}`);
        a = await res.json();
      } catch (e) {}
    }
    if (a) openArticleModal(a);
  }

  async function openTestimonialModalById(tId) {
    let t = cachedTestimonials.find(item => item.id == tId);
    if (!t) {
      try {
        const res = await apiFetch(`/api/admin/testimonials/${tId}`);
        t = await res.json();
      } catch (e) {}
    }
    if (t) openTestimonialModal(t);
  }

  // ========================================================
  // 2. INQUIRIES PIPELINE
  // ========================================================
  async function loadInquiriesPipeline(status = 'all') {
    const tableBody = document.getElementById('admin-inquiries-tbody');
    if (!tableBody) return;
    tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:2rem;">Memuat daftar pipeline...</td></tr>';

    try {
      const res = await fetch(`/api/admin/inquiries?status=${status}`, {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      if (!res.ok) throw new Error('Failed to load inquiries');
      cachedInquiries = await res.json();

      if (!cachedInquiries.length) {
        tableBody.innerHTML = '<tr><td colspan="6" style="text-align:center; padding:2rem; color:var(--text-muted);">Tidak ada inquiry dalam kategori ini.</td></tr>';
        return;
      }

      tableBody.innerHTML = cachedInquiries.map(inq => {
        const servNames = inq.services ? inq.services.map(s => s.name).join(', ') : '-';
        return `
          <tr>
            <td>
              <strong style="font-family:var(--font-mono); color:var(--neon-cyan);">${inq.reference}</strong>
              <div style="font-size:0.75rem; color:var(--text-muted);">${new Date(inq.created_at).toLocaleDateString('id-ID')}</div>
            </td>
            <td>
              <strong style="color:var(--text-primary);">${escapeHtml(inq.name)}</strong>
              <div style="font-size:0.75rem; color:var(--text-muted);">${escapeHtml(inq.email)}</div>
              ${inq.company ? `<div style="font-size:0.75rem; color:var(--neon-cyan);">${escapeHtml(inq.company)}</div>` : ''}
            </td>
            <td>
              <div style="font-size:0.8rem; color:var(--text-primary);">${escapeHtml(servNames)}</div>
              <div style="font-size:0.75rem; color:var(--warning);">${inq.budget_range} · ${inq.timeline}</div>
            </td>
            <td>
              <p style="font-size:0.78rem; color:var(--text-secondary); max-width:260px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis;" title="${escapeHtml(inq.brief)}">
                ${escapeHtml(inq.brief)}
              </p>
            </td>
            <td>
              <select class="form-control inquiry-status-select" data-id="${inq.id}" style="padding:0.3rem 0.6rem; font-size:0.75rem; width:130px;">
                <option value="new" ${inq.status === 'new' ? 'selected' : ''}>New</option>
                <option value="contacted" ${inq.status === 'contacted' ? 'selected' : ''}>Contacted</option>
                <option value="proposal" ${inq.status === 'proposal' ? 'selected' : ''}>Proposal</option>
                <option value="in_progress" ${inq.status === 'in_progress' ? 'selected' : ''}>In Progress</option>
                <option value="closed" ${inq.status === 'closed' ? 'selected' : ''}>Closed</option>
              </select>
            </td>
            <td>
              <div style="display:flex; gap:0.4rem;">
                <button class="btn-cta-secondary view-inquiry-notes-btn" data-id="${inq.id}" style="padding:0.35rem 0.65rem; font-size:0.75rem;">
                  Notes (${inq.notes ? inq.notes.length : 0})
                </button>
                <button class="btn-cta-secondary delete-inquiry-btn" data-id="${inq.id}" style="padding:0.35rem 0.65rem; font-size:0.75rem; color:var(--danger); border-color:rgba(255,107,131,0.3);">
                  🗑
                </button>
              </div>
            </td>
          </tr>
        `;
      }).join('');

      // Bind dynamic status dropdown change
      document.querySelectorAll('.inquiry-status-select').forEach(select => {
        select.addEventListener('change', async (e) => {
          const inqId = e.target.getAttribute('data-id');
          const newStatus = e.target.value;
          await updateInquiryStatus(inqId, newStatus);
        });
      });

      // Bind notes viewer
      document.querySelectorAll('.view-inquiry-notes-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const inqId = btn.getAttribute('data-id');
          const inq = cachedInquiries.find(i => i.id == inqId);
          if (inq) openInquiryNotesModal(inq);
        });
      });

      // Bind delete inquiry
      document.querySelectorAll('.delete-inquiry-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('Yakin ingin menghapus data inquiry ini?')) return;
          const inqId = btn.getAttribute('data-id');
          try {
            const delRes = await fetch(`/api/admin/inquiries/${inqId}`, {
              method: 'DELETE',
              headers: { 'Authorization': `Bearer ${authToken}` }
            });
            if (!delRes.ok) throw new Error('Gagal menghapus inquiry.');
            showToast('Inquiry berhasil dihapus.', 'info');
            loadInquiriesPipeline();
          } catch (e) {
            showToast(e.message, 'danger');
          }
        });
      });

    } catch (e) {
      console.error(e);
      tableBody.innerHTML = `<tr><td colspan="6" style="color:var(--danger); text-align:center;">Error: ${e.message}</td></tr>`;
    }
  }

  async function updateInquiryStatus(inqId, status) {
    try {
      const res = await fetch(`/api/admin/inquiries/${inqId}/status`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        body: JSON.stringify({ status })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to update status');
      showToast(`Status inquiry diubah ke ${status}.`, 'success');
    } catch (err) {
      showToast(err.message, 'danger');
    }
  }

  function openInquiryNotesModal(inq) {
    const modal = document.getElementById('inquiry-notes-modal');
    if (!modal) return;

    document.getElementById('notes-modal-ref').textContent = inq.reference + ' — ' + inq.name;
    const notesList = document.getElementById('notes-modal-list');

    if (inq.notes && inq.notes.length) {
      notesList.innerHTML = inq.notes.map(n => `
        <div style="background:var(--surface-elevated); padding:0.75rem; border-radius:8px; margin-bottom:0.5rem; border:1px solid var(--border-subtle);">
          <div style="display:flex; justify-content:space-between; font-size:0.75rem; color:var(--neon-cyan); margin-bottom:0.25rem;">
            <strong>${escapeHtml(n.author)}</strong>
            <span>${new Date(n.created_at).toLocaleString('id-ID')}</span>
          </div>
          <p style="font-size:0.85rem; color:var(--text-primary);">${escapeHtml(n.note)}</p>
        </div>
      `).join('');
    } else {
      notesList.innerHTML = '<p style="color:var(--text-muted); font-size:0.85rem;">Belum ada catatan internal untuk prospek ini.</p>';
    }

    const addNoteForm = document.getElementById('add-note-form');
    addNoteForm.onsubmit = async (e) => {
      e.preventDefault();
      const input = document.getElementById('new-note-input');
      const noteText = input.value.trim();
      if (!noteText) return;

      try {
        const res = await fetch(`/api/admin/inquiries/${inq.id}/notes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify({ note: noteText })
        });
        if (!res.ok) throw new Error('Gagal menambah catatan.');
        showToast('Catatan tersimpan.', 'success');
        input.value = '';
        modal.classList.remove('open');
        loadInquiriesPipeline();
      } catch (err) {
        showToast(err.message, 'danger');
      }
    };

    modal.classList.add('open');
  }

  function bindInquiryActions() {
    document.querySelectorAll('.inquiry-pipeline-filter').forEach(btn => {
      btn.addEventListener('click', () => {
        document.querySelectorAll('.inquiry-pipeline-filter').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const status = btn.getAttribute('data-status');
        loadInquiriesPipeline(status);
      });
    });
  }

  // ========================================================
  // 3. PROJECTS MANAGER (CRUD: CREATE, READ, UPDATE, DELETE)
  // ========================================================
  async function loadProjectsManager() {
    const listContainer = document.getElementById('admin-projects-list');
    if (!listContainer) return;

    try {
      const res = await apiFetch('/api/admin/projects');
      cachedProjects = await res.json();

      if (!Array.isArray(cachedProjects)) {
        listContainer.innerHTML = '<p class="text-danger" style="padding:2rem; text-align:center;">Gagal memuat data portofolio proyek.</p>';
        return;
      }

      if (!cachedProjects.length) {
        listContainer.innerHTML = '<p class="text-muted" style="padding:2rem; text-align:center;">Belum ada portofolio proyek. Klik "+ Add New Project" untuk membuat proyek baru.</p>';
        return;
      }

      listContainer.innerHTML = cachedProjects.map(p => `
        <div style="background:var(--surface-dark); border:1px solid var(--border-card); border-radius:var(--radius-md); padding:1.25rem; display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:1rem;">
          <div style="display:flex; align-items:center; gap:1.25rem;">
            <img src="${p.featured_image}" style="width:65px; height:65px; border-radius:8px; object-fit:cover; border:1px solid var(--border-subtle);" />
            <div>
              <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
                <strong style="color:var(--text-primary); font-size:1.05rem;">${escapeHtml(p.title)}</strong>
                ${p.is_featured ? '<span class="status-pill status-new" style="font-size:0.65rem;">FEATURED</span>' : ''}
              </div>
              <div style="font-size:0.75rem; color:var(--neon-cyan);">${escapeHtml(p.client)} · ${p.year} · ${p.category_name || 'Design'}</div>
              <p style="font-size:0.8rem; color:var(--text-secondary); max-width:500px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:0.35rem;">${escapeHtml(p.summary)}</p>
            </div>
          </div>
          <div style="display:flex; gap:0.5rem;">
            <button class="btn-cta-secondary edit-project-btn" data-id="${p.id}" style="padding:0.4rem 0.85rem; font-size:0.75rem; color:var(--neon-cyan); border-color:var(--border-active);">
              ✏️ Edit
            </button>
            <button class="btn-cta-secondary delete-project-btn" data-id="${p.id}" style="padding:0.4rem 0.85rem; font-size:0.75rem; color:var(--danger); border-color:rgba(255,107,131,0.3);">
              🗑️ Delete
            </button>
          </div>
        </div>
      `).join('');

      // Bind Edit
      document.querySelectorAll('.edit-project-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const pId = btn.getAttribute('data-id');
          const project = cachedProjects.find(p => p.id == pId);
          if (project) openProjectModal(project);
        });
      });

      // Bind Delete
      document.querySelectorAll('.delete-project-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('Yakin ingin menghapus proyek ini? Tindakan tidak dapat dibatalkan.')) return;
          const pId = btn.getAttribute('data-id');
          try {
            const delRes = await apiFetch(`/api/admin/projects/${pId}`, {
              method: 'DELETE'
            });
            if (!delRes.ok) throw new Error('Gagal menghapus proyek.');
            showToast('Proyek berhasil dihapus.', 'info');
            loadProjectsManager();
            loadOverviewKPIs();
            if (window.BrainWavesApp) window.BrainWavesApp.loadWorks();
          } catch (e) {
            showToast(e.message, 'danger');
          }
        });
      });

    } catch (e) {
      console.error(e);
      listContainer.innerHTML = `<p style="color:var(--danger);">Error loading projects: ${e.message}</p>`;
    }
  }

  function openProjectModal(project = null) {
    const modal = document.getElementById('admin-project-modal');
    if (!modal) return;

    const modalTitle = modal.querySelector('.modal-header h3');
    const submitBtn = modal.querySelector('button[type="submit"]');

    if (project) {
      if (modalTitle) modalTitle.textContent = 'Edit Portfolio Project';
      if (submitBtn) submitBtn.textContent = 'Save Changes (Perbarui Proyek)';
      document.getElementById('proj-form-id').value = project.id;
      document.getElementById('proj-form-title').value = project.title || '';
      document.getElementById('proj-form-client').value = project.client || '';
      document.getElementById('proj-form-year').value = project.year || '2026';
      document.getElementById('proj-form-cat').value = project.category_id || 1;
      document.getElementById('proj-form-summary').value = project.summary || '';
      document.getElementById('proj-form-challenge').value = project.challenge || '';
      document.getElementById('proj-form-solution').value = project.solution || '';
      document.getElementById('proj-form-results').value = project.results || '';
      document.getElementById('proj-form-tech').value = Array.isArray(project.technologies) ? project.technologies.join(', ') : (project.technologies || '');
      document.getElementById('proj-form-img').value = project.featured_image || '';
      const featCheckbox = document.getElementById('proj-form-featured');
      if (featCheckbox) featCheckbox.checked = Boolean(project.is_featured);
    } else {
      if (modalTitle) modalTitle.textContent = 'Add New Portfolio Project';
      if (submitBtn) submitBtn.textContent = 'Publish Case Study (Publikasikan)';
      document.getElementById('admin-add-project-form').reset();
      document.getElementById('proj-form-id').value = '';
    }

    modal.classList.add('open');
  }

  function bindProjectActions() {
    const addProjectBtn = document.getElementById('open-add-project-modal-btn');
    if (addProjectBtn) {
      addProjectBtn.addEventListener('click', () => openProjectModal(null));
    }

    const form = document.getElementById('admin-add-project-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const pId = document.getElementById('proj-form-id').value;
        const payload = {
          title: document.getElementById('proj-form-title').value,
          client: document.getElementById('proj-form-client').value,
          year: document.getElementById('proj-form-year').value,
          category_id: parseInt(document.getElementById('proj-form-cat').value, 10),
          summary: document.getElementById('proj-form-summary').value,
          challenge: document.getElementById('proj-form-challenge').value,
          solution: document.getElementById('proj-form-solution').value,
          results: document.getElementById('proj-form-results').value,
          technologies: document.getElementById('proj-form-tech').value,
          featured_image: document.getElementById('proj-form-img').value || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
          is_featured: document.getElementById('proj-form-featured')?.checked ? 1 : 0,
          status: 'published'
        };

        const modal = document.getElementById('admin-project-modal');

        try {
          const url = pId ? `/api/admin/projects/${pId}` : '/api/admin/projects';
          const method = pId ? 'PUT' : 'POST';

          const res = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(payload)
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Gagal menyimpan proyek.');

          showToast(pId ? 'Proyek berhasil diperbarui!' : 'Proyek baru berhasil dipublikasikan!', 'success');
          if (modal) modal.classList.remove('open');
          form.reset();
          loadProjectsManager();
          if (window.BrainWavesApp) window.BrainWavesApp.loadWorks();
        } catch (err) {
          showToast(err.message, 'danger');
        }
      });
    }
  }

  // ========================================================
  // 4. SERVICES MANAGER (CRUD: CREATE, READ, UPDATE, DELETE)
  // ========================================================
  async function loadServicesManager() {
    const listContainer = document.getElementById('admin-services-list');
    if (!listContainer) return;

    try {
      const res = await apiFetch('/api/admin/services');
      cachedServices = await res.json();

      if (!Array.isArray(cachedServices)) {
        listContainer.innerHTML = '<p class="text-danger" style="padding:2rem; text-align:center;">Gagal memuat data layanan studio.</p>';
        return;
      }

      if (!cachedServices.length) {
        listContainer.innerHTML = '<p class="text-muted" style="padding:2rem; text-align:center;">Belum ada data layanan studio.</p>';
        return;
      }

      listContainer.innerHTML = cachedServices.map(s => `
        <div style="background:var(--surface-dark); border:1px solid var(--border-card); border-radius:var(--radius-md); padding:1.25rem; display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:1rem;">
          <div style="display:flex; align-items:center; gap:1.25rem;">
            <div style="width:48px; height:48px; border-radius:10px; background:rgba(101,245,255,0.08); border:1px solid var(--border-active); display:flex; align-items:center; justify-content:center; color:var(--neon-cyan); font-size:1.3rem;">
              ⚡
            </div>
            <div>
              <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
                <strong style="color:var(--text-primary); font-size:1.05rem;">${escapeHtml(s.name)}</strong>
                <span class="status-pill status-${s.is_published ? 'in_progress' : 'closed'}" style="font-size:0.65rem;">
                  ${s.is_published ? 'ACTIVE' : 'DRAFT'}
                </span>
              </div>
              <div style="font-size:0.75rem; color:var(--neon-cyan);">Urutan: #${s.sort_order} · Deliverables: ${s.deliverables ? s.deliverables.length : 0} items</div>
              <p style="font-size:0.8rem; color:var(--text-secondary); max-width:500px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:0.35rem;">${escapeHtml(s.summary)}</p>
            </div>
          </div>
          <div style="display:flex; gap:0.5rem;">
            <button class="btn-cta-secondary edit-service-btn" data-id="${s.id}" style="padding:0.4rem 0.85rem; font-size:0.75rem; color:var(--neon-cyan); border-color:var(--border-active);">
              ✏️ Edit
            </button>
            <button class="btn-cta-secondary delete-service-btn" data-id="${s.id}" style="padding:0.4rem 0.85rem; font-size:0.75rem; color:var(--danger); border-color:rgba(255,107,131,0.3);">
              🗑️ Delete
            </button>
          </div>
        </div>
      `).join('');

      // Bind Edit
      document.querySelectorAll('.edit-service-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const sId = btn.getAttribute('data-id');
          const service = cachedServices.find(s => s.id == sId);
          if (service) openServiceModal(service);
        });
      });

      // Bind Delete
      document.querySelectorAll('.delete-service-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('Yakin ingin menghapus layanan ini?')) return;
          const sId = btn.getAttribute('data-id');
          try {
            const delRes = await apiFetch(`/api/admin/services/${sId}`, {
              method: 'DELETE'
            });
            if (!delRes.ok) throw new Error('Gagal menghapus layanan.');
            showToast('Layanan berhasil dihapus.', 'info');
            loadServicesManager();
            loadOverviewKPIs();
            if (window.BrainWavesApp) window.BrainWavesApp.loadServices();
          } catch (e) {
            showToast(e.message, 'danger');
          }
        });
      });

    } catch (e) {
      console.error(e);
      listContainer.innerHTML = `<p style="color:var(--danger);">Error loading services: ${e.message}</p>`;
    }
  }

  function openServiceModal(service = null) {
    const modal = document.getElementById('admin-service-modal');
    if (!modal) return;

    const modalTitle = modal.querySelector('.modal-header h3');
    const submitBtn = modal.querySelector('button[type="submit"]');

    if (service) {
      if (modalTitle) modalTitle.textContent = 'Edit Layanan Studio';
      if (submitBtn) submitBtn.textContent = 'Save Changes (Simpan Perubahan)';
      document.getElementById('service-form-id').value = service.id;
      document.getElementById('service-form-name').value = service.name || '';
      document.getElementById('service-form-icon').value = service.icon || 'brain-circuit';
      document.getElementById('service-form-summary').value = service.summary || '';
      document.getElementById('service-form-desc').value = service.description || '';
      document.getElementById('service-form-deliverables').value = Array.isArray(service.deliverables) ? service.deliverables.join('\n') : '';
      document.getElementById('service-form-steps').value = Array.isArray(service.process_steps) ? service.process_steps.join('\n') : '';
      document.getElementById('service-form-order').value = service.sort_order || 0;
      document.getElementById('service-form-published').value = service.is_published ? '1' : '0';
    } else {
      if (modalTitle) modalTitle.textContent = 'Tambah Layanan Baru';
      if (submitBtn) submitBtn.textContent = 'Publish Service (Publikasikan Layanan)';
      document.getElementById('admin-service-form').reset();
      document.getElementById('service-form-id').value = '';
    }

    modal.classList.add('open');
  }

  function bindServiceActions() {
    const addBtn = document.getElementById('open-add-service-modal-btn');
    if (addBtn) addBtn.addEventListener('click', () => openServiceModal(null));

    const form = document.getElementById('admin-service-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const sId = document.getElementById('service-form-id').value;
        const payload = {
          name: document.getElementById('service-form-name').value,
          icon: document.getElementById('service-form-icon').value,
          summary: document.getElementById('service-form-summary').value,
          description: document.getElementById('service-form-desc').value,
          deliverables: document.getElementById('service-form-deliverables').value.split('\n').map(s => s.trim()).filter(Boolean),
          process_steps: document.getElementById('service-form-steps').value.split('\n').map(s => s.trim()).filter(Boolean),
          sort_order: parseInt(document.getElementById('service-form-order').value, 10) || 0,
          is_published: parseInt(document.getElementById('service-form-published').value, 10) || 1
        };

        const modal = document.getElementById('admin-service-modal');

        try {
          const url = sId ? `/api/admin/services/${sId}` : '/api/admin/services';
          const method = sId ? 'PUT' : 'POST';

          const res = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(payload)
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Gagal menyimpan layanan.');

          showToast(sId ? 'Layanan berhasil diperbarui!' : 'Layanan baru berhasil ditambahkan!', 'success');
          if (modal) modal.classList.remove('open');
          form.reset();
          loadServicesManager();
          if (window.BrainWavesApp) window.BrainWavesApp.loadServices();
        } catch (err) {
          showToast(err.message, 'danger');
        }
      });
    }
  }

  // ========================================================
  // 5. ARTICLES MANAGER (CRUD: CREATE, READ, UPDATE, DELETE)
  // ========================================================
  async function loadArticlesManager() {
    const listContainer = document.getElementById('admin-articles-list');
    if (!listContainer) return;

    try {
      const res = await apiFetch('/api/admin/articles');
      cachedArticles = await res.json();

      if (!Array.isArray(cachedArticles)) {
        listContainer.innerHTML = '<p class="text-danger" style="padding:2rem; text-align:center;">Gagal memuat data artikel editorial.</p>';
        return;
      }

      if (!cachedArticles.length) {
        listContainer.innerHTML = '<p class="text-muted" style="padding:2rem; text-align:center;">Belum ada artikel wawasan / editorial.</p>';
        return;
      }

      listContainer.innerHTML = cachedArticles.map(a => `
        <div style="background:var(--surface-dark); border:1px solid var(--border-card); border-radius:var(--radius-md); padding:1.25rem; display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:1rem;">
          <div style="display:flex; align-items:center; gap:1.25rem;">
            <img src="${a.cover_image}" style="width:65px; height:65px; border-radius:8px; object-fit:cover; border:1px solid var(--border-subtle);" />
            <div>
              <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
                <strong style="color:var(--text-primary); font-size:1.05rem;">${escapeHtml(a.title)}</strong>
                <span class="status-pill status-${a.status === 'published' ? 'in_progress' : 'closed'}" style="font-size:0.65rem;">${a.status.toUpperCase()}</span>
              </div>
              <div style="font-size:0.75rem; color:var(--neon-cyan);">${escapeHtml(a.category)} · ${escapeHtml(a.author)} · ${escapeHtml(a.read_time)} · 👁️ ${a.views_count || 0} views</div>
              <p style="font-size:0.8rem; color:var(--text-secondary); max-width:500px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; margin-top:0.35rem;">${escapeHtml(a.excerpt)}</p>
            </div>
          </div>
          <div style="display:flex; gap:0.5rem;">
            <button class="btn-cta-secondary edit-article-btn" data-id="${a.id}" style="padding:0.4rem 0.85rem; font-size:0.75rem; color:var(--neon-cyan); border-color:var(--border-active);">
              ✏️ Edit
            </button>
            <button class="btn-cta-secondary delete-article-btn" data-id="${a.id}" style="padding:0.4rem 0.85rem; font-size:0.75rem; color:var(--danger); border-color:rgba(255,107,131,0.3);">
              🗑️ Delete
            </button>
          </div>
        </div>
      `).join('');

      // Bind Edit
      document.querySelectorAll('.edit-article-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const aId = btn.getAttribute('data-id');
          const article = cachedArticles.find(a => a.id == aId);
          if (article) openArticleModal(article);
        });
      });

      // Bind Delete
      document.querySelectorAll('.delete-article-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('Yakin ingin menghapus artikel ini?')) return;
          const aId = btn.getAttribute('data-id');
          try {
            const delRes = await apiFetch(`/api/admin/articles/${aId}`, {
              method: 'DELETE'
            });
            if (!delRes.ok) throw new Error('Gagal menghapus artikel.');
            showToast('Artikel berhasil dihapus.', 'info');
            loadArticlesManager();
            loadOverviewKPIs();
            if (window.BrainWavesApp) window.BrainWavesApp.loadArticles();
          } catch (e) {
            showToast(e.message, 'danger');
          }
        });
      });

    } catch (e) {
      console.error(e);
      listContainer.innerHTML = `<p style="color:var(--danger);">Error loading articles: ${e.message}</p>`;
    }
  }

  function openArticleModal(article = null) {
    const modal = document.getElementById('admin-article-modal');
    if (!modal) return;

    const modalTitle = modal.querySelector('.modal-header h3');
    const submitBtn = modal.querySelector('button[type="submit"]');

    if (article) {
      if (modalTitle) modalTitle.textContent = 'Edit Artikel Wawasan';
      if (submitBtn) submitBtn.textContent = 'Save Changes (Simpan Perubahan)';
      document.getElementById('article-form-id').value = article.id;
      document.getElementById('article-form-title').value = article.title || '';
      document.getElementById('article-form-cat').value = article.category || 'Design Engineering';
      document.getElementById('article-form-author').value = article.author || 'BRAIN WAVES Editorial';
      document.getElementById('article-form-time').value = article.read_time || '5 min read';
      document.getElementById('article-form-img').value = article.cover_image || '';
      document.getElementById('article-form-excerpt').value = article.excerpt || '';
      document.getElementById('article-form-body').value = article.body || '';
      document.getElementById('article-form-status').value = article.status || 'published';
    } else {
      if (modalTitle) modalTitle.textContent = 'Tulis Artikel Baru';
      if (submitBtn) submitBtn.textContent = 'Publish Article (Terbitkan)';
      document.getElementById('admin-article-form').reset();
      document.getElementById('article-form-id').value = '';
    }

    modal.classList.add('open');
  }

  function bindArticleActions() {
    const addBtn = document.getElementById('open-add-article-modal-btn');
    if (addBtn) addBtn.addEventListener('click', () => openArticleModal(null));

    const form = document.getElementById('admin-article-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const aId = document.getElementById('article-form-id').value;
        const payload = {
          title: document.getElementById('article-form-title').value,
          category: document.getElementById('article-form-cat').value,
          author: document.getElementById('article-form-author').value,
          read_time: document.getElementById('article-form-time').value,
          cover_image: document.getElementById('article-form-img').value || 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80',
          excerpt: document.getElementById('article-form-excerpt').value,
          body: document.getElementById('article-form-body').value,
          status: document.getElementById('article-form-status').value
        };

        const modal = document.getElementById('admin-article-modal');

        try {
          const url = aId ? `/api/admin/articles/${aId}` : '/api/admin/articles';
          const method = aId ? 'PUT' : 'POST';

          const res = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(payload)
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Gagal menyimpan artikel.');

          showToast(aId ? 'Artikel berhasil diperbarui!' : 'Artikel baru berhasil diterbitkan!', 'success');
          if (modal) modal.classList.remove('open');
          form.reset();
          loadArticlesManager();
          if (window.BrainWavesApp) window.BrainWavesApp.loadArticles();
        } catch (err) {
          showToast(err.message, 'danger');
        }
      });
    }
  }

  // ========================================================
  // 6. TESTIMONIALS MANAGER (CRUD: CREATE, READ, UPDATE, DELETE)
  // ========================================================
  async function loadTestimonialsManager() {
    const listContainer = document.getElementById('admin-testimonials-list');
    if (!listContainer) return;

    try {
      const res = await apiFetch('/api/admin/testimonials');
      cachedTestimonials = await res.json();

      if (!Array.isArray(cachedTestimonials)) {
        listContainer.innerHTML = '<p class="text-danger" style="padding:2rem; text-align:center;">Gagal memuat data ulasan klien.</p>';
        return;
      }

      if (!cachedTestimonials.length) {
        listContainer.innerHTML = '<p class="text-muted" style="padding:2rem; text-align:center;">Belum ada ulasan klien.</p>';
        return;
      }

      listContainer.innerHTML = cachedTestimonials.map(t => `
        <div style="background:var(--surface-dark); border:1px solid var(--border-card); border-radius:var(--radius-md); padding:1.25rem; display:flex; justify-content:space-between; align-items:center; margin-bottom:1rem; flex-wrap:wrap; gap:1rem;">
          <div>
            <div style="display:flex; align-items:center; gap:0.5rem; margin-bottom:0.25rem;">
              <strong style="color:var(--text-primary); font-size:1.05rem;">${escapeHtml(t.client_name)}</strong>
              <span style="color:var(--warning); font-size:0.85rem;">${'★'.repeat(t.rating || 5)}</span>
              <span class="status-pill status-${t.is_published ? 'in_progress' : 'closed'}" style="font-size:0.65rem;">
                ${t.is_published ? 'PUBLISHED' : 'HIDDEN'}
              </span>
            </div>
            <div style="font-size:0.75rem; color:var(--neon-cyan);">${escapeHtml(t.client_title)} · ${escapeHtml(t.company)} · Urutan: #${t.sort_order || 0}</div>
            <p style="font-size:0.85rem; color:var(--text-secondary); max-width:550px; font-style:italic; margin-top:0.35rem;">"${escapeHtml(t.quote)}"</p>
          </div>
          <div style="display:flex; gap:0.5rem;">
            <button class="btn-cta-secondary edit-testimonial-btn" data-id="${t.id}" style="padding:0.4rem 0.85rem; font-size:0.75rem; color:var(--neon-cyan); border-color:var(--border-active);">
              ✏️ Edit
            </button>
            <button class="btn-cta-secondary delete-testimonial-btn" data-id="${t.id}" style="padding:0.4rem 0.85rem; font-size:0.75rem; color:var(--danger); border-color:rgba(255,107,131,0.3);">
              🗑️ Delete
            </button>
          </div>
        </div>
      `).join('');

      // Bind Edit
      document.querySelectorAll('.edit-testimonial-btn').forEach(btn => {
        btn.addEventListener('click', () => {
          const tId = btn.getAttribute('data-id');
          const item = cachedTestimonials.find(t => t.id == tId);
          if (item) openTestimonialModal(item);
        });
      });

      // Bind Delete
      document.querySelectorAll('.delete-testimonial-btn').forEach(btn => {
        btn.addEventListener('click', async () => {
          if (!confirm('Yakin ingin menghapus testimonial ini?')) return;
          const tId = btn.getAttribute('data-id');
          try {
            const delRes = await apiFetch(`/api/admin/testimonials/${tId}`, {
              method: 'DELETE'
            });
            if (!delRes.ok) throw new Error('Gagal menghapus testimonial.');
            showToast('Testimonial berhasil dihapus.', 'info');
            loadTestimonialsManager();
            loadOverviewKPIs();
            if (window.BrainWavesApp) window.BrainWavesApp.loadTestimonials();
          } catch (e) {
            showToast(e.message, 'danger');
          }
        });
      });

    } catch (e) {
      console.error(e);
      listContainer.innerHTML = `<p style="color:var(--danger);">Error loading testimonials: ${e.message}</p>`;
    }
  }

  function openTestimonialModal(item = null) {
    const modal = document.getElementById('admin-testimonial-modal');
    if (!modal) return;

    const modalTitle = modal.querySelector('.modal-header h3');
    const submitBtn = modal.querySelector('button[type="submit"]');

    if (item) {
      if (modalTitle) modalTitle.textContent = 'Edit Testimonial Klien';
      if (submitBtn) submitBtn.textContent = 'Save Changes (Simpan Perubahan)';
      document.getElementById('testi-form-id').value = item.id;
      document.getElementById('testi-form-name').value = item.client_name || '';
      document.getElementById('testi-form-title').value = item.client_title || '';
      document.getElementById('testi-form-company').value = item.company || '';
      document.getElementById('testi-form-quote').value = item.quote || '';
      document.getElementById('testi-form-rating').value = item.rating || 5;
      document.getElementById('testi-form-order').value = item.sort_order || 0;
      document.getElementById('testi-form-published').value = item.is_published ? '1' : '0';
    } else {
      if (modalTitle) modalTitle.textContent = 'Tambah Testimonial Baru';
      if (submitBtn) submitBtn.textContent = 'Add Testimonial (Tambahkan)';
      document.getElementById('admin-testimonial-form').reset();
      document.getElementById('testi-form-id').value = '';
    }

    modal.classList.add('open');
  }

  function bindTestimonialActions() {
    const addBtn = document.getElementById('open-add-testimonial-modal-btn');
    if (addBtn) addBtn.addEventListener('click', () => openTestimonialModal(null));

    const form = document.getElementById('admin-testimonial-form');
    if (form) {
      form.addEventListener('submit', async (e) => {
        e.preventDefault();
        const tId = document.getElementById('testi-form-id').value;
        const payload = {
          client_name: document.getElementById('testi-form-name').value,
          client_title: document.getElementById('testi-form-title').value,
          company: document.getElementById('testi-form-company').value,
          quote: document.getElementById('testi-form-quote').value,
          rating: parseInt(document.getElementById('testi-form-rating').value, 10) || 5,
          sort_order: parseInt(document.getElementById('testi-form-order').value, 10) || 0,
          is_published: parseInt(document.getElementById('testi-form-published').value, 10) || 1
        };

        const modal = document.getElementById('admin-testimonial-modal');

        try {
          const url = tId ? `/api/admin/testimonials/${tId}` : '/api/admin/testimonials';
          const method = tId ? 'PUT' : 'POST';

          const res = await fetch(url, {
            method,
            headers: {
              'Content-Type': 'application/json',
              'Authorization': `Bearer ${authToken}`
            },
            body: JSON.stringify(payload)
          });
          const data = await res.json();
          if (!res.ok) throw new Error(data.error || 'Gagal menyimpan testimonial.');

          showToast(tId ? 'Testimonial berhasil diperbarui!' : 'Testimonial baru berhasil ditambahkan!', 'success');
          if (modal) modal.classList.remove('open');
          form.reset();
          loadTestimonialsManager();
          if (window.BrainWavesApp) window.BrainWavesApp.loadTestimonials();
        } catch (err) {
          showToast(err.message, 'danger');
        }
      });
    }
  }

  // ========================================================
  // 7. ACTIVITY AUDIT LOGS
  // ========================================================
  async function loadActivityLogs() {
    const list = document.getElementById('admin-logs-list');
    if (!list) return;

    try {
      const res = await fetch('/api/admin/logs', {
        headers: { 'Authorization': `Bearer ${authToken}` }
      });
      const logs = await res.json();

      list.innerHTML = logs.map(l => `
        <div class="activity-feed-item">
          <div>
            <div class="feed-event-title">${escapeHtml(l.action)}</div>
            <div style="font-size:0.8rem; color:var(--text-secondary); margin-top:2px;">${escapeHtml(l.metadata || '')}</div>
          </div>
          <div class="feed-event-meta">
            ${escapeHtml(l.user_email || 'System')} · ${new Date(l.created_at).toLocaleString('id-ID')}
          </div>
        </div>
      `).join('');
    } catch (e) {
      console.error(e);
    }
  }

  // ========================================================
  // 8. STUDIO SETTINGS & HERO/CONTENT EDITOR
  // ========================================================
  async function loadSettingsManager() {
    try {
      const res = await fetch('/api/settings');
      const settings = await res.json();

      if (document.getElementById('setting-studio-name')) document.getElementById('setting-studio-name').value = settings.studio_name || '';
      if (document.getElementById('setting-tagline')) document.getElementById('setting-tagline').value = settings.brand_tagline || '';
      if (document.getElementById('setting-hero-h1')) document.getElementById('setting-hero-h1').value = settings.hero_headline_1 || '';
      if (document.getElementById('setting-hero-h2')) document.getElementById('setting-hero-h2').value = settings.hero_headline_2 || '';
      if (document.getElementById('setting-hero-sub')) document.getElementById('setting-hero-sub').value = settings.hero_subtitle || '';
      if (document.getElementById('setting-about-title')) document.getElementById('setting-about-title').value = settings.about_title || '';
      if (document.getElementById('setting-about-lead')) document.getElementById('setting-about-lead').value = settings.about_lead || '';
      if (document.getElementById('setting-email')) document.getElementById('setting-email').value = settings.primary_email || '';
      if (document.getElementById('setting-location')) document.getElementById('setting-location').value = settings.office_location || '';
      if (document.getElementById('setting-status')) document.getElementById('setting-status').value = settings.availability_status || '';
    } catch (e) {
      console.error(e);
    }
  }

  function bindSettingsActions() {
    const form = document.getElementById('admin-settings-form');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      const payload = {
        studio_name: document.getElementById('setting-studio-name')?.value || '',
        brand_tagline: document.getElementById('setting-tagline')?.value || '',
        hero_headline_1: document.getElementById('setting-hero-h1')?.value || '',
        hero_headline_2: document.getElementById('setting-hero-h2')?.value || '',
        hero_subtitle: document.getElementById('setting-hero-sub')?.value || '',
        about_title: document.getElementById('setting-about-title')?.value || '',
        about_lead: document.getElementById('setting-about-lead')?.value || '',
        primary_email: document.getElementById('setting-email')?.value || '',
        office_location: document.getElementById('setting-location')?.value || '',
        availability_status: document.getElementById('setting-status')?.value || ''
      };

      try {
        const res = await fetch('/api/admin/settings', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}`
          },
          body: JSON.stringify(payload)
        });
        if (!res.ok) throw new Error('Gagal memperbarui pengaturan situs.');
        showToast('Pengaturan studio berhasil disimpan!', 'success');
        if (window.BrainWavesApp) window.BrainWavesApp.loadSettings();
      } catch (err) {
        showToast(err.message, 'danger');
      }
    });
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

  return {
    init,
    openPortal,
    closePortal,
    switchTab,
    loadOverviewKPIs,
    loadProjectsManager,
    loadServicesManager,
    loadArticlesManager,
    loadTestimonialsManager,
    loadInquiriesPipeline,
    deleteProjectById,
    deleteServiceById,
    deleteArticleById,
    deleteTestimonialById,
    openProjectModalById,
    openServiceModalById,
    openArticleModalById,
    openTestimonialModalById
  };
})();

// Export globally
window.AdminCMS = AdminCMS;
