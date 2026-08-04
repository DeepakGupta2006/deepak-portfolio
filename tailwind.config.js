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
};
