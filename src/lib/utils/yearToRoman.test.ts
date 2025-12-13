import { describe, test, expect } from "vitest";
import { yearToRoman } from "./yearToRoman";

describe("yearToRoman", () => {
  test("should convert basic single digit years", () => {
    expect(yearToRoman(1)).toBe("I");
    expect(yearToRoman(2)).toBe("II");
    expect(yearToRoman(3)).toBe("III");
    expect(yearToRoman(4)).toBe("IV");
    expect(yearToRoman(5)).toBe("V");
    expect(yearToRoman(6)).toBe("VI");
    expect(yearToRoman(7)).toBe("VII");
    expect(yearToRoman(8)).toBe("VIII");
    expect(yearToRoman(9)).toBe("IX");
  });

  test("should convert tens", () => {
    expect(yearToRoman(10)).toBe("X");
    expect(yearToRoman(20)).toBe("XX");
    expect(yearToRoman(30)).toBe("XXX");
    expect(yearToRoman(40)).toBe("XL");
    expect(yearToRoman(50)).toBe("L");
    expect(yearToRoman(60)).toBe("LX");
    expect(yearToRoman(70)).toBe("LXX");
    expect(yearToRoman(80)).toBe("LXXX");
    expect(yearToRoman(90)).toBe("XC");
  });

  test("should convert hundreds", () => {
    expect(yearToRoman(100)).toBe("C");
    expect(yearToRoman(200)).toBe("CC");
    expect(yearToRoman(300)).toBe("CCC");
    expect(yearToRoman(400)).toBe("CD");
    expect(yearToRoman(500)).toBe("D");
    expect(yearToRoman(600)).toBe("DC");
    expect(yearToRoman(700)).toBe("DCC");
    expect(yearToRoman(800)).toBe("DCCC");
    expect(yearToRoman(900)).toBe("CM");
  });

  test("should convert thousands", () => {
    expect(yearToRoman(1000)).toBe("M");
    expect(yearToRoman(2000)).toBe("MM");
    expect(yearToRoman(3000)).toBe("MMM");
  });

  test("should convert complex years", () => {
    expect(yearToRoman(27)).toBe("XXVII");
    expect(yearToRoman(48)).toBe("XLVIII");
    expect(yearToRoman(59)).toBe("LIX");
    expect(yearToRoman(93)).toBe("XCIII");
    expect(yearToRoman(141)).toBe("CXLI");
    expect(yearToRoman(163)).toBe("CLXIII");
    expect(yearToRoman(402)).toBe("CDII");
    expect(yearToRoman(575)).toBe("DLXXV");
    expect(yearToRoman(911)).toBe("CMXI");
    expect(yearToRoman(1024)).toBe("MXXIV");
  });

  test("should convert historical years", () => {
    expect(yearToRoman(33)).toBe("XXXIII"); // Crucifixion year
    expect(yearToRoman(325)).toBe("CCCXXV"); // Council of Nicaea
    expect(yearToRoman(476)).toBe("CDLXXVI"); // Fall of Western Roman Empire
    expect(yearToRoman(800)).toBe("DCCC"); // Charlemagne crowned
    expect(yearToRoman(1066)).toBe("MLXVI"); // Battle of Hastings
    expect(yearToRoman(1215)).toBe("MCCXV"); // Magna Carta
    expect(yearToRoman(1453)).toBe("MCDLIII"); // Fall of Constantinople
    expect(yearToRoman(1517)).toBe("MDXVII"); // Protestant Reformation
    expect(yearToRoman(1776)).toBe("MDCCLXXVI"); // American Independence
    expect(yearToRoman(1945)).toBe("MCMXLV"); // End of WWII
  });

  test("should convert modern years", () => {
    expect(yearToRoman(2000)).toBe("MM");
    expect(yearToRoman(2023)).toBe("MMXXIII");
    expect(yearToRoman(2024)).toBe("MMXXIV");
    expect(yearToRoman(2025)).toBe("MMXXV");
    expect(yearToRoman(2026)).toBe("MMXXVI");
  });

  test("should handle edge cases with subtractive notation", () => {
    expect(yearToRoman(14)).toBe("XIV");
    expect(yearToRoman(19)).toBe("XIX");
    expect(yearToRoman(44)).toBe("XLIV");
    expect(yearToRoman(49)).toBe("XLIX");
    expect(yearToRoman(94)).toBe("XCIV");
    expect(yearToRoman(99)).toBe("XCIX");
    expect(yearToRoman(444)).toBe("CDXLIV");
    expect(yearToRoman(499)).toBe("CDXCIX");
    expect(yearToRoman(944)).toBe("CMXLIV");
    expect(yearToRoman(999)).toBe("CMXCIX");
  });

  test("should throw error for non-positive years", () => {
    expect(() => yearToRoman(0)).toThrow("Year must be positive");
    expect(() => yearToRoman(-1)).toThrow("Year must be positive");
    expect(() => yearToRoman(-100)).toThrow("Year must be positive");
  });

  test("should handle large years", () => {
    expect(yearToRoman(3999)).toBe("MMMCMXCIX");
    expect(yearToRoman(3888)).toBe("MMMDCCCLXXXVIII");
    expect(yearToRoman(3456)).toBe("MMMCDLVI");
  });
});
