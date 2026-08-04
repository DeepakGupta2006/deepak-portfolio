import { ReactNode } from "react";
import { FiPhoneCall } from "react-icons/fi";
import { FaEnvelope, FaGithub, FaLinkedin, FaInstagram, FaWhatsapp } from "react-icons/fa";

interface ContactCard {
  href: string;
  border: string;
  icon: ReactNode;
  title: string;
  subtitle: string;
  external?: boolean;
}

const cards: ContactCard[] = [
  {
    href: "mailto:dg7842661@gmail.com",
    border: "border-cyan-500",
    icon: <FaEnvelope size={40} className="text-cyan-400" />,
    title: "Email",
    subtitle: "dg7842661@gmail.com",
  },
  {
    href: "tel:+918806627054",
    border: "border-green-500",
    icon: <FiPhoneCall size={40} className="text-green-400" />,
    title: "Phone",
    subtitle: "+91 8806627054",
  },
  {
    href: "https://github.com/DeepakGupta2006",
    border: "border-gray-500",
    icon: <FaGithub size={40} />,
    title: "GitHub",
    subtitle: "github.com/DeepakGupta2006",
    external: true,
  },
  {
    href: "https://linkedin.com/in/deepakgupta",
    border: "border-blue-500",
    icon: <FaLinkedin size={40} className="text-blue-500" />,
    title: "LinkedIn",
    subtitle: "Connect professionally",
    external: true,
  },
  {
    href: "https://instagram.com/deepakkk____21",
    border: "border-pink-500",
    icon: <FaInstagram size={40} className="text-pink-500" />,
    title: "Instagram",
    subtitle: "Follow on Instagram",
    external: true,
  },
  {
    href: "https://wa.me/918806627054",
    border: "border-green-500",
    icon: <FaWhatsapp size={35} className="text-green-400" />,
    title: "WhatsApp",
    subtitle: "Chat with me",
    external: true,
  },
];

function Contact() {
  return (
    <section id="contact" className="min-h-screen bg-black text-white px-6 py-20">
      <h1 className="text-6xl text-cyan-400 text-center font-bold mb-20">CONTACT</h1>

      <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-8">
        {cards.map((card, index) => (
          <a
            key={index}
            href={card.href}
            target={card.external ? "_blank" : undefined}
            rel={card.external ? "noreferrer" : undefined}
          >
            <div
              className={`bg-[#0d0d0d] border ${card.border} rounded-3xl p-8 hover:scale-105 transition duration-300`}
            >
              <div className="flex items-center gap-5">
                {card.icon}
                <div>
                  <h2 className="text-3xl font-bold">{card.title}</h2>
                  <p className="text-gray-400">{card.subtitle}</p>
                </div>
              </div>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}

export default Contact;
