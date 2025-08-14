/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        blue: "#29A8FF",
        darkBlue: "#005DB2",
        gray: "#303136",
        darkGray: "#17181A",
      },
    },
  },
  plugins: [],
};
