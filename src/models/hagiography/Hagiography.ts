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

  getAll(withLinks: boolean = false): HagiographyDateMap {
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
        for (const event of events) {
          const lookupKey = event.title;
          if (readingsData.includes(lookupKey)) {
            output[date] = {
              title: withLinks ? lookupKey : stripMarkdownLinks(lookupKey),
            } as HagiographyResponse;
            break;
          }
        }
      }

      currentDay = currentDay.add(1, "day");
    }

    return output;
  }

  getToday(withLinks: boolean = false): HagiographyResponse | null {
    const today = this.calendar.getToday();
    const readings = this.getAll(withLinks);
    return readings[today.format("YYYY-MM-DD")] || null;
  }
}
