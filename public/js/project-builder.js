// ========================================================
// BRAIN WAVES — SMART PROJECT BUILDER (WIZARD)
// 5-Step Interactive Brief & Lead Generation Engine
// ========================================================

const ProjectBuilder = (function() {
  let currentStep = 1;
  const totalSteps = 5;

  const wizardState = {
    services: [1, 3], // Default selected: Brand Strategy & Web Engineering
    brief: '',
    budget: 'Rp25–50 juta',
    timeline: '1–2 bulan',
    name: '',
    email: '',
    company: '',
    preferred_contact: 'email',
    honeypot: ''
  };

  const serviceNamesMap = {
    1: 'Brand Strategy & Visual Identity',
    2: 'Digital Product Design (UI/UX)',
    3: 'Web & Application Engineering',
    4: 'Creative Campaigns & Visual Direction',
    5: 'Motion & 3D Web Experiences',
    6: 'AI & Creative Innovation'
  };

  function init() {
    bindEvents();
    renderStep(currentStep);
    updateReviewCard();
  }

  function bindEvents() {
    // Service choice cards multi-select
    document.querySelectorAll('.service-choice-card').forEach(card => {
      card.addEventListener('click', () => {
        const serviceId = parseInt(card.getAttribute('data-service-id'), 10);
        const index = wizardState.services.indexOf(serviceId);

        if (index > -1) {
          wizardState.services.splice(index, 1);
          card.classList.remove('selected');
        } else {
          wizardState.services.push(serviceId);
          card.classList.add('selected');
        }

        if (window.BrainWavesAudio) BrainWavesAudio.playBlip(540);
        updateReviewCard();
      });
    });

    // Budget range pills
    document.querySelectorAll('.budget-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.budget-pill').forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        wizardState.budget = pill.getAttribute('data-value');
        if (window.BrainWavesAudio) BrainWavesAudio.playBlip(620);
        updateReviewCard();
      });
    });

    // Timeline pills
    document.querySelectorAll('.timeline-pill').forEach(pill => {
      pill.addEventListener('click', () => {
        document.querySelectorAll('.timeline-pill').forEach(p => p.classList.remove('selected'));
        pill.classList.add('selected');
        wizardState.timeline = pill.getAttribute('data-value');
        if (window.BrainWavesAudio) BrainWavesAudio.playBlip(620);
        updateReviewCard();
      });
    });

    // Inputs binding
    const briefInput = document.getElementById('wizard-brief-input');
    if (briefInput) {
      briefInput.addEventListener('input', (e) => {
        wizardState.brief = e.target.value;
        updateReviewCard();
      });
    }

    const nameInput = document.getElementById('wizard-name-input');
    if (nameInput) nameInput.addEventListener('input', (e) => { wizardState.name = e.target.value; updateReviewCard(); });

    const emailInput = document.getElementById('wizard-email-input');
    if (emailInput) emailInput.addEventListener('input', (e) => { wizardState.email = e.target.value; updateReviewCard(); });

    const companyInput = document.getElementById('wizard-company-input');
    if (companyInput) companyInput.addEventListener('input', (e) => { wizardState.company = e.target.value; updateReviewCard(); });

    // Step Navigation buttons
    const prevBtn = document.getElementById('wizard-prev-btn');
    if (prevBtn) {
      prevBtn.addEventListener('click', () => {
        if (currentStep > 1) {
          currentStep--;
          renderStep(currentStep);
          if (window.BrainWavesAudio) BrainWavesAudio.playBlip(400);
        }
      });
    }

    const nextBtn = document.getElementById('wizard-next-btn');
    if (nextBtn) {
      nextBtn.addEventListener('click', () => {
        if (validateStep(currentStep)) {
          if (currentStep < totalSteps) {
            currentStep++;
            renderStep(currentStep);
            if (window.BrainWavesAudio) BrainWavesAudio.playStepChord();
          } else {
            submitInquiry();
          }
        }
      });
    }

    // Direct click on step nodes
    document.querySelectorAll('.wizard-step-node').forEach(node => {
      node.addEventListener('click', () => {
        const targetStep = parseInt(node.getAttribute('data-step'), 10);
        if (targetStep < currentStep || validateStep(currentStep)) {
          currentStep = targetStep;
          renderStep(currentStep);
        }
      });
    });
  }

  function validateStep(step) {
    const isId = (window.BrainWavesI18n && BrainWavesI18n.getLang() === 'id');
    if (step === 1) {
      if (wizardState.services.length === 0) {
        showToast(isId ? 'Pilih minimal satu layanan yang dibutuhkan proyek Anda.' : 'Please select at least one capability for your project.', 'warning');
        return false;
      }
    }
    if (step === 2) {
      if (!wizardState.brief.trim() || wizardState.brief.trim().length < 15) {
        showToast(isId ? 'Mohon jelaskan gambaran singkat ide atau tantangan proyek Anda (min. 15 karakter).' : 'Please describe your project vision or key objectives (min. 15 chars).', 'warning');
        return false;
      }
    }
    if (step === 4) {
      if (!wizardState.name.trim()) {
        showToast(isId ? 'Mohon masukkan nama lengkap atau nama kontak Anda.' : 'Please provide your full name or lead contact.', 'warning');
        return false;
      }
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!wizardState.email.trim() || !emailRegex.test(wizardState.email.trim())) {
        showToast(isId ? 'Mohon masukkan alamat email kerja yang valid.' : 'Please provide a valid work email address.', 'warning');
        return false;
      }
    }
    return true;
  }

  function renderStep(step) {
    // Update step panels visibility
    document.querySelectorAll('.wizard-step-panel').forEach(panel => {
      panel.classList.remove('active');
    });
    const activePanel = document.getElementById(`wizard-step-${step}`);
    if (activePanel) activePanel.classList.add('active');

    // Update progress track nodes
    document.querySelectorAll('.wizard-step-node').forEach(node => {
      const stepIdx = parseInt(node.getAttribute('data-step'), 10);
      node.classList.remove('active', 'completed');
      if (stepIdx === step) node.classList.add('active');
      else if (stepIdx < step) node.classList.add('completed');
    });

    // Update nav buttons text & visibility
    const prevBtn = document.getElementById('wizard-prev-btn');
    const nextBtn = document.getElementById('wizard-next-btn');

    if (prevBtn) {
      prevBtn.style.visibility = step === 1 ? 'hidden' : 'visible';
      const backText = window.BrainWavesI18n ? BrainWavesI18n.get('wizard_back', '← Back') : '← Back';
      prevBtn.innerHTML = `<span>${backText}</span>`;
    }

    if (nextBtn) {
      if (step === totalSteps) {
        const submitText = window.BrainWavesI18n ? BrainWavesI18n.get('wizard_submit', 'Transmit Project Brief') : 'Transmit Project Brief';
        nextBtn.innerHTML = `<span>${submitText}</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
        nextBtn.className = 'btn-cta-primary';
      } else {
        const nextText = window.BrainWavesI18n ? BrainWavesI18n.get('wizard_next', 'Next Step') : 'Next Step';
        nextBtn.innerHTML = `<span>${nextText}</span> <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M5 12h14M12 5l7 7-7 7"/></svg>`;
        nextBtn.className = 'btn-cta-primary';
      }
    }
  }

  // Listen to language changes
  window.addEventListener('brainwaves:langchange', () => {
    renderStep(currentStep);
    updateReviewCard();
  });

  function updateReviewCard() {
    const servicesListEl = document.getElementById('summary-services-val');
    const budgetValEl = document.getElementById('summary-budget-val');
    const timelineValEl = document.getElementById('summary-timeline-val');
    const contactValEl = document.getElementById('summary-contact-val');
    const briefPreviewEl = document.getElementById('summary-brief-val');

    if (servicesListEl) {
      const names = wizardState.services.map(id => serviceNamesMap[id] || `Layanan #${id}`);
      servicesListEl.textContent = names.length ? names.join(', ') : 'Belum dipilih';
    }

    if (budgetValEl) budgetValEl.textContent = wizardState.budget;
    if (timelineValEl) timelineValEl.textContent = wizardState.timeline;
    if (contactValEl) {
      contactValEl.textContent = wizardState.name 
        ? `${wizardState.name} (${wizardState.email || 'tanpa email'}) ${wizardState.company ? '— ' + wizardState.company : ''}` 
        : 'Belum diisi';
    }
    if (briefPreviewEl) {
      briefPreviewEl.textContent = wizardState.brief ? (wizardState.brief.substring(0, 100) + '...') : 'Belum diisi';
    }
  }

  async function submitInquiry() {
    const nextBtn = document.getElementById('wizard-next-btn');
    if (nextBtn) {
      nextBtn.disabled = true;
      nextBtn.innerHTML = `<span>Transmitting to Brain Waves...</span>`;
    }

    const payload = {
      name: wizardState.name.trim(),
      email: wizardState.email.trim(),
      company: wizardState.company.trim(),
      services: wizardState.services,
      budget_range: wizardState.budget,
      timeline: wizardState.timeline,
      brief: wizardState.brief.trim(),
      preferred_contact: wizardState.preferred_contact,
      honeypot: wizardState.honeypot
    };

    try {
      const response = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal mengirim project brief.');
      }

      if (window.BrainWavesAudio) BrainWavesAudio.playSuccessChime();

      // Show Confirmation Modal
      showReceiptModal(data.reference, data.details);

      // Reset form
      wizardState.brief = '';
      wizardState.name = '';
      wizardState.email = '';
      wizardState.company = '';
      currentStep = 1;
      renderStep(1);

    } catch (err) {
      showToast(err.message, 'danger');
    } finally {
      if (nextBtn) {
        nextBtn.disabled = false;
        renderStep(currentStep);
      }
    }
  }

  function showReceiptModal(reference, details) {
    const modal = document.getElementById('inquiry-receipt-modal');
    if (!modal) return;

    document.getElementById('receipt-ref-code').textContent = reference;
    document.getElementById('receipt-client-name').textContent = details.name;
    document.getElementById('receipt-client-email').textContent = details.email;
    document.getElementById('receipt-timestamp').textContent = new Date().toLocaleString('id-ID', { dateStyle: 'full', timeStyle: 'short' });

    modal.classList.add('open');
  }

  return { init, state: wizardState };
})();
