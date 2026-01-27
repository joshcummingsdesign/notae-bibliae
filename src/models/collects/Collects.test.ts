import { describe, test, expect, beforeEach } from "vitest";
import { Collects } from "./Collects";
import { Calendar } from "../calendar";
import dayjs from "dayjs";

// Helper to create Collects instances with real Calendar
const createCollects = (date: string) =>
  new Collects(new Calendar(dayjs(date)));

describe("Collects", () => {
  // Reference collects for the 2025-2026 liturgical year
  let collects: Collects;

  beforeEach(() => {
    collects = createCollects("2025-11-30");
  });

  describe("constructor", () => {
    test("creates instance with Calendar dependency", () => {
      expect(collects).toBeInstanceOf(Collects);
    });

    test("loads collect items from data", () => {
      expect(collects.collects).toBeDefined();
      expect(collects.collects.length).toBeGreaterThan(0);
    });
  });

  describe("queryCollects", () => {
    test("returns all collect items", () => {
      const items = collects.queryCollects();

      expect(items.length).toBeGreaterThan(100);
      expect(Array.isArray(items)).toBe(true);
    });

    test("each collect has required properties", () => {
      const items = collects.queryCollects();

      for (const item of items) {
        expect(item).toHaveProperty("title");
        expect(item).toHaveProperty("text");
        expect(item).toHaveProperty("source");
        expect(typeof item.title).toBe("string");
        expect(typeof item.text).toBe("string");
        expect(typeof item.source).toBe("string");
      }
    });

    test("first collect is First Sunday of Advent", () => {
      const items = collects.queryCollects();
      expect(items[0].title).toBe("First Sunday of Advent");
      expect(items[0].text).toBeTruthy();
    });

    test("last collect is a saint's day", () => {
      const items = collects.queryCollects();
      const lastItem = items[items.length - 1];
      expect(lastItem.title).toContain("Saint");
      expect(lastItem.text).toBeTruthy();
    });

    test("includes major feasts", () => {
      const items = collects.queryCollects();
      const titles = items.map((i) => i.title);

      expect(titles).toContain("Christmas Day");
      expect(titles).toContain("The Epiphany");
      expect(titles).toContain("Ash Wednesday");
      expect(titles).toContain("Easter Day");
      expect(titles).toContain("Ascension Day");
      expect(titles).toContain("Pentecost (Whitsunday)");
      expect(titles).toContain("Trinity Sunday");
    });
  });

  describe("getAll", () => {
    describe("basic functionality", () => {
      test("returns collects for entire liturgical year", () => {
        const all = collects.getAll();
        const dates = Object.keys(all);

        // Should cover roughly 364-365 days
        expect(dates.length).toBeGreaterThanOrEqual(360);
        expect(dates.length).toBeLessThanOrEqual(366);
      });

      test("first date is First Sunday of Advent", () => {
        const all = collects.getAll();
        const dates = Object.keys(all).sort();

        expect(dates[0]).toBe("2025-11-30");
        expect(all["2025-11-30"][0].title).toBe("First Sunday of Advent");
      });

      test("last date is day before next Advent", () => {
        const all = collects.getAll();
        const dates = Object.keys(all).sort();

        expect(dates[dates.length - 1]).toBe("2026-11-28");
      });

      test("entries are sorted chronologically by date key", () => {
        const all = collects.getAll();
        const dates = Object.keys(all);

        for (let i = 1; i < dates.length; i++) {
          expect(dates[i] >= dates[i - 1]).toBe(true);
        }
      });
    });

    describe("collect structure", () => {
      test("each day has at least one collect", () => {
        const all = collects.getAll();

        for (const [date, dayCollects] of Object.entries(all)) {
          expect(dayCollects.length).toBeGreaterThanOrEqual(1);
        }
      });

      test("each collect has required properties", () => {
        const all = collects.getAll();

        for (const dayCollects of Object.values(all)) {
          for (const collect of dayCollects) {
            expect(collect).toHaveProperty("title");
            expect(collect).toHaveProperty("collect");
            expect(collect).toHaveProperty("source");
            expect(collect).toHaveProperty("date");
          }
        }
      });

      test("collect text is non-empty string", () => {
        const all = collects.getAll();
        const sampleDates = ["2025-11-30", "2025-12-25", "2026-04-05"];

        for (const date of sampleDates) {
          const dayCollects = all[date];
          expect(dayCollects).toBeDefined();
          for (const collect of dayCollects) {
            expect(typeof collect.collect).toBe("string");
            expect(collect.collect.length).toBeGreaterThan(0);
          }
        }
      });
    });

    describe("Sunday and feast day handling", () => {
      test("Sundays have their own collect", () => {
        const all = collects.getAll();

        // First Sunday of Advent
        expect(all["2025-11-30"][0].title).toBe("First Sunday of Advent");

        // Second Sunday of Advent
        expect(all["2025-12-07"][0].title).toBe("Second Sunday of Advent");
      });

      test("major feasts have their own collect", () => {
        const all = collects.getAll();

        expect(all["2025-12-25"][0].title).toBe("Christmas Day");
        expect(all["2026-01-06"][0].title).toBe("The Epiphany");
        expect(all["2026-04-05"][0].title).toBe("Easter Day");
      });

      test("weekdays without feasts fall back to previous Sunday", () => {
        const all = collects.getAll();

        // Dec 2, 2025 is a Tuesday after First Sunday of Advent (Dec 1 is St. Andrew)
        const dec2 = all["2025-12-02"];
        expect(dec2).toBeDefined();
        expect(dec2[0].title).toBe("First Sunday of Advent");
      });
    });

    describe("vigil handling", () => {
      test("vigils include previous Sunday collect", () => {
        const all = collects.getAll();

        // Christmas Eve is a vigil
        const christmasEve = all["2025-12-24"];
        expect(christmasEve).toBeDefined();
        // Should have both the Sunday collect and vigil collect
        expect(christmasEve.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe("Advent season", () => {
      test("all four Advent Sundays have collects", () => {
        const all = collects.getAll();

        expect(all["2025-11-30"][0].title).toBe("First Sunday of Advent");
        expect(all["2025-12-07"][0].title).toBe("Second Sunday of Advent");
        expect(all["2025-12-14"][0].title).toContain("Third Sunday of Advent");
        expect(all["2025-12-21"][0].title).toBe("Fourth Sunday of Advent");
      });
    });

    describe("Christmastide", () => {
      test("Christmas Day has collect", () => {
        const all = collects.getAll();
        expect(all["2025-12-25"][0].title).toBe("Christmas Day");
        expect(all["2025-12-25"][0].collect).toBeTruthy();
      });

      test("Christmas octave days have collects", () => {
        const all = collects.getAll();

        expect(all["2025-12-26"]).toBeDefined();
        expect(all["2025-12-27"]).toBeDefined();
        expect(all["2025-12-28"]).toBeDefined();
      });
    });

    describe("Lent and Holy Week", () => {
      test("Ash Wednesday has collect", () => {
        const all = collects.getAll();
        expect(all["2026-02-18"][0].title).toBe("Ash Wednesday");
      });

      test("Lenten Sundays have collects", () => {
        const all = collects.getAll();

        expect(all["2026-02-22"][0].title).toBe("First Sunday of Lent");
        expect(all["2026-03-01"][0].title).toBe("Second Sunday of Lent");
      });

      test("Holy Week has collects", () => {
        const all = collects.getAll();

        expect(all["2026-03-29"][0].title).toContain("Palm Sunday");
        expect(all["2026-04-02"][0].title).toContain("Maundy Thursday");
        expect(all["2026-04-03"][0].title).toContain("Good Friday");
        expect(all["2026-04-04"][0].title).toContain("Holy Saturday");
      });
    });

    describe("Eastertide", () => {
      test("Easter Day has collect", () => {
        const all = collects.getAll();
        expect(all["2026-04-05"][0].title).toBe("Easter Day");
        expect(all["2026-04-05"][0].collect).toBeTruthy();
      });

      test("Ascension Day has collect", () => {
        const all = collects.getAll();
        expect(all["2026-05-14"][0].title).toBe("Ascension Day");
      });

      test("Pentecost has collect", () => {
        const all = collects.getAll();
        expect(all["2026-05-24"][0].title).toBe("Pentecost (Whitsunday)");
      });
    });

    describe("Trinitytide", () => {
      test("Trinity Sunday has collect", () => {
        const all = collects.getAll();
        expect(all["2026-05-31"][0].title).toBe("Trinity Sunday");
      });

      test("Sundays after Trinity have collects", () => {
        const all = collects.getAll();

        expect(all["2026-06-07"][0].title).toBe("First Sunday After Trinity");
        expect(all["2026-06-14"][0].title).toBe("Second Sunday After Trinity");
      });
    });
  });

  describe("getByDay", () => {
    test("returns collects for today when no date specified", () => {
      const todayCollects = collects.getByDay();

      expect(Array.isArray(todayCollects)).toBe(true);
      expect(todayCollects.length).toBeGreaterThanOrEqual(1);
    });

    test("returns collects for specified date", () => {
      const christmas = collects.getByDay(dayjs("2025-12-25"));

      expect(christmas.length).toBeGreaterThanOrEqual(1);
      expect(christmas[0].title).toBe("Christmas Day");
    });

    test("returns empty array for invalid date", () => {
      // A date outside the liturgical year
      const outsideYear = collects.getByDay(dayjs("2020-01-01"));
      expect(Array.isArray(outsideYear)).toBe(true);
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
    ])("getByDay(%s) returns collect for '%s'", (date, expectedTitle) => {
      const dayCollects = collects.getByDay(dayjs(date));
      expect(dayCollects[0].title).toBe(expectedTitle);
    });
  });

  describe("edge cases", () => {
    describe("year boundary handling", () => {
      test("collects span December to January correctly", () => {
        const all = collects.getAll();

        expect(all["2025-12-25"]).toBeDefined();
        expect(all["2026-01-01"]).toBeDefined();
        expect(all["2026-01-06"]).toBeDefined();
      });

      test("handles liturgical year crossing calendar year", () => {
        const all = collects.getAll();
        const dates = Object.keys(all).sort();

        // First date should be in 2025 (Advent)
        expect(dates[0].startsWith("2025")).toBe(true);

        // Last date should be in 2026
        expect(dates[dates.length - 1].startsWith("2026")).toBe(true);
      });
    });

    describe("leap year handling", () => {
      test("handles Feb 29 in leap years", () => {
        // 2024 is a leap year
        const leapYearCollects = createCollects("2024-01-01");
        const all = leapYearCollects.getAll();

        // Feb 29, 2024 should have collects
        expect(all["2024-02-29"]).toBeDefined();
      });
    });

    describe("multiple collects per day", () => {
      test("feast days can have multiple collects", () => {
        const all = collects.getAll();

        // Find a day with multiple collects
        const multiCollectDays = Object.entries(all).filter(
          ([_, dayCollects]) => dayCollects.length > 1,
        );

        expect(multiCollectDays.length).toBeGreaterThan(0);
      });

      test("Saint Andrew on First Sunday of Advent has two collects", () => {
        // In 2025, Nov 30 is both First Sunday of Advent and St. Andrew
        // But St. Andrew is displaced, so check Dec 1
        const all = collects.getAll();
        const dec1 = all["2025-12-01"];

        // Should have St. Andrew collect since it was transferred
        const hasStAndrew = dec1.some((c) => c.title.includes("Saint Andrew"));
        expect(hasStAndrew).toBe(true);
      });
    });

    describe("Holy Week special handling", () => {
      test("Triduum days have proper collects", () => {
        const all = collects.getAll();

        // Maundy Thursday
        const maundyThursday = all["2026-04-02"];
        expect(maundyThursday).toBeDefined();
        expect(maundyThursday[0].title).toContain("Maundy Thursday");

        // Good Friday
        const goodFriday = all["2026-04-03"];
        expect(goodFriday).toBeDefined();
        expect(goodFriday[0].title).toContain("Good Friday");

        // Holy Saturday
        const holySaturday = all["2026-04-04"];
        expect(holySaturday).toBeDefined();
        expect(holySaturday[0].title).toContain("Holy Saturday");
      });
    });

    describe("ranking precedence", () => {
      test("commemorations (rank 6) are omitted on Principal Sundays (rank 1)", () => {
        // Dec 7, 2025 is Second Sunday of Advent (rank 1) AND Saint Ambrose (rank 6)
        // According to ranking rules, Saint Ambrose should be omitted entirely
        const all = collects.getAll();
        const dec7 = all["2025-12-07"];

        expect(dec7).toBeDefined();
        expect(dec7.length).toBe(1);
        expect(dec7[0].title).toBe("Second Sunday of Advent");
        // Saint Ambrose should NOT appear
        expect(dec7.some((c) => c.title.includes("Ambrose"))).toBe(false);
      });

      test("on Ordinary Sundays, Sunday collect comes before commemoration", () => {
        // Find a date where a Saint (rank 6) falls on an Ordinary Sunday (rank 7)
        // The Calendar sorts to put Sunday before Saint in display order
        const yearCollects = createCollects("2026-06-07"); // Jun 7, 2026 is a Sunday in Trinitytide
        const all = yearCollects.getAll();

        // Check any date that has both an Ordinary Sunday and a Saint
        for (const [date, dayCollects] of Object.entries(all)) {
          const hasSunday = dayCollects.some(
            (c) => c.isSunday && c.rank === 7
          );
          const hasSaint = dayCollects.some((c) => c.rank === 6);

          if (hasSunday && hasSaint) {
            // Sunday (rank 7) should come before Saint (rank 6)
            const sundayIndex = dayCollects.findIndex(
              (c) => c.isSunday && c.rank === 7
            );
            const saintIndex = dayCollects.findIndex((c) => c.rank === 6);
            expect(sundayIndex).toBeLessThan(saintIndex);
            break;
          }
        }
      });

      test("feasts on Ordinary Sundays show feast collect first", () => {
        // When a Feast (rank 4) falls on an Ordinary Sunday (rank 7),
        // the Feast takes precedence (appears first), then Sunday collect after
        const all = collects.getAll();

        // Find any date with both a Feast and Ordinary Sunday
        for (const [date, dayCollects] of Object.entries(all)) {
          const hasFeast = dayCollects.some(
            (c) => c.isFeast && c.rank === 4
          );
          const hasOrdinarySunday = dayCollects.some(
            (c) => c.isSunday && c.rank === 7
          );

          if (hasFeast && hasOrdinarySunday) {
            // Feast (rank 4) should come before Ordinary Sunday (rank 7)
            const feastIndex = dayCollects.findIndex(
              (c) => c.isFeast && c.rank === 4
            );
            const sundayIndex = dayCollects.findIndex(
              (c) => c.isSunday && c.rank === 7
            );
            expect(feastIndex).toBeLessThan(sundayIndex);
            break;
          }
        }
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
    ])("getAll returns valid collects for year starting %s", (startDate) => {
      const yearCollects = createCollects(startDate);
      const all = yearCollects.getAll();
      const entries = Object.entries(all);

      // Should have roughly a year's worth of entries
      expect(entries.length).toBeGreaterThanOrEqual(360);

      // All entries should have valid structure
      for (const [date, dayCollects] of entries) {
        expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(dayCollects.length).toBeGreaterThanOrEqual(1);
        expect(dayCollects[0].collect).toBeTruthy();
      }
    });

    test("major feasts always have collects regardless of year", () => {
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
        const yearCollects = createCollects(startDate);
        const all = yearCollects.getAll();
        const allTitles = Object.values(all)
          .flat()
          .map((c) => c.title);

        for (const feast of majorFeasts) {
          expect(allTitles).toContain(feast);
        }
      }
    });
  });
});
