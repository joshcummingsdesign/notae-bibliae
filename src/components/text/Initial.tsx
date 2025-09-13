"use client";
import { fonts, fontWeights } from "@/assets/styles";
import { styled } from "@mui/material";

interface Props {
  t: string;
}

/**
 * Styled initial letter.
 */
export const Initial: React.FC<Props> = ({ t }) => <Letter>{t}</Letter>;

const Letter = styled("span")(({ theme }) => ({
  fontFamily: fonts.fontInitial,
  fontWeight: fontWeights.regular,
  color: theme.palette.brand.red,
  fontSize: "1.5em",
  position: "relative",
  top: "0.3rem",
}));
