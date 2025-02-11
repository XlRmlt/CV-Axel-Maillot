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
            light: 'var(--color-background-light)',
            dark: 'var(--color-background-dark)',
            darker: 'var(--color-background-darker)',
          },
          text: {
            primary: 'var(--color-text-primary)',
            muted: 'var(--color-text-muted)',
          },
          primary: {
            DEFAULT: 'var(--color-primary)',
            dark: 'var(--color-primary-dark)',
          },
        },
      },
    },
    plugins: [],
  }