"use client";
import { fonts, fontWeights } from "@/assets/styles";
import { styled } from "@mui/material";

interface Props {
  t: string;
}

/**
 * Styled initial letter.
 */
export const In: React.FC<Props> = ({ t }) => <Letter>{t}</Letter>;

// TODO: Use theme
const Letter = styled("span")(({ theme }) => ({
  fontFamily: fonts.fontInitial,
  fontWeight: fontWeights.regular,
  color: theme.palette.brand.red,
  fontSize: "4rem",
}));
