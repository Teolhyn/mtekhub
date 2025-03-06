/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./frontend/js/**/*.{js,jsx,ts,tsx}",
    "./frontend/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}

