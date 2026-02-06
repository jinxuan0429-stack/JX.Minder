'use client';

import Link from 'next/link';
import type { CSSProperties } from 'react';
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

const NAV_LINKS = [
  { label: 'Home', href: '/navigation', active: true },
  { label: 'Idea Archive', href: '/content/articles' },
  { label: 'Maker Lab', href: '/content' },
  { label: 'Inspiration Stream', href: '/content' },
  { label: 'Game Gallery', href: '/content/games' },
];

const FEATURE_CHIPS = [
  { label: '^', bg: '#151515', color: '#ffffff' },
  { label: '[]', bg: '#d5b6a6', color: '#ffffff' },
  { label: '->', bg: '#c9d8d9', color: '#415055' },
  { label: '*', bg: '#e6e4e1', color: '#151515' },
];

const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH ?? '';
const SPLINE_IFRAME_URL =
  `${BASE_PATH}/spline/gameconsole/index.html?auto=1&base=1400&min=0.2&max=0.7&y=-120`;

const FEATURE_LIST = [
  {
    title: 'Creative routes for personal archives',
    category: 'Feature',
    date: 'Dec 28, 2022',
  },
  {
    title: 'How brands dictate the vision',
    category: 'Fashion',
    date: 'Jan 03, 2023',
  },
  {
    title: 'Editorials built for touch screens',
    category: 'Culture',
    date: 'Jan 10, 2023',
  },
];

export default function NavigationPage() {
  return (
    <main className={`${space.className} min-h-screen bg-[#f2efe9] text-[#151515]`}>
      <div className="mx-auto w-full max-w-[1200px] px-6 pb-24 pt-10">
        <header
          className="reveal flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between"
          style={{ '--delay': '0ms' } as CSSProperties}
        >
          <div className="flex items-center gap-3">
            <div className={`${fraunces.className} text-2xl font-semibold italic tracking-[0.02em]`}>
              JX.Minder
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-[#5e564d] lg:flex">
            {NAV_LINKS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={`nav-3d-text transition-all duration-300 hover:text-[#151515] ${
                  item.active ? 'font-semibold text-[#151515]' : ''
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <label
              htmlFor="nav-search"
              className="nav-3d flex w-full max-w-[320px] items-center gap-3 rounded-full border border-[#e0d8cd] bg-white px-4 py-2 text-[11px] uppercase tracking-[0.28em] text-[#7b7268]"
            >
              <span>Search</span>
              <input
                id="nav-search"
                placeholder=""
                className="w-full bg-transparent text-xs text-[#151515] outline-none"
              />
            </label>
          </div>
        </header>

        <section
          className="reveal mt-10 rounded-[40px] bg-[#fbfaf7] p-10 shadow-[0_40px_110px_rgba(0,0,0,0.18)]"
          style={{ '--delay': '120ms' } as CSSProperties}
        >
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <div className={`${mono.className} text-[10px] uppercase tracking-[0.4em] text-[#8c847a]`}>
                Broadcast
              </div>
              <h1
                className={`reveal-lines ${fraunces.className} mt-3 text-4xl font-semibold lg:text-5xl`}
                style={{ '--delay': '140ms' } as CSSProperties}
              >
                <span style={{ '--line-delay': '0ms' } as CSSProperties}>Be part of our</span>
                <span style={{ '--line-delay': '120ms' } as CSSProperties}>Broadcast</span>
              </h1>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              {FEATURE_CHIPS.map((chip, index) => (
                <div
                  key={chip.label}
                  className="reveal-children flex h-12 w-20 items-center justify-center rounded-full text-sm font-semibold"
                  style={
                    {
                      '--sub-delay': `${120 + index * 70}ms`,
                      backgroundColor: chip.bg,
                      color: chip.color,
                    } as CSSProperties
                  }
                >
                  {chip.label}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-8 -mx-10 -mb-10">
            <div className="relative w-full overflow-hidden rounded-b-[40px] rounded-t-[32px] bg-[#101010]">
              <div className="absolute inset-0 bg-[#101010]" />
              <iframe
                title="Glassmask Spline"
                src="https://my.spline.design/glassmaskcopycopy-zDZhHT66SGkIdjZGDm4knTZO-MDF/"
                className="relative z-10 h-[360px] w-full border-0 md:h-[460px]"
                style={{ transform: 'scale(1.36)', transformOrigin: 'center' }}
                allow="autoplay; fullscreen"
                frameBorder={0}
              />
              <div className="pointer-events-none absolute bottom-0 right-0 z-20 h-8 w-22 rounded-tl-full bg-[#0f0f0f]" />
              <div className="pointer-events-none absolute inset-0 rounded-b-[40px] rounded-t-[32px] shadow-[inset_0_0_0_1px_rgba(255,255,255,0.18)]" />
            </div>
          </div>
        </section>

        <section
          className="reveal mt-14 rounded-[40px] bg-[#fbfaf7] p-10 shadow-[0_35px_100px_rgba(0,0,0,0.16)]"
          style={{ '--delay': '240ms' } as CSSProperties}
        >
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-[#151515]" />
              <div>
                <div className={`${fraunces.className} text-lg font-semibold`}>JX.Minder QClay</div>
                <div className="text-xs text-[#6b645c]">info@qclay.design | qclay.design</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0d8cd] bg-white">
                *
              </button>
              <button className="flex h-10 w-10 items-center justify-center rounded-full border border-[#e0d8cd] bg-white">
                +
              </button>
              <button className="rounded-full bg-[#151515] px-5 py-2 text-xs font-semibold text-white">
                Get in touch
              </button>
            </div>
          </div>

          <div className="mt-8 text-center">
            <div className={`${fraunces.className} text-4xl font-semibold italic`}>Fashion</div>
            <div className="mt-2 text-xs uppercase tracking-[0.35em] text-[#7e766d]">Category</div>
          </div>

          <div className="mt-8 grid gap-6 lg:grid-cols-[0.7fr_1.2fr_0.7fr]">
            <article
              className="reveal-children relative overflow-hidden rounded-[28px] bg-[#efe9e2] p-6"
              style={{ '--sub-delay': '120ms' } as CSSProperties}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.8),transparent_65%)]" />
              <div className="relative h-64 rounded-[22px] bg-[#d8d2c8]" />
              <div className="relative mt-5 text-sm font-semibold">A place where fashion is</div>
            </article>

            <article
              className="reveal-children relative overflow-hidden rounded-[32px] bg-[#f0e1c5] p-6"
              style={{ '--sub-delay': '200ms' } as CSSProperties}
            >
              <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.5),transparent)]" />
              <div className="relative flex items-start justify-between">
                <div>
                  <div className="rounded-full bg-white/80 px-3 py-1 text-[10px] font-semibold">Dec 28, 2022</div>
                  <div className="mt-2 rounded-full border border-black/10 bg-white/70 px-3 py-1 text-[10px]">
                    Fashion
                  </div>
                </div>
                <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/80 text-sm">
                  {'->'}
                </button>
              </div>
              <div className={`${fraunces.className} mt-6 text-2xl font-semibold`}>
                Representing brands as the source for inspiration
              </div>
              <div className="mt-6 h-56 rounded-[24px] bg-[#ead9ba]" />
            </article>

            <article
              className="reveal-children relative overflow-hidden rounded-[28px] bg-[#ffeeee] p-4"
              style={{ '--sub-delay': '280ms' } as CSSProperties}
            >
              <div className="absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full border border-white/70 bg-white/80 text-xs font-semibold text-[#3f3a34]">
                24
              </div>
              <div className="relative h-64 overflow-hidden rounded-[22px] bg-[#ffeeee]">
                <iframe
                  title="Spline Game Console"
                  src={SPLINE_IFRAME_URL}
                  className="h-full w-full border-0"
                  allow="autoplay; fullscreen"
                />
              </div>
              <div className="mt-4 text-sm font-semibold">How brands dictate the vision</div>
            </article>
          </div>
        </section>

        <section
          className="reveal mt-14 grid gap-6 lg:grid-cols-[1.2fr_0.8fr]"
          style={{ '--delay': '360ms' } as CSSProperties}
        >
          <div className="rounded-[34px] bg-[#fbfaf7] p-10 shadow-[0_30px_80px_rgba(0,0,0,0.14)]">
            <div className="flex items-center justify-between">
              <div>
                <div
                  className={`${mono.className} text-[10px] uppercase tracking-[0.35em] text-[#8a7f73]`}
                >
                  Editor's note
                </div>
                <div
                  className={`reveal-lines ${fraunces.className} mt-3 text-3xl font-semibold`}
                  style={{ '--delay': '380ms' } as CSSProperties}
                >
                  <span style={{ '--line-delay': '0ms' } as CSSProperties}>We collect the textures</span>
                  <span style={{ '--line-delay': '120ms' } as CSSProperties}>behind small games</span>
                </div>
              </div>
              <button className="rounded-full border border-[#e0d8cd] bg-white px-4 py-2 text-xs font-semibold">
                Explore
              </button>
            </div>
            <div className="mt-8 grid gap-4">
              {FEATURE_LIST.map((item, index) => (
                <div
                  key={item.title}
                  className="reveal-children flex items-center justify-between rounded-[20px] border border-[#efe8dd] bg-white px-5 py-4"
                  style={{ '--sub-delay': `${120 + index * 70}ms` } as CSSProperties}
                >
                  <div>
                    <div className="text-[11px] uppercase tracking-[0.3em] text-[#8a7f73]">{item.category}</div>
                    <div className={`${fraunces.className} mt-1 text-lg font-semibold`}>
                      {item.title}
                    </div>
                  </div>
                  <div className="text-xs text-[#6b645c]">{item.date}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid gap-6">
            <div className="rounded-[28px] bg-[#c8dadd] p-8 shadow-[0_25px_60px_rgba(0,0,0,0.1)]">
              <div className="flex items-start justify-between">
                <span className="rounded-full border border-white/60 bg-white/60 px-3 py-1 text-[10px] font-semibold text-[#456066]">
                  ADS
                </span>
                <button className="flex h-9 w-9 items-center justify-center rounded-full bg-white/70 text-sm">
                  +
                </button>
              </div>
              <div className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-[#4f6a70]">
                Become a Broadcast Member
              </div>
              <div className={`${fraunces.className} mt-3 text-xl font-semibold text-[#1f2b2e]`}>
                Real talk in a corporate world
              </div>
              <button className="mt-6 text-xs font-semibold text-[#3e555a]">Learn more</button>
            </div>
            <div className="rounded-[28px] bg-[#fbfaf7] p-6 shadow-[0_25px_60px_rgba(0,0,0,0.1)]">
              <div className="text-xs uppercase tracking-[0.3em] text-[#8a7f73]">Newsletter</div>
              <div className={`${fraunces.className} mt-3 text-xl font-semibold`}>
                Stay in the loop
              </div>
              <div className="mt-5 flex gap-2">
                <input
                  className="flex-1 rounded-full border border-[#e0d8cd] bg-white px-4 py-3 text-sm"
                  placeholder="email@example.com"
                />
                <button className="rounded-full bg-[#151515] px-6 py-3 text-sm font-semibold text-white">
                  Join
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
      <style jsx global>{`
        .reveal {
          opacity: 0;
          transform: translateY(18px) scale(0.98);
          filter: blur(6px);
          animation: reveal-in 0.8s ease forwards;
          animation-delay: var(--delay, 0ms);
        }
        @keyframes reveal-in {
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
            filter: blur(0px);
          }
        }
        .reveal-children {
          opacity: 0;
          transform: translateY(16px) scale(0.98);
          filter: blur(6px);
          animation: reveal-in 0.8s ease forwards;
          animation-delay: calc(var(--delay, 0ms) + var(--sub-delay, 0ms));
        }
        .reveal-lines span {
          display: block;
          opacity: 0;
          transform: translateY(10px);
          filter: blur(4px);
          animation: reveal-line 0.7s ease forwards;
          animation-delay: calc(var(--delay, 0ms) + var(--line-delay, 0ms));
        }
        @keyframes reveal-line {
          to {
            opacity: 1;
            transform: translateY(0);
            filter: blur(0px);
          }
        }
        .nav-3d {
          transform: perspective(900px) translateZ(0);
          transition: transform 0.35s ease, box-shadow 0.35s ease;
          transform-style: preserve-3d;
        }
        .nav-3d:hover,
        .nav-3d:focus-within {
          transform: perspective(900px) translateZ(12px) rotateX(-6deg) rotateY(6deg);
          box-shadow: 0 18px 30px rgba(0, 0, 0, 0.12);
        }
        .nav-3d-text {
          transform: perspective(900px) translateZ(0);
          transition: transform 0.35s ease, text-shadow 0.35s ease;
          text-shadow: 0 0 0 rgba(0, 0, 0, 0);
          transform-style: preserve-3d;
        }
        .nav-3d-text:hover,
        .nav-3d-text:focus-visible {
          transform: perspective(900px) translateZ(10px) rotateX(-6deg);
          text-shadow: 0 10px 22px rgba(0, 0, 0, 0.18);
        }
      `}</style>
    </main>
  );
}
