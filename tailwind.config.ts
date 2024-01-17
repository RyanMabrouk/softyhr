import type { Config } from "tailwindcss";
import plugin from "tailwindcss/plugin";
const Myclass = plugin(function ({ addUtilities }: any) {
  addUtilities({
    ".my-rotate-y-180": {
      transform: "rotateY(180deg)",
    },
    ".preserve-3d": {
      transformStyle: "preserve-3d",
    },
    ".perspective": {
      perspective: "1000px",
    },
    ".backface-hidden": {
      backfaceVisibility: "hidden",
    },
    ".bg-primary-gradient": {
      backgroundImage: "linear-gradient(90deg, #c0e94f 0%, #82af13 100%)",
    },
    ".bg-gray-gradient": {
      backgroundImage: "linear-gradient(-180deg, #eee, #fbfbfb)",
    },
    ".scroll-snap-none": {
      scrollSnapType: "none",
    },
    ".scroll-snap-x": {
      scrollSnapType: "x",
    },
    ".scroll-snap-y": {
      scrollSnapType: "y",
    },
  });
});
const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
      keyframes: {
        show: {
          "0%": { bottom: "0" },
          "100%": { transform: "5rem" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      height: {
        screen: "100dvh",
      },
      width: {
        screen: "100dvw",
        files_screen: "1355px",
        percentage78: "78%",
      },
      minHeight: {
        screen: "100dvh",
      },
      minWidth: {
        screen: "100dvw",
      },
      maxHeight: {
        screen: "100dvh",
      },
      maxWidth: {
        screen: "100dvw",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
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
        "color8-200": "#b1f8df",
        "color8-300": "#82f2d9",
        "color8-400": "#48ead1",
        "color8-500": "#34b9ac",
        "color8-600": "#1b7b7e",
        "color8-700": "#003a4c",

        "gray-0": "#FAFAF8",
        "gray-1": "#F5F4F1",
        "gray-2": "#E4E3E0",
        "gray-3": "#D4D2D0",
        "gray-4": "#C6C2BF",
        "gray-5": "#B5B2AF",
        "gray-6": "#A5A29F",
        "gray-7": "#95918F",
        "gray-8": "#868180",
        "gray-9": "#777270",
        "gray-10": "#676260",
        "gray-11": "#58524F",
        "gray-12": "#48413F",
        "gray-13": "#38312F",

        "gray-14": "#F4F4F4",
        "gray-15": "#999999",
        "gray-16": "#E0E0E0",
        "gray-17": "#EBEBEB",
        "gray-18": "#CCCCCC",
        "gray-19": "#D9D9D9",
        "gray-20": "#444",
        "gray-21": "#686868",
        "gray-22": "#F3F3F3",
        "gray-23": "#232323",
        "gray-24": "#0003",
        "gray-25": "#555",
        "gray-26": "#999",
        "gray-27": "#222222",
        "gray-28": "#FAFAFA",
        "gray-29": "#636363",
        "gray-30": "#777",
        "gray-31": "#B6B6B6",
        "gray-32": "#D1D0D1",

        "color-teal-2": "#284D59",

        "color-primary": "#599D15",
        "color-primary-0": "#F6FFE3",
        "color-primary-1": "#ECFFC7",
        "color-primary-2": "#D4FD80",
        "color-primary-3": "#599D15",
        "color-primary-4": "#2E7918",
        "color-primary-5": "#03551C",
        "color-primary-6": "#517A00",
        "color-primary-7": "#719D0C",
        "color-primary-8": "#527A01",
        "color-primary-9": "#527B00",
        "color-primary-10": "#84bf41",
        "color-primary-11": "#8EBB23",
        "color-primary-12": "#EEF3E5",
        "color-primary-13": "#c0e94f1a",

        "color-primary-focus": "#AAE868",

        "color9-100": "#FFAAB0",
        "color9-200": "#E45160",
        "color9-300": "#CE4755",
        "color9-400": "#A73440",
        "color9-500": "#C20B0B",

        "color-btn": "#496D00",
        /*"color-green": "#599D15",
        "color-teal-2": "#284D59",
        "color-green-0": "#F6FFE3",
        "color-green-1": "#ECFFC7",
        "color-green-2": "#D4FD80",
        "color-green-3": "#599D15",
        "color-green-4": "#2E7918",
        "color-green-5": "#03551C",
        "color-green-6": "#517A00",
        "color-green-7": "#719D0C",
        "color-green-8": "#527A01",
        "color-green-9": "#527B00",
        "color-green-10": "#84bf41",
        "color-green-focus": "#AAE868",

        "color-rose-1": "#FFAAB0",
        "color-rose-2": "#E45160",
        "color-rose-3": "#CE4755",
        "color-rose-4": "#A73440",*/
      },
    },
  },
  plugins: [
    Myclass,
    require("tailwindcss-animate"),
    require("daisyui"),
    require("@tailwindcss/typography"),
  ],
  daisyui: {
    themes: ["light"],
  },
};

export default config;
