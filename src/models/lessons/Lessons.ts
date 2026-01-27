import dayjs from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import { Calendar } from "../calendar";
import lessonData from "./lessons.json";
import { stripMarkdownLinks } from "@/utils/markdown";
import { LessonDateMap, OfficeDay } from "./types";

dayjs.extend(isSameOrBefore);

export class Lessons {
  private calendar: Calendar;

  constructor(calendar: Calendar) {
    this.calendar = calendar;
  }

  /**
   * Get all lessons.
   */
  getAll(): LessonDateMap {
    const calendarData = this.calendar.getAll();
    const sundays = this.calendar.getAllSundays();
    const startDate = this.calendar.getFirstSundayOfAdvent();
    const endDate = this.calendar
      .getNextFirstSundayOfAdvent()
      .subtract(1, "day");
    let currentDay = startDate;
    let lastSunday = "";

    const output: LessonDateMap = {};

    while (currentDay.isSameOrBefore(endDate, "day")) {
      const index = currentDay.day();
      const date = currentDay.format("YYYY-MM-DD");
      const dateStr = currentDay.format("MMMM D");
      const event = calendarData[date];
      // Prefer feast days over Sundays
      const preferredEvent =
        event && event.length > 0
          ? event.find((e) => e.isFeast) || event[0]
          : undefined;
      const lookupKey = preferredEvent
        ? stripMarkdownLinks(preferredEvent.title)
        : "";
      const dateLessons = lessonData[dateStr as keyof typeof lessonData];
      const lessons = lessonData[lookupKey as keyof typeof lessonData];
      const hasEvent = !!event && !!lookupKey && !!lessons;

      // If there's a feast day (calendar event with lessons), use it
      if (hasEvent) {
        output[date] = {
          title: lookupKey,
          ...lessons[0]!, // there should always be a 0 index
        };
      } else if (index !== 0 && lastSunday) {
        // For weekdays (Mon-Sat), Sunday cycle takes precedence over explicit dates
        const sundayLessons = lessonData[lastSunday as keyof typeof lessonData];
        const weekdayLesson = sundayLessons?.[index];
        if (weekdayLesson) {
          const title = `${lastSunday} - ${dayjs().day(index).format("dddd")}`;
          output[date] = {
            title,
            ...weekdayLesson,
          };
        } else if (dateLessons) {
          // Fall back to explicit date if no weekday lesson
          output[date] = {
            title: dateStr,
            ...dateLessons[0]!,
          };
        }
      } else if (dateLessons) {
        // For Sundays or before first Sunday, use explicit date lessons
        output[date] = {
          title: dateStr,
          ...dateLessons[0]!,
        };
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

  /**
   * Get today's lessons.
   */
  getToday(): OfficeDay {
    const today = this.calendar.getToday();
    const lessons = this.getAll();
    return lessons[today.format("YYYY-MM-DD")];
  }
}
