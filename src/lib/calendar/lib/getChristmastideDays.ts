import dayjs from "dayjs";
import { CalendarItem } from "../interfaces";

export const getChristmastideDays = (
  liturgicalYear: number
): CalendarItem[] => {
  const calendarYear = liturgicalYear - 1;
  const christmas = dayjs(`${calendarYear}-12-25`);

  const sundayAfterChristmas =
    christmas.day() === 0
      ? christmas.add(7, "day")
      : christmas.add(7 - christmas.day(), "day");

  return [
    {
      date: sundayAfterChristmas.format("YYYY-MM-DD"),
      title: "Sunday After Christmas Day",
      rank: 3,
      class: 7,
    },
  ];
};
