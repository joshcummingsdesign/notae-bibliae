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
        width: "100%",
        height: "auto",
      },
      "#footnote-label": {
        display: "none",
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
    }}
  />
);
