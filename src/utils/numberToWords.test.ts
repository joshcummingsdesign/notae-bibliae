import { describe, test, expect } from "vitest";
import { numberToWords } from "./numberToWords";

describe("numberToWords", () => {
  test("should convert numbers 1-10 to ordinal words", () => {
    expect(numberToWords(1)).toBe("First");
    expect(numberToWords(2)).toBe("Second");
    expect(numberToWords(3)).toBe("Third");
    expect(numberToWords(4)).toBe("Fourth");
    expect(numberToWords(5)).toBe("Fifth");
    expect(numberToWords(6)).toBe("Sixth");
    expect(numberToWords(7)).toBe("Seventh");
    expect(numberToWords(8)).toBe("Eighth");
    expect(numberToWords(9)).toBe("Ninth");
    expect(numberToWords(10)).toBe("Tenth");
  });

  test("should convert numbers 11-20 to ordinal words", () => {
    expect(numberToWords(11)).toBe("Eleventh");
    expect(numberToWords(12)).toBe("Twelfth");
    expect(numberToWords(13)).toBe("Thirteenth");
    expect(numberToWords(14)).toBe("Fourteenth");
    expect(numberToWords(15)).toBe("Fifteenth");
    expect(numberToWords(16)).toBe("Sixteenth");
    expect(numberToWords(17)).toBe("Seventeenth");
    expect(numberToWords(18)).toBe("Eighteenth");
    expect(numberToWords(19)).toBe("Nineteenth");
    expect(numberToWords(20)).toBe("Twentieth");
  });

  test("should convert numbers 21-25 to ordinal words", () => {
    expect(numberToWords(21)).toBe("Twenty-First");
    expect(numberToWords(22)).toBe("Twenty-Second");
    expect(numberToWords(23)).toBe("Twenty-Third");
    expect(numberToWords(24)).toBe("Twenty-Fourth");
    expect(numberToWords(25)).toBe("Twenty-Fifth");
  });

  test("should fall back to number + 'th' for unmapped numbers", () => {
    expect(numberToWords(26)).toBe("26th");
    expect(numberToWords(30)).toBe("30th");
    expect(numberToWords(50)).toBe("50th");
    expect(numberToWords(100)).toBe("100th");
    expect(numberToWords(365)).toBe("365th");
  });

  test("should handle edge cases", () => {
    expect(numberToWords(0)).toBe("0th");
    expect(numberToWords(-1)).toBe("-1th");
    expect(numberToWords(999)).toBe("999th");
  });

  test("should handle decimal numbers", () => {
    expect(numberToWords(1.5)).toBe("1.5th");
    expect(numberToWords(2.7)).toBe("2.7th");
  });

  test("should handle large numbers", () => {
    expect(numberToWords(1000)).toBe("1000th");
    expect(numberToWords(9999)).toBe("9999th");
  });
});
