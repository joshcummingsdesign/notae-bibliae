import { Dayjs } from "dayjs";
import { CalendarItem } from "../interfaces";

export const getPreLentDays = (
  septuagesima: Dayjs,
  sexagesima: Dayjs,
  quinquagesima: Dayjs,
  shroveTuesday: Dayjs
): CalendarItem[] => [
  {
    date: septuagesima.format("YYYY-MM-DD"),
    title: "[Septuagesima](/liturgy/seasons/pre-lent/septuagesima)",
    rank: 2,
  },
  {
    date: sexagesima.format("YYYY-MM-DD"),
    title: "[Sexagesima](/liturgy/seasons/pre-lent/sexagesima)",
    rank: 2,
  },
  {
    date: quinquagesima.format("YYYY-MM-DD"),
    title: "[Quinquagesima](/liturgy/seasons/pre-lent/quinquagesima)",
    rank: 2,
  },
  {
    date: shroveTuesday.format("YYYY-MM-DD"),
    title: "[Shrove Tuesday](/liturgy/seasons/pre-lent/shrove-tuesday)",
    rank: 1,
  },
];
