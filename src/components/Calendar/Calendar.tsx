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
  getPassionSunday,
  getAnnunciation,
  getLentDays,
  getEastertideDays,
  getWhitsuntideDays,
  getTrinitytideDays,
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
  const nextYearsFirstSundayOfAdvent = getFirstSundayOfAdvent(liturgicalYear);
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
  const passionSunday = getPassionSunday(ashWednesday);
  const annunciation = getAnnunciation(liturgicalYear, easter);
  const lentDays = getLentDays(
    ashWednesday,
    passionSunday,
    annunciation,
    easter
  );
  const eastertideDays = getEastertideDays(easter);
  const whitsuntideDays = getWhitsuntideDays(easter);
  const trinitytideDays = getTrinitytideDays(easter);
  const seasons = getSeasons(
    calendarYear,
    liturgicalYear,
    firstSundayOfAdvent,
    septuagesima,
    shroveTuesday,
    ashWednesday,
    easter,
    nextYearsFirstSundayOfAdvent
  );

  const calendar = [
    ...calendarItems,
    ...adventSundays,
    ...epiphanySundays,
    ...preLentDays,
    ...lentDays,
    ...eastertideDays,
    ...whitsuntideDays,
    ...trinitytideDays,
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
