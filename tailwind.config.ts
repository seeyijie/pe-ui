import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/context/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e5f8ff',
          100: '#b8edff',
          200: '#8ae2ff',
          300: '#5cd7ff',
          400: '#2ecfff',
          500: '#00c3ff',
          600: '#00a4e6',
          700: '#0086cc',
          800: '#0069b3',
          900: '#004c99',
        },
        secondary: {
          50: '#f2f0ff',
          100: '#e4e0ff',
          200: '#cfc6ff',
          300: '#b49dff',
          400: '#9e75ff',
          500: '#844dff',
          600: '#7831ff',
          700: '#6c21fa',
          800: '#571ae5',
          900: '#491bc0',
        },
        dark: {
          50: '#f6f7f9',
          100: '#eceef2',
          200: '#d4d9e3',
          300: '#adb8ca',
          400: '#8191ab',
          500: '#5e718e',
          600: '#475574',
          700: '#394466',
          800: '#232942',
          900: '#171b2d',
          950: '#0c0e18',
        },
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        'xl': '0.75rem',      // 12px
        '2xl': '1rem',        // 16px
        '3xl': '1.5rem',      // 24px
        '4xl': '2rem',        // 32px
      },
      boxShadow: {
        'glow': '0 0 10px rgba(0, 195, 255, 0.5), 0 0 20px rgba(0, 195, 255, 0.3)',
        'glow-lg': '0 0 15px rgba(0, 195, 255, 0.6), 0 0 30px rgba(0, 195, 255, 0.4)',
        'inner-glow': 'inset 0 0 5px rgba(0, 195, 255, 0.3)',
      },
      backdropBlur: {
        xs: '2px',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
}
export default config 