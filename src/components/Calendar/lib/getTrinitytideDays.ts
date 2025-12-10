import { Dayjs } from "dayjs";
import { CalendarItem } from "../interfaces";
import { numberToWords } from "./numberToWords";

export const getTrinitytideDays = (easter: Dayjs): CalendarItem[] => {
  const trinitySunday = easter.add(56, "day");

  const sundays: CalendarItem[] = [];

  for (let i = 0; i < 26; i++) {
    const sunday = trinitySunday.add(i * 7, "day");
    const title =
      i === 0
        ? "[Trinity Sunday](/liturgy/seasons/trinitytide/trinity-sunday)"
        : `${numberToWords(i)} Sunday After Trinity`;
    const rank = i === 0 ? 2 : 3;

    sundays.push({
      date: sunday.format("YYYY-MM-DD"),
      title,
      rank,
    });
  }

  return sundays;
};
