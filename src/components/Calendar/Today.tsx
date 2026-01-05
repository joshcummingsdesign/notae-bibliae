"use client";
import { styled } from "@mui/system";
import Markdown from "react-markdown";
import remarkSmartypants from "remark-smartypants";
import { CalendarItem } from "@/models/calendar";

interface Props {
  season: string;
  date: string;
  events: CalendarItem[];
}

export const Today: React.FC<Props> = ({ season, date, events }) => {
  const feast = events.length > 0 ? events[0].title : "";
  const commemoration = events.length > 1 ? `[ *${events[1].title}* ]` : "";

  return (
    <Wrapper>
      <p>{season}</p>
      <p>{date}</p>
      {feast && (
        <Markdown remarkPlugins={[remarkSmartypants]}>{feast}</Markdown>
      )}
      {commemoration && (
        <SmallText>
          <Markdown remarkPlugins={[remarkSmartypants]}>
            {commemoration}
          </Markdown>
        </SmallText>
      )}
    </Wrapper>
  );
};

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
