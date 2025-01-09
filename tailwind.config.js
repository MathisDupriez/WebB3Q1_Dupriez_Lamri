// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",               // Inclure l'index HTML de l'application
    "./src/**/*.{js,ts,jsx,tsx}", // Inclure tous les fichiers JavaScript et TypeScript
    "./src/**/*.{sass,scss}",     // Inclure tous les fichiers SASS et SCSS dans src
  ],
  theme: {
    extend: {
      fontFamily: {
        'heebo': ['Heebo', 'sans-serif'],
        'alexandria': ['Alexandria', 'sans-serif'],
      },
      backgroundImage: {
        'card-gradient': 'linear-gradient(360deg, rgba(0, 0, 0, 0.44) 80%, rgba(0, 0, 0, 0.44) 80%, rgba(0, 0, 0, 0.22) 80%, rgba(102, 102, 102, 0) 100%)',
      }
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
