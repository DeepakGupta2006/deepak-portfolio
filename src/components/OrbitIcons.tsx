import { motion } from "framer-motion";
import { ReactNode } from "react";

export interface OrbitItem {
  icon: ReactNode;
  glow: string; // hex/css color used for the drop-shadow glow
}

interface OrbitIconsProps {
  items: OrbitItem[];
  radius?: number; // distance from center in px
  duration?: number; // seconds per full revolution
  reverse?: boolean; // spin direction
  iconSize?: number; // px, wrapper box size for each icon
}

/**
 * Places `items` evenly around a circle of `radius` px and spins the whole
 * ring forever. Each icon is counter-rotated at the same speed so it stays
 * upright while it travels around the ring, instead of spinning in place.
 */
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
      className="absolute top-1/2 left-1/2"
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
            {/* counter-rotate the icon itself so it never appears upside down */}
            <motion.div
              animate={{ rotate: -direction }}
              transition={{ repeat: Infinity, duration, ease: "linear" }}
              className="flex items-center justify-center"
              style={{
                width: iconSize,
                height: iconSize,
                marginLeft: -iconSize / 2,
                marginTop: -iconSize / 2,
                filter: `drop-shadow(0 0 12px ${item.glow})`,
              }}
            >
              {item.icon}
            </motion.div>
          </div>
        );
      })}
    </motion.div>
  );
}

export default OrbitIcons;
