import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FaReact, FaNodeJs, FaJava } from "react-icons/fa";
import { SiMongodb, SiPython, SiFlutter, SiFlask, SiJavascript, SiTypescript } from "react-icons/si";
import OrbitIcons, { OrbitItem } from "./OrbitIcons";
import TypedRole from './TypedRole'

const innerRing: OrbitItem[] = [
  { icon: <FaReact className="text-cyan-400 text-4xl" />, glow: "#00e5ff" },
  { icon: <SiMongodb className="text-green-400 text-4xl" />, glow: "#00ff88" },
  { icon: <FaNodeJs className="text-green-500 text-4xl" />, glow: "#00ff88" },
  { icon: <SiTypescript className="text-blue-400 text-4xl" />, glow: "#3b82f6" },
];

const outerRing: OrbitItem[] = [
  { icon: <SiPython className="text-[#3776AB] text-5xl" />, glow: "#3776AB" },
  { icon: <SiFlutter className="text-cyan-400 text-5xl" />, glow: "#00e5ff" },
  { icon: <SiFlask className="text-white text-5xl" />, glow: "#ffffff" },
  { icon: <SiJavascript className="text-yellow-400 text-5xl" />, glow: "#ffd700" },
  { icon: <FaJava className="text-orange-500 text-5xl" />, glow: "#F89820" },
];

function Home() {
  const wrapperRef = useRef<HTMLDivElement>(null);

  // raw mouse position inside the hero, converted into a subtle 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]), {
    stiffness: 120,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]), {
    stiffness: 120,
    damping: 15,
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
      className="min-h-screen bg-black text-white flex items-center justify-center relative overflow-hidden"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      ref={wrapperRef}
      style={{ perspective: 1200 }}
    >
      {/* Cyan star field background */}
      <div
        className="absolute inset-0 opacity-70 pointer-events-none"
        style={{
          backgroundImage: `
            radial-gradient(circle at 10% 20%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 15% 20%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 30% 60%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 50% 15%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 70% 70%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 90% 30%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 20% 85%, #00e5ff 2px, transparent 3px),
            radial-gradient(circle at 80% 90%, #00e5ff 2px, transparent 3px),
            radial-gradient(circle at 16.5% 33.1%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 53.4% 9.0%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 89.3% 57.9%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 43.6% 5.6%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 54.9% 25.1%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 13.9% 81.4%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 58.0% 62.5%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 40.1% 57.4%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 84.4% 6.5%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 53.9% 42.2%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 67.5% 55.8%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 63.3% 57.8%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 70.4% 11.4%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 49.7% 61.4%, #00e5ff 2px, transparent 3px),
            radial-gradient(circle at 46.7% 76.6%, #00e5ff 2px, transparent 3px),
            radial-gradient(circle at 25.8% 36.7%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 25.4% 69.1%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 86.0% 52.4%, #00e5ff 2px, transparent 3px),
            radial-gradient(circle at 96.1% 29.6%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 17.8% 51.1%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 48.9% 16.6%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 9.5% 94.4%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 35.6% 34.7%, #00e5ff 2px, transparent 3px),
            radial-gradient(circle at 45.8% 57.7%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 47.5% 92.7%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 69.3% 7.8%, #00e5ff 2px, transparent 3px),
            radial-gradient(circle at 39.0% 29.3%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 46.3% 4.2%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 49.4% 60.6%, #00e5ff 1px, transparent 2px),
            radial-gradient(circle at 14.4% 75.8%, #00e5ff 1px, transparent 2px)
          `,
          backgroundSize: "100% 100%",
        }}
      />
      
      {/* 3D tilting stage: name + orbiting icons */}
      <motion.div
        className="relative flex items-center justify-center"
        style={{
          width: 700,
          height: 700,
          maxWidth: "90vw",
          maxHeight: "90vw",
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
      >
        {/* Outer ring - slower, reverse direction */}
        <OrbitIcons items={outerRing} radius={300} duration={26} reverse iconSize={72} />

        {/* Inner ring - faster, forward direction */}
        <OrbitIcons items={innerRing} radius={190} duration={16} iconSize={60} />

        {/* Center content: the name itself gently pulses so it reads as
            the anchor the icons revolve around */}
        <div className="z-10 text-center px-4" style={{ transform: "translateZ(60px)" }}>
          <motion.h1
            animate={{ scale: [1, 1.03, 1] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="text-6xl md:text-8xl font-extrabold tracking-widest text-white"
            style={{
              textShadow: "0 0 10px #00e5ff, 0 0 30px #00e5ff, 0 0 60px #00e5ff",
            }}
          >
            DEEPAK
          </motion.h1>

<div className="text-2xl md:text-3xl font-bold uppercase tracking-wide mt-2">
  <TypedRole />
</div>
        </div>
      </motion.div>
    </section>
  );
}

export default Home;
