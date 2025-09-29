/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", // include all your screens/components
    "./components/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        "--color-brand--1": "#ffb545",
        "--color-brand--2": "#00c46a",
        "--color-dark--0": "#242a2e",
        "--color-dark--1": "#2d3439",
        "--color-dark--2": "#42484d",
        "--color-light--1": "#aaa",
        "--color-light--2": "#ececec",
        "--color-light--3": "#d6dee0",
      },
    },
  },
  plugins: [],
};
