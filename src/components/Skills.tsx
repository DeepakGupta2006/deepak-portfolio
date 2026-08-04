import { ReactNode, useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FaReact, FaPython, FaJava } from "react-icons/fa";
import { SiTypescript, SiFlask, SiMongodb } from "react-icons/si";
import { BsRobot } from "react-icons/bs";
import { IoFlash } from "react-icons/io5";

interface Skill {
  name: string;
  icon: ReactNode;
}

const skills: Skill[] = [
  { name: "React", icon: <FaReact className="text-cyan-400 text-7xl" /> },
  { name: "Python", icon: <FaPython className="text-yellow-400 text-7xl" /> },
  { name: "TypeScript", icon: <SiTypescript className="text-blue-400 text-7xl" /> },
  { name: "Flask", icon: <SiFlask className="text-white text-7xl" /> },
  { name: "MongoDB", icon: <SiMongodb className="text-green-400 text-7xl" /> },
  { name: "AI / ML", icon: <BsRobot className="text-pink-400 text-7xl" /> },
  {
    name: "Java",
    icon: <FaJava className="text-[#F89820] text-7xl drop-shadow-[0_0_20px_#F89820]" />,
  },
  { name: "DSA", icon: <IoFlash className="text-orange-400 text-7xl" /> },
];

function SkillCard({ skill }: { skill: Skill }) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [12, -12]), {
    stiffness: 200,
    damping: 15,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-12, 12]), {
    stiffness: 200,
    damping: 15,
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set((e.clientX - rect.left) / rect.width - 0.5);
    y.set((e.clientY - rect.top) / rect.height - 0.5);
  };

  const reset = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div style={{ perspective: 800 }} ref={ref} onMouseMove={handleMouseMove} onMouseLeave={reset}>
      <motion.div
        style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
        className="bg-[#0b0b0b] border border-gray-800 rounded-3xl p-10
          flex flex-col items-center justify-center
          hover:shadow-[0_0_25px_#00e5ff] hover:border-cyan-500
          transition-shadow duration-300"
      >
        <div style={{ transform: "translateZ(40px)" }}>{skill.icon}</div>
        <h2 className="text-white text-2xl font-bold mt-6" style={{ transform: "translateZ(30px)" }}>
          {skill.name}
        </h2>
      </motion.div>
    </div>
  );
}

function Skills() {
  return (
    <section id="skills" className="min-h-screen bg-black py-20 px-10">
      <h1 className="text-7xl font-bold text-cyan-400 text-center mb-20">SKILLS</h1>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-6xl mx-auto">
        {skills.map((skill, index) => (
          <SkillCard key={index} skill={skill} />
        ))}
      </div>
    </section>
  );
}

export default Skills;
