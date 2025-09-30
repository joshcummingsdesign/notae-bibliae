"use client";
import { fonts } from "@/assets/styles";
import { styled } from "@mui/material";
import { MAIN_WIDTH } from "../Main";

interface Props {
  text: string;
}

/**
 * Styled initial letter.
 */
export const Initial: React.FC<Props> = ({ text }) => (
  <Text aria-label={text}>
    <Letter>{text.charAt(0)}</Letter>
    <span>{text.substring(1)}</span>
  </Text>
);

const Text = styled("h1")({
  maxWidth: MAIN_WIDTH,
  margin: "0 auto",
});

const Letter = styled("span")(({ theme }) => ({
  fontFamily: fonts.fontInitial,
  fontWeight: theme.typography.fontWeightRegular,
  color: theme.palette.brand.red,
  fontSize: "1.5em",
  position: "relative",
  top: "0.3rem",
}));
