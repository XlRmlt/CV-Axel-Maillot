/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          primary: 'var(--background-primary)',
          popup: 'var(--background-popup)',
          selected: 'var(--background-selected)',
          hover: 'var(--background-hover)',
          'gradient-start': 'var(--background-gradient-start)',
          'gradient-end': 'var(--background-gradient-end)',
        },
        text: {
          primary: 'var(--text-primary)',
          grey: 'var(--text-grey)',
          muted: 'var(--text-muted)',
          error: 'var(--text-error)',
        },
        border: {
          default: 'var(--border-default)',
          color: 'var(--border-color)',
        },
      },
    },
  },
  plugins: [],
}