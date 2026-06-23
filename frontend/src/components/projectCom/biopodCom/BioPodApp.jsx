import { useEffect, useMemo, useState } from "react";
import biopodCss from "./biopod.css?raw";
import homeHtml from "./pages/index.html?raw";
import aboutHtml from "./pages/about.html?raw";
import teamHtml from "./pages/team.html?raw";

// Base path the Bio Pod micro-site is mounted under inside the main site.
const BASE = "/projects/biopod";

const pages = {
  [BASE]: { html: homeHtml, title: "Bio Pod - Clean Fuel. Cleaner Future." },
  [`${BASE}/`]: { html: homeHtml, title: "Bio Pod - Clean Fuel. Cleaner Future." },
  [`${BASE}/about`]: { html: aboutHtml, title: "About - Bio Pod" },
  [`${BASE}/team`]: { html: teamHtml, title: "Team - Bio Pod" },
};

function extractBody(html) {
  const match = html.match(/<body[^>]*>([\s\S]*?)<\/body>/i);
  return (match?.[1] || html)
    .replace(/<script\b[^>]*>[\s\S]*?<\/script>/gi, "")
    .replaceAll("../assets/", "/biopod-assets/")
    .replaceAll("index.html", BASE)
    .replaceAll("about.html", `${BASE}/about`)
    .replaceAll("team.html", `${BASE}/team`);
}

// CSS url(../assets/...) references aren't touched by extractBody, so rewrite
// them here too — otherwise backgrounds 404 against the mounted base path.
function rewriteAssetUrls(css) {
  return css.replaceAll("../assets/", "/biopod-assets/");
}

function extractStyles(html) {
  return [...html.matchAll(/<style[^>]*>([\s\S]*?)<\/style>/gi)].map((m) => m[1]).join("\n");
}

const pageStyles = rewriteAssetUrls([homeHtml, aboutHtml, teamHtml].map(extractStyles).join("\n"));

function normalizePath(pathname) {
  if (pathname === `${BASE}/index.html`) return BASE;
  if (pathname === `${BASE}/`) return BASE;
  if (pathname === `${BASE}/about.html`) return `${BASE}/about`;
  if (pathname === `${BASE}/team.html`) return `${BASE}/team`;
  return pages[pathname] ? pathname : BASE;
}

function useRoute() {
  const [path, setPath] = useState(() => normalizePath(window.location.pathname));

  useEffect(() => {
    const onPop = () => setPath(normalizePath(window.location.pathname));
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  useEffect(() => {
    const onClick = (event) => {
      const anchor = event.target.closest("a");
      if (!anchor) return;

      const href = anchor.getAttribute("href") || "";
      if (!href || href.startsWith("mailto:") || href.startsWith("tel:") || href.startsWith("http")) return;

      const url = new URL(href, window.location.origin + window.location.pathname);
      const nextPath = normalizePath(url.pathname);
      const isPageLink = [BASE, `${BASE}/about`, `${BASE}/team`].includes(nextPath);
      if (!isPageLink && !href.startsWith("#")) return;

      event.preventDefault();
      const finalPath = href.startsWith("#") ? window.location.pathname : nextPath;
      window.history.pushState({}, "", finalPath + url.hash);
      setPath(normalizePath(finalPath));

      window.setTimeout(() => {
        if (url.hash) {
          document.querySelector(url.hash)?.scrollIntoView({ behavior: "smooth" });
        } else {
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      }, 0);
    };

    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  return path;
}

function useFonts() {
  // Bio Pod's design relies on Space Grotesk + Inter, which the original site
  // loaded via <head> links. extractBody drops the <head>, so inject them here
  // and tidy up on unmount so they don't linger on the rest of the site.
  useEffect(() => {
    const links = [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;600;700&family=Inter:wght@400;500;600&display=swap",
      },
    ].map((attrs) => {
      const el = document.createElement("link");
      Object.entries(attrs).forEach(([key, value]) => {
        if (key === "crossOrigin") el.crossOrigin = value;
        else el.setAttribute(key, value);
      });
      document.head.appendChild(el);
      return el;
    });
    return () => links.forEach((el) => el.remove());
  }, []);
}

function usePageInteractions(path) {
  useEffect(() => {
    document.title = (pages[path] || pages[BASE]).title;
  }, [path]);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const cleanups = [];

    const nav = document.querySelector(".nav");
    const onScroll = () => nav?.classList.toggle("scrolled", window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    cleanups.push(() => window.removeEventListener("scroll", onScroll));

    const burger = document.querySelector(".burger");
    const menu = document.querySelector(".mobile-menu");
    if (burger && menu) {
      const toggleMenu = () => {
        const open = menu.classList.toggle("open");
        burger.classList.toggle("open", open);
        document.body.style.overflow = open ? "hidden" : "";
      };
      const closeMenu = () => {
        menu.classList.remove("open");
        burger.classList.remove("open");
        document.body.style.overflow = "";
      };
      burger.addEventListener("click", toggleMenu);
      menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", closeMenu));
      cleanups.push(() => {
        burger.removeEventListener("click", toggleMenu);
        menu.querySelectorAll("a").forEach((a) => a.removeEventListener("click", closeMenu));
        document.body.style.overflow = "";
      });
    }

    const revealEls = document.querySelectorAll("[data-reveal],[data-stagger]");
    if (reduce) {
      revealEls.forEach((el) => el.classList.add("in"));
    } else {
      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            const el = entry.target;
            const delay = Number.parseInt(el.getAttribute("data-delay") || "0", 10);
            window.setTimeout(() => el.classList.add("in"), delay);
            if (el.hasAttribute("data-stagger")) {
              const step = Number.parseInt(el.getAttribute("data-stagger") || "90", 10) || 90;
              Array.from(el.children).forEach((child, index) => {
                child.style.transitionDelay = `${index * step}ms`;
              });
            }
            io.unobserve(el);
          });
        },
        { threshold: 0.16, rootMargin: "0px 0px -8% 0px" },
      );
      revealEls.forEach((el) => io.observe(el));
      cleanups.push(() => io.disconnect());
    }

    const animateCount = (el) => {
      const raw = el.getAttribute("data-count");
      const end = Number.parseFloat(raw);
      const decimals = raw?.includes(".") ? raw.split(".")[1].length : 0;
      const suffix = el.getAttribute("data-suffix") || "";
      const prefix = el.getAttribute("data-prefix") || "";
      const duration = 1600;
      let start = null;
      if (reduce) {
        el.textContent = `${prefix}${end.toFixed(decimals)}${suffix}`;
        return;
      }
      const tick = (time) => {
        start ??= time;
        const progress = Math.min((time - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = `${prefix}${(end * eased).toFixed(decimals)}${suffix}`;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    };

    const counters = document.querySelectorAll("[data-count]");
    if (counters.length) {
      const counterIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              animateCount(entry.target);
              counterIo.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.6 },
      );
      counters.forEach((el) => counterIo.observe(el));
      cleanups.push(() => counterIo.disconnect());
    }

    const fills = document.querySelectorAll("[data-fill]");
    if (fills.length) {
      const fillIo = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add("filled");
              fillIo.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.4 },
      );
      fills.forEach((el) => fillIo.observe(el));
      cleanups.push(() => fillIo.disconnect());
    }

    if (!isTouch && !reduce) {
      const magnets = document.querySelectorAll("[data-magnetic]");
      magnets.forEach((button) => {
        const onMove = (event) => {
          const rect = button.getBoundingClientRect();
          const x = (event.clientX - rect.left - rect.width / 2) * 0.28;
          const y = (event.clientY - rect.top - rect.height / 2) * 0.28;
          button.style.transform = `translate(${x}px,${y}px)`;
        };
        const onLeave = () => {
          button.style.transform = "";
        };
        button.addEventListener("mousemove", onMove);
        button.addEventListener("mouseleave", onLeave);
        cleanups.push(() => {
          button.removeEventListener("mousemove", onMove);
          button.removeEventListener("mouseleave", onLeave);
        });
      });

      const paraEls = document.querySelectorAll("[data-parallax]");
      const onPointer = (event) => {
        const nx = event.clientX / window.innerWidth - 0.5;
        const ny = event.clientY / window.innerHeight - 0.5;
        paraEls.forEach((el) => {
          const depth = Number.parseFloat(el.getAttribute("data-parallax")) || 20;
          el.style.transform = `translate(${nx * depth}px,${ny * depth}px)`;
        });
      };
      window.addEventListener("mousemove", onPointer);
      cleanups.push(() => window.removeEventListener("mousemove", onPointer));
    }

    if (!reduce) {
      const scrollEls = document.querySelectorAll("[data-scroll-y]");
      let ticking = false;
      const paint = () => {
        const vh = window.innerHeight;
        scrollEls.forEach((el) => {
          const rect = el.getBoundingClientRect();
          const amount = Number.parseFloat(el.getAttribute("data-scroll-y")) || 0.1;
          const center = rect.top + rect.height / 2 - vh / 2;
          el.style.transform = `translateY(${center * -amount}px)`;
        });
        ticking = false;
      };
      const onScrollY = () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(paint);
        }
      };
      window.addEventListener("scroll", onScrollY, { passive: true });
      paint();
      cleanups.push(() => window.removeEventListener("scroll", onScrollY));
    }

    return () => cleanups.forEach((cleanup) => cleanup());
  }, [path]);
}

function useDiagram(path) {
  useEffect(() => {
    if (path !== BASE) return undefined;

    const data = [
      ["01", "Feed Inlet", "Food scraps enter the sealed top inlet"],
      ["02", "Digestion Chamber", "Organic waste breakdown"],
      ["03", "Gas Collection", "Biogas generation and routing"],
      ["04", "Slurry Collection", "Nutrient-rich liquid output"],
      ["05", "Biogas Outlet", "Clean gas flow path"],
      ["06", "Gas Storage & Monitoring", "Level indicator & pressure management"],
    ];
    const stages = Array.from(document.querySelectorAll("#stageList .stage"));
    const hots = Array.from(document.querySelectorAll("#diagramStage .hot"));
    const cap = document.getElementById("diagCap");
    const diagram = document.getElementById("diagramStage");
    if (!stages.length || !hots.length || !cap || !diagram) return undefined;

    let current = 0;
    let timer = null;
    let userActed = false;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const setActive = (index) => {
      current = index;
      stages.forEach((stage, key) => stage.classList.toggle("active", key === index));
      hots.forEach((hot, key) => hot.classList.toggle("on", key === index));
      cap.querySelector(".dn").textContent = data[index][0];
      cap.querySelector("b").textContent = data[index][1];
      cap.querySelector("span").textContent = data[index][2];
      cap.classList.add("show");
    };

    const bind = (el) => {
      const index = Number.parseInt(el.getAttribute("data-i"), 10);
      const activate = () => {
        userActed = true;
        window.clearInterval(timer);
        setActive(index);
      };
      el.addEventListener("mouseenter", activate);
      el.addEventListener("click", activate);
      return () => {
        el.removeEventListener("mouseenter", activate);
        el.removeEventListener("click", activate);
      };
    };

    const unbind = [...stages, ...hots].map(bind);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            cap.classList.add("show");
            if (!reduce && !userActed) {
              timer = window.setInterval(() => {
                if (userActed) {
                  window.clearInterval(timer);
                  return;
                }
                setActive((current + 1) % data.length);
              }, 2600);
            }
          } else {
            window.clearInterval(timer);
          }
        });
      },
      { threshold: 0.3 },
    );
    observer.observe(diagram);

    return () => {
      window.clearInterval(timer);
      observer.disconnect();
      unbind.forEach((fn) => fn());
    };
  }, [path]);
}

export default function BioPodApp() {
  const path = useRoute();
  const page = pages[path] || pages[BASE];
  const body = useMemo(() => extractBody(page.html), [page.html]);

  useFonts();
  usePageInteractions(path);
  useDiagram(path);

  return (
    <>
      {/* Styles are kept inline so they unmount with the page and never leak
          into the rest of the site (Bio Pod ships global body/* resets). */}
      <style>{biopodCss + "\n" + pageStyles}</style>
      <div dangerouslySetInnerHTML={{ __html: body }} />
    </>
  );
}
