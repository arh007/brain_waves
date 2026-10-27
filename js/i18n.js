// ========================================================
// BRAIN WAVES — INTERNATIONALIZATION (i18n) ENGINE
// Full Bilingual Support: Indonesian (ID) & English (EN)
// ========================================================

const BrainWavesI18n = (function() {
  const STORAGE_KEY = 'brainwaves_lang';
  let currentLang = 'en';

  const translations = {
    en: {
      // Navbar
      nav_works: 'Works',
      nav_services: 'Services',
      nav_manifesto: 'Manifesto',
      nav_studio: 'Studio',
      nav_insights: 'Insights',
      nav_contact: 'Contact',
      nav_start_project: 'Start a Project',
      nav_admin: 'Login Admin',
      nav_music: 'MUSIC',
      nav_audio: 'MUSIC',
      lang_switch_title: 'Switch to Indonesian (Ganti ke Bahasa Indonesia)',

      // Hero
      hero_badge: 'AVAILABLE FOR Q4 / 2026 ENGAGEMENTS',
      hero_headline_1: 'IDEAS ARE JUST THE BEGINNING.',
      hero_headline_2: "WE CREATE WHAT'S NEXT.",
      hero_subtitle: 'We engineer visionary brand systems, high-velocity digital products, and tactile 3D experiences for organizations forging the future.',
      hero_cta_lab: 'Launch Project Lab',
      hero_cta_works: 'Explore Selected Works ↘',
      pillar_1_title: 'Think Differently',
      pillar_1_desc: 'Deconstruct consensus thinking to reveal untapped market paradigms.',
      pillar_2_title: 'Design Boldly',
      pillar_2_desc: 'Provocative aesthetics engineered to command instant cultural authority.',
      pillar_3_title: 'Build the Future',
      pillar_3_desc: 'Production-grade WebGL, modern backend architecture, and sub-second speed.',

      // Selected Works
      works_tag: 'SELECTED WORKS',
      works_title: 'Case Studies in Digital Distinction',
      works_desc: 'Explore our curated portfolio of transformative digital products, brand architectures, and interactive 3D flagship experiences.',
      filter_all: 'All Disciplines',
      filter_brand: 'Brand Architecture',
      filter_product: 'Digital Products',
      filter_3d: 'Web & 3D',
      filter_ai: 'AI & Creative Tech',
      search_placeholder: 'Search projects or technologies...',
      btn_view_study: 'Explore Case Study →',

      // Services / Capabilities
      services_tag: 'CAPABILITIES',
      services_title: 'End-to-End Creative Engineering',
      services_desc: 'Six interconnected disciplines designed to take ambitious concepts from initial spark to global market domination.',
      btn_view_spec: 'View Specification →',

      // Manifesto
      manifesto_tag: 'OUR MANIFESTO',
      manifesto_statement: '"We do not build lukewarm templates. We construct digital cathedrals that command attention, provoke emotion, and endure."',
      m1_title: '01. Originality Over Conformity',
      m1_desc: 'The greatest risk in contemporary digital culture is becoming invisible. We treat formulaic safety as existential stagnation.',
      m2_title: '02. Precision at Every Scale',
      m2_desc: 'From micro-millisecond frame budgets to bespoke typographic kerning, every pixel is calibrated with mathematical devotion.',
      m3_title: '03. Technology as Art',
      m3_desc: 'Code is not merely utilitarian logic—it is a fluid canvas. We harness GPU shaders to give software a living heartbeat.',
      m4_title: '04. Evolutionary Velocity',
      m4_desc: 'Digital ecosystems never sit still. We build modular, AI-ready frameworks engineered to scale and adapt effortlessly.',

      // Methodology / Process
      process_tag: 'METHODOLOGY',
      process_title: 'The Neural Engineering Cycle',
      process_desc: 'Our proven five-stage trajectory designed for rapid convergence and zero execution friction.',
      p1_title: 'Discover',
      p1_desc: 'Immersion into brand DNA, customer psychology, and competitive white-spaces.',
      p2_title: 'Strategize',
      p2_desc: 'Architecting the conceptual thesis, technical blueprint, and interaction system.',
      p3_title: 'Create',
      p3_desc: 'Iterative 3D explorations, bespoke design tokens, and tactile interface craft.',
      p4_title: 'Launch',
      p4_desc: 'Rigorous multi-device stress testing, performance auditing, and global CDN rollout.',
      p5_title: 'Evolve',
      p5_desc: 'Real-time telemetry analysis, conversion optimization, and continuous feature expansion.',

      // Universe / Studio
      about_tag: 'OUR UNIVERSE',
      about_title: 'Born in the Crucible of Art and Code',
      about_lead: 'BRAIN WAVES is an independent digital creative studio operating at the intersection of brand architecture, sensory UI/UX, and generative intelligence.',
      about_body: 'Founded by a coalition of design polymaths, quantitative engineers, and creative technologists, we exist to build the digital infrastructure of tomorrow. We work with a select cohort of ambitious brands each quarter, guaranteeing our partners uncompromised executive focus and flawless delivery.',
      leadership_title: 'Studio Executive Leadership',
      stat_retention: 'Client Retention',
      stat_awards: 'Global Awards',
      stat_uptime: 'System Reliability',
      stat_countries: 'Countries Reached',

      // Project Lab
      lab_tag: 'INTERACTIVE PROJECT BUILDER',
      lab_title: 'Scope Your Vision in 5 Minutes',
      lab_desc: 'Use our interactive dossier generator to configure your project parameters and receive a preliminary architecture plan.',
      step_1_name: 'Capabilities',
      step_2_name: 'Vision & Scope',
      step_3_name: 'Budget Tier',
      step_4_name: 'Timeline',
      step_5_name: 'Dispatch',
      step1_title: 'Step 1: Choose Required Capabilities',
      step2_title: 'Step 2: Describe Your Vision & Objectives',
      step2_placeholder: 'Describe your product, core challenges, target users, and key milestones...',
      step3_title: 'Step 3: Investment Bracket',
      step4_title: 'Step 4: Target Deployment Horizon',
      step5_title: 'Step 5: Contact Credentials & Dispatch',
      wizard_back: '← Back',
      wizard_next: 'Next Step',
      wizard_submit: 'Transmit Project Brief',
      dossier_summary_title: 'Brief Parameter Summary',
      dossier_capabilities: 'Capabilities:',
      dossier_budget: 'Investment:',
      dossier_timeline: 'Target Horizon:',

      // Insights
      insights_tag: 'INSIGHTS',
      insights_title: 'The Brain Waves Editorial',
      insights_desc: 'Essays, technical investigations, and strategic theses on the future of software, design, and digital culture.',
      btn_read_article: 'Read Thesis →',

      // Testimonials
      testi_tag: 'VERIFIED ENDORSEMENTS',
      testi_title: 'What Our Partners Experience',

      // Contact
      contact_tag: 'CONTACT STUDIO',
      contact_title: 'Initiate Direct Communication',
      contact_desc: 'Have an urgent consultation or strategic inquiry? Reach out to our executive desk or send a direct dispatch below.',
      contact_form_title: 'Quick Consultation Dispatch',
      contact_name_label: 'Your Name *',
      contact_email_label: 'Your Email *',
      contact_msg_label: 'Message / Questions *',
      contact_msg_placeholder: 'Tell us how we can assist your project...',
      contact_submit: 'Transmit Consultation Request',
      contact_gen_inquiry: 'General Inquiries',
      contact_headquarters: 'Studio Headquarters',
      contact_status_title: 'Studio Operational Status',
      contact_status_active: 'Active Hub (WIB / UTC+7)',

      // Footer
      footer_nav_title: 'Navigation',
      footer_insights_title: 'Insights & Media',
      footer_ops_title: 'Operations',
      footer_admin_link: 'Login Admin (/login)',
      footer_cms_link: 'Dashboard CMS (/admin)',
      footer_privacy: 'Privacy Policy',
      footer_terms: 'Terms of Service',
      footer_status: 'Status: 100% Operational',
      footer_desc: 'An independent digital creative studio turning visionary ideas into brands, products, and living immersive experiences.',
      footer_rights: '© 2026 BRAIN WAVES Creative Studio. All Rights Reserved.',
      footer_tagline: 'ENGINEERED WITH NEON FUTURISTIC PRECISION',

      // Modals
      modal_challenge: '// THE CHALLENGE',
      modal_solution: '// THE ARCHITECTURAL SOLUTION',
      modal_results: '// VERIFIED RESULTS',
      modal_deliverables: 'DELIVERABLES & ASSETS',
      modal_phases: 'EXECUTION PHASES',
      modal_faq: 'FREQUENTLY ASKED QUESTIONS',

      // Music Player
      music_sys_badge: '// BRAIN WAVES SOUND SYSTEM',
      music_dock_label: '🎵 CYBER SOUNDTRACK',
      music_dock_ready: 'READY',
      music_dock_playing: 'PLAYING',
      toast_lang_changed: '🌐 Language switched to English'
    },

    id: {
      // Navbar
      nav_works: 'Karya',
      nav_services: 'Layanan',
      nav_manifesto: 'Manifesto',
      nav_studio: 'Studio',
      nav_insights: 'Artikel',
      nav_contact: 'Kontak',
      nav_start_project: 'Mulai Proyek',
      nav_admin: 'Login Admin',
      nav_music: 'MUSIK',
      nav_audio: 'MUSIK',
      lang_switch_title: 'Ganti ke Bahasa Inggris (Switch to English)',

      // Hero
      hero_badge: 'TERSEDIA UNTUK KOLABORASI Q4 / 2026',
      hero_headline_1: 'IDE HANYALAH SEBUAH AWAL.',
      hero_headline_2: 'KAMI CIPTAKAN MASA DEPAN.',
      hero_subtitle: 'Kami merekayasa sistem merek visioner, produk digital berkecepatan tinggi, dan pengalaman 3D taktil untuk organisasi peretas masa depan.',
      hero_cta_lab: 'Buka Project Lab',
      hero_cta_works: 'Jelajahi Portofolio Pilihan ↘',
      pillar_1_title: 'Berpikir Beda',
      pillar_1_desc: 'Bedah pola pikir konsensus untuk membuka paradigma pasar baru.',
      pillar_2_title: 'Desain Berani',
      pillar_2_desc: 'Estetika provokatif dirancang untuk memimpin otoritas kultural instan.',
      pillar_3_title: 'Bangun Masa Depan',
      pillar_3_desc: 'WebGL tingkat produksi, arsitektur backend modern, dan kecepatan kilat.',

      // Selected Works
      works_tag: 'PORTOFOLIO TERPILIH',
      works_title: 'Studi Kasus Keunggulan Digital',
      works_desc: 'Jelajahi portofolio pilihan kami yang mencakup produk digital transformatif, arsitektur merek, dan pengalaman 3D interaktif unggulan.',
      filter_all: 'Semua Disiplin',
      filter_brand: 'Arsitektur Merek',
      filter_product: 'Produk Digital',
      filter_3d: 'Web & 3D',
      filter_ai: 'AI & Teknologi Kreatif',
      search_placeholder: 'Cari proyek atau teknologi...',
      btn_view_study: 'Buka Studi Kasus →',

      // Services / Capabilities
      services_tag: 'KEMAMPUAN STUDIO',
      services_title: 'Rekayasa Kreatif Ujung-ke-Ujung',
      services_desc: 'Enam disiplin terpadu dirancang untuk mewujudkan konsep ambisius dari percikan awal hingga dominasi pasar global.',
      btn_view_spec: 'Lihat Spesifikasi →',

      // Manifesto
      manifesto_tag: 'MANIFESTO KAMI',
      manifesto_statement: '"Kami tidak membuat template biasa. Kami membangun katedral digital yang memikat perhatian, menggugah emosi, dan abadi."',
      m1_title: '01. Orisinalitas di Atas Konformitas',
      m1_desc: 'Risiko terbesar dalam budaya digital adalah menjadi tak kasat mata. Kami menganggap zona aman formulaik sebagai stagnasi eksistensial.',
      m2_title: '02. Presisi di Setiap Skala',
      m2_desc: 'Dari anggaran frame milidetik hingga kerning tipografi bespoke, setiap piksel dikalibrasi dengan presisi matematika.',
      m3_title: '03. Teknologi Sebagai Seni',
      m3_desc: 'Kode bukan sekadar logika utilitarian—ini adalah kanvas hidup. Kami memanfaatkan shader GPU untuk memberi detak jantung pada software.',
      m4_title: '04. Kecepatan Evolusioner',
      m4_desc: 'Ekosistem digital tidak pernah diam. Kami membangun kerangka kerja modular siap-AI yang dirancang untuk skala dan adaptasi tanpa batas.',

      // Methodology / Process
      process_tag: 'METODOLOGI',
      process_title: 'Siklus Rekayasa Neural',
      process_desc: 'Trajektori lima tahap kami yang teruji dirancang untuk konvergensi cepat dan tanpa hambatan eksekusi.',
      p1_title: 'Eksplorasi',
      p1_desc: 'Penyelaman mendalam ke DNA merek, psikologi pengguna, dan peluang kompetitif baru.',
      p2_title: 'Strategi',
      p2_desc: 'Merancang tesis konseptual, cetak biru teknis, dan sistem interaksi komprehensif.',
      p3_title: 'Kreasi',
      p3_desc: 'Eksplorasi 3D iteratif, token desain bespoke, dan seni antarmuka taktil modern.',
      p4_title: 'Peluncuran',
      p4_desc: 'Uji stres multi-perangkat yang ketat, audit performa, dan peluncuran global via CDN.',
      p5_title: 'Evolusi',
      p5_desc: 'Analisis telemetri real-time, optimasi konversi, dan ekspansi fitur berkelanjutan.',

      // Universe / Studio
      about_tag: 'ALAM SEMESTA KAMI',
      about_title: 'Lahir dari Peleburan Seni dan Kode',
      about_lead: 'BRAIN WAVES adalah studio kreatif digital independen di persimpangan arsitektur merek, UI/UX sensorik, dan inteligensi generatif.',
      about_body: 'Didirikan oleh koalisi polymath desain, insinyur kuantitatif, dan teknolog kreatif, kami hadir untuk membangun infrastruktur digital masa depan. Kami bekerja dengan mitra terpilih setiap kuartal guna menjamin fokus eksekutif tanpa kompromi dan pengiriman tanpa cela.',
      leadership_title: 'Pimpinan Eksekutif Studio',
      stat_retention: 'Retensi Klien',
      stat_awards: 'Penghargaan Global',
      stat_uptime: 'Keandalan Sistem',
      stat_countries: 'Negara Terlayani',

      // Project Lab
      lab_tag: 'LAB PEMBANGUN PROYEK',
      lab_title: 'Rumuskan Visi Anda dalam 5 Menit',
      lab_desc: 'Gunakan generator berkas interaktif kami untuk merumuskan parameter proyek Anda dan menerima rencana arsitektur awal.',
      step_1_name: 'Layanan',
      step_2_name: 'Visi & Ruang',
      step_3_name: 'Anggaran',
      step_4_name: 'Waktu',
      step_5_name: 'Kirim',
      step1_title: 'Langkah 1: Pilih Layanan yang Dibutuhkan',
      step2_title: 'Langkah 2: Jelaskan Visi & Tujuan Anda',
      step2_placeholder: 'Jelaskan produk Anda, tantangan utama, target pengguna, dan target waktu...',
      step3_title: 'Langkah 3: Estimasi Anggaran Investasi',
      step4_title: 'Langkah 4: Target Waktu Peluncuran',
      step5_title: 'Langkah 5: Kontak & Pengiriman Brief',
      wizard_back: '← Kembali',
      wizard_next: 'Langkah Berikutnya',
      wizard_submit: 'Kirimkan Brief Proyek',
      dossier_summary_title: 'Ringkasan Parameter Brief',
      dossier_capabilities: 'Layanan Terpilih:',
      dossier_budget: 'Estimasi Investasi:',
      dossier_timeline: 'Target Peluncuran:',

      // Insights
      insights_tag: 'WAWASAN & RISET',
      insights_title: 'Editorial Brain Waves',
      insights_desc: 'Esai, investigasi teknis, dan tesis strategis tentang masa depan perangkat lunak, desain, dan budaya digital.',
      btn_read_article: 'Baca Artikel →',

      // Testimonials
      testi_tag: 'TESTIMONI TERVERIFIKASI',
      testi_title: 'Pengalaman Para Kolaborator Kami',

      // Contact
      contact_tag: 'HUBUNGI STUDIO',
      contact_title: 'Konsultasi Langsung',
      contact_desc: 'Punya konsultasi mendesak atau pertanyaan strategis? Hubungi tim eksekutif kami atau kirim pesan di bawah.',
      contact_form_title: 'Kirim Permintaan Konsultasi Cepat',
      contact_name_label: 'Nama Anda *',
      contact_email_label: 'Email Anda *',
      contact_msg_label: 'Pesan / Pertanyaan *',
      contact_msg_placeholder: 'Ceritakan bagaimana kami dapat membantu mewujudkan proyek Anda...',
      contact_submit: 'Kirim Permintaan Konsultasi',
      contact_gen_inquiry: 'Pertanyaan Umum',
      contact_headquarters: 'Kantor Pusat Studio',
      contact_status_title: 'Status Operasional Studio',
      contact_status_active: 'Pusat Aktif (WIB / UTC+7)',

      // Footer
      footer_nav_title: 'Navigasi',
      footer_insights_title: 'Wawasan & Media',
      footer_ops_title: 'Operasional',
      footer_admin_link: 'Login Admin (/login)',
      footer_cms_link: 'Dashboard CMS (/admin)',
      footer_privacy: 'Kebijakan Privasi',
      footer_terms: 'Syarat & Ketentuan',
      footer_status: 'Status: 100% Beroperasi',
      footer_desc: 'Studio kreatif digital independen yang mengubah ide visioner menjadi merek, produk, dan pengalaman imersif yang hidup.',
      footer_rights: '© 2026 BRAIN WAVES Creative Studio. Seluruh Hak Cipta Dilindungi.',
      footer_tagline: 'DIRANCANG DENGAN PRESISI NEON FUTURISTIK',

      // Modals
      modal_challenge: '// TANTANGAN UTAMA',
      modal_solution: '// SOLUSI ARSITEKTURAL',
      modal_results: '// HASIL TERVERIFIKASI',
      modal_deliverables: 'DELIVERABLES & ASET',
      modal_phases: 'TAHAPAN EKSEKUSI',
      modal_faq: 'PERTANYAAN YANG SERING DIAJUKAN',

      // Music Player
      music_sys_badge: '// SISTEM SUARA BRAIN WAVES',
      music_dock_label: '🎵 MUSIK CYBER',
      music_dock_ready: 'SIAP',
      music_dock_playing: 'MEMUTAR',
      toast_lang_changed: '🌐 Bahasa diubah ke Bahasa Indonesia'
    }
  };

  function init() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === 'id' || saved === 'en') {
      currentLang = saved;
    } else {
      const browserLang = (navigator.language || '').toLowerCase();
      currentLang = browserLang.startsWith('id') ? 'id' : 'en';
    }

    applyLanguage(currentLang, false);
  }

  function applyLanguage(lang, showNotification = true) {
    if (!translations[lang]) lang = 'en';
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);

    document.documentElement.setAttribute('lang', lang);

    const dict = translations[lang];

    // 1. Text elements with data-i18n
    document.querySelectorAll('[data-i18n]').forEach(el => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        if (el.dataset.i18nTarget === 'placeholder') {
          el.setAttribute('placeholder', dict[key]);
        } else if (el.dataset.i18nTarget === 'title') {
          el.setAttribute('title', dict[key]);
        } else if (el.dataset.i18nTarget === 'html') {
          el.innerHTML = dict[key];
        } else {
          el.textContent = dict[key];
        }
      }
    });

    // 2. Placeholder attributes
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
      const key = el.getAttribute('data-i18n-placeholder');
      if (dict[key]) {
        el.setAttribute('placeholder', dict[key]);
      }
    });

    // 3. Title attributes
    document.querySelectorAll('[data-i18n-title]').forEach(el => {
      const key = el.getAttribute('data-i18n-title');
      if (dict[key]) {
        el.setAttribute('title', dict[key]);
      }
    });

    // 4. Update Language Switcher UI
    updateSwitcherUI();

    // 5. Fire custom event for dynamic components (ProjectBuilder, Modals, etc.)
    window.dispatchEvent(new CustomEvent('brainwaves:langchange', { detail: { lang, dict } }));

    if (showNotification && typeof showToast === 'function') {
      showToast(dict.toast_lang_changed || 'Language updated', 'info');
    }
  }

  function updateSwitcherUI() {
    const btn = document.getElementById('lang-switcher-btn');
    if (!btn) return;

    btn.style.backgroundColor = '#11121E';
    btn.style.borderColor = 'rgba(101, 245, 255, 0.3)';
    btn.style.color = '#F5F5F7';

    btn.querySelectorAll('.lang-opt').forEach(opt => {
      const isTarget = opt.getAttribute('data-lang') === currentLang;
      if (isTarget) {
        opt.classList.add('active');
        opt.style.color = '#65F5FF';
        opt.style.textShadow = '0 0 10px rgba(101, 245, 255, 0.7)';
        opt.style.fontWeight = '700';
      } else {
        opt.classList.remove('active');
        opt.style.color = '#717694';
        opt.style.textShadow = 'none';
        opt.style.fontWeight = '500';
      }
    });

    const dict = translations[currentLang];
    btn.setAttribute('title', dict.lang_switch_title);
  }

  function toggleLang() {
    const newLang = (currentLang === 'id') ? 'en' : 'id';
    applyLanguage(newLang, true);
    if (window.BrainWavesAudio) {
      BrainWavesAudio.playClick(880);
    }
  }

  function get(key, fallback = '') {
    const dict = translations[currentLang] || translations.en;
    return dict[key] || fallback || key;
  }

  // Auto initialize on DOM ready
  document.addEventListener('DOMContentLoaded', () => {
    init();
  });

  return {
    init,
    toggleLang,
    applyLanguage,
    get,
    getLang: () => currentLang,
    getDict: () => translations[currentLang]
  };
})();

// Export globally
window.BrainWavesI18n = BrainWavesI18n;
