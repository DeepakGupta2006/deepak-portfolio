import { ReactNode, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useAnimationFrame,
  AnimatePresence,
} from "framer-motion";
import { FaJava, FaReact, FaGithub, FaExternalLinkAlt, FaNewspaper,} from "react-icons/fa";
import { SiFoodpanda, SiIfood, SiPython } from "react-icons/si";
import { BiSolidHotel } from "react-icons/bi";
import { HiSparkles, HiOutlineSquares2X2, HiOutlineGlobeAlt, HiXMark } from "react-icons/hi2";
import { FaShopSlash } from "react-icons/fa6";
import { FaShoppingCart } from "react-icons/fa";
import { GiMeal } from "react-icons/gi";
import { LuFileSearch } from "react-icons/lu";

interface Project {
  title: string;
  tech: string[];
  image: string;
  description: string;
  highlights: string[];
  icon: ReactNode;
  glow: string;
  github?: string;
}

const projects: Project[] = [
  {
    title: "Food Delivery App",
    tech: ["React.js", "MongoDB", "Express", "Node.js"],
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=1000&q=80",
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
    title: "Fake News Detector",
  tech: ["Python", "Flask", "scikit-learn", "Pandas"],
 image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1000&q=80",
  description:
    "Full-stack ML web app that classifies news text as Real or Fake with a confidence score, trained on 39,000+ real articles with a data-leakage bug found and fixed during development, achieving 98.4% measured accuracy.",
  highlights: [
    "TF-IDF + Logistic Regression Classifier (98.4% Accuracy)",
    "Flask REST API with /predict & /health Endpoints",
  ],
  icon: <FaNewspaper className="text-[#3B82F6] text-4xl" />,
  glow: "#3B82F6",
    github: "https://github.com/DeepakGupta2006/fake-news-detector",
  },

  {
    title: "Hotel Reservation",
    tech: ["Java", "MySQL", "JDBC", "OOP"],
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1000&q=80",
    description:
      "Relational hotel booking & management system supporting room availability checks, reservation scheduling, billing, and customer record management A database-driven hotel reservation application developed to manage guest information and hotel booking records efficiently..",
    highlights: [
      "Normalized MySQL Schema with JDBC Connectivity",
      "Automated Room Allocation & Check-in/Check-out",
      "CRUD Operations with Transaction Safety",
    ],
    icon: <BiSolidHotel className="text-amber-400 text-4xl" />,
    glow: "#f59e0b",
    github: "https://github.com/DeepakGupta2006/hotelreservation",
  },
  {
    title: "NextCart: Full-Stack E-Commerce Platform",
    tech: ["React", "Vite", "Tailwind CSS", "Node.js", "Express", "MongoDB", "JWT", "Razorpay", "Cloudinary"],
    image: "/nextcart.png",
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
    title: "AI Resume Matcher",
    tech: ["Python", "Streamlit", "PDFPlumber", "NLP"],
    image: "/resume-matcher-banner.png",
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
];

function ProjectCard({
  project,
  onOpen,
  compact = false,
}: {
  project: Project;
  onOpen: () => void;
  compact?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const hx = useMotionValue(0);
  const hy = useMotionValue(0);

  const hoverRotateX = useSpring(useTransform(hy, [-0.5, 0.5], [10, -10]), {
    stiffness: 200,
    damping: 18,
  });
  const hoverRotateY = useSpring(useTransform(hx, [-0.5, 0.5], [-10, 10]), {
    stiffness: 200,
    damping: 18,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    hx.set((e.clientX - rect.left) / rect.width - 0.5);
    hy.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    hx.set(0);
    hy.set(0);
  };

  return (
    <div
      style={{ perspective: 1200 }}
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={reset}
      className={compact ? "w-64" : "w-full"}
    >
      <motion.div
        onClick={onOpen}
        style={{
          rotateX: hoverRotateX,
          rotateY: hoverRotateY,
          transformStyle: "preserve-3d",
          boxShadow: `0 10px 35px -10px ${project.glow}40`,
        }}
        className="group relative rounded-2xl bg-slate-900/85 backdrop-blur-xl border border-white/10 hover:border-cyan-400/50 cursor-pointer transition-all duration-300 overflow-hidden"
      >
        {/* Top Image Banner */}
        <div className="relative h-32 w-full overflow-hidden">
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

          {/* Floating Icon Badge */}
          <div
            style={{
              transform: "translateZ(30px)",
              boxShadow: `0 0 20px ${project.glow}55`,
            }}
            className="absolute bottom-3 left-4 flex h-12 w-12 items-center justify-center rounded-xl bg-slate-900/90 backdrop-blur-md border border-white/15"
          >
            {project.icon}
          </div>
        </div>

        {/* Content */}
        <div className="p-5 text-left">
          <h3
            className="font-display text-lg font-bold text-white group-hover:text-cyan-300 transition-colors"
            style={{ transform: "translateZ(24px)" }}
          >
            {project.title}
          </h3>

          {!compact && (
            <p className="mt-2 text-sm text-slate-400 line-clamp-2">
              {project.description}
            </p>
          )}

          {/* Tech Pills */}
          <div
            className="mt-3 flex flex-wrap gap-1.5"
            style={{ transform: "translateZ(18px)" }}
          >
            {project.tech.slice(0, compact ? 3 : 5).map((t) => (
              <span
                key={t}
                className="rounded-md bg-slate-800/90 border border-white/10 px-2 py-0.5 font-mono text-[10px] text-cyan-300"
              >
                {t}
              </span>
            ))}
          </div>

          <div className="mt-4 flex items-center justify-between text-xs font-mono text-slate-400 group-hover:text-cyan-400 transition-colors">
            <span>Click to inspect</span>
            <span>→</span>
          </div>
        </div>
      </motion.div>
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
      style={{ x, y, scale, zIndex, marginLeft: -128, marginTop: -130 }}
    >
      <ProjectCard project={project} onOpen={onOpen} compact />
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
            <div className="inline-flex items-center gap-2 rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-cyan-300 mb-3">
              <HiSparkles className="text-cyan-400" />
              <span>Featured Work</span>
            </div>
            <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
               interactive <span className="text-gradient-cyber">Projects</span>
            </h2>
            <p className="mt-2 text-slate-400 text-sm sm:text-base max-w-xl">
              Hover to pause the orbital ring or switch to Grid View. Click any card to
              inspect architecture and tech stack details.
            </p>
          </div>

          {/* Orbit vs Grid View Switcher (Desktop) */}
          <div className="hidden md:inline-flex items-center rounded-full bg-slate-900/80 border border-white/10 p-1 self-start">
            <button
              onClick={() => setViewMode("orbit")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                viewMode === "orbit"
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "text-slate-400 hover:text-white"
              }`}
            >
              <HiOutlineGlobeAlt className="text-sm" />
              3D Orbit
            </button>
            <button
              onClick={() => setViewMode("grid")}
              className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs font-medium transition-all ${
                viewMode === "grid"
                  ? "bg-gradient-to-r from-cyan-500 to-indigo-600 text-white shadow-[0_0_15px_rgba(6,182,212,0.4)]"
                  : "text-slate-400 hover:text-white"
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
            {/* Visual Elliptical Track Ring */}
            <div
              className="pointer-events-none absolute rounded-[100%] border border-dashed border-cyan-500/25 shadow-[inset_0_0_50px_rgba(6,182,212,0.07)]"
              style={{ width: 840, height: 180 }}
            />
            <div className="relative w-full max-w-5xl" style={{ height: 420 }}>
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

        {/* Desktop Grid View OR Mobile View */}
        <div
          className={`${
            viewMode === "grid" ? "grid" : "grid md:hidden"
          } grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6`}
        >
          {projects.map((project) => (
            <ProjectCard
              key={project.title}
              project={project}
              onOpen={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Detailed Project Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-md flex justify-center items-center z-[70] p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.92, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.92, opacity: 0, y: 20 }}
              transition={{ type: "spring", stiffness: 280, damping: 24 }}
              onClick={(e) => e.stopPropagation()}
              className="relative bg-[#0b1120] rounded-3xl overflow-hidden max-w-2xl w-full border border-cyan-500/40 shadow-[0_0_50px_-10px_rgba(6,182,212,0.45)]"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedProject(null)}
                className="absolute top-4 right-4 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-slate-950/80 border border-white/15 text-slate-300 hover:text-white hover:border-cyan-400 transition"
              >
                <HiXMark className="text-xl" />
              </button>

              {/* Banner Image */}
              <div className="relative h-64 w-full overflow-hidden">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0b1120] via-[#0b1120]/40 to-transparent" />
                <div className="absolute bottom-4 left-6 flex items-center gap-3">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-900/90 backdrop-blur-md border border-white/15">
                    {selectedProject.icon}
                  </div>
                  <div>
                    <span className="font-mono text-xs uppercase tracking-widest text-cyan-400">
                      Project Spotlight
                    </span>
                    <h3 className="font-display text-3xl font-bold text-white">
                      {selectedProject.title}
                    </h3>
                  </div>
                </div>
              </div>

              {/* Modal Body */}
              <div className="p-6 sm:p-8">
                <div className="flex flex-wrap gap-2 mb-5">
                  {selectedProject.tech.map((t) => (
                    <span
                      key={t}
                      className="rounded-full bg-cyan-500/10 border border-cyan-500/30 px-3 py-1 font-mono text-xs text-cyan-300"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <p className="text-slate-300 leading-relaxed text-base">
                  {selectedProject.description}
                </p>

                {/* Key Highlights */}
                <div className="mt-5 rounded-2xl bg-slate-900/70 border border-white/10 p-4">
                  <p className="font-mono text-xs uppercase tracking-wider text-indigo-300 mb-2.5">
                    Key Engineering Highlights
                  </p>
                  <ul className="space-y-2 text-sm text-slate-300">
                    {selectedProject.highlights.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-2">
                        <span className="text-cyan-400 mt-0.5">▹</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Modal Footer Actions */}
                <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                  {selectedProject.github && (
                    <a
                      href={selectedProject.github}
                      target="_blank"
                      rel="noreferrer"
                      className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 px-6 py-2.5 text-sm font-semibold text-white shadow-[0_0_20px_rgba(6,182,212,0.4)] hover:scale-105 transition"
                    >
                      <FaGithub className="text-lg" />
                      <span>View on GitHub</span>
                      <FaExternalLinkAlt className="text-xs" />
                    </a>
                  )}

                  <button
                    onClick={() => setSelectedProject(null)}
                    className="rounded-full bg-slate-800/90 border border-white/10 px-6 py-2.5 text-sm font-medium text-slate-300 hover:text-white hover:border-white/30 transition"
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