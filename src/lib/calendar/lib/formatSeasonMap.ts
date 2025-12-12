import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import { SeasonMap, CalendarItem, FormattedSeasonMap } from "../interfaces";

dayjs.extend(isSameOrAfter);

/**
 * Format calendar titles.
 * Rank 1 > 2 > 3. Rank 4 and 5 always show.
 */
const formatTitlesForDay = (items: CalendarItem[]): string => {
  const result: string[] = [];

  // Always include rank 4 items
  const rank4Items = items.filter((i) => i.rank === 4);
  rank4Items.forEach((i) => result.push(i.title));

  // Always include rank 5 items
  const rank5Items = items.filter((i) => i.rank === 5);
  rank5Items.forEach((i) => result.push(i.title));

  // Include the highest-priority among ranks 1, 2, 3
  const rank1 = items.find((i) => i.rank === 1);
  const rank2 = items.find((i) => i.rank === 2);
  const rank3 = items.find((i) => i.rank === 3);

  if (rank1) result.unshift(rank1.title); // put rank 1 first
  else if (rank2) result.unshift(rank2.title); // rank 2 next
  else if (rank3) result.unshift(rank3.title); // rank 3 last

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

export const getToday = (today: Dayjs, seasonMap: SeasonMap): string => {
  let output = "";

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

    // Produce a formatted title string for today
    for (let i = 0; i < sortedDates.length; i++) {
      const date = sortedDates[i];
      const d = dayjs(date);

      if (today.isSameOrAfter(d, "day")) {
        output = `${seasonName} — ${today.format("MMMM D")}`;

        if (today.isSame(d, "day")) {
          const titles = formatTitlesForDay(groupedByDate[date]).replace(
            /\[([^\]]+)\]\(([^)]+)\)/g,
            '<a href="$2">$1</a>'
          );
          output += ` — ${titles}`;
        }
      }
    }
  }

  return output;
};
