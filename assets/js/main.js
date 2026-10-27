// AfriWell Bridge - Interactive Features Script

document.addEventListener('DOMContentLoaded', () => {
  // Mobile Menu Toggle
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');
  
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  // Sticky Header Shadow
  const navbar = document.getElementById('mainNavbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('shadow-md');
    } else {
      navbar.classList.remove('shadow-md');
    }
  });

  // Flagship Programs Tab Switcher
  const tabMedical = document.getElementById('tabMedical');
  const tabEducation = document.getElementById('tabEducation');
  const contentMedical = document.getElementById('contentMedical');
  const contentEducation = document.getElementById('contentEducation');

  if (tabMedical && tabEducation && contentMedical && contentEducation) {
    tabMedical.addEventListener('click', () => {
      tabMedical.classList.add('bg-white', 'text-brand-navy', 'shadow-sm', 'border-brand-gold');
      tabMedical.classList.remove('text-gray-500', 'border-transparent');
      
      tabEducation.classList.remove('bg-white', 'text-brand-navy', 'shadow-sm', 'border-brand-gold');
      tabEducation.classList.add('text-gray-500', 'border-transparent');

      contentMedical.classList.remove('hidden');
      contentEducation.classList.add('hidden');
    });

    tabEducation.addEventListener('click', () => {
      tabEducation.classList.add('bg-white', 'text-brand-navy', 'shadow-sm', 'border-brand-gold');
      tabEducation.classList.remove('text-gray-500', 'border-transparent');
      
      tabMedical.classList.remove('bg-white', 'text-brand-navy', 'shadow-sm', 'border-brand-gold');
      tabMedical.classList.add('text-gray-500', 'border-transparent');

      contentEducation.classList.remove('hidden');
      contentMedical.classList.add('hidden');
    });
  }

  // Interactive Donation Calculator
  const donationTiers = [
    {
      amount: 25,
      title: 'School Bag & Learning Kit',
      desc: 'Provides 1 child with a durable backpack, notebook set, stationery, and learning essentials for an entire academic year.'
    },
    {
      amount: 50,
      title: 'Rural Health Screening & Medicines',
      desc: 'Funds comprehensive blood pressure, blood glucose, and malaria testing, plus essential prescription meds for 2 families.'
    },
    {
      amount: 150,
      title: 'Full Student Annual Sponsorship',
      desc: 'Covers a child’s school fees, new school uniform, pair of shoes, all course textbooks, and personalized volunteer mentorship.'
    },
    {
      amount: 500,
      title: 'Mobile Outreach Clinic Station',
      desc: 'Supplies medical testing equipment, diagnostic test kits, and emergency surgical referral transport for rural remote villages.'
    }
  ];

  const tierButtons = document.querySelectorAll('.tier-btn');
  const customAmountInput = document.getElementById('customAmountInput');
  const impactTitle = document.getElementById('impactTitle');
  const impactDesc = document.getElementById('impactDesc');
  const selectedAmountDisplay = document.getElementById('selectedAmountDisplay');
  let currentAmount = 50;

  function updateImpact(amount) {
    currentAmount = amount;
    if (selectedAmountDisplay) {
      selectedAmountDisplay.textContent = `$${amount}`;
    }

    const matchedTier = donationTiers.find(t => t.amount === amount);
    if (matchedTier) {
      if (impactTitle) impactTitle.textContent = matchedTier.title;
      if (impactDesc) impactDesc.textContent = matchedTier.desc;
    } else {
      if (impactTitle) impactTitle.textContent = 'Custom Grassroots Impact';
      if (impactDesc) impactDesc.textContent = `Your compassionate contribution of $${amount} directly advances Christ’s healing and educational ministry across hard-to-reach African communities.`;
    }
  }

  tierButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      tierButtons.forEach(b => {
        b.classList.remove('bg-brand-navy', 'text-white', 'border-brand-navy');
        b.classList.add('bg-white', 'text-brand-navy', 'border-gray-200');
      });

      btn.classList.add('bg-brand-navy', 'text-white', 'border-brand-navy');
      btn.classList.remove('bg-white', 'text-brand-navy', 'border-gray-200');

      if (customAmountInput) customAmountInput.value = '';

      const amt = parseInt(btn.dataset.amount, 10);
      updateImpact(amt);
    });
  });

  if (customAmountInput) {
    customAmountInput.addEventListener('input', (e) => {
      const val = parseInt(e.target.value, 10);
      if (val && val > 0) {
        tierButtons.forEach(b => {
          b.classList.remove('bg-brand-navy', 'text-white', 'border-brand-navy');
          b.classList.add('bg-white', 'text-brand-navy', 'border-gray-200');
        });
        updateImpact(val);
      }
    });
  }

  // Modals (Volunteer & Donate)
  const volunteerModal = document.getElementById('volunteerModal');
  const donateModal = document.getElementById('donateModal');
  const openVolunteerBtns = document.querySelectorAll('.open-volunteer-btn');
  const openDonateBtns = document.querySelectorAll('.open-donate-btn');
  const closeVolunteerBtn = document.getElementById('closeVolunteerBtn');
  const closeDonateBtn = document.getElementById('closeDonateBtn');

  function openModal(modal) {
    if (!modal) return;
    modal.classList.remove('hidden');
    modal.classList.add('flex');
    document.body.style.overflow = 'hidden';
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex');
    document.body.style.overflow = 'auto';
  }

  openVolunteerBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(volunteerModal);
    });
  });

  openDonateBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openModal(donateModal);
    });
  });

  if (closeVolunteerBtn) {
    closeVolunteerBtn.addEventListener('click', () => closeModal(volunteerModal));
  }
  if (closeDonateBtn) {
    closeDonateBtn.addEventListener('click', () => closeModal(donateModal));
  }

  [volunteerModal, donateModal].forEach(modal => {
    if (modal) {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          closeModal(modal);
        }
      });
    }
  });

  // Handle Form Submissions with Toast
  const volunteerForm = document.getElementById('volunteerForm');
  const contactForm = document.getElementById('contactForm');
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

  if (volunteerForm) {
    volunteerForm.addEventListener('submit', (e) => {
      e.preventDefault();
      closeModal(volunteerModal);
      showToast('Thank you! Your volunteer application has been received. Our team will contact you shortly.');
      volunteerForm.reset();
    });
  }

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      showToast('Thank you! Your message has been sent to the AfriWell Bridge team.');
      contactForm.reset();
    });
  }

  // FAQ Accordion
  const faqQuestions = document.querySelectorAll('.faq-question');
  faqQuestions.forEach(btn => {
    btn.addEventListener('click', () => {
      const answer = btn.nextElementSibling;
      const icon = btn.querySelector('.faq-icon');
      
      const isOpen = !answer.classList.contains('hidden');
      
      // Close all
      document.querySelectorAll('.faq-answer').forEach(a => a.classList.add('hidden'));
      document.querySelectorAll('.faq-icon').forEach(i => i.style.transform = 'rotate(0deg)');

      if (!isOpen) {
        answer.classList.remove('hidden');
        if (icon) icon.style.transform = 'rotate(180deg)';
      }
    });
  });
});
