import { useState } from "react";
import { FaCode } from "react-icons/fa";
import ProjectArt, { ArtKind } from "./ProjectArt";
import { TechChip } from "./techColors";

/* =====================================================================
   LEARNING REPOS  -  edit only this list to change / add cards.

   art      : banner picture drawn in code (matches Light / Dark / Realistic).
              Available: "java" | "c"  (more kinds live in ProjectArt.tsx)
   useImage : set true to show your own picture from  image  instead
              (put it in public/ and write "/name.png").
   ===================================================================== */
interface LearningRepo {
  title: string;
  description: string;
  tech: string[];
  art: ArtKind;
  image?: string;
  useImage?: boolean;
  github: string;
}

const learningRepos: LearningRepo[] = [
  {
    title: "Java-DSA-Practice",
    description:
      "Java implementations of core data structures and algorithms with problem-solving practice.",
    tech: ["Java", "Data Structures", "Algorithms"],
    art: "java",
    image: "/java-dsa.png",
    github: "https://github.com/DeepakGupta2006/java-dsa",
  },
  {
    title: "C-Programming",
    description:
      "C fundamentals: syntax, pointers, arrays, strings, functions and file handling practice programs.",
    tech: ["C", "Pointers", "Memory"],
    art: "c",
    image: "/c-programming.png",
    github: "https://github.com/DeepakGupta2006/c-programming",
  },
  // Add a new card by copying one block above and changing the values.
];

function LearningRepoCard({ repo }: { repo: LearningRepo }) {
  const [imgOk, setImgOk] = useState(true);

  return (
    <div className="pcard group relative block cursor-default overflow-hidden text-left">
      {/* Banner */}
      <div className="relative aspect-[2/1] overflow-hidden">
        {repo.useImage && repo.image && imgOk ? (
          <img
            src={repo.image}
            alt={repo.title}
            onError={() => setImgOk(false)}
            className="h-full w-full cursor-default select-none object-cover"
            draggable={false}
          />
        ) : (
          <ProjectArt kind={repo.art} tech={repo.tech} />
        )}
      </div>

      {/* Content */}
      <div className="p-5">
        <div className="flex flex-wrap gap-2">
          {repo.tech.map((t) => (
            <TechChip key={t} t={t} className="cursor-text select-text" />
          ))}
        </div>

        <h4 className="mt-4 font-display text-lg font-bold t-text cursor-text select-text">
          {repo.title}
        </h4>
        <p className="mt-1.5 cursor-text select-text text-[15px] leading-relaxed t-muted line-clamp-2">
          {repo.description}
        </p>

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
        <span className="sec-line" />
        <h3 className="sec-pill font-display text-sm sm:text-base">Learning Repos</h3>
        <span className="sec-line r" />
      </div>

      <div className="mx-auto grid max-w-3xl grid-cols-1 gap-7 sm:grid-cols-2">
        {learningRepos.map((repo) => (
          <LearningRepoCard key={repo.title} repo={repo} />
        ))}
      </div>
    </div>
  );
}
