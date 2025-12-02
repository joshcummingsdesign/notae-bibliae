import Markdown from "react-markdown";
import remarkSmartypants from "remark-smartypants";
import dayjs from "dayjs";
import {
  yearToRoman,
  getCalendarItems,
  getFirstSundayOfAdvent,
  getLiturgicalYear,
  getAdventSundays,
  getEasterSunday,
  getAshWednesday,
  getSeptuagesima,
  getShroveTuesday,
  getEpiphanySundays,
  getPreLentDays,
  getSexagesima,
  getQuinquagesima,
  getLentDays,
  getSeasons,
  groupItemsBySeason,
  formatSeasonMap,
} from "./lib";

export const Calendar = () => {
  const today = dayjs();
  const calendarYear = today.year();
  const firstSundayOfAdvent = getFirstSundayOfAdvent(calendarYear);
  const liturgicalYear = getLiturgicalYear(
    today,
    calendarYear,
    firstSundayOfAdvent
  );
  const calendarItems = getCalendarItems(calendarYear, liturgicalYear);
  const adventSundays = getAdventSundays(firstSundayOfAdvent);
  const easter = getEasterSunday(liturgicalYear);
  const ashWednesday = getAshWednesday(easter);
  const septuagesima = getSeptuagesima(easter);
  const sexagesima = getSexagesima(easter);
  const quinquagesima = getQuinquagesima(easter);
  const shroveTuesday = getShroveTuesday(ashWednesday);
  const epiphanySundays = getEpiphanySundays(liturgicalYear);
  const preLentDays = getPreLentDays(
    septuagesima,
    sexagesima,
    quinquagesima,
    shroveTuesday
  );
  const lentDays = getLentDays(ashWednesday);
  const seasons = getSeasons(
    calendarYear,
    liturgicalYear,
    firstSundayOfAdvent,
    septuagesima,
    shroveTuesday,
    ashWednesday,
    easter
  );

  const calendar = [
    ...calendarItems,
    ...adventSundays,
    ...epiphanySundays,
    ...preLentDays,
    ...lentDays,
  ];

  const seasonMap = groupItemsBySeason(calendar, seasons);
  const formattedSeasonMap = formatSeasonMap(seasonMap);

  // Build Markdown by season
  const markdown = Object.entries(formattedSeasonMap)
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

  return <Markdown remarkPlugins={[remarkSmartypants]}>{text}</Markdown>;
};
