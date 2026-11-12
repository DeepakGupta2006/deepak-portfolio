import { useMemo } from "react";
import { useTheme } from "../context/ThemeContext";

export default function Background() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const isDark = theme === "dark";
  const isRealistic = theme === "realistic";

  const stars = useMemo(
    () =>
      Array.from({ length: 140 }, (_, i) => ({
        x: Math.random() * 100,
        y: Math.random() * 60,
        r: Math.random() * 1.2 + 0.4,
        o: Math.random() * 0.6 + 0.3,
        twinkle: i % 4 === 0,
        delay: Math.random() * 3,
      })),
    []
  );

  const fade = (on: boolean) =>
    `absolute inset-0 transition-opacity duration-700 ${
      on ? "opacity-100" : "opacity-0"
    }`;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      {/* ============ LIGHT: pastel mesh + soft grid ============ */}
      <div
        className={fade(isLight)}
        style={{
          background: `
            radial-gradient(45% 40% at 12% 12%, rgba(34,211,238,.38), transparent 70%),
            radial-gradient(40% 40% at 88% 18%, rgba(139,92,246,.30), transparent 70%),
            radial-gradient(45% 45% at 75% 92%, rgba(244,114,182,.22), transparent 70%),
            radial-gradient(40% 40% at 8% 88%, rgba(59,130,246,.24), transparent 70%),
            linear-gradient(180deg, #eaf3fb 0%, #f4f0fb 55%, #e4f3f6 100%)
          `,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(15,23,42,.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,.06) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
            WebkitMaskImage:
              "radial-gradient(ellipse at center, #000 40%, transparent 95%)",
            maskImage:
              "radial-gradient(ellipse at center, #000 40%, transparent 95%)",
          }}
        />
      </div>

      {/* ============ DARK: your original obsidian look ============ */}
      <div
        className={fade(isDark)}
        style={{
          background: `
            radial-gradient(60% 40% at 20% 0%, rgba(34,211,238,.10), transparent 70%),
            radial-gradient(50% 40% at 90% 100%, rgba(139,92,246,.12), transparent 70%),
            #050811
          `,
        }}
      >
        <div
          className="absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.025) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.025) 1px, transparent 1px)",
            backgroundSize: "45px 45px",
          }}
        />
      </div>

      {/* ============ REALISTIC: night sky, aurora, moon, mountains ============ */}
      <div
        className={fade(isRealistic)}
        style={{
          background:
            "linear-gradient(180deg,#010414 0%,#06142b 40%,#0a2a3d 75%,#0b3a47 100%)",
        }}
      >
        <svg className="absolute inset-0 h-full w-full">
          {stars.map((s, i) => (
            <circle
              key={i}
              cx={`${s.x}%`}
              cy={`${s.y}%`}
              r={s.r}
              fill="#fff"
              opacity={s.o}
              className={s.twinkle ? "star-twinkle" : ""}
              style={{ animationDelay: `${s.delay}s` }}
            />
          ))}
        </svg>

        <div
          className="aurora-a absolute -left-[10%] top-[5%] h-[55%] w-[120%] opacity-55 mix-blend-screen"
          style={{
            filter: "blur(60px)",
            background:
              "linear-gradient(90deg,transparent,#10b981 25%,#22d3ee 50%,#8b5cf6 75%,transparent)",
          }}
        />
        <div
          className="aurora-b absolute -left-[10%] top-[15%] h-[35%] w-[120%] opacity-35 mix-blend-screen"
          style={{
            filter: "blur(60px)",
            background:
              "linear-gradient(90deg,transparent,#2dd4bf 30%,#a78bfa 60%,transparent)",
          }}
        />

        <div
          className="absolute right-[12%] top-[9%] h-[90px] w-[90px] rounded-full"
          style={{
            background:
              "radial-gradient(circle at 35% 35%,#fff 0%,#e2e8f0 45%,#94a3b8 100%)",
            boxShadow:
              "0 0 60px 20px rgba(226,232,240,.25), 0 0 160px 60px rgba(125,211,252,.15)",
          }}
        />

        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 1440 900"
          preserveAspectRatio="xMidYMax slice"
        >
          <path
            d="M0 640 L140 560 L260 620 L420 500 L560 610 L700 540 L860 630 L1020 520 L1180 610 L1300 560 L1440 620 V900 H0Z"
            fill="#071a2b"
            opacity=".9"
          />
          <path
            d="M0 720 L120 660 L300 730 L480 640 L640 735 L820 660 L1000 740 L1180 670 L1320 730 L1440 690 V900 H0Z"
            fill="#04101c"
          />
          <rect y="760" width="1440" height="140" fill="#06222f" opacity=".85" />
        </svg>

        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,.15) 30%, rgba(0,0,0,.6) 100%)",
          }}
        />
      </div>
    </div>
  );
}