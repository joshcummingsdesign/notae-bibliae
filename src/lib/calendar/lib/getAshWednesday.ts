import { Dayjs } from "dayjs";

export const getAshWednesday = (easter: Dayjs): Dayjs =>
  easter.subtract(46, "day");
