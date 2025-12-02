import { Dayjs } from "dayjs";
import { CalendarItem } from "../interfaces";

export const getAdventSundays = (
  firstSundayOfAdvent: Dayjs
): CalendarItem[] => {
  const baseTitles = ["First", "Second", "Third", "Fourth"];

  const adventSundays: CalendarItem[] = [];

  for (let i = 0; i < 4; i++) {
    const sunday = firstSundayOfAdvent.add(i, "week");

    let title = `${baseTitles[i]} Sunday of Advent`;

    // Third Sunday (index 2) → Gaudete
    if (i === 2) {
      title = `${title}: [Gaudete Sunday](/liturgy/seasons/advent#gaudete-sunday)`;
    }

    adventSundays.push({
      date: sunday.format("YYYY-MM-DD"),
      title,
      rank: 1,
    });
  }

  return adventSundays;
};
