import { useEffect, useRef, useState } from "react";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { createLiveEngine } from "./liveScenes";

const KEY = "realisticScene";
const FPS = 30;

export default function LiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const engineRef = useRef<ReturnType<typeof createLiveEngine> | null>(null);
  const [names, setNames] = useState<string[]>([]);
  const [scene, setScene] = useState<number>(() => {
    try {
      const v = parseInt(localStorage.getItem(KEY) || "0", 10);
      return Number.isFinite(v) && v >= 0 ? v : 0;
    } catch {
      return 0;
    }
  });
  const sceneRef = useRef(scene);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = createLiveEngine(canvas);
    engineRef.current = engine;
    setNames(engine.names);
    if (sceneRef.current >= engine.count) sceneRef.current = 0;
    setScene(sceneRef.current);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let last = performance.now();
    let start = last;
    let current = -1;
    let alive = true;

    const frame = (now: number) => {
      if (!alive) return;
      raf = requestAnimationFrame(frame);
      if (document.hidden) {
        last = now;
        return;
      }
      if (now - last < 1000 / FPS - 2) return;
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (current !== sceneRef.current) {
        current = sceneRef.current;
        engine.init(current);
        start = now;
      }
      engine.draw(current, (now - start) / 1000, dt);
      engine.post();
    };

    if (reduce) {
      // one still frame, no animation
      engine.init(sceneRef.current);
      let t = 0;
      for (let i = 0; i < 90; i++) {
        t += 1 / 30;
        engine.draw(sceneRef.current, t, 1 / 30);
      }
      engine.post();
    } else {
      raf = requestAnimationFrame(frame);
    }
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  const go = (d: number) => {
    const n = names.length || 1;
    const next = (sceneRef.current + d + n) % n;
    sceneRef.current = next;
    setScene(next);
    try {
      localStorage.setItem(KEY, String(next));
    } catch {
      /* ignore */
    }
  };

  return (
    <>
      <div className="live-fade pointer-events-none fixed inset-0 -z-10 bg-black">
        <canvas
          ref={canvasRef}
          width={1280}
          height={720}
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/35" />
      </div>

      {names.length > 0 && (
        <div className="fixed bottom-4 left-4 z-40 flex items-center gap-1 rounded-full border border-white/15 bg-black/55 px-2 py-1.5 text-xs text-white backdrop-blur-md">
          <button
            aria-label="Previous background"
            onClick={() => go(-1)}
            className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/15"
          >
            <HiChevronLeft />
          </button>
          <span className="min-w-[112px] text-center font-mono">
            {scene + 1}/{names.length} · {names[scene]}
          </span>
          <button
            aria-label="Next background"
            onClick={() => go(1)}
            className="grid h-7 w-7 place-items-center rounded-full hover:bg-white/15"
          >
            <HiChevronRight />
          </button>
        </div>
      )}
    </>
  );
}
