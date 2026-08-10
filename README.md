# Deepak Gupta — 3D Interactive Portfolio

An interactive, cyberpunk-themed developer portfolio built with **React**,
**TypeScript**, **Tailwind CSS**, and **Framer Motion** — featuring an
animated hero with orbiting tech icons, mouse-reactive 3D tilt effects, and
project cards that continuously travel along an animated path.

**Live site:** _add your Vercel/GitHub Pages URL here_

---

## ✨ Features

- **Orbiting hero animation** — the developer's name sits at the center of
  two rotating rings of technology icons, each icon counter-rotated so it
  stays upright as it travels around the ring.
- **3D mouse-tilt interactions** — the hero, profile photo, skill cards,
  and project cards all subtly tilt toward the cursor using spring-based
  motion values.
- **Animated project showcase** — project cards move along a continuously
  looping elliptical path with a depth-based scale effect, rather than
  sitting in a static grid.
- **Active-section navigation** — the navbar highlights the section
  currently in view using the native `IntersectionObserver` API.
- **Fully responsive** — 3D/orbit effects gracefully fall back to simple
  stacked layouts on mobile, where hover- and space-dependent effects
  aren't practical.
- **Fully typed** — every section's data (projects, skills, contact links,
  orbit items) is modeled with TypeScript interfaces.

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| UI Library | React 18 |
| Language | TypeScript |
| Build Tool | Vite |
| Styling | Tailwind CSS |
| Animation | Framer Motion |
| Icons | react-icons |

## 📁 Project Structure

```
src/
├── components/
│   ├── Navbar.tsx      # Active-section-aware navigation
│   ├── Home.tsx         # Hero: name, orbiting icon rings, star field
│   ├── OrbitIcons.tsx   # Reusable circular-orbit animation component
│   ├── About.tsx        # Bio + 3D-tilt profile photo
│   ├── Skills.tsx        # Tilt-on-hover skill cards
│   ├── Projects.tsx      # Animated/orbiting project cards + modal
│   ├── Resume.tsx        # Resume preview/download
│   └── Contact.tsx       # Contact links (email, phone, socials)
├── App.tsx
├── main.tsx
└── index.css
```

## 🚀 Getting Started

```bash
# Clone the repo
git clone https://github.com/DeepakGupta2006/deepak-portfolio.git
cd deepak-portfolio

# Install dependencies
npm install

# Add your assets
# public/deepak.jpeg   – your profile photo
# public/Deepak_R.pdf  – your resume

# Run the dev server
npm run dev
```

Visit `http://localhost:5173` to view it locally.

### Build for production

```bash
npm run build
```

Outputs a static site to `dist/`, ready to deploy anywhere.

## 📦 Deployment

This project deploys cleanly to **Vercel** (recommended) or **GitHub
Pages**. Push to `main` and Vercel will automatically build and deploy on
every commit.

## 📄 License

This project is open for reference and learning purposes. Feel free to
fork it, but please don't copy the personal content (name, photo, resume,
contact details) as your own.

---

Built by **Deepak Gupta** — Full Stack Developer
