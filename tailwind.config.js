// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",               // Inclure l'index HTML de l'application
    "./src/**/*.{js,ts,jsx,tsx}", // Inclure tous les fichiers JavaScript et TypeScript
    "./src/**/*.{sass,scss}",     // Inclure tous les fichiers SASS et SCSS dans src
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}
