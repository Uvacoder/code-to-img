const colors = require("tailwindcss/colors");
module.exports = {
  content: ["src/**/*.{ts,tsx,js,jsx}", "app/**/*.{ts,tsx,js,jsx}"],
  theme: {
    extend: {
      colors: {
        primary: colors.indigo,
        gray: colors.zinc,
      },
    },
  },
  plugins: [],
};
