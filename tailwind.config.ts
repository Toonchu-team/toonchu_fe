import { type Config } from "tailwindcss";
import scrollbarHide from "tailwind-scrollbar-hide";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      padding: {
        mobile: "1rem",
        tablet: "2rem",
        desktop: "25rem",
      },
      fontFamily: {
        nanumsquare: ["var(--font-nanumsquare)", "sans-serif"],
        lemonada: ["var(--font-lemonada)", "cursive"],
      },
      colors: {
        "main-yellow": "#EFC071",
        "main-grey": "#968E82",
        "main-pink": "#F1B593",
        "main-red": "#FF5050",
        "main-text": "#6A6A6A",
        "bg-grey-01": "#EFEFEF",
        "bg-yellow-01": "#FFD795",
        "bg-red-01": "#FF8B8B",
      },
    },
  },
  plugins: [scrollbarHide],
};

export default config;
