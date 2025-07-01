import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "layout-primary": "#09141A",
        "layout-secondary": "#0E191F",
        "btn-choice": "#162329",
           "input-primary": "#1A252A",
      },
      backgroundImage: {
        "gradient-primary": "linear-gradient(to right, #62CDCB, #4599DB)",
        "gradient-primary-hover": "linear-gradient(to right, #3cb1ae, #2a6dbb)",
        "radial-accent":
          "radial-gradient(200% 200% at 90% 10%, #1F4247, #0D1D23, #09141A)",
        "gradient-img-profile":
          "linear-gradient(to bottom right, #1F4247, #0D1D23)",
        "gradient-gold": "linear-gradient(to right, #94783E, #F3EDA6, #D5BE88)",
      },
    },
  },
  plugins: [],
};

export default config;
