import { Dayjs } from "dayjs";

export const getQuinquagesima = (easter: Dayjs): Dayjs =>
  easter.subtract(7, "week");
