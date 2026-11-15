import { useEffect, useRef } from "react";
import { createLiveEngine } from "./liveScenes";

const FPS = 30;

// Realistic theme: live "Firefly Forest" background
export default function LiveBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const engine = createLiveEngine(canvas);
    engine.init();

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let alive = true;
    let last = performance.now();
    const start = last;

    if (reduce) {
      let t = 0;
      for (let i = 0; i < 90; i++) {
        t += 1 / 30;
        engine.draw(t, 1 / 30);
      }
      engine.post();
      return;
    }

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
      engine.draw((now - start) / 1000, dt);
      engine.post();
    };
    raf = requestAnimationFrame(frame);

    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="live-fade pointer-events-none fixed inset-0 -z-10 bg-black">
      <canvas
        ref={canvasRef}
        width={1280}
        height={720}
        className="h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-black/25" />
    </div>
  );
}
