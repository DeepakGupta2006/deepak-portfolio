import { Sun, Moon, Waves, type LucideIcon } from "lucide-react";
import { useTheme, type Theme } from "../context/ThemeContext";

const options: { id: Theme; icon: LucideIcon; label: string }[] = [
  { id: "light", icon: Sun, label: "Light theme" },
  { id: "dark", icon: Moon, label: "Dark theme" },
  { id: "realistic", icon: Waves, label: "Realistic theme" },
];

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <div className="glass flex items-center gap-1 rounded-full p-1">
      {options.map(({ id, icon: Icon, label }) => {
        const active = theme === id;
        return (
          <button
            key={id}
            type="button"
            onClick={() => setTheme(id)}
            aria-label={label}
            title={label}
            className="grid h-8 w-8 place-items-center rounded-full transition hover:scale-105"
            style={{
              background: active ? "var(--accent)" : "transparent",
              color: active ? "#020617" : "var(--muted)",
              boxShadow: active ? "0 0 14px var(--accent)" : "none",
            }}
          >
            <Icon size={16} />
          </button>
        );
      })}
    </div>
  );
}