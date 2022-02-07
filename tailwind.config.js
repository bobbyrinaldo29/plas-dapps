module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-blue-pf': '#1d3564',
        'blue-pf': '#00529b',
        'sky-blue-pf': '#16a9e2',
        'white-pf': '#dcf1f6',
        'green-pf': '#7dc242',
      }
    },
    fontFamily: {
      sans: ['Montserrat', 'sans-serif'],
    }
  },
  plugins: [],
}
