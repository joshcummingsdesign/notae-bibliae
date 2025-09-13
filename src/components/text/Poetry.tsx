// components/Pre.tsx
"use client";
import React from "react";
import parse from "html-react-parser";
import { styled } from "@mui/material";

interface Props {
  children: React.ReactNode;
}

const symbols = {
  "\\V": "<abbr>℣</abbr>",
  "\\R": "<abbr>℟</abbr>",
  _: "<abbr>·</abbr>",
  "*": "<abbr>*</abbr>",
  "+": "<abbr>†</abbr>",
  "%": "<abbr>‡</abbr>",
  ˇ: "<abbr>ˇ</abbr>",
};

const replaceSymbols = (text: string) => {
  let newText = text;
  Object.entries(symbols).forEach(([key, value]) => {
    newText = newText.replaceAll(key, value);
  });
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

  const text = content.props.children.map((child: any) => {
    if (typeof child === "string") {
      return parse(
        replaceSymbols(child.replaceAll("|  ", "").replaceAll("|", ""))
      );
    }
    return child;
  });

  content = { ...content, props: { ...content.props, children: text } };

  return <Wrapper style={{ whiteSpace: "pre-wrap" }}>{content}</Wrapper>;
};

// TODO: Use theme
const Wrapper = styled("pre")({
  fontFamily: "inherit",

  abbr: {
    color: "red",
  },
});
