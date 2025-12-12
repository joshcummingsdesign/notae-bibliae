import { Dayjs } from "dayjs";
import { CalendarItem } from "../interfaces";

export const getEastertideDays = (easter: Dayjs): CalendarItem[] => [
  {
    date: easter.format("YYYY-MM-DD"),
    title:
      "[Easter (Resurrection of the Lord)](/liturgy/seasons/eastertide/easter)",
    rank: 1,
    class: 2,
    isFeast: true,
  },
  {
    date: easter.add(1, "day").format("YYYY-MM-DD"),
    title: "Monday of Easter Week",
    rank: 1,
    class: 5,
  },
  {
    date: easter.add(2, "day").format("YYYY-MM-DD"),
    title: "Tuesday of Easter Week",
    rank: 1,
    class: 5,
  },
  {
    date: easter.add(3, "day").format("YYYY-MM-DD"),
    title: "Wednesday of Easter Week",
    rank: 1,
    class: 5,
  },
  {
    date: easter.add(4, "day").format("YYYY-MM-DD"),
    title: "Thursday of Easter Week",
    rank: 1,
    class: 9,
  },
  {
    date: easter.add(5, "day").format("YYYY-MM-DD"),
    title: "Friday of Easter Week",
    rank: 1,
    class: 9,
  },
  {
    date: easter.add(6, "day").format("YYYY-MM-DD"),
    title: "Saturday of Easter Week",
    rank: 1,
    class: 9,
  },
  {
    date: easter.add(7, "day").format("YYYY-MM-DD"),
    title:
      "[Second Sunday of Easter](/liturgy/seasons/eastertide/second-sunday-of-easter)",
    rank: 3,
    class: 8,
    isFeast: true,
  },
  {
    date: easter.add(14, "day").format("YYYY-MM-DD"),
    title: "Third Sunday of Easter",
    rank: 3,
    class: 7,
  },
  {
    date: easter.add(21, "day").format("YYYY-MM-DD"),
    title: "Fourth Sunday of Easter",
    rank: 3,
    class: 7,
  },
  {
    date: easter.add(28, "day").format("YYYY-MM-DD"),
    title: "Fifth Sunday of Easter",
    rank: 3,
    class: 7,
  },
  {
    date: easter.add(35, "day").format("YYYY-MM-DD"),
    title: "Sixth Sunday of Easter",
    rank: 3,
    class: 7,
  },
  {
    date: easter.add(39, "day").format("YYYY-MM-DD"),
    title:
      "[Ascension Day](/liturgy/seasons/eastertide/ascensiontide/ascension-day)",
    rank: 1,
    class: 2,
    isFeast: true,
  },
  {
    date: easter.add(42, "day").format("YYYY-MM-DD"),
    title: "Seventh Sunday of Easter (Sunday After Ascension Day)",
    rank: 3,
    class: 7,
  },
];
