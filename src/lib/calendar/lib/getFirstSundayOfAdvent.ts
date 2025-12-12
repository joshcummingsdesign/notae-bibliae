import dayjs, { Dayjs } from "dayjs";

export const getFirstSundayOfAdvent = (year: number): Dayjs => {
  // December 1 of that year
  let dec1 = dayjs(`${year}-12-01`);

  // Move forward to the first Thursday of December
  while (dec1.day() !== 4) {
    // 4 = Thursday
    dec1 = dec1.add(1, "day");
  }

  // Advent starts on the Sunday before this Thursday
  return dec1.subtract(dec1.day(), "day"); // Go back to Sunday
};
