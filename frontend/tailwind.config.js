<<<<<<< HEAD
// /** @type {import('tailwindcss').Config} */
// export default {
//   content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
//   theme: {
//     extend: {
//       colors: {
//         "custom-blue": "#007bff",
//         "custom-dark-blue": "#0056b3",
//         "custom-gray": "#7d7c7c",
//         "custom-white": "#f9f8f8",
//       },
//     },
//   },
//   plugins: [],
// };
const withMT = require("@material-tailwind/react/utils/withMT");

module.exports = withMT({
  content: [
    "./src/**/*.{html,js,jsx,ts,tsx}",
    // "./node_modules/tw-elements/dist/js/**/*.js",
=======
const withMT = require("@material-tailwind/react/utils/withMT");
 
module.exports = withMT({
  content: [    
      "./src/**/*.{html,js,jsx,ts,tsx}",
>>>>>>> 138db0923d26206ee41a11b754f7c8ec7bd41208
  ],
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
});
