module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      animation: {
        'fadeIn': 'fadeIn 0.75s ease-in',
        'notification': 'notification 0.5s linear',
      },
      fontFamily: {
        raleway: ['Raleway', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        notification: {
          '0%': { top: '-10rem' },
          '100%': { top: 4 },
        },
      },
    },
  },
  plugins: [],
};
