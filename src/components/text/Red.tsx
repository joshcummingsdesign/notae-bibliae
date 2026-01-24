"use client";
import { styled } from "@mui/material";

interface Props {
  text: string;
  large?: boolean;
}

/**
 * Red text.
 */
export const Red: React.FC<Props> = ({ text, large }) => (
  <Text large={large}>{text}</Text>
);

const Text = styled("span", {
  shouldForwardProp: (prop) => prop !== "large",
})<{ large?: boolean }>(({ theme, large }) => ({
  color: theme.palette.brand.red,
  fontVariantCaps: large ? "small-caps" : undefined,
  fontSize: large ? "1.4rem" : undefined,
}));
