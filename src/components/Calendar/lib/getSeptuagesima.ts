import { Dayjs } from "dayjs";

export const getSeptuagesima = (easter: Dayjs): Dayjs =>
  easter.subtract(9, "week");
