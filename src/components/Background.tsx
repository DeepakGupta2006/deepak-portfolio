import LiveBackground from "./LiveBackground";
import { useTheme } from "../context/ThemeContext";

export default function Background() {
  const { theme } = useTheme();
  const isLight = theme === "light";
  const isDark = theme === "dark";
  const isRealistic = theme === "realistic";

  const fade = (on: boolean) =>
    `absolute inset-0 transition-opacity duration-700 ${
      on ? "opacity-100" : "opacity-0"
    }`;

  return (
    <>
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

    </div>
    {isRealistic && <LiveBackground />}
    </>
  );
}
