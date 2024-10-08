import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    screens: {
      lg: "1024px",
      xl: "1280px"
    },
    extend: {
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic": "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))"
      },
      colors: {
        primaryheavy: "#0051B2",
        primarystrong: "#0068E5",
        primarynormal: "#1A82FF",
        primarylight: "#80BAFF",
        primarylightness: "#E1EEFE",

        destructive: "#F03F33"
      },
      fontFamily: {
        PretendardRegular: ["PretendardRegular"]
      }
    }
  },
  plugins: [require("tailwind-scrollbar-hide")]
};
export default config;
