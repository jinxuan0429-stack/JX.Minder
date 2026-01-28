"use client";

import Spline from '@splinetool/react-spline';
import { Space_Grotesk, IBM_Plex_Mono } from 'next/font/google';
import { useEffect, useMemo, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

const space = Space_Grotesk({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
});

const plex = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
});

const ALIGN_MODE = false;
const BACKGROUND_SCENE = '/spline/clarity_stream/public/scene.splinecode';
const BALL_SCENE = '/spline/glassmorph/public/scene.splinecode';
const BALL_NAME = 'Sphere';
const LIMIT_CENTER_NAME = 'LimitCenter';
const BALL_LIMIT_RADIUS = 160;
const LIMIT_SOFTNESS = 0.18;
const BALL_WINDOW_RADIUS_PX = 220;
const BALL_WINDOW_CENTER_Y = 56;
const BALL_WINDOW_FADE_START = 62;

const items = [
  {
    title: '最新洞察',
    subtitle: 'Thought Hub',
    href: '/content/articles',
    x: 14,
    y: 44,
  },
  {
    title: '智控中心',
    subtitle: 'AI & Learn',
    href: '/content/learn',
    x: 82,
    y: 48,
  },
  {
    title: '实时视界',
    subtitle: 'News & Buzz',
    href: '/content',
    x: 16,
    y: 74,
  },
  {
    title: '极客沙盒',
    subtitle: 'Game & Play',
    href: '/content/games',
    x: 84,
    y: 78,
  },
];

export default function NavigationPage() {
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement | null>(null);
  const splineRef = useRef<any>(null);
  const [isSplineReady, setIsSplineReady] = useState(false);
  const hasCenteredRef = useRef(false);
  const tagRefs = useRef<Array<HTMLDivElement | null>>([]);
  const [hoverIndex, setHoverIndex] = useState<number | null>(null);
  const [positions, setPositions] = useState(items.map((item) => ({ x: item.x, y: item.y })));
  const [dragIndex, setDragIndex] = useState<number | null>(null);
  const dragStart = useRef({ x: 0, y: 0, px: 0, py: 0 });

  const activeItems = useMemo(
    () =>
      items.map((item, index) => ({
        ...item,
        x: positions[index]?.x ?? item.x,
        y: positions[index]?.y ?? item.y,
      })),
    [positions]
  );

  function handlePointerDown(index: number, event: React.PointerEvent) {
    if (!ALIGN_MODE || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    dragStart.current = {
      x: event.clientX,
      y: event.clientY,
      px: positions[index].x,
      py: positions[index].y,
    };
    setDragIndex(index);
    event.currentTarget.setPointerCapture(event.pointerId);
    event.preventDefault();
  }

  function handlePointerMove(event: React.PointerEvent) {
    if (!ALIGN_MODE || dragIndex === null || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const dx = ((event.clientX - dragStart.current.x) / rect.width) * 100;
    const dy = ((event.clientY - dragStart.current.y) / rect.height) * 100;
    const x = Math.min(95, Math.max(5, dragStart.current.px + dx));
    const y = Math.min(95, Math.max(5, dragStart.current.py + dy));
    setPositions((prev) => prev.map((pos, idx) => (idx === dragIndex ? { x, y } : pos)));
  }

  function handlePointerUp(event: React.PointerEvent) {
    if (!ALIGN_MODE || dragIndex === null) return;
    event.currentTarget.releasePointerCapture(event.pointerId);
    setDragIndex(null);
    console.log('Aligned positions:', positions);
  }

  function handleSplineLoad(spline: any) {
    splineRef.current = spline;
    setIsSplineReady(true);
  }

  useEffect(() => {
    if (!isSplineReady || !splineRef.current) return;
    let frameId = 0;

    const clampLoop = () => {
      const ball = splineRef.current.findObjectByName(BALL_NAME);
      if (ball) {
        const centerObj = splineRef.current.findObjectByName(LIMIT_CENTER_NAME);
        const center = centerObj?.position ?? { x: 0, y: 0, z: 0 };

        if (!hasCenteredRef.current) {
          ball.position.x = center.x;
          ball.position.y = center.y;
          ball.position.z = center.z;
          hasCenteredRef.current = true;
        }

        const dx = ball.position.x - center.x;
        const dy = ball.position.y - center.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist > BALL_LIMIT_RADIUS) {
          const scale = BALL_LIMIT_RADIUS / dist;
          const targetX = center.x + dx * scale;
          const targetY = center.y + dy * scale;
          ball.position.x += (targetX - ball.position.x) * LIMIT_SOFTNESS;
          ball.position.y += (targetY - ball.position.y) * LIMIT_SOFTNESS;
        }
      }
      frameId = requestAnimationFrame(clampLoop);
    };

    frameId = requestAnimationFrame(clampLoop);
    return () => cancelAnimationFrame(frameId);
  }, [isSplineReady]);

  useEffect(() => {
    if (ALIGN_MODE) return;

    const hitTest = (clientX: number, clientY: number) => {
      for (let i = 0; i < tagRefs.current.length; i += 1) {
        const el = tagRefs.current[i];
        if (!el) continue;
        const rect = el.getBoundingClientRect();
        if (clientX >= rect.left && clientX <= rect.right && clientY >= rect.top && clientY <= rect.bottom) {
          return i;
        }
      }
      return null;
    };

    const handlePointerMove = (event: PointerEvent) => {
      setHoverIndex(hitTest(event.clientX, event.clientY));
    };

    const handleClick = (event: MouseEvent) => {
      const index = hitTest(event.clientX, event.clientY);
      if (index !== null) {
        router.push(items[index].href);
      }
    };

    window.addEventListener('pointermove', handlePointerMove);
    window.addEventListener('click', handleClick);
    return () => {
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('click', handleClick);
    };
  }, [router]);

  return (
    <main className={`${space.className} relative min-h-screen overflow-hidden bg-black text-white`}>
      <div className="absolute inset-0 z-0">
        <Spline
          scene={BACKGROUND_SCENE}
          className="absolute inset-0 h-full w-full pointer-events-none"
        />
      </div>

      <div
        className="absolute inset-0 z-10 ball-window"
        style={
          {
            '--ball-window-radius': `${BALL_WINDOW_RADIUS_PX}px`,
            '--ball-window-center-y': `${BALL_WINDOW_CENTER_Y}%`,
            '--ball-window-fade-start': `${BALL_WINDOW_FADE_START}%`,
          } as React.CSSProperties
        }
      >
        <Spline
          scene={BALL_SCENE}
          className="absolute inset-0 h-full w-full"
          onLoad={handleSplineLoad}
        />
        <div className="ball-window-soft" />
      </div>

      <div
        ref={containerRef}
        className="pointer-events-none relative z-20 mx-auto h-[72vh] w-full max-w-6xl px-6"
      >
        {activeItems.map((item, index) => {
          const isHovered = hoverIndex === index;
          return (
            <div
              key={item.href}
              onPointerDown={(event: React.PointerEvent) => handlePointerDown(index, event)}
              onPointerMove={handlePointerMove}
              onPointerUp={handlePointerUp}
              ref={(el: HTMLDivElement | null) => {
                tagRefs.current[index] = el;
              }}
              className={`pointer-events-none group absolute inline-flex h-12 w-[210px] items-center justify-between gap-4 rounded-full border border-white/15 bg-white/5 px-4 text-xs backdrop-blur-md transition-all duration-500 ${
                isHovered ? ' -translate-y-1 border-white/40 bg-white/15' : ''
              }`}
              style={{
                left: `${item.x}%`,
                top: `${item.y}%`,
                transform: 'translate(-50%, -50%)',
                cursor: ALIGN_MODE ? 'grab' : 'pointer',
              }}
            >
              <span className="flex flex-col gap-1">
                <span className="text-sm font-semibold text-white/90">{item.title}</span>
                <span className={`${plex.className} text-[9px] uppercase tracking-[0.4em] text-white/60`}>
                  {item.subtitle}
                </span>
              </span>
            </div>
          );
        })}
      </div>

      <div className="pointer-events-none absolute inset-0 z-20">
        <div
          className="absolute left-1/2 top-[56%] h-[320px] w-[320px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/10 bg-black/35 shadow-[0_0_80px_rgba(255,255,255,0.08)] animate-pulse-soft"
        />
      </div>

      <style jsx global>{`
        @keyframes pulse-soft {
          0%,
          100% {
            opacity: 0.4;
            transform: translate(-50%, -50%) scale(0.98);
          }
          50% {
            opacity: 0.8;
            transform: translate(-50%, -50%) scale(1.02);
          }
        }
        .animate-pulse-soft {
          animation: pulse-soft 6s ease-in-out infinite;
        }
        .ball-window {
          pointer-events: auto;
          -webkit-mask-image: radial-gradient(
            circle var(--ball-window-radius) at 50% var(--ball-window-center-y),
            rgba(0, 0, 0, 1) var(--ball-window-fade-start),
            transparent 100%
          );
          mask-image: radial-gradient(
            circle var(--ball-window-radius) at 50% var(--ball-window-center-y),
            rgba(0, 0, 0, 1) var(--ball-window-fade-start),
            transparent 100%
          );
          -webkit-mask-repeat: no-repeat;
          mask-repeat: no-repeat;
          opacity: 0;
          animation: ball-window-in 1.2s ease-out forwards;
        }
        .ball-window-soft {
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: radial-gradient(
            circle var(--ball-window-radius) at 50% var(--ball-window-center-y),
            rgba(0, 0, 0, 0) 40%,
            rgba(0, 0, 0, 0.35) 100%
          );
        }
        @keyframes ball-window-in {
          0% {
            opacity: 0;
            filter: blur(10px);
          }
          100% {
            opacity: 1;
            filter: blur(0px);
          }
        }
      `}</style>
    </main>
  );
}
