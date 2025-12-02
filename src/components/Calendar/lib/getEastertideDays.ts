import { Dayjs } from "dayjs";
import { CalendarItem } from "../interfaces";

export const getEastertideDays = (easter: Dayjs): CalendarItem[] => [
  {
    date: easter.format("YYYY-MM-DD"),
    title: "[Easter (Resurrection Sunday)](/liturgy/seasons/eastertide/easter)",
    rank: 1,
  },
  {
    date: easter.add(1, "day").format("YYYY-MM-DD"),
    title: "Monday of Easter Week",
    rank: 1,
  },
  {
    date: easter.add(2, "day").format("YYYY-MM-DD"),
    title: "Tuesday of Easter Week",
    rank: 1,
  },
  {
    date: easter.add(7, "day").format("YYYY-MM-DD"),
    title:
      "[Second Sunday of Easter](/liturgy/seasons/eastertide/second-sunday-of-easter)",
    rank: 1,
  },
  {
    date: easter.add(14, "day").format("YYYY-MM-DD"),
    title: "Third Sunday of Easter",
    rank: 1,
  },
  {
    date: easter.add(21, "day").format("YYYY-MM-DD"),
    title: "Fourth Sunday of Easter",
    rank: 1,
  },
  {
    date: easter.add(28, "day").format("YYYY-MM-DD"),
    title: "Fifth Sunday of Easter",
    rank: 1,
  },
  {
    date: easter.add(35, "day").format("YYYY-MM-DD"),
    title: "Sixth Sunday of Easter",
    rank: 1,
  },
  {
    date: easter.add(39, "day").format("YYYY-MM-DD"),
    title: "[Ascension Day](/liturgy/seasons/eastertide/ascension-day)",
    rank: 1,
  },
  {
    date: easter.add(42, "day").format("YYYY-MM-DD"),
    title: "Seventh Sunday of Easter (Sunday after Ascension Day)",
    rank: 1,
  },
];
