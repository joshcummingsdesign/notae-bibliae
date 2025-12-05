import dayjs from "dayjs";
import { CalendarItem, DateMap } from "../interfaces";

export const groupItemsByDate = (items: CalendarItem[]): DateMap => {
  const grouped: DateMap = items.reduce<DateMap>((acc, item) => {
    (acc[item.date] ??= []).push(item);
    return acc;
  }, {});

  // Sort the object by date keys
  return Object.fromEntries(
    Object.entries(grouped).sort(
      ([a], [b]) => dayjs(a).valueOf() - dayjs(b).valueOf()
    )
  );
};
