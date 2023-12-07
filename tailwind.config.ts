import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "food": "url('C:\\Users\\Sahil.DESKTOP-V0F9A4D\\CS320-group-7\\R.jpeg')"
      },
      colors:{
        'dark-green': '#013220',
        'pakistan-green': '#014421',
        'hunter-green': '#355E3B',
        'mass-green': '#8A9A5B',
        'sage': '#BCB88A'
      }
    },
  },
  plugins: [],
};
export default config;
