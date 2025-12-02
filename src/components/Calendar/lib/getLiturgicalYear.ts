import { Dayjs } from "dayjs";

export const getLiturgicalYear = (
  today: Dayjs,
  calendarYear: number,
  firstSundayOfAdvent: Dayjs
): number => {
  // If today is on or after the First Sunday of Advent,
  // the liturgical year is the next calendar year
  return today.isSame(firstSundayOfAdvent, "day") ||
    today.isAfter(firstSundayOfAdvent, "day")
    ? calendarYear + 1
    : calendarYear;
};
