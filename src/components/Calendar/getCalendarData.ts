import { Dayjs } from "dayjs";
import {
  getCalendarItems,
  getFirstSundayOfAdvent,
  getAdventSundays,
  getChristmastideDays,
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
  getLiturgicalYear,
} from "./lib";
import { FormattedSeasonMap } from "./interfaces";

export const getCalendarData = (
  today: Dayjs
): {
  calendarData: FormattedSeasonMap;
  liturgicalYear: number;
  firstSundayOfAdvent: Dayjs;
} => {
  const calendarYear = today.year();
  // Get the current year's first sunday of advent
  let firstSundayOfAdvent = getFirstSundayOfAdvent(calendarYear);
  // This way, we can get the liturgical year
  const liturgicalYear = getLiturgicalYear(today, firstSundayOfAdvent);
  // But if we are already in the liturgical year, we need last year's advent dates
  if (calendarYear === liturgicalYear) {
    firstSundayOfAdvent = getFirstSundayOfAdvent(liturgicalYear - 1);
  }
  const calendarItems = getCalendarItems(liturgicalYear);
  const adventSundays = getAdventSundays(firstSundayOfAdvent);
  const christmastideDays = getChristmastideDays(liturgicalYear);
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
  const annunciation = getAnnunciation(easter);
  const lentDays = getLentDays(
    ashWednesday,
    passionSunday,
    annunciation,
    easter
  );
  const eastertideDays = getEastertideDays(easter);
  const whitsuntideDays = getWhitsuntideDays(easter);
  const trinitytideDays = getTrinitytideDays(easter);
  const nextYearsFirstSundayOfAdvent = getFirstSundayOfAdvent(liturgicalYear);
  const seasons = getSeasons(
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
    ...christmastideDays,
    ...epiphanySundays,
    ...preLentDays,
    ...lentDays,
    ...eastertideDays,
    ...whitsuntideDays,
    ...trinitytideDays,
  ];

  const seasonMap = groupItemsBySeason(calendar, seasons);
  return {
    calendarData: formatSeasonMap(seasonMap),
    liturgicalYear,
    firstSundayOfAdvent,
  };
};
