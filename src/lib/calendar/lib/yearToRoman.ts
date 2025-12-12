export const yearToRoman = (year: number): string => {
  if (year <= 0) throw new Error("Year must be positive");

  const romanMap: [number, string][] = [
    [1000, "M"],
    [900, "CM"],
    [500, "D"],
    [400, "CD"],
    [100, "C"],
    [90, "XC"],
    [50, "L"],
    [40, "XL"],
    [10, "X"],
    [9, "IX"],
    [5, "V"],
    [4, "IV"],
    [1, "I"],
  ];

  let result = "";
  let remaining = year;

  for (const [value, numeral] of romanMap) {
    while (remaining >= value) {
      result += numeral;
      remaining -= value;
    }
  }

  return result;
};
