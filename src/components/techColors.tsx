import type { CSSProperties } from "react";

/* =====================================================================
   TECH CHIP COLOURS
   Add / change a technology colour here. Name match is case-insensitive.
   Chips adapt automatically to Light / Dark / Realistic (see .tchip in index.css).
   ===================================================================== */
const COLORS: Record<string, string> = {
  react: "#61dafb",
  "react.js": "#61dafb",
  "node.js": "#6cc24a",
  node: "#6cc24a",
  mongodb: "#47a248",
  express: "#a3a3a3",
  "express.js": "#a3a3a3",
  python: "#4b8bbe",
  java: "#f89820",
  c: "#6c9bd2",
  streamlit: "#ff4b4b",
  pdfplumber: "#f59e0b",
  nlp: "#a78bfa",
  flask: "#94a3b8",
  "scikit-learn": "#f7931e",
  pandas: "#8b5cf6",
  "faster-whisper": "#22d3ee",
  ollama: "#a8b0bd",
  sounddevice: "#f472b6",
  psutil: "#34d399",
  vite: "#a855f7",
  "tailwind css": "#38bdf8",
  jwt: "#d946ef",
  razorpay: "#3395ff",
  cloudinary: "#6366f1",
  fastapi: "#14b8a6",
  go: "#00add8",
  "next.js": "#94a3b8",
  typescript: "#3178c6",
  javascript: "#facc15",
  redis: "#ef4444",
  postgresql: "#4f8bc9",
  mysql: "#00758f",
  docker: "#2496ed",
  tensorflow: "#ff9800",
  stripe: "#635bff",
  "data structures": "#f472b6",
  algorithms: "#fbbf24",
  pointers: "#fb7185",
  memory: "#a78bfa",
};

export function techColor(name: string): string {
  const hit = COLORS[name.trim().toLowerCase()];
  if (hit) return hit;
  let h = 0;
  for (const ch of name) h = (h * 31 + ch.charCodeAt(0)) % 360;
  return `hsl(${h} 70% 60%)`;
}

export function TechChip({
  t,
  small = false,
  className = "",
}: {
  t: string;
  small?: boolean;
  className?: string;
}) {
  return (
    <span
      className={`tchip ${small ? "tchip-sm" : ""} ${className}`}
      style={{ ["--tc" as string]: techColor(t) } as CSSProperties}
    >
      {t}
    </span>
  );
}
