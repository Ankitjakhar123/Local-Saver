/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // AMOLED-friendly colors
        amoled: {
          black: '#000000',
          gray: {
            900: '#121212',
            800: '#181818',
            700: '#202020',
            600: '#282828',
            500: '#303030',
            400: '#404040',
            300: '#505050',
            200: '#606060',
            100: '#808080',
          },
          accent: {
            primary: '#00E676',    // Green accent
            secondary: '#00B0FF',  // Blue accent
            danger: '#FF5252',     // Red accent
            warning: '#FFD740',    // Yellow accent
          }
        }
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};