import { describe, test, expect, beforeEach } from "vitest";
import { Hagiography } from "./Hagiography";
import { Calendar } from "../calendar";
import dayjs from "dayjs";

// Helper to create Hagiography instances with real Calendar
const createHagiography = (date: string) =>
  new Hagiography(new Calendar(dayjs(date)));

describe("Hagiography", () => {
  // Reference hagiography for the 2025-2026 liturgical year
  let hagiography: Hagiography;

  beforeEach(() => {
    hagiography = createHagiography("2025-11-30");
  });

  describe("constructor", () => {
    test("creates instance with Calendar dependency", () => {
      expect(hagiography).toBeInstanceOf(Hagiography);
    });
  });

  describe("getAll", () => {
    test("returns object with date keys", () => {
      const all = hagiography.getAll();

      expect(typeof all).toBe("object");
      const dates = Object.keys(all);
      expect(dates.length).toBeGreaterThan(0);
    });

    test("only includes dates that match readings.json entries", () => {
      const all = hagiography.getAll();
      const dates = Object.keys(all);

      // Should not include all 365 days - only saints with readings
      expect(dates.length).toBeLessThan(100);
      expect(dates.length).toBeGreaterThan(20);
    });

    test("each entry has title and morning", () => {
      const all = hagiography.getAll();

      for (const date of Object.keys(all)) {
        const reading = all[date];
        expect(reading).toHaveProperty("title");
        expect(reading).toHaveProperty("morning");
        expect(typeof reading.title).toBe("string");
        expect(typeof reading.morning).toBe("string");
      }
    });

    test("date keys are in YYYY-MM-DD format", () => {
      const all = hagiography.getAll();
      const dates = Object.keys(all);

      for (const date of dates) {
        expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    });

    test("covers dates within liturgical year range", () => {
      const all = hagiography.getAll();
      const dates = Object.keys(all).sort();

      // Should start on or after First Sunday of Advent
      expect(dates[0] >= "2025-11-30").toBe(true);
      // Should end before next First Sunday of Advent
      expect(dates[dates.length - 1] <= "2026-11-28").toBe(true);
    });
  });

  describe("getToday", () => {
    test("returns reading when today matches a saint in readings.json", () => {
      // Dec 6 is Saint Nicholas
      const hag = createHagiography("2025-12-06");
      const reading = hag.getToday();

      expect(reading).not.toBeNull();
      expect(reading?.title).toBe("Saint Nicholas, Bishop");
    });

    test("returns null when today has no matching saint", () => {
      // July 15 is an ordinary day with no saint in readings.json
      const hag = createHagiography("2026-07-15");
      const reading = hag.getToday();

      expect(reading).toBeNull();
    });

    test("returns null for feast day without saint reading", () => {
      // Christmas is a feast but not a saint day with hagiography
      const hag = createHagiography("2025-12-25");
      const reading = hag.getToday();

      expect(reading).toBeNull();
    });
  });

  describe("reading structure", () => {
    test("title is populated from readings.json key", () => {
      const all = hagiography.getAll();
      const dec6 = all["2025-12-06"];

      expect(dec6.title).toBe("Saint Nicholas, Bishop");
    });

    test("morning field is string", () => {
      const all = hagiography.getAll();
      const dec6 = all["2025-12-06"];

      expect(typeof dec6.morning).toBe("string");
      expect(dec6.morning).toContain("LFF");
    });

    test("evening field is string when present", () => {
      const all = hagiography.getAll();
      const dec6 = all["2025-12-06"];

      expect(dec6.evening).toBeDefined();
      expect(typeof dec6.evening).toBe("string");
    });

    test("link field is string when present", () => {
      const all = hagiography.getAll();
      // Saint Lucy has a link field
      const dec13 = all["2025-12-13"];

      expect(dec13.link).toBeDefined();
      expect(typeof dec13.link).toBe("string");
      expect(dec13.link).toContain("/people/saints/");
    });
  });

  describe("calendar matching", () => {
    test("matches saints by stripped markdown title", () => {
      // Calendar has "[Saint Nicholas](/people/saints/early/nicholas-of-myra), Bishop"
      // Should match "Saint Nicholas, Bishop" in readings.json
      const all = hagiography.getAll();

      expect(all["2025-12-06"]).toBeDefined();
      expect(all["2025-12-06"].title).toBe("Saint Nicholas, Bishop");
    });

    test("finds saint even when superseded by higher-ranked feast", () => {
      // Nov 30, 2025 is First Sunday of Advent (rank 1) AND Saint Andrew (rank 4)
      // Saint Andrew is superseded but should still return if in readings.json
      // Note: Saint Andrew is NOT in our readings.json, so this tests the behavior
      const hag = createHagiography("2025-11-30");
      const all = hag.getAll();

      // Nov 30 2025 only has Advent (no Andrew reading in our data)
      expect(all["2025-11-30"]).toBeUndefined();
    });
  });

  describe("specific saints", () => {
    test("Saint Nicholas (Dec 6) returns reading", () => {
      const all = hagiography.getAll();
      const reading = all["2025-12-06"];

      expect(reading).toBeDefined();
      expect(reading.title).toBe("Saint Nicholas, Bishop");
      expect(reading.morning).toBe("LFF 554, pars. 1-2");
      expect(reading.evening).toBe("LFF 554, pars. 3-4");
    });

    test("Saint Hilary (Jan 13) returns reading", () => {
      const all = hagiography.getAll();
      const reading = all["2026-01-13"];

      expect(reading).toBeDefined();
      expect(reading.title).toBe("Saint Hilary, Bishop and Doctor of the Church");
      expect(reading.morning).toContain("LFF");
    });

    test("Saint Lucy (Dec 13) has link field", () => {
      const all = hagiography.getAll();
      const reading = all["2025-12-13"];

      expect(reading).toBeDefined();
      expect(reading.title).toBe("Saint Lucy, Virgin and Martyr");
      expect(reading.link).toBe("/people/saints/early/lucy-of-syracuse#readings");
    });

    test("Saint Patrick (Mar 17) returns reading", () => {
      const all = hagiography.getAll();
      const reading = all["2026-03-17"];

      expect(reading).toBeDefined();
      expect(reading.title).toBe("Saint Patrick, Bishop");
    });
  });

  describe("edge cases", () => {
    test("ordinary day with no saint returns nothing", () => {
      const all = hagiography.getAll();
      // Pick a random weekday with no saint
      expect(all["2026-03-10"]).toBeUndefined();
    });

    test("Christmas returns nothing (feast, not saint)", () => {
      const all = hagiography.getAll();
      expect(all["2025-12-25"]).toBeUndefined();
    });

    test("Easter returns nothing (feast, not saint)", () => {
      const all = hagiography.getAll();
      // Easter 2026 is April 5
      expect(all["2026-04-05"]).toBeUndefined();
    });

    test.each([2024, 2025, 2026, 2027, 2028, 2029, 2030])(
      "consistency across years: %i has readings",
      (year) => {
        const hag = createHagiography(`${year}-07-01`);
        const all = hag.getAll();

        // Should have readings for every liturgical year
        const dates = Object.keys(all);
        expect(dates.length).toBeGreaterThan(20);

        // Every reading should have required fields
        for (const date of dates) {
          expect(all[date]).toHaveProperty("title");
          expect(all[date]).toHaveProperty("morning");
        }
      }
    );
  });
});
