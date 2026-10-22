import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { FiPhoneCall, FiCopy, FiCheck, FiArrowUpRight } from "react-icons/fi";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

interface ContactCard {
  href: string;
  glow: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  copyValue?: string;
  external?: boolean;
}

const cards: ContactCard[] = [
  {
    href: "mailto:dg7842661@gmail.com",
    glow: "#06b6d4",
    icon: <FaEnvelope className="text-cyan-400 text-2xl" />,
    title: "Email",
    subtitle: "dg7842661@gmail.com",
    copyValue: "dg7842661@gmail.com",
  },
  {
    href: "tel:+918806627054",
    glow: "#10b981",
    icon: <FiPhoneCall className="text-emerald-400 text-2xl" />,
    title: "Phone",
    subtitle: "+91 8806627054",
    copyValue: "+91 8806627054",
  },
  {
    href: "https://github.com/DeepakGupta2006",
    glow: "#a855f7",
    icon: <FaGithub className="text-purple-400 text-2xl" />,
    title: "GitHub",
    subtitle: "github.com/DeepakGupta2006",
    external: true,
  },
  {
    href: "https://www.linkedin.com/in/deepak-gupta-821945296",
    glow: "#3b82f6",
    icon: <FaLinkedin className="text-blue-400 text-2xl" />,
    title: "LinkedIn",
    subtitle: "Connect professionally",
    external: true,
  },
  {
    href: "https://instagram.com/deepakkk____21",
    glow: "#ec4899",
    icon: <FaInstagram className="text-pink-400 text-2xl" />,
    title: "Instagram",
    subtitle: "@deepakkk____21",
    external: true,
  },
  {
    href: "https://wa.me/918806627054",
    glow: "#22c55e",
    icon: <FaWhatsapp className="text-green-400 text-2xl" />,
    title: "WhatsApp",
    subtitle: "Chat with me directly",
    external: true,
  },
];

function Contact() {
  const [copiedTitle, setCopiedTitle] = useState<string | null>(null);

  const handleCopy = (e: React.MouseEvent, title: string, value: string) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(value);
    setCopiedTitle(title);
    setTimeout(() => setCopiedTitle(null), 2000);
  };

  return (
    <section
      id="contact"
      className="relative min-h-screen flex flex-col justify-between px-6 pt-24 pb-12"
    >
      <div className="max-w-5xl w-full mx-auto my-auto">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-cyan-300 mb-3">
            <HiSparkles className="text-cyan-400" />
            <span>Let's Connect</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            Get In <span className="text-gradient-cyber">Touch</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Open for full-stack internships, freelance projects, and software
            engineering collaborations. Reach out through any channel below!
          </p>
        </div>

        {/* Contact Bento Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {cards.map((card, index) => (
            <motion.a
              key={card.title}
              href={card.href}
              target={card.external ? "_blank" : undefined}
              rel={card.external ? "noreferrer" : undefined}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.06 }}
              whileHover={{ y: -6 }}
              className="group glass-panel glass-panel-hover rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between"
            >
              {/* Ambient Corner Glow */}
              <div
                className="pointer-events-none absolute -bottom-10 -right-10 h-28 w-28 rounded-full opacity-0 group-hover:opacity-25 transition-opacity duration-500 blur-2xl"
                style={{ backgroundColor: card.glow }}
              />

              <div className="flex items-start justify-between">
                <div
                  className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/90 border border-white/10 transition-transform duration-300 group-hover:scale-110"
                  style={{ boxShadow: `0 0 20px -4px ${card.glow}55` }}
                >
                  {card.icon}
                </div>

                {card.copyValue ? (
                  <button
                    onClick={(e) => handleCopy(e, card.title, card.copyValue!)}
                    title="Copy to clipboard"
                    className="inline-flex items-center gap-1.5 rounded-full bg-slate-900/80 border border-white/10 px-3 py-1 text-xs font-mono text-slate-300 hover:border-cyan-400/50 hover:text-cyan-300 transition"
                  >
                    {copiedTitle === card.title ? (
                      <>
                        <FiCheck className="text-emerald-400" />
                        <span className="text-emerald-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <FiCopy />
                        <span>Copy</span>
                      </>
                    )}
                  </button>
                ) : (
                  <span className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-900/60 border border-white/10 text-slate-400 group-hover:text-cyan-300 group-hover:border-cyan-400/40 transition">
                    <FiArrowUpRight />
                  </span>
                )}
              </div>

              <div className="mt-6">
                <h3 className="font-display text-xl font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {card.title}
                </h3>
                <p className="text-sm text-slate-400 mt-1 truncate">
                  {card.subtitle}
                </p>
              </div>
            </motion.a>
          ))}
        </div>
      </div>

      {/* Sleek Bottom Footer */}
      <footer className="max-w-6xl w-full mx-auto mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500 font-mono">
        <p>© {new Date().getFullYear()} Deepak R. Gupta. All rights reserved.</p>
        <p className="text-slate-400">
          Crafted with <span className="text-cyan-400">React</span>,{" "}
          <span className="text-indigo-400">TypeScript</span> &{" "}
          <span className="text-purple-400">Framer Motion</span>
        </p>
      </footer>
    </section>
  );
}

export default Contact;