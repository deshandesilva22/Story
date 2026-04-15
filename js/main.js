/* ====================================================
   HOURGLASS STUDIOS — INTERACTIONS
   ==================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // ----- Sticky nav shadow on scroll
  const nav = document.querySelector('.nav');
  const onScroll = () => {
    if (!nav) return;
    nav.classList.toggle('scrolled', window.scrollY > 30);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // ----- Mobile menu
  const burger = document.querySelector('.nav-burger');
  const mobile = document.querySelector('.nav-mobile');
  burger?.addEventListener('click', () => {
    burger.classList.toggle('open');
    mobile?.classList.toggle('open');
    document.body.style.overflow = mobile?.classList.contains('open') ? 'hidden' : '';
  });
  document.querySelectorAll('.nav-mobile a').forEach(a => {
    a.addEventListener('click', () => {
      burger?.classList.remove('open');
      mobile?.classList.remove('open');
      document.body.style.overflow = '';
    });
  });

  // ----- Reveal on scroll
  const revealEls = document.querySelectorAll('.reveal, .reveal-scale');
  const io = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => io.observe(el));

  // ----- Animated counters
  const counters = document.querySelectorAll('[data-count]');
  const counterIO = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseFloat(el.dataset.count);
      const suffix = el.dataset.suffix || '';
      const duration = 1600;
      const start = performance.now();
      const tick = (now) => {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        const val = target * eased;
        el.textContent = (target % 1 === 0 ? Math.floor(val) : val.toFixed(1)) + suffix;
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterIO.unobserve(el);
    });
  }, { threshold: 0.4 });
  counters.forEach(el => counterIO.observe(el));

  // ----- FAQ accordion
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q?.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item.open').forEach(o => o.classList.remove('open'));
      if (!isOpen) item.classList.add('open');
    });
  });

  // ----- Cursor glow (desktop only)
  if (window.matchMedia('(pointer: fine)').matches) {
    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    document.body.appendChild(glow);
    window.addEventListener('mousemove', (e) => {
      glow.style.opacity = '0.5';
      glow.style.transform = `translate(${e.clientX - 130}px, ${e.clientY - 130}px)`;
    });
    window.addEventListener('mouseleave', () => {
      glow.style.opacity = '0';
    });
  }

  // ----- Parallax blobs
  const blobs = document.querySelectorAll('.blob');
  if (blobs.length && window.matchMedia('(pointer: fine)').matches) {
    window.addEventListener('mousemove', (e) => {
      const x = (e.clientX / window.innerWidth - 0.5) * 30;
      const y = (e.clientY / window.innerHeight - 0.5) * 30;
      blobs.forEach((b, i) => {
        const factor = (i + 1) * 0.4;
        b.style.translate = `${x * factor}px ${y * factor}px`;
      });
    });
  }

  // ----- Highlight active nav link based on path
  const path = location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .nav-mobile a').forEach(a => {
    const href = a.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // ----- Marquee duplicate for seamless loop
  document.querySelectorAll('.marquee-track').forEach(track => {
    track.innerHTML += track.innerHTML;
  });

  // ----- Form submission feedback (no backend)
  document.querySelectorAll('form[data-form]').forEach(form => {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (!btn) return;
      const original = btn.innerHTML;
      btn.innerHTML = 'Sending…';
      btn.disabled = true;
      setTimeout(() => {
        btn.innerHTML = '✓ Message sent';
        form.reset();
        setTimeout(() => {
          btn.innerHTML = original;
          btn.disabled = false;
        }, 2500);
      }, 900);
    });
  });
});
