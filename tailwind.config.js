/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./hpp/**/*.{html,js}", "./js-sdk/**/*.{html,js}","./node_modules/flowbite/**/*.js"],
  mode: "jit",
  theme: {
    fontFamily: {
      inter: ["Inter", "sans - serif"],
    },
    extend: {
      colors: {
        primary: {
          300: "#1757d9",
          200: "#3a70df",
        },
        background: "#edeff2",
        success: {
          300: "#22c215",
          200: "#22c2151a",
        },
        error: "#e93939",
        light: {
          500: "#000000de",
          400: "#00000099",
          300: "#9e9e9e",
          200: "#00000029",
          100: "#efefef",
          50: "#00000061",
          14: "#00000014"
        },
        "bright-gray":"#EDEFF2",
        "deep-carmine-pink":'#E93939',
        "charleston-green":'#2A2A2A',
        "cultured":'#F5F5F5',
      },
      maxWidth: {
        105: "105rem",
      },
      lineHeight:{
        "16-94":'16.94px',
      },
      padding:{
        "017":'17px',
      },
      zIndex:{
        "999":'999',
        "1000":'1000'
      },
    },
  },
  plugins: [
    require('flowbite/plugin'),
  ],
};
