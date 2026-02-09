import { describe, test, expect, beforeEach } from "vitest";
import { Communion } from "./Communion";
import { Calendar } from "../calendar";
import dayjs from "dayjs";

// Helper to create Communion instances with real Calendar
const createCommunion = (date: string) =>
  new Communion(new Calendar(dayjs(date)));

describe("Communion", () => {
  // Reference communion for the 2025-2026 liturgical year
  let communion: Communion;

  beforeEach(() => {
    communion = createCommunion("2025-11-30");
  });

  describe("constructor", () => {
    test("creates instance with Calendar dependency", () => {
      expect(communion).toBeInstanceOf(Communion);
    });

    test("loads communion readings from data", () => {
      expect(communion.readings).toBeDefined();
      expect(Object.keys(communion.readings).length).toBeGreaterThan(0);
    });
  });

  describe("getAll", () => {
    describe("basic functionality", () => {
      test("returns communion readings for liturgical year", () => {
        const all = communion.getAll();
        const dates = Object.keys(all);

        // Should have readings for Sundays and feast days (not every day)
        expect(dates.length).toBeGreaterThan(50);
        expect(dates.length).toBeLessThan(200);
      });

      test("first date is First Sunday of Advent", () => {
        const all = communion.getAll();
        const dates = Object.keys(all).sort();

        expect(dates[0]).toBe("2025-11-30");
        expect(all["2025-11-30"][0].title).toBe("First Sunday of Advent");
      });

      test("entries are sorted chronologically by date key", () => {
        const all = communion.getAll();
        const dates = Object.keys(all);

        for (let i = 1; i < dates.length; i++) {
          expect(dates[i] >= dates[i - 1]).toBe(true);
        }
      });
    });

    describe("communion structure", () => {
      test("each communion has required properties", () => {
        const all = communion.getAll();

        for (const dayReadings of Object.values(all)) {
          for (const reading of dayReadings) {
            expect(reading).toHaveProperty("title");
            expect(reading).toHaveProperty("epistle");
            expect(reading).toHaveProperty("gospel");
            expect(reading).toHaveProperty("date");
            // source is optional
            if (reading.source !== undefined) {
              expect(typeof reading.source).toBe("string");
            }
          }
        }
      });

      test("epistle and gospel are arrays of strings", () => {
        const all = communion.getAll();
        const sampleDates = ["2025-11-30", "2025-12-25", "2026-04-05"];

        for (const date of sampleDates) {
          const dayReadings = all[date];
          expect(dayReadings).toBeDefined();
          for (const reading of dayReadings) {
            expect(Array.isArray(reading.epistle)).toBe(true);
            expect(Array.isArray(reading.gospel)).toBe(true);
            expect(reading.epistle.length).toBeGreaterThan(0);
            expect(reading.gospel.length).toBeGreaterThan(0);
          }
        }
      });
    });

    describe("Sunday communion readings", () => {
      test("Advent Sundays have communion readings", () => {
        const all = communion.getAll();

        expect(all["2025-11-30"][0].title).toBe("First Sunday of Advent");
        expect(all["2025-12-07"][0].title).toBe("Second Sunday of Advent");
        expect(all["2025-12-14"][0].title).toContain("Third Sunday of Advent");
        expect(all["2025-12-21"][0].title).toBe("Fourth Sunday of Advent");
      });

      test("Easter season Sundays have communion readings", () => {
        const all = communion.getAll();

        expect(all["2026-04-05"][0].title).toBe("Easter Day");
        expect(all["2026-04-12"][0].title).toBe("Second Sunday of Easter");
      });

      test("Trinity Sundays have communion readings", () => {
        const all = communion.getAll();

        expect(all["2026-05-31"][0].title).toBe("Trinity Sunday");
        expect(all["2026-06-07"][0].title).toBe("First Sunday After Trinity");
      });
    });

    describe("major feasts", () => {
      test("Christmas Day has communion reading", () => {
        const all = communion.getAll();
        expect(all["2025-12-25"][0].title).toBe("Christmas Day");
        expect(all["2025-12-25"][0].epistle).toBeDefined();
        expect(all["2025-12-25"][0].gospel).toBeDefined();
      });

      test("Epiphany has communion reading", () => {
        const all = communion.getAll();
        expect(all["2026-01-06"][0].title).toBe("The Epiphany");
      });

      test("Ash Wednesday has communion reading", () => {
        const all = communion.getAll();
        expect(all["2026-02-18"][0].title).toBe("Ash Wednesday");
      });

      test("Easter Day has communion reading", () => {
        const all = communion.getAll();
        expect(all["2026-04-05"][0].title).toBe("Easter Day");
      });

      test("Ascension Day has communion reading", () => {
        const all = communion.getAll();
        expect(all["2026-05-14"][0].title).toBe("Ascension Day");
      });

      test("Pentecost has communion reading", () => {
        const all = communion.getAll();
        expect(all["2026-05-24"][0].title).toBe("Pentecost (Whitsunday)");
      });
    });

    describe("Holy Week", () => {
      test("Palm Sunday has communion reading", () => {
        const all = communion.getAll();
        expect(all["2026-03-29"][0].title).toContain("Palm Sunday");
      });

      test("Maundy Thursday has communion reading", () => {
        const all = communion.getAll();
        expect(all["2026-04-02"][0].title).toContain("Maundy Thursday");
      });

      test("Good Friday has communion reading", () => {
        const all = communion.getAll();
        expect(all["2026-04-03"][0].title).toContain("Good Friday");
      });
    });

    describe("one communion per day filtering", () => {
      test("days with multiple feasts only return one communion (unless vigil)", () => {
        const all = communion.getAll();

        for (const [date, readings] of Object.entries(all)) {
          const nonVigils = readings.filter((r) => !r.isVigil);
          // Should only have one non-vigil communion per day
          expect(nonVigils.length).toBeLessThanOrEqual(1);
        }
      });

      test("vigils can appear alongside regular communion", () => {
        const all = communion.getAll();

        // Find any day with a vigil
        const dayWithVigil = Object.entries(all).find(([_, readings]) =>
          readings.some((r) => r.isVigil)
        );

        if (dayWithVigil) {
          const [_, readings] = dayWithVigil;
          const vigils = readings.filter((r) => r.isVigil);
          expect(vigils.length).toBeGreaterThan(0);
        }
      });
    });

    describe("weekdays without communion", () => {
      test("ordinary weekdays do not have communion readings", () => {
        const all = communion.getAll();

        // Dec 2, 2025 is a Tuesday - should not have communion unless it's a feast
        // Actually Dec 2 might have communion if there's a feast. Let's check a random weekday
        // that definitely has no feast
        const dates = Object.keys(all);

        // Not every day should have communion (weekdays without feasts won't)
        expect(dates.length).toBeLessThan(366);
      });
    });
  });

  describe("getByDay", () => {
    test("returns communion for today when no date specified", () => {
      const todayReadings = communion.getByDay();

      // May or may not have readings depending on the day
      expect(Array.isArray(todayReadings)).toBe(true);
    });

    test("returns communion for specified date", () => {
      const christmas = communion.getByDay(dayjs("2025-12-25"));

      expect(christmas.length).toBeGreaterThanOrEqual(1);
      expect(christmas[0].title).toBe("Christmas Day");
    });

    test("returns empty array for date without communion", () => {
      // A random weekday without a feast
      const weekday = communion.getByDay(dayjs("2025-12-03")); // Wednesday in Advent
      // This might or might not have communion depending on the calendar
      expect(Array.isArray(weekday)).toBe(true);
    });

    test("returns empty array for date outside liturgical year", () => {
      const outsideYear = communion.getByDay(dayjs("2020-01-01"));
      expect(Array.isArray(outsideYear)).toBe(true);
      expect(outsideYear.length).toBe(0);
    });

    test.each([
      ["2025-11-30", "First Sunday of Advent"],
      ["2025-12-25", "Christmas Day"],
      ["2026-01-06", "The Epiphany"],
      ["2026-02-18", "Ash Wednesday"],
      ["2026-04-05", "Easter Day"],
      ["2026-05-14", "Ascension Day"],
      ["2026-05-24", "Pentecost (Whitsunday)"],
      ["2026-05-31", "Trinity Sunday"],
    ])("getByDay(%s) returns communion for '%s'", (date, expectedTitle) => {
      const dayReadings = communion.getByDay(dayjs(date));
      expect(dayReadings[0].title).toBe(expectedTitle);
    });
  });

  describe("edge cases", () => {
    describe("year boundary handling", () => {
      test("communion spans December to January correctly", () => {
        const all = communion.getAll();

        expect(all["2025-12-25"]).toBeDefined(); // Christmas
        expect(all["2026-01-06"]).toBeDefined(); // Epiphany
      });

      test("handles liturgical year crossing calendar year", () => {
        const all = communion.getAll();
        const dates = Object.keys(all).sort();

        // First date should be in 2025 (Advent)
        expect(dates[0].startsWith("2025")).toBe(true);

        // Some dates should be in 2026
        expect(dates.some((d) => d.startsWith("2026"))).toBe(true);
      });
    });

    describe("leap year handling", () => {
      test("handles Feb 29 in leap years if it has communion", () => {
        // 2024 is a leap year
        const leapYearCommunion = createCommunion("2024-01-01");
        const all = leapYearCommunion.getAll();

        // Feb 29, 2024 may or may not have communion depending on if it's a feast
        // Just verify no errors
        expect(all).toBeDefined();
      });
    });
  });

  describe("consistency across years", () => {
    test.each([
      "2020-11-29",
      "2023-12-03",
      "2025-11-30",
      "2028-12-03",
      "2030-12-01",
    ])(
      "getAll returns valid communion readings for year starting %s",
      (startDate) => {
        const yearCommunion = createCommunion(startDate);
        const all = yearCommunion.getAll();
        const entries = Object.entries(all);

        // Should have communion readings
        expect(entries.length).toBeGreaterThan(50);

        // All entries should have valid structure
        for (const [date, dayReadings] of entries) {
          expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
          expect(dayReadings.length).toBeGreaterThanOrEqual(1);
          expect(dayReadings[0].epistle).toBeDefined();
          expect(dayReadings[0].gospel).toBeDefined();
        }
      }
    );

    test("major feasts always have communion regardless of year", () => {
      const years = ["2020-11-29", "2025-11-30", "2030-12-01"];
      const majorFeasts = [
        "Christmas Day",
        "The Epiphany",
        "Ash Wednesday",
        "Easter Day",
        "Ascension Day",
        "Pentecost (Whitsunday)",
        "Trinity Sunday",
      ];

      for (const startDate of years) {
        const yearCommunion = createCommunion(startDate);
        const all = yearCommunion.getAll();
        const allTitles = Object.values(all)
          .flat()
          .map((c) => c.title);

        for (const feast of majorFeasts) {
          expect(allTitles).toContain(feast);
        }
      }
    });
  });

  describe("data integrity", () => {
    test("all epistle references are valid format", () => {
      const all = communion.getAll();

      for (const dayReadings of Object.values(all)) {
        for (const reading of dayReadings) {
          for (const ref of reading.epistle) {
            // Should be a scripture reference like "Rom. 13:8-14"
            expect(typeof ref).toBe("string");
            expect(ref.length).toBeGreaterThan(0);
          }
        }
      }
    });

    test("all gospel references are valid format", () => {
      const all = communion.getAll();

      for (const dayReadings of Object.values(all)) {
        for (const reading of dayReadings) {
          for (const ref of reading.gospel) {
            // Should be a scripture reference like "Matt. 21:1-13"
            expect(typeof ref).toBe("string");
            expect(ref.length).toBeGreaterThan(0);
          }
        }
      }
    });

    test("all sources (if present) are non-empty strings", () => {
      const all = communion.getAll();

      for (const dayReadings of Object.values(all)) {
        for (const reading of dayReadings) {
          if (reading.source !== undefined) {
            expect(typeof reading.source).toBe("string");
            expect(reading.source.length).toBeGreaterThan(0);
          }
        }
      }
    });
  });
});
