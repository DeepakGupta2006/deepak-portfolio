import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FaGraduationCap, FaCode, FaAward, FaGithub } from "react-icons/fa";
import { HiSparkles, HiOutlineDocumentText, HiAcademicCap } from "react-icons/hi2";

const highlights = [
  {
    icon: <FaGraduationCap className="text-cyan-400 text-xl" />,
    label: "Education",
    value: "BCA (2024 – 2027)",
    sub: "Tilak Maharashtra Vidyapeeth, Pune",
  },
  {
    icon: <FaAward className="text-indigo-400 text-xl" />,
    label: "Academic Standing",
    value: "8.0 CGPA",
    sub: "Consistent Performer",
  },
  {
    icon: <FaCode className="text-purple-400 text-xl" />,
    label: "Core Focus",
    value: "Full-Stack & DSA",
    sub: "MERN, Java, Python & SQL",
  },
];

function About() {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [14, -14]), {
    stiffness: 150,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-14, 14]), {
    stiffness: 150,
    damping: 15,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <section
      id="about"
      className="relative min-h-screen flex items-center justify-center px-6 py-24 overflow-hidden"
    >
      <div className="max-w-6xl w-full mx-auto grid lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: 3D Holographic Portrait Card (5 cols on desktop) */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-5 flex justify-center"
          style={{ perspective: 1100 }}
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="relative group cursor-pointer"
          >
            {/* Ambient Backlight Glow */}
            <div className="absolute -inset-4 rounded-[2.5rem] bg-gradient-to-tr from-cyan-500/30 via-indigo-500/25 to-purple-500/30 blur-2xl opacity-75 group-hover:opacity-100 transition-opacity duration-500" />

            {/* Main Photo Frame */}
            <div className="float-animation relative w-72 h-80 sm:w-80 sm:h-96 rounded-[2rem] p-[2px] bg-gradient-to-b from-cyan-400 via-indigo-500 to-purple-600 shadow-[0_0_40px_-10px_rgba(6,182,212,0.5)]">
              <div
                className="relative w-full h-full rounded-[calc(2rem-2px)] overflow-hidden"
                style={{ background: "var(--bg)" }}
              >
                <img
                  src="/deepak.jpeg"
                  alt="Deepak R Gupta"
                  className="w-full h-full object-cover object-[center_15%] transition-transform duration-700 group-hover:scale-105"
                />
                {/* Soft fade at bottom, follows the theme */}
                <div
                  className="absolute inset-0"
                  style={{
                    background:
                      "linear-gradient(to top, var(--img-fade) 0%, transparent 45%)",
                  }}
                />

                {/* Bottom Overlay Name Tag (stays dark on every theme) */}
                <div
                  className="absolute bottom-4 inset-x-4 rounded-xl backdrop-blur-md border border-white/10 px-4 py-2.5 flex items-center justify-between"
                  style={{ background: "rgba(2, 6, 23, 0.8)" }}
                >
                  <div>
                    <p className="text-xs font-mono" style={{ color: "#22d3ee" }}>
                      FULL STACK DEV
                    </p>
                    <p className="on-dark text-sm font-display font-bold">
                      Deepak R. Gupta
                    </p>
                  </div>
                  <span className="h-2.5 w-2.5 rounded-full bg-emerald-400 shadow-[0_0_10px_#34d399] animate-pulse" />
                </div>
              </div>

              {/* Floating 3D Corner Badge - Top Right */}
              <div
                style={{ transform: "translateZ(45px)" }}
                className="card-solid absolute -top-4 -right-4 rounded-2xl px-3.5 py-2 shadow-[0_0_20px_rgba(6,182,212,0.35)]"
              >
                <span className="t-accent font-mono text-xs font-bold">8.0 CGPA ⭐</span>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Right Column: Bio + Bento Highlights (7 cols on desktop) */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-7"
        >
          {/* Section Pill */}
          <div className="chip inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-mono uppercase tracking-widest mb-4">
            <HiAcademicCap />
            <span>Get To Know Me</span>
          </div>

          <h2 className="font-display text-4xl sm:text-5xl font-bold tracking-tight t-text mb-6">
            Crafting Scalable Backend &{" "}
            <span className="text-gradient-cyber">Modern Web Apps</span>
          </h2>

          <div className="space-y-4 t-muted text-base sm:text-lg leading-relaxed">
            <p>
              Hi, I'm <span className="t-text font-semibold">Deepak R. Gupta</span>, a
              Full-Stack & Software Developer pursuing my{" "}
              <span className="t-accent font-medium">
                Bachelor of Computer Applications (BCA)-Computer Science
              </span>{" "}
              at Tilak Maharashtra Vidyapeeth, Pune University.
            </p>

            <p>
              Driven by curiosity and logical problem-solving, I specialize in building
              full-stack applications with{" "}
              <span className="t-accent3 font-medium">
                MongoDB, Express.js, React.js, Node.js, Python (Flask), and Java/MySQL
              </span>
              . Whether I'm architecting backend systems, integrating Stripe payments, or
              tackling Data Structures & Algorithms challenges, I bring focus and a rapid-learning
              mindset to every build.
            </p>
          </div>

          {/* 3 Bento Highlight Cards */}
          <div className="grid sm:grid-cols-3 gap-4 mt-8">
            {highlights.map((item, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                className="glass-panel glass-panel-hover rounded-2xl p-4"
              >
                <div className="tile mb-2 inline-flex h-10 w-10 items-center justify-center rounded-xl">
                  {item.icon}
                </div>
                <p className="text-xs font-mono uppercase tracking-wider t-muted">
                  {item.label}
                </p>
                <p className="text-base font-display font-bold t-text mt-0.5">
                  {item.value}
                </p>
                <p className="text-xs t-muted mt-1">{item.sub}</p>
              </motion.div>
            ))}
          </div>

          {/* Bottom Quick Links */}
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href="https://github.com/DeepakGupta2006"
              target="_blank"
              rel="noreferrer"
              className="glass t-text inline-flex items-center gap-2.5 rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:text-cyan-500 hover:shadow-[0_0_20px_rgba(6,182,212,0.25)]"
            >
              <FaGithub className="text-lg" />
              <span>github.com/DeepakGupta2006</span>
            </a>

            <a
              href="/Deepak_R.pdf"
              target="_blank"
              rel="noreferrer"
              className="chip inline-flex items-center gap-2 rounded-full px-5 py-2.5 text-sm font-medium transition-all hover:opacity-80"
            >
              <HiOutlineDocumentText className="text-lg" />
              <span>Download CV</span>
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default About;