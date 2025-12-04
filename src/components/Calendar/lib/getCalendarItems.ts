import { CalendarItem } from "../interfaces";
import calendarItems from "../calendar-items.json";

export const getCalendarItems = (liturgicalYear: number): CalendarItem[] =>
  calendarItems.map((item) => ({
    ...item,
    date: item.date
      .replace("liturgicalYear", String(liturgicalYear))
      .replace("calendarYear", String(liturgicalYear - 1)),
  }));
