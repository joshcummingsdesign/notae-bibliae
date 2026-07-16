"use client";
import { fonts } from "@/assets/styles";
import { styled } from "@mui/material";

interface Props {
  text: string;
  size?: "l" | "xl";
}

/**
 * Large text.
 */
export const Large: React.FC<Props> = ({ text, size = "l" }) => (
  <Text size={size}>{text}</Text>
);

const Text = styled("span", {
  shouldForwardProp: (prop) => prop !== "large" && prop !== "red",
})<{ size?: Props["size"] }>(({ size }) => {
  let fs = undefined;
  switch (size) {
    case "l":
      fs = "1.75rem";
      break;
    case "xl":
      fs = "2.8rem";
      break;
  }
  return {
    fontFamily: size === "xl" ? fonts.fontHeading : undefined,
    fontVariantCaps: size !== "xl" ? "small-caps" : undefined,
    fontSize: fs,
  };
});
