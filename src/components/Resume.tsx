import { motion } from "framer-motion";
import {
  FaFilePdf,
  FaDownload,
  FaEye,
  FaGraduationCap,
  FaCertificate,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";

const education = [
  {
    degree: "Bachelor of Computer Applications (BCA)",
    school: "Tilak Maharashtra Vidyapeeth, Pune University",
    period: "2024 – 2027 (Expected)",
    score: "CGPA: 8.0 (Till Date)",
    badge: "Current",
  },
  {
    degree: "Higher Secondary Certificate (HSC - Class XII)",
    school: "BNN COLLEGE ,BHIWANDI",
    period: "2024",
    score: "Maharashtra State Board",
  },
  {
    degree: "Secondary School Certificate (SSC - Class X)",
    school: "S.S. Sangh English Medium High School, Bhiwandi",
    period: "2022",
    score: "Maharashtra State Board",
  },
];

const certifications = [
  {
    title: "Full Stack Web Development",
    issuer: "Udemy",
    focus: "MongoDB, Express.js, React.js, Node.js & Modern Web APIs",
  },
  {
    title: "C# Programming Language",
    issuer: "Sharp Computer Education",
    focus: "Object-Oriented Programming & Application Logic",
  },
];

function Resume() {
  return (
    <section
      id="resume"
      className="relative min-h-screen flex items-center justify-center px-6 py-24"
    >
      <div className="max-w-6xl w-full mx-auto">
        {/* Header */}
        <div className="text-center max-w-2xl mx-auto mb-14">
          <div className="inline-flex items-center gap-2 rounded-full bg-purple-500/10 border border-purple-500/30 px-3.5 py-1 text-xs font-mono uppercase tracking-widest text-purple-300 mb-3">
            <HiSparkles className="text-purple-400" />
            <span>Credentials & Curriculum Vitae</span>
          </div>
          <h2 className="font-display text-4xl sm:text-5xl font-bold text-white">
            My <span className="text-gradient-cyber">Resume</span>
          </h2>
          <p className="mt-3 text-slate-400 text-sm sm:text-base">
            Academic background, professional certifications, and downloadable CV.
          </p>
        </div>

        <div className="grid lg:grid-cols-12 gap-8 items-stretch">
          {/* Left Column: Interactive PDF Vault Card (5 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 glass-panel rounded-3xl p-8 flex flex-col justify-between relative overflow-hidden border border-cyan-500/30 shadow-[0_0_40px_-12px_rgba(6,182,212,0.25)]"
          >
            <div className="pointer-events-none absolute -top-24 -right-24 h-56 w-56 rounded-full bg-cyan-500/15 blur-3xl" />

            <div>
              <span className="inline-block font-mono text-xs uppercase tracking-widest text-cyan-400 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-3 py-1">
                Official Document
              </span>

              <h3 className="font-display text-3xl font-bold text-white mt-4">
                Deepak R. Gupta
              </h3>
              <p className="text-sm text-indigo-300 font-medium mt-1">
                Full Stack Developer • Software Engineer • DSA Enthusiast
              </p>

              {/* Glowing PDF Emblem */}
              <div className="my-10 flex justify-center">
                <div className="relative group">
                  <div className="absolute -inset-3 rounded-full bg-gradient-to-r from-cyan-500 to-indigo-600 opacity-40 blur-xl group-hover:opacity-75 transition duration-500" />
                  <div className="relative flex h-28 w-28 items-center justify-center rounded-3xl bg-slate-900 border border-cyan-400/40 shadow-[0_0_30px_rgba(6,182,212,0.3)] group-hover:scale-105 transition duration-300">
                    <FaFilePdf className="text-rose-500 text-5xl drop-shadow-[0_0_12px_rgba(244,63,94,0.6)]" />
                  </div>
                </div>
              </div>

              <p className="text-slate-400 text-sm text-center leading-relaxed">
                Grab a copy of my latest resume in PDF format featuring full project
                breakdowns, academic transcripts, and technical proficiencies.
              </p>
            </div>

            {/* Action Buttons */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3">
              <a
                href="/Deepak_Raju_Gupta_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-slate-900/90 border border-cyan-400/40 px-5 py-3.5 text-sm font-semibold text-cyan-300 hover:bg-cyan-500/15 hover:border-cyan-400 transition-all"
              >
                <FaEye />
                <span>Preview PDF</span>
              </a>

              <a
                href="/Deepak_Raju_Gupta_Resume.pdf"
                download
                className="flex-1 inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-cyan-500 to-indigo-600 px-5 py-3.5 text-sm font-semibold text-white shadow-[0_0_25px_rgba(6,182,212,0.4)] hover:scale-[1.02] transition-all"
              >
                <FaDownload />
                <span>Download CV</span>
              </a>
            </div>
          </motion.div>

          {/* Right Column: Education Timeline & Certifications (7 Cols) */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="lg:col-span-7 flex flex-col gap-6"
          >
            {/* Education Box */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-cyan-500/15 border border-cyan-500/30 text-cyan-400">
                  <FaGraduationCap className="text-xl" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Education Timeline
                </h3>
              </div>

              <div className="space-y-6 relative before:absolute before:top-2 before:bottom-2 before:left-[11px] before:w-[2px] before:bg-gradient-to-b before:from-cyan-400 before:via-indigo-500 before:to-slate-800">
                {education.map((item, idx) => (
                  <div key={idx} className="relative pl-8">
                    <span className="absolute left-1 top-1.5 h-3.5 w-3.5 rounded-full bg-slate-950 border-2 border-cyan-400 shadow-[0_0_10px_#22d3ee]" />
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <h4 className="font-display text-base sm:text-lg font-bold text-white">
                        {item.degree}
                      </h4>
                      <span className="font-mono text-xs text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 rounded-full px-2.5 py-0.5">
                        {item.period}
                      </span>
                    </div>
                    <p className="text-sm text-slate-300 mt-0.5">{item.school}</p>
                    <p className="text-xs font-mono text-indigo-300 mt-1">
                      {item.score}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications Box */}
            <div className="glass-panel rounded-3xl p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-5">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-indigo-500/15 border border-indigo-500/30 text-indigo-400">
                  <FaCertificate className="text-lg" />
                </div>
                <h3 className="font-display text-2xl font-bold text-white">
                  Certifications
                </h3>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {certifications.map((cert, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl bg-slate-900/75 border border-white/10 p-4 hover:border-indigo-400/40 transition"
                  >
                    <span className="font-mono text-[11px] uppercase tracking-wider text-indigo-400">
                      {cert.issuer}
                    </span>
                    <h4 className="font-display text-base font-bold text-white mt-1">
                      {cert.title}
                    </h4>
                    <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                      {cert.focus}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

export default Resume;