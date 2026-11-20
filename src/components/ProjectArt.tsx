import { useId } from "react";

/* =====================================================================
   PROJECT BANNER ART  (drawn in code, redraws itself for every theme)
   kind  : which picture to draw
   Change the words in META below to edit the text printed on a banner.
   ===================================================================== */
export type ArtKind = "food" | "resume" | "news" | "voice" | "cart" | "shield" | "java" | "c";

const META: Record<ArtKind, { l1: string; l2: string; sub: string; c: string }> = {
  food: { l1: "Food", l2: "Delivery App", sub: "MERN · Stripe · Admin panel", c: "#f97316" },
  resume: { l1: "AI Resume", l2: "Matcher", sub: "NLP · Cosine similarity", c: "#38bdf8" },
  news: { l1: "Fake News", l2: "Detector", sub: "TF-IDF · Logistic Regression", c: "#fb7185" },
  voice: { l1: "Friday", l2: "AI Voice Assistant", sub: "Local · Private · Offline", c: "#38e1ff" },
  cart: { l1: "NextCart", l2: "MERN E-Commerce", sub: "Razorpay · JWT · Admin", c: "#5eead4" },
  shield: { l1: "ZeroSpoof", l2: "Deepfake & Liveness", sub: "Real-time firewall", c: "#4ade80" },
  java: { l1: "Java", l2: "DSA Practice", sub: "Data Structures · Algorithms", c: "#f97316" },
  c: { l1: "C", l2: "Programming", sub: "Pointers · Memory · Files", c: "#60a5fa" },
};

const P = { fill: "var(--a-panel)", stroke: "var(--a-line)", strokeWidth: 2 } as const;
const P2 = { fill: "var(--a-panel2)" } as const;
const ink = (o = 1) => ({ fill: "var(--a-ink)", opacity: o });
const sub = { fill: "var(--a-sub)" };

function Bar({ x, y, w, h = 10, o = 0.5 }: { x: number; y: number; w: number; h?: number; o?: number }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} style={ink(o)} />;
}

function Pill({
  x, y, w, label, fill, text, stroke,
}: { x: number; y: number; w: number; label: string; fill?: string; text: string; stroke?: string }) {
  return (
    <g>
      <rect x={x} y={y} width={w} height={34} rx={17} fill={fill ?? "none"} stroke={stroke} strokeWidth={stroke ? 2 : 0} />
      <text x={x + w / 2} y={y + 23} textAnchor="middle" fontSize={16} fontWeight={800} letterSpacing={1} fill={text}>
        {label}
      </text>
    </g>
  );
}

function Motif({ kind, c }: { kind: ArtKind; c: string }) {
  switch (kind) {
    case "food":
      return (
        <g>
          <rect x={540} y={70} width={410} height={360} rx={28} {...P} />
          <circle cx={580} cy={110} r={14} fill={c} />
          <Bar x={605} y={104} w={120} o={0.7} />
          <Bar x={860} y={104} w={60} o={0.3} />
          {[0, 1, 2].map((i) => (
            <g key={i}>
              <rect x={560 + i * 130} y={145} width={118} height={130} rx={18} style={P2} />
              <circle cx={619 + i * 130} cy={195} r={34} fill={c} opacity={0.9 - i * 0.15} />
              <circle cx={619 + i * 130} cy={195} r={20} style={P2} />
              <Bar x={575 + i * 130} y={244} w={88} o={0.6} />
              <Bar x={575 + i * 130} y={262} w={56} o={0.3} />
            </g>
          ))}
          <line x1={585} y1={335} x2={905} y2={335} stroke="var(--a-line)" strokeWidth={3} />
          {[585, 692, 798, 905].map((x, i) => (
            <circle key={x} cx={x} cy={335} r={11} fill={i < 3 ? c : "none"} stroke={c} strokeWidth={3} />
          ))}
          <rect x={700} y={380} width={190} height={36} rx={18} fill={c} />
          <text x={795} y={404} textAnchor="middle" fontSize={17} fontWeight={800} fill="#06222b">
            Order Placed ✓
          </text>
        </g>
      );
    case "resume":
      return (
        <g>
          <rect x={560} y={90} width={230} height={330} rx={20} {...P} />
          <circle cx={600} cy={135} r={18} fill={c} />
          <Bar x={630} y={124} w={110} o={0.7} />
          <Bar x={630} y={144} w={70} o={0.3} />
          <rect x={578} y={236} width={196} height={22} rx={6} fill={c} opacity={0.28} />
          {[170, 150, 175, 120, 165, 140, 150, 90].map((w, i) => (
            <Bar key={i} x={585} y={190 + i * 26} w={w} o={0.35} />
          ))}
          <circle cx={870} cy={215} r={62} fill="none" stroke="var(--a-panel2)" strokeWidth={16} />
          <circle
            cx={870} cy={215} r={62} fill="none" stroke={c} strokeWidth={16} strokeLinecap="round"
            strokeDasharray="358 400" transform="rotate(-90 870 215)"
          />
          <text x={870} y={229} textAnchor="middle" fontSize={40} fontWeight={800} style={ink()}>92%</text>
          <text x={870} y={312} textAnchor="middle" fontSize={20} style={sub}>Match Score</text>
          <Pill x={798} y={345} w={74} label="PYTHON" fill={c} text="#04222f" />
          <Pill x={880} y={345} w={70} label="NLP" text={c} stroke={c} />
        </g>
      );
    case "news":
      return (
        <g>
          <rect x={545} y={75} width={250} height={350} rx={20} {...P} />
          <Bar x={565} y={100} w={210} h={14} o={0.8} />
          <rect x={565} y={130} width={210} height={90} rx={10} fill={c} opacity={0.35} />
          <Bar x={565} y={240} w={200} h={12} o={0.8} />
          <Bar x={565} y={262} w={150} h={12} o={0.5} />
          {[0, 1, 2, 3, 4].map((i) => (
            <g key={i}>
              <Bar x={565} y={296 + i * 24} w={95} o={0.3} />
              <Bar x={680} y={296 + i * 24} w={95} o={0.3} />
            </g>
          ))}
          <rect x={815} y={110} width={135} height={290} rx={20} {...P} />
          <text x={882} y={145} textAnchor="middle" fontSize={14} letterSpacing={2} style={sub}>CONFIDENCE</text>
          <text x={882} y={200} textAnchor="middle" fontSize={34} fontWeight={800} style={ink()}>98.4%</text>
          <rect x={832} y={222} width={100} height={10} rx={5} style={P2} />
          <rect x={832} y={222} width={98} height={10} rx={5} fill="#22c55e" />
          <Pill x={832} y={262} w={100} label="REAL" fill="#22c55e" text="#052e16" />
          <Pill x={832} y={312} w={100} label="FAKE" text="#fb7185" stroke="#fb7185" />
          <text x={882} y={382} textAnchor="middle" fontSize={14} style={sub}>39K+ articles</text>
        </g>
      );
    case "voice":
      return (
        <g>
          <circle cx={745} cy={225} r={175} fill="none" stroke="var(--a-line)" strokeWidth={2} opacity={0.6} />
          <circle cx={745} cy={225} r={128} fill="none" stroke="var(--a-line)" strokeWidth={2} opacity={0.9} />
          {Array.from({ length: 25 }, (_, i) => {
            const h = 26 + 170 * Math.abs(Math.sin(i * 0.6 + 0.4)) * (1 - Math.abs(i - 12) / 14);
            return (
              <rect
                key={i} x={583 + i * 13} y={225 - h / 2} width={8} height={h} rx={4}
                fill={c} opacity={0.5 + 0.5 * (h / 190)}
              />
            );
          })}
          <Pill x={565} y={392} w={112} label="LISTEN" fill={c} text="#04222f" />
          <Pill x={690} y={392} w={112} label="THINK" text="var(--a-ink)" stroke="var(--a-line)" />
          <Pill x={815} y={392} w={112} label="SPEAK" text="var(--a-ink)" stroke="var(--a-line)" />
        </g>
      );
    case "cart":
      return (
        <g>
          <rect x={540} y={70} width={410} height={360} rx={28} {...P} />
          <rect x={560} y={90} width={370} height={80} rx={16} fill={c} opacity={0.92} />
          <rect x={580} y={112} width={190} height={14} rx={7} fill="#06222b" opacity={0.8} />
          <rect x={580} y={136} width={120} height={10} rx={5} fill="#06222b" opacity={0.45} />
          <rect x={862} y={105} width={50} height={50} rx={12} fill="#fff" opacity={0.4} />
          {["#f59e0b", "#fb7185", "#60a5fa"].map((col, i) => (
            <g key={col}>
              <rect x={560 + i * 125} y={188} width={115} height={165} rx={14} style={P2} />
              <rect x={570 + i * 125} y={198} width={95} height={92} rx={10} fill={col} opacity={0.85} />
              <Bar x={572 + i * 125} y={305} w={80} o={0.6} />
              <Bar x={572 + i * 125} y={325} w={50} o={0.3} />
            </g>
          ))}
          <Bar x={565} y={392} w={150} o={0.35} />
          <circle cx={905} cy={396} r={27} fill={c} />
          <path d="M888 384h6l5 16h17l4-12h-25" stroke="#06222b" strokeWidth={3} fill="none" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx={903} cy={408} r={3.2} fill="#06222b" />
          <circle cx={918} cy={408} r={3.2} fill="#06222b" />
        </g>
      );
    case "shield":
      return (
        <g>
          <rect x={560} y={80} width={370} height={260} rx={24} {...P} />
          {[
            "M600 140V100h44", "M846 100h44v40", "M600 280v40h44", "M890 280v40h-44",
          ].map((d) => (
            <path key={d} d={d} fill="none" stroke={c} strokeWidth={6} strokeLinecap="round" strokeLinejoin="round" />
          ))}
          <ellipse cx={745} cy={205} rx={54} ry={72} style={P2} stroke="var(--a-line)" strokeWidth={2} />
          <circle cx={725} cy={190} r={5} style={ink(0.7)} />
          <circle cx={765} cy={190} r={5} style={ink(0.7)} />
          <path d="M730 235q15 10 30 0" fill="none" stroke="var(--a-ink)" strokeWidth={3} opacity={0.5} strokeLinecap="round" />
          <polyline
            points="585,205 650,205 675,165 697,245 722,150 748,228 770,205 905,205"
            fill="none" stroke={c} strokeWidth={4} strokeLinecap="round" strokeLinejoin="round"
          />
          <Pill x={560} y={372} w={112} label="PASS" fill="#22c55e" text="#052e16" />
          <Pill x={690} y={372} w={120} label="REVIEW" fill="#f59e0b" text="#422006" />
          <Pill x={828} y={372} w={102} label="FAIL" fill="#ef4444" text="#ffffff" />
        </g>
      );
    case "java":
      return (
        <g>
          <text x={545} y={84} fontSize={14} letterSpacing={2} style={sub}>LINKED LIST</text>
          {[10, 20, 30, 40].map((n, i) => (
            <g key={n}>
              <rect x={545 + i * 100} y={96} width={76} height={54} rx={12} {...P} />
              <text x={583 + i * 100} y={132} textAnchor="middle" fontSize={26} fontWeight={800} style={ink()}>{n}</text>
              {i < 3 && (
                <g>
                  <line x1={624 + i * 100} y1={123} x2={637 + i * 100} y2={123} stroke={c} strokeWidth={3} />
                  <polygon points={`${637 + i * 100},116 ${645 + i * 100},123 ${637 + i * 100},130`} fill={c} />
                </g>
              )}
            </g>
          ))}
          <rect x={545} y={185} width={190} height={240} rx={20} {...P} />
          <text x={565} y={212} fontSize={14} letterSpacing={2} style={sub}>STACK</text>
          {[40, 30, 20, 10].map((n, i) => (
            <g key={n}>
              <rect x={573} y={226 + i * 46} width={134} height={38} rx={8} fill={c} opacity={0.95 - i * 0.18} />
              <text x={640} y={252 + i * 46} textAnchor="middle" fontSize={20} fontWeight={800} fill="#241002">{n}</text>
            </g>
          ))}
          <rect x={760} y={185} width={190} height={240} rx={20} {...P} />
          <text x={780} y={212} fontSize={14} letterSpacing={2} style={sub}>BINARY TREE</text>
          {[
            [855, 245, 800, 315], [855, 245, 910, 315],
            [800, 315, 780, 385], [800, 315, 828, 385], [910, 315, 888, 385], [910, 315, 935, 385],
          ].map(([a, b, x, y]) => (
            <line key={`${a}${x}${y}`} x1={a} y1={b} x2={x} y2={y} stroke="var(--a-line)" strokeWidth={3} />
          ))}
          <circle cx={855} cy={245} r={21} fill={c} />
          {[[800, 315], [910, 315]].map(([x, y]) => <circle key={x} cx={x} cy={y} r={19} fill={c} opacity={0.8} />)}
          {[[780, 385], [828, 385], [888, 385], [935, 385]].map(([x, y]) => <circle key={x} cx={x} cy={y} r={16} fill={c} opacity={0.6} />)}
        </g>
      );
    case "c":
      return (
        <g>
          <rect x={540} y={75} width={410} height={350} rx={22} {...P} />
          <circle cx={570} cy={102} r={6} fill="#ef4444" />
          <circle cx={592} cy={102} r={6} fill="#f59e0b" />
          <circle cx={614} cy={102} r={6} fill="#22c55e" />
          <g fontFamily="ui-monospace, Menlo, Consolas, monospace" fontSize={21}>
            <text x={568} y={152} fill={c}>{"#include <stdio.h>"}</text>
            <text x={568} y={186} style={ink()}>{"int x = 42;"}</text>
            <text x={568} y={218} style={ink()}>{"int *p = &x;"}</text>
            <text x={568} y={250} style={ink(0.85)}>{'printf("%d", *p);'}</text>
          </g>
          <rect x={568} y={286} width={150} height={60} rx={10} style={P2} />
          <text x={643} y={324} textAnchor="middle" fontSize={22} fontWeight={800} style={ink()}>x = 42</text>
          <rect x={780} y={286} width={150} height={60} rx={10} style={P2} stroke={c} strokeWidth={2} />
          <text x={855} y={324} textAnchor="middle" fontSize={22} fontWeight={800} style={ink()}>p = &amp;x</text>
          <line x1={778} y1={316} x2={730} y2={316} stroke={c} strokeWidth={3} />
          <polygon points="730,308 718,316 730,324" fill={c} />
          <text x={643} y={376} textAnchor="middle" fontSize={15} style={sub}>0x1000</text>
          <text x={855} y={376} textAnchor="middle" fontSize={15} style={sub}>0x1008</text>
        </g>
      );
  }
}

export default function ProjectArt({ kind, tech }: { kind: ArtKind; tech: string[] }) {
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const m = META[kind];
  const tiles = tech.slice(0, 3);

  return (
    <svg
      viewBox="0 0 1000 500"
      preserveAspectRatio="xMidYMid slice"
      className="block h-full w-full"
      role="img"
      aria-label={`${m.l1} ${m.l2}`}
    >
      <defs>
        <linearGradient id={`bg${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" style={{ stopColor: "var(--a-bg1)" }} />
          <stop offset="1" style={{ stopColor: "var(--a-bg2)" }} />
        </linearGradient>
        <radialGradient id={`gl${uid}`} cx="0.75" cy="0.3" r="0.6">
          <stop offset="0" stopColor={m.c} stopOpacity="0.38" />
          <stop offset="1" stopColor={m.c} stopOpacity="0" />
        </radialGradient>
      </defs>

      <rect width="1000" height="500" fill={`url(#bg${uid})`} />
      <rect width="1000" height="500" fill={`url(#gl${uid})`} />

      {/* underwater rays + bubbles (Realistic theme only) */}
      <g className="art-fx">
        <polygon points="560,0 650,0 470,500 330,500" fill="#fff" opacity="0.07" />
        <polygon points="760,0 830,0 700,500 590,500" fill="#fff" opacity="0.06" />
        <polygon points="900,0 960,0 900,500 820,500" fill="#fff" opacity="0.05" />
        {[[80, 440, 6], [150, 470, 4], [470, 450, 5], [520, 90, 4], [960, 60, 5], [30, 90, 4]].map(([x, y, r]) => (
          <circle key={`${x}${y}`} cx={x} cy={y} r={r} fill="none" stroke="#fff" strokeOpacity="0.5" strokeWidth="2" />
        ))}
      </g>

      {/* Title */}
      <text x="70" y="140" fontSize="68" fontWeight="800" className="font-display" style={ink()}>
        {m.l1}
      </text>
      <text x="70" y="192" fontSize="40" fontWeight="800" className="font-display" style={ink()}>
        {m.l2}
      </text>
      <rect x="70" y="212" width="64" height="6" rx="3" fill={m.c} />
      <text x="70" y="258" fontSize="23" style={sub}>
        {m.sub}
      </text>

      {/* Tech tiles */}
      {tiles.map((t, i) => (
        <g key={t}>
          <rect x="70" y={282 + i * 58} width="260" height="50" rx="12" {...P} />
          <circle cx="97" cy={307 + i * 58} r="9" fill={m.c} />
          <text x="118" y={315 + i * 58} fontSize="25" fontWeight="700" style={ink()}>
            {t}
          </text>
        </g>
      ))}

      <Motif kind={kind} c={m.c} />
    </svg>
  );
}
