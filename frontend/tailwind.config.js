/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Paleta Gastronômica (Pastel)
        'cream': '#FDFBF7',          // Fundo Creme (conforto visual)
        'primary': '#FF9F89',        // Salmão (Botões/Ação - abre o apetite)
        'primary-dark': '#E88670',   // Salmão escuro (Hover)
        'secondary': '#8EB36B',      // Verde Sálvia (Saúde/Frescor)
        'charcoal': '#4A4A4A',       // Cinza Chumbo (Texto elegante)
        'sand': '#E5E1D8',           // Areia (Bordas sutis)
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'], 
      }
    },
  },
  plugins: [],
}