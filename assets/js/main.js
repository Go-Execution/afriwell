// AfriWell Bridge (AWB) - Interactive Behaviors

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu
  const menuBtn = document.getElementById('menuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  if (menuBtn && mobileMenu) {
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
    mobileMenu.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => mobileMenu.classList.add('hidden'));
    });
  }

  // Sticky Header elevation
  const navbar = document.getElementById('mainHeader');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      navbar.classList.add('shadow-md');
    } else {
      navbar.classList.remove('shadow-md');
    }
  });

  // Scholarship Portal Tabs: New Application vs Continuing Scholar Report
  const tabNewApp = document.getElementById('tabNewApp');
  const tabContinuing = document.getElementById('tabContinuing');
  const paneNewApp = document.getElementById('paneNewApp');
  const paneContinuing = document.getElementById('paneContinuing');

  if (tabNewApp && tabContinuing && paneNewApp && paneContinuing) {
    tabNewApp.addEventListener('click', () => {
      tabNewApp.classList.add('bg-brand-navy', 'text-white', 'shadow');
      tabNewApp.classList.remove('bg-white', 'text-slate-600', 'hover:bg-slate-50');

      tabContinuing.classList.remove('bg-brand-navy', 'text-white', 'shadow');
      tabContinuing.classList.add('bg-white', 'text-slate-600', 'hover:bg-slate-50');

      paneNewApp.classList.remove('hidden');
      paneContinuing.classList.add('hidden');
    });

    tabContinuing.addEventListener('click', () => {
      tabContinuing.classList.add('bg-brand-navy', 'text-white', 'shadow');
      tabContinuing.classList.remove('bg-white', 'text-slate-600', 'hover:bg-slate-50');

      tabNewApp.classList.remove('bg-brand-navy', 'text-white', 'shadow');
      tabNewApp.classList.add('bg-white', 'text-slate-600', 'hover:bg-slate-50');

      paneContinuing.classList.remove('hidden');
      paneNewApp.classList.add('hidden');
    });
  }

  // File Upload Handlers (for both forms)
  function setupFileInput(inputElement, previewElement) {
    if (!inputElement || !previewElement) return;
    inputElement.addEventListener('change', (e) => {
      const files = Array.from(e.target.files);
      if (files.length > 0) {
        previewElement.innerHTML = files.map(f => `
          <div class="flex items-center justify-between text-xs py-1.5 px-3 bg-emerald-50 text-emerald-800 rounded-lg border border-emerald-200 mt-1">
            <span class="truncate font-medium">${f.name}</span>
            <span class="text-[10px] text-emerald-600 ml-2 font-mono">${(f.size / (1024 * 1024)).toFixed(2)} MB</span>
          </div>
        `).join('');
      } else {
        previewElement.innerHTML = '';
      }
    });
  }

  setupFileInput(document.getElementById('newAppFiles'), document.getElementById('newAppFilePreview'));
  setupFileInput(document.getElementById('reportFiles'), document.getElementById('reportFilePreview'));

  // Donation Tier Logic (Matched to Client's exact $25, $50, $100 descriptions)
  const donationTiers = {
    '25': {
      title: 'School Supplies Support',
      desc: 'Helps provide basic school supplies such as notebooks, pens, pencils, and other learning materials for a child in need.'
    },
    '50': {
      title: 'Uniforms and Shoes',
      desc: 'Helps support school uniforms, shoes, and other essential items that allow a child to attend school with dignity.'
    },
    '100': {
      title: 'School Fees Assistance',
      desc: 'Helps reduce the burden of school fees and keeps a student on the path of education and hope.'
    },
    '250': {
      title: 'Rural Clinic & Medicines',
      desc: 'Funds comprehensive medical triage, blood glucose/malaria diagnostic testing, and essential prescription meds for rural families.'
    },
    '500': {
      title: 'Surgical Referral & Mobile Station',
      desc: 'Covers specialized hospital referrals for hernia or cataract surgeries, plus transport and surgical logistics for rural patients.'
    }
  };

  const tierCards = document.querySelectorAll('.tier-card');
  const customDonationInput = document.getElementById('customDonationInput');
  const selectedAmountDisplay = document.getElementById('selectedAmountDisplay');
  const selectedTierTitle = document.getElementById('selectedTierTitle');
  const selectedTierDesc = document.getElementById('selectedTierDesc');

  function updateDonation(amount) {
    if (selectedAmountDisplay) selectedAmountDisplay.textContent = `$${amount}`;

    const data = donationTiers[amount.toString()];
    if (data) {
      if (selectedTierTitle) selectedTierTitle.textContent = data.title;
      if (selectedTierDesc) selectedTierDesc.textContent = data.desc;
    } else {
      if (selectedTierTitle) selectedTierTitle.textContent = 'Custom Humanitarian Gift';
      if (selectedTierDesc) selectedTierDesc.textContent = `Your compassionate contribution of $${amount} directly empowers rural African families with life-saving healthcare and life-changing education.`;
    }
  }

  tierCards.forEach(card => {
    card.addEventListener('click', () => {
      tierCards.forEach(c => {
        c.classList.remove('border-brand-gold', 'ring-2', 'ring-brand-gold', 'bg-brand-gold/5');
        c.classList.add('border-slate-200');
      });
      card.classList.add('border-brand-gold', 'ring-2', 'ring-brand-gold', 'bg-brand-gold/5');
      card.classList.remove('border-slate-200');

      if (customDonationInput) customDonationInput.value = '';
      const amt = card.dataset.amount;
      updateDonation(amt);
    });
  });

  if (customDonationInput) {
    customDonationInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (val && val > 0) {
        tierCards.forEach(c => {
          c.classList.remove('border-brand-gold', 'ring-2', 'ring-brand-gold', 'bg-brand-gold/5');
          c.classList.add('border-slate-200');
        });
        updateDonation(val);
      }
    });
  }

  // Toast System
  const toast = document.getElementById('toast');
  function showToast(message) {
    if (!toast) return;
    toast.textContent = message;
    toast.classList.remove('opacity-0', 'pointer-events-none', 'translate-y-4');
    toast.classList.add('opacity-100', 'translate-y-0');
    setTimeout(() => {
      toast.classList.add('opacity-0', 'pointer-events-none', 'translate-y-4');
      toast.classList.remove('opacity-100', 'translate-y-0');
    }, 4500);
  }

  // Form Submissions
  const formNewApp = document.getElementById('formNewApp');
  if (formNewApp) {
    formNewApp.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your scholarship application and transcripts have been successfully submitted for review.');
      formNewApp.reset();
      const preview = document.getElementById('newAppFilePreview');
      if (preview) preview.innerHTML = '';
    });
  }

  const formContinuing = document.getElementById('formContinuing');
  if (formContinuing) {
    formContinuing.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Academic report received! Your semester records have been updated in the AfriWell Bridge scholar system.');
      formContinuing.reset();
      const preview = document.getElementById('reportFilePreview');
      if (preview) preview.innerHTML = '';
    });
  }

  const generalContactForm = document.getElementById('generalContactForm');
  if (generalContactForm) {
    generalContactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you for contacting AfriWell Bridge. A representative will reach out to you shortly.');
      generalContactForm.reset();
    });
  }

  // Founder's Full Autobiography Modal
  const bioModal = document.getElementById('bioModal');
  const openBioModalBtn = document.getElementById('openBioModalBtn');
  const closeBioModalBtn = document.getElementById('closeBioModalBtn');

  function openBioModal() {
    if (!bioModal) return;
    bioModal.classList.remove('hidden');
    bioModal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeBioModal() {
    if (!bioModal) return;
    bioModal.classList.add('hidden');
    bioModal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }

  if (openBioModalBtn) openBioModalBtn.addEventListener('click', openBioModal);
  if (closeBioModalBtn) closeBioModalBtn.addEventListener('click', closeBioModal);
  if (bioModal) {
    bioModal.addEventListener('click', (e) => {
      if (e.target === bioModal) closeBioModal();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && !bioModal.classList.contains('hidden')) closeBioModal();
    });
  }
});
