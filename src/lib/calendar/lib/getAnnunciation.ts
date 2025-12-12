import dayjs, { Dayjs } from "dayjs";

export const getAnnunciation = (easter: Dayjs): Dayjs => {
  const liturgicalYear = easter.year();
  const march25 = dayjs(`${liturgicalYear}-03-25`);

  // Holy Week: Palm Sunday to Holy Saturday
  const holyWeekStart = easter.subtract(7, "day"); // Palm Sunday
  const holyWeekEnd = easter.subtract(1, "day"); // Holy Saturday

  if (march25.isBetween(holyWeekStart, holyWeekEnd, "day", "[]")) {
    // If it falls in Holy Week, move to Monday after Second Sunday of Easter
    const secondSundayOfEaster = easter.add(7, "day");
    return secondSundayOfEaster.add(1, "day"); // Monday after
  }

  return march25;
};
