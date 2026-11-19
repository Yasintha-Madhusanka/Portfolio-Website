// ============================================================
//  Portfolio - Vanilla JavaScript
//  Handles: Navbar, Typing Effect, Scroll Animations,
//           Skill Bars, Active Nav Links, Form Validation
// ============================================================

/* ── 1. DOM Ready ─────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {

  /* ── 2. NAVBAR – Hamburger Menu Toggle ─────────────── */
  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.getElementById('nav-menu');
  const navLinks  = document.querySelectorAll('.nav-link');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('open');
  });

  // Close menu when a nav link is clicked (mobile UX)
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('open');
    });
  });

  /* ── 3. STICKY NAVBAR – add shadow on scroll ──────── */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    highlightActiveLink();
    revealOnScroll();
    animateSkillBars();
  });

  /* ── 4. TYPING EFFECT – Hero Section ─────────────── */
  const typedEl   = document.getElementById('typed-text');
  const phrases   = [
    'Web Developer',
    'UI/UX Designer',
    'Full-Stack Developer',
    'Coputer Hardware Technision',
    'HND IT Student'
  ];
  let phraseIndex = 0;
  let charIndex   = 0;
  let isDeleting  = false;

  function typeLoop() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
      // Remove one character
      typedEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
    } else {
      // Add one character
      typedEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
    }

    // Determine next delay
    let delay = isDeleting ? 60 : 110;

    if (!isDeleting && charIndex === currentPhrase.length) {
      // Pause at end before deleting
      delay = 1800;
      isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
      // Move to next phrase
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      delay = 400;
    }

    setTimeout(typeLoop, delay);
  }
  typeLoop();

  /* ── 5. ACTIVE NAV LINK – Highlight on scroll ─────── */
  function highlightActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const scrollPos = window.scrollY + 100;

    sections.forEach(section => {
      const top    = section.offsetTop;
      const height = section.offsetHeight;
      const id     = section.getAttribute('id');
      const link   = document.querySelector(`.nav-link[href="#${id}"]`);

      if (link) {
        if (scrollPos >= top && scrollPos < top + height) {
          navLinks.forEach(l => l.classList.remove('active'));
          link.classList.add('active');
        }
      }
    });
  }

  /* ── 6. SCROLL REVEAL – Animate sections into view ── */
  const revealEls = document.querySelectorAll('.reveal');

  function revealOnScroll() {
    revealEls.forEach(el => {
      const rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight - 80) {
        el.classList.add('visible');
      }
    });
  }
  // Run once on load for elements already in view
  revealOnScroll();

  /* ── 7. SKILL BARS – Animate fill on scroll ──────── */
  let skillsAnimated = false;

  function animateSkillBars() {
    const skillsSection = document.getElementById('skills');
    if (!skillsSection || skillsAnimated) return;

    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 60) {
      document.querySelectorAll('.skill-fill').forEach(bar => {
        const target = bar.getAttribute('data-width');
        bar.style.width = target + '%';
      });
      skillsAnimated = true;
    }
  }

  /* ── 8. SMOOTH SCROLL – Anchor links ─────────────── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* ── 9. CONTACT FORM – Validation & Submit ─────────── */
  const contactForm = document.getElementById('contact-form');

  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();

      const name    = document.getElementById('name').value.trim();
      const email   = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();
      const feedback = document.getElementById('form-feedback');

      // Clear previous state
      feedback.className = 'form-feedback';
      feedback.textContent = '';

      // --- Validation ---
      if (!name) {
        showFeedback(feedback, 'error', '⚠️ Please enter your name.');
        return;
      }
      if (!validateEmail(email)) {
        showFeedback(feedback, 'error', '⚠️ Please enter a valid email address.');
        return;
      }
      if (!subject) {
        showFeedback(feedback, 'error', '⚠️ Please enter a subject.');
        return;
      }
      if (message.length < 10) {
        showFeedback(feedback, 'error', '⚠️ Message must be at least 10 characters.');
        return;
      }

      // Simulate successful submission
      showFeedback(feedback, 'success', '✅ Message sent! I\'ll get back to you soon.');
      contactForm.reset();
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  function showFeedback(el, type, msg) {
    el.textContent = msg;
    el.classList.add(type);
    // Auto-clear success after 5 s
    if (type === 'success') {
      setTimeout(() => { el.textContent = ''; el.className = 'form-feedback'; }, 5000);
    }
  }

  /* ── 10. BACK-TO-TOP BUTTON ──────────────────────── */
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    backToTop.classList.toggle('visible', window.scrollY > 400);
  });
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ── 11. YEAR – Footer copyright ─────────────────── */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ── 12. PROJECT CARD TILT – subtle 3-D hover ────── */
  document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect   = card.getBoundingClientRect();
      const x      = e.clientX - rect.left;
      const y      = e.clientY - rect.top;
      const cx     = rect.width  / 2;
      const cy     = rect.height / 2;
      const rotateX = ((y - cy) / cy) * -6;
      const rotateY = ((x - cx) / cx) *  6;
      card.style.transform = `perspective(600px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-6px)`;
    });
    card.addEventListener('mouseleave', () => {
      card.style.transform = '';
    });
  });

}); // end DOMContentLoaded

const form = document.getElementById("contact-form");
const feedback = document.getElementById("form-feedback");
const submitBtn = document.getElementById("submit-btn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const data = new FormData(form);
  
  submitBtn.textContent = "⏳ Sending...";
  submitBtn.disabled = true;

  const response = await fetch(form.action, {
    method: form.method,
    body: data,
    headers: { 'Accept': 'application/json' }
  });

  if (response.ok) {
    feedback.textContent = "✅ Thanks! Your message has been sent. I'll reply soon!";
    feedback.style.color = "#22c55e";
    form.reset();
  } else {
    feedback.textContent = "❌ Oops! Something went wrong. Please try again.";
    feedback.style.color = "#ef4444";
  }
  submitBtn.textContent = "🚀 Send Message";
  submitBtn.disabled = false;
});
