/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
      extend: {
          colors: {
              blue: {
                  facebook: "#3477fe",
              },
          },
          fontFamily: {
            sans: ['Poppins', 'sans-serif'], // ou 'Inter', 'Roboto', etc.
          },
      },
  },
  plugins: [],
};
