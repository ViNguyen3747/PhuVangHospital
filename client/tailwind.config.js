module.exports = {
  content: ["./src/**/*.{html,js}", "./public/**/*.{html,js}"],
  theme: {
    extend: {},
    colors: {
      transparent: "transparent",
      current: "currentColor",
      turquoise: {
        light: "#6acecc",
        DEFAULT: "#05aea6",
        dark: "#019091",
      },
      blue: {
        DEFAULT: "#132e48",
      },
      yellow: {
        DEFAULT: "#e8bc10",
      },
      green: {
        DEFAULT: "#056947",
      },
      brown: {
        light: "#ae4700",
        DEFAULT: "#802e0e",
        dark: "#802e0e",
      },
      gray: {
        darkest: "#1f2d3d",
        dark: "#3c4858",
        DEFAULT: "#c0ccda",
        light: "#e0e6ed",
        lightest: "#f9fafc",
      },
      white: {
        DEFAULT: "#FFFFFF",
      },
    },
  },
  variants: {
    textColor: ["hover", "active"],
  },
  plugins: [],
};
