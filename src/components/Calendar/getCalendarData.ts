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
} from "./lib";

export const getCalendarData = (
  firstSundayOfAdvent: Dayjs,
  calendarYear: number,
  liturgicalYear: number
) => {
  const nextYearsFirstSundayOfAdvent = getFirstSundayOfAdvent(liturgicalYear);
  const calendarItems = getCalendarItems(calendarYear, liturgicalYear);
  const adventSundays = getAdventSundays(firstSundayOfAdvent);
  const christmastideDays = getChristmastideDays(calendarYear);
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
    ...christmastideDays,
    ...epiphanySundays,
    ...preLentDays,
    ...lentDays,
    ...eastertideDays,
    ...whitsuntideDays,
    ...trinitytideDays,
  ];

  const seasonMap = groupItemsBySeason(calendar, seasons);
  return formatSeasonMap(seasonMap);
};
