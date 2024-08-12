/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      height: {
        'vh': 'calc(100vh - 15rem)',
      },
      width: {
        'vw': 'calc(100vw - 14rem)',
      }
    },
  },
  plugins: [],
  darkMode: 'class'
};
