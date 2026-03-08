/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all files that contain Nativewind classes.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./app/**/*.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./features/**/*.{js,jsx,ts,tsx}",
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        background: "#FCFCFC",
        primary: "#CF08E9",
        secondary: "#2C2D36",
        white: "#FFFFFF",
        lightGray: "#ADADAD",
        progress: "#D9D9D9",
        lightBg: "#E6E6E6",
        keypadText: "#8B8B8B",
        error: "#FF3838",
      },
      fontFamily: {
        Poppins: ["Poppins", "sans-serif"],
        PoppinsSemi: ["PoppinsSemi"],
        PoppinsBold: ["PoppinsBold", "sans-serif"],
        Serif: ["InstrumentSerif"],
        SerifItalic: ["InstrumentSerifItalic"],
        Sans: ["InstrumentSans"],
      },
    },
  },
  plugins: [],
};
