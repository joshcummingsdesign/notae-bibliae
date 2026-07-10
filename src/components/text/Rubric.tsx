"use client";
import { styled } from "@mui/material";

interface Props {
  text: string;
}

/**
 * Rubric text.
 */
export const Rubric: React.FC<Props> = ({ text }) => {
  return <Text>{renderSuperscripts(text)}</Text>;
};

const renderSuperscripts = (text: string) => {
  return text.split(/(\\[a-z]+)/gi).map((part, i) => {
    const match = part.match(/^\\([a-z]+)$/i);

    return match ? <sup key={i}>[{match[1]}]</sup> : part;
  });
};

const Text = styled("p")(({ theme }) => ({
  fontSize: "1rem",
  fontStyle: "italic",
  color: theme.palette.brand.darkGrey,
}));
