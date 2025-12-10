import dayjs from "dayjs";
import { CalendarItem } from "../interfaces";

export const getEpiphanySundays = (liturgicalYear: number): CalendarItem[] => {
  const jan6 = dayjs(`${liturgicalYear}-01-06`);

  // First Sunday after Jan 6
  const firstSunday =
    jan6.day() === 0 ? jan6.add(7, "day") : jan6.add(7 - jan6.day(), "day");

  const titles = ["First", "Second", "Third", "Fourth", "Fifth", "Sixth"];

  return titles.map((title, i) => {
    const date = firstSunday.add(i * 7, "day").format("YYYY-MM-DD");

    // Add "(Baptism of the Lord)" ONLY to First Sunday
    const baseTitle = `${title} Sunday of Epiphany`;
    const fullTitle =
      i === 0
        ? `${baseTitle}: [Baptism of the Lord](/liturgy/seasons/epiphanytide/baptism-of-the-lord)`
        : baseTitle;

    return {
      date,
      title: fullTitle,
      rank: 3,
    };
  });
};
