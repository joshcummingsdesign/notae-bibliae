"use client";
import { styled } from "@mui/material";
import { smartQuotes } from "@/utils/smartQuotes";

interface Props {
  text: string[];
}

/**
 * Rubric text.
 */
export const Rubric: React.FC<Props> = ({ text }) => {
  return (
    <Wrapper>
      {text.map((t) => (
        <Text key={t}>{renderSuperscripts(smartQuotes(t))}</Text>
      ))}
    </Wrapper>
  );
};

const renderSuperscripts = (text: string) => {
  return text.split(/(\\[a-z]+)/gi).map((part, i) => {
    const match = part.match(/^\\([a-z]+)$/i);

    return match ? <sup key={i}>[{match[1]}]</sup> : part;
  });
};

const Wrapper = styled("div")({
  marginBottom: "1.5rem",
});

const Text = styled("p")(({ theme }) => ({
  fontSize: "1rem",
  fontStyle: "italic",
  color: theme.palette.brand.darkGrey,
}));
