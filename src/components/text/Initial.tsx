"use client";
import { fonts } from "@/assets/styles";
import { styled } from "@mui/material";

interface Props {
  text: string;
}

/**
 * Styled initial letter.
 */
export const Initial: React.FC<Props> = ({ text }) => (
  <h1 aria-label={text}>
    <Letter>{text.charAt(0)}</Letter>
    <span>{text.substring(1)}</span>
  </h1>
);

const Letter = styled("span")(({ theme }) => ({
  fontFamily: fonts.fontInitial,
  fontWeight: theme.typography.fontWeightRegular,
  color: theme.palette.brand.red,
  fontSize: "1.5em",
  position: "relative",
  top: "0.3rem",
}));
