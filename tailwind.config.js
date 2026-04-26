/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx,mdx}', './index.html'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ink: {
          950: '#07090d',
          900: '#0b0d12',
          850: '#0f1218',
          800: '#13171f',
          700: '#1a1f2a',
          600: '#252b39',
          500: '#3a4254',
          400: '#5a6378',
          300: '#8a93a8',
          200: '#b8bfd0',
          100: '#dadfeb',
          50: '#ede9de',
        },
        accent: {
          50: '#f3efff',
          100: '#e6dcff',
          200: '#c8b3ff',
          300: '#a585ff',
          400: '#8a64ff',
          500: '#7c5cff',
          600: '#6a48f0',
          700: '#5634d4',
          800: '#4426ad',
          900: '#311a86',
        },
        signal: {
          400: '#ffe066',
          500: '#ffd43b',
          600: '#f0bf00',
        },
        success: '#3ddc97',
        danger: '#ff5d73',
        // Aliases preserved so legacy classes keep compiling during the redesign sweep.
        primary: {
          50: '#f3efff',
          100: '#e6dcff',
          200: '#c8b3ff',
          300: '#a585ff',
          400: '#8a64ff',
          500: '#7c5cff',
          600: '#6a48f0',
          700: '#5634d4',
          800: '#4426ad',
          900: '#311a86',
        },
        secondary: {
          50: '#fffbe6',
          100: '#fff4b8',
          200: '#ffe97a',
          300: '#ffe066',
          400: '#ffd43b',
          500: '#f0bf00',
          600: '#c79b00',
          700: '#9c7800',
          800: '#705500',
          900: '#473500',
        },
        dark: {
          50: '#0b0d12',
          100: '#0f1218',
          200: '#13171f',
          300: '#1a1f2a',
          400: '#252b39',
          500: '#3a4254',
          600: '#5a6378',
          700: '#8a93a8',
          800: '#b8bfd0',
          900: '#ede9de',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
      },
      fontSize: {
        '2xs': ['0.6875rem', { lineHeight: '1rem', letterSpacing: '0.04em' }],
      },
      letterSpacing: {
        tightest: '-0.04em',
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        md: '0.5rem',
        lg: '0.75rem',
        xl: '1rem',
        '2xl': '1.25rem',
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(124,92,255,0.18), 0 12px 40px -12px rgba(124,92,255,0.45)',
        plate: 'inset 0 1px 0 0 rgba(255,255,255,0.04), 0 1px 0 0 rgba(0,0,0,0.4)',
        'plate-lg': 'inset 0 1px 0 0 rgba(255,255,255,0.05), 0 24px 60px -24px rgba(0,0,0,0.6)',
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(circle at center, rgba(124,92,255,0.12), transparent 60%), linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)',
        'noise':
          "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)' opacity='0.5'/></svg>\")",
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'bounce-gentle': 'bounceGentle 2s infinite',
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'draw': 'draw 2.4s ease-in-out forwards',
        'orbit': 'orbit 18s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        bounceGentle: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5px)' },
        },
        draw: {
          from: { strokeDashoffset: '1' },
          to: { strokeDashoffset: '0' },
        },
        orbit: {
          from: { transform: 'rotate(0deg)' },
          to: { transform: 'rotate(360deg)' },
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
