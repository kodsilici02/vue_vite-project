module.exports = {
  mode: "jit",
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/flowbite/**/*.js",
  ],

  darkMode: "media", // or 'class'
  theme: {
    extend: {},
  },
  plugins: [],
};
