# Deepak Gupta — 3D Portfolio (React + TypeScript + Tailwind + Framer Motion)

A cyan/black cyberpunk-style portfolio where your **name sits at the center
and tech icons orbit around it in two rotating rings**, plus subtle **3D
mouse-tilt** on the hero, the About photo, skill cards, and project cards.

---

## 1. What was fixed/added vs your original code

Your original `Home.jsx` put `animate={{...}}` and `transition={{...}}`
directly on plain `<div>` / `<h1>` tags. Plain HTML elements don't understand
those props — only `motion.div`, `motion.h1`, etc. from `framer-motion` do.
That's why nothing was actually rotating.

What changed:
- Every animated element is now a real `motion.*` component.
- **`OrbitIcons.tsx`** is now a real, reusable component: it places any list
  of icons evenly around a circle and spins the ring forever, while
  counter-rotating each icon so it stays upright (doesn't spin upside down).
- **`Home.tsx`** uses two `OrbitIcons` rings (inner + outer, opposite
  directions, different speeds) around your name, plus a mouse-tracked 3D
  tilt (`rotateX` / `rotateY`) on the whole hero using `perspective`.
- **`About.tsx`**, **`Skills.tsx`**, **`Projects.tsx`** got the same
  mouse-tilt "3D card" treatment on hover.
- Everything converted to **TypeScript** (`.tsx`) with proper interfaces
  (`Project`, `Skill`, `OrbitItem`, `ContactCard`) instead of loose objects.
- **`Navbar.tsx`** now highlights the section you're currently viewing using
  `IntersectionObserver`.

---

## 2. Project structure

```
portfolio-3d/
├── index.html
├── package.json
├── postcss.config.js
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── public/
│   ├── deepak.jpeg        ← put your photo here
│   └── Deepak_R.pdf       ← put your resume here
└── src/
    ├── main.tsx
    ├── App.tsx
    ├── index.css
    └── components/
        ├── Navbar.tsx
        ├── Home.tsx
        ├── OrbitIcons.tsx  ← the reusable orbit-ring component
        ├── About.tsx
        ├── Skills.tsx
        ├── Projects.tsx
        ├── Resume.tsx
        └── Contact.tsx
```

---

## 3. How to run it (step by step)

**Requirements:** Node.js 18+ installed ([nodejs.org](https://nodejs.org)).

1. Open a terminal in the `portfolio-3d` folder.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Add your real assets into `public/`:
   - `public/deepak.jpeg` — your profile photo
   - `public/Deepak_R.pdf` — your resume PDF
4. Start the dev server:
   ```bash
   npm run dev
   ```
5. Open the printed URL (usually `http://localhost:5173`) in your browser.

To build for production (e.g. to deploy on Vercel/Netlify):
```bash
npm run build
```
This outputs a static site into `dist/`, which you can deploy anywhere
(Vercel, Netlify, GitHub Pages, etc.).

---

## 4. How the orbit rotation actually works

`OrbitIcons.tsx` does three things for each icon:

1. **Positions it on a circle** using
   `transform: rotate(angle) translate(radius) rotate(-angle)` — this
   places it at `angle` degrees around the circle without rotating the icon
   itself.
2. **Spins the whole ring** with `motion.div` `animate={{ rotate: 360 }}`
   on an infinite linear loop — this is what makes the icons travel around
   the name.
3. **Counter-rotates each icon** at the same speed in the opposite
   direction, so as the ring turns, every icon visually stays right-side-up
   instead of spinning in place.

`Home.tsx` renders two of these rings around the name (`radius=190` fast/
forward, `radius=300` slower/reverse) so it reads as a genuine multi-layer
orbit, similar to a solar-system diagram.

The **3D feel** on top of that comes from tracking the mouse position inside
the hero (`useMotionValue` + `useTransform` + `useSpring`), converting it
into `rotateX` / `rotateY` on a parent with `perspective: 1200px` — the
whole orbit stage tilts slightly toward your cursor.

---

## 5. Customizing

- **Change which icons orbit:** edit the `innerRing` / `outerRing` arrays in
  `Home.tsx` — swap icons from `react-icons` freely.
- **Change orbit speed/size:** tweak `radius`, `duration`, `reverse`, and
  `iconSize` props passed to `<OrbitIcons />`.
- **Change colors:** the whole theme is Tailwind cyan (`cyan-400`,
  `cyan-500`) on black — search/replace `cyan-` if you want a different
  accent.
- **Add more sections:** follow the pattern in `App.tsx` — each section is
  a self-contained component with its own `id` used by the navbar anchors.

---

## 6. Deploying

Easiest options:
- **Vercel:** `npm i -g vercel` then run `vercel` in the project folder.
- **Netlify:** drag-and-drop the `dist/` folder after `npm run build` onto
  [app.netlify.com/drop](https://app.netlify.com/drop).
