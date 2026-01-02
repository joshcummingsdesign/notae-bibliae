import dayjs, { Dayjs } from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Calendar } from "../calendar";
import lessonData from "./lessons.json";
import { stripMarkdownLinks } from "@/utils/markdown";
import { TIMEZONE } from "@/constants";

dayjs.extend(isSameOrBefore);

interface Office {
  first: string[];
  second: string[];
}

interface OfficeDay {
  title: string;
  morning: Office;
  evening: Office;
}

interface LessonDateMap {
  [date: string]: OfficeDay;
}

export class Lessons {
  private calendar: Calendar;

  constructor(calendar: Calendar) {
    this.calendar = calendar;
  }

  /**
   * Create a date in the same timezone as this.today for consistent comparisons.
   */
  private createDate(dateString: string): Dayjs {
    return dayjs.tz(dateString, TIMEZONE);
  }

  getAll(): LessonDateMap {
    const calendarData = this.calendar.getAll();
    const sundays = this.calendar.getAllSundays();
    const eventKeys = Object.keys(calendarData);
    const startDate = this.createDate(eventKeys[0]);
    const endDate = this.createDate(eventKeys[eventKeys.length - 1]);
    let currentDay = startDate;
    let lastSunday = "";

    const output: LessonDateMap = {};

    // while (currentDay.isSameOrBefore(endDate, "day")) {
    while (currentDay.isSameOrBefore(dayjs("2026-09-12"), "day")) {
      const index = currentDay.day();
      const date = currentDay.format("YYYY-MM-DD");
      const dateStr = currentDay.format("MMMM D");
      const event = calendarData[date];
      const lookupKey =
        event && event.length > 0 ? stripMarkdownLinks(event[0].title) : "";
      const dateLessons = lessonData[dateStr as keyof typeof lessonData];
      const lessons = lessonData[lookupKey as keyof typeof lessonData];
      const hasEvent = !!event && !!lookupKey && !!lessons;

      // If there's an event, add it
      if (hasEvent) {
        output[date] = {
          title: lookupKey,
          ...lessons[0]!, // there should always be a 0 index
        };
      } else if (dateLessons) {
        // If there is an explicit date, add it
        output[date] = {
          title: dateStr,
          ...dateLessons[0]!, // there should always be a 0 index
        };
        // If there's an event, add it
      } else if (hasEvent) {
      } else {
        // Otherwise, add the weekday
        const lessons = lessonData[lastSunday as keyof typeof lessonData];
        const lesson = lessons[index];
        const title = `${lastSunday} - ${dayjs().day(index).format("dddd")}`;
        if (lesson) {
          output[date] = {
            title,
            ...lesson,
          };
        }
      }

      // If it's a Sunday, get its name and set it as lastSunday
      if (index === 0) {
        if (sundays[date]) {
          lastSunday = sundays[date];
        }
      }

      // Advance to next day
      currentDay = currentDay.add(1, "day");
    }

    return output;
  }

  getToday(): OfficeDay {
    const today = this.calendar.getToday();
    const lessons = this.getAll();
    return lessons[today.format("YYYY-MM-DD")];
  }
}
