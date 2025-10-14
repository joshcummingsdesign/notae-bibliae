// components/Pre.tsx
"use client";
import React from "react";
import parse from "html-react-parser";
import { styled } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const symbols = {
  "\\A": '<span class="symbol a">Ant.</span>',
  "\\V": '<span class="symbol v"></span>',
  "\\R": '<span class="symbol r"></span>',
  "\\B": '<span class="brackets">[<span class="symbol bow">Bow</span>]</span>',
  "\\U": '<span class="brackets">[<span class="symbol bow">Rise</span>]</span>',
  _: '<span class="symbol dot"></span>',
  "*": '<span class="symbol star"></span>',
  "+": '<span class="symbol cross"></span>',
  ˇ: '<span class="symbol caret"></span>',
  "¯": '<span class="symbol line"></span>',
  "%": '<span class="symbol dagger"></span>',
};

const replaceSymbols = (text: string) => {
  let newText = text;
  Object.entries(symbols).forEach(([key, value]) => {
    newText = newText.replaceAll(key, value);
  });
  newText = newText.replaceAll(/\\b (.*)/g, "<strong>$1</strong>");
  newText = newText.replaceAll(/(\d+\.)/g, '<span class="red">$1</span>');
  return newText;
};

/**
 * Poetry with indentation and symbols.
 *
 * Written like this:
 *
 * ```md
 * <Poetry>
 * |  \V O Lord, open thou my _ lips, *
 * |    \R and my mouth shall _ show forth thy praise.
 * </Poetry>
 * ```
 */
export const Poetry: React.FC<Props> = ({ children }) => {
  let content = { ...(children as any) };

  if (!content.props?.children) return null;

  if (typeof content.props.children === "string") {
    content = {
      ...content,
      props: { ...content.props, children: [content.props.children] },
    };
  }

  const text = content.props.children.map((child: any, i: number) => {
    if (typeof child === "string") {
      return (
        <React.Fragment key={i}>
          {parse(
            replaceSymbols(child.replaceAll("|  ", "").replaceAll("|", ""))
          )}
        </React.Fragment>
      );
    }
    return child;
  });

  content = { ...content, props: { ...content.props, children: text } };

  return <Wrapper style={{ whiteSpace: "pre-wrap" }}>{content}</Wrapper>;
};

const Wrapper = styled("pre")(({ theme }) => ({
  fontFamily: "inherit",

  "strong span": {
    fontWeight: `${theme.typography.fontWeightRegular} !important`,
  },

  "strong .red": {
    fontWeight: `${theme.typography.fontWeightBold} !important`,
  },

  ".red": {
    color: theme.palette.brand.red,
  },

  ".symbol": {
    color: theme.palette.brand.red,
  },

  ".brackets": {
    fontSize: "0.9375rem",
  },

  ".bow": {
    color: theme.palette.brand.black,
    fontStyle: "italic",
  },

  ".a": {
    fontWeight: theme.typography.fontWeightBold,
  },

  ".v": {
    position: "relative",
    paddingRight: "0.875rem",

    "&:before": {
      content: "'℣'",
      position: "absolute",
      top: "-6px",
      fontSize: "1.25rem",
    },
  },

  ".r": {
    position: "relative",
    paddingRight: "0.875rem",

    "&:before": {
      content: "'℟'",
      position: "absolute",
      top: "-6px",
      fontSize: "1.25rem",
    },
  },

  ".dot": {
    position: "relative",
    paddingRight: "0.4rem",

    "&:before": {
      content: "'·'",
      position: "absolute",
      lineHeight: "1.5rem",
      fontSize: "1.75rem",
    },
  },

  ".star": {
    position: "relative",
    paddingLeft: "0.25rem",

    "&:before": {
      content: "'*'",
      position: "absolute",
      fontSize: "1.5rem",
    },
  },

  ".cross": {
    position: "relative",

    "&:before": {
      content: "'†'",
      position: "absolute",
      lineHeight: "1.75rem",
      fontSize: "1.25rem",
    },
  },

  ".caret": {
    position: "relative",

    "&:before": {
      content: "'ˇ'",
      position: "absolute",
      fontSize: "1.75rem",
      top: "-16px",
    },
  },

  ".line": {
    position: "relative",

    "&:before": {
      content: "'¯'",
      position: "absolute",
      fontSize: "1.75rem",
      top: "-16px",
    },
  },

  ".dagger": {
    position: "relative",
    paddingRight: "0.6rem",

    "&:before": {
      content: "'‡'",
      position: "absolute",
      top: "-6px",
      fontSize: "1.25rem",
    },
  },
}));
