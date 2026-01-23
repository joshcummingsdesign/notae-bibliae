import dayjs from "dayjs";
import { describe, test, expect } from "vitest";
import { Calendar } from "./Calendar";

describe("Calendar", () => {
  test("should get today's date", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    expect(d.getToday().format("YYYY-MM-DD")).toBe("2025-11-30");
  });

  test("should get the liturgical year", () => {
    const a = new Calendar(dayjs("2025-11-30"));
    expect(a.getLiturgicalYear()).toBe(2026);

    const b = new Calendar(dayjs("2026-04-05"));
    expect(b.getLiturgicalYear()).toBe(2026);

    const c = new Calendar(dayjs("2026-04-05"));
    expect(c.getLiturgicalYear()).toBe(2026);

    const d = new Calendar(dayjs("2026-11-29"));
    expect(d.getLiturgicalYear()).toBe(2027);
  });

  test("should get the first sunday of advent", () => {
    const a = new Calendar(dayjs("2025-11-30"));
    expect(a.getFirstSundayOfAdvent().format("YYYY-MM-DD")).toBe("2025-11-30");

    const b = new Calendar(dayjs("2025-12-25"));
    expect(b.getFirstSundayOfAdvent().format("YYYY-MM-DD")).toBe("2025-11-30");

    const c = new Calendar(dayjs("2026-01-01"));
    expect(c.getFirstSundayOfAdvent().format("YYYY-MM-DD")).toBe("2025-11-30");

    const d = new Calendar(dayjs("2025-11-29"));
    expect(d.getFirstSundayOfAdvent().format("YYYY-MM-DD")).toBe("2024-12-01");
  });

  test("should get next year's first sunday of advent", () => {
    const a = new Calendar(dayjs("2026-11-25"));
    expect(a.getNextFirstSundayOfAdvent().format("YYYY-MM-DD")).toBe(
      "2026-11-29",
    );
    const b = new Calendar(dayjs("2025-11-30"));
    expect(a.getNextFirstSundayOfAdvent().format("YYYY-MM-DD")).toBe(
      "2026-11-29",
    );
    const c = new Calendar(dayjs("2027-01-01"));
    expect(c.getNextFirstSundayOfAdvent().format("YYYY-MM-DD")).toBe(
      "2027-11-28",
    );
  });

  test("should get the fixed calendar items", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getFixedCalendarItems();
    expect(items.length).toBe(83);
    expect(items[0]).toEqual({
      date: "2025-11-30",
      title: "[Saint Andrew](/people/saints/apostles/andrew), Apostle",
      rank: 6,
      class: 6,
      isFeast: true,
      isSaint: true,
    });
    expect(items[items.length - 1]).toEqual({
      date: "2026-11-25",
      title:
        "[Saint Catherine of Alexandria](/people/saints/early/catherine-of-alexandria), Virgin and Martyr",
      rank: 6,
      class: 10,
      isSaint: true,
    });
  });

  test("should get the sundays in advent", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getAdventSundays();
    expect(items[0]).toEqual({
      date: "2025-11-30",
      title: "First Sunday of Advent",
      rank: 3,
      class: 1,
      isFeast: true,
      isSunday: true,
    });
    expect(items[1]).toEqual({
      date: "2025-12-07",
      title: "Second Sunday of Advent",
      rank: 3,
      class: 3,
      isSunday: true,
    });
    expect(items[2]).toEqual({
      date: "2025-12-14",
      title:
        "Third Sunday of Advent: [Gaudete Sunday](/liturgy/liturgical-year/seasons/advent/gaudete-sunday)",
      rank: 3,
      class: 3,
      isSunday: true,
    });
    expect(items[3]).toEqual({
      date: "2025-12-21",
      title: "Fourth Sunday of Advent",
      rank: 3,
      class: 3,
      isSunday: true,
    });
  });

  test("should get the ember days in advent", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getEmberDaysInAdvent();
    expect(items[0]).toEqual({
      date: "2025-12-17",
      title:
        "[Ember Wednesday in Advent](/glossary/liturgical-terms#ember-days)",
      rank: 3,
      class: 11,
    });
    expect(items[1]).toEqual({
      date: "2025-12-19",
      title: "[Ember Friday in Advent](/glossary/liturgical-terms#ember-days)",
      rank: 3,
      class: 11,
    });
    expect(items[2]).toEqual({
      date: "2025-12-20",
      title:
        "[Ember Saturday in Advent](/glossary/liturgical-terms#ember-days)",
      rank: 3,
      class: 11,
    });
  });

  test("should get the sundays in christmastide", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getChristmastideSundays();
    expect(items[0]).toEqual({
      date: "2025-12-28",
      title: "First Sunday After Christmas",
      rank: 3,
      class: 7,
      isSunday: true,
    });
    expect(items[1]).toEqual({
      date: "2026-01-04",
      title: "Second Sunday After Christmas",
      rank: 3,
      class: 7,
      isSunday: true,
    });
  });

  test("should get easter sunday", () => {
    const a = new Calendar(dayjs("2025-11-29"));
    expect(a.getEasterSunday().format("YYYY-MM-DD")).toBe("2025-04-20");

    const b = new Calendar(dayjs("2025-11-30"));
    expect(b.getEasterSunday().format("YYYY-MM-DD")).toBe("2026-04-05");

    const c = new Calendar(dayjs("2026-11-29"));
    expect(c.getEasterSunday().format("YYYY-MM-DD")).toBe("2027-03-28");
  });

  test("should get ash wednesday", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    expect(d.getAshWednesday().format("YYYY-MM-DD")).toBe("2026-02-18");
  });

  test("should get septuagesima", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    expect(d.getSeptuagesima().format("YYYY-MM-DD")).toBe("2026-02-01");
  });

  test("should get sexagesima", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    expect(d.getSexagesima().format("YYYY-MM-DD")).toBe("2026-02-08");
  });

  test("should get quinquagesima", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    expect(d.getQuinquagesima().format("YYYY-MM-DD")).toBe("2026-02-15");
  });

  test("should get shrove tuesday", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    expect(d.getShroveTuesday().format("YYYY-MM-DD")).toBe("2026-02-17");
  });

  test("should get sundays in epiphanytide", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getEpiphanytideSundays();
    expect(items[0]).toEqual({
      date: "2026-01-11",
      title:
        "First Sunday of Epiphany: [Baptism of the Lord](/liturgy/liturgical-year/seasons/epiphanytide/baptism-of-the-lord)",
      rank: 3,
      class: 2,
      isSunday: true,
    });
    expect(items[1]).toEqual({
      date: "2026-01-18",
      title: "Second Sunday of Epiphany",
      rank: 3,
      class: 7,
      isSunday: true,
    });
    expect(items[2]).toEqual({
      date: "2026-01-25",
      title: "Third Sunday of Epiphany",
      rank: 3,
      class: 7,
      isSunday: true,
    });
    expect(items[3]).toEqual({
      date: "2026-02-01",
      title: "Fourth Sunday of Epiphany",
      rank: 3,
      class: 7,
      isSunday: true,
    });
    expect(items[4]).toEqual({
      date: "2026-02-08",
      title: "Fifth Sunday of Epiphany",
      rank: 3,
      class: 7,
      isSunday: true,
    });
    expect(items[5]).toEqual({
      date: "2026-02-15",
      title: "Sixth Sunday of Epiphany",
      rank: 3,
      class: 7,
      isSunday: true,
    });
  });

  test("should get feast days in pre lent", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getPreLentFeastDays();
    expect(items[0]).toEqual({
      date: "2026-02-01",
      title:
        "[Septuagesima](/liturgy/liturgical-year/seasons/pre-lent/septuagesima)",
      rank: 2,
      class: 3,
      isSunday: true,
    });
    expect(items[1]).toEqual({
      date: "2026-02-08",
      title:
        "[Sexagesima](/liturgy/liturgical-year/seasons/pre-lent/sexagesima)",
      rank: 2,
      class: 3,
      isSunday: true,
    });
    expect(items[2]).toEqual({
      date: "2026-02-15",
      title:
        "[Quinquagesima](/liturgy/liturgical-year/seasons/pre-lent/quinquagesima)",
      rank: 2,
      class: 3,
      isSunday: true,
    });
    expect(items[3]).toEqual({
      date: "2026-02-17",
      title:
        "[Shrove Tuesday](/liturgy/liturgical-year/seasons/pre-lent/shrove-tuesday)",
      rank: 1,
      class: 5,
    });
  });

  test("should get passion sunday", () => {
    const a = new Calendar(dayjs("2025-11-29"));
    expect(a.getPassionSunday().format("YYYY-MM-DD")).toBe("2025-04-06");

    const b = new Calendar(dayjs("2025-11-30"));
    expect(b.getPassionSunday().format("YYYY-MM-DD")).toBe("2026-03-22");

    const c = new Calendar(dayjs("2026-11-29"));
    expect(c.getPassionSunday().format("YYYY-MM-DD")).toBe("2027-03-14");
  });

  test("should get annunciation", () => {
    const a = new Calendar(dayjs("2024-03-01"));
    expect(a.getAnnunciation().format("YYYY-MM-DD")).toBe("2024-04-08");

    const b = new Calendar(dayjs("2025-11-30"));
    expect(b.getAnnunciation().format("YYYY-MM-DD")).toBe("2026-03-25");

    const c = new Calendar(dayjs("2027-01-01"));
    expect(c.getAnnunciation().format("YYYY-MM-DD")).toBe("2027-04-05");

    const d = new Calendar(dayjs("2028-01-01"));
    expect(d.getAnnunciation().format("YYYY-MM-DD")).toBe("2028-03-25");
  });

  test("should get the sundays in lent", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getLentSundays();
    expect(items[0]).toEqual({
      date: "2026-02-22",
      title: "First Sunday of Lent",
      rank: 3,
      class: 3,
      isSunday: true,
    });
    expect(items[1]).toEqual({
      date: "2026-03-01",
      title: "Second Sunday of Lent",
      rank: 3,
      class: 3,
      isSunday: true,
    });
    expect(items[2]).toEqual({
      date: "2026-03-08",
      title: "Third Sunday of Lent",
      rank: 3,
      class: 3,
      isSunday: true,
    });
    expect(items[3]).toEqual({
      date: "2026-03-15",
      title:
        "Fourth Sunday of Lent: [Laetare Sunday](/liturgy/liturgical-year/seasons/lent/laetare-sunday)",
      rank: 3,
      class: 3,
      isSunday: true,
    });
    expect(items[4]).toEqual({
      date: "2026-03-22",
      title:
        "Fifth Sunday of Lent: [Passion Sunday](/liturgy/liturgical-year/seasons/lent/passiontide/passion-sunday)",
      rank: 3,
      class: 1,
      isSunday: true,
    });
  });

  test("should get the ember days in lent", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getEmberDaysInLent();
    expect(items[0]).toEqual({
      date: "2026-02-25",
      title: "[Ember Wednesday in Lent](/glossary/liturgical-terms#ember-days)",
      rank: 3,
      class: 11,
    });
    expect(items[1]).toEqual({
      date: "2026-02-27",
      title: "[Ember Friday in Lent](/glossary/liturgical-terms#ember-days)",
      rank: 3,
      class: 11,
    });
    expect(items[2]).toEqual({
      date: "2026-02-28",
      title: "[Ember Saturday in Lent](/glossary/liturgical-terms#ember-days)",
      rank: 3,
      class: 11,
    });
  });

  test("should get the days of holy week", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getHolyWeekDays();
    expect(items[0]).toEqual({
      date: "2026-03-29",
      title:
        "Holy Week: [Palm Sunday](/liturgy/liturgical-year/seasons/lent/passiontide/palm-sunday)",
      rank: 1,
      class: 1,
      isSunday: true,
    });
    expect(items[1]).toEqual({
      date: "2026-03-30",
      title:
        "Holy Week: [Holy Monday](/liturgy/liturgical-year/seasons/lent/passiontide/holy-monday)",
      rank: 1,
      class: 2,
    });
    expect(items[2]).toEqual({
      date: "2026-03-31",
      title:
        "Holy Week: [Holy Tuesday](/liturgy/liturgical-year/seasons/lent/passiontide/holy-tuesday)",
      rank: 1,
      class: 2,
    });
    expect(items[3]).toEqual({
      date: "2026-04-01",
      title:
        "Holy Week: [Spy Wednesday](/liturgy/liturgical-year/seasons/lent/passiontide/spy-wednesday)",
      rank: 1,
      class: 2,
    });
    expect(items[4]).toEqual({
      date: "2026-04-02",
      title:
        "Holy Week: [Maundy Thursday](/liturgy/liturgical-year/seasons/lent/passiontide/maundy-thursday)",
      rank: 1,
      class: 2,
    });
    expect(items[5]).toEqual({
      date: "2026-04-03",
      title:
        "Holy Week: [Good Friday (Passion of the Lord)](/liturgy/liturgical-year/seasons/lent/passiontide/good-friday)",
      rank: 1,
      class: 2,
    });
    expect(items[6]).toEqual({
      date: "2026-04-04",
      title:
        "Holy Week: [Holy Saturday](/liturgy/liturgical-year/seasons/lent/passiontide/holy-saturday)",
      rank: 1,
      class: 2,
    });
    expect(items[7]).toEqual({
      date: "2026-04-04",
      title:
        "[Easter Vigil](/liturgy/liturgical-year/seasons/eastertide/easter-vigil)",
      rank: 4,
      class: 5,
    });
  });

  test("should get the days of lent", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getLentDays();
    expect(items[0]).toEqual({
      date: "2026-02-18",
      title:
        "[Ash Wednesday](/liturgy/liturgical-year/seasons/lent/ash-wednesday)",
      rank: 1,
      class: 2,
    });
    expect(items[1]).toEqual({
      date: "2026-02-19",
      title: "Thursday in Lent",
      rank: 1,
      class: 9,
    });
    expect(items[2]).toEqual({
      date: "2026-02-20",
      title: "Friday in Lent",
      rank: 1,
      class: 9,
    });
    expect(items[3]).toEqual({
      date: "2026-02-21",
      title: "Saturday in Lent",
      rank: 1,
      class: 9,
    });
    expect(items[4]).toEqual({
      date: "2026-02-22",
      title: "First Sunday of Lent",
      rank: 3,
      class: 3,
      isSunday: true,
    });
    expect(items[5]).toEqual({
      date: "2026-03-01",
      title: "Second Sunday of Lent",
      rank: 3,
      class: 3,
      isSunday: true,
    });
    expect(items[6]).toEqual({
      date: "2026-03-08",
      title: "Third Sunday of Lent",
      rank: 3,
      class: 3,
      isSunday: true,
    });
    expect(items[7]).toEqual({
      date: "2026-03-15",
      title:
        "Fourth Sunday of Lent: [Laetare Sunday](/liturgy/liturgical-year/seasons/lent/laetare-sunday)",
      rank: 3,
      class: 3,
      isSunday: true,
    });
    expect(items[8]).toEqual({
      date: "2026-03-22",
      title:
        "Fifth Sunday of Lent: [Passion Sunday](/liturgy/liturgical-year/seasons/lent/passiontide/passion-sunday)",
      rank: 3,
      class: 1,
      isSunday: true,
    });
    expect(items[9]).toEqual({
      date: "2026-03-24",
      title: "Eve of the Annunciation",
      rank: 4,
      class: 5,
    });
    expect(items[10]).toEqual({
      date: "2026-03-25",
      title:
        "[Annunciation of the Lord](/liturgy/liturgical-year/seasons/eastertide/annunciation)",
      rank: 5,
      class: 5,
      isFeast: true,
      isPrincipalFeast: true,
    });
    expect(items[11]).toEqual({
      date: "2026-03-29",
      title:
        "Holy Week: [Palm Sunday](/liturgy/liturgical-year/seasons/lent/passiontide/palm-sunday)",
      rank: 1,
      class: 1,
      isSunday: true,
    });
    expect(items[12]).toEqual({
      date: "2026-03-30",
      title:
        "Holy Week: [Holy Monday](/liturgy/liturgical-year/seasons/lent/passiontide/holy-monday)",
      rank: 1,
      class: 2,
    });
    expect(items[13]).toEqual({
      date: "2026-03-31",
      title:
        "Holy Week: [Holy Tuesday](/liturgy/liturgical-year/seasons/lent/passiontide/holy-tuesday)",
      rank: 1,
      class: 2,
    });
    expect(items[14]).toEqual({
      date: "2026-04-01",
      title:
        "Holy Week: [Spy Wednesday](/liturgy/liturgical-year/seasons/lent/passiontide/spy-wednesday)",
      rank: 1,
      class: 2,
    });
    expect(items[15]).toEqual({
      date: "2026-04-02",
      title:
        "Holy Week: [Maundy Thursday](/liturgy/liturgical-year/seasons/lent/passiontide/maundy-thursday)",
      rank: 1,
      class: 2,
    });
    expect(items[16]).toEqual({
      date: "2026-04-03",
      title:
        "Holy Week: [Good Friday (Passion of the Lord)](/liturgy/liturgical-year/seasons/lent/passiontide/good-friday)",
      rank: 1,
      class: 2,
    });
    expect(items[17]).toEqual({
      date: "2026-04-04",
      title:
        "Holy Week: [Holy Saturday](/liturgy/liturgical-year/seasons/lent/passiontide/holy-saturday)",
      rank: 1,
      class: 2,
    });
    expect(items[18]).toEqual({
      date: "2026-04-04",
      title:
        "[Easter Vigil](/liturgy/liturgical-year/seasons/eastertide/easter-vigil)",
      rank: 4,
      class: 5,
    });
  });

  test("should get ascension day", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const ascension = d.getAscensionDay();
    expect(ascension.format("YYYY-MM-DD")).toBe("2026-05-14");
  });

  test("should get pentecost", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const pentecost = d.getPentecost();
    expect(pentecost.format("YYYY-MM-DD")).toBe("2026-05-24");
  });

  test("should get trinity sunday", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const trinitySunday = d.getTrinitySunday();
    expect(trinitySunday.format("YYYY-MM-DD")).toBe("2026-05-31");
  });

  test("should get corpus christi", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const corpusChristi = d.getCorpusChristi();
    expect(corpusChristi.format("YYYY-MM-DD")).toBe("2026-06-04");
  });

  test("should get christ the king", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const christTheKing = d.getChristTheKing();
    expect(christTheKing.format("YYYY-MM-DD")).toBe("2026-11-22");
  });

  test("should get the days of eastertide", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getEastertideDays();
    expect(items[0]).toEqual({
      date: "2026-04-05",
      title:
        "[Easter (Resurrection of the Lord)](/liturgy/liturgical-year/seasons/eastertide/easter)",
      rank: 1,
      class: 2,
      isFeast: true,
      isPrincipalFeast: true,
      isSunday: true,
    });
    expect(items[1]).toEqual({
      date: "2026-04-06",
      title: "Monday of Easter Week",
      rank: 1,
      class: 5,
    });
    expect(items[2]).toEqual({
      date: "2026-04-07",
      title: "Tuesday of Easter Week",
      rank: 1,
      class: 5,
    });
    expect(items[3]).toEqual({
      date: "2026-04-08",
      title: "Wednesday of Easter Week",
      rank: 1,
      class: 5,
    });
    expect(items[4]).toEqual({
      date: "2026-04-09",
      title: "Thursday of Easter Week",
      rank: 1,
      class: 9,
    });
    expect(items[5]).toEqual({
      date: "2026-04-10",
      title: "Friday of Easter Week",
      rank: 1,
      class: 9,
    });
    expect(items[6]).toEqual({
      date: "2026-04-11",
      title: "Saturday of Easter Week",
      rank: 1,
      class: 9,
    });
    expect(items[7]).toEqual({
      date: "2026-04-12",
      title:
        "[Second Sunday of Easter](/liturgy/liturgical-year/seasons/eastertide/second-sunday-of-easter)",
      rank: 3,
      class: 8,
      isFeast: true,
      isSunday: true,
    });
    expect(items[8]).toEqual({
      date: "2026-04-19",
      title: "Third Sunday of Easter",
      rank: 3,
      class: 7,
      isSunday: true,
    });
    expect(items[9]).toEqual({
      date: "2026-04-26",
      title: "Fourth Sunday of Easter",
      rank: 3,
      class: 7,
      isSunday: true,
    });
    expect(items[10]).toEqual({
      date: "2026-05-03",
      title: "Fifth Sunday of Easter",
      rank: 3,
      class: 7,
      isSunday: true,
    });
    expect(items[11]).toEqual({
      date: "2026-05-10",
      title:
        "Sixth Sunday of Easter: [Rogation Sunday](/glossary/liturgical-terms#rogation-days)",
      rank: 3,
      class: 7,
      isSunday: true,
    });
    expect(items[12]).toEqual({
      date: "2026-05-11",
      title: "[Rogation Monday](/glossary/liturgical-terms#rogation-days)",
      rank: 3,
      class: 11,
    });
    expect(items[13]).toEqual({
      date: "2026-05-12",
      title: "[Rogation Tuesday](/glossary/liturgical-terms#rogation-days)",
      rank: 3,
      class: 11,
    });
    expect(items[14]).toEqual({
      date: "2026-05-13",
      title: "[Rogation Wednesday](/glossary/liturgical-terms#rogation-days)",
      rank: 3,
      class: 11,
    });
    expect(items[15]).toEqual({
      date: "2026-05-13",
      title: "Eve of the Ascension",
      rank: 4,
      class: 2,
    });
    expect(items[16]).toEqual({
      date: "2026-05-14",
      title:
        "[Ascension Day](/liturgy/liturgical-year/seasons/eastertide/ascensiontide/ascension-day)",
      rank: 1,
      class: 2,
      isFeast: true,
      isPrincipalFeast: true,
    });
    expect(items[17]).toEqual({
      date: "2026-05-17",
      title: "Seventh Sunday of Easter (Sunday After Ascension Day)",
      rank: 3,
      class: 7,
      isSunday: true,
    });
  });

  test("should get the days of whitsundtide", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getWhitsuntideDays();
    expect(items[0]).toEqual({
      date: "2026-05-23",
      title: "Pentecost Eve",
      rank: 4,
      class: 2,
    });
    expect(items[1]).toEqual({
      date: "2026-05-24",
      title:
        "[Pentecost (Whitsunday)](/liturgy/liturgical-year/seasons/whitsuntide/pentecost)",
      rank: 1,
      class: 2,
      isFeast: true,
      isPrincipalFeast: true,
      isSunday: true,
    });
    (expect(items[2]).toEqual({
      date: "2026-05-25",
      title: "Monday in Whitsuntide",
      rank: 1,
      class: 5,
    }),
      expect(items[3]).toEqual({
        date: "2026-05-26",
        title: "Tuesday in Whitsuntide",
        rank: 1,
        class: 5,
      }));
    expect(items[4]).toEqual({
      date: "2026-05-28",
      title: "Thursday in Whitsuntide",
      rank: 1,
      class: 9,
    });
  });

  test("should get the ember days in whitsuntide", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getEmberDaysInWhitsuntide();
    expect(items[0]).toEqual({
      date: "2026-05-27",
      title:
        "[Ember Wednesday in Whitsuntide](/glossary/liturgical-terms#ember-days)",
      rank: 3,
      class: 11,
    });
    expect(items[1]).toEqual({
      date: "2026-05-29",
      title:
        "[Ember Friday in Whitsuntide](/glossary/liturgical-terms#ember-days)",
      rank: 3,
      class: 11,
    });
    expect(items[2]).toEqual({
      date: "2026-05-30",
      title:
        "[Ember Saturday in Whitsuntide](/glossary/liturgical-terms#ember-days)",
      rank: 3,
      class: 11,
    });
  });

  test("should get the days of trinitytide", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getTrinitytideDays();
    expect(items.length).toBe(29);
    expect(items[0]).toEqual({
      date: "2026-05-31",
      title:
        "[Trinity Sunday](/liturgy/liturgical-year/seasons/trinitytide/trinity-sunday)",
      rank: 2,
      class: 4,
      isFeast: true,
      isPrincipalFeast: true,
      isSunday: true,
    });
    expect(items[1]).toEqual({
      date: "2026-06-07",
      title: "First Sunday After Trinity",
      rank: 3,
      class: 7,
      isFeast: false,
      isPrincipalFeast: false,
      isSunday: true,
    });
    expect(items[12]).toEqual({
      date: "2026-08-23",
      title: "Twelfth Sunday After Trinity",
      rank: 3,
      class: 7,
      isFeast: false,
      isPrincipalFeast: false,
      isSunday: true,
    });
    expect(items[25]).toEqual({
      date: "2026-11-22",
      title: "Twenty-Fifth Sunday After Trinity",
      rank: 3,
      class: 7,
      isFeast: false,
      isPrincipalFeast: false,
      isSunday: true,
    });
    expect(items[26]).toEqual({
      date: "2026-05-30",
      title: "Trinity Eve",
      rank: 4,
      class: 4,
    });
    expect(items[27]).toEqual({
      date: "2026-06-04",
      title:
        "[Corpus Christi](/liturgy/liturgical-year/seasons/trinitytide/corpus-christi)",
      rank: 5,
      class: 4,
      isFeast: true,
    });
    expect(items[28]).toEqual({
      date: "2026-11-22",
      title: "Sunday Before Advent",
      rank: 2,
      class: 7,
      isSunday: true,
    });
  });

  test("should get the ember days in trinitytide", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getEmberDaysInTrinitytide();
    expect(items[0]).toEqual({
      date: "2026-09-16",
      title:
        "[Ember Wednesday in Trinitytide](/glossary/liturgical-terms#ember-days)",
      rank: 3,
      class: 11,
    });
    expect(items[1]).toEqual({
      date: "2026-09-18",
      title:
        "[Ember Friday in Trinitytide](/glossary/liturgical-terms#ember-days)",
      rank: 3,
      class: 11,
    });
    expect(items[2]).toEqual({
      date: "2026-09-19",
      title:
        "[Ember Saturday in Trinitytide](/glossary/liturgical-terms#ember-days)",
      rank: 3,
      class: 11,
    });
  });

  test("should get the liturgical seasons", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getSeasons();
    expect(items[0]).toEqual({
      name: "Advent",
      start: "2025-11-30",
      end: "2025-12-24",
    });
    expect(items[1]).toEqual({
      name: "Christmastide",
      start: "2025-12-25",
      end: "2026-01-05",
    });
    expect(items[2]).toEqual({
      name: "Epiphanytide",
      start: "2026-01-06",
      end: "2026-01-31",
    });
    expect(items[3]).toEqual({
      name: "Pre-Lent",
      start: "2026-02-01",
      end: "2026-02-17",
    });
    expect(items[4]).toEqual({
      name: "Lent",
      start: "2026-02-18",
      end: "2026-04-04",
    });
    expect(items[5]).toEqual({
      name: "Eastertide",
      start: "2026-04-05",
      end: "2026-05-23",
    });
    expect(items[6]).toEqual({
      name: "Whitsuntide",
      start: "2026-05-24",
      end: "2026-05-30",
    });
    expect(items[7]).toEqual({
      name: "Trinitytide",
      start: "2026-05-31",
      end: "2026-11-28",
    });
  });

  test("should query the calendar items", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.queryCalendarItems();
    expect(items.length).toBe(182);
    expect(items[0]).toEqual({
      date: "2025-11-30",
      title: "[Saint Andrew](/people/saints/apostles/andrew), Apostle",
      rank: 6,
      class: 6,
      isFeast: true,
      isSaint: true,
    });
    expect(items[items.length - 1]).toEqual({
      date: "2026-11-25",
      title:
        "[Saint Catherine of Alexandria](/people/saints/early/catherine-of-alexandria), Virgin and Martyr",
      rank: 6,
      class: 10,
      isSaint: true,
    });
  });

  test("should get all items with ranking", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getAll();

    expect(Object.keys(items).length).toBe(156);

    const adventSun = items["2025-11-30"];
    expect(adventSun.length).toBe(2);
    expect(adventSun).toEqual([
      {
        date: "2025-11-30",
        title: "First Sunday of Advent",
        rank: 3,
        class: 1,
        isFeast: true,
        isSunday: true,
      },
      {
        date: "2025-11-30",
        title: "[Saint Andrew](/people/saints/apostles/andrew), Apostle",
        rank: 6,
        class: 6,
        isFeast: true,
        isSaint: true,
      },
    ]);

    const easterVigil = items["2026-04-04"];
    expect(easterVigil.length).toBe(2);
    expect(easterVigil).toEqual([
      {
        date: "2026-04-04",
        title:
          "Holy Week: [Holy Saturday](/liturgy/liturgical-year/seasons/lent/passiontide/holy-saturday)",
        rank: 1,
        class: 2,
      },
      {
        date: "2026-04-04",
        title:
          "[Easter Vigil](/liturgy/liturgical-year/seasons/eastertide/easter-vigil)",
        rank: 4,
        class: 5,
      },
    ]);
  });

  test("should get all items with no ranking", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getAll(false);

    expect(Object.keys(items).length).toBe(156);

    const adventSun = items["2025-11-30"];
    expect(adventSun.length).toBe(2);
    expect(adventSun).toEqual([
      {
        date: "2025-11-30",
        title: "[Saint Andrew](/people/saints/apostles/andrew), Apostle",
        rank: 6,
        class: 6,
        isFeast: true,
        isSaint: true,
      },
      {
        date: "2025-11-30",
        title: "First Sunday of Advent",
        rank: 3,
        class: 1,
        isFeast: true,
        isSunday: true,
      },
    ]);

    const easterVigil = items["2026-04-04"];
    expect(easterVigil.length).toBe(2);
    expect(easterVigil).toEqual([
      {
        date: "2026-04-04",
        title:
          "Holy Week: [Holy Saturday](/liturgy/liturgical-year/seasons/lent/passiontide/holy-saturday)",
        rank: 1,
        class: 2,
      },
      {
        date: "2026-04-04",
        title:
          "[Easter Vigil](/liturgy/liturgical-year/seasons/eastertide/easter-vigil)",
        rank: 4,
        class: 5,
      },
    ]);
  });

  test("should get all sundays", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getAllSundays();
    const entries = Object.entries(items);

    expect(entries.length).toBe(52);
    expect(entries[0]).toEqual(["2025-11-30", "First Sunday of Advent"]);
    expect(entries[entries.length - 1]).toEqual([
      "2026-11-22",
      "Sunday Before Advent",
    ]);
  });

  test("should get today's items with ranking", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getByDate(); // today
    expect(items.length).toBe(2);
    expect(items).toEqual([
      {
        date: "2025-11-30",
        title: "First Sunday of Advent",
        rank: 3,
        class: 1,
        isFeast: true,
        isSunday: true,
      },
      {
        date: "2025-11-30",
        title: "[Saint Andrew](/people/saints/apostles/andrew), Apostle",
        rank: 6,
        class: 6,
        isFeast: true,
        isSaint: true,
      },
    ]);
  });

  test("should get by date with no ranking", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getByDate("2026-04-04", false);
    expect(items.length).toBe(2);
    expect(items).toEqual([
      {
        date: "2026-04-04",
        title:
          "Holy Week: [Holy Saturday](/liturgy/liturgical-year/seasons/lent/passiontide/holy-saturday)",
        rank: 1,
        class: 2,
      },
      {
        date: "2026-04-04",
        title:
          "[Easter Vigil](/liturgy/liturgical-year/seasons/eastertide/easter-vigil)",
        rank: 4,
        class: 5,
      },
    ]);
  });

  test("should get by season with ranking", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getBySeason("Whitsuntide");
    expect(items).toEqual({
      "2026-05-24": [
        {
          date: "2026-05-24",
          title:
            "[Pentecost (Whitsunday)](/liturgy/liturgical-year/seasons/whitsuntide/pentecost)",
          rank: 1,
          class: 2,
          isFeast: true,
          isPrincipalFeast: true,
          isSunday: true,
        },
      ],
      "2026-05-25": [
        {
          date: "2026-05-25",
          title: "Monday in Whitsuntide",
          rank: 1,
          class: 5,
        },
        {
          class: 10,
          date: "2026-05-25",
          isSaint: true,
          rank: 6,
          title:
            "[Saint Bede the Venerable](/people/saints/medieval/bede-the-venerable), Priest and Doctor of the Church",
        },
      ],
      "2026-05-26": [
        {
          date: "2026-05-26",
          title: "Tuesday in Whitsuntide",
          rank: 1,
          class: 5,
        },
        {
          date: "2026-05-26",
          title:
            "[Saint Augustine of Canterbury](/people/saints/medieval/augustine-of-canterbury), Bishop",
          rank: 6,
          class: 10,
          isSaint: true,
        },
      ],
      "2026-05-27": [
        {
          date: "2026-05-27",
          title:
            "[Ember Wednesday in Whitsuntide](/glossary/liturgical-terms#ember-days)",
          rank: 3,
          class: 11,
        },
      ],
      "2026-05-28": [
        {
          date: "2026-05-28",
          title: "Thursday in Whitsuntide",
          rank: 1,
          class: 9,
        },
      ],
      "2026-05-29": [
        {
          date: "2026-05-29",
          title:
            "[Ember Friday in Whitsuntide](/glossary/liturgical-terms#ember-days)",
          rank: 3,
          class: 11,
        },
      ],
      "2026-05-30": [
        {
          date: "2026-05-30",
          title:
            "[Ember Saturday in Whitsuntide](/glossary/liturgical-terms#ember-days)",
          rank: 3,
          class: 11,
        },
        {
          date: "2026-05-30",
          title: "Trinity Eve",
          rank: 4,
          class: 4,
        },
      ],
    });
  });

  test("should get current season", () => {
    const a = new Calendar(dayjs("2025-11-30"));
    const as = a.getCurrentSeason();
    expect(as).toBe("Advent");

    const b = new Calendar(dayjs("2025-12-25"));
    const bs = b.getCurrentSeason();
    expect(bs).toBe("Christmastide");

    const c = new Calendar(dayjs("2025-01-06"));
    const cs = c.getCurrentSeason();
    expect(cs).toBe("Epiphanytide");
  });

  test("should get season items", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getSeasonItems();
    expect(Object.keys(items).length).toBe(8);
    expect(items["Advent"]["2025-11-30"]).toEqual([
      {
        date: "2025-11-30",
        title: "First Sunday of Advent",
        rank: 3,
        class: 1,
        isFeast: true,
        isSunday: true,
      },
      {
        date: "2025-11-30",
        title: "[Saint Andrew](/people/saints/apostles/andrew), Apostle",
        rank: 6,
        class: 6,
        isFeast: true,
        isSaint: true,
      },
    ]);
  });

  test("should get formatted season items", () => {
    const d = new Calendar(dayjs("2025-11-30"));
    const items = d.getFormattedSeasonItems();
    expect(Object.keys(items).length).toBe(8);
    expect(items["Advent"][0]).toBe(
      "November 30 — First Sunday of Advent — [Saint Andrew](/people/saints/apostles/andrew), Apostle",
    );
    expect(items["Lent"][items["Lent"].length - 1]).toBe(
      "April 4 — Holy Week: [Holy Saturday](/liturgy/liturgical-year/seasons/lent/passiontide/holy-saturday) — [Easter Vigil](/liturgy/liturgical-year/seasons/eastertide/easter-vigil)",
    );
  });

  test("should return the current day string", () => {
    const a = new Calendar(dayjs("2025-11-30"));
    const ad = a.getCurrentDayString();
    expect(ad).toBe(
      "Advent — November 30 — First Sunday of Advent — [Saint Andrew](/people/saints/apostles/andrew), Apostle",
    );

    const b = new Calendar(dayjs("2025-12-01"));
    const ab = b.getCurrentDayString();
    expect(ab).toBe("Advent — December 1");

    const c = new Calendar(dayjs("2025-12-06"));
    const ac = c.getCurrentDayString();
    expect(ac).toBe(
      "Advent — December 6 — [Saint Nicholas](/people/saints/early/nicholas-of-myra), Bishop",
    );
  });

  test("should check to see if it's christmas", () => {
    const a = new Calendar(dayjs("2025-12-25"));
    expect(a.isChristmas()).toBeTruthy();

    const b = new Calendar(dayjs("2025-11-30"));
    expect(b.isChristmas()).toBeFalsy();
  });

  test("should check to see if it's epiphany", () => {
    const a = new Calendar(dayjs("2025-01-06"));
    expect(a.isEpiphany()).toBeTruthy();

    const b = new Calendar(dayjs("2025-01-07"));
    expect(b.isEpiphany()).toBeFalsy();
  });

  test("should check to see if it's easter", () => {
    const a = new Calendar(dayjs("2026-04-05"));
    expect(a.isEaster()).toBeTruthy();

    const b = new Calendar(dayjs("2026-01-07"));
    expect(b.isEaster()).toBeFalsy();
  });

  test("should check to see if it's ascension", () => {
    const a = new Calendar(dayjs("2026-05-14"));
    expect(a.isAscension()).toBeTruthy();

    const b = new Calendar(dayjs("2026-01-07"));
    expect(b.isAscension()).toBeFalsy();
  });

  test("should check to see if it's pentecost", () => {
    const a = new Calendar(dayjs("2026-05-24"));
    expect(a.isPentecost()).toBeTruthy();

    const b = new Calendar(dayjs("2026-01-07"));
    expect(b.isPentecost()).toBeFalsy();
  });

  test("should check to see if it's nativity of st. john the baptist", () => {
    const a = new Calendar(dayjs("2026-06-24"));
    expect(a.isNativityOfStJohnBaptist()).toBeTruthy();

    const b = new Calendar(dayjs("2026-01-07"));
    expect(b.isNativityOfStJohnBaptist()).toBeFalsy();
  });

  test("should check to see if it's feast of st. james", () => {
    const a = new Calendar(dayjs("2026-07-25"));
    expect(a.isFeastOfStJames()).toBeTruthy();

    const b = new Calendar(dayjs("2026-01-07"));
    expect(b.isFeastOfStJames()).toBeFalsy();
  });

  test("should check to see if it's feast of st. bartholomew", () => {
    const a = new Calendar(dayjs("2026-08-24"));
    expect(a.isFeastOfStBartholomew()).toBeTruthy();

    const b = new Calendar(dayjs("2026-01-07"));
    expect(b.isFeastOfStBartholomew()).toBeFalsy();
  });

  test("should check to see if it's feast of st. matthew", () => {
    const a = new Calendar(dayjs("2026-09-21"));
    expect(a.isFeastOfStMatthew()).toBeTruthy();

    const b = new Calendar(dayjs("2026-01-07"));
    expect(b.isFeastOfStMatthew()).toBeFalsy();
  });

  test("should check to see if it's feast of ss. simon and jude", () => {
    const a = new Calendar(dayjs("2026-10-28"));
    expect(a.isFeastOfSsSimonAndJude()).toBeTruthy();

    const b = new Calendar(dayjs("2026-01-07"));
    expect(b.isFeastOfSsSimonAndJude()).toBeFalsy();
  });

  test("should check to see if it's feast of st. andrew", () => {
    const a = new Calendar(dayjs("2025-11-30"));
    expect(a.isFeastOfStAndrew()).toBeTruthy();

    const b = new Calendar(dayjs("2026-01-07"));
    expect(b.isFeastOfStAndrew()).toBeFalsy();
  });

  test("should check to see if it's trinity sunday", () => {
    const a = new Calendar(dayjs("2026-05-31"));
    expect(a.isTrinitySunday()).toBeTruthy();

    const b = new Calendar(dayjs("2026-01-07"));
    expect(b.isTrinitySunday()).toBeFalsy();
  });

  test("should check to see if we're in eastertide", () => {
    const a = new Calendar(dayjs("2026-04-05"));
    expect(a.isEastertide()).toBeTruthy();

    const b = new Calendar(dayjs("2026-04-01"));
    expect(b.isEastertide()).toBeFalsy();
  });

  test("should check to see if we're in advent", () => {
    const a = new Calendar(dayjs("2025-11-30"));
    expect(a.isAdvent()).toBeTruthy();

    const b = new Calendar(dayjs("2026-04-01"));
    expect(b.isAdvent()).toBeFalsy();
  });

  test("should check to see if we're in christmastide", () => {
    const a = new Calendar(dayjs("2025-12-25"));
    expect(a.isChristmastide()).toBeTruthy();

    const b = new Calendar(dayjs("2026-04-01"));
    expect(b.isChristmastide()).toBeFalsy();
  });

  test("should check to see if we're in epiphanytide", () => {
    const a = new Calendar(dayjs("2026-01-06"));
    expect(a.isEpiphanytide()).toBeTruthy();

    const b = new Calendar(dayjs("2026-04-01"));
    expect(b.isEpiphanytide()).toBeFalsy();
  });

  test("should check to see if we're in pre-lent", () => {
    const a = new Calendar(dayjs("2026-02-01"));
    expect(a.isPreLent()).toBeTruthy();

    const b = new Calendar(dayjs("2026-02-17"));
    expect(b.isPreLent()).toBeTruthy();

    const c = new Calendar(dayjs("2026-02-18"));
    expect(c.isPreLent()).toBeFalsy();
  });

  test("should check to see if we're in lent", () => {
    const a = new Calendar(dayjs("2026-02-18"));
    expect(a.isLent()).toBeTruthy();

    const b = new Calendar(dayjs("2026-01-01"));
    expect(b.isLent()).toBeFalsy();
  });

  test("should check to see if we're in the octave of easter", () => {
    const a = new Calendar(dayjs("2026-04-05"));
    expect(a.isOctaveOfEaster()).toBeTruthy();

    const b = new Calendar(dayjs("2026-04-12"));
    expect(b.isOctaveOfEaster()).toBeTruthy();

    const c = new Calendar(dayjs("2026-04-13"));
    expect(c.isOctaveOfEaster()).toBeFalsy();
  });

  test("should check to see if it's a feast day", () => {
    const a = new Calendar(dayjs("2025-11-30"));
    expect(a.isFeastDay()).toBeTruthy();

    const b = new Calendar(dayjs("2025-12-01"));
    expect(b.isFeastDay()).toBeFalsy();
  });

  test("should check to see if it's a lord's day", () => {
    const a = new Calendar(dayjs("2025-12-07"));
    expect(a.isLordsDay()).toBeTruthy();

    const b = new Calendar(dayjs("2025-12-08"));
    expect(b.isLordsDay()).toBeFalsy();
  });

  test("should check to see if it's an eve", () => {
    const a = new Calendar(dayjs("2025-12-24"));
    expect(a.isEve()).toBeTruthy();

    const b = new Calendar(dayjs("2026-01-05"));
    expect(b.isEve()).toBeTruthy();

    const c = new Calendar(dayjs("2026-02-01"));
    expect(c.isEve()).toBeTruthy();

    const d = new Calendar(dayjs("2026-03-24"));
    expect(d.isEve()).toBeTruthy();

    const e = new Calendar(dayjs("2026-05-13"));
    expect(e.isEve()).toBeTruthy();

    const f = new Calendar(dayjs("2026-05-23"));
    expect(f.isEve()).toBeTruthy();

    const g = new Calendar(dayjs("2026-05-30"));
    expect(g.isEve()).toBeTruthy();

    const h = new Calendar(dayjs("2026-10-31"));
    expect(h.isEve()).toBeTruthy();

    const i = new Calendar(dayjs("2026-01-06"));
    expect(i.isEve()).toBeFalsy();
  });

  test("should check to see if it's transfiguration", () => {
    const a = new Calendar(dayjs("2026-08-06"));
    expect(a.isTransfiguration()).toBeTruthy();

    const b = new Calendar(dayjs("2025-12-08"));
    expect(b.isTransfiguration()).toBeFalsy();
  });

  test("should check to see if it's purification", () => {
    const a = new Calendar(dayjs("2026-02-02"));
    expect(a.isPurification()).toBeTruthy();

    const b = new Calendar(dayjs("2025-12-08"));
    expect(b.isPurification()).toBeFalsy();
  });

  test("should check to see if it's annunciation", () => {
    const a = new Calendar(dayjs("2026-03-25"));
    expect(a.isAnnunciation()).toBeTruthy();

    const b = new Calendar(dayjs("2025-12-08"));
    expect(b.isAnnunciation()).toBeFalsy();

    const c = new Calendar(dayjs("2024-04-08"));
    expect(c.isAnnunciation()).toBeTruthy();
  });

  test("should check to see if today is solemn", () => {
    const a = new Calendar(dayjs("2026-04-02"));
    expect(a.isSolemn()).toBeTruthy();

    const b = new Calendar(dayjs("2026-04-03"));
    expect(b.isSolemn()).toBeTruthy();

    const c = new Calendar(dayjs("2026-04-04"));
    expect(c.isSolemn()).toBeTruthy();

    const d = new Calendar(dayjs("2026-11-02"));
    expect(d.isSolemn()).toBeTruthy();

    const e = new Calendar(dayjs("2026-01-01"));
    expect(e.isSolemn()).toBeFalsy();

    const f = new Calendar(dayjs("2025-12-25"));
    expect(f.isSolemn()).toBeFalsy();
  });

  test("should check to see if today is the feast of a saint", () => {
    const a = new Calendar(dayjs("2025-11-30"));
    expect(a.isFeastOfASaint()).toBeFalsy();

    const b = new Calendar(dayjs("2025-12-06"));
    expect(b.isFeastOfASaint()).toBeTruthy();

    const c = new Calendar(dayjs("2025-12-13"));
    expect(c.isFeastOfASaint()).toBeTruthy();

    const d = new Calendar(dayjs("2025-12-07"));
    expect(d.isFeastOfASaint()).toBeFalsy();
  });

  test("should check to see if we're in Whitsuntide", () => {
    const a = new Calendar(dayjs("2026-05-24"));
    expect(a.isWhitsuntide()).toBeTruthy();

    const b = new Calendar(dayjs("2026-05-30"));
    expect(b.isWhitsuntide()).toBeTruthy();

    const c = new Calendar(dayjs("2026-05-31"));
    expect(c.isWhitsuntide()).toBeFalsy();
  });

  test("should check to see if we're in trinitytide", () => {
    const a = new Calendar(dayjs("2026-05-31"));
    expect(a.isTrinitytide()).toBeTruthy();

    const b = new Calendar(dayjs("2026-11-25"));
    expect(b.isTrinitytide()).toBeTruthy();

    const c = new Calendar(dayjs("2026-05-30"));
    expect(c.isTrinitytide()).toBeFalsy();
  });

  test("should check to see if it's a rogation day", () => {
    const a = new Calendar(dayjs("2026-05-11"));
    expect(a.isRogationDay()).toBeTruthy();

    const b = new Calendar(dayjs("2026-05-12"));
    expect(b.isRogationDay()).toBeTruthy();

    const c = new Calendar(dayjs("2026-05-13"));
    expect(c.isRogationDay()).toBeTruthy();

    const d = new Calendar(dayjs("2026-05-14"));
    expect(d.isRogationDay()).toBeFalsy();

    const e = new Calendar(dayjs("2026-05-10"));
    expect(e.isRogationDay()).toBeFalsy();
  });

  test("should check to see if we're in ascensiontide", () => {
    const a = new Calendar(dayjs("2026-05-14"));
    expect(a.isAscensiontide()).toBeTruthy();

    const b = new Calendar(dayjs("2026-05-23"));
    expect(b.isAscensiontide()).toBeTruthy();

    const c = new Calendar(dayjs("2026-05-24"));
    expect(c.isAscensiontide()).toBeFalsy();
  });

  test("should check to see if we're in holy week", () => {
    const a = new Calendar(dayjs("2026-04-03"));
    expect(a.isHolyWeek()).toBeTruthy();

    const b = new Calendar(dayjs("2026-04-04"));
    expect(b.isHolyWeek()).toBeTruthy();

    const c = new Calendar(dayjs("2026-04-05"));
    expect(c.isHolyWeek()).toBeFalsy();
  });

  test("should check to see if we're in septuagesima to passion sunday", () => {
    const a = new Calendar(dayjs("2026-02-01"));
    expect(a.isSeptuagesimaToPassion()).toBeTruthy();

    const b = new Calendar(dayjs("2026-03-22"));
    expect(b.isSeptuagesimaToPassion()).toBeTruthy();

    const c = new Calendar(dayjs("2026-03-25"));
    expect(c.isSeptuagesimaToPassion()).toBeFalsy();
  });

  test("should check to see if we're in septuagesima to easter (exclusive)", () => {
    const a = new Calendar(dayjs("2026-02-01"));
    expect(a.isSeptuagesimaToEaster()).toBeTruthy();

    const b = new Calendar(dayjs("2026-04-04"));
    expect(b.isSeptuagesimaToEaster()).toBeTruthy();

    const c = new Calendar(dayjs("2026-04-05"));
    expect(c.isSeptuagesimaToEaster()).toBeFalsy();
  });

  test("should check to see if it's holy innocents day", () => {
    const a = new Calendar(dayjs("2025-12-28"));
    expect(a.isHolyInnocents()).toBeTruthy();

    const b = new Calendar(dayjs("2025-12-08"));
    expect(b.isHolyInnocents()).toBeFalsy();
  });

  test("should get epiphany", () => {
    const a = new Calendar(dayjs("2025-11-30"));
    expect(a.getEpiphany().format("YYYY-MM-DD")).toBe("2026-01-06");
  });

  test("should check to see if it's the octave of epiphany", () => {
    const a = new Calendar(dayjs("2025-01-06"));
    expect(a.isOctaveOfEpiphany()).toBeTruthy();

    const b = new Calendar(dayjs("2025-01-13"));
    expect(b.isOctaveOfEpiphany()).toBeTruthy();

    const c = new Calendar(dayjs("2025-01-14"));
    expect(c.isOctaveOfEpiphany()).toBeFalsy();
  });

  test("should get the o antiphons", () => {
    const a = new Calendar(dayjs("2025-11-30"));
    const oa = a.getOAntiphons();
    expect(Object.keys(oa).length).toBe(7);
    expect(oa["2025-12-17"].title).toBe("O Sapientia");
    expect(oa["2025-12-18"].title).toBe("O Adonai");
    expect(oa["2025-12-19"].title).toBe("O Radix Jesse");
    expect(oa["2025-12-20"].title).toBe("O Clavis David");
    expect(oa["2025-12-21"].title).toBe("O Oriens");
    expect(oa["2025-12-22"].title).toBe("O Rex gentium");
    expect(oa["2025-12-23"].title).toBe("O Emmanuel");
  });

  test("should check if we're in the octave of christmas", () => {
    // Test during Christmas Day (start of octave)
    const christmasDay = new Calendar(dayjs("2025-12-25"));
    expect(christmasDay.isOctaveOfChristmas()).toBe(true);

    // Test during the octave (Dec 26-31)
    const boxingDay = new Calendar(dayjs("2025-12-26"));
    expect(boxingDay.isOctaveOfChristmas()).toBe(true);

    const newYearsEve = new Calendar(dayjs("2025-12-31"));
    expect(newYearsEve.isOctaveOfChristmas()).toBe(true);

    // Test on New Year's Day (last day of octave)
    const newYearsDay = new Calendar(dayjs("2026-01-01"));
    expect(newYearsDay.isOctaveOfChristmas()).toBe(true);

    // Test before Christmas
    const christmasEve = new Calendar(dayjs("2025-12-24"));
    expect(christmasEve.isOctaveOfChristmas()).toBe(false);

    // Test after the octave
    const afterOctave = new Calendar(dayjs("2026-01-02"));
    expect(afterOctave.isOctaveOfChristmas()).toBe(false);
  });

  test("should check if we're in the octave of pentecost", () => {
    // Test on Pentecost (start of octave)
    const pentecost = new Calendar(dayjs("2026-05-24"));
    expect(pentecost.isOctaveOfPentecost()).toBe(true);

    // Test during the octave (May 25-30)
    const whitsunMonday = new Calendar(dayjs("2026-05-25"));
    expect(whitsunMonday.isOctaveOfPentecost()).toBe(true);

    const midOctave = new Calendar(dayjs("2026-05-28"));
    expect(midOctave.isOctaveOfPentecost()).toBe(true);

    // Test on last day of octave (May 31)
    const lastDay = new Calendar(dayjs("2026-05-31"));
    expect(lastDay.isOctaveOfPentecost()).toBe(true);

    // Test before Pentecost
    const beforePentecost = new Calendar(dayjs("2026-05-23"));
    expect(beforePentecost.isOctaveOfPentecost()).toBe(false);

    // Test after the octave
    const afterOctave = new Calendar(dayjs("2026-06-01"));
    expect(afterOctave.isOctaveOfPentecost()).toBe(false);
  });

  test("should check if it's an ember day in whitsuntide", () => {
    // Test Ember Wednesday (3 days after Pentecost)
    const emberWednesday = new Calendar(dayjs("2026-05-27"));
    expect(emberWednesday.isEmberDayInWhitsuntide()).toBe(true);

    // Test Ember Friday (5 days after Pentecost)
    const emberFriday = new Calendar(dayjs("2026-05-29"));
    expect(emberFriday.isEmberDayInWhitsuntide()).toBe(true);

    // Test Ember Saturday (6 days after Pentecost)
    const emberSaturday = new Calendar(dayjs("2026-05-30"));
    expect(emberSaturday.isEmberDayInWhitsuntide()).toBe(true);

    // Test non-ember days
    const pentecost = new Calendar(dayjs("2026-05-24"));
    expect(pentecost.isEmberDayInWhitsuntide()).toBe(false);

    const whitsunMonday = new Calendar(dayjs("2026-05-25"));
    expect(whitsunMonday.isEmberDayInWhitsuntide()).toBe(false);

    const afterEmberDays = new Calendar(dayjs("2026-05-31"));
    expect(afterEmberDays.isEmberDayInWhitsuntide()).toBe(false);
  });
});
