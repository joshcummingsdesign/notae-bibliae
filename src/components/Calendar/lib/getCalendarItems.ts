import dayjs, { Dayjs } from "dayjs";
import { CalendarItem } from "../interfaces";
import calendarItems from "../calendar-items.json";

/**
 * Return the calendar items sorted starting at the first sunday of advent.
 */
export const getCalendarItems = (firstSundayOfAdvent: Dayjs): CalendarItem[] =>
  calendarItems
    .map((item) => {
      const [mm, dd] = item.date.split("-");
      // Initial attempt: same year as start
      let fullDate = dayjs(`${firstSundayOfAdvent.year()}-${mm}-${dd}`);

      // If the date is before the starting date, bump to next year
      if (fullDate.isBefore(firstSundayOfAdvent, "day")) {
        fullDate = fullDate.add(1, "year");
      }

      return {
        ...item,
        date: fullDate.format("YYYY-MM-DD"),
      };
    })
    .sort((a, b) => a.date.localeCompare(b.date));
