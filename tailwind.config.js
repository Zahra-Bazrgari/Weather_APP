/** @type {import('tailwindcss').Config} */
export default {
  content: ["**/*.html", "**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Roboto", "Arial", "sans-serif"],
      },
      backgroundImage: {
        "custom-bg": "linear-gradient(45deg, #2f4680, #500ae4)",
        "custom-green-bg": "linear-gradient(135deg, #00feba, #5b548a)",
      },
      boxShadow: {
        myShadow1: "4.9px -5px 0 0 white",
        myShadow2: "-4.9px -5px 0 0 white",
      },
    },
  },
  plugins: [],
};
