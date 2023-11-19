// tailwind-stripes.mjs
import plugin from "tailwindcss/plugin";

// https://transform.tools/css-to-js
export default plugin(
  ({ addBase, addComponents, addUtilities, matchUtilities, theme }) => {
    addBase({
      ":root": {
        "--stripes-rgb": "0 0 0",
        "--stripes-angle": "-45deg",
        "--stripes-opacity": "1",
        "--stripes-size": "20px",
      },
      "@keyframes slide": {
        from: { transform: "translateX(0)" },
        to: { transform: "translateX(var(--stripes-size))" },
      },
    });

    addComponents({
      ".stripes": {
        position: "relative",
        overflow: "hidden",
      },
      ".stripes > *": {
        isolation: "isolate",
      },
      ".stripes:before": {
        "--stripes-color": "rgb(var(--stripes-rgb) / var(--stripes-opacity))",
        position: "absolute",
        top: "0",
        right: "0",
        height: "100%",
        width: "calc(100% + var(--stripes-size))",
        content: "''",
        backgroundImage: `linear-gradient(
        var(--stripes-angle),
        var(--stripes-color) 5%,
        transparent 5% 45%,
        var(--stripes-color) 45% 55%,
        transparent 55% 95%,
        var(--stripes-color) 95%)`,
        backgroundSize: "var(--stripes-size) var(--stripes-size)",
        animation: "slide 1s infinite linear",
      },
    });

    addUtilities({
      ".stripes-white": {
        "--stripes-rgb": "255 255 255",
      },
      ".stripes-reverse": {
        "--stripes-angle": "45deg",
      },
    });

    // Support for all opacity values
    matchUtilities(
      {
        "stripes-opacity": (value) => ({
          "--stripes-opacity": value,
        }),
      },
      {
        values: theme("opacity"),
      },
    );

    // Support for sizes
    matchUtilities(
      {
        "stripes-size": (value) => ({
          "--stripes-size": value,
        }),
      },
      {
        values: theme("stripesSize"),
      },
    );
  },
  {
    // Customising the user's theme
    theme: {
      stripesSize: {
        sm: "12px",
        md: "20px",
        lg: "30px",
        xl: "40px",
      },
    },
  },
);
