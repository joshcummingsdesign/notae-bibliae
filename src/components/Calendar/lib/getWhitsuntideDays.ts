import { Dayjs } from "dayjs";
import { CalendarItem } from "../interfaces";

export const getWhitsuntideDays = (easter: Dayjs): CalendarItem[] => [
  {
    date: easter.add(49, "day").format("YYYY-MM-DD"),
    title: "[Pentecost (Whitsunday)](/liturgy/seasons/whitsuntide/pentecost)",
    rank: 1,
  },
  {
    date: easter.add(50, "day").format("YYYY-MM-DD"),
    title: "Monday in Whitsuntide",
    rank: 1,
  },
  {
    date: easter.add(51, "day").format("YYYY-MM-DD"),
    title: "Tuesday in Whitsuntide",
    rank: 1,
  },
];
