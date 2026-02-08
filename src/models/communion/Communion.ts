import dayjs, { Dayjs } from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Calendar, CalendarItem } from "../calendar";
import { stripMarkdownLinks } from "../../utils/markdown";
import communionData from "./communion.json";
import {
  CommunionCalendarItem,
  CommunionDateMap,
  CommunionItem,
} from "./types";

dayjs.extend(isSameOrBefore);

export class Communion {
  calendar: Calendar;
  readings: Record<string, CommunionItem>;

  constructor(calendar: Calendar) {
    this.calendar = calendar;
    this.readings = communionData;
  }

  /**
   * Match calendar items to their communion readings.
   */
  private matchReadings(
    calendarItems: CalendarItem[],
  ): CommunionCalendarItem[] {
    return calendarItems
      .map((item) => {
        const title = stripMarkdownLinks(item.title);
        const reading = this.readings[title as keyof typeof this.readings];
        if (!reading) return null;
        return { ...item, title, ...reading };
      })
      .filter((item): item is CommunionCalendarItem => item !== null);
  }

  /**
   * Get all Communion readings for the liturgical year.
   */
  getAll(): CommunionDateMap {
    const calendarData = this.calendar.getAll();
    const startDate = this.calendar.getFirstSundayOfAdvent();
    const endDate = this.calendar
      .getNextFirstSundayOfAdvent()
      .subtract(1, "day");

    const output: CommunionDateMap = {};
    let currentDay = startDate;

    while (currentDay.isSameOrBefore(endDate, "day")) {
      const date = currentDay.format("YYYY-MM-DD");
      const calendarItems = calendarData[date] || [];
      const todayReadings = this.matchReadings(calendarItems);

      // Only one communion per day unless the second is a vigil
      const filtered =
        todayReadings.length > 1
          ? [
              todayReadings.find((r) => !r.isVigil),
              ...todayReadings.filter((r) => r.isVigil),
            ].filter((r): r is CommunionCalendarItem => r !== undefined)
          : todayReadings;

      if (filtered.length > 0) {
        output[date] = filtered;
      }

      currentDay = currentDay.add(1, "day");
    }

    return output;
  }

  /**
   * Get Communion readings by date.
   */
  getByDay(date: Dayjs = this.calendar.getToday()): CommunionCalendarItem[] {
    return this.getAll()[date.format("YYYY-MM-DD")] || [];
  }
}
