module.exports = {
  prefix: '',
  purge: {
    enabled:
      process.env.NODE_ENV === undefined
        ? true
        : process.env.NODE_ENV === 'production',
    content: ['./src/**/*.{html,ts}', './projects/**/*.{html,ts}'],
  },
  darkMode: 'class',
  theme: {
    fontFamily: {
      display: ['Oswald', 'sans-serif'],
      body: ['Poppins', 'sans-serif'],
    },
    container: {
      center: true,
      padding: '1.5rem',
    },
    extends: {
      color: {
        inherit: 'inherit',
        transparent: 'transparent',
        current: 'currentColor',
      },
    },
  },
  variants: {},
  plugins: [],
};
