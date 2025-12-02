import { Dayjs } from "dayjs";
import { CalendarItem } from "../interfaces";

// TODO: Fill out the rest of the days of Lent
export const getLentDays = (ashWednesday: Dayjs): CalendarItem[] => [
  {
    date: ashWednesday.format("YYYY-MM-DD"),
    title: "[Ash Wednesday](/liturgy/seasons/lent#ash-wednesday)",
    rank: 1,
  },
];
