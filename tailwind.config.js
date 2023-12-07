/** @type {import('tailwindcss').Config} */

import { nextui } from "@nextui-org/react";

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "food": "url('C:\\Users\\Sahil.DESKTOP-V0F9A4D\\CS320-group-7\\R.jpeg')"
      },
      colors:{
        'dark-green': '#013220',
        'pakistan-green': '#014421',
        'hunter-green': '#355E3B',
        'mass-green': '#8A9A5B',
        'sage': '#BCB88A',
        'celadon': '#A7DCA5'
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
};
