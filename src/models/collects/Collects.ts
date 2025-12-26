import dayjs, { Dayjs } from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
import { Calendar } from "../calendar";
import { stripMarkdownLinks } from "../../utils/markdown";
import collectItems from "./collects.json";
import { CollectDateMap, CollectItem, CurrentCollects } from "./types";
import { TIMEZONE } from "@/constants";

dayjs.extend(isSameOrBefore);
dayjs.extend(utc);
dayjs.extend(timezone);

export class Collects {
  calendar: Calendar;

  constructor(calendar: Calendar) {
    this.calendar = calendar;
  }

  /**
   * Query the Collects.
   */
  queryCollects(): CollectItem[] {
    return collectItems;
  }

  /**
   * Get all Collects.
   */
  getAll(): CollectDateMap {
    const collects = this.queryCollects();
    const items = this.calendar.getAll();

    // Start by flatting the items for an optimization when we merge (to avoid n3)
    const flatItems = Object.entries(items).flatMap(([date, values]) =>
      values.map((value) => ({
        date,
        value,
        normalizedTitle: stripMarkdownLinks(value.title),
      }))
    );

    const mergedItems: CollectDateMap = {};

    // Merge the Collects with the calendar items
    for (const collect of collects) {
      for (const item of flatItems) {
        if (item.normalizedTitle.startsWith(collect.title)) {
          (mergedItems[item.date] ??= []).push({
            ...item.value,
            collect: collect.text,
          });
        }
      }
    }

    // Convert object entries to an array and sort
    const sortedEntries = Object.entries(mergedItems).sort(
      ([dateA], [dateB]) => {
        return new Date(dateA).getTime() - new Date(dateB).getTime();
      }
    );

    // Convert back to an object
    const sortedCollectDateMap: CollectDateMap =
      Object.fromEntries(sortedEntries);

    return sortedCollectDateMap;
  }

  /**
   * Get Collects by date.
   */
  getByDay(date: Dayjs = this.calendar.getToday()): CurrentCollects {
    const items = this.getAll();

    const collects: CurrentCollects = {
      primary: null,
      secondary: [],
    };

    Object.entries(items).forEach(([itemDateString, values]) => {
      const itemDate = dayjs.tz(itemDateString, TIMEZONE);

      if (itemDate.isSameOrBefore(date, "day")) {
        const primary = values.filter((v) => v.rank < 4);
        primary.forEach((value) => {
          if (value.rank === 1 && itemDate.isSame(date, "day")) {
            collects.primary = value;
          } else {
            collects.primary = value;
          }
        });
      }

      if (itemDate.isSame(date, "day")) {
        collects.secondary = values.filter((v) => v.rank >= 4);
      }
    });

    return collects;
  }
}
