'use client';

import type { CSSProperties } from 'react';
import { useEffect, useRef, useState } from 'react';
import { Space_Grotesk, Fraunces, Space_Mono } from 'next/font/google';

const space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const fraunces = Fraunces({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const mono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
});

const NAV_ITEMS = ['Work', 'Services', 'Studio', 'Journal', 'Contact'];
const SERVICE_ITEMS = [
  'Experience Design',
  'Visual Systems',
  '3D Interactions',
  'Motion & Direction',
  'Brand Evolution',
];

export default function EloqwntInspiredPage() {
  const [showSticky, setShowSticky] = useState(false);
  const [frameExpanded, setFrameExpanded] = useState(true);
  const lastScrollRef = useRef(0);
  const heroRef = useRef<HTMLElement | null>(null);
  const heroActiveRef = useRef(true);
  const scrollRafRef = useRef<number | null>(null);
  const targetScrollRef = useRef(0);
  const smoothScrollRef = useRef(0);

  useEffect(() => {
    const reveals = Array.from(document.querySelectorAll<HTMLElement>('.reveal'));
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.2 }
    );
    reveals.forEach((el) => revealObserver.observe(el));

    const heroObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const isActive = entry.isIntersecting;
          heroActiveRef.current = isActive;
        });
      },
      { threshold: 0.2 }
    );
    if (heroRef.current) {
      heroObserver.observe(heroRef.current);
    }

    const magneticTargets = Array.from(document.querySelectorAll<HTMLElement>('[data-magnetic]'));
    const magneticCleanup = magneticTargets.map((target) => {
      const handleMove = (event: PointerEvent) => {
        const rect = target.getBoundingClientRect();
        const offsetX = (event.clientX - rect.left - rect.width / 2) * 0.18;
        const offsetY = (event.clientY - rect.top - rect.height / 2) * 0.18;
        target.style.transform = `translate3d(${offsetX}px, ${offsetY}px, 0)`;
      };
      const handleLeave = () => {
        target.style.transform = 'translate(0px, 0px)';
      };
      target.addEventListener('pointermove', handleMove);
      target.addEventListener('pointerleave', handleLeave);
      return () => {
        target.removeEventListener('pointermove', handleMove);
        target.removeEventListener('pointerleave', handleLeave);
        target.style.transform = '';
      };
    });

    const updateScrollStates = (y: number) => {
      const lastY = lastScrollRef.current;
      const isScrollingUp = y < lastY - 4;
      const isScrollingDown = y > lastY + 4;
      lastScrollRef.current = y;

      if (heroActiveRef.current || y < 120) {
        setShowSticky((prev) => (prev ? false : prev));
      } else {
        if (isScrollingUp && y > 220) {
          setShowSticky((prev) => (prev ? prev : true));
        }
        if (isScrollingDown && y > 220) {
          setShowSticky((prev) => (prev ? false : prev));
        }
      }

      setFrameExpanded((prev) => {
        if (y <= 40 && !prev) return true;
        if (y >= 80 && prev) return false;
        return prev;
      });
    };

    const animateScrollVars = () => {
      const target = targetScrollRef.current;
      const current = smoothScrollRef.current;
      const next = current + (target - current) * 0.14;
      const snapped = Math.abs(target - next) < 0.2 ? target : next;
      const prevRounded = Math.round(current * 100) / 100;
      const nextRounded = Math.round(snapped * 100) / 100;

      smoothScrollRef.current = snapped;
      if (prevRounded !== nextRounded) {
        document.documentElement.style.setProperty('--scroll-y-smooth', `${nextRounded}`);
      }

      if (Math.abs(target - snapped) > 0.2) {
        scrollRafRef.current = window.requestAnimationFrame(animateScrollVars);
      } else {
        scrollRafRef.current = null;
      }
    };

    const handleScroll = () => {
      const y = window.scrollY;
      targetScrollRef.current = y;
      updateScrollStates(y);
      if (scrollRafRef.current === null) {
        scrollRafRef.current = window.requestAnimationFrame(animateScrollVars);
      }
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      revealObserver.disconnect();
      heroObserver.disconnect();
      magneticCleanup.forEach((cleanup) => cleanup());
      window.removeEventListener('scroll', handleScroll);
      if (scrollRafRef.current !== null) {
        window.cancelAnimationFrame(scrollRafRef.current);
      }
    };
  }, []);

  return (
    <main
      className={`${space.className} min-h-screen bg-[#f2efe9] text-[#141414] ${
        frameExpanded ? 'frame-expanded' : ''
      }`}
    >
      <div className="ambient-bg pointer-events-none fixed inset-0" />
      <div className="grid-bg pointer-events-none fixed inset-0" />
      <div className={`sticky-bar ${showSticky ? 'is-visible' : ''}`}>
        <div className="sticky-bar-inner mx-auto flex w-full max-w-[1200px] items-center justify-between px-6 py-3">
          <div className={`${fraunces.className} text-lg font-semibold italic`}>JX.Minder</div>
          <nav className="hidden items-center gap-6 text-xs text-[#5e564d] lg:flex">
            {NAV_ITEMS.map((item) => (
              <button key={`sticky-${item}`} className="nav-link">
                {item}
              </button>
            ))}
          </nav>
          <button className="nav-pill border border-[#151515] text-[10px]">Start a project</button>
        </div>
      </div>

      <div className={`content-shell relative z-10 mx-auto w-full max-w-[1200px] px-6 pb-24 ${showSticky ? 'is-condensed' : ''}`}>
        <section ref={heroRef} className={`hero-page ${frameExpanded ? 'is-expanded' : ''}`}>
          <div className="hero-frame" />
          <header className="hero-top reveal" style={{ '--delay': '0ms' } as CSSProperties}>
            <div className={`${fraunces.className} hero-brand text-2xl font-semibold italic`}>JX.Minder</div>
            <nav className="hero-nav hidden items-center text-sm text-[#5e564d] lg:flex">
              {NAV_ITEMS.map((item) => (
                <button key={item} data-magnetic className="nav-link text-sm transition-all duration-300 hover:text-[#141414]">
                  {item}
                </button>
              ))}
            </nav>
            <button
              data-magnetic
              className="hero-cta nav-pill rounded-full border border-[#151515] px-6 py-2 text-xs uppercase tracking-[0.35em]"
            >
              Start a project
            </button>
          </header>

          <div className="hero-content">
            <section className="hero-main reveal mt-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr]" style={{ '--delay': '120ms' } as CSSProperties}>
              <div>
                <div className={`${mono.className} text-[10px] uppercase tracking-[0.4em] text-[#8a7f73]`}>
                  Digital experience studio
                </div>
                <h1 className={`${fraunces.className} reveal-lines mt-4 text-5xl font-semibold leading-[1.05] lg:text-6xl`}>
                  <span style={{ '--line-delay': '0ms' } as CSSProperties}>Crafting tactile</span>
                  <span style={{ '--line-delay': '120ms' } as CSSProperties}>interactive worlds</span>
                </h1>
                <p
                  className="reveal-children slide-left mt-6 max-w-[520px] text-sm text-[#4e463d]"
                  style={{ '--sub-delay': '180ms' } as CSSProperties}
                >
                  A framework-first approach to digital storytelling, blending 3D motion with editorial clarity.
                </p>
                <div className="reveal-children mt-8 flex flex-wrap gap-4" style={{ '--sub-delay': '260ms' } as CSSProperties}>
                  <button data-magnetic className="nav-pill bg-[#141414] text-white">
                    View cases
                  </button>
                  <button data-magnetic className="nav-pill border border-[#151515] text-[#141414]">
                    Get in touch
                  </button>
                </div>
              </div>
              <div className="reveal-children slide-right space-y-5" style={{ '--sub-delay': '220ms' } as CSSProperties}>
                <div className="rounded-[24px] border border-[#e0d8cd] bg-white/80 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)]">
                  <div className={`${mono.className} text-[11px] uppercase tracking-[0.32em] text-[#8a7f73]`}>
                    Signature stack
                  </div>
                  <div className="mt-4 flex flex-wrap gap-3 text-xs text-[#4e463d]">
                    {['WebGL', 'Spline', 'Three.js', 'Motion', 'XR', 'R3F'].map((chip) => (
                      <span key={chip} className="rounded-full border border-[#e6ddd2] bg-[#fbfaf7] px-4 py-2">
                        {chip}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="image-reveal rounded-[28px] bg-[#141414] p-6 text-white shadow-[0_25px_60px_rgba(0,0,0,0.2)]">
                  <div className="text-xs uppercase tracking-[0.3em] text-white/70">Highlight reel</div>
                  <div
                    className="mt-6 h-40 rounded-[20px] bg-gradient-to-br from-[#2b2b2b] via-[#141414] to-[#0c0c0c]"
                    data-parallax
                    style={{ '--parallax-speed': '0.04' } as CSSProperties}
                  />
                </div>
              </div>
            </section>

            <section className="reveal mt-14 overflow-hidden rounded-[999px] border border-[#e6ddd2] bg-[#fbfaf7] py-4" style={{ '--delay': '220ms' } as CSSProperties}>
              <div className="marquee flex gap-10 text-xs uppercase tracking-[0.35em] text-[#6b645c]">
                {Array.from({ length: 6 }).map((_, index) => (
                  <span key={`marquee-${index}`} className="whitespace-nowrap">
                    Interactive design · Spatial storytelling · Creative development ·
                  </span>
                ))}
              </div>
            </section>
          </div>
        </section>

        <section className="reveal mt-16" style={{ '--delay': '300ms' } as CSSProperties}>
          <div className="flex items-center justify-between">
            <div className={`${mono.className} text-[10px] uppercase tracking-[0.35em] text-[#8a7f73]`}>
              Featured
            </div>
            <button data-magnetic className="nav-pill border border-[#151515] text-xs uppercase tracking-[0.28em]">
              Explore all
            </button>
          </div>
          <div className="mt-8 grid gap-6 lg:grid-cols-[1.4fr_1fr]">
            <div
              className="reveal-children image-reveal relative overflow-hidden rounded-[32px] bg-[#101010] p-8 text-white shadow-[0_35px_100px_rgba(0,0,0,0.2)]"
              style={{ '--sub-delay': '120ms' } as CSSProperties}
            >
              <div className="absolute right-10 top-10 h-24 w-24 rounded-full border border-white/30" />
              <div className={`${mono.className} text-[10px] uppercase tracking-[0.35em] text-white/60`}>
                Case 01
              </div>
              <div className={`${fraunces.className} mt-6 text-3xl font-semibold`}>Immersive brand portal</div>
              <div
                className="mt-8 h-56 rounded-[28px] bg-gradient-to-br from-[#202020] via-[#0f0f0f] to-[#050505]"
                data-parallax
                style={{ '--parallax-speed': '0.06' } as CSSProperties}
              />
            </div>
            <div className="grid gap-6">
              {['Experimental commerce', 'Product narrative'].map((title, index) => (
                <div
                  key={title}
                  className="reveal-children image-reveal rounded-[28px] border border-[#e0d8cd] bg-white/90 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.12)]"
                  style={{ '--sub-delay': `${180 + index * 80}ms` } as CSSProperties}
                >
                  <div className={`${mono.className} text-[10px] uppercase tracking-[0.35em] text-[#8a7f73]`}>
                    Case {index + 2}
                  </div>
                  <div className={`${fraunces.className} mt-4 text-2xl font-semibold text-[#141414]`}>
                    {title}
                  </div>
                  <div
                    className="mt-6 h-24 rounded-[18px] bg-[#f0e7dc]"
                    data-parallax
                    style={{ '--parallax-speed': '0.03' } as CSSProperties}
                  />
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="reveal lab-section mt-16 rounded-[40px] bg-[#e6eaeb] px-10 py-14" style={{ '--delay': '380ms' } as CSSProperties}>
          <div className="text-center">
            <h2 className={`${fraunces.className} text-4xl font-semibold`}>Our Creative Lab</h2>
            <p className="mt-4 text-sm text-[#4e463d]">
              Where breakthroughs begin, and ideas take shape.
            </p>
            <button data-magnetic className="nav-pill mt-6 bg-[#141414] text-white">
              Explore now
            </button>
          </div>
          <div className="lab-canvas mt-10" data-parallax style={{ '--parallax-speed': '0.02' } as CSSProperties}>
            {[
              { id: 'a', left: '6%', top: '55%', rotate: '-6deg' },
              { id: 'b', left: '20%', top: '38%', rotate: '4deg' },
              { id: 'c', left: '38%', top: '50%', rotate: '-2deg' },
              { id: 'd', left: '56%', top: '40%', rotate: '6deg' },
              { id: 'e', left: '72%', top: '52%', rotate: '-4deg' },
              { id: 'f', left: '86%', top: '44%', rotate: '5deg' },
            ].map((card, index) => (
              <div
                key={card.id}
                className="lab-card"
                style={
                  {
                    left: card.left,
                    top: card.top,
                    '--drop-delay': `${120 + index * 120}ms`,
                    '--rotate': card.rotate,
                  } as CSSProperties
                }
              >
                <div className="h-full w-full rounded-[20px] bg-white/90 shadow-[0_12px_30px_rgba(0,0,0,0.12)]" />
              </div>
            ))}
          </div>
        </section>

        <section className="reveal mt-16 grid gap-6 lg:grid-cols-[1fr_1fr]" style={{ '--delay': '460ms' } as CSSProperties}>
          <div className="rounded-[32px] bg-[#fbfaf7] p-8 shadow-[0_25px_70px_rgba(0,0,0,0.12)]">
            <div className={`${mono.className} text-[10px] uppercase tracking-[0.35em] text-[#8a7f73]`}>
              Services
            </div>
            <div className="mt-6 space-y-4">
              {SERVICE_ITEMS.map((item, index) => (
                <div
                  key={item}
                  className="reveal-children slide-left flex items-center justify-between rounded-[18px] border border-[#efe8dd] bg-white px-5 py-4"
                  style={{ '--sub-delay': `${120 + index * 70}ms` } as CSSProperties}
                >
                  <span className="text-sm font-semibold">{item}</span>
                  <span className={`${mono.className} text-[10px] uppercase tracking-[0.3em] text-[#8a7f73]`}>
                    View
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="image-reveal rounded-[32px] bg-[#141414] p-8 text-white shadow-[0_25px_70px_rgba(0,0,0,0.2)]">
            <div className="text-xs uppercase tracking-[0.35em] text-white/70">Studio</div>
            <div className={`${fraunces.className} mt-4 text-3xl font-semibold`}>
              Explorations in 3D commerce and spatial UI
            </div>
            <div
              className="mt-8 h-40 rounded-[26px] bg-gradient-to-br from-[#2a2a2a] to-[#0c0c0c]"
              data-parallax
              style={{ '--parallax-speed': '0.05' } as CSSProperties}
            />
            <button data-magnetic className="nav-pill mt-8 bg-white text-[#141414]">
              Enter lab
            </button>
          </div>
        </section>

        <section className="reveal mt-16 rounded-[36px] bg-[#fbfaf7] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.14)]" style={{ '--delay': '540ms' } as CSSProperties}>
          <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <div className={`${mono.className} text-[10px] uppercase tracking-[0.35em] text-[#8a7f73]`}>
                Start the conversation
              </div>
              <div className={`${fraunces.className} mt-4 text-4xl font-semibold`}>
                Ready to build your next experience?
              </div>
            </div>
            <button data-magnetic className="nav-pill bg-[#141414] text-white">
              Book a call
            </button>
          </div>
        </section>
      </div>

      <style jsx global>{`
        :root {
          --scroll-y-smooth: 0;
          --frame-gutter: max(24px, calc((100vw - 1200px) / 2 + 24px));
          --content-gutter: var(--frame-gutter);
          --top-gutter: var(--frame-gutter);
          --nav-gap: 32px;
          --hero-brand-shift: 0px;
          --hero-nav-shift: 0px;
          --hero-cta-shift: 0px;
          --hero-main-shift: 0px;
        }
        .ambient-bg {
          background: radial-gradient(
            circle at top,
            rgba(255, 255, 255, 0.95),
            rgba(242, 239, 233, 0.7),
            transparent 62%
          );
          transform: translate3d(
            0,
            calc(var(--scroll-y-smooth) * -0.01px),
            0
          );
          transition: transform 0.18s linear;
          will-change: transform;
          backface-visibility: hidden;
        }
        .grid-bg {
          opacity: 0.6;
          background-image: linear-gradient(to right, rgba(0, 0, 0, 0.04) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.04) 1px, transparent 1px);
          background-size: 40px 40px;
          transform: translate3d(
            0,
            calc(var(--scroll-y-smooth) * -0.025px),
            0
          );
          transition: transform 0.18s linear;
          will-change: transform;
          backface-visibility: hidden;
        }
        .frame-expanded {
          --hero-brand-shift: -16px;
          --hero-cta-shift: 16px;
          --hero-main-shift: -8px;
        }
        .hero-page {
          position: relative;
          padding: 0;
          border-radius: 40px;
          overflow: hidden;
          min-height: 100vh;
          width: 100vw;
          margin-left: calc(50% - 50vw);
          margin-right: calc(50% - 50vw);
          margin-top: -48px;
        }
        .hero-frame {
          position: absolute;
          top: 56px;
          bottom: 56px;
          left: var(--frame-gutter);
          right: var(--frame-gutter);
          border-radius: 36px;
          background-color: #f2efe9;
          background-image: radial-gradient(
              circle at top,
              rgba(255, 255, 255, 0.65),
              rgba(242, 239, 233, 0.6),
              transparent 65%
            ),
            linear-gradient(to right, rgba(0, 0, 0, 0.035) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 0, 0, 0.035) 1px, transparent 1px);
          background-size: auto, 40px 40px, 40px 40px;
          border: 1px solid rgba(20, 20, 20, 0.08);
          box-shadow: 0 32px 90px rgba(0, 0, 0, 0.08);
          transition: top 1.6s ease, bottom 1.6s ease, left 1.6s ease, right 1.6s ease,
            border-radius 1.6s ease, box-shadow 1.6s ease, border-color 1.2s ease;
          z-index: 0;
          pointer-events: none;
        }
        .hero-page.is-expanded .hero-frame {
          top: 0;
          bottom: 0;
          left: 0;
          right: 0;
          border-radius: 0;
          border-color: transparent;
          box-shadow: none;
        }
        .hero-top {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 48px var(--top-gutter) 0;
          contain: layout paint;
        }
        .hero-brand,
        .hero-nav,
        .hero-cta,
        .hero-main {
          transition: transform 0.9s cubic-bezier(0.2, 0.7, 0.2, 1);
          will-change: transform;
          backface-visibility: hidden;
        }
        .hero-brand {
          transform: translate3d(var(--hero-brand-shift), 0, 0);
        }
        .hero-nav {
          gap: var(--nav-gap);
          transform: translate3d(var(--hero-nav-shift), 0, 0);
        }
        .hero-cta {
          transform: translate3d(var(--hero-cta-shift), 0, 0);
        }
        .hero-content {
          position: relative;
          z-index: 1;
          margin: 0 auto;
          max-width: 1200px;
          padding: 64px var(--content-gutter) 40px;
          contain: layout paint;
        }
        .hero-main {
          transform: translate3d(var(--hero-main-shift), 0, 0);
        }
        .content-shell {
          padding-top: 48px;
          transition: padding-top 0.5s ease;
          transform: translateZ(0);
        }
        .content-shell.is-condensed {
          padding-top: 24px;
        }
        .sticky-bar {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          z-index: 30;
          background: rgba(242, 239, 233, 0.92);
          backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(20, 20, 20, 0.08);
          transform: translateY(-100%);
          transition: transform 0.5s ease;
        }
        .sticky-bar::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: 0;
          height: 1px;
          width: 100%;
          background: rgba(20, 20, 20, 0.12);
          transform: scaleX(0.2);
          transform-origin: left;
          transition: transform 0.6s ease;
        }
        .sticky-bar.is-visible {
          transform: translateY(0%);
        }
        .sticky-bar.is-visible::after {
          transform: scaleX(1);
        }
        .sticky-bar.is-visible .sticky-bar-inner {
          animation: bar-expand 0.6s ease;
          transform-origin: center;
        }
        .nav-pill {
          border-radius: 999px;
          padding: 12px 24px;
          font-size: 11px;
          letter-spacing: 0.35em;
          text-transform: uppercase;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
          box-shadow: 0 10px 22px rgba(0, 0, 0, 0.12);
        }
        .nav-pill:hover {
          transform: translateY(-2px);
        }
        .nav-link {
          position: relative;
        }
        .nav-link::after {
          content: '';
          position: absolute;
          left: 0;
          bottom: -6px;
          width: 100%;
          height: 1px;
          background: currentColor;
          transform: scaleX(0);
          transform-origin: left;
          transition: transform 0.3s ease;
        }
        .nav-link:hover::after {
          transform: scaleX(1);
        }
        .marquee {
          animation: marquee 18s linear infinite;
        }
        @keyframes marquee {
          from {
            transform: translateX(0);
          }
          to {
            transform: translateX(-50%);
          }
        }
        @keyframes bar-expand {
          0% {
            transform: scaleX(0.96);
          }
          100% {
            transform: scaleX(1);
          }
        }
        [data-parallax] {
          transform: translate3d(
            0,
            calc(var(--scroll-y-smooth) * var(--parallax-speed, 0.03) * -1px),
            0
          );
          will-change: transform;
        }
        .reveal {
          opacity: 0;
          transform: translate3d(0, 24px, 0) scale(0.98);
          filter: blur(5px);
          transition: opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease;
          transition-delay: var(--delay, 0ms);
          will-change: transform, opacity, filter;
        }
        .reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
          filter: blur(0px);
        }
        .reveal-children {
          opacity: 0;
          transform: translate3d(0, 20px, 0) scale(0.98);
          filter: blur(5px);
          transition: opacity 0.8s ease, transform 0.8s ease, filter 0.8s ease;
          transition-delay: calc(var(--delay, 0ms) + var(--sub-delay, 0ms));
          will-change: transform, opacity, filter;
        }
        .reveal.is-visible .reveal-children {
          opacity: 1;
          transform: translate3d(0, 0, 0) scale(1);
          filter: blur(0px);
        }
        .reveal-children.slide-left {
          transform: translate3d(-32px, 0, 0) scale(0.98);
          letter-spacing: 0.08em;
        }
        .reveal-children.slide-right {
          transform: translate3d(32px, 0, 0) scale(0.98);
          letter-spacing: 0.08em;
        }
        .reveal.is-visible .reveal-children.slide-left,
        .reveal.is-visible .reveal-children.slide-right {
          transform: translate3d(0, 0, 0) scale(1);
          letter-spacing: 0.02em;
        }
        .image-reveal {
          filter: blur(8px);
          transform: translate3d(0, 28px, 0) scale(0.97);
          transition: filter 0.8s ease, transform 0.8s ease, opacity 0.8s ease;
          opacity: 0;
          will-change: transform, filter, opacity;
        }
        .reveal.is-visible .image-reveal,
        .reveal.is-visible .reveal-children.image-reveal {
          filter: blur(0px);
          transform: translate3d(0, 0, 0) scale(1);
          opacity: 1;
        }
        .reveal-lines span {
          display: block;
          opacity: 0;
          transform: translateY(12px);
          filter: blur(6px);
          transition: opacity 0.7s ease, transform 0.7s ease, filter 0.7s ease;
          transition-delay: calc(var(--delay, 0ms) + var(--line-delay, 0ms));
        }
        .reveal.is-visible .reveal-lines span {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0px);
        }
        .lab-section.is-visible .lab-card {
          animation: drop-in 1.1s cubic-bezier(0.2, 0.9, 0.25, 1.2) forwards;
          animation-delay: var(--drop-delay, 0ms);
        }
        .lab-canvas {
          position: relative;
          min-height: 320px;
          border-radius: 32px;
          background: #e3e7e8;
          overflow: hidden;
        }
        .lab-card {
          position: absolute;
          width: 140px;
          height: 120px;
          opacity: 0;
          transform: translateY(-120px) rotate(var(--rotate, 0deg));
        }
        @keyframes drop-in {
          0% {
            opacity: 0;
            transform: translateY(-140px) rotate(var(--rotate, 0deg));
          }
          70% {
            opacity: 1;
            transform: translateY(14px) rotate(var(--rotate, 0deg));
          }
          85% {
            transform: translateY(-6px) rotate(var(--rotate, 0deg));
          }
          100% {
            opacity: 1;
            transform: translateY(0) rotate(var(--rotate, 0deg));
          }
        }
        @media (max-width: 768px) {
          .sticky-bar {
            display: none;
          }
        }
      `}</style>
    </main>
  );
}
