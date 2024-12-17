// const flowbite = require("flowbite-react/tailwind");

// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     flowbite.content(),
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     flowbite.plugin(),
//     require('tailwind-scrollbar'),
//     // require('@tailwindcss/line-clamp'),
//   ],
// }


// /** @type {import('tailwindcss').Config} */
// export default {
//   content: [
//     "./index.html",
//     "./src/**/*.{js,ts,jsx,tsx}",
//     "./node_modules/flowbite-react/**/*.js", // For flowbite-react components
//   ],
//   theme: {
//     extend: {},
//   },
//   plugins: [
//     require("tailwind-scrollbar"),
//     // require("@tailwindcss/line-clamp"),
//   ],
// };


import { defineConfig } from "tailwindcss";
import tailwindScrollbar from "tailwind-scrollbar";
import flowbite from "flowbite-react/tailwind";

export default defineConfig({
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./node_modules/flowbite-react/**/*.js",
  ],
  theme: {
    extend: {},
  },
  plugins: [
    flowbite,
    tailwindScrollbar,
    // Add other plugins here if needed
  ],
});
