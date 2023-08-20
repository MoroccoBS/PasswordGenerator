/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        Primary: "#a4ffaf",
        Secondary: "#0f0e14",
        Bar: "#18171f",
        Bg: "#24232b",
      },
    },
  },
  plugins: [],
};
