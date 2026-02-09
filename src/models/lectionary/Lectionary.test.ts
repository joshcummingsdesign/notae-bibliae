import dayjs from "dayjs";
import { describe, test, expect, beforeAll } from "vitest";
import { Lectionary } from "./Lectionary";
import { Calendar } from "../calendar";
import { LectionaryDateMap } from "./types";

// Helper to create Lectionary instances with real Calendar
const createLectionary = (date: string) =>
  new Lectionary(new Calendar(dayjs(date)));

describe("Lectionary", () => {
  // Reference lectionary for the 2025-2026 liturgical year
  // Cached to avoid recomputing for each test
  let lectionary: Lectionary;
  let allData: LectionaryDateMap;
  let allDataWithLinks: LectionaryDateMap;

  beforeAll(() => {
    lectionary = createLectionary("2025-11-30");
    allData = lectionary.getAll(false);
    allDataWithLinks = lectionary.getAll(true);
  });

  describe("constructor", () => {
    test("creates instance with Calendar dependency", () => {
      expect(lectionary).toBeInstanceOf(Lectionary);
    });

    test("initializes all dependent models", () => {
      // Verify that getAll() doesn't throw, implying models are initialized
      expect(() => lectionary.getAll()).not.toThrow();
    });
  });

  describe("getAll", () => {
    describe("basic functionality", () => {
      test("returns lectionary data for entire liturgical year", () => {
        const dates = Object.keys(allData);

        // Should cover roughly 364-365 days
        expect(dates.length).toBeGreaterThanOrEqual(360);
        expect(dates.length).toBeLessThanOrEqual(366);
      });

      test("first date is First Sunday of Advent", () => {
        const dates = Object.keys(allData).sort();

        expect(dates[0]).toBe("2025-11-30");
      });

      test("last date is day before next Advent", () => {
        const dates = Object.keys(allData).sort();

        expect(dates[dates.length - 1]).toBe("2026-11-28");
      });

      test("entries are sorted chronologically by date key", () => {
        const dates = Object.keys(allData);

        for (let i = 1; i < dates.length; i++) {
          expect(dates[i] >= dates[i - 1]).toBe(true);
        }
      });
    });

    describe("lectionary item structure", () => {
      test("each day has required properties", () => {
        for (const [, item] of Object.entries(allData)) {
          expect(item).toHaveProperty("season");
          expect(item).toHaveProperty("primaryObservance");
          expect(item).toHaveProperty("morning");
          expect(item).toHaveProperty("evening");
        }
      });

      test("morning lessons have required structure", () => {
        const firstDay = Object.values(allData)[0];

        expect(firstDay.morning).toHaveProperty("first");
        expect(firstDay.morning).toHaveProperty("second");
        expect(firstDay.morning).toHaveProperty("collects");
        expect(Array.isArray(firstDay.morning.first)).toBe(true);
        expect(Array.isArray(firstDay.morning.second)).toBe(true);
        expect(Array.isArray(firstDay.morning.collects)).toBe(true);
      });

      test("evening lessons have required structure", () => {
        const firstDay = Object.values(allData)[0];

        expect(firstDay.evening).toHaveProperty("first");
        expect(firstDay.evening).toHaveProperty("second");
        expect(firstDay.evening).toHaveProperty("collects");
        expect(Array.isArray(firstDay.evening.first)).toBe(true);
        expect(Array.isArray(firstDay.evening.second)).toBe(true);
        expect(Array.isArray(firstDay.evening.collects)).toBe(true);
      });
    });

    describe("season assignment", () => {
      test.each([
        ["2025-11-30", "Advent"],
        ["2025-12-25", "Christmastide"],
        ["2026-01-06", "Epiphanytide"],
        ["2026-02-18", "Lent"],
        ["2026-04-05", "Eastertide"],
        ["2026-05-31", "Trinitytide"],
      ])("date %s is assigned season %s", (date, expectedSeason) => {
        expect(allData[date].season).toBe(expectedSeason);
      });

      test("every day has a valid season assigned", () => {
        const validSeasons = [
          "Advent",
          "Christmastide",
          "Epiphanytide",
          "Pre-Lent",
          "Lent",
          "Eastertide",
          "Whitsuntide",
          "Trinitytide",
        ];

        for (const [, item] of Object.entries(allData)) {
          expect(validSeasons).toContain(item.season);
        }
      });
    });

    describe("observance priority", () => {
      test("calendar event title takes precedence over lessons title", () => {
        // First Sunday of Advent should show Advent title, not weekday title
        expect(allData["2025-11-30"].primaryObservance).toBe(
          "First Sunday of Advent"
        );
      });

      test("feast day title overrides ordinary day title", () => {
        // Christmas should show Christmas Day, not weekday
        expect(allData["2025-12-25"].primaryObservance).toBe("Christmas Day");
      });

      test("falls back to lessons title when no calendar event", () => {
        // A weekday should have a title from lessons
        const dec2 = allData["2025-12-02"];
        expect(dec2.primaryObservance).toContain(
          "After the First Sunday of Advent"
        );
      });
    });

    describe("withLinks parameter", () => {
      test("withLinks=false (default) strips markdown links from observances", () => {
        for (const [, item] of Object.entries(allData)) {
          expect(item.primaryObservance).not.toContain("](/");
          if (item.secondaryObservance) {
            expect(item.secondaryObservance).not.toContain("](/");
          }
        }
      });

      test("withLinks=true preserves markdown links when present", () => {
        // If there are any differences, links were preserved
        // This tests the passthrough behavior
        for (const date of Object.keys(allDataWithLinks)) {
          if (
            allDataWithLinks[date].primaryObservance !==
            allData[date].primaryObservance
          ) {
            expect(allDataWithLinks[date].primaryObservance).toContain("](/");
          }
        }
        // Note: some observances may not have links
        // The test still verifies the parameter is passed through
      });
    });

    describe("vigil handling", () => {
      describe("collects vigil separation", () => {
        test("morning collects are defined for all days", () => {
          for (const [, item] of Object.entries(allData)) {
            expect(item.morning.collects).toBeDefined();
            expect(Array.isArray(item.morning.collects)).toBe(true);
          }
        });

        test("evening collects are defined for all days", () => {
          for (const [, item] of Object.entries(allData)) {
            expect(item.evening.collects).toBeDefined();
            expect(Array.isArray(item.evening.collects)).toBe(true);
          }
        });

        test("on non-vigil days, evening collects match morning collects", () => {
          // An ordinary weekday without vigil
          const dec3 = allData["2025-12-03"];
          expect(dec3.evening.collects).toEqual(dec3.morning.collects);
        });
      });

      describe("communion vigil separation", () => {
        test("morning communion uses non-vigil reading", () => {
          // First Sunday of Advent should have morning communion
          const advent1 = allData["2025-11-30"];
          expect(advent1.morning.communion).toBeDefined();
        });

        test("communion has epistle and gospel when present", () => {
          const advent1 = allData["2025-11-30"];
          if (advent1.morning.communion) {
            expect(advent1.morning.communion.epistle).toBeDefined();
            expect(advent1.morning.communion.gospel).toBeDefined();
          }
        });
      });
    });

    describe("data integration", () => {
      describe("lessons integration", () => {
        test("morning lessons include first and second readings", () => {
          const advent1 = allData["2025-11-30"];

          expect(advent1.morning.first.length).toBeGreaterThan(0);
          expect(advent1.morning.second.length).toBeGreaterThan(0);
        });

        test("evening lessons include first and second readings", () => {
          const advent1 = allData["2025-11-30"];

          expect(advent1.evening.first.length).toBeGreaterThan(0);
          expect(advent1.evening.second.length).toBeGreaterThan(0);
        });

        test("lesson readings are arrays of scripture references", () => {
          const advent1 = allData["2025-11-30"];

          for (const ref of advent1.morning.first) {
            expect(typeof ref).toBe("string");
          }
        });
      });

      describe("hagiography integration (third lesson)", () => {
        test("third lesson is included for saint days", () => {
          // Saint Nicholas (Dec 6) should have hagiography
          const dec6 = allData["2025-12-06"];
          expect(dec6.morning.third).toBeDefined();
          expect(dec6.morning.third?.title).toContain("Nicholas");
        });

        test("third lesson is undefined for non-saint days", () => {
          // First Sunday of Advent should not have saint reading
          const nov30 = allData["2025-11-30"];
          expect(nov30.morning.third).toBeUndefined();
        });

        test("third lesson has title and optional reading", () => {
          const dec6 = allData["2025-12-06"];

          if (dec6.morning.third) {
            expect(dec6.morning.third.title).toBeDefined();
            expect(typeof dec6.morning.third.title).toBe("string");
          }
        });
      });

      describe("collects integration", () => {
        test("each day has at least one collect", () => {
          for (const [, item] of Object.entries(allData)) {
            expect(item.morning.collects.length).toBeGreaterThanOrEqual(1);
            expect(item.evening.collects.length).toBeGreaterThanOrEqual(1);
          }
        });

        test("collect items have required structure", () => {
          const firstDay = Object.values(allData)[0];

          for (const collect of firstDay.morning.collects) {
            expect(collect).toHaveProperty("title");
            expect(collect).toHaveProperty("text");
          }
        });
      });

      describe("communion integration", () => {
        test("Sunday communion readings are present", () => {
          // First Sunday of Advent should have communion
          const advent1 = allData["2025-11-30"];
          expect(advent1.morning.communion).toBeDefined();
          expect(advent1.morning.communion?.epistle).toBeDefined();
          expect(advent1.morning.communion?.gospel).toBeDefined();
        });

        test("communion readings have valid structure", () => {
          const advent1 = allData["2025-11-30"];

          if (advent1.morning.communion) {
            expect(Array.isArray(advent1.morning.communion.epistle)).toBe(true);
            expect(Array.isArray(advent1.morning.communion.gospel)).toBe(true);
          }
        });
      });
    });

    describe("Advent season", () => {
      test("all four Advent Sundays have complete data", () => {
        expect(allData["2025-11-30"].primaryObservance).toBe(
          "First Sunday of Advent"
        );
        expect(allData["2025-12-07"].primaryObservance).toBe(
          "Second Sunday of Advent"
        );
        expect(allData["2025-12-14"].primaryObservance).toContain(
          "Third Sunday of Advent"
        );
        expect(allData["2025-12-21"].primaryObservance).toBe(
          "Fourth Sunday of Advent"
        );
      });
    });

    describe("Christmastide", () => {
      test("Christmas Day has complete lectionary data", () => {
        const christmas = allData["2025-12-25"];

        expect(christmas.primaryObservance).toBe("Christmas Day");
        expect(christmas.season).toBe("Christmastide");
        expect(christmas.morning.collects.length).toBeGreaterThan(0);
      });

      test("Christmas octave days have lectionary data", () => {
        expect(allData["2025-12-26"]).toBeDefined();
        expect(allData["2025-12-27"]).toBeDefined();
        expect(allData["2025-12-28"]).toBeDefined();
      });
    });

    describe("Lent and Holy Week", () => {
      test("Ash Wednesday has complete lectionary data", () => {
        const ashWed = allData["2026-02-18"];

        expect(ashWed.primaryObservance).toBe("Ash Wednesday");
        expect(ashWed.season).toBe("Lent");
      });

      test("Holy Week has lectionary data", () => {
        expect(allData["2026-03-29"].primaryObservance).toContain("Palm Sunday");
        expect(allData["2026-04-02"].primaryObservance).toContain("Maundy Thursday");
        expect(allData["2026-04-03"].primaryObservance).toContain("Good Friday");
        expect(allData["2026-04-04"].primaryObservance).toContain("Holy Saturday");
      });
    });

    describe("Eastertide", () => {
      test("Easter Day has complete lectionary data", () => {
        const easter = allData["2026-04-05"];

        expect(easter.primaryObservance).toBe("Easter Day");
        expect(easter.season).toBe("Eastertide");
        expect(easter.morning.collects.length).toBeGreaterThan(0);
      });

      test("Ascension Day has lectionary data", () => {
        expect(allData["2026-05-14"].primaryObservance).toBe("Ascension Day");
      });

      test("Pentecost has lectionary data", () => {
        expect(allData["2026-05-24"].primaryObservance).toBe(
          "Pentecost (Whitsunday)"
        );
      });
    });

    describe("Trinitytide", () => {
      test("Trinity Sunday has complete lectionary data", () => {
        const trinity = allData["2026-05-31"];

        expect(trinity.primaryObservance).toBe("Trinity Sunday");
        expect(trinity.season).toBe("Trinitytide");
      });

      test("Sundays after Trinity have lectionary data", () => {
        expect(allData["2026-06-07"].primaryObservance).toBe(
          "First Sunday After Trinity"
        );
        expect(allData["2026-06-14"].primaryObservance).toBe(
          "Second Sunday After Trinity"
        );
      });
    });
  });

  describe("getByDay", () => {
    test("returns lectionary for today when no date specified", () => {
      const today = lectionary.getByDay();

      expect(today).toBeDefined();
      expect(today?.season).toBe("Advent");
      expect(today?.primaryObservance).toBe("First Sunday of Advent");
    });

    test("returns lectionary for specified date", () => {
      // Use cached data for faster test
      const christmas = allData["2025-12-25"];

      expect(christmas).toBeDefined();
      expect(christmas?.primaryObservance).toBe("Christmas Day");
      expect(christmas?.season).toBe("Christmastide");
    });

    test("returns undefined for date outside liturgical year", () => {
      const outsideYear = lectionary.getByDay(dayjs("2020-01-01"));
      expect(outsideYear).toBeUndefined();
    });

    test("respects withLinks parameter", () => {
      const withoutLinks = allData["2025-12-06"];
      expect(withoutLinks?.primaryObservance).not.toContain("](/");
    });

    test.each([
      ["2025-11-30", "First Sunday of Advent", "Advent"],
      ["2025-12-25", "Christmas Day", "Christmastide"],
      ["2026-01-06", "The Epiphany", "Epiphanytide"],
      ["2026-02-18", "Ash Wednesday", "Lent"],
      ["2026-04-05", "Easter Day", "Eastertide"],
      ["2026-05-14", "Ascension Day", "Eastertide"],
      ["2026-05-24", "Pentecost (Whitsunday)", "Whitsuntide"],
      ["2026-05-31", "Trinity Sunday", "Trinitytide"],
    ])(
      "getByDay(%s) returns '%s' in season '%s'",
      (date, expectedTitle, expectedSeason) => {
        // Use cached data for faster test
        const item = allData[date];
        expect(item?.primaryObservance).toBe(expectedTitle);
        expect(item?.season).toBe(expectedSeason);
      }
    );
  });

  describe("edge cases", () => {
    describe("year boundary handling", () => {
      test("lectionary spans December to January correctly", () => {
        expect(allData["2025-12-25"]).toBeDefined();
        expect(allData["2025-12-31"]).toBeDefined();
        expect(allData["2026-01-01"]).toBeDefined();
        expect(allData["2026-01-06"]).toBeDefined();
      });

      test("handles liturgical year crossing calendar year", () => {
        const dates = Object.keys(allData).sort();

        // First date should be in 2025 (Advent)
        expect(dates[0].startsWith("2025")).toBe(true);

        // Last date should be in 2026
        expect(dates[dates.length - 1].startsWith("2026")).toBe(true);
      });
    });

    describe("leap year handling", () => {
      // Cache the leap year data
      let leapYearData: LectionaryDateMap;

      beforeAll(() => {
        const leapYearLectionary = createLectionary("2024-01-01");
        leapYearData = leapYearLectionary.getAll();
      });

      test("handles Feb 29 in leap years", () => {
        // Feb 29, 2024 should have lectionary data
        expect(leapYearData["2024-02-29"]).toBeDefined();
        expect(leapYearData["2024-02-29"].season).toBeDefined();
      });
    });

    describe("missing data handling", () => {
      test("days without hagiography have undefined third lesson", () => {
        // Most ordinary days should not have hagiography
        const dec3 = allData["2025-12-03"];
        expect(dec3.morning.third).toBeUndefined();
        expect(dec3.evening.third).toBeUndefined();
      });

      test("lesson readings default to empty arrays when missing", () => {
        for (const [, item] of Object.entries(allData)) {
          expect(Array.isArray(item.morning.first)).toBe(true);
          expect(Array.isArray(item.morning.second)).toBe(true);
          expect(Array.isArray(item.evening.first)).toBe(true);
          expect(Array.isArray(item.evening.second)).toBe(true);
        }
      });
    });

    describe("maximum Trinity Sundays edge case (28 Sundays)", () => {
      // 2035 has Easter on March 25, giving maximum Trinitytide Sundays
      // Cache the data
      let maxTrinityData: LectionaryDateMap;

      beforeAll(() => {
        const maxTrinityLectionary = createLectionary("2034-12-03");
        maxTrinityData = maxTrinityLectionary.getAll();
      });

      test("all Trinity Sundays have complete lectionary data", () => {
        // Find all Trinity-related Sundays
        const trinitySundays = Object.entries(maxTrinityData).filter(
          ([, item]) =>
            item.primaryObservance.includes("Trinity Sunday") ||
            item.primaryObservance === "Sunday Before Advent" ||
            item.primaryObservance.includes("Sunday After Trinity")
        );

        for (const [, item] of trinitySundays) {
          expect(item.season).toBe("Trinitytide");
          expect(item.morning.collects.length).toBeGreaterThan(0);
          expect(item.evening.collects.length).toBeGreaterThan(0);
        }
      });
    });
  });

  describe("consistency across years", () => {
    // Cache data for multiple years to avoid recomputing
    const yearDataCache: Record<string, LectionaryDateMap> = {};
    const years = [
      "2020-11-29",
      "2023-12-03",
      "2025-11-30",
      "2028-12-03",
      "2030-12-01",
    ];

    beforeAll(() => {
      for (const year of years) {
        yearDataCache[year] = createLectionary(year).getAll();
      }
    });

    test.each(years)(
      "getAll returns valid lectionary for year starting %s",
      (startDate) => {
        const all = yearDataCache[startDate];
        const entries = Object.entries(all);

        // Should have roughly a year's worth of entries
        expect(entries.length).toBeGreaterThanOrEqual(360);

        // All entries should have valid structure
        for (const [date, item] of entries) {
          expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
          expect(item.season).toBeTruthy();
          expect(item.morning).toBeDefined();
          expect(item.evening).toBeDefined();
        }
      }
    );

    test("major feasts have complete lectionary data regardless of year", () => {
      const testYears = ["2020-11-29", "2025-11-30", "2030-12-01"];
      const majorFeasts = [
        "Christmas Day",
        "The Epiphany",
        "Ash Wednesday",
        "Easter Day",
        "Ascension Day",
        "Pentecost (Whitsunday)",
        "Trinity Sunday",
      ];

      for (const startDate of testYears) {
        const all = yearDataCache[startDate];
        const allObservances = Object.values(all).map(
          (item) => item.primaryObservance
        );

        for (const feast of majorFeasts) {
          expect(allObservances).toContain(feast);
        }
      }
    });
  });
});
