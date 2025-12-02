import { Season } from "../interfaces";
import { Dayjs } from "dayjs";

export const getSeasons = (
  calendarYear: number,
  liturgicalYear: number,
  firstSundayOfAdvent: Dayjs,
  septuagesima: Dayjs,
  shroveTuesday: Dayjs,
  ashWednesday: Dayjs,
  easterSunday: Dayjs
): Season[] => [
  {
    name: "Advent",
    start: firstSundayOfAdvent.format("YYYY-MM-DD"),
    end: `${calendarYear}-12-24`,
  },
  {
    name: "Christmastide",
    start: `${calendarYear}-12-25`,
    end: `${liturgicalYear}-01-05`,
  },
  {
    name: "Epiphanytide",
    start: `${liturgicalYear}-01-06`,
    end: septuagesima.subtract(1, "day").format("YYYY-MM-DD"),
  },
  {
    name: "Pre-Lent",
    start: septuagesima.format("YYYY-MM-DD"),
    end: shroveTuesday.format("YYYY-MM-DD"),
  },
  {
    name: "Lent",
    start: ashWednesday.format("YYYY-MM-DD"),
    end: easterSunday.subtract(1, "day").format("YYYY-MM-DD"),
  },
];
