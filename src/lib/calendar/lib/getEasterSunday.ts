import dayjs, { Dayjs } from "dayjs";

export const getEasterSunday = (liturgicalYear: number): Dayjs => {
  // Meeus/Jones/Butcher algorithm
  const f = Math.floor;
  const G = liturgicalYear % 19;
  const C = f(liturgicalYear / 100);
  const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
  const I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11));
  const J = (liturgicalYear + f(liturgicalYear / 4) + I + 2 - C + f(C / 4)) % 7;
  const L = I - J;
  const month = 3 + f((L + 40) / 44); // 3 = March
  const day = L + 28 - 31 * f(month / 4);
  return dayjs(`${liturgicalYear}-${month}-${day}`);
};
