import { useEffect, useState } from "react";
import ThemeToggle from "./ThemeToggle";

const items = [  " ","",    "About", "Skills", "Projects", "Resume", "Contact"];

export default function Navbar() {
  const [active, setActive] = useState("Home");

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const name = items.find(
              (i) => i.toLowerCase() === entry.target.id
            );
            if (name) setActive(name);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    items.forEach((i) => {
      const el = document.getElementById(i.toLowerCase());
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <header className="fixed left-1/2 top-4 z-50 -translate-x-1/2">
      <nav className="nav-pill flex max-w-[calc(100vw-1rem)] items-center gap-1 overflow-x-auto whitespace-nowrap rounded-full px-3 py-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {/* Logo: first letter "D" in its own color (changes with the theme) */}
        <a
  href="#home"
  className="t-text shrink-0 px-3 text-2xl font-black tracking-tight"
  style={{ WebkitTextStroke: "0.8px currentColor" }}
>
  <span
    className="text-3xl font-black"
    style={{ color: "var(--logo-d)", WebkitTextStroke: "0.8px var(--logo-d)" }}
  >
    D
  </span>
  eepak<span className="t-accent"></span>
</a>

        {items.map((item) => (
          <a
            key={item}
            href={`#${item.toLowerCase()}`}
            onClick={() => setActive(item)}
            className={`shrink-0 rounded-full px-4 py-1.5 text-sm font-medium transition ${
              active === item ? "nav-active" : "t-muted hover:opacity-80"
            }`}
          >
            {item}
          </a>
        ))}


        <ThemeToggle />
      </nav>
    </header>
  );
}