/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#050910',
        primary_important: '#19b2ff',
        primary_golden: '#ffb314',
        primary_hint: '#06e1ff',
        app_bg: '#080c17',
      },
    },
  },
  plugins: [],
};
