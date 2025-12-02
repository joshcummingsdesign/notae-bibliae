import Markdown from "react-markdown";
import remarkSmartypants from "remark-smartypants";
import dayjs from "dayjs";
import { getCalendarData } from "./getCalendarData";
import { getFirstSundayOfAdvent, getLiturgicalYear, yearToRoman } from "./lib";

export const Calendar = () => {
  const today = dayjs();
  const calendarYear = today.year();
  const firstSundayOfAdvent = getFirstSundayOfAdvent(calendarYear);
  const liturgicalYear = getLiturgicalYear(
    today,
    calendarYear,
    firstSundayOfAdvent
  );
  const calendarData = getCalendarData(
    firstSundayOfAdvent,
    calendarYear,
    liturgicalYear
  );

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
