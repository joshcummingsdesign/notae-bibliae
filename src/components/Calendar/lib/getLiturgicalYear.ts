import dayjs, { Dayjs } from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";

dayjs.extend(isSameOrAfter);

export const getLiturgicalYear = (
  today: Dayjs,
  firstSundayOfAdvent: Dayjs
): number => {
  if (today.isSameOrAfter(firstSundayOfAdvent)) {
    return today.add(1, "year").year();
  }

  return today.year();
};
