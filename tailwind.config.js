/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}', './components/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        primary: '#1E3A8A',
        secondary: '#FBBF24',
        accent: '#F472B6',
        neutral: '#374151',
        'base-100': '#F9FAFB',
        info: '#3ABFF8',
        success: '#36D399',
        warning: '#FBBD23',
        error: '#F87272',
        light: '#F3F4F6',
        dark: '#111827',
        muted: '#6B7280',
        text: '#111827',
        pro: '#FA5A2A',
        'pro-black': '#030711',
        'pro-gray': '#A4A8B5',
      },
    },
  },
  plugins: [],
  darkMode: 'class',
  // NOTE: This is required for the nativewind preset to work properly.
  corePlugins: {
    preflight: false,
  },
  // NOTE: This is required for the nativewind preset to work properly.
};
