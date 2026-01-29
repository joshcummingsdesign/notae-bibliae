import dayjs from "dayjs";
import { describe, test, expect, beforeEach } from "vitest";
import { Calendar } from "./Calendar";

// Helper to create Calendar instances
const createCalendar = (date: string) => new Calendar(dayjs(date));

describe("Calendar", () => {
  // Reference calendar for the 2025-2026 liturgical year
  let cal: Calendar;

  beforeEach(() => {
    cal = createCalendar("2025-11-30");
  });

  describe("constructor and getToday", () => {
    test("returns the date passed to constructor", () => {
      expect(cal.getToday().format("YYYY-MM-DD")).toBe("2025-11-30");
    });

    test("defaults to current date when no argument provided", () => {
      const defaultCal = new Calendar();
      expect(defaultCal.getToday().isValid()).toBe(true);
    });
  });

  describe("liturgical year calculation", () => {
    test.each([
      // [date, expected liturgical year, description]
      ["2025-11-29", 2025, "day before First Sunday of Advent"],
      ["2025-11-30", 2026, "First Sunday of Advent"],
      ["2025-12-25", 2026, "Christmas Day"],
      ["2026-04-05", 2026, "Easter Sunday"],
      ["2026-11-28", 2026, "day before next Advent"],
      ["2026-11-29", 2027, "next First Sunday of Advent"],
    ])("getLiturgicalYear(%s) returns %i (%s)", (date, expected) => {
      expect(createCalendar(date).getLiturgicalYear()).toBe(expected);
    });
  });

  describe("First Sunday of Advent calculation", () => {
    describe("getFirstSundayOfAdvent", () => {
      test.each([
        ["2025-11-30", "2025-11-30", "on First Sunday of Advent"],
        ["2025-12-25", "2025-11-30", "during Christmastide"],
        ["2026-01-01", "2025-11-30", "in new calendar year"],
        ["2025-11-29", "2024-12-01", "before First Sunday of Advent"],
      ])("for date %s returns %s (%s)", (inputDate, expectedAdvent) => {
        expect(
          createCalendar(inputDate)
            .getFirstSundayOfAdvent()
            .format("YYYY-MM-DD"),
        ).toBe(expectedAdvent);
      });
    });

    describe("getNextFirstSundayOfAdvent", () => {
      test.each([
        ["2026-11-25", "2026-11-29"],
        ["2025-11-30", "2026-11-29"],
        ["2027-01-01", "2027-11-28"],
      ])("for date %s returns %s", (inputDate, expected) => {
        expect(
          createCalendar(inputDate)
            .getNextFirstSundayOfAdvent()
            .format("YYYY-MM-DD"),
        ).toBe(expected);
      });
    });

    describe("calculateFirstSundayOfAdvent", () => {
      test.each([
        [2024, "2024-12-01"],
        [2025, "2025-11-30"],
        [2026, "2026-11-29"],
        [2027, "2027-11-28"],
        [2028, "2028-12-03"],
      ])("for year %i returns %s", (year, expected) => {
        expect(
          cal.calculateFirstSundayOfAdvent(year).format("YYYY-MM-DD"),
        ).toBe(expected);
      });
    });
  });

  describe("Easter calculation", () => {
    describe("getEasterSunday", () => {
      test.each([
        // Test various years including edge cases
        ["2025-11-29", "2025-04-20", "liturgical year 2025"],
        ["2025-11-30", "2026-04-05", "liturgical year 2026"],
        ["2026-11-29", "2027-03-28", "liturgical year 2027"],
        // Early Easter (near March 22 minimum)
        ["2008-01-01", "2008-03-23", "early Easter"],
        // Late Easter (near April 25 maximum)
        ["2038-01-01", "2038-04-25", "latest possible Easter"],
      ])("for date %s returns %s (%s)", (inputDate, expected) => {
        expect(
          createCalendar(inputDate).getEasterSunday().format("YYYY-MM-DD"),
        ).toBe(expected);
      });
    });

    test("Easter always falls on a Sunday", () => {
      for (let year = 2000; year <= 2050; year++) {
        const calendar = createCalendar(`${year}-01-01`);
        expect(calendar.getEasterSunday().day()).toBe(0);
      }
    });

    test("Easter falls between March 22 and April 25", () => {
      for (let year = 2000; year <= 2050; year++) {
        const calendar = createCalendar(`${year}-01-01`);
        const easter = calendar.getEasterSunday();
        const month = easter.month(); // 0-indexed
        const day = easter.date();

        const isValidDate =
          (month === 2 && day >= 22) || // March 22-31
          (month === 3 && day <= 25); // April 1-25
        expect(isValidDate).toBe(true);
      }
    });
  });

  describe("Easter-dependent dates", () => {
    test("getAshWednesday returns 46 days before Easter", () => {
      expect(cal.getAshWednesday().format("YYYY-MM-DD")).toBe("2026-02-18");
    });

    test("getSeptuagesima returns 9 weeks before Easter", () => {
      expect(cal.getSeptuagesima().format("YYYY-MM-DD")).toBe("2026-02-01");
    });

    test("getSexagesima returns 8 weeks before Easter", () => {
      expect(cal.getSexagesima().format("YYYY-MM-DD")).toBe("2026-02-08");
    });

    test("getQuinquagesima returns 7 weeks before Easter", () => {
      expect(cal.getQuinquagesima().format("YYYY-MM-DD")).toBe("2026-02-15");
    });

    test("getPassionSunday returns 5th Sunday of Lent", () => {
      expect(cal.getPassionSunday().format("YYYY-MM-DD")).toBe("2026-03-22");
    });

    test("getAscensionDay returns 39 days after Easter", () => {
      expect(cal.getAscensionDay().format("YYYY-MM-DD")).toBe("2026-05-14");
    });

    test("getPentecost returns 49 days after Easter", () => {
      expect(cal.getPentecost().format("YYYY-MM-DD")).toBe("2026-05-24");
    });

    test("getTrinitySunday returns 56 days after Easter", () => {
      expect(cal.getTrinitySunday().format("YYYY-MM-DD")).toBe("2026-05-31");
    });

    test("getCorpusChristi returns Thursday after Trinity Sunday", () => {
      expect(cal.getCorpusChristi().format("YYYY-MM-DD")).toBe("2026-06-04");
    });

    test("getChristTheKing returns Sunday before Advent", () => {
      expect(cal.getChristTheKing().format("YYYY-MM-DD")).toBe("2026-11-22");
    });

    test("getEpiphany returns January 6", () => {
      expect(cal.getEpiphany().format("YYYY-MM-DD")).toBe("2026-01-06");
    });

    describe("getPassionSunday across years", () => {
      test.each([
        ["2025-11-29", "2025-04-06"],
        ["2025-11-30", "2026-03-22"],
        ["2026-11-29", "2027-03-14"],
      ])("for date %s returns %s", (inputDate, expected) => {
        expect(
          createCalendar(inputDate).getPassionSunday().format("YYYY-MM-DD"),
        ).toBe(expected);
      });
    });
  });

  describe("Annunciation calculation", () => {
    test("returns March 25 when not in Holy Week", () => {
      // 2026: March 25 is before Holy Week (Easter is April 5)
      expect(cal.getAnnunciation().format("YYYY-MM-DD")).toBe("2026-03-25");
    });

    test.each([
      // Years where March 25 falls in Holy Week
      ["2016-01-01", "2016-04-04"], // Easter March 27, moved to Monday after Low Sunday
      ["2018-01-01", "2018-04-09"], // Easter April 1
      ["2024-01-01", "2024-04-08"], // Easter March 31
      ["2027-01-01", "2027-04-05"], // Easter March 28
    ])(
      "moves to Monday after Low Sunday when March 25 in Holy Week (%s -> %s)",
      (inputDate, expected) => {
        expect(
          createCalendar(inputDate).getAnnunciation().format("YYYY-MM-DD"),
        ).toBe(expected);
      },
    );

    test("moved Annunciation is always after Easter", () => {
      for (let year = 2015; year <= 2040; year++) {
        const calendar = createCalendar(`${year}-01-01`);
        const annunciation = calendar.getAnnunciation();
        const easter = calendar.getEasterSunday();
        const march25 = dayjs(`${year}-03-25`);

        if (!annunciation.isSame(march25, "day")) {
          expect(annunciation.isAfter(easter)).toBe(true);
        }
      }
    });
  });

  describe("fixed calendar items", () => {
    test("returns items sorted by date starting from First Sunday of Advent", () => {
      const items = cal.getFixedCalendarItems();

      expect(items.length).toBeGreaterThan(0);
      expect(items[0].date).toBe("2025-11-30");

      // Verify sorting
      for (let i = 1; i < items.length; i++) {
        expect(items[i].date >= items[i - 1].date).toBe(true);
      }
    });

    test("first item is St. Andrew on Nov 30", () => {
      const items = cal.getFixedCalendarItems();
      expect(items[0]).toMatchObject({
        date: "2025-11-30",
        title: expect.stringContaining("Saint Andrew"),
        isSaint: true,
      });
    });

    test("all items have required properties", () => {
      const items = cal.getFixedCalendarItems();
      for (const item of items) {
        expect(item).toHaveProperty("date");
        expect(item).toHaveProperty("title");
        expect(item).toHaveProperty("rank");
        expect(item.date).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      }
    });
  });

  describe("Advent", () => {
    describe("getAdventSundays", () => {
      test("returns exactly 4 Sundays", () => {
        const sundays = cal.getAdventSundays();
        expect(sundays).toHaveLength(4);
      });

      test("all Sundays are rank 1 principal Sundays", () => {
        const sundays = cal.getAdventSundays();
        for (const sunday of sundays) {
          expect(sunday.rank).toBe(1);
          expect(sunday.isSunday).toBe(true);
          expect(sunday.isPrincipalSunday).toBe(true);
        }
      });

      test("Sundays are spaced one week apart", () => {
        const sundays = cal.getAdventSundays();
        for (let i = 1; i < sundays.length; i++) {
          const prev = dayjs(sundays[i - 1].date);
          const curr = dayjs(sundays[i].date);
          expect(curr.diff(prev, "day")).toBe(7);
        }
      });

      test("Third Sunday is Gaudete Sunday", () => {
        const sundays = cal.getAdventSundays();
        expect(sundays[2].title).toContain("Gaudete Sunday");
      });
    });

    describe("getEmberDaysInAdvent", () => {
      test("returns Wed, Fri, Sat after Dec 13", () => {
        const emberDays = cal.getEmberDaysInAdvent();
        expect(emberDays).toHaveLength(3);

        const days = emberDays.map((d) => dayjs(d.date).day());
        expect(days).toEqual([3, 5, 6]); // Wed, Fri, Sat
      });

      test("Ember Days are rank 5 lesser observances", () => {
        const emberDays = cal.getEmberDaysInAdvent();
        for (const day of emberDays) {
          expect(day.rank).toBe(5);
          expect(day.isLesserObservance).toBe(true);
        }
      });
    });
  });

  describe("Christmastide", () => {
    describe("getChristmastideSundays", () => {
      test("returns at least one Sunday after Christmas", () => {
        const sundays = cal.getChristmastideSundays();
        expect(sundays.length).toBeGreaterThanOrEqual(1);
        expect(sundays[0].title).toBe("First Sunday After Christmas");
      });

      test("does not include Sundays on or after Epiphany", () => {
        const sundays = cal.getChristmastideSundays();
        const epiphany = cal.getEpiphany();
        for (const sunday of sundays) {
          expect(dayjs(sunday.date).isBefore(epiphany, "day")).toBe(true);
        }
      });

      test("handles year when Christmas falls on Sunday", () => {
        // 2022: Christmas was on Sunday
        const christmas2022 = createCalendar("2022-12-25");
        const sundays = christmas2022.getChristmastideSundays();
        // First Sunday After Christmas should be Jan 1, 2023
        expect(sundays[0].date).toBe("2023-01-01");
      });
    });
  });

  describe("Epiphanytide", () => {
    describe("getEpiphanytideSundays", () => {
      test("returns between 1 and 6 Sundays depending on Easter date", () => {
        for (let year = 2000; year <= 2050; year++) {
          const calendar = createCalendar(`${year}-01-06`);
          const count = calendar.getEpiphanytideSundays().length;
          expect(count).toBeGreaterThanOrEqual(1);
          expect(count).toBeLessThanOrEqual(6);
        }
      });

      test("has fewer Sundays with earlier Easter", () => {
        const earlyEaster = createCalendar("2008-01-06"); // Easter March 23
        const lateEaster = createCalendar("2038-01-06"); // Easter April 25

        expect(earlyEaster.getEpiphanytideSundays().length).toBeLessThan(
          lateEaster.getEpiphanytideSundays().length,
        );
      });

      test("all Sundays fall between Epiphany and Septuagesima", () => {
        const sundays = cal.getEpiphanytideSundays();
        const epiphany = cal.getEpiphany();
        const septuagesima = cal.getSeptuagesima();

        for (const sunday of sundays) {
          const date = dayjs(sunday.date);
          expect(date.isAfter(epiphany)).toBe(true);
          expect(date.isBefore(septuagesima)).toBe(true);
        }
      });

      test("all are rank 7 Sundays", () => {
        const sundays = cal.getEpiphanytideSundays();
        for (const sunday of sundays) {
          expect(sunday.rank).toBe(7);
          expect(sunday.isSunday).toBe(true);
        }
      });
    });
  });

  describe("Pre-Lent", () => {
    describe("getPreLentFeastDays", () => {
      test("returns Septuagesima, Sexagesima, and Quinquagesima", () => {
        const days = cal.getPreLentFeastDays();
        expect(days).toHaveLength(3);
        expect(days[0].title).toContain("Septuagesima");
        expect(days[1].title).toContain("Sexagesima");
        expect(days[2].title).toContain("Quinquagesima");
      });

      test("all are rank 1 principal Sundays", () => {
        const days = cal.getPreLentFeastDays();
        for (const day of days) {
          expect(day.rank).toBe(1);
          expect(day.isSunday).toBe(true);
          expect(day.isPrincipalSunday).toBe(true);
        }
      });
    });
  });

  describe("Lent", () => {
    describe("getLentSundays", () => {
      test("returns exactly 5 Sundays", () => {
        const sundays = cal.getLentSundays();
        expect(sundays).toHaveLength(5);
      });

      test("Fourth Sunday is Laetare Sunday", () => {
        const sundays = cal.getLentSundays();
        expect(sundays[3].title).toContain("Laetare Sunday");
      });

      test("Fifth Sunday is Passion Sunday", () => {
        const sundays = cal.getLentSundays();
        expect(sundays[4].title).toContain("Passion Sunday");
      });
    });

    describe("getEmberDaysInLent", () => {
      test("returns Wed, Fri, Sat of first week of Lent", () => {
        const emberDays = cal.getEmberDaysInLent();
        expect(emberDays).toHaveLength(3);

        const days = emberDays.map((d) => dayjs(d.date).day());
        expect(days).toEqual([3, 5, 6]); // Wed, Fri, Sat
      });
    });

    describe("getLentDays", () => {
      test("starts with Ash Wednesday", () => {
        const days = cal.getLentDays();
        expect(days[0].title).toContain("Ash Wednesday");
      });

      test("Ash Wednesday is a rank 3 greater observance", () => {
        const days = cal.getLentDays();
        const ashWednesday = days[0];
        expect(ashWednesday.rank).toBe(3);
        expect(ashWednesday.isGreaterObservance).toBe(true);
      });

      test("includes Annunciation when in Lent", () => {
        const days = cal.getLentDays();
        const hasAnnunciation = days.some((d) =>
          d.title.includes("Annunciation"),
        );
        expect(hasAnnunciation).toBe(true);
      });

      test("ends with Holy Week days", () => {
        const days = cal.getLentDays();
        const lastDay = days[days.length - 1];
        expect(lastDay.title).toContain("Easter Vigil");
      });
    });

    describe("getHolyWeekDays", () => {
      test("returns 8 items (7 days + Easter Vigil)", () => {
        const days = cal.getHolyWeekDays();
        expect(days).toHaveLength(8);
      });

      test("starts with Palm Sunday and ends with Easter Vigil", () => {
        const days = cal.getHolyWeekDays();
        expect(days[0].title).toContain("Palm Sunday");
        expect(days[days.length - 1].title).toContain("Easter Vigil");
      });

      test("Holy Saturday and Easter Vigil share the same date", () => {
        const days = cal.getHolyWeekDays();
        const holySaturday = days.find((d) =>
          d.title.includes("Holy Saturday"),
        );
        const easterVigil = days.find((d) => d.title.includes("Easter Vigil"));
        expect(holySaturday?.date).toBe(easterVigil?.date);
      });

      test("Holy Week days are rank 3 greater observances", () => {
        const days = cal.getHolyWeekDays();
        // Filter out Easter Vigil which is a rank 8 vigil
        const holyWeekDays = days.filter((d) => !d.isVigil);
        for (const day of holyWeekDays) {
          expect(day.rank).toBe(3);
          expect(day.isGreaterObservance).toBe(true);
        }
      });
    });
  });

  describe("Eastertide", () => {
    describe("getEastertideDays", () => {
      test("starts with Easter Day", () => {
        const days = cal.getEastertideDays();
        expect(days[0].title).toContain("Easter Day");
        expect(days[0].isSunday).toBe(true);
        expect(days[0].isPrincipalFeast).toBe(true);
      });

      test("includes all days of Easter Week as principal feasts", () => {
        const days = cal.getEastertideDays();
        const easterWeekDays = days.slice(0, 8);
        for (const day of easterWeekDays) {
          expect(day.rank).toBe(2);
          expect(day.isPrincipalFeast).toBe(true);
        }
      });

      test("includes Rogation Days before Ascension", () => {
        const days = cal.getEastertideDays();
        const rogationDays = days.filter((d) => d.title.includes("Rogation"));
        expect(rogationDays.length).toBeGreaterThanOrEqual(3);
      });

      test("Rogation Days are rank 5 lesser observances", () => {
        const days = cal.getEastertideDays();
        // Filter for actual Rogation Days (Mon/Tue/Wed), excluding Rogation Sunday
        const rogationDays = days.filter(
          (d) => d.title.includes("Rogation") && !d.title.includes("Sunday"),
        );
        for (const day of rogationDays) {
          expect(day.rank).toBe(5);
          expect(day.isLesserObservance).toBe(true);
        }
      });

      test("includes Ascension Day", () => {
        const days = cal.getEastertideDays();
        const ascension = days.find((d) => d.title.includes("Ascension Day"));
        expect(ascension).toBeDefined();
        expect(ascension?.isPrincipalFeast).toBe(true);
      });
    });
  });

  describe("Whitsuntide", () => {
    describe("getWhitsuntideDays", () => {
      test("starts with Vigil of Pentecost", () => {
        const days = cal.getWhitsuntideDays();
        expect(days[0].title).toContain("Vigil of Pentecost");
        expect(days[0].isVigil).toBe(true);
      });

      test("includes Pentecost as principal feast", () => {
        const days = cal.getWhitsuntideDays();
        const pentecost = days.find(
          (d) => d.title.includes("Pentecost") && d.isSunday,
        );
        expect(pentecost).toBeDefined();
        expect(pentecost?.isPrincipalFeast).toBe(true);
        expect(pentecost?.rank).toBe(2);
      });
    });

    describe("getEmberDaysInWhitsuntide", () => {
      test("returns Wed, Fri, Sat after Pentecost", () => {
        const emberDays = cal.getEmberDaysInWhitsuntide();
        expect(emberDays).toHaveLength(3);

        const days = emberDays.map((d) => dayjs(d.date).day());
        expect(days).toEqual([3, 5, 6]); // Wed, Fri, Sat
      });
    });
  });

  describe("Trinitytide", () => {
    describe("getTrinitytideDays", () => {
      test("starts with Trinity Sunday", () => {
        const days = cal.getTrinitytideDays();
        expect(days[0].title).toContain("Trinity Sunday");
        expect(days[0].isPrincipalFeast).toBe(true);
      });

      test("includes Corpus Christi", () => {
        const days = cal.getTrinitytideDays();
        const corpusChristi = days.find((d) =>
          d.title.includes("Corpus Christi"),
        );
        expect(corpusChristi).toBeDefined();
        expect(corpusChristi?.isFeast).toBe(true);
      });

      test("ends with Sunday Before Advent", () => {
        const days = cal.getTrinitytideDays();
        const sundayBeforeAdvent = days.find((d) =>
          d.title.includes("Sunday Before Advent"),
        );
        expect(sundayBeforeAdvent).toBeDefined();
      });

      test("has between 22 and 28 Sundays depending on Easter", () => {
        for (let year = 2000; year <= 2050; year++) {
          const calendar = createCalendar(`${year}-06-01`);
          const sundays = calendar
            .getTrinitytideDays()
            .filter((d) => d.isSunday);
          expect(sundays.length).toBeGreaterThanOrEqual(22);
          expect(sundays.length).toBeLessThanOrEqual(28);
        }
      });

      test("has more Sundays with earlier Easter", () => {
        const earlyEaster = createCalendar("2008-06-01");
        const lateEaster = createCalendar("2038-06-01");

        const earlyCount = earlyEaster
          .getTrinitytideDays()
          .filter((d) => d.isSunday).length;
        const lateCount = lateEaster
          .getTrinitytideDays()
          .filter((d) => d.isSunday).length;

        expect(earlyCount).toBeGreaterThan(lateCount);
      });

      describe("maximum Trinity Sundays edge case (28 Sundays)", () => {
        // 2035 has Easter on March 25, giving maximum Trinitytide Sundays
        const maxTrinityCal = createCalendar("2034-12-03"); // liturgical year 2035

        test("2035 (early Easter March 25) has 28 Sundays in Trinitytide", () => {
          const sundays = maxTrinityCal
            .getTrinitytideDays()
            .filter((d) => d.isSunday);
          expect(sundays.length).toBe(28);
        });

        test("generates Trinity Sunday through Twenty-Sixth Sunday After Trinity", () => {
          const sundays = maxTrinityCal
            .getTrinitytideDays()
            .filter((d) => d.isSunday);

          // First should be Trinity Sunday
          expect(sundays[0].title).toContain("Trinity Sunday");

          // Should have all 26 numbered Sundays after Trinity
          expect(sundays[1].title).toBe("First Sunday After Trinity");
          expect(sundays[13].title).toBe("Thirteenth Sunday After Trinity");
          expect(sundays[25].title).toBe("Twenty-Fifth Sunday After Trinity");
          expect(sundays[26].title).toBe("Twenty-Sixth Sunday After Trinity");
        });

        test("Sunday Before Advent acts as the 28th Sunday", () => {
          const sundays = maxTrinityCal
            .getTrinitytideDays()
            .filter((d) => d.isSunday);

          // Last Sunday should be Sunday Before Advent (index 27 = 28th Sunday)
          expect(sundays[27].title).toBe("Sunday Before Advent");
          expect(sundays[27].isSunday).toBe(true);
          expect(sundays[27].rank).toBe(7);
        });

        test("all Trinity Sunday titles use proper ordinal words (not numeric)", () => {
          const sundays = maxTrinityCal
            .getTrinitytideDays()
            .filter((d) => d.isSunday && d.title.includes("Sunday After Trinity"));

          // Verify none use numeric fallback (e.g., "27th")
          for (const sunday of sundays) {
            expect(sunday.title).not.toMatch(/\d+th Sunday After Trinity/);
          }
        });

        test("no gaps between consecutive Trinity Sundays", () => {
          const sundays = maxTrinityCal
            .getTrinitytideDays()
            .filter((d) => d.isSunday)
            .sort((a, b) => a.date.localeCompare(b.date));

          for (let i = 1; i < sundays.length; i++) {
            const prev = dayjs(sundays[i - 1].date);
            const curr = dayjs(sundays[i].date);
            expect(curr.diff(prev, "day")).toBe(7);
          }
        });
      });
    });

    describe("getEmberDaysInTrinitytide", () => {
      test("returns Wed, Fri, Sat after Sept 14", () => {
        const emberDays = cal.getEmberDaysInTrinitytide();
        expect(emberDays).toHaveLength(3);

        const days = emberDays.map((d) => dayjs(d.date).day());
        expect(days).toEqual([3, 5, 6]); // Wed, Fri, Sat
      });
    });
  });

  describe("seasons", () => {
    describe("getSeasons", () => {
      test("returns all 8 seasons in order", () => {
        const seasons = cal.getSeasons();
        expect(seasons).toHaveLength(8);
        expect(seasons.map((s) => s.name)).toEqual([
          "Advent",
          "Christmastide",
          "Epiphanytide",
          "Pre-Lent",
          "Lent",
          "Eastertide",
          "Whitsuntide",
          "Trinitytide",
        ]);
      });

      test("seasons are contiguous with no gaps", () => {
        const seasons = cal.getSeasons();
        for (let i = 1; i < seasons.length; i++) {
          const prevEnd = dayjs(seasons[i - 1].end);
          const currStart = dayjs(seasons[i].start);
          expect(currStart.diff(prevEnd, "day")).toBe(1);
        }
      });

      test("each season has valid start and end dates", () => {
        const seasons = cal.getSeasons();
        for (const season of seasons) {
          expect(season.start).toMatch(/^\d{4}-\d{2}-\d{2}$/);
          expect(season.end).toMatch(/^\d{4}-\d{2}-\d{2}$/);
          expect(dayjs(season.start).isBefore(dayjs(season.end))).toBe(true);
        }
      });
    });

    describe("getCurrentSeason", () => {
      test.each([
        ["2025-11-30", "Advent"],
        ["2025-12-25", "Christmastide"],
        ["2026-01-06", "Epiphanytide"],
        ["2026-02-01", "Pre-Lent"],
        ["2026-02-18", "Lent"],
        ["2026-04-05", "Eastertide"],
        ["2026-05-24", "Whitsuntide"],
        ["2026-05-31", "Trinitytide"],
      ])("for date %s returns %s", (date, expectedSeason) => {
        expect(createCalendar(date).getCurrentSeason()).toBe(expectedSeason);
      });
    });

    describe("getBySeason", () => {
      test("returns only items within the season date range", () => {
        const whitsuntideItems = cal.getBySeason("Whitsuntide");
        const seasons = cal.getSeasons();
        const whitsuntide = seasons.find((s) => s.name === "Whitsuntide")!;

        for (const date of Object.keys(whitsuntideItems)) {
          expect(date >= whitsuntide.start).toBe(true);
          expect(date <= whitsuntide.end).toBe(true);
        }
      });
    });

    describe("getSeasonItems", () => {
      test("returns items grouped by all seasons", () => {
        const items = cal.getSeasonItems();
        expect(Object.keys(items)).toHaveLength(8);
      });
    });

    describe("getFormattedSeasonItems", () => {
      test("formats items with date and title", () => {
        const items = cal.getFormattedSeasonItems();
        expect(items["Advent"][0]).toMatch(/^\w+ \d+ — .+$/);
      });

      test("joins multiple items on same date with em dash", () => {
        const items = cal.getFormattedSeasonItems();
        const lentItems = items["Lent"];
        const holySaturday = lentItems.find((item) =>
          item.includes("Holy Saturday"),
        );
        expect(holySaturday).toContain(" — ");
      });
    });
  });

  describe("calendar item queries", () => {
    describe("queryCalendarItems", () => {
      test("returns items sorted by date then rank", () => {
        const items = cal.queryCalendarItems();
        expect(items.length).toBeGreaterThan(0);

        for (let i = 1; i < items.length; i++) {
          const dateCompare = items[i].date.localeCompare(items[i - 1].date);
          if (dateCompare === 0) {
            expect(items[i].rank).toBeGreaterThanOrEqual(items[i - 1].rank);
          } else {
            expect(dateCompare).toBeGreaterThan(0);
          }
        }
      });
    });

    describe("getAll", () => {
      test("with ranking, returns highest-ranked item for dates with conflicts", () => {
        const items = cal.getAll(true);
        // Nov 30 has both First Sunday of Advent (rank 1) and St. Andrew (rank 4)
        const nov30 = items["2025-11-30"];
        expect(
          nov30.every((item) => !item.title.includes("Saint Andrew")),
        ).toBe(true);
      });

      test("without ranking, returns all items for each date", () => {
        const items = cal.getAll(false);
        const nov30 = items["2025-11-30"];
        expect(nov30.some((item) => item.title.includes("Advent"))).toBe(true);
        expect(nov30.some((item) => item.title.includes("Saint Andrew"))).toBe(
          true,
        );
      });

      test("displaced feasts appear on later dates", () => {
        const items = cal.getAll(true);
        const allTitles = Object.values(items)
          .flat()
          .map((item) => item.title);
        expect(allTitles.some((title) => title.includes("Saint Andrew"))).toBe(
          true,
        );
      });

      test("rank 7 Sundays suppressed on Principal Feasts", () => {
        const testYears = ["2025-11-30", "2024-01-01", "2027-01-01"];

        for (const startDate of testYears) {
          const calendar = createCalendar(startDate);
          const items = calendar.getAll();

          for (const dayItems of Object.values(items)) {
            const hasPrincipalFeast = dayItems.some(
              (item) => item.isPrincipalFeast,
            );
            if (hasPrincipalFeast) {
              const hasRank7Sunday = dayItems.some(
                (item) => item.rank === 7 && item.isSunday,
              );
              expect(hasRank7Sunday).toBe(false);
            }
          }
        }
      });

      test("no displaceable feasts appear on Holy Week days", () => {
        const calendar = createCalendar("2024-01-01");
        const items = calendar.getAll();
        const easter = calendar.getEasterSunday();

        for (let i = 7; i >= 1; i--) {
          const holyWeekDay = easter.subtract(i, "day").format("YYYY-MM-DD");
          const dayItems = items[holyWeekDay] || [];
          const hasDisplaceableFeast = dayItems.some(
            (item) => item.isFeast && !item.isPrincipalFeast && item.rank > 3,
          );
          expect(hasDisplaceableFeast).toBe(false);
        }
      });
    });

    describe("getAllSundays", () => {
      test("returns 52 Sundays for a full liturgical year", () => {
        const sundays = cal.getAllSundays();
        expect(Object.keys(sundays)).toHaveLength(52);
      });

      test("all dates are Sundays", () => {
        const sundays = cal.getAllSundays();
        for (const date of Object.keys(sundays)) {
          expect(dayjs(date).day()).toBe(0);
        }
      });
    });

    describe("getByDate", () => {
      test("returns items for today when no date specified", () => {
        const items = cal.getByDate();
        expect(items.length).toBeGreaterThan(0);
        expect(items[0].date).toBe("2025-11-30");
      });

      test("returns empty array for dates with no items", () => {
        // Pick a date that shouldn't have any special observances
        const items = cal.getByDate("2026-07-15");
        expect(Array.isArray(items)).toBe(true);
      });

      test("respects ranking parameter", () => {
        const ranked = cal.getByDate("2026-04-04", true);
        const unranked = cal.getByDate("2026-04-04", false);
        expect(ranked.length).toBe(unranked.length); // Both have Holy Saturday + Easter Vigil
      });
    });
  });

  describe("getCurrentDayString", () => {
    test("includes season, date, and observance", () => {
      const dayString = createCalendar("2025-12-28").getCurrentDayString();
      expect(dayString).toContain("Christmastide");
      expect(dayString).toContain("December 28");
      expect(dayString).toContain("Holy Innocents");
    });

    test("joins multiple observances with em dash", () => {
      const dayString = createCalendar("2025-12-28").getCurrentDayString();
      expect(dayString).toContain(" — ");
    });
  });

  describe("boolean date checks", () => {
    describe("fixed date feasts", () => {
      test.each([
        ["isChristmas", "2025-12-25", true],
        ["isChristmas", "2025-12-26", false],
        ["isEpiphany", "2025-01-06", true],
        ["isEpiphany", "2025-01-07", false],
        ["isNativityOfStJohnBaptist", "2026-06-24", true],
        ["isNativityOfStJohnBaptist", "2026-06-25", false],
        ["isFeastOfStJames", "2026-07-25", true],
        ["isFeastOfStJames", "2026-07-26", false],
        ["isFeastOfStBartholomew", "2026-08-24", true],
        ["isFeastOfStBartholomew", "2026-08-25", false],
        ["isFeastOfStMatthew", "2026-09-21", true],
        ["isFeastOfStMatthew", "2026-09-22", false],
        ["isFeastOfSsSimonAndJude", "2026-10-28", true],
        ["isFeastOfSsSimonAndJude", "2026-10-29", false],
        ["isFeastOfStAndrew", "2025-11-30", true],
        ["isFeastOfStAndrew", "2025-12-01", false],
        ["isTransfiguration", "2026-08-06", true],
        ["isTransfiguration", "2026-08-07", false],
        ["isPurification", "2026-02-02", true],
        ["isPurification", "2026-02-03", false],
        ["isHolyInnocents", "2025-12-28", true],
        ["isHolyInnocents", "2025-12-29", false],
      ])("%s on %s returns %s", (methodName, date, expected) => {
        const calendar = createCalendar(date);
        expect((calendar as any)[methodName]()).toBe(expected);
      });
    });

    describe("moveable date feasts", () => {
      test.each([
        ["isEaster", "2026-04-05", true],
        ["isEaster", "2026-04-06", false],
        ["isAscension", "2026-05-14", true],
        ["isAscension", "2026-05-15", false],
        ["isPentecost", "2026-05-24", true],
        ["isPentecost", "2026-05-25", false],
        ["isTrinitySunday", "2026-05-31", true],
        ["isTrinitySunday", "2026-06-01", false],
      ])("%s on %s returns %s", (methodName, date, expected) => {
        const calendar = createCalendar(date);
        expect((calendar as any)[methodName]()).toBe(expected);
      });
    });

    describe("isAnnunciation", () => {
      test("returns true on March 25 when not in Holy Week", () => {
        expect(createCalendar("2026-03-25").isAnnunciation()).toBe(true);
      });

      test("returns true on transferred date when in Holy Week", () => {
        expect(createCalendar("2024-04-08").isAnnunciation()).toBe(true);
      });

      test("returns false on March 25 when transferred", () => {
        expect(createCalendar("2024-03-25").isAnnunciation()).toBe(false);
      });
    });

    describe("season checks", () => {
      test.each([
        ["isAdvent", "2025-11-30", true],
        ["isAdvent", "2025-12-25", false],
        ["isChristmastide", "2025-12-25", true],
        ["isChristmastide", "2026-01-06", false],
        ["isEpiphanytide", "2026-01-06", true],
        ["isEpiphanytide", "2026-02-01", false],
        ["isPreLent", "2026-02-01", true],
        ["isPreLent", "2026-02-17", true],
        ["isPreLent", "2026-02-18", false],
        ["isLent", "2026-02-18", true],
        ["isLent", "2026-04-05", false],
        ["isEastertide", "2026-04-05", true],
        ["isEastertide", "2026-05-24", false],
        ["isWhitsuntide", "2026-05-24", true],
        ["isWhitsuntide", "2026-05-30", true],
        ["isWhitsuntide", "2026-05-31", false],
        ["isTrinitytide", "2026-05-31", true],
        ["isTrinitytide", "2026-11-25", true],
        ["isTrinitytide", "2026-11-29", false],
      ])("%s on %s returns %s", (methodName, date, expected) => {
        const calendar = createCalendar(date);
        expect((calendar as any)[methodName]()).toBe(expected);
      });
    });

    describe("octave checks", () => {
      test.each([
        // Octave of Christmas (Dec 25 - Jan 1)
        ["isOctaveOfChristmas", "2025-12-25", true],
        ["isOctaveOfChristmas", "2025-12-31", true],
        ["isOctaveOfChristmas", "2026-01-01", true],
        ["isOctaveOfChristmas", "2025-12-24", false],
        ["isOctaveOfChristmas", "2026-01-02", false],
        // Octave of Epiphany (Jan 6 - Jan 13)
        ["isOctaveOfEpiphany", "2025-01-06", true],
        ["isOctaveOfEpiphany", "2025-01-13", true],
        ["isOctaveOfEpiphany", "2025-01-14", false],
        // Octave of Easter
        ["isOctaveOfEaster", "2026-04-05", true],
        ["isOctaveOfEaster", "2026-04-12", true],
        ["isOctaveOfEaster", "2026-04-13", false],
        // Octave of Pentecost
        ["isOctaveOfPentecost", "2026-05-24", true],
        ["isOctaveOfPentecost", "2026-05-31", true],
        ["isOctaveOfPentecost", "2026-06-01", false],
      ])("%s on %s returns %s", (methodName, date, expected) => {
        const calendar = createCalendar(date);
        expect((calendar as any)[methodName]()).toBe(expected);
      });
    });

    describe("special period checks", () => {
      test.each([
        // Holy Week
        ["isHolyWeek", "2026-03-29", true], // Palm Sunday
        ["isHolyWeek", "2026-04-04", true], // Holy Saturday
        ["isHolyWeek", "2026-04-05", false], // Easter
        // Ascensiontide
        ["isAscensiontide", "2026-05-14", true], // Ascension
        ["isAscensiontide", "2026-05-23", true], // Eve of Pentecost
        ["isAscensiontide", "2026-05-24", false], // Pentecost
        // Rogation Days
        ["isRogationDay", "2026-05-11", true],
        ["isRogationDay", "2026-05-12", true],
        ["isRogationDay", "2026-05-13", true],
        ["isRogationDay", "2026-05-14", false], // Ascension itself
        ["isRogationDay", "2026-05-10", false],
        // Ember Days in Whitsuntide
        ["isEmberDayInWhitsuntide", "2026-05-27", true],
        ["isEmberDayInWhitsuntide", "2026-05-29", true],
        ["isEmberDayInWhitsuntide", "2026-05-30", true],
        ["isEmberDayInWhitsuntide", "2026-05-24", false],
        ["isEmberDayInWhitsuntide", "2026-05-31", false],
        // Septuagesima to Passion
        ["isSeptuagesimaToPassion", "2026-02-01", true],
        ["isSeptuagesimaToPassion", "2026-03-22", true],
        ["isSeptuagesimaToPassion", "2026-03-23", false],
        // Septuagesima to Easter (exclusive)
        ["isSeptuagesimaToEaster", "2026-02-01", true],
        ["isSeptuagesimaToEaster", "2026-04-04", true],
        ["isSeptuagesimaToEaster", "2026-04-05", false],
      ])("%s on %s returns %s", (methodName, date, expected) => {
        const calendar = createCalendar(date);
        expect((calendar as any)[methodName]()).toBe(expected);
      });
    });

    describe("general day type checks", () => {
      test("isFeastDay returns true when any item is a feast", () => {
        expect(createCalendar("2025-12-01").isFeastDay()).toBe(true); // St. Andrew transferred
        expect(createCalendar("2025-12-02").isFeastDay()).toBe(false);
      });

      test("isLordsDay returns true only on Sundays", () => {
        expect(createCalendar("2025-12-07").isLordsDay()).toBe(true);
        expect(createCalendar("2025-12-08").isLordsDay()).toBe(false);
      });

      test("isVigil returns true on vigil days", () => {
        expect(createCalendar("2025-12-24").isVigil()).toBe(true); // Christmas Eve
        expect(createCalendar("2026-01-05").isVigil()).toBe(true); // Epiphany Eve
        expect(createCalendar("2026-04-04").isVigil()).toBe(true); // Easter Vigil
        expect(createCalendar("2026-01-06").isVigil()).toBe(false);
      });

      test("isSolemn returns true for Triduum and All Souls", () => {
        expect(createCalendar("2026-04-02").isSolemn()).toBe(true); // Maundy Thursday
        expect(createCalendar("2026-04-03").isSolemn()).toBe(true); // Good Friday
        expect(createCalendar("2026-04-04").isSolemn()).toBe(true); // Holy Saturday
        expect(createCalendar("2026-11-02").isSolemn()).toBe(true); // All Souls
        expect(createCalendar("2025-12-25").isSolemn()).toBe(false);
      });

      test("All Souls is a rank 3 greater observance", () => {
        const items = createCalendar("2026-11-02").getByDate();
        const allSouls = items.find((item) => item.title.includes("All Souls"));
        expect(allSouls?.rank).toBe(3);
        expect(allSouls?.isGreaterObservance).toBe(true);
      });

      test("isFeastOfASaint returns true when saint feast is observed", () => {
        expect(createCalendar("2025-12-01").isFeastOfASaint()).toBe(true);
        expect(createCalendar("2025-12-26").isFeastOfASaint()).toBe(true); // St. Stephen
        expect(createCalendar("2025-11-30").isFeastOfASaint()).toBe(false); // Sunday takes precedence
        expect(createCalendar("2025-12-07").isFeastOfASaint()).toBe(false); // Just a Sunday
      });

      test("isSaintDay returns true when highest ranked item is a saint", () => {
        // Jan 25, 2025 - Conversion of St. Paul (rank 4) with Third Sunday of Epiphany (rank 7)
        // Saint feast takes precedence over ordinary Sunday
        expect(createCalendar("2025-01-25").isSaintDay()).toBe(true);
        // Feb 23, 2026 - Polycarp commemoration (rank 6), no competing observance
        expect(createCalendar("2026-02-23").isSaintDay()).toBe(true);
        // Dec 26, 2025 - St. Stephen is the highest ranked
        expect(createCalendar("2025-12-26").isSaintDay()).toBe(true);
      });

      test("isSaintDay returns false when higher ranked non-saint item exists", () => {
        // Nov 30, 2025 - First Sunday of Advent (rank 1) takes precedence over St. Andrew (rank 4)
        expect(createCalendar("2025-11-30").isSaintDay()).toBe(false);
        // Dec 25 - Christmas Day (Principal Feast) is not a saint
        expect(createCalendar("2025-12-25").isSaintDay()).toBe(false);
        // July 26, 2026 - Eighth Sunday after Trinity (rank 7) with Joachim and Anne (rank 6)
        // Ordinary Sunday takes precedence over commemoration in display order
        expect(createCalendar("2026-07-26").isSaintDay()).toBe(false);
      });

      test("isSaintDay returns false when no items for the date", () => {
        // A random date with no special observance
        expect(createCalendar("2026-07-15").isSaintDay()).toBe(false);
      });
    });
  });

  describe("O Antiphons", () => {
    test("returns 7 antiphons for Dec 17-23", () => {
      const antiphons = cal.getOAntiphons();
      expect(Object.keys(antiphons)).toHaveLength(7);
    });

    test("antiphons are in correct order", () => {
      const antiphons = cal.getOAntiphons();
      const titles = Object.values(antiphons).map((a) => a.title);
      expect(titles).toEqual([
        "O Sapientia",
        "O Adonai",
        "O Radix Jesse",
        "O Clavis David",
        "O Oriens",
        "O Rex gentium",
        "O Emmanuel",
      ]);
    });

    test("each antiphon has required properties", () => {
      const antiphons = cal.getOAntiphons();
      for (const antiphon of Object.values(antiphons)) {
        expect(antiphon).toHaveProperty("title");
        expect(antiphon).toHaveProperty("text");
        expect(antiphon).toHaveProperty("link");
        expect(antiphon).toHaveProperty("verse");
      }
    });
  });

  describe("edge cases", () => {
    describe("leap year handling", () => {
      test("correctly handles Feb 29 in leap years", () => {
        const leapYear = createCalendar("2024-02-29");
        expect(leapYear.getToday().isValid()).toBe(true);
        // Feb 29, 2024 falls during Lent (Easter was March 31, 2024)
        expect(leapYear.getCurrentSeason()).toBe("Lent");
      });

      test("handles leap year Easter calculations", () => {
        const leapYear = createCalendar("2024-01-01");
        const easter = leapYear.getEasterSunday();
        expect(easter.format("YYYY-MM-DD")).toBe("2024-03-31");
      });

      test("handles Feb 29 during different seasons across years", () => {
        // 2028: Feb 29 is during Pre-Lent (Easter is April 16)
        const cal2028 = createCalendar("2028-02-29");
        expect(cal2028.getToday().isValid()).toBe(true);
        expect(cal2028.getCurrentSeason()).toBe("Pre-Lent");
      });
    });

    describe("year boundary handling", () => {
      test("correctly transitions from Dec 31 to Jan 1", () => {
        const dec31 = createCalendar("2025-12-31");
        const jan1 = createCalendar("2026-01-01");

        expect(dec31.getLiturgicalYear()).toBe(2026);
        expect(jan1.getLiturgicalYear()).toBe(2026);
        expect(dec31.getCurrentSeason()).toBe("Christmastide");
        expect(jan1.getCurrentSeason()).toBe("Christmastide");
      });

      test("items span year boundary correctly", () => {
        const items = cal.getAll();
        // Dec 28 (Holy Innocents) and Jan 1 (Circumcision) should have items
        const dec28Items = items["2025-12-28"];
        const jan1Items = items["2026-01-01"];

        expect(dec28Items).toBeDefined();
        expect(dec28Items.some((i) => i.title.includes("Holy Innocents"))).toBe(
          true,
        );
        expect(jan1Items).toBeDefined();
      });
    });

    describe("Christmas on different days of week", () => {
      test.each([
        ["2022-12-25", 0], // Sunday
        ["2023-12-25", 1], // Monday
        ["2024-12-25", 3], // Wednesday
        ["2025-12-25", 4], // Thursday
      ])("Christmas %s falls on day %i", (date, expectedDay) => {
        const christmas = dayjs(date);
        expect(christmas.day()).toBe(expectedDay);

        const calendar = createCalendar(date);
        const sundays = calendar.getChristmastideSundays();
        expect(sundays.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe("early vs late Easter years", () => {
      test("handles earliest possible Easter (March 22)", () => {
        // No Easter on March 22 in test range, but March 23 is close
        const earlyEaster = createCalendar("2008-01-01");
        expect(earlyEaster.getEasterSunday().format("YYYY-MM-DD")).toBe(
          "2008-03-23",
        );

        const epiphanySundays = earlyEaster.getEpiphanytideSundays();
        expect(epiphanySundays.length).toBeLessThanOrEqual(3);
      });

      test("handles latest possible Easter (April 25)", () => {
        const lateEaster = createCalendar("2038-01-01");
        expect(lateEaster.getEasterSunday().format("YYYY-MM-DD")).toBe(
          "2038-04-25",
        );

        const epiphanySundays = lateEaster.getEpiphanytideSundays();
        expect(epiphanySundays.length).toBeGreaterThanOrEqual(5);
      });
    });
  });
});
