import { Season } from "../interfaces";
import { Dayjs } from "dayjs";

export const getSeasons = (
  calendarYear: number,
  liturgicalYear: number,
  firstSundayOfAdvent: Dayjs,
  septuagesima: Dayjs,
  shroveTuesday: Dayjs,
  ashWednesday: Dayjs,
  easterSunday: Dayjs,
  nextYearsFirstSundayOfAdvent: Dayjs
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
  {
    name: "Eastertide",
    start: easterSunday.format("YYYY-MM-DD"),
    end: easterSunday.add(48, "day").format("YYYY-MM-DD"),
  },
  {
    name: "Whitsuntide",
    start: easterSunday.add(49, "day").format("YYYY-MM-DD"),
    end: easterSunday.add(55, "day").format("YYYY-MM-DD"),
  },
  {
    name: "Trinitytide",
    start: easterSunday.add(56, "day").format("YYYY-MM-DD"),
    end: nextYearsFirstSundayOfAdvent.subtract(1, "day").format("YYYY-MM-DD"),
  },
];
