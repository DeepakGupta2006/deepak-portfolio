import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FaReact, FaNodeJs, FaJava } from "react-icons/fa";
import {
  SiMongodb,
  SiPython,
  SiFlutter,
  SiFlask,
  SiJavascript,
  SiTypescript,
} from "react-icons/si";
import { HiOutlineArrowDown, HiSparkles } from "react-icons/hi2";
import OrbitIcons, { OrbitItem } from "./OrbitIcons";
import TypedRole from "./TypedRole";

const innerRing: OrbitItem[] = [
  { icon: <FaReact className="text-cyan-400 text-3xl md:text-4xl" />, glow: "#06b6d4" },
  { icon: <SiMongodb className="text-emerald-400 text-3xl md:text-4xl" />, glow: "#10b981" },
  { icon: <FaNodeJs className="text-green-500 text-3xl md:text-4xl" />, glow: "#22c55e" },
  { icon: <SiTypescript className="text-blue-400 text-3xl md:text-4xl" />, glow: "#3b82f6" },
];

const outerRing: OrbitItem[] = [
  { icon: <SiPython className="text-[#38bdf8] text-4xl md:text-5xl" />, glow: "#38bdf8" },
  { icon: <SiFlutter className="text-cyan-400 text-4xl md:text-5xl" />, glow: "#06b6d4" },
  { icon: <SiFlask className="text-slate-100 text-4xl md:text-5xl" />, glow: "#e2e8f0" },
  { icon: <SiJavascript className="text-yellow-400 text-4xl md:text-5xl" />, glow: "#facc15" },
  { icon: <FaJava className="text-orange-500 text-4xl md:text-5xl" />, glow: "#f97316" },
];

function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [12, -12]), {
    stiffness: 120,
    damping: 18,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-12, 12]), {
    stiffness: 120,
    damping: 18,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = wrapperRef.current?.getBoundingClientRect();
    if (!rect) return;
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    mouseX.set(0);
    mouseY.set(0);
  };

  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={wrapperRef}
      style={{ perspective: 1200 }}
    >
      {/* Center Radial Cyber Core Glow */}
      <div className="pointer-events-none absolute h-[450px] w-[450px] rounded-full bg-gradient-to-tr from-cyan-500/15 via-indigo-500/15 to-purple-500/10 blur-[110px]" />

      {/* Dual-toned Starfield Background */}
      <div
        className="absolute inset-0 opacity-60 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 12% 22%, #22d3ee 1px, transparent 2px),
            radial-gradient(circle at 28% 62%, #818cf8 1.5px, transparent 2.5px),
            radial-gradient(circle at 52% 14%, #22d3ee 1px, transparent 2px),
            radial-gradient(circle at 74% 72%, #c084fc 1.5px, transparent 2.5px),
            radial-gradient(circle at 88% 28%, #22d3ee 1px, transparent 2px),
            radial-gradient(circle at 18% 84%, #818cf8 2px, transparent 3px),
            radial-gradient(circle at 82% 88%, #22d3ee 1.5px, transparent 2.5px),
            radial-gradient(circle at 42% 8%, #22d3ee 1px, transparent 2px),
            radial-gradient(circle at 64% 56%, #818cf8 1px, transparent 2px),
            radial-gradient(circle at 35% 35%, #22d3ee 1.5px, transparent 2.5px)
          `,
          backgroundSize: "100% 100%",
        }}
      />

      {/* 3D Tilting Stage: Orbiting Rings + Hero Content */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{
          width: 720,
          height: 720,
          maxWidth: "92vw",
          maxHeight: "92vw",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Decorative Orbital Track Circles */}
        <div
          className="pointer-events-none absolute rounded-full border border-dashed border-cyan-500/20"
          style={{ width: 380, height: 380, maxWidth: "62vw", maxHeight: "62vw" }}
        />
        <div
          className="pointer-events-none absolute rounded-full border border-indigo-500/15 shadow-[inset_0_0_40px_rgba(99,102,241,0.06)]"
          style={{ width: 600, height: 600, maxWidth: "88vw", maxHeight: "88vw" }}
        />

        {/* Outer Ring - Slower, Reverse Direction */}
        <OrbitIcons items={outerRing} radius={300} duration={28} reverse iconSize={68} />

        {/* Inner Ring - Faster, Forward Direction */}
        <OrbitIcons items={innerRing} radius={190} duration={18} iconSize={56} />

        {/* Center Hero Anchor */}
        <div
          className="z-10 flex flex-col items-center text-center px-4"
          style={{ transform: "translateZ(75px)" }}
        >
          {/* Status Pill */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="mb-4 inline-flex items-center gap-2 rounded-full bg-slate-900/80 border border-cyan-500/30 px-3.5 py-1 text-xs font-mono text-cyan-300 backdrop-blur-md shadow-[0_0_20px_rgba(6,182,212,0.2)]"
          >
            <HiSparkles className="text-cyan-400 animate-spin" style={{ animationDuration: "4s" }} />
            <span>Building Scalable Digital Experiences</span>
          </motion.div>

          {/* Main Name Heading */}
          <motion.h1
            animate={{ scale: [1, 1.025, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            className="font-display text-6xl sm:text-7xl md:text-8xl font-extrabold tracking-wider bg-gradient-to-b from-white via-slate-100 to-cyan-200 bg-clip-text text-transparent"
            style={{
              filter: "drop-shadow(0 0 25px rgba(6, 182, 212, 0.45))",
            }}
          >
            DEEPAK
          </motion.h1>

          {/* Typed Role Subtitle */}
          <div className="mt-3 text-lg sm:text-2xl md:text-3xl font-bold tracking-wide">
            <TypedRole />
          </div>

          {/* Hero Action Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="mt-7 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
          >
            <a
              href="#projects"
              className="group relative inline-flex items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(6,182,212,0.45)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_35px_rgba(99,102,241,0.65)]"
            >
              <span>View Projects</span>
              <HiOutlineArrowDown className="transition-transform duration-300 group-hover:translate-y-0.5" />
            </a>

            <a
              href="#resume"
              className="inline-flex items-center gap-2 rounded-full bg-slate-900/75 border border-white/15 px-6 py-2.5 text-sm font-semibold text-slate-200 backdrop-blur-md transition-all duration-300 hover:border-cyan-400/50 hover:text-cyan-300 hover:bg-slate-800/80"
            >
              <span>Resume</span>
            </a>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom Scroll Prompt */}
      <motion.a
        href="#about"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-cyan-400 transition-colors"
      >
        <span className="text-[10px]">Scroll</span>
        <HiOutlineArrowDown className="text-base text-cyan-400" />
      </motion.a>
    </section>
  );
}

export default Home;