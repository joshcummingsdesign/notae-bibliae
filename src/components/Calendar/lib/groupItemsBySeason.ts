import dayjs from "dayjs";
import isBetween from "dayjs/plugin/isBetween";
import { CalendarItem, Season, SeasonMap } from "../interfaces";

dayjs.extend(isBetween);

export const groupItemsBySeason = (
  items: CalendarItem[],
  seasons: Season[]
): SeasonMap => {
  const map: SeasonMap = {};

  for (const season of seasons) {
    map[season.name] = items.filter((item) => {
      const d = dayjs(item.date);
      return d.isBetween(dayjs(season.start), dayjs(season.end), "day", "[]");
    });
  }

  return map;
};
