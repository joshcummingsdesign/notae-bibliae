"use client";
import { styled } from "@mui/material";

interface Props {
  t: string;
}

/**
 * Styled initial letter.
 */
export const In: React.FC<Props> = ({ t }) => <Letter>{t}</Letter>;

// TODO: Use theme
const Letter = styled("span")({
  color: "red",
});
