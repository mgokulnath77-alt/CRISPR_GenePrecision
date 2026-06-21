/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f5f7fa',
          100: '#e4e9f2',
          200: '#cbd5e1', // Slate 300
          300: '#94a3b8', // Slate 400
          400: '#64748b', // Slate 500
          500: '#475569', // Slate 600
          600: '#334155', // Slate 700
          700: '#1e293b', // Slate 800
          800: '#0f172a', // Slate 900
          900: '#020617', // Slate 950
        },
        brand: {
          50: '#eff6ff',
          100: '#dbeafe',
          500: '#3b82f6', // Blue 500
          600: '#2563eb', // Blue 600
          700: '#1d4ed8', // Blue 700
          900: '#1e3a8a',
        },
        accent: {
          50: '#ecfdf5',
          100: '#d1fae5',
          500: '#10b981', // Emerald 500
          600: '#059669', // Emerald 600
          700: '#047857',
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'ui-monospace', 'monospace'],
      },
      animation: {
        'dna-spin': 'dnaSpin 3s ease-in-out infinite',
      },
      keyframes: {
        dnaSpin: {
          '0%, 100%': { transform: 'scaleY(1)' },
          '50%': { transform: 'scaleY(0.1)' },
        }
      }
    },
  },
  darkMode: 'class',
  plugins: [],
}
