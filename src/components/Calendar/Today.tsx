"use client";
import { Calendar } from "@/models/calendar";
import { styled } from "@mui/system";
import Markdown from "react-markdown";
import remarkSmartypants from "remark-smartypants";

export const Today = () => {
  const calendar = new Calendar();
  const currentDay = calendar.getCurrentDayString();
  const str = currentDay.split(" — ");
  const season = str[0];
  const date = calendar.getToday().format("dddd, MMMM D");
  const feast = str[2] || "";
  const rest = str.slice(3);
  const commemoration = rest.length ? `[ *${rest.join(" — ")}* ]` : "";

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
