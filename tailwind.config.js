/** @type {import('tailwindcss').Config} */
// eslint-disable-next-line no-undef
const colors = require('tailwindcss/colors');
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        ...colors,
        primary: '#fd9900',
      },
      boxShadow: {
        'card-wrapper': '0 1px 2px 0 rgba(0, 0, 0, 0.1)',
      },
    },
  },
  plugins: [],
};
