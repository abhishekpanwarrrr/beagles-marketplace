/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {},
  },
  plugins: [],
  darkMode: 'class',
  // NOTE: This is required for the nativewind preset to work properly.
  corePlugins: {
    preflight: false,
  },
  // NOTE: This is required for the nativewind preset to work properly.
};
