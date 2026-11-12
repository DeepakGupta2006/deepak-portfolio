import type { ComponentType } from "react";
import { Mail, Phone } from "lucide-react";
import {
  FaGithub,
  FaLinkedinIn,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";

interface ContactLink {
  icon: ComponentType<{ size?: number | string }>;
  label: string;
  href: string;
}

const links: ContactLink[] = [
  { icon: Mail, label: "Email", href: "mailto:dg7842661@gmail.com" },
  { icon: Phone, label: "Phone", href: "tel:+918806627054" },
  { icon: FaGithub, label: "GitHub", href: "https://github.com/DeepakGupta" },
  { icon: FaLinkedinIn, label: "LinkedIn", href: "https://linkedin.com/in/YOUR_ID" },
  { icon: FaInstagram, label: "Instagram", href: "https://instagram.com/deepakkk___21" },
  { icon: FaWhatsapp, label: "WhatsApp", href: "https://wa.me/918806627054" },
];

export default function ContactRail() {
  return (
    <aside className="fixed right-4 top-1/2 z-40 hidden -translate-y-1/2 md:flex">
      <div className="glass flex flex-col items-center gap-2 rounded-full p-2 shadow-2xl">
        {links.map(({ icon: Icon, label, href }) => (
          <a
            key={label}
            href={href}
            target="_blank"
            rel="noreferrer"
            aria-label={label}
            className="t-muted group relative grid h-10 w-10 place-items-center rounded-full transition hover:scale-110"
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--accent)";
              e.currentTarget.style.color = "#020617";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "";
            }}
          >
            <Icon size={18} />
            <span className="pointer-events-none absolute right-12 whitespace-nowrap rounded-md bg-black/80 px-2 py-1 text-xs text-white opacity-0 transition group-hover:opacity-100">
              {label}
            </span>
          </a>
        ))}
      </div>
    </aside>
  );
}