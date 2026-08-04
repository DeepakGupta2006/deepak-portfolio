import { FaFilePdf, FaDownload, FaEye } from "react-icons/fa";

function Resume() {
  return (
    <section id="resume" className="min-h-screen bg-black text-white px-6 py-20">
      <div className="max-w-5xl mx-auto bg-[#111] border border-cyan-500/30 rounded-3xl p-10 shadow-[0_0_30px_rgba(0,229,255,0.2)]">
        <h1 className="text-6xl text-cyan-400 text-center font-bold">RESUME</h1>

        <div className="text-center mt-10">
          <h2 className="text-5xl font-bold text-white">Deepak R Gupta</h2>

          <p className="text-cyan-400 text-xl mt-3">
            Software Developer | Full Stack Developer | AI/ML Enthusiast
          </p>

          {/* Resume Logo */}
          <div className="flex justify-center mt-10">
            <div className="p-6 rounded-full border border-cyan-500 shadow-[0_0_30px_#00e5ff] hover:scale-110 transition">
              <FaFilePdf className="text-red-500 text-7xl" />
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-wrap justify-center gap-4 mt-10">
            <a
              href="/Deepak_R.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 bg-gray-900 border border-cyan-500 text-cyan-400 px-8 py-4 rounded-xl font-bold hover:bg-cyan-500 hover:text-black hover:scale-105 transition"
            >
              <FaEye />
              Preview Resume
            </a>

            <a
              href="/Deepak_R.pdf"
              download
              className="flex items-center gap-3 bg-cyan-500 text-black px-8 py-4 rounded-xl font-bold hover:bg-cyan-400 hover:scale-105 transition"
            >
              <FaDownload />
              Download Resume
            </a>
          </div>

          <p className="text-gray-400 mt-8 text-lg">
            View or download my professional resume showcasing skills, projects,
            education, and technical expertise.
          </p>
        </div>
      </div>
    </section>
  );
}

export default Resume;
