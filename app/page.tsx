"use client";

import Spline from '@splinetool/react-spline';
import { useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

const DEBUG_PANEL = false;
const SLIDER_KNOB_NAME = '手柄';
const SLIDER_CANDIDATES = ['handle', '手柄', 'left', 'right'];
const SLIDER_THRESHOLD = -97.5;
const CHECK_INTERVAL_MS = 100;
const NAVIGATION_DELAY_MS = 2400;
const LOADING_TIMEOUT_MS = 12000;

export default function IntegratedLanding() {
  const router = useRouter();
  const splineRef = useRef<any>(null);
  const hasNavigatedRef = useRef(false);
  const lastCheckRef = useRef(0);
  const debugIntervalRef = useRef<number | null>(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [isSplineReady, setIsSplineReady] = useState(false);
  const [isOnline, setIsOnline] = useState(true);
  const [loadingTooLong, setLoadingTooLong] = useState(false);
  const [debugInfo, setDebugInfo] = useState({
    found: false,
    x: 0,
    candidates: [] as Array<{ name: string; found: boolean; x: number }>,
  });

  function onLoad(spline: any) {
    splineRef.current = spline;
    setIsSplineReady(true);
    console.log("Spline System Ready. Listening to slider knob...");

    if (DEBUG_PANEL && debugIntervalRef.current === null) {
      debugIntervalRef.current = window.setInterval(() => {
        const knob = splineRef.current?.findObjectByName(SLIDER_KNOB_NAME);
        if (!knob) {
          setDebugInfo({
            found: false,
            x: 0,
            candidates: SLIDER_CANDIDATES.map((name) => ({ name, found: false, x: 0 })),
          });
          return;
        }
        setDebugInfo({
          found: true,
          x: knob.position.x,
          candidates: SLIDER_CANDIDATES.map((name) => {
            const obj = splineRef.current?.findObjectByName(name);
            return { name, found: Boolean(obj), x: obj?.position?.x ?? 0 };
          }),
        });
      }, 200);
    }
  }

  function handleSliderCheck() {
    if (!splineRef.current || hasNavigatedRef.current) return;

    const now = performance.now();
    if (now - lastCheckRef.current < CHECK_INTERVAL_MS) return;
    lastCheckRef.current = now;

    const knob = splineRef.current.findObjectByName(SLIDER_KNOB_NAME);
    if (!knob) return;

    const currentX = knob.position.x;
    console.log("Slider Position X:", currentX);

    const shouldTrigger =
      SLIDER_THRESHOLD >= 0 ? currentX >= SLIDER_THRESHOLD : currentX <= SLIDER_THRESHOLD;

    if (shouldTrigger) {
      triggerNavigation();
    }
  }

  function triggerNavigation() {
    if (hasNavigatedRef.current) return;
    hasNavigatedRef.current = true;
    setIsNavigating(true);

    setTimeout(() => {
      router.push('/navigation');
    }, NAVIGATION_DELAY_MS);
  }

  useEffect(() => {
    setIsOnline(navigator.onLine);
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    const timeoutId = window.setTimeout(() => {
      setLoadingTooLong(true);
    }, LOADING_TIMEOUT_MS);

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
      window.clearTimeout(timeoutId);
      if (debugIntervalRef.current !== null) {
        window.clearInterval(debugIntervalRef.current);
        debugIntervalRef.current = null;
      }
    };
  }, []);

  return (
    <main className="h-screen w-screen bg-black relative overflow-hidden">
      {!isSplineReady && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-black/70">
          <div className="w-full max-w-md px-6 text-center">
            <div className="mx-auto mb-6 h-[2px] w-40 overflow-hidden rounded-full bg-white/10">
              <motion.div
                animate={{ x: [-160, 160] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
                className="h-full w-full bg-gradient-to-r from-transparent via-white/70 to-transparent"
              />
            </div>
            <p className="text-white/80 text-xs tracking-[0.4em] uppercase">
              Loading Spline Scene
            </p>
            {!isOnline && (
              <p className="mt-4 text-[11px] text-white/60">
                You appear to be offline. Reconnect to load the scene.
              </p>
            )}
            {loadingTooLong && isOnline && (
              <p className="mt-4 text-[11px] text-white/60">
                Still loading. Please check your network or try refreshing.
              </p>
            )}
          </div>
        </div>
      )}

      <motion.div
        animate={{
          opacity: isNavigating ? 0 : 1,
          scale: isNavigating ? 1.1 : 1,
          filter: isNavigating ? "blur(10px)" : "blur(0px)",
        }}
        transition={{ duration: 1.8, ease: "easeInOut" }}
        className="w-full h-full"
      >
        <Spline
          scene="https://prod.spline.design/BODImB9L5wO12slK/scene.splinecode"
          onLoad={onLoad}
          onMouseUp={handleSliderCheck}
          onMouseMove={handleSliderCheck}
        />
      </motion.div>

      {!isNavigating && (
        <div className="absolute bottom-12 w-full flex flex-col items-center pointer-events-none">
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-white font-mono text-[10px] tracking-[0.6em] uppercase opacity-40"
          >
            Terminal Interface v1.0.4
          </motion.p>
          <div className="w-32 h-[1px] bg-white/20 mt-4 overflow-hidden">
            <motion.div
              animate={{ x: [-128, 128] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-full h-full bg-gradient-to-r from-transparent via-white/40 to-transparent"
            />
          </div>
        </div>
      )}

      {DEBUG_PANEL && (
        <div className="absolute left-6 top-6 z-40 rounded-xl border border-white/15 bg-black/60 px-4 py-3 text-[11px] font-mono uppercase tracking-[0.2em] text-white/70">
          <div>Slider Name: {SLIDER_KNOB_NAME}</div>
          <div>Found: {debugInfo.found ? 'Yes' : 'No'}</div>
          <div>X: {debugInfo.x.toFixed(2)}</div>
          <div>Threshold: {SLIDER_THRESHOLD}</div>
          <div>Mode: {SLIDER_THRESHOLD >= 0 ? '>= threshold' : '<= threshold'}</div>
          <div className="mt-2 text-white/50">Candidates:</div>
          {debugInfo.candidates.map((item) => (
            <div key={item.name} className="text-white/50">
              {item.name}: {item.found ? item.x.toFixed(2) : 'NA'}
            </div>
          ))}
        </div>
      )}

      <AnimatePresence>
        {isNavigating && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="absolute inset-0 z-50 bg-black flex flex-col items-center justify-center"
          >
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: "240px" }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="h-[1px] bg-white/60 mb-6"
            />
            <motion.p
              initial={{ opacity: 0, letterSpacing: "1em" }}
              animate={{ opacity: 1, letterSpacing: "0.4em" }}
              transition={{ duration: 1.4, ease: "easeInOut" }}
              className="text-white font-thin text-sm uppercase"
            >
              Initializing Navigation
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
