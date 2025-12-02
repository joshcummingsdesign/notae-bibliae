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
    title: "[Septuagesima](/liturgy/seasons/ordinary-time/septuagesima)",
    rank: 1,
  },
  {
    date: sexagesima.format("YYYY-MM-DD"),
    title: "[Sexagesima](/liturgy/seasons/ordinary-time/sexagesima)",
    rank: 1,
  },
  {
    date: quinquagesima.format("YYYY-MM-DD"),
    title: "[Quinquagesima](/liturgy/seasons/ordinary-time/quinquagesima)",
    rank: 1,
  },
  {
    date: shroveTuesday.format("YYYY-MM-DD"),
    title: "[Shrove Tuesday](/liturgy/seasons/lent#shrove-tuesday)",
    rank: 1,
  },
];
