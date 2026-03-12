"use client";
import { styled } from "@mui/system";
import Markdown from "react-markdown";
import remarkSmartypants from "remark-smartypants";

interface Props {
  season: string;
  date: string;
  primaryObservance: string;
  secondaryObservance?: string;
}

export const Today: React.FC<Props> = ({
  season,
  date,
  primaryObservance,
  secondaryObservance,
}) => (
  <Wrapper>
    <p>{season}</p>
    <p>{date}</p>
    <Markdown
      remarkPlugins={[remarkSmartypants]}
      components={{ a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a> }}
    >
      {primaryObservance}
    </Markdown>
    {secondaryObservance && (
      <SmallText>
        <Markdown
          remarkPlugins={[remarkSmartypants]}
          components={{ a: ({ href, children }) => <a href={href} target="_blank" rel="noopener noreferrer">{children}</a> }}
        >
          {`[ *${secondaryObservance}* ]`}
        </Markdown>
      </SmallText>
    )}
  </Wrapper>
);

const Wrapper = styled("div")({
  marginTop: "1em",

  p: {
    margin: 0,
    lineHeight: "24px",
  },
});

const SmallText = styled("div")({
  fontSize: "0.9rem",
  lineHeight: "24px",
});
