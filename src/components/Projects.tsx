import { ReactNode, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useAnimationFrame,
  AnimatePresence,
} from "framer-motion";
import {
  FaGithub,
  FaExternalLinkAlt,
  FaNewspaper,
  FaRobot,
  FaUserShield,
  FaShoppingCart,
} from "react-icons/fa";
import {
  HiSparkles,
  HiOutlineSquares2X2,
  HiOutlineGlobeAlt,
  HiXMark,
  HiChevronDown,
} from "react-icons/hi2";
import { GiMeal } from "react-icons/gi";
import { LuFileSearch } from "react-icons/lu";
import LearningRepos from "./LearningRepos";
import ProjectArt, { ArtKind } from "./ProjectArt";
import { TechChip } from "./techColors";

interface Project {
  title: string;
  tech: string[];
  image: string; 
  art: ArtKind; 
  useImage?: boolean; 
  description: string;
  highlights: string[];
  icon: ReactNode;
  glow: string;
  github?: string;
  demo?: string; 
}

const projects: Project[] = [
  {
    title: "Food Delivery App",
    tech: ["React.js", "MongoDB", "Express", "Node.js"],
    image: "/food-delivery.png",
    art: "food",
    description:
      "Full-stack food ordering platform featuring user authentication, dynamic cart management, Stripe payment gateway integration, and a real-time admin order dashboard.",
    highlights: [
      "JWT Authentication & Role-based Admin Panel",
      "RESTful API with Express & MongoDB Atlas",
    ],
    icon: <GiMeal className="text-[#F97316] text-4xl" />,
    glow: "#F97316",
    github: "https://github.com/DeepakGupta2006/food-del",
 },

 {
    title: "AI Resume Matcher",
    tech: ["Python", "Streamlit", "PDFPlumber", "NLP"],
    image: "/resume-matcher-banner.png",
    art: "resume",
    description:
      "Intelligent NLP web application that parses candidate PDF resumes and evaluates keyword, skill, and semantic alignment against target job descriptions.",
    highlights: [
      "Automated PDF Text Extraction via PDFPlumber",
      "Cosine Similarity & Keyword Gap Analysis",
      "Interactive Streamlit Dashboard with Match Score",
    ],
    icon: <LuFileSearch className="text-sky-400 text-4xl" />,
    glow: "#38bdf8",
    github: "https://github.com/DeepakGupta2006/resume-matcher",
},
  

   {
    title: "Fake News Detector",
  tech: ["Python", "Flask", "scikit-learn", "Pandas"],
 image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1000&q=80",
 art: "news",
  description:
    "Full-stack ML web app that classifies news text as Real or Fake with a confidence score, trained on 39,000+ real articles with a data-leakage bug found and fixed during development, achieving 98.4% measured accuracy.",
  highlights: [
    "TF-IDF + Logistic Regression Classifier (98.4% Accuracy)",
    "Flask REST API with /predict & /health Endpoints",
  ],
  icon: <FaNewspaper className="text-slate-400 text-4xl" />,
  glow: "#94a3b8",
    github: "https://github.com/DeepakGupta2006/fake-news-detector",
},

  {
  title: "AI Voice Assistant",
  tech: ["Python", "Faster-Whisper", "Ollama", "Flask", "sounddevice", "psutil"],
  image: "/friday-banner.png",
  art: "voice",
  description:
    "Private Human style Voice Assistant for Windows that runs fully on your own PC. Say Friday or Jarvis to open apps, control the system, message contacts on WhatsApp and look up Wikipedia and news, with no cloud AI, API keys or GPU.",
  highlights: [
    "Faster-Whisper speech-to-text + local Ollama LLM + Piper neural voice, streamed sentence by sentence",
    "Rule-based command router with wake word, interruptible speech and confirmation before risky actions",
  ],
  icon: <FaRobot className="text-[#38E1FF] text-4xl" />,
  glow: "#38E1FF",
  github: "https://github.com/DeepakGupta2006/friday",
},

  {
    title: "NextCart: Full-Stack E-Commerce Platform",
    tech: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "MongoDB", "JWT", "Razorpay", "Cloudinary"],
    image: "/nextcart.png",
    art: "cart",
    description:
      "Full-stack MERN fashion store with JWT auth, a per-user persistent cart, Razorpay payments verified server-side via HMAC signatures, Cloudinary image uploads, and an admin dashboard for managing products, orders, and users.",
    highlights: [
      "Server-Verified Razorpay Payments via HMAC-SHA256 Signatures",
      "JWT Auth, Role-Based Admin Dashboard & Persistent User Carts",
      "Direct Cloudinary Image Uploads Streamed from Memory (No Local Disk)",
      "Search, Filter & Sort Across Men, Women, Kids & Accessories",
      "Deployed Full-Stack: React on Vercel, Express API on Render, MongoDB Atlas",
    ],
    icon: <FaShoppingCart className="text-[#5D8F87] text-4xl" />,
    glow: "#5D8F87",
    github: "https://github.com/DeepakGupta2006/NextCart",
},
 
   {
  title: "ZeroSpoof: Deepfake & Liveness Firewall",
  tech: ["Python", "FastAPI", "Go", "Next.js", "TypeScript", "Redis", "PostgreSQL"],
  image: "/ZeroSpoof.png",
  art: "shield",
  description:
    "Real-time deepfake and liveness firewall: a drop-in browser SDK and API that checks whether someone on a video call is a live human or a replay, photo, face-swap, virtual camera or cloned voice. Returns pass, review or fail with explainable scores and a live security dashboard.",
  highlights: [
    "Six detectors (pulse rPPG, moiré, device and stream integrity, random head-turn challenge, depth, audio) fused into a pass / review / fail verdict, with reasons shown for every result",
    "Privacy-first: face tracking runs in the browser with WebAssembly, so raw video never leaves the device. Go WebSocket gateway, FastAPI inference, Redis session state, PostgreSQL hash-chained audit log and signed webhooks",
  ],
  icon: <FaUserShield className="text-[#4ADE80] text-4xl" />,
  glow: "#4ADE80",
  github: "https://github.com/DeepakGupta2006/ZeroSpoof",
},
];


/* "Title: text" -> bold title + text */
function Highlight({ text }: { text: string }) {
  const k = text.indexOf(": ");
  if (k > 0 && k < 40) {
    return (
      <>
        <strong className="t-text">{text.slice(0, k)}:</strong>
        {text.slice(k + 1)}
      </>
    );
  }
  return <>{text}</>;
}

function Banner({ project, className }: { project: Project; className: string }) {
  const [ok, setOk] = useState(true);
  return (
    <div className={`relative overflow-hidden ${className}`}>
      {project.useImage && ok ? (
        <img
          src={project.image}
          alt={project.title}
          onError={() => setOk(false)}
          draggable={false}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      ) : (
        <div className="h-full w-full transition-transform duration-500 group-hover:scale-105">
          <ProjectArt kind={project.art} tech={project.tech} />
        </div>
      )}
    </div>
  );
}

function Actions({ project }: { project: Project }) {
  return (
    <div className="flex flex-wrap items-center gap-3">
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className="pbtn-fill"
        >
          <FaExternalLinkAlt className="text-xs" />
          <span>Live Demo</span>
        </a>
      )}
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noreferrer"
          onClick={(e) => e.stopPropagation()}
          className={project.demo ? "pbtn-line" : "pbtn-fill"}
        >
          <FaGithub />
          <span>View Code</span>
        </a>
      )}
    </div>
  );
}

/* Grid card: click to expand in place */
function GridCard({ project, index }: { project: Project; index: number }) {
  const [open, setOpen] = useState(false);
  const shown = project.tech.slice(0, 5);
  const extra = project.tech.length - shown.length;

  return (
    <motion.div
      initial={{ opacity: 0, y: 26 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.5, delay: (index % 3) * 0.08 }}
      onClick={() => setOpen((o) => !o)}
      className="pcard group relative cursor-pointer self-start overflow-hidden text-left"
    >
      <Banner project={project} className="aspect-[2/1]" />

      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {shown.map((t) => (
            <TechChip key={t} t={t} />
          ))}
          {extra > 0 && <span className="pchip">+{extra}</span>}
        </div>

        <div className="mt-4 flex items-start justify-between gap-3">
          <h3 className="font-display text-lg font-bold leading-snug t-text">
            {project.title}
          </h3>
          <HiChevronDown
            className={`mt-1 shrink-0 text-xl t-muted transition-transform duration-300 ${
              open ? "rotate-180" : ""
            }`}
          />
        </div>

        <p className={`mt-2 text-[15px] leading-relaxed t-muted ${open ? "" : "line-clamp-2"}`}>
          {project.description}
        </p>

        <AnimatePresence initial={false}>
          {open && (
            <motion.ul
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="mt-4 space-y-3 overflow-hidden pl-5 text-[15px] leading-relaxed t-muted"
              style={{ listStyleType: "disc" }}
            >
              {project.highlights.map((h, i) => (
                <li key={i}>
                  <Highlight text={h} />
                </li>
              ))}
            </motion.ul>
          )}
        </AnimatePresence>

        <div className="mt-5">
          <Actions project={project} />
        </div>
      </div>
    </motion.div>
  );
}

/* Compact card used in the 3D orbit: click opens the detail window */
function OrbitProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  return (
    <div
      onClick={onOpen}
      className="pcard group relative w-72 cursor-pointer overflow-hidden text-left"
    >
      <Banner project={project} className="aspect-[2/1]" />
      <div className="p-4">
        <div className="flex flex-wrap gap-1.5">
          {project.tech.slice(0, 3).map((t) => (
            <TechChip key={t} t={t} small />
          ))}
        </div>
        <h3 className="mt-3 line-clamp-2 font-display text-base font-bold leading-snug t-text">
          {project.title}
        </h3>
        <div className="mt-3 flex items-center justify-between font-mono text-xs t-muted transition-colors group-hover:text-[color:var(--accent)]">
          <span>Click to inspect</span>
          <span>→</span>
        </div>
      </div>
    </div>
  );
}

function OrbitCard({
  project,
  angleOffset,
  radiusX,
  radiusY,
  speed,
  paused,
  onOpen,
}: {
  project: Project;
  angleOffset: number;
  radiusX: number;
  radiusY: number;
  speed: number;
  paused: boolean;
  onOpen: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);
  const zIndex = useMotionValue(10);
  const angleRef = useRef(angleOffset);
  const lastTimeRef = useRef<number | null>(null);

  useAnimationFrame((t) => {
    if (lastTimeRef.current === null) {
      lastTimeRef.current = t;
    }
    const delta = (t - lastTimeRef.current) / 1000;
    lastTimeRef.current = t;

    if (!paused) {
      angleRef.current += delta * speed;
    }

    const angle = angleRef.current;
    x.set(Math.cos(angle) * radiusX);
    y.set(Math.sin(angle) * radiusY);
    const depth = (Math.sin(angle) + 1) / 2; // 0 at back, 1 at front
    scale.set(0.82 + depth * 0.24);
    zIndex.set(Math.round(depth * 30));
  });

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{ x, y, scale, zIndex, marginLeft: -144, marginTop: -170 }}
    >
      <OrbitProjectCard project={project} onOpen={onOpen} />
    </motion.div>
  );
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState<"orbit" | "grid">("orbit");
  const [orbitPaused, setOrbitPaused] = useState(false);

  const speed = (Math.PI * 2) / 24;

  return (
    <section
      id="projects"
      className="relative min-h-screen py-24 px-6 overflow-hidden flex flex-col justify-center"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
          <div>
            <div className="chip inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-mono uppercase tracking-widest mb-3">
              <HiSparkles />
              <span>Featured Work</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold t-text">
               interactive <span className="text-gradient-cyber">Projects</span>
            </h2>
            <p className="mt-2 t-muted text-sm sm:text-base max-w-xl">
              Hover to pause the orbital ring or switch to Grid View. Click any card to
              inspect architecture and tech stack details.
            </p>
          </div>

          {/* Orbit vs Grid View Switcher (Desktop) */}
          <div className="glass hidden md:inline-flex items-center rounded-full p-1 self-start">
            <button
              onClick={() => setViewMode("orbit")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                viewMode === "orbit"
                  ? "btn-grad shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "t-muted hover:opacity-80"
              }`}
            >
              <HiOutlineGlobeAlt className="text-sm" />
              3D Orbit
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                viewMode === "grid"
                  ? "btn-grad shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "t-muted hover:opacity-80"
              }`}
            >
              <HiOutlineSquares2X2 className="text-sm" />
              Bento Grid
            </button>
          </div>
        </div>

        {/* Desktop 3D Elliptical Orbit View */}
        {viewMode === "orbit" && (
          <div
            className="hidden md:flex justify-center items-center relative my-6"
            onMouseEnter={() => setOrbitPaused(true)}
            onMouseLeave={() => setOrbitPaused(false)}
          >
            <div
              className="pointer-events-none absolute rounded-[100%] border border-dashed border-cyan-500/25 shadow-[inset_0_0_50px_rgba(6,182,212,0.07)]"
              style={{ width: 840, height: 180 }}
            />
            <div className="relative w-full max-w-5xl" style={{ height: 460 }}>
              {projects.map((project, index) => (
                <OrbitCard
                  key={project.title}
                  project={project}
                  angleOffset={(Math.PI * 2 * index) / projects.length}
                  radiusX={390}
                  radiusY={85}
                  speed={speed}
                  paused={orbitPaused}
                  onOpen={() => setSelectedProject(project)}
                />
              ))}
            </div>
          </div>
        )}

        {/* Grid View (desktop) / always on mobile: click a card to expand it */}
        <div
          className={`${
            viewMode === "grid" ? "grid" : "grid md:hidden"
          } grid-cols-1 items-start gap-7 md:grid-cols-2 lg:grid-cols-3`}
        >
          {projects.map((project, i) => (
            <GridCard key={project.title} project={project} index={i} />
          ))}
        </div>

        {/* Learning Repos (edit src/components/LearningRepos.tsx) */}
        <LearningRepos />
      </div>

      {/* Detail window (orbit view) */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[70] flex items-center justify-center bg-black/70 p-4 backdrop-blur-md"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="pcard relative max-h-[92vh] w-full max-w-2xl overflow-y-auto"
            >
              <button
                onClick={() => setSelectedProject(null)}
                aria-label="Close"
                className="on-dark absolute right-4 top-4 z-20 flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-black/60 transition hover:border-cyan-400"
              >
                <HiXMark className="text-xl" />
              </button>

              <Banner project={selectedProject} className="aspect-[2/1]" />

              <div className="p-6 sm:p-8">
                <h3 className="font-display text-2xl font-bold t-text sm:text-3xl">
                  {selectedProject.title}
                </h3>

                <div className="mt-4 flex flex-wrap gap-2">
                  {selectedProject.tech.map((t) => (
                    <TechChip key={t} t={t} />
                  ))}
                </div>

                <p className="mt-5 text-base leading-relaxed t-muted">
                  {selectedProject.description}
                </p>

                <ul
                  className="mt-5 space-y-3 pl-5 text-[15px] leading-relaxed t-muted"
                  style={{ listStyleType: "disc" }}
                >
                  {selectedProject.highlights.map((h, i) => (
                    <li key={i}>
                      <Highlight text={h} />
                    </li>
                  ))}
                </ul>

                <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                  <Actions project={selectedProject} />
                  <button
                    onClick={() => setSelectedProject(null)}
                    className="pbtn-line"
                  >
                    Close Window
                  </button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;
