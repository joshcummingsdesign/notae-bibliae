import { Dayjs } from "dayjs";

export const getShroveTuesday = (ashWednesday: Dayjs): Dayjs =>
  ashWednesday.subtract(1, "day");
