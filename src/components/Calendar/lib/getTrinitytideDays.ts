import { Dayjs } from "dayjs";
import { CalendarItem } from "../interfaces";
import { numberToWords } from "./numberToWords";

export const getTrinitytideDays = (
  easter: Dayjs,
  firstSundayOfAdvent: Dayjs
): CalendarItem[] => {
  const trinitySunday = easter.add(56, "day"); // Trinity Sunday
  const sundays: CalendarItem[] = [];

  // Generate 26 Sundays after Trinity
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

  // Corpus Christi = Thursday after Trinity Sunday
  const corpusChristi = trinitySunday.add(4, "day");
  sundays.push({
    date: corpusChristi.format("YYYY-MM-DD"),
    title: "[Corpus Christi](/liturgy/seasons/trinitytide/corpus-christi)",
    rank: 2,
  });

  // Christ the King = Sunday before first Sunday of Advent
  const christTheKing = firstSundayOfAdvent.subtract(7, "day");
  sundays.push({
    date: christTheKing.format("YYYY-MM-DD"),
    title: "[Christ the King](/liturgy/seasons/trinitytide/christ-the-king)",
    rank: 2,
  });

  return sundays;
};
