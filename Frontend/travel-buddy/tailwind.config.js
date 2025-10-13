/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.{js,jsx,ts,tsx}", 
  ],
  theme: {
    extend: {
      colors: {
        brand1: "#ffb545",
        brand2: "#00c46a",
        dark0: "#242a2e",
        dark1: "#2d3439",
        dark2: "#42484d",
        light1: "#aaa",
        light2: "#ececec",
        light3: "#d6dee0",
      },
    },
  },
  plugins: [],
  jsx: "react-jsx",
};
