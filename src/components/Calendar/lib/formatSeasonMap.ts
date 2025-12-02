import dayjs from "dayjs";
import { SeasonMap, CalendarItem, FormattedSeasonMap } from "../interfaces";

/**
 * Format calendar titles and include feasts of rank 1 and 3.
 * If there is no rank 1, show rank 2.
 */
const formatTitlesForDay = (items: CalendarItem[]): string => {
  const rank1 = items.find((i) => i.rank === 1);
  const rank2 = items.find((i) => i.rank === 2);
  const rank3Items = items.filter((i) => i.rank === 3);

  const result: string[] = [];

  if (rank1) {
    result.push(rank1.title);
  } else if (rank2) {
    result.push(rank2.title);
  }

  rank3Items.forEach((i) => result.push(i.title));

  return result.join(" — ");
};

export const formatSeasonMap = (seasonMap: SeasonMap): FormattedSeasonMap => {
  const result: FormattedSeasonMap = {};

  for (const [seasonName, items] of Object.entries(seasonMap)) {
    // Group items by date
    const groupedByDate: Record<string, CalendarItem[]> = {};
    items.forEach((item) => {
      if (!groupedByDate[item.date]) groupedByDate[item.date] = [];
      groupedByDate[item.date].push(item);
    });

    // Sort dates chronologically
    const sortedDates = Object.keys(groupedByDate).sort(
      (a, b) => dayjs(a).valueOf() - dayjs(b).valueOf()
    );

    // For each day, produce ONE formatted title string
    const formattedList = sortedDates.map((date) => {
      const titles = formatTitlesForDay(groupedByDate[date]);
      return `${dayjs(date).format("MMMM D")} — ${titles}`;
    });

    result[seasonName] = formattedList;
  }

  return result;
};
