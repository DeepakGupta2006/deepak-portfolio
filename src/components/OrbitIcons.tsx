import { motion } from "framer-motion";
import { ReactNode } from "react";

export interface OrbitItem {
  icon: ReactNode;
  glow: string;
}

interface OrbitIconsProps {
  items: OrbitItem[];
  radius?: number;
  duration?: number;
  reverse?: boolean;
  iconSize?: number;
}

function OrbitIcons({
  items,
  radius = 260,
  duration = 20,
  reverse = false,
  iconSize = 64,
}: OrbitIconsProps) {
  const direction = reverse ? -360 : 360;

  return (
    <motion.div
      className="absolute top-1/2 left-1/2 pointer-events-none"
      style={{ width: 0, height: 0 }}
      animate={{ rotate: direction }}
      transition={{ repeat: Infinity, duration, ease: "linear" }}
    >
      {items.map((item, index) => {
        const angle = (360 / items.length) * index;

        return (
          <div
            key={index}
            className="absolute top-0 left-0"
            style={{
              transform: `rotate(${angle}deg) translate(${radius}px) rotate(${-angle}deg)`,
            }}
          >
            {/* Counter-rotate the glass orb so the icon stays upright */}
            <motion.div
              animate={{ rotate: -direction }}
              transition={{ repeat: Infinity, duration, ease: "linear" }}
              whileHover={{ scale: 1.2 }}
              className="pointer-events-auto flex items-center justify-center rounded-2xl bg-slate-900/75 backdrop-blur-md border border-white/10 transition-shadow duration-300"
              style={{
                width: iconSize,
                height: iconSize,
                marginLeft: -iconSize / 2,
                marginTop: -iconSize / 2,
                boxShadow: `0 0 22px -4px ${item.glow}55, inset 0 0 12px ${item.glow}22`,
                borderColor: `${item.glow}40`,
              }}
            >
              <div style={{ filter: `drop-shadow(0 0 8px ${item.glow}99)` }}>
                {item.icon}
              </div>
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}

export default OrbitIcons;