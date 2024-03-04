/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textColor: '#a7b4bd',
        ticketColor: '#22262a',
      },
    },
  },
  plugins: [],
}

