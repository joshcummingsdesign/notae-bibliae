import { Dayjs } from "dayjs";

export const getPassionSunday = (ashWednesday: Dayjs): Dayjs => {
  const firstSundayOfLent =
    ashWednesday.day() === 0
      ? ashWednesday.add(7, "day")
      : ashWednesday.add(7 - ashWednesday.day(), "day");

  // Passion Sunday is the Fifth Sunday of Lent
  return firstSundayOfLent.add(4, "week");
};
