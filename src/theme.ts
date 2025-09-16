"use client";
import { createTheme } from "@mui/material";
import { colors, fonts, typography } from "@/assets/styles";

declare module "@mui/material/styles" {
  interface Palette {
    brand: { [k in keyof typeof colors]: string };
  }
  interface PaletteOptions {
    brand: { [k in keyof typeof colors]: string };
  }
}

export const theme = createTheme({
  palette: {
    brand: {
      black: colors.black,
      white: colors.white,
      red: colors.red,
      blue: colors.blue,
      green: colors.green,
      yellow: colors.yellow,
      grey: colors.grey,
      border: colors.border,
      ripple: colors.ripple,
      hover: colors.hover,
    },
    background: {
      default: colors.white,
    },
  },
  typography: {
    fontFamily: fonts.fontBody,
    h1: {
      ...typography.h1,
    },
    h2: {
      ...typography.h2,
    },
    h3: {
      ...typography.h3,
    },
    h4: {
      ...typography.h4,
    },
    h5: {
      ...typography.h5,
    },
    h6: {
      ...typography.h6,
    },
    body1: {
      ...typography.body1,
    },
    body2: {
      ...typography.body2,
    },
  },
  breakpoints: {
    values: {
      xs: 550,
      sm: 600,
      md: 960,
      lg: 1280,
      xl: 1920,
    },
  },
});
