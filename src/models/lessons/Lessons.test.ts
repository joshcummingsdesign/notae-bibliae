import dayjs from "dayjs";
import { describe, test, expect, beforeEach } from "vitest";
import { Lessons } from "./Lessons";
import { Calendar } from "../calendar";

// Helper to create Lessons instances
const createLessons = (date: string) => new Lessons(new Calendar(dayjs(date)));

describe("Lessons", () => {
  // Reference lessons for the 2025-2026 liturgical year
  let lessons: Lessons;

  beforeEach(() => {
    lessons = createLessons("2025-11-30");
  });

  describe("constructor", () => {
    test("creates instance with Calendar dependency", () => {
      expect(lessons).toBeInstanceOf(Lessons);
    });
  });

  describe("getAll", () => {
    describe("basic functionality", () => {
      test("returns lessons for entire liturgical year", () => {
        const all = lessons.getAll();
        const entries = Object.entries(all);

        // Should cover roughly 364-365 days
        expect(entries.length).toBeGreaterThanOrEqual(360);
        expect(entries.length).toBeLessThanOrEqual(366);
      });

      test("first entry is First Sunday of Advent", () => {
        const all = lessons.getAll();
        const entries = Object.entries(all);
        const [date, lesson] = entries[0];

        expect(date).toBe("2025-11-30");
        expect(lesson.title).toBe("First Sunday of Advent");
      });

      test("last entry is day before next Advent", () => {
        const all = lessons.getAll();
        const entries = Object.entries(all);
        const [date, lesson] = entries[entries.length - 1];

        expect(date).toBe("2026-11-28");
        expect(lesson.title).toContain("Sunday Before Advent");
      });

      test("entries are sorted chronologically", () => {
        const all = lessons.getAll();
        const dates = Object.keys(all);

        for (let i = 1; i < dates.length; i++) {
          expect(dates[i] > dates[i - 1]).toBe(true);
        }
      });
    });

    describe("lesson structure", () => {
      test("each lesson has required properties", () => {
        const all = lessons.getAll();

        for (const [date, lesson] of Object.entries(all)) {
          expect(lesson).toHaveProperty("title");
          expect(lesson).toHaveProperty("morning");
          expect(lesson).toHaveProperty("evening");
          expect(lesson.morning).toHaveProperty("first");
          expect(lesson.morning).toHaveProperty("second");
          expect(lesson.evening).toHaveProperty("first");
          expect(lesson.evening).toHaveProperty("second");
        }
      });

      test("lesson readings are arrays of strings", () => {
        const all = lessons.getAll();
        const firstLesson = Object.values(all)[0];

        expect(Array.isArray(firstLesson.morning.first)).toBe(true);
        expect(Array.isArray(firstLesson.morning.second)).toBe(true);
        expect(Array.isArray(firstLesson.evening.first)).toBe(true);
        expect(Array.isArray(firstLesson.evening.second)).toBe(true);

        // Check that readings are strings (Bible references)
        expect(typeof firstLesson.morning.first[0]).toBe("string");
      });

      test("Sunday lessons have proper title format", () => {
        const all = lessons.getAll();
        const adventSunday = all["2025-11-30"];

        expect(adventSunday.title).toBe("First Sunday of Advent");
        expect(adventSunday.morning.first).toEqual([
          "Mal. 3:1-6",
          "Mal. 4:4-6",
        ]);
        expect(adventSunday.morning.second).toContain("Luke 1:5-25");
        expect(adventSunday.evening.first).toContain("Isa. 62:1-12");
        expect(adventSunday.evening.second).toContain("Matt. 25:1-13");
      });

      test("weekday lessons include Sunday name and day", () => {
        const all = lessons.getAll();
        // Tuesday after First Sunday of Advent (Monday Dec 1 is St. Andrew feast)
        const tuesday = all["2025-12-02"];

        expect(tuesday.title).toMatch(/\w+day After the First Sunday of Advent/);
      });
    });

    describe("feast day handling", () => {
      test("feast days use feast title instead of weekday", () => {
        const all = lessons.getAll();

        // Christmas Day (Dec 25)
        expect(all["2025-12-25"]?.title).toBe("Christmas Day");

        // Epiphany (Jan 6)
        expect(all["2026-01-06"]?.title).toBe("The Epiphany");
      });

      test("Circumcision has proper lessons", () => {
        const all = lessons.getAll();
        const circumcision = all["2026-01-01"];

        expect(circumcision.title).toBe("Circumcision and Holy Name of Jesus");
        expect(circumcision).toHaveProperty("morning");
        expect(circumcision).toHaveProperty("evening");
      });

      test("vigils have proper lessons", () => {
        const all = lessons.getAll();
        const vigilOfEpiphany = all["2026-01-05"];

        expect(vigilOfEpiphany.title).toBe("Vigil of the Epiphany");
      });
    });

    describe("Advent season", () => {
      test("all four Advent Sundays have lessons", () => {
        const all = lessons.getAll();

        expect(all["2025-11-30"]?.title).toBe("First Sunday of Advent");
        expect(all["2025-12-07"]?.title).toBe("Second Sunday of Advent");
        expect(all["2025-12-14"]?.title).toBe(
          "Third Sunday of Advent: Gaudete Sunday",
        );
        expect(all["2025-12-21"]?.title).toBe("Fourth Sunday of Advent");
      });

      test("Advent weekdays follow Sunday cycle", () => {
        const all = lessons.getAll();

        // Week after First Sunday of Advent
        // Dec 1 is St. Andrew feast, so it doesn't follow the Sunday cycle
        expect(all["2025-12-01"]?.title).toBe("Saint Andrew, Apostle");
        expect(all["2025-12-02"]?.title).toContain("First Sunday of Advent");
        expect(all["2025-12-03"]?.title).toContain("First Sunday of Advent");
      });
    });

    describe("Christmastide", () => {
      test("Christmas octave days have lessons", () => {
        const all = lessons.getAll();

        expect(all["2025-12-25"]?.title).toBe("Christmas Day");
        expect(all["2025-12-26"]?.title).toBe(
          "Saint Stephen, Deacon and Martyr",
        );
        expect(all["2025-12-27"]?.title).toBe(
          "Saint John, Apostle and Evangelist",
        );
        expect(all["2025-12-28"]?.title).toBe("The Holy Innocents");
      });

      test("Sundays after Christmas have lessons", () => {
        const all = lessons.getAll();
        const firstSunday = all["2025-12-28"];
        const secondSunday = all["2026-01-04"];

        // Dec 28, 2025 is Sunday (also Holy Innocents - feast takes precedence)
        expect(firstSunday).toBeDefined();
        expect(secondSunday?.title).toBe("Second Sunday After Christmas");
      });
    });

    describe("Lent and Holy Week", () => {
      test("Ash Wednesday has lessons", () => {
        const all = lessons.getAll();
        const ashWednesday = all["2026-02-18"];

        expect(ashWednesday.title).toBe("Ash Wednesday");
      });

      test("Lenten Sundays have lessons", () => {
        const all = lessons.getAll();

        expect(all["2026-02-22"]?.title).toBe("First Sunday of Lent");
        expect(all["2026-03-01"]?.title).toBe("Second Sunday of Lent");
        expect(all["2026-03-08"]?.title).toBe("Third Sunday of Lent");
        expect(all["2026-03-15"]?.title).toBe(
          "Fourth Sunday of Lent: Laetare Sunday",
        );
        expect(all["2026-03-22"]?.title).toBe(
          "Fifth Sunday of Lent: Passion Sunday",
        );
      });

      test("Holy Week has lessons", () => {
        const all = lessons.getAll();

        expect(all["2026-03-29"]?.title).toBe("Palm Sunday");
        expect(all["2026-04-02"]?.title).toBe("Maundy Thursday");
        expect(all["2026-04-03"]?.title).toBe("Good Friday");
        expect(all["2026-04-04"]?.title).toBe("Holy Saturday");
      });
    });

    describe("Eastertide", () => {
      test("Easter Day has lessons", () => {
        const all = lessons.getAll();
        const easter = all["2026-04-05"];

        expect(easter.title).toBe("Easter Day");
      });

      test("Easter Week has lessons", () => {
        const all = lessons.getAll();

        expect(all["2026-04-06"]?.title).toContain("Easter");
        expect(all["2026-04-07"]?.title).toContain("Easter");
      });

      test("Ascension Day has lessons", () => {
        const all = lessons.getAll();
        const ascension = all["2026-05-14"];

        expect(ascension.title).toBe("Ascension Day");
      });

      test("Pentecost has lessons", () => {
        const all = lessons.getAll();
        const pentecost = all["2026-05-24"];

        expect(pentecost.title).toBe("Pentecost (Whitsunday)");
      });
    });

    describe("Trinitytide", () => {
      test("Trinity Sunday has lessons", () => {
        const all = lessons.getAll();
        const trinity = all["2026-05-31"];

        expect(trinity.title).toBe("Trinity Sunday");
      });

      test("Sundays after Trinity have lessons", () => {
        const all = lessons.getAll();

        expect(all["2026-06-07"]?.title).toBe("First Sunday After Trinity");
        expect(all["2026-06-14"]?.title).toBe("Second Sunday After Trinity");
      });
    });
  });

  describe("getToday", () => {
    test("returns lessons for the calendar date", () => {
      const today = lessons.getToday();

      expect(today).toBeDefined();
      expect(today.title).toBe("First Sunday of Advent");
    });

    test("returns correct lessons for weekdays", () => {
      const saturdayLessons = createLessons("2026-01-24");
      const today = saturdayLessons.getToday();

      expect(today.title).toBe("Saturday After the Second Sunday of Epiphany");
      expect(today.morning).toHaveProperty("first");
      expect(today.morning).toHaveProperty("second");
      expect(today.evening).toHaveProperty("first");
      expect(today.evening).toHaveProperty("second");
    });

    test("returns feast day lessons when applicable", () => {
      const christmasLessons = createLessons("2025-12-25");
      const today = christmasLessons.getToday();

      expect(today.title).toBe("Christmas Day");
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
    ])("getToday() for %s returns title '%s'", (date, expectedTitle) => {
      const dayLessons = createLessons(date);
      expect(dayLessons.getToday().title).toBe(expectedTitle);
    });
  });

  describe("edge cases", () => {
    describe("year without Second Sunday After Christmas", () => {
      // In 2028-2029: Dec 31 is First Sunday After Christmas, Jan 6 is Epiphany (Sat)
      let lessons2028: Lessons;

      beforeEach(() => {
        lessons2028 = createLessons("2028-12-03");
      });

      test("First Sunday After Christmas on Dec 31", () => {
        const all = lessons2028.getAll();
        expect(all["2028-12-31"]?.title).toBe("First Sunday After Christmas");
      });

      test("Circumcision on Jan 1", () => {
        const all = lessons2028.getAll();
        expect(all["2029-01-01"]?.title).toBe(
          "Circumcision and Holy Name of Jesus",
        );
      });

      test("uses explicit date lessons for Jan 2-4", () => {
        const all = lessons2028.getAll();

        // These days fall back to date-based lessons since First Sunday After Christmas
        // has no weekday lessons defined - they now use "Weekday in Season" format
        expect(all["2029-01-02"]?.title).toBe("Tuesday in Christmastide");
        expect(all["2029-01-03"]?.title).toBe("Wednesday in Christmastide");
        expect(all["2029-01-04"]?.title).toBe("Thursday in Christmastide");
      });

      test("Vigil of Epiphany on Jan 5", () => {
        const all = lessons2028.getAll();
        expect(all["2029-01-05"]?.title).toBe("Vigil of the Epiphany");
      });

      test("Epiphany on Jan 6", () => {
        const all = lessons2028.getAll();
        expect(all["2029-01-06"]?.title).toBe("The Epiphany");
      });

      test("First Sunday of Epiphany on Jan 7", () => {
        const all = lessons2028.getAll();
        expect(all["2029-01-07"]?.title).toBe("First Sunday of Epiphany");
      });
    });

    describe("year boundary handling", () => {
      test("lessons span December to January correctly", () => {
        const all = lessons.getAll();

        // Both December and January dates should be present
        const dec25 = all["2025-12-25"];
        const jan1 = all["2026-01-01"];
        const jan6 = all["2026-01-06"];

        expect(dec25).toBeDefined();
        expect(jan1).toBeDefined();
        expect(jan6).toBeDefined();
      });

      test("handles liturgical year crossing calendar year", () => {
        const all = lessons.getAll();
        const dates = Object.keys(all);

        // First date should be in 2025 (Advent)
        expect(dates[0].startsWith("2025")).toBe(true);

        // Last date should be in 2026
        expect(dates[dates.length - 1].startsWith("2026")).toBe(true);
      });
    });

    describe("leap year handling", () => {
      test("handles Feb 29 in leap years", () => {
        // 2024 is a leap year
        const leapYearLessons = createLessons("2024-01-01");
        const all = leapYearLessons.getAll();

        // Feb 29, 2024 should have lessons
        expect(all["2024-02-29"]).toBeDefined();
      });
    });

    describe("variable Epiphany Sundays", () => {
      test("handles early Easter with fewer Epiphany Sundays", () => {
        // 2008: Easter March 23 (early)
        const earlyEaster = createLessons("2007-12-02");
        const all = earlyEaster.getAll();

        // Should still have First Sunday of Epiphany
        const firstSunday = Object.entries(all).find(
          ([_, lesson]) => lesson.title === "First Sunday of Epiphany",
        );
        expect(firstSunday).toBeDefined();
      });

      test("handles late Easter with more Epiphany Sundays", () => {
        // 2038: Easter April 25 (late)
        const lateEaster = createLessons("2037-11-29");
        const all = lateEaster.getAll();

        // Should have several Sundays of Epiphany
        const epiphanySundays = Object.entries(all).filter(([_, lesson]) =>
          lesson.title.includes("Sunday of Epiphany"),
        );
        expect(epiphanySundays.length).toBeGreaterThanOrEqual(4);
      });
    });

    describe("variable Trinity Sundays", () => {
      // Matches actual Sunday titles (e.g., "First Sunday After Trinity")
      // but not weekday titles (e.g., "Monday After the First Sunday After Trinity")
      const isSundayTitle = (title: string) =>
        /^(First|Second|Third|Fourth|Fifth|Sixth|Seventh|Eighth|Ninth|Tenth|Eleventh|Twelfth|Thirteenth|Fourteenth|Fifteenth|Sixteenth|Seventeenth|Eighteenth|Nineteenth|Twentieth|Twenty-\w+) Sunday After Trinity$/.test(
          title,
        );

      test("early Easter has more potential Trinity Sundays", () => {
        // Early Easter = more time between Pentecost and Advent
        const earlyEaster = createLessons("2008-01-01");
        const all = earlyEaster.getAll();

        // Filter only the actual Sunday entries (titles like "First Sunday After Trinity")
        // Note: Some Sundays may be displaced by feast days
        const trinitySundays = Object.entries(all).filter(([_, lesson]) =>
          isSundayTitle(lesson.title),
        );
        // Should have at least 18 Trinity Sundays (some displaced by feasts)
        expect(trinitySundays.length).toBeGreaterThanOrEqual(18);
      });

      test("late Easter has fewer potential Trinity Sundays", () => {
        // Late Easter = less time between Pentecost and Advent
        const lateEaster = createLessons("2038-01-01");
        const all = lateEaster.getAll();

        // Filter only the actual Sunday entries
        const trinitySundays = Object.entries(all).filter(([_, lesson]) =>
          isSundayTitle(lesson.title),
        );
        expect(trinitySundays.length).toBeLessThanOrEqual(25);
      });

      test("early Easter year has more Trinity Sundays than late Easter year", () => {
        // Compare early vs late Easter
        const earlyEaster = createLessons("2008-01-01");
        const lateEaster = createLessons("2038-01-01");

        const earlyAll = earlyEaster.getAll();
        const lateAll = lateEaster.getAll();

        const countTrinitySundays = (all: Record<string, { title: string }>) =>
          Object.entries(all).filter(([_, lesson]) =>
            isSundayTitle(lesson.title),
          ).length;

        expect(countTrinitySundays(earlyAll)).toBeGreaterThan(
          countTrinitySundays(lateAll),
        );
      });

      describe("maximum Trinity Sundays edge case (28 Sundays)", () => {
        // 2035 has Easter on March 25, giving maximum Trinitytide Sundays
        const maxTrinityLessons = createLessons("2034-12-03");

        test("most Sundays in Trinitytide have Trinity-themed lessons", () => {
          const all = maxTrinityLessons.getAll();

          // Count unique Sundays with Trinity-related lessons (not weekday entries)
          // Some Sundays may be displaced by feast days (e.g., Nativity of St. John, Saints Simon and Jude)
          const trinitySundays = Object.entries(all).filter(
            ([_, lesson]) =>
              isSundayTitle(lesson.title) ||
              lesson.title === "Trinity Sunday" ||
              lesson.title === "Sunday Before Advent",
          );

          // At least 26 (allowing for 2 feast day displacements)
          expect(trinitySundays.length).toBeGreaterThanOrEqual(26);
        });

        test("Sunday Before Advent has its own lessons", () => {
          const all = maxTrinityLessons.getAll();

          const sundayBeforeAdvent = Object.entries(all).find(
            ([_, lesson]) => lesson.title === "Sunday Before Advent",
          );

          expect(sundayBeforeAdvent).toBeDefined();
          const [_, lesson] = sundayBeforeAdvent!;
          expect(lesson.morning.first.length).toBeGreaterThan(0);
          expect(lesson.morning.second.length).toBeGreaterThan(0);
          expect(lesson.evening.first.length).toBeGreaterThan(0);
          expect(lesson.evening.second.length).toBeGreaterThan(0);
        });

        test("Twenty-Fifth Sunday After Trinity has lessons", () => {
          const all = maxTrinityLessons.getAll();

          const twentyFifth = Object.entries(all).find(
            ([_, lesson]) =>
              lesson.title === "Twenty-Fifth Sunday After Trinity",
          );

          expect(twentyFifth).toBeDefined();
          const [_, lesson] = twentyFifth!;
          expect(lesson.morning.first.length).toBeGreaterThan(0);
          expect(lesson.morning.second.length).toBeGreaterThan(0);
        });

        test("Twenty-Sixth Sunday After Trinity has lessons", () => {
          const all = maxTrinityLessons.getAll();

          const twentySixth = Object.entries(all).find(
            ([_, lesson]) =>
              lesson.title === "Twenty-Sixth Sunday After Trinity",
          );

          expect(twentySixth).toBeDefined();
          const [_, lesson] = twentySixth!;
          expect(lesson.morning.first.length).toBeGreaterThan(0);
          expect(lesson.morning.second.length).toBeGreaterThan(0);
        });

        test("weekdays following Sunday Before Advent inherit its cycle", () => {
          const all = maxTrinityLessons.getAll();

          // Find Sunday Before Advent date
          const [sundayDate] = Object.entries(all).find(
            ([_, lesson]) => lesson.title === "Sunday Before Advent",
          )!;

          // Monday after should reference Sunday Before Advent cycle
          const mondayDate = dayjs(sundayDate)
            .add(1, "day")
            .format("YYYY-MM-DD");
          const monday = all[mondayDate];

          expect(monday).toBeDefined();
          expect(monday.title).toContain("Sunday Before Advent");
        });
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
    ])("getAll returns valid lessons for year starting %s", (startDate) => {
      const yearLessons = createLessons(startDate);
      const all = yearLessons.getAll();
      const entries = Object.entries(all);

      // Should have roughly a year's worth of entries
      expect(entries.length).toBeGreaterThanOrEqual(360);

      // All entries should have valid structure
      for (const [date, lesson] of entries) {
        expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
        expect(lesson.title).toBeTruthy();
        expect(lesson.morning).toBeDefined();
        expect(lesson.evening).toBeDefined();
      }
    });

    test("major feasts always have lessons regardless of year", () => {
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
        const yearLessons = createLessons(startDate);
        const all = yearLessons.getAll();
        const titles = Object.values(all).map((l) => l.title);

        for (const feast of majorFeasts) {
          expect(titles).toContain(feast);
        }
      }
    });
  });
});
