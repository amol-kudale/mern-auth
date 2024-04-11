/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "custom-blue": "#007bff",
        "custom-dark-blue": "#0056b3",
        "custom-gray": "#7d7c7c",
        "custom-white": "#f9f8f8",
      },
    },
  },
  plugins: [],
};
