import { ReactNode, useState } from "react";
import { FaCode } from "react-icons/fa";
import { SiOpenjdk, SiC } from "react-icons/si";

/* =====================================================================
   LEARNING REPOS  -  edit only this list to change / add cards.

   image : put your picture in  public/learning/  and write "/learning/name.png"
           (recommended size 1000 x 500). If the image is missing or empty,
           a glowing icon banner is shown instead.
   icon  : shown when there is no image.
   glow  : accent colour of the card.
   ===================================================================== */
interface LearningRepo {
  title: string;
  description: string;
  tech: string[];
  image?: string;
  icon: ReactNode;
  glow: string;
  github: string;
}

const learningRepos: LearningRepo[] = [
  {
    title: "Java-DSA-Practice",
    description:
      "Java implementations of core data structures and algorithms with problem-solving practice.",
    tech: ["Java", "Data Structures", "Algorithms"],
    image: "/java-dsa.png",
    icon: <SiOpenjdk className="text-5xl" style={{ color: "#F97316" }} />,
    glow: "#F97316",
    github: "https://github.com/DeepakGupta2006/java-dsa",
  },
  {
    title: "C-Programming",
    description:
      "C fundamentals: syntax, pointers, arrays, strings, functions and file handling practice programs.",
    tech: ["C", "Pointers", "Memory"],
    image: "/c-programming.png",
    icon: <SiC className="text-5xl" style={{ color: "#38bdf8" }} />,
    glow: "#38bdf8",
    github: "https://github.com/DeepakGupta2006/c-programming",
  },
  // Add a new card by copying one block above and changing the values.
];

function LearningRepoCard({ repo }: { repo: LearningRepo }) {
  const [imgOk, setImgOk] = useState(Boolean(repo.image));

  return (
    <div
      style={{ boxShadow: `0 10px 35px -12px ${repo.glow}55` }}
      className="card-solid group relative block cursor-default overflow-hidden rounded-3xl text-left"
    >
      {/* Banner */}
      <div
        className="relative flex h-40 items-center justify-center overflow-hidden"
        style={{
          background: `radial-gradient(circle at 70% 25%, ${repo.glow}55, transparent 60%), radial-gradient(circle at 15% 90%, ${repo.glow}22, transparent 55%), var(--tile)`,
        }}
      >
        {imgOk && repo.image ? (
          <>
            <img
              src={repo.image}
              alt={repo.title}
              onError={() => setImgOk(false)}
              className="h-full w-full cursor-default select-none object-cover"
              draggable={false}
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(to top, var(--img-fade) 0%, transparent 60%)",
              }}
            />
          </>
        ) : (
          <div
            className="tile relative flex h-20 w-20 items-center justify-center rounded-2xl backdrop-blur-md"
            style={{ boxShadow: `0 0 30px ${repo.glow}66` }}
          >
            {repo.icon}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex flex-wrap gap-1.5">
          {repo.tech.map((t) => (
            <span
              key={t}
              className="chip cursor-text select-text rounded-full px-2.5 py-0.5 font-mono text-[11px]"
            >
              {t}
            </span>
          ))}
        </div>

        <h4 className="mt-3 font-display text-lg font-bold t-text cursor-text select-text">
          {repo.title}
        </h4>
        <p className="mt-1.5 cursor-text select-text text-sm t-muted line-clamp-2">{repo.description}</p>

        {/* Only this link is clickable */}
        <a
          href={repo.github}
          target="_blank"
          rel="noreferrer"
          className="t-accent mt-4 inline-flex cursor-pointer items-center gap-2 text-sm font-semibold hover:underline"
        >
          <FaCode />
          <span>View Repo</span>
        </a>
      </div>
    </div>
  );
}

export default function LearningRepos() {
  return (
    <div className="mt-20">
      <div className="mb-10 flex items-center justify-center gap-4">
        <span className="h-px w-16 bg-gradient-to-r from-transparent to-cyan-500/60 sm:w-28" />
        <h3 className="chip rounded-full px-7 py-2.5 font-display text-sm font-bold uppercase tracking-widest sm:text-base">
          Learning Repos
        </h3>
        <span className="h-px w-16 bg-gradient-to-l from-transparent to-cyan-500/60 sm:w-28" />
      </div>

      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-6 sm:grid-cols-2">
        {learningRepos.map((repo) => (
          <LearningRepoCard key={repo.title} repo={repo} />
        ))}
      </div>
    </div>
  );
}