/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#e15b64",
        secondary: "#849b87",
        tertiary: "#ff3d2a",
        fourth: "#9B4747",
        fifth: '#4a1f1f',
      },

      fontFamily: {
        firasans:["Fira Sans", "sans-serif"],
        rubik: ["Rubik", "serif"],
        playfair: ["Playfair Display","serif"],
      },
      container: {
        center: true,
        padding: {
          DEFAULT: "1rem",
          sm: "2rem",
          lg: "4rem",
          xl: "5rem",
          "2xl": "6rem",
        },
    },
  },
  plugins: [],
}
}
