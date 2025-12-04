import Markdown from "react-markdown";
import remarkSmartypants from "remark-smartypants";
import dayjs from "dayjs";
import { getCalendarData } from "./getCalendarData";
import { yearToRoman } from "./lib";

export const Calendar = () => {
  const today = dayjs();
  const { calendarData, liturgicalYear } = getCalendarData(today);

  // Build Markdown by season
  const markdown = Object.entries(calendarData)
    .map(([seasonName, items]) => {
      const list = items.map((item) => `- ${item}`).join("\n");
      return `## ${seasonName}\n${list}`;
    })
    .join("\n\n");

  // Full Markdown
  const text = [
    `**Anno Domini ${yearToRoman(liturgicalYear)}**`,
    "",
    "---",
    "",
    markdown,
  ].join("\n");

  return (
    <>
      <Markdown remarkPlugins={[remarkSmartypants]}>{text}</Markdown>
      <br />
      <hr />
      <small>
        <a href="/events/liturgical-calendar.ics" download>
          ⤓ Download Calendar
        </a>
      </small>
    </>
  );
};
