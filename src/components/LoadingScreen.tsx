import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [percent, setPercent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setPercent((p) => {
        if (p >= 100) {
          clearInterval(interval);
          return 100;
        }
        return p + Math.floor(Math.random() * 9) + 3;
      });
    }, 110);
    return () => clearInterval(interval);
  }, []);

  const clamped = Math.min(percent, 100);

  const getStatusText = () => {
    if (clamped < 40) return "Initializing Core...";
    if (clamped < 85) return "Loading Modules...";
    if (clamped < 100) return "Configuring UI...";
    return "System Ready";
  };

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05, filter: "blur(10px)" }}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#050811] overflow-hidden"
    >
      {/* Background Radial Glow */}
      <div className="pointer-events-none absolute h-80 w-80 rounded-full bg-gradient-to-tr from-cyan-500/20 via-indigo-500/15 to-purple-500/10 blur-[100px]" />

      <div className="relative flex flex-col items-center">
        {/* Multi-Ring Cyber Spinner */}
        <div className="relative flex h-36 w-36 items-center justify-center">
          {/* Outer Pulsing Halo */}
          <motion.div
            animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-0 rounded-full border border-cyan-500/20"
          />

          {/* Outer Clockwise Cyan Ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            className="absolute inset-1 rounded-full border-2 border-transparent border-t-cyan-400 border-r-cyan-400/50"
            style={{ filter: "drop-shadow(0 0 12px rgba(34,211,238,0.7))" }}
          />

          {/* Inner Counter-Clockwise Indigo Ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
            className="absolute inset-4 rounded-full border-2 border-transparent border-b-indigo-400 border-l-purple-400/60"
            style={{ filter: "drop-shadow(0 0 10px rgba(99,102,241,0.6))" }}
          />

          {/* Center Glass Core with Percentage */}
          <div className="relative flex h-24 w-24 flex-col items-center justify-center rounded-full bg-slate-900/80 backdrop-blur-md border border-white/10 shadow-inner">
            <span className="font-mono text-2xl font-bold tracking-tight text-white">
              {clamped}
              <span className="bg-gradient-to-r from-cyan-400 to-indigo-400 bg-clip-text text-transparent text-lg">
                %
              </span>
            </span>
          </div>
        </div>

        {/* Sleek Progress Bar */}
        <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-slate-800/80 p-[1px]">
          <motion.div
            className="h-full rounded-full bg-gradient-to-r from-cyan-400 via-indigo-500 to-purple-500"
            initial={{ width: "0%" }}
            animate={{ width: `${clamped}%` }}
            transition={{ ease: "easeOut", duration: 0.2 }}
            style={{ boxShadow: "0 0 12px rgba(34,211,238,0.8)" }}
          />
        </div>

        {/* Dynamic Status Text */}
        <motion.p
          key={getStatusText()}
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-4 font-mono text-[11px] uppercase tracking-[0.35em] text-cyan-300/80"
        >
          {getStatusText()}
        </motion.p>
      </div>
    </motion.div>
  );
}