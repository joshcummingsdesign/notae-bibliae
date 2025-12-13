import dayjs, { Dayjs } from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Calendar } from "../calendar";
import { stripMarkdownLinks } from "../../lib/utils/markdown";
import collectItems from "./collects.json";
import { CollectDateMap, CollectItem, CurrentCollects } from "./interfaces";

dayjs.extend(isSameOrBefore);

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
        if (item.normalizedTitle.includes(collect.title)) {
          (mergedItems[item.date] ??= []).push({
            ...item.value,
            collect: collect.text,
          });
        }
      }
    }

    return mergedItems;
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
      const itemDate = dayjs(itemDateString);

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
