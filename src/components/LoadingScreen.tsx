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
        return p + Math.floor(Math.random() * 8) + 2;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  const clamped = Math.min(percent, 100);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: "easeInOut" }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black"
    >
      <div className="relative flex flex-col items-center">
        {/* rotating ring */}
        <div className="relative h-28 w-28">
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-cyan-soft/20"
          />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "linear" }}
            className="absolute inset-0 rounded-full border-2 border-transparent border-t-cyan-soft border-r-cyan-soft"
            style={{ boxShadow: "0 0 20px rgba(34,211,238,0.5)" }}
          />
          {/* percentage in the middle */}
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-mono text-xl font-bold text-white">
              {clamped}
              <span className="text-cyan-soft">%</span>
            </span>
          </div>
        </div>

        {/* status text */}
        <motion.p
          initial={{ opacity: 0.4 }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.4, repeat: Infinity, ease: "easeInOut" }}
          className="mt-6 font-mono text-[10px] uppercase tracking-[0.4em] text-white/50"
        >
          {clamped < 100 ? "Loading" : "Ready"}
        </motion.p>
      </div>
    </motion.div>
  );
}