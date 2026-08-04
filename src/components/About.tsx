import { useRef } from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";

function About() {
  const cardRef = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), {
    stiffness: 150,
    damping: 12,
  });
  const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), {
    stiffness: 150,
    damping: 12,
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
      className="min-h-screen bg-black text-white flex items-center justify-center px-6 py-20"
    >
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        {/* Left Side */}
        <div>
          <h1 className="text-5xl md:text-7xl font-bold text-cyan-400 mb-6 uppercase tracking-wide">
            About Me
          </h1>

          <p className="text-gray-300 leading-9 text-lg">
            Hi, I'm Deepak Gupta, a passionate Full Stack Developer
            specializing in MongoDB, Express.js, React.js, and Node.js.
            I enjoy building modern, responsive, and scalable web
            applications that solve real-world problems.
          </p>

          <p className="text-gray-300 leading-9 text-lg mt-6">
            My focus is on creating clean user interfaces, efficient
            backend systems, and seamless user experiences. I
            continuously improve my skills by working on projects,
            learning new technologies, and exploring modern web
            development practices.
          </p>

           <p className="text-gray-300 leading-9 text-lg mt-6">
            I love transforming creative ideas into real-world applications,
        solving challenging problems, and continuously learning new
        technologies to improve my development skills.
          </p>

        </div>

        {/* Right Side: 3D tilt photo, mouse-reactive */}
        <div
          className="flex justify-center"
          style={{ perspective: 1000 }}
          ref={cardRef}
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
        >
          <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            className="float-animation w-72 h-72 md:w-96 md:h-96 rounded-full border-4 border-cyan-500 shadow-[0_0_30px_#00e5ff] overflow-hidden"
          >
            <img
              src="/deepak.jpeg"
              alt="Deepak Gupta"
              className="w-full h-full object-cover object-[center_20%]"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default About;
