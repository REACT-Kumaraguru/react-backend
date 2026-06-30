import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const navLinks = [
  ['Home', '/'],
  ['Features', '/#features'],
  ['How It Works', '/how-it-works'],
  ['Benefits', '/benefits'],
  ['Applications', '/applications'],
];

export function Logo({ small = false }) {
  return (
    <span className={`mark ${small ? 'size-[30px]' : ''}`}>
      <svg viewBox="0 0 36 36" fill="none" aria-hidden="true">
        <rect width="36" height="36" rx="10" fill="url(#logoGradient)" />
        <circle cx="11" cy="12" r="2.4" fill="#fff" />
        <circle cx="25" cy="11" r="2.4" fill="#fff" />
        <circle cx="18" cy="25" r="2.4" fill="#fff" />
        <path d="M11 12 25 11M11 12 18 25M25 11 18 25" stroke="#fff" strokeWidth="1.4" opacity=".75" />
        <defs>
          <linearGradient id="logoGradient" x1="0" y1="0" x2="36" y2="36">
            <stop stopColor="#0A6CFF" />
            <stop offset="1" stopColor="#22D3EE" />
          </linearGradient>
        </defs>
      </svg>
    </span>
  );
}

export function ArrowIcon() {
  return (
    <svg className="arw" width="17" height="17" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.55V9h3.57v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.74v20.52C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.74V1.74C24 .78 23.2 0 22.22 0Z" />
    </svg>
  );
}

export function FeatureIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M3 12h4l2 6 4-14 2 8h6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function useCanvasOrb(ref) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = canvas.getContext('2d');
    let width = 0;
    let height = 0;
    let raf = 0;
    let active = true;
    let lastFrame = 0;
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const nodes = Array.from({ length: matchMedia('(pointer: coarse)').matches ? 16 : 30 }, () => ({
      a: Math.random() * Math.PI * 2,
      rad: 0,
      sp: (Math.random() * 0.4 + 0.1) * (Math.random() < 0.5 ? -1 : 1) * 0.003,
      z: Math.random(),
      r: Math.random() * 1.8 + 1.2,
    }));
    let pulses = [];

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      nodes.forEach((node) => {
        if (!node.rad) node.rad = (0.18 + Math.random() * 0.32) * Math.min(width, height);
      });
    };

    const loop = (now = 0) => {
      if (!active) {
        raf = requestAnimationFrame(loop);
        return;
      }
      if (now - lastFrame < 33) {
        raf = requestAnimationFrame(loop);
        return;
      }
      lastFrame = now;
      ctx.clearRect(0, 0, width, height);
      const points = nodes.map((node) => {
        node.a += node.sp;
        const wobble = Math.sin(node.a * 2 + node.z * 6) * 8;
        return {
          x: width / 2 + Math.cos(node.a) * (node.rad + wobble),
          y: height / 2 + Math.sin(node.a) * (node.rad * 0.82 + wobble),
          r: node.r,
        };
      });

      points.forEach((a, i) => {
        points.slice(i + 1).forEach((b) => {
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 120) {
            ctx.strokeStyle = `rgba(10,108,255,${0.16 * (1 - distance / 120)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });

      points.forEach((point) => {
        const glow = ctx.createRadialGradient(point.x, point.y, 0, point.x, point.y, point.r * 3);
        glow.addColorStop(0, 'rgba(34,211,238,.9)');
        glow.addColorStop(1, 'rgba(10,108,255,0)');
        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.r * 3, 0, Math.PI * 2);
        ctx.fill();
        ctx.fillStyle = 'rgba(255,255,255,.95)';
        ctx.beginPath();
        ctx.arc(point.x, point.y, point.r * 0.7, 0, Math.PI * 2);
        ctx.fill();
      });

      if (Math.random() < 0.04 && pulses.length < 6 && points.length > 1) {
        const a = Math.floor(Math.random() * points.length);
        const b = Math.floor(Math.random() * points.length);
        if (a !== b) pulses.push({ a, b, t: 0 });
      }

      pulses.forEach((pulse) => {
        pulse.t += 0.02;
        const a = points[pulse.a];
        const b = points[pulse.b];
        const x = a.x + (b.x - a.x) * pulse.t;
        const y = a.y + (b.y - a.y) * pulse.t;
        ctx.fillStyle = 'rgba(34,211,238,.95)';
        ctx.beginPath();
        ctx.arc(x, y, 2.4, 0, Math.PI * 2);
        ctx.fill();
      });
      pulses = pulses.filter((pulse) => pulse.t < 1);
      raf = requestAnimationFrame(loop);
    };

    size();
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
    }, { rootMargin: '160px' });
    observer.observe(canvas);
    addEventListener('resize', size);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      removeEventListener('resize', size);
    };
  }, [ref]);
}

export function useSpotNet(ref) {
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas || matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const ctx = canvas.getContext('2d');
    const dpr = Math.min(devicePixelRatio || 1, 2);
    const nodes = Array.from({ length: 40 }, () => ({
      x: Math.random(),
      y: Math.random(),
      vx: (Math.random() - 0.5) * 0.0006,
      vy: (Math.random() - 0.5) * 0.0006,
    }));
    let width = 0;
    let height = 0;
    let raf = 0;
    let active = false;
    let lastFrame = 0;

    const size = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const loop = (now = 0) => {
      if (!active) {
        raf = requestAnimationFrame(loop);
        return;
      }
      if (now - lastFrame < 40) {
        raf = requestAnimationFrame(loop);
        return;
      }
      lastFrame = now;
      ctx.clearRect(0, 0, width, height);
      const points = nodes.map((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < 0 || node.x > 1) node.vx *= -1;
        if (node.y < 0 || node.y > 1) node.vy *= -1;
        return { x: node.x * width, y: node.y * height };
      });
      points.forEach((a, i) => {
        points.slice(i + 1).forEach((b) => {
          const distance = Math.hypot(a.x - b.x, a.y - b.y);
          if (distance < 130) {
            ctx.strokeStyle = `rgba(34,211,238,${0.14 * (1 - distance / 130)})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        });
      });
      points.forEach((point) => {
        ctx.fillStyle = 'rgba(120,200,255,.6)';
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.4, 0, Math.PI * 2);
        ctx.fill();
      });
      raf = requestAnimationFrame(loop);
    };

    size();
    const observer = new IntersectionObserver(([entry]) => {
      active = entry.isIntersecting;
    }, { rootMargin: '160px' });
    observer.observe(canvas);
    addEventListener('resize', size);
    loop();
    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      removeEventListener('resize', size);
    };
  }, [ref]);
}

// Re-runs whenever `routeKey` changes so newly-mounted page DOM gets wired up.
export function useInteractions(routeKey) {
  useEffect(() => {
    const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
    const fine = matchMedia('(pointer: fine)').matches;
    const nav = document.querySelector('.nav');
    const cleanupFns = [];
    const observers = [];

    let scrollTicking = false;
    const onScroll = () => {
      if (scrollTicking) return;
      scrollTicking = true;
      requestAnimationFrame(() => {
        nav?.classList.toggle('scrolled', scrollY > 24);
        scrollTicking = false;
      });
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
    cleanupFns.push(() => removeEventListener('scroll', onScroll));

    // reveal on scroll
    const revealEls = document.querySelectorAll('[data-reveal],[data-stagger]');
    if (reduce) {
      revealEls.forEach((el) => el.classList.add('in'));
    } else {
      const reveal = (el) => {
        if (el.classList.contains('in')) return;
        const delay = Number.parseInt(el.getAttribute('data-delay') || '0', 10);
        if (el.hasAttribute('data-stagger')) {
          const step = Number.parseInt(el.getAttribute('data-stagger') || '80', 10) || 80;
          [...el.children].forEach((child, index) => {
            child.style.transitionDelay = `${index * step}ms`;
          });
        }
        setTimeout(() => el.classList.add('in'), delay);
      };
      const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.16, rootMargin: '0px 0px -8% 0px' });
      revealEls.forEach((el) => observer.observe(el));
      observers.push(observer);
      // safety sweep for elements already in view after a route change
      const sweep = () => revealEls.forEach((el) => {
        if (el.classList.contains('in')) return;
        const rect = el.getBoundingClientRect();
        if (rect.top < innerHeight * 0.92 && rect.bottom > 0) {
          observer.unobserve(el);
          reveal(el);
        }
      });
      requestAnimationFrame(sweep);
      setTimeout(sweep, 250);
    }

    // counters
    const counterObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        const raw = el.getAttribute('data-count');
        const end = Number.parseFloat(raw);
        const suffix = el.getAttribute('data-suffix') || '';
        const prefix = el.getAttribute('data-prefix') || '';
        const decimals = raw.includes('.') ? raw.split('.')[1].length : 0;
        let start = null;
        const tick = (now) => {
          if (!start) start = now;
          const progress = Math.min((now - start) / 1700, 1);
          const eased = 1 - (1 - progress) ** 3;
          el.textContent = `${prefix}${(end * eased).toFixed(decimals)}${suffix}`;
          if (progress < 1 && !reduce) requestAnimationFrame(tick);
        };
        if (reduce) el.textContent = `${prefix}${end.toFixed(decimals)}${suffix}`;
        else requestAnimationFrame(tick);
        counterObserver.unobserve(el);
      });
    }, { threshold: 0.6 });
    document.querySelectorAll('[data-count]').forEach((el) => counterObserver.observe(el));
    observers.push(counterObserver);

    // value fills (bars / gauges)
    const fillObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('filled');
          fillObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.35 });
    document.querySelectorAll('[data-fill]').forEach((el) => fillObserver.observe(el));
    observers.push(fillObserver);

    // SVG path draw on scroll
    const paths = document.querySelectorAll('[data-draw]');
    paths.forEach((p) => {
      try {
        const len = p.getTotalLength();
        p.style.strokeDasharray = len;
        p.style.strokeDashoffset = reduce ? 0 : len;
        p.style.transition = 'stroke-dashoffset 1.6s var(--ease)';
      } catch { /* non-path element */ }
    });
    if (paths.length && !reduce) {
      const drawObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.style.strokeDashoffset = 0;
            drawObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      paths.forEach((p) => drawObserver.observe(p));
      observers.push(drawObserver);
    }

    // before/after comparison slider
    document.querySelectorAll('[data-compare]').forEach((container) => {
      const top = container.querySelector('.cmp-top');
      const handle = container.querySelector('.cmp-handle');
      let dragging = false;
      const set = (percent) => {
        const value = Math.max(0, Math.min(100, percent));
        top.style.clipPath = `inset(0 ${100 - value}% 0 0)`;
        handle.style.left = `${value}%`;
      };
      const fromEvent = (event) => {
        const rect = container.getBoundingClientRect();
        set(((event.clientX - rect.left) / rect.width) * 100);
      };
      const down = (event) => { dragging = true; fromEvent(event); };
      const move = (event) => { if (dragging) fromEvent(event); };
      const up = () => { dragging = false; };
      container.addEventListener('pointerdown', down);
      addEventListener('pointermove', move);
      addEventListener('pointerup', up);
      cleanupFns.push(() => {
        container.removeEventListener('pointerdown', down);
        removeEventListener('pointermove', move);
        removeEventListener('pointerup', up);
      });
      set(50);
    });

    // draggable cards
    document.querySelectorAll('[data-drag]').forEach((el) => {
      let startX = 0;
      let startY = 0;
      let offsetX = 0;
      let offsetY = 0;
      let dragging = false;
      const down = (event) => {
        if (event.target.closest('a,button')) return;
        dragging = true;
        el.setPointerCapture(event.pointerId);
        el.style.transition = 'none';
        el.style.zIndex = 50;
        el.classList.add('dragging');
        startX = event.clientX;
        startY = event.clientY;
      };
      const move = (event) => {
        if (!dragging) return;
        el.style.transform = `translate(${offsetX + event.clientX - startX}px,${offsetY + event.clientY - startY}px) scale(1.03)`;
      };
      const up = () => {
        if (!dragging) return;
        dragging = false;
        el.classList.remove('dragging');
        const match = /translate\(([-\d.]+)px,\s*([-\d.]+)px\)/.exec(el.style.transform);
        if (match) {
          offsetX = Number.parseFloat(match[1]);
          offsetY = Number.parseFloat(match[2]);
        }
        el.style.transition = 'transform .5s var(--ease)';
        el.style.transform = `translate(${offsetX}px,${offsetY}px)`;
      };
      el.addEventListener('pointerdown', down);
      el.addEventListener('pointermove', move);
      el.addEventListener('pointerup', up);
      el.addEventListener('pointercancel', up);
      cleanupFns.push(() => {
        el.removeEventListener('pointerdown', down);
        el.removeEventListener('pointermove', move);
        el.removeEventListener('pointerup', up);
        el.removeEventListener('pointercancel', up);
      });
    });

    if (fine && !reduce) {
      // 3D tilt
      document.querySelectorAll('[data-tilt]').forEach((card) => {
        const inner = card.querySelector('.tilt-inner') || card;
        const max = Number.parseFloat(card.getAttribute('data-tilt')) || 8;
        const move = (event) => {
          const rect = card.getBoundingClientRect();
          const px = (event.clientX - rect.left) / rect.width - 0.5;
          const py = (event.clientY - rect.top) / rect.height - 0.5;
          inner.style.transform = `perspective(800px) rotateX(${-py * max}deg) rotateY(${px * max}deg)`;
        };
        const leave = () => { inner.style.transform = 'perspective(800px) rotateX(0) rotateY(0)'; };
        card.addEventListener('mousemove', move);
        card.addEventListener('mouseleave', leave);
        cleanupFns.push(() => {
          card.removeEventListener('mousemove', move);
          card.removeEventListener('mouseleave', leave);
        });
      });

      // magnetic buttons
      document.querySelectorAll('[data-magnetic]').forEach((b) => {
        const move = (event) => {
          const rect = b.getBoundingClientRect();
          b.style.transform = `translate(${(event.clientX - rect.left - rect.width / 2) * 0.3}px,${(event.clientY - rect.top - rect.height / 2) * 0.4}px)`;
        };
        const leave = () => { b.style.transform = ''; };
        b.addEventListener('mousemove', move);
        b.addEventListener('mouseleave', leave);
        cleanupFns.push(() => {
          b.removeEventListener('mousemove', move);
          b.removeEventListener('mouseleave', leave);
        });
      });

      // pointer parallax
      const parallaxEls = document.querySelectorAll('[data-parallax]');
      if (parallaxEls.length) {
        const onMove = (event) => {
          const nx = event.clientX / innerWidth - 0.5;
          const ny = event.clientY / innerHeight - 0.5;
          parallaxEls.forEach((el) => {
            const d = Number.parseFloat(el.getAttribute('data-parallax')) || 20;
            el.style.transform = `translate(${nx * d}px,${ny * d}px)`;
          });
        };
        addEventListener('mousemove', onMove);
        cleanupFns.push(() => removeEventListener('mousemove', onMove));
      }
    }

    // scroll parallax (translateY)
    if (!reduce) {
      const scrollYEls = document.querySelectorAll('[data-scroll-y]');
      if (scrollYEls.length) {
        let ticking = false;
        const paint = () => {
          const vh = innerHeight;
          scrollYEls.forEach((el) => {
            const rect = el.getBoundingClientRect();
            const amount = Number.parseFloat(el.getAttribute('data-scroll-y')) || 0.1;
            const center = rect.top + rect.height / 2 - vh / 2;
            el.style.transform = `translateY(${center * -amount}px)`;
          });
          ticking = false;
        };
        const onScrollY = () => { if (!ticking) { ticking = true; requestAnimationFrame(paint); } };
        addEventListener('scroll', onScrollY, { passive: true });
        paint();
        cleanupFns.push(() => removeEventListener('scroll', onScrollY));
      }
    }

    return () => {
      observers.forEach((o) => o.disconnect());
      cleanupFns.forEach((fn) => fn());
    };
  }, [routeKey]);
}

// Smooth-scroll to hash target on navigation, else scroll to top.
export function ScrollManager() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) {
      const scrollToHash = (attempt = 0) => {
        const el = document.getElementById(hash.slice(1));
        if (el) {
          el.scrollIntoView({ behavior: 'smooth' });
        } else if (attempt < 5) {
          setTimeout(() => scrollToHash(attempt + 1), 60);
        }
      };
      scrollToHash();
      return;
    }
    window.scrollTo(0, 0);
  }, [pathname, hash]);
  return null;
}

export function Nav() {
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const isActive = (href) => {
    const path = href.split('#')[0] || '/';
    if (path === '/') return pathname === '/' && !href.includes('#');
    return pathname === path;
  };
  return (
    <>
      <nav className="nav">
        <div className="wrap">
          <Link to="/" className="brand" onClick={() => setOpen(false)}>
            <Logo />
            <b>Flow<span>Sync</span></b>
          </Link>
          <div className="nav-links">
            {navLinks.map(([label, href]) => (
              <Link className={`nav-link ${isActive(href) ? 'active' : ''}`} to={href} key={label}>{label}</Link>
            ))}
          </div>
          <div className="nav-cta">
            <Link to="/#demo" className="btn btn-primary" data-magnetic>Request a Demo <ArrowIcon /></Link>
          </div>
          <button className={`burger ${open ? 'open' : ''}`} aria-label="Menu" onClick={() => setOpen(!open)}>
            <span /><span /><span />
          </button>
        </div>
      </nav>
      <div className={`mobile-menu ${open ? 'open' : ''}`}>
        {navLinks.map(([label, href]) => <Link to={href} key={label} onClick={() => setOpen(false)}>{label}</Link>)}
        <Link to="/#demo" className="mm-cta" onClick={() => setOpen(false)}>Request a Demo -&gt;</Link>
      </div>
    </>
  );
}

export function Footer() {
  const columns = [
    ['Platform', [['What is FlowSync', '/#features'], ['How It Works', '/how-it-works'], ['Features', '/#features'], ['Technology', '/how-it-works#technology']]],
    ['Solutions', [['Hospitals', '/applications'], ['OPD', '/applications'], ['Diagnostics', '/applications'], ['Emergency', '/applications'], ['Networks', '/applications']]],
    ['Company', [['About', '/'], ['Careers', '#'], ['News', '#'], ['Contact', '/#demo']]],
    ['Legal', [['Privacy', '#'], ['Terms', '#'], ['Security', '#'], ['Compliance', '#']]],
  ];
  return (
    <footer className="footer">
      <span className="footer-glow" />
      <div className="wrap">
        <div className="footer-top">
          <div className="foot-brand-col">
            <div className="foot-brand"><Logo small />FlowSync</div>
            <p className="foot-desc">Smarter healthcare operations through connected intelligence.</p>
          </div>
          {columns.map(([title, links]) => (
            <div className="foot-col" key={title}>
              <h4>{title}</h4>
              <ul>
                {links.map(([label, href]) => (
                  <li key={label}>
                    {href === '#'
                      ? <a href="#">{label}</a>
                      : <Link to={href}>{label}</Link>}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className="footer-bottom">
          <span>Copyright 2026 FlowSync. All rights reserved.</span>
          <span>react@kct.ac.in</span>
        </div>
      </div>
    </footer>
  );
}
