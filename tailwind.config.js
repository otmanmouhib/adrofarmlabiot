/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        farm: {
          50: "#f5faf4",
          100: "#e6f3e3",
          200: "#cce4c7",
          300: "#9ed092",
          400: "#7bbf63",
          500: "#4f9f38",
          600: "#3f7e2f",
          700: "#336328",
          800: "#2c5323",
          900: "#26481f"
        }
      }
    }
  },
  plugins: []
};
