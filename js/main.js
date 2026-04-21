/* =============================================================
   HOURGLASS STUDIOS — shared JS
   - custom cursor
   - mobile nav toggle
   - scroll reveal (IntersectionObserver)
   - page transition fade
   - FAQ accordion
   - hero particle canvas (homepage only)
   ============================================================= */

(() => {
  'use strict';

  /* -------- page fade-in on load -------- */
  window.addEventListener('DOMContentLoaded', () => {
    requestAnimationFrame(() => document.body.classList.add('loaded'));
  });

  /* -------- custom cursor -------- */
  const supportsHover = window.matchMedia('(hover: hover)').matches;
  if (supportsHover) {
    const dot = document.createElement('div');
    const ring = document.createElement('div');
    dot.className = 'cursor-dot';
    ring.className = 'cursor-ring';
    document.body.appendChild(dot);
    document.body.appendChild(ring);

    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;

    window.addEventListener('mousemove', (e) => {
      mx = e.clientX; my = e.clientY;
      dot.style.transform = `translate(${mx}px, ${my}px) translate(-50%, -50%)`;
    });

    const tick = () => {
      rx += (mx - rx) * 0.18;
      ry += (my - ry) * 0.18;
      ring.style.transform = `translate(${rx}px, ${ry}px) translate(-50%, -50%)`;
      requestAnimationFrame(tick);
    };
    tick();

    const interactive = 'a, button, input, textarea, .class-card, .value-card, .price-card, .faq-q, .social, .store-badge';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest(interactive)) {
        dot.classList.add('active');
        ring.classList.add('active');
      }
    });
    document.addEventListener('mouseout', (e) => {
      if (e.target.closest(interactive)) {
        dot.classList.remove('active');
        ring.classList.remove('active');
      }
    });
  }

  /* -------- mobile nav -------- */
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      const expanded = hamburger.classList.contains('active');
      hamburger.setAttribute('aria-expanded', expanded);
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navLinks.classList.remove('open');
      });
    });
  }

  /* -------- scroll reveal -------- */
  const revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    revealEls.forEach(el => io.observe(el));
  } else {
    revealEls.forEach(el => el.classList.add('visible'));
  }

  /* -------- page transition fade on internal nav -------- */
  document.addEventListener('click', (e) => {
    const a = e.target.closest('a');
    if (!a) return;
    const href = a.getAttribute('href');
    if (!href) return;
    if (a.target === '_blank' || a.hasAttribute('download')) return;
    if (href.startsWith('#') || href.startsWith('mailto:') || href.startsWith('tel:')) return;
    if (/^https?:/i.test(href) && !href.includes(location.hostname)) return;
    if (href.endsWith('.html') || href === '/' || href.startsWith('/')) {
      e.preventDefault();
      document.body.classList.add('page-out');
      setTimeout(() => { window.location.href = href; }, 380);
    }
  });

  /* -------- FAQ accordion -------- */
  document.querySelectorAll('.faq-q').forEach(btn => {
    btn.addEventListener('click', () => {
      const item = btn.closest('.faq-item');
      item.classList.toggle('open');
      const expanded = item.classList.contains('open');
      btn.setAttribute('aria-expanded', expanded);
    });
  });

  /* -------- particle canvas (homepage hero) -------- */
  const canvas = document.getElementById('particles');
  if (canvas) {
    const ctx = canvas.getContext('2d');
    let w, h, particles, raf;
    const COLORS = ['rgba(197, 241, 53,', 'rgba(185, 127, 212,', 'rgba(124, 63, 168,'];

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = canvas.width = rect.width * devicePixelRatio;
      h = canvas.height = rect.height * devicePixelRatio;
      canvas.style.width = rect.width + 'px';
      canvas.style.height = rect.height + 'px';
    };

    const init = () => {
      const count = Math.min(90, Math.floor((w * h) / (14000 * devicePixelRatio * devicePixelRatio)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * w,
        y: Math.random() * h,
        vx: (Math.random() - 0.5) * 0.4 * devicePixelRatio,
        vy: (Math.random() - 0.5) * 0.4 * devicePixelRatio,
        r: (Math.random() * 2 + 1) * devicePixelRatio,
        c: COLORS[Math.floor(Math.random() * COLORS.length)],
        a: Math.random() * 0.6 + 0.2
      }));
    };

    const step = () => {
      ctx.clearRect(0, 0, w, h);

      // lines between close particles
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const p1 = particles[i], p2 = particles[j];
          const dx = p1.x - p2.x, dy = p1.y - p2.y;
          const d2 = dx*dx + dy*dy;
          const max = 120 * devicePixelRatio;
          if (d2 < max * max) {
            const alpha = (1 - Math.sqrt(d2) / max) * 0.18;
            ctx.strokeStyle = `rgba(185,127,212,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `${p.c}${p.a})`;
        ctx.fill();
      });

      raf = requestAnimationFrame(step);
    };

    const start = () => { resize(); init(); cancelAnimationFrame(raf); step(); };
    start();
    window.addEventListener('resize', () => { cancelAnimationFrame(raf); start(); });
  }
})();
