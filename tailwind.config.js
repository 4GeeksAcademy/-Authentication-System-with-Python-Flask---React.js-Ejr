/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation: {
        ["infinite-slider"]: "infiniteSlider 20s linear infinite",
      },
      keyframes: {
        infiniteSlider: {
          "0%": { transform: "translateX(0)" },
          "100%": {
            transform: `translateX(calc(-${216}px * ${9}))`, // Ajusta esto según el número total de cards visibles
          },
        },
      },
    },
  },
  plugins: [],
}