"use client";
import { GlobalStyles as GlobalStylesBase } from "@mui/material";
import { colors, typography } from "@/assets/styles";

export const GlobalStyles = () => (
  <GlobalStylesBase
    styles={{
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
      img: {
        display: "block",
        margin: "1.25em 0",
        width: "100%",
        height: "auto",
      },
      "#footnote-label": {
        visibility: "hidden",
        fontSize: "0",
      },
      ".footnotes": {
        marginTop: "3rem",
        fontSize: typography.body2.fontSize,

        "&:before": {
          display: "block",
          content: "' '",
          borderTop: `1px solid ${colors.black}`,
          maxWidth: "300px",
        },

        ol: {
          paddingLeft: "1rem",
        },

        li: {
          p: {
            margin: 0,
          },
        },
      },
      a: {
        color: colors.red,
        textDecoration: "none",
        "&:hover": {
          textDecoration: "underline",
        },
      },
      blockquote: {
        borderLeft: `4px solid ${colors.black}`,
        paddingLeft: "1em",
        margin: "2rem 0",
        cite: {
          fontStyle: "normal",
          display: "block",
          fontSize: typography.body2.fontSize,
        },
      },
      sup: {
        a: {
          fontSize: "0.875em",
          "&:before": {
            content: "'['",
          },
          "&:after": {
            content: "']'",
          },
        },
      },
      // Sepia tone images
      ".sepia": {
        filter:
          "grayscale(0.5) sepia(0.5) contrast(0.95) brightness(0.95) saturate(0.75)",
      },
      // Images with rounded corners
      ".rounded": {
        borderRadius: 30,
      },
      // biblegateway popup spinner
      ".bg_popup-spinner": {
        img: {
          width: "auto",
        },
      },
    }}
  />
);
