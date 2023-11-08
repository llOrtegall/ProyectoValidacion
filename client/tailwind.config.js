/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      backgroundImage: theme => ({
        'fondo': "url('../public/fondo.jpg')",
        'card1': "url('./public/card.png')"
      })
    }
  },
  variants: {},
  plugins: []
}
