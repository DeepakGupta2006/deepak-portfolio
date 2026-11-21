import { ReactNode, useState } from "react";
import { motion } from "framer-motion";
import { FiPhoneCall, FiCopy, FiCheck } from "react-icons/fi";
import {
  FaEnvelope,
  FaGithub,
  FaLinkedin,
  FaInstagram,
  FaWhatsapp,
} from "react-icons/fa";
import { HiMapPin } from "react-icons/hi2";

/* ===== Edit your details here ===== */
const EMAIL = "dg7842661@gmail.com";
const PHONE = "+91 8806627054";
const LOCATION = "Bhiwandi, Maharashtra, India";

const socials: { label: string; href: string; icon: ReactNode }[] = [
  { label: "GitHub", href: "https://github.com/DeepakGupta2006", icon: <FaGithub /> },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/deepak-gupta-821945296",
    icon: <FaLinkedin />,
  },
  { label: "Instagram", href: "https://instagram.com/deepakkk____21", icon: <FaInstagram /> },
  { label: "WhatsApp", href: "https://wa.me/918806627054", icon: <FaWhatsapp /> },
];

function Row({
  icon,
  label,
  value,
  href,
  copyValue,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href?: string;
  copyValue?: string;
}) {
  const [copied, setCopied] = useState(false);

  const copy = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    navigator.clipboard.writeText(copyValue || value);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const inner = (
    <>
      <span
        className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl text-xl"
        style={{
          background: "linear-gradient(135deg, var(--pc-btn-from), var(--pc-btn-to))",
          color: "var(--pc-btn-text)",
        }}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1 text-left">
        <span className="block text-xs font-bold uppercase tracking-widest t-muted">
          {label}
        </span>
        <span className="block truncate text-base font-bold t-text sm:text-lg">{value}</span>
      </span>
      {copyValue && (
        <button
          type="button"
          onClick={copy}
          title="Copy to clipboard"
          aria-label={`Copy ${label}`}
          className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border b-line t-muted transition hover:text-[color:var(--accent)]"
        >
          {copied ? <FiCheck className="text-emerald-400" /> : <FiCopy />}
        </button>
      )}
    </>
  );

  const cls = "prow flex items-center gap-4 px-5 py-4";
  return href ? (
    <a href={href} className={`${cls} transition hover:-translate-y-0.5`}>
      {inner}
    </a>
  ) : (
    <div className={cls}>{inner}</div>
  );
}

function Contact() {
  return (
    <section
      id="contact"
      className="relative flex min-h-screen flex-col justify-between px-6 pb-12 pt-24"
    >
      <div className="mx-auto my-auto w-full max-w-3xl">
        {/* Section pill */}
        <div className="mb-10 flex items-center justify-center gap-4">
          <span className="sec-line" />
          <h2 className="sec-pill font-display text-sm sm:text-base">Contact</h2>
          <span className="sec-line r" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.55 }}
          className="pcard p-6 text-center sm:p-12"
        >
          <div className="pchip mb-5 inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
            <span className="relative flex h-2.5 w-2.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-70" />
              <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
            </span>
            Open to work
          </div>

          <h3 className="font-display text-4xl font-bold t-text sm:text-5xl">
            Let's Connect!
          </h3>
          <p className="mx-auto mt-4 max-w-xl text-sm leading-relaxed t-muted sm:text-base">
            Open for full-stack internships, freelance projects, and software
            engineering collaborations. Reach out directly and let's build
            something great!
          </p>

          <div className="mx-auto mt-9 max-w-xl space-y-4">
            <Row
              icon={<FaEnvelope />}
              label="Email me"
              value={EMAIL}
              href={`mailto:${EMAIL}`}
              copyValue={EMAIL}
            />
            <Row
              icon={<FiPhoneCall />}
              label="Call me"
              value={PHONE}
              href={`tel:${PHONE.replace(/\s/g, "")}`}
              copyValue={PHONE}
            />
            <Row icon={<HiMapPin />} label="Location" value={LOCATION} />
          </div>

          <p className="mt-10 text-xs font-bold uppercase tracking-[0.25em] t-muted">
            Find me on
          </p>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-3">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noreferrer"
                className="pbtn-line"
              >
                <span className="text-lg">{s.icon}</span>
                <span>{s.label}</span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>

    </section>
  );
}

export default Contact;
