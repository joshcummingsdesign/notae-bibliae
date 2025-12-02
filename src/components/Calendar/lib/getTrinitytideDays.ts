import { Dayjs } from "dayjs";
import { CalendarItem } from "../interfaces";
import { numberToWords } from "./numberToWords";

export const getTrinitytideDays = (easter: Dayjs): CalendarItem[] => {
  const trinitySunday = easter.add(56, "day");

  const sundays: CalendarItem[] = [];

  for (let i = 0; i < 26; i++) {
    const sunday = trinitySunday.add(i * 7, "day");
    let title =
      i === 0
        ? "[Trinity Sunday](/liturgy/seasons/ordinary-time/trinity-sunday)"
        : `${numberToWords(i)} Sunday after Trinity`;

    sundays.push({
      date: sunday.format("YYYY-MM-DD"),
      title,
      rank: 1,
    });
  }

  return sundays;
};
