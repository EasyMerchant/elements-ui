/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./hpp/**/*.{html,js}", "./js-sdk/**/*.{html,js}"],
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
          400: "#666666",
          300: "#9e9e9e",
          200: "#d6d6d6",
          100: "#efefef",
          50: "#00000061",
        },
      },
      maxWidth: {
        105: "105rem",
      },
    },
  },
  plugins: [],
};
