import { colors } from "./colors";

export const fonts = {
  fontInitial: "var(--font-rediviva)",
  fontHeading: "var(--font-canterbury)",
  fontBody: "var(--font-eb-garamond)",
};

export const fontWeights = {
  regular: 400,
  bold: 700,
};

export const typography = {
  h1: {
    fontSize: "3.5rem",
    fontWeight: fontWeights.bold,
    lineHeight: "1.5",
    fontFamily: fonts.fontHeading,
    margin: 0,
  },
  h2: {
    fontSize: "2rem",
    fontWeight: fontWeights.bold,
    lineHeight: "1.5",
    fontFamily: fonts.fontHeading,
  },
  h3: {
    fontSize: "1.25rem",
    fontWeight: fontWeights.bold,
    lineHeight: "1.5",
    fontFamily: fonts.fontHeading,
  },
  h4: {
    fontSize: "1.125rem",
    fontWeight: fontWeights.bold,
    lineHeight: "1.5",
    fontFamily: fonts.fontHeading,
  },
  h5: {
    fontSize: "0.875rem",
    fontWeight: fontWeights.bold,
    lineHeight: "1.5",
    fontFamily: fonts.fontHeading,
  },
  h6: {
    fontSize: "0.75rem",
    fontWeight: fontWeights.bold,
    lineHeight: "1.5",
    fontFamily: fonts.fontHeading,
  },
  body1: {
    fontSize: "1.0625rem",
    fontWeight: fontWeights.regular,
    lineHeight: "1.6",
    fontFamily: fonts.fontBody,

    a: {
      color: "inherit",
      textDecoration: "none",
    },
  },
  body2: {
    fontSize: "0.8125rem",
    fontWeight: fontWeights.regular,
    lineHeight: "1.5",
    fontFamily: fonts.fontBody,

    a: {
      color: "inherit",
      textDecoration: "none",
    },
  },
};
