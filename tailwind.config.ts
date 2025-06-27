import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
   theme: {
    extend: {
      colors: {
        primaryFrom: '#62CDCB',
        primaryTo: '#4599DB',
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(to right, #62CDCB, #4599DB)',
      },
    },
  },
  plugins: [],
}
export default config
