import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaReact,
  FaNodeJs,
  FaJava,
  FaHtml5,
  FaCss3Alt,
  FaGithub,
} from "react-icons/fa";
import {
  SiPython,
  SiJavascript,
  SiC,
  SiFlask,
  SiMongodb,
  SiMysql,
  SiFlutter,
  SiDart,
  SiOpenid,
} from "react-icons/si";
import { VscVscode } from "react-icons/vsc";
import { HiCpuChip } from "react-icons/hi2";

interface SkillItem {
  name: string;
  category: "Languages" | "Frontend & Mobile" | "Backend & DB" | "Tools & Core";
  level: number;
  icon: JSX.Element;
  glow: string;
}

const skillsData: SkillItem[] = [
  // Languages
  {
    name: "Python",
    category: "Languages",
    level: 88,
    icon: <SiPython className="text-[#38bdf8]" />,
    glow: "#38bdf8",
  },
  {
    name: "JavaScript",
    category: "Languages",
    level: 85,
    icon: <SiJavascript className="text-yellow-400" />,
    glow: "#facc15",
  },
  {
    name: "Java",
    category: "Languages",
    level: 82,
    icon: <FaJava className="text-orange-500" />,
    glow: "#f97316",
  },
  {
    name: "C Programming",
    category: "Languages",
    level: 78,
    icon: <SiC className="text-blue-400" />,
    glow: "#60a5fa",
  },

  // Frontend & Mobile
  {
    name: "React.js",
    category: "Frontend & Mobile",
    level: 88,
    icon: <FaReact className="text-cyan-400" />,
    glow: "#22d3ee",
  },
  {
    name: "HTML5",
    category: "Frontend & Mobile",
    level: 92,
    icon: <FaHtml5 className="text-orange-500" />,
    glow: "#f97316",
  },
  {
    name: "CSS3 / Tailwind",
    category: "Frontend & Mobile",
    level: 86,
    icon: <FaCss3Alt className="text-blue-500" />,
    glow: "#3b82f6",
  },
  {
    name: "Flutter & Dart",
    category: "Frontend & Mobile",
    level: 72,
    icon: <SiFlutter className="text-cyan-400" />,
    glow: "#06b6d4",
  },

  // Backend & Databases
  {
    name: "Node.js & Express",
    category: "Backend & DB",
    level: 84,
    icon: <FaNodeJs className="text-green-500" />,
    glow: "#22c55e",
  },
  {
    name: "Flask",
    category: "Backend & DB",
    level: 80,
    icon: <SiFlask className="t-text" />,
    glow: "#94a3b8",
  },
  {
    name: "MongoDB",
    category: "Backend & DB",
    level: 85,
    icon: <SiMongodb className="text-emerald-400" />,
    glow: "#10b981",
  },
  {
    name: "MySQL & JDBC",
    category: "Backend & DB",
    level: 84,
    icon: <SiMysql className="text-sky-400" />,
    glow: "#38bdf8",
  },

  // Tools & Core
  {
    name: "Data Structures & Algo",
    category: "Tools & Core",
    level: 82,
    icon: <SiDart className="text-indigo-400" />,
    glow: "#818cf8",
  },
  {
    name: "Git & GitHub",
    category: "Tools & Core",
    level: 88,
    icon: <FaGithub className="t-text" />,
    glow: "#94a3b8",
  },
  {
    name: "VS Code",
    category: "Tools & Core",
    level: 92,
    icon: <VscVscode className="text-sky-500" />,
    glow: "#0ea5e9",
  },
  {
    name: "AI Debugging & Prompting",
    category: "Tools & Core",
    level: 90,
    icon: <SiOpenid className="text-emerald-400" />,
    glow: "#34d399",
  },
];

const categories = [
  "All",
  "Languages",
  "Frontend & Mobile",
  "Backend & DB",
  "Tools & Core",
] as const;

function Skills() {
  const [selected, setSelected] = useState<(typeof categories)[number]>("All");

  const filtered =
    selected === "All"
      ? skillsData
      : skillsData.filter((s) => s.category === selected);

  return (
    <section
      id="skills"
      className="relative min-h-screen flex flex-col items-center justify-center px-6 py-24"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <div className="chip inline-flex items-center gap-2 rounded-full px-3.5 py-1 text-xs font-mono uppercase tracking-widest mb-3">
            <HiCpuChip className="text-sm" />
            <span>Technical Arsenal</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold t-text">
            Skills & <span className="text-gradient-cyber">Technologies</span>
          </h2>
          <p className="mt-3 t-muted text-sm sm:text-base">
            My full-stack toolkit for building responsive interfaces, robust backend
            APIs, and relational/NoSQL databases.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 mb-12">
          {categories.map((cat) => {
            const active = selected === cat;
            return (
              <button
                key={cat}
                onClick={() => setSelected(cat)}
                className={`relative rounded-full px-4 py-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                  active
                    ? "btn-grad shadow-[0_0_20px_rgba(6,182,212,0.4)]"
                    : "glass t-muted hover:opacity-80"
                }`}
              >
                {cat}
              </button>
            );
          })}
        </div>

        {/* Skills Bento Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((skill) => (
              <motion.div
                layout
                key={skill.name}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.25 }}
                whileHover={{ y: -6 }}
                className="group glass-panel glass-panel-hover rounded-2xl p-5 relative overflow-hidden"
              >
                {/* Subtle Corner Glow on Hover */}
                <div
                  className="pointer-events-none absolute -top-10 -right-10 h-24 w-24 rounded-full opacity-0 group-hover:opacity-30 transition-opacity duration-500 blur-xl"
                  style={{ backgroundColor: skill.glow }}
                />

                <div className="flex items-center justify-between mb-4">
                  <div
                    className="tile flex h-12 w-12 items-center justify-center rounded-xl text-2xl transition-transform duration-300 group-hover:scale-110"
                    style={{
                      boxShadow: `0 0 18px -4px ${skill.glow}55`,
                    }}
                  >
                    {skill.icon}
                  </div>
                  <span className="chip font-mono text-xs font-semibold rounded-full px-2.5 py-0.5">
                    {skill.level}%
                  </span>
                </div>

                <h3 className="font-display text-base font-bold t-text group-hover:text-cyan-500 transition-colors">
                  {skill.name}
                </h3>
                <p className="text-xs t-muted mt-0.5 mb-3">
                  {skill.category}
                </p>

                {/* Animated Progress Bar */}
                <div className="track h-1.5 w-full rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    whileInView={{ width: `${skill.level}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    className="h-full rounded-full"
                    style={{
                      background: `linear-gradient(90deg, #06b6d4, ${skill.glow})`,
                    }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}

export default Skills;