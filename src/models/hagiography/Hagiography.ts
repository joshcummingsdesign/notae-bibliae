import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Calendar } from "../calendar";
import readingsData from "./readings.json";
import { stripMarkdownLinks } from "@/utils/markdown";
import { HagiographyDateMap, HagiographyResponse } from "./types";

dayjs.extend(isSameOrBefore);

export class Hagiography {
  private calendar: Calendar;

  constructor(calendar: Calendar) {
    this.calendar = calendar;
  }

  /**
   * Get all hagiography readings for the liturgical year.
   */
  // TODO: Test
  // TODO: Add supplementary lessons to lectionary for feasts
  getAll(): HagiographyDateMap {
    const calendarData = this.calendar.getAll();
    const startDate = this.calendar.getFirstSundayOfAdvent();
    const endDate = this.calendar
      .getNextFirstSundayOfAdvent()
      .subtract(1, "day");
    let currentDay = startDate;

    const output: HagiographyDateMap = {};

    while (currentDay.isSameOrBefore(endDate, "day")) {
      const date = currentDay.format("YYYY-MM-DD");
      const events = calendarData[date];

      if (events && events.length > 0) {
        // Check ALL calendar items for the date, not just the highest-ranked
        for (const event of events) {
          const lookupKey = stripMarkdownLinks(event.title);
          const reading = readingsData[lookupKey as keyof typeof readingsData];
          if (reading) {
            output[date] = {
              title: lookupKey,
              ...reading,
            } as HagiographyResponse;
            break; // Use first match
          }
        }
      }

      currentDay = currentDay.add(1, "day");
    }

    return output;
  }

  /**
   * Get today's hagiography reading, if any.
   */
  getToday(): HagiographyResponse | null {
    const today = this.calendar.getToday();
    const readings = this.getAll();
    return readings[today.format("YYYY-MM-DD")] || null;
  }
}
