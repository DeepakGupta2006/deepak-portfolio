import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const links = [
  { href: "#home", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#skills", label: "Skills" },
  { href: "#projects", label: "Projects" },
  { href: "#resume", label: "Resume" },
  { href: "#contact", label: "Contact" },
];

function Navbar() {
  const [active, setActive] = useState<string>("#home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", handleScroll);

    const sections = links
      .map((link) => document.querySelector<HTMLElement>(link.href))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActive(`#${entry.target.id}`);
          }
        });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => {
      observer.disconnect();
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-5 inset-x-0 z-50 flex justify-center px-4 pointer-events-none"
    >
      <nav
        className={`pointer-events-auto flex items-center gap-2 md:gap-5 rounded-full px-3 md:px-6 py-2.5 transition-all duration-500 ${
          scrolled
            ? "bg-[#080d1a]/85 backdrop-blur-xl border border-cyan-500/30 shadow-[0_10px_35px_-10px_rgba(6,182,212,0.35)]"
            : "bg-slate-900/50 backdrop-blur-md border border-white/10"
        }`}
      >
        {/* Brand Monogram */}
        <a
          href="#home"
          className="hidden sm:flex items-center gap-1.5 pr-2 font-display font-bold text-lg tracking-wider text-white group"
        >
          <span className="text-cyan-400 transition-transform duration-300 group-hover:-translate-x-0.5">
            &lt;
          </span>
          <span>D</span>
          <span className="text-indigo-400 transition-transform duration-300 group-hover:translate-x-0.5">
            /&gt;
          </span>
        </a>

        {/* Navigation Links with Sliding Pill */}
        <ul className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm font-medium">
          {links.map((link) => {
            const isActive = active === link.href;
            return (
              <li key={link.href} className="relative">
                <a
                  href={link.href}
                  onClick={() => setActive(link.href)}
                  className={`relative z-10 block px-3 py-1.5 rounded-full transition-colors duration-300 ${
                    isActive
                      ? "text-white font-semibold"
                      : "text-slate-400 hover:text-cyan-300"
                  }`}
                >
                  {link.label}
                </a>

                {isActive && (
                  <motion.span
                    layoutId="activeNavbarPill"
                    transition={{ type: "spring", stiffness: 380, damping: 30 }}
                    className="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-500/25 to-indigo-500/25 border border-cyan-400/40 shadow-[0_0_15px_rgba(34,211,238,0.35)]"
                  />
                )}
              </li>
            );
          })}
        </ul>

        {/* Quick CTA Button */}
        <a
          href="#contact"
          className="hidden md:inline-flex items-center gap-1.5 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-4 py-1.5 text-xs font-semibold text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] transition-all duration-300 hover:scale-105 hover:shadow-[0_0_25px_rgba(99,102,241,0.6)]"
        >
          <span className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
          Hire Me
        </a>
      </nav>
    </motion.header>
  );
}

export default Navbar;