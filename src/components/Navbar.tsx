import { useEffect, useState } from "react";

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

  useEffect(() => {
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
    return () => observer.disconnect();
  }, []);

  return (
    <nav className="fixed top-4 left-4 z-50">
      <ul className="flex gap-2 md:gap-6 bg-black/80 backdrop-blur border border-cyan-500 rounded-2xl px-4 md:px-6 py-3 md:py-4 text-sm md:text-base">
        {links.map((link) => (
          <li key={link.href}>
            <a
              href={link.href}
              className={`transition-colors duration-300 ${
                active === link.href
                  ? "text-cyan-400 font-bold drop-shadow-[0_0_8px_#00e5ff]"
                  : "text-gray-300 hover:text-cyan-400"
              }`}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Navbar;
