import dayjs, { Dayjs } from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Calendar, CalendarItem } from "../calendar";
import { stripMarkdownLinks } from "../../utils/markdown";
import collectItems from "./collects.json";
import { CollectCalendarItem, CollectDateMap, CollectItem } from "./types";

dayjs.extend(isSameOrBefore);

export class Collects {
  calendar: Calendar;
  collects: CollectItem[];

  constructor(calendar: Calendar) {
    this.calendar = calendar;
    this.collects = collectItems;
  }

  /**
   * Query the Collects.
   */
  queryCollects(): CollectItem[] {
    return this.collects;
  }

  /**
   * Match calendar items to their collects.
   */
  private matchCollects(calendarItems: CalendarItem[]): CollectCalendarItem[] {
    return calendarItems
      .map((item) => {
        const title = stripMarkdownLinks(item.title);
        const collect = this.collects.find((c) => title.startsWith(c.title));
        if (!collect) return null;
        return { ...item, title, collect: collect.text, source: collect.source, notes: collect.notes };
      })
      .filter((item): item is CollectCalendarItem => item !== null);
  }

  /**
   * Check if a collect is a primary (Sunday or principal feast, excluding some).
   */
  private isPrimary(c: CollectCalendarItem): boolean {
    const excludedFeasts = ["Annunciation of the Lord", "All Saints' Day"];
    const isPrincipal = c.isPrincipalFeast && !excludedFeasts.some((f) => c.title.includes(f));
    return isPrincipal || !!c.isSunday;
  }

  /**
   * Get all Collects for the liturgical year.
   */
  getAll(): CollectDateMap {
    const calendarData = this.calendar.getAll();
    const startDate = this.calendar.getFirstSundayOfAdvent();
    const endDate = this.calendar.getNextFirstSundayOfAdvent().subtract(1, "day");

    const output: CollectDateMap = {};
    let lastPrimary: CollectCalendarItem | null = null;
    let currentDay = startDate;

    while (currentDay.isSameOrBefore(endDate, "day")) {
      const date = currentDay.format("YYYY-MM-DD");
      const calendarItems = calendarData[date] || [];
      const todayCollects = this.matchCollects(calendarItems);

      // Rank 1 feasts reset the primary tracking
      if (todayCollects.some((c) => c.rank === 1)) {
        lastPrimary = null;
      }

      // Update primary tracking
      const primary = todayCollects.find((c) => this.isPrimary(c));
      if (primary) {
        lastPrimary = primary;
      }

      // Build output for this day
      const isVigil = calendarItems.some((item) => item.isVigil);

      if (todayCollects.length > 0) {
        // Vigils with only one collect (the vigil itself) also get the previous Sunday
        if (isVigil && todayCollects.length === 1 && lastPrimary) {
          output[date] = [lastPrimary, ...todayCollects];
        } else {
          output[date] = todayCollects;
        }
      } else if (lastPrimary) {
        output[date] = [lastPrimary];
      }

      currentDay = currentDay.add(1, "day");
    }

    return output;
  }

  /**
   * Get Collects by date.
   */
  getByDay(date: Dayjs = this.calendar.getToday()): CollectCalendarItem[] {
    return this.getAll()[date.format("YYYY-MM-DD")] || [];
  }
}
