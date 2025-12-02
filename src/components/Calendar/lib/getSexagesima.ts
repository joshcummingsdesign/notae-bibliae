import { Dayjs } from "dayjs";

export const getSexagesima = (easter: Dayjs): Dayjs =>
  easter.subtract(8, "week");
