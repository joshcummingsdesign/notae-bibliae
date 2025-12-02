import dayjs, { Dayjs } from "dayjs";

export const getFirstSundayOfAdvent = (year: number): Dayjs => {
  const christmas = dayjs(`${year}-12-25`);
  const lastSundayBeforeChristmas = christmas.subtract(christmas.day(), "day");
  // Go back 3 more Sundays to get the First Sunday of Advent
  return lastSundayBeforeChristmas.subtract(3, "week");
};
