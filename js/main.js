/**
 * Adrija Posam - Portfolio Website JavaScript
 * Handles theme toggling, active nav states, animations, skill filters, and contact interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide Icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  initTheme();
  initMobileMenu();
  initActiveNavigation();
  initSkillFilters();
  initStatCounters();
  initContactForm();
  updateCopyrightYear();
});

/* =========================================================
   1. Theme Switcher (Dark / Light Mode)
   ========================================================= */
function initTheme() {
  const themeToggleBtn = document.getElementById('theme-toggle');
  const lightIcon = document.getElementById('theme-icon-light');
  const darkIcon = document.getElementById('theme-icon-dark');

  // Check saved theme or system preference
  const savedTheme = localStorage.getItem('adrija_portfolio_theme');
  const systemPrefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
  
  const isDark = savedTheme === 'dark' || (!savedTheme && systemPrefersDark);

  if (isDark) {
    document.documentElement.classList.add('dark');
    if (lightIcon) lightIcon.classList.remove('hidden');
    if (darkIcon) darkIcon.classList.add('hidden');
  } else {
    document.documentElement.classList.remove('dark');
    if (lightIcon) lightIcon.classList.add('hidden');
    if (darkIcon) darkIcon.classList.remove('hidden');
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      const isCurrentlyDark = document.documentElement.classList.toggle('dark');
      localStorage.setItem('adrija_portfolio_theme', isCurrentlyDark ? 'dark' : 'light');

      if (lightIcon && darkIcon) {
        if (isCurrentlyDark) {
          lightIcon.classList.remove('hidden');
          darkIcon.classList.add('hidden');
        } else {
          lightIcon.classList.add('hidden');
          darkIcon.classList.remove('hidden');
        }
      }
    });
  }
}

/* =========================================================
   2. Mobile Drawer Navigation
   ========================================================= */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  const menuIcon = document.getElementById('menu-icon');
  const closeIcon = document.getElementById('close-icon');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');

  if (!menuBtn || !mobileMenu) return;

  function toggleMenu(show) {
    const isHidden = mobileMenu.classList.contains('hidden');
    const shouldShow = typeof show === 'boolean' ? show : isHidden;

    if (shouldShow) {
      mobileMenu.classList.remove('hidden');
      if (menuIcon) menuIcon.classList.add('hidden');
      if (closeIcon) closeIcon.classList.remove('hidden');
    } else {
      mobileMenu.classList.add('hidden');
      if (menuIcon) menuIcon.classList.remove('hidden');
      if (closeIcon) closeIcon.classList.add('hidden');
    }
  }

  menuBtn.addEventListener('click', () => toggleMenu());

  mobileLinks.forEach(link => {
    link.addEventListener('click', () => toggleMenu(false));
  });
}

/* =========================================================
   3. Active Navigation on Scroll
   ========================================================= */
function initActiveNavigation() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  if (!sections.length || !navLinks.length) return;

  const observerOptions = {
    root: null,
    rootMargin: '-20% 0px -70% 0px',
    threshold: 0
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const currentId = entry.target.getAttribute('id');
        navLinks.forEach(link => {
          if (link.getAttribute('href') === `#${currentId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }, observerOptions);

  sections.forEach(section => observer.observe(section));
}

/* =========================================================
   4. Skill Filter Tabs
   ========================================================= */
function initSkillFilters() {
  const filterButtons = document.querySelectorAll('#skill-filters .skill-tab');
  const skillCards = document.querySelectorAll('#skills-grid .skill-card');

  if (!filterButtons.length || !skillCards.length) return;

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      button.classList.add('active');

      const filter = button.getAttribute('data-filter');

      skillCards.forEach(card => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'block';
          card.style.opacity = '0';
          setTimeout(() => {
            card.style.transition = 'opacity 0.3s ease';
            card.style.opacity = '1';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });
}

/* =========================================================
   5. Animated Number Counters
   ========================================================= */
function initStatCounters() {
  const statsContainer = document.getElementById('hero');
  if (!statsContainer) return;

  let hasAnimated = false;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting && !hasAnimated) {
        hasAnimated = true;
        animateNumber('stat-cgpa', 0, 9.47, 1200, 2);
        animateNumber('stat-roles', 0, 3, 1000, 0, '+');
        animateNumber('stat-clubs', 0, 2, 1000, 0);
        animateNumber('stat-batch', 2000, 2028, 1200, 0);
      }
    });
  }, { threshold: 0.2 });

  observer.observe(statsContainer);
}

function animateNumber(id, start, end, duration, decimals = 0, suffix = '') {
  const el = document.getElementById(id);
  if (!el) return;

  const startTime = performance.now();

  function update(now) {
    const elapsed = now - startTime;
    const progress = Math.min(elapsed / duration, 1);
    
    // Ease out quart
    const ease = 1 - Math.pow(1 - progress, 4);
    const current = start + (end - start) * ease;

    el.textContent = current.toFixed(decimals) + suffix;

    if (progress < 1) {
      requestAnimationFrame(update);
    } else {
      el.textContent = end.toFixed(decimals) + suffix;
    }
  }

  requestAnimationFrame(update);
}

/* =========================================================
   6. Copy to Clipboard Utility & Toast
   ========================================================= */
function copyText(text, message = 'Copied to clipboard!') {
  if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard.writeText(text).then(() => {
      showToast(message);
    }).catch(() => {
      fallbackCopy(text, message);
    });
  } else {
    fallbackCopy(text, message);
  }
}

function fallbackCopy(text, message) {
  const textarea = document.createElement('textarea');
  textarea.value = text;
  textarea.style.position = 'fixed';
  textarea.style.left = '-9999px';
  document.body.appendChild(textarea);
  textarea.select();
  try {
    document.execCommand('copy');
    showToast(message);
  } catch (err) {
    showToast('Failed to copy');
  }
  document.body.removeChild(textarea);
}

let toastTimer;
function showToast(message) {
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toast-message');
  if (!toast || !toastMsg) return;

  toastMsg.textContent = message;
  toast.classList.remove('translate-y-20', 'opacity-0');
  toast.classList.add('translate-y-0', 'opacity-100');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => {
    toast.classList.remove('translate-y-0', 'opacity-100');
    toast.classList.add('translate-y-20', 'opacity-0');
  }, 2500);
}

// Attach copyText to global window
window.copyText = copyText;

/* =========================================================
   7. Contact Form Handler
   ========================================================= */
function initContactForm() {
  const form = document.getElementById('contact-form');
  const feedback = document.getElementById('form-feedback');
  const submitBtn = document.getElementById('submit-btn');

  if (!form) return;

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const subject = document.getElementById('subject').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
      displayFeedback('Please fill in all required fields.', 'error');
      return;
    }

    // Set loading state
    if (submitBtn) {
      submitBtn.disabled = true;
      submitBtn.innerHTML = `
        <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
          <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
          <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8H4z"></path>
        </svg>
        <span>Sending...</span>
      `;
    }

    setTimeout(() => {
      // Build mailto URI as fallback for static websites
      const mailtoUrl = `mailto:adrijaposam@gmail.com?subject=${encodeURIComponent(subject || 'Portfolio Inquiry from ' + name)}&body=${encodeURIComponent(
        `Hi Adrija,\n\nName: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;

      displayFeedback(
        `Thank you, ${name}! Your message is prepared. <a href="${mailtoUrl}" class="underline font-bold text-brand-600 dark:text-brand-400">Click here to send directly via email</a>.`,
        'success'
      );

      form.reset();

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.innerHTML = `
          <i data-lucide="send" class="w-4 h-4"></i>
          <span>Send Message</span>
        `;
        if (window.lucide) window.lucide.createIcons();
      }
    }, 600);
  });

  function displayFeedback(msg, type) {
    if (!feedback) return;
    feedback.innerHTML = msg;
    feedback.classList.remove('hidden', 'bg-emerald-100', 'text-emerald-800', 'dark:bg-emerald-950/60', 'dark:text-emerald-300', 'bg-rose-100', 'text-rose-800', 'dark:bg-rose-950/60', 'dark:text-rose-300');

    if (type === 'success') {
      feedback.classList.add('bg-emerald-100', 'text-emerald-800', 'dark:bg-emerald-950/60', 'dark:text-emerald-300');
    } else {
      feedback.classList.add('bg-rose-100', 'text-rose-800', 'dark:bg-rose-950/60', 'dark:text-rose-300');
    }
  }
}

/* =========================================================
   8. Copyright Year
   ========================================================= */
function updateCopyrightYear() {
  const yearEl = document.getElementById('current-year');
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }
}
