import dayjs, { Dayjs } from "dayjs";

export const getFirstSundayOfAdvent = (calendarYear: number): Dayjs => {
  const christmas = dayjs(`${calendarYear}-12-25`);
  const lastSundayBeforeChristmas = christmas.subtract(christmas.day(), "day");
  // Go back 3 more Sundays to get the First Sunday of Advent
  return lastSundayBeforeChristmas.subtract(3, "week");
};
