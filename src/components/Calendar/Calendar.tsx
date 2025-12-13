import Markdown from "react-markdown";
import remarkSmartypants from "remark-smartypants";
import { yearToRoman } from "@/lib/utils/yearToRoman";
import { Calendar as CalendarClass } from "@/models/calendar";

export const Calendar = () => {
  const calendar = new CalendarClass();
  const calendarData = calendar.getFormattedSeasonItems();
  const liturgicalYear = calendar.getLiturgicalYear();

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
