"use client";
import { createTheme } from "@mui/material";
import { colors, fonts, fontWeights, typography } from "@/assets/styles";

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
      pink: colors.pink,
      blue: colors.blue,
      xLightGrey: colors.xLightGrey,
      grey: colors.grey,
      lightGrey: colors.lightGrey,
      darkGrey: colors.darkGrey,
      border: colors.border,
      ripple: colors.ripple,
      hover: colors.hover,
      hoverSolid: colors.hoverSolid,
    },
    background: {
      default: colors.white,
    },
  },
  typography: {
    fontFamily: fonts.fontBody,
    fontWeightRegular: fontWeights.regular,
    fontWeightBold: fontWeights.bold,
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
