import { Dayjs } from "dayjs";

export const getPassionSunday = (ashWednesday: Dayjs): Dayjs => {
  // First Sunday of Lent is the first Sunday after Ash Wednesday
  const firstSundayOfLent =
    ashWednesday.day() === 0
      ? ashWednesday.add(7, "day")
      : ashWednesday.add(7 - ashWednesday.day(), "day");

  // Fifth Sunday = first Sunday + 4 weeks
  const fifthSundayOfLent = firstSundayOfLent.add(4, "week");

  return fifthSundayOfLent;
};
