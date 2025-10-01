import { colors } from "./colors";

export const fonts = {
  fontInitial: "var(--font-rediviva)",
  fontHeading: "var(--font-canterbury)",
  fontBody: "var(--font-eb-garamond)",
};

export const fontWeights = {
  regular: "var(--fw-regular)",
  bold: "var(--fw-bold)",
};

export const typography = {
  h1: {
    fontSize: "3.5rem",
    fontWeight: fontWeights.bold,
    lineHeight: "1.1",
    fontFamily: fonts.fontHeading,
    color: colors.black,
    margin: 0,
  },
  h2: {
    fontSize: "2rem",
    fontWeight: fontWeights.bold,
    lineHeight: "1.1",
    fontFamily: fonts.fontBody,
    color: colors.black,
  },
  h3: {
    fontSize: "1.5rem",
    fontWeight: fontWeights.bold,
    lineHeight: "1.1",
    fontFamily: fonts.fontBody,
    color: colors.black,
  },
  h4: {
    fontSize: "1.125rem",
    fontWeight: fontWeights.bold,
    lineHeight: "1.5",
    fontFamily: fonts.fontBody,
    color: colors.black,
  },
  h5: {
    fontSize: "0.875rem",
    fontWeight: fontWeights.bold,
    lineHeight: "1.5",
    fontFamily: fonts.fontBody,
    color: colors.black,
  },
  h6: {
    fontSize: "0.75rem",
    fontWeight: fontWeights.bold,
    lineHeight: "1.5",
    fontFamily: fonts.fontBody,
    color: colors.black,
  },
  body1: {
    fontSize: "1.0625rem",
    fontWeight: fontWeights.regular,
    lineHeight: "1.6",
    fontFamily: fonts.fontBody,
    color: colors.black,
  },
  body2: {
    fontSize: "0.8125rem",
    fontWeight: fontWeights.regular,
    lineHeight: "1.5",
    fontFamily: fonts.fontBody,
    color: colors.black,
  },
};
