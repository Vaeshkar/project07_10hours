export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        robotoCondensed: ['"Roboto Condensed"', 'sans-serif'],
      },
    },
    screens: {
      sm: '640px',
      md: '768px', // < this is what your layout depends on
      lg: '1024px',
      xl: '1280px',
    },
  },
  plugins: [],
}
