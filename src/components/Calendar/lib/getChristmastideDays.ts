import dayjs from "dayjs";
import { CalendarItem } from "../interfaces";

export const getChristmastideDays = (calendarYear: number): CalendarItem[] => {
  const christmas = dayjs(`${calendarYear}-12-25`);

  // Calculate the *next* Sunday (never Christmas Day itself)
  const daysUntilSunday = (7 - christmas.day()) % 7 || 7;
  const sundayAfterChristmas = christmas.add(daysUntilSunday, "day");

  return [
    {
      date: sundayAfterChristmas.format("YYYY-MM-DD"),
      title: "Sunday after Christmas Day",
      rank: 2,
    },
  ];
};
