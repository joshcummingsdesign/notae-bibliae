import { CalendarItem } from "../interfaces";
import calendarItems from "../calendar-items.json";

export const getCalendarItems = (
  calendarYear: number,
  liturgicalYear: number
): CalendarItem[] =>
  calendarItems.map((item) => ({
    ...item,
    date: item.date
      .replace("liturgicalYear", liturgicalYear.toString())
      .replace("calendarYear", calendarYear.toString()),
  }));
