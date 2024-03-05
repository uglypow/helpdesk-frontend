/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        textColor: '#2d415d',
        ticketColor: '#f8f4f4',
        columnColor: '#f8f4f4'
      },
    },
  },
  plugins: [
    function ({addUtilities}) {
      const newUtilities = {
        ".scrollbar-thin" : {
          scrollbarWidth : "thin",
          scrollbarColor : "#c5c8d2 white"
        },
        ".scrollbar.webkit" : {
          "$::-webkit-scrollbar" : {
            width: "8px"
          },
          "$::-webkit-scrollbar-track" : {
            background: "white"
          },
          "$::-webkit-scrollbar-thumb" : {
            backgroundColor: "rgb(31 41 55)",
            borderRadius: "20px",
            border: "1px solid white"
          }
        }
      }

      addUtilities(newUtilities, ["responsive", "hover"])
    }
  ],
}

