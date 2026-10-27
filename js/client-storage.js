// ========================================================
// BRAIN WAVES — CLIENT STORAGE ADAPTER (FOR GITHUB PAGES)
// Full offline/static CRUD capability using LocalStorage
// ========================================================

const ClientStorage = (function() {
  const STORAGE_KEYS = {
    PROJECTS: 'bw_static_projects',
    SERVICES: 'bw_static_services',
    ARTICLES: 'bw_static_articles',
    TESTIMONIALS: 'bw_static_testimonials',
    SETTINGS: 'bw_static_settings'
  };

  function init() {
    if (!localStorage.getItem(STORAGE_KEYS.PROJECTS)) {
      localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(window.BW_DEFAULT_DATA?.projects || []));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SERVICES)) {
      localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(window.BW_DEFAULT_DATA?.services || []));
    }
    if (!localStorage.getItem(STORAGE_KEYS.ARTICLES)) {
      localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(window.BW_DEFAULT_DATA?.articles || []));
    }
    if (!localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) {
      localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(window.BW_DEFAULT_DATA?.testimonials || []));
    }
    if (!localStorage.getItem(STORAGE_KEYS.SETTINGS)) {
      localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(window.BW_DEFAULT_DATA?.settings || {}));
    }
  }

  // Ensure initialized
  init();

  // Projects
  function getProjects() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.PROJECTS)) || [];
    } catch (e) {
      return window.BW_DEFAULT_DATA?.projects || [];
    }
  }

  function saveProject(project) {
    const list = getProjects();
    if (project.id) {
      const idx = list.findIndex(p => p.id == project.id);
      if (idx !== -1) list[idx] = { ...list[idx], ...project };
      else list.push(project);
    } else {
      project.id = Date.now();
      list.unshift(project);
    }
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(list));
    return project;
  }

  function deleteProject(id) {
    let list = getProjects();
    list = list.filter(p => p.id != id);
    localStorage.setItem(STORAGE_KEYS.PROJECTS, JSON.stringify(list));
    return true;
  }

  // Services
  function getServices() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SERVICES)) || [];
    } catch (e) {
      return window.BW_DEFAULT_DATA?.services || [];
    }
  }

  function saveService(service) {
    const list = getServices();
    if (service.id) {
      const idx = list.findIndex(s => s.id == service.id);
      if (idx !== -1) list[idx] = { ...list[idx], ...service };
      else list.push(service);
    } else {
      service.id = Date.now();
      list.push(service);
    }
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(list));
    return service;
  }

  function deleteService(id) {
    let list = getServices();
    list = list.filter(s => s.id != id);
    localStorage.setItem(STORAGE_KEYS.SERVICES, JSON.stringify(list));
    return true;
  }

  // Articles
  function getArticles() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.ARTICLES)) || [];
    } catch (e) {
      return window.BW_DEFAULT_DATA?.articles || [];
    }
  }

  function saveArticle(article) {
    const list = getArticles();
    if (article.id) {
      const idx = list.findIndex(a => a.id == article.id);
      if (idx !== -1) list[idx] = { ...list[idx], ...article };
      else list.push(article);
    } else {
      article.id = Date.now();
      list.unshift(article);
    }
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(list));
    return article;
  }

  function deleteArticle(id) {
    let list = getArticles();
    list = list.filter(a => a.id != id);
    localStorage.setItem(STORAGE_KEYS.ARTICLES, JSON.stringify(list));
    return true;
  }

  // Testimonials
  function getTestimonials() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.TESTIMONIALS)) || [];
    } catch (e) {
      return window.BW_DEFAULT_DATA?.testimonials || [];
    }
  }

  function saveTestimonial(testimonial) {
    const list = getTestimonials();
    if (testimonial.id) {
      const idx = list.findIndex(t => t.id == testimonial.id);
      if (idx !== -1) list[idx] = { ...list[idx], ...testimonial };
      else list.push(testimonial);
    } else {
      testimonial.id = Date.now();
      list.push(testimonial);
    }
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(list));
    return testimonial;
  }

  function deleteTestimonial(id) {
    let list = getTestimonials();
    list = list.filter(t => t.id != id);
    localStorage.setItem(STORAGE_KEYS.TESTIMONIALS, JSON.stringify(list));
    return true;
  }

  // Settings
  function getSettings() {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEYS.SETTINGS)) || window.BW_DEFAULT_DATA?.settings;
    } catch (e) {
      return window.BW_DEFAULT_DATA?.settings;
    }
  }

  function saveSettings(settings) {
    const current = getSettings();
    const updated = { ...current, ...settings };
    localStorage.setItem(STORAGE_KEYS.SETTINGS, JSON.stringify(updated));
    return updated;
  }

  // Static auth check
  function login(email, password) {
    if (email === 'admin@brainwaves.studio' && password === 'admin123') {
      const token = 'ghpages_' + Math.random().toString(36).substring(2) + Date.now();
      const user = { id: 1, name: 'Elena Vance', email: 'admin@brainwaves.studio', role: 'creative_director' };
      localStorage.setItem('bw_admin_token', token);
      localStorage.setItem('bw_admin_user', JSON.stringify(user));
      return { success: true, token, user };
    }
    return { success: false, error: 'Kredensial tidak valid. Gunakan admin@brainwaves.studio / admin123' };
  }

  return {
    init,
    getProjects,
    saveProject,
    deleteProject,
    getServices,
    saveService,
    deleteService,
    getArticles,
    saveArticle,
    deleteArticle,
    getTestimonials,
    saveTestimonial,
    deleteTestimonial,
    getSettings,
    saveSettings,
    login
  };
})();

window.ClientStorage = ClientStorage;
