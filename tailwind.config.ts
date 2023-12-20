import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      height: {
        screen: "100dvh",
      },
      width: {
        screen: "100dvw",
      },
      colors: {
        "fabric-100": "#c0e94f80",
        "fabric-200": "#c0e94f59",
        "fabric-300": "#c0e94f1a",
        "fabric-400": "#c0e94f",
        "fabric-500": "#82af13",
        "fabric-600": "#6a950a",
        "fabric-700": "#527a00",

        "color1-100": "#edffc8",
        "color1-200": "#d5fe81",
        "color1-300": "#9fe12d",
        "color1-400": "#73c41d",
        "color1-500": "#1d9336",
        "color1-600": "#00673b",
        "color1-700": "#004c39",

        "color2-100": "#fff5e5",
        "color2-200": "#ffc9b5",
        "color2-300": "#ff8c71",
        "color2-400": "#ff5f3f",
        "color2-500": "#ce4537",
        "color2-600": "#99292e",
        "color2-700": "#4c0021",

        "color3-100": "#fffae5",
        "color3-200": "#ffd9a3",
        "color3-300": "#ffbc68",
        "color3-400": "#fe961c",
        "color3-500": "#d26914",
        "color3-600": "#aa410c",
        "color3-700": "#6a0000",

        "color4-100": "#ffffe5",
        "color4-200": "#fff58f",
        "color4-300": "#ffee56",
        "color4-400": "#ffe619",
        "color4-500": "#dbb412",
        "color4-600": "#b6800b",
        "color4-700": "#7c3000",

        "color5-100": "#e5fdff",
        "color5-200": "#a2e3ff",
        "color5-300": "#5cc8ff",
        "color5-400": "#16acff",
        "color5-500": "#1087cc",
        "color5-600": "#095c8f",
        "color5-700": "#002b4c",

        "color6-100": "#fde5ff",
        "color6-200": "#e0beff",
        "color6-300": "#bd8eff",
        "color6-400": "#a168ff",
        "color6-500": "#794fcd",
        "color6-600": "#4c3293",
        "color6-700": "#0d0a43",

        "color7-100": "#ffe9e5",
        "color7-200": "#ffbdc8",
        "color7-300": "#ff86a3",
        "color7-400": "#ff5d88",
        "color7-500": "#cc4373",
        "color7-600": "#96275d",
        "color7-700": "#4c003e",

        "color8-100": "#e5ffe6",
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};

export default config;
