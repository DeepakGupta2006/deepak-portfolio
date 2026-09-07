import { ReactNode, useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useTransform,
  useSpring,
  useAnimationFrame,
  AnimatePresence,
} from "framer-motion";
import { FaJava, FaReact } from "react-icons/fa";
import { SiPython, SiJavascript } from "react-icons/si";
import { SlQuestion } from "react-icons/sl";
import { DiMysql } from "react-icons/di";
import { BiHotel, BiSolidHotel } from "react-icons/bi";

interface Project {
  title: string;
  tech: string;
  image: string;
  description: string;
  icon: ReactNode;
  glow: string;
}

const projects: Project[] = [
  {
    title: "Food Delivery App",
    tech: "ReactJS • MongoDB • Express • NodeJS",
    image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836",
    description:
      "Full-stack food ordering application with authentication, cart management,  and admin dashboard.",
    icon: <FaReact className="text-cyan-400 text-5xl" />,
    glow: "#00e5ff",
  },
  {
    title: "Hotel Reservation",
    tech: "MYSQL • JDBC",
    image: "https://images.unsplash.com/photo-1578683010236-d716f9a3f461",
    description:
      "Hotel booking system with room reservation, booking management and customer records.",
    icon: <BiSolidHotel className="text-orange-500 text-5xl" />,
    glow: "#F89820",
  },
  {
    title: "Snake Game",
    tech: "Java • Swing • OOP",
    image: "https://images.unsplash.com/photo-1493711662062-fa541adb3fc8",
    description:
      "A classic Snake game built with Java Swing, featuring real-time collision detection dynamic difficulty scaling, and a responsive GUI — built entirely from core Java, no external libraries.",
    icon: <FaJava className="text-red-500 text-5xl" />,
    glow: "#F44336",
  },
  {
    title: "AI Resume Matcher",
    tech: "Python • Streamlit • PDFPlumber • NLP",
    image: "https://images.unsplash.com/photo-1526379095098-d400fd0bf935",
    description:
      "AI Resume Matcher is an intelligent web application that helps job seekers evaluate how well their resume matches a job description.",
    icon: <SiPython className="text-[#3776AB] text-5xl" />,
    glow: "#3776AB",
  },
];

/** A single card: mouse-hover 3D tilt only. Position/orbit motion is
 * applied by the parent (OrbitCard), not here. */
function ProjectCard({ project, onOpen }: { project: Project; onOpen: () => void }) {
  const ref = useRef<HTMLDivElement>(null);
  const hx = useMotionValue(0);
  const hy = useMotionValue(0);

  const hoverRotateX = useSpring(useTransform(hy, [-0.5, 0.5], [8, -8]), {
    stiffness: 200,
    damping: 18,
  });
  const hoverRotateY = useSpring(useTransform(hx, [-0.5, 0.5], [-8, 8]), {
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
    <div style={{ perspective: 1200 }} ref={ref} onMouseMove={handleMouseMove} onMouseLeave={reset}>
      <motion.div
        onClick={onOpen}
        style={{
          rotateX: hoverRotateX,
          rotateY: hoverRotateY,
          transformStyle: "preserve-3d",
          boxShadow: `0 0 25px ${project.glow}22`,
        }}
        className="w-56 bg-[#0b0b0b] rounded-2xl border border-cyan-500/20 cursor-pointer
          hover:border-cyan-400 transition-colors duration-300 p-6 flex flex-col items-center text-center gap-3"
      >
        <div style={{ transform: "translateZ(30px)" }}>{project.icon}</div>
        <h2 className="text-xl font-bold" style={{ color: project.glow, transform: "translateZ(24px)" }}>
          {project.title}
        </h2>
        <p className="text-gray-400 text-sm" style={{ transform: "translateZ(18px)" }}>
          {project.tech}
        </p>
      </motion.div>
    </div>
  );
}

/**
 * Moves one card along a wide, flat ellipse (radiusX >> radiusY) centered
 * on the parent. Because radiusY is small, the card barely moves up/down
 * and instead reads as travelling left-to-right (and back) continuously.
 * Position is driven every frame instead of the rotate/translate/rotate
 * trick, since that trick only traces perfect circles.
 */
function OrbitCard({
  project,
  angleOffset,
  radiusX,
  radiusY,
  speed, // radians per second
  onOpen,
}: {
  project: Project;
  angleOffset: number;
  radiusX: number;
  radiusY: number;
  speed: number;
  onOpen: () => void;
}) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const scale = useMotionValue(1);

  useAnimationFrame((t) => {
    const angle = angleOffset + (t / 1000) * speed;
    x.set(Math.cos(angle) * radiusX);
    y.set(Math.sin(angle) * radiusY);
    // subtle depth cue: cards toward the "back" of the ellipse (top) sit
    // a bit smaller/behind, cards toward the "front" (bottom) sit larger
    scale.set(0.85 + ((Math.sin(angle) + 1) / 2) * 0.25);
  });

  return (
    <motion.div
      className="absolute top-1/2 left-1/2"
      style={{ x, y, scale, marginLeft: -112, marginTop: -90 }}
    >
      <ProjectCard project={project} onOpen={onOpen} />
    </motion.div>
  );
}

function ProjectOrbit({
  items,
  radiusX,
  radiusY,
  duration, // seconds for one full loop
  onOpen,
}: {
  items: Project[];
  radiusX: number;
  radiusY: number;
  duration: number;
  onOpen: (p: Project) => void;
}) {
  const speed = (Math.PI * 2) / duration;

  return (
    <>
      {items.map((project, index) => (
        <OrbitCard
          key={index}
          project={project}
          angleOffset={(Math.PI * 2 * index) / items.length}
          radiusX={radiusX}
          radiusY={radiusY}
          speed={speed}
          onOpen={() => onOpen(project)}
        />
      ))}
    </>
  );
}

function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);

  return (
    <section id="projects" className="min-h-screen bg-black text-white py-20 px-6 overflow-hidden">
      <h1 className="text-6xl font-bold text-center text-cyan-400 mb-4">PROJECTS</h1>
      

      {/* Desktop: cards travel left-to-right along a flat ellipse */}
      <div className="hidden md:flex justify-center">
        <div className="relative w-full max-w-5xl" style={{ height: 420 }}>
          <ProjectOrbit
            items={projects}
            radiusX={420}
            radiusY={70}
            duration={22}
            onOpen={setSelectedProject}
          />
        </div>
      </div>

      {/* Mobile: orbiting cards are unreadable on a small screen, so fall
          back to a plain stacked list instead */}
      <div className="md:hidden flex flex-col items-center gap-8">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} onOpen={() => setSelectedProject(project)} />
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/90 flex justify-center items-center z-50 p-4"
            onClick={() => setSelectedProject(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#111] rounded-3xl overflow-hidden max-w-2xl w-full border border-cyan-500 shadow-[0_0_40px_#00e5ff]"
            >
              <img src={selectedProject.image} alt="" className="w-full h-72 object-cover" />

              <div className="p-8">
                <h2 className="text-4xl font-bold text-cyan-400">{selectedProject.title}</h2>

                <p className="mt-4 text-lg">
                  <strong>Tech Stack:</strong>
                  <br />
                  {selectedProject.tech}
                </p>

                <p className="mt-4 text-gray-300 leading-8">{selectedProject.description}</p>

                <button
                  onClick={() => setSelectedProject(null)}
                  className="mt-8 bg-cyan-500 text-black px-6 py-3 rounded-xl font-bold hover:bg-cyan-400"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export default Projects;