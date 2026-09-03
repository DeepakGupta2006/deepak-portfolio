/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      perspective: {
        800: "800px",
        1000: "1000px",
        1500: "1500px",
      },
    },
  },
  plugins: [],
  colors: {
  'cyan-soft': '#22d3ee',
},
animation: {
  blink: 'blink 1s step-end infinite',
},
keyframes: {
  blink: {
    '0%, 100%': { opacity: 1 },
    '50%': { opacity: 0 },
  },
},
};
