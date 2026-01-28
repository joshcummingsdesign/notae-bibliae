import dayjs, { Dayjs } from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isBetween from "dayjs/plugin/isBetween";
import {
  AntiphonMap,
  CalendarItem,
  DateMap,
  FormattedSeasonItems,
  Season,
  SeasonItems,
  SeasonName,
} from "./types";
import calendarItems from "./calendar-items.json";
import { numberToWords } from "@/utils/numberToWords";
import { TIMEZONE } from "@/constants";
import { stripMarkdownLinks } from "@/utils/markdown";

dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);

export class Calendar {
  today: Dayjs;

  constructor(today?: Dayjs) {
    this.today = today || dayjs().tz(TIMEZONE);
  }

  /**
   * Get today's date.
   */
  getToday(): Dayjs {
    return this.today;
  }

  /**
   * Create a date in the same timezone as this.today for consistent comparisons.
   */
  private createDate(dateString: string): Dayjs {
    return dayjs.tz(dateString, TIMEZONE);
  }

  /**
   * Calculate the First Sunday of Advent for a given year.
   */
  calculateFirstSundayOfAdvent(year: number): Dayjs {
    // Start at December 1
    let dec1 = this.createDate(`${year}-12-01`);

    // Move forward to the first Thursday of December
    while (dec1.day() !== 4) {
      dec1 = dec1.add(1, "day");
    }

    // Advent starts on the Sunday before this Thursday
    return dec1.subtract(dec1.day(), "day"); // Go back to Sunday
  }

  /**
   * Get the liturgical year.
   */
  getLiturgicalYear(): number {
    const firstSundayOfAdvent = this.calculateFirstSundayOfAdvent(
      this.today.year(),
    );
    // If we're after the First Sunday of Advent,
    // then the liturgical year has started,
    // and the next calendar year is about to begin.
    // Add 1 year.
    if (this.today.isSameOrAfter(firstSundayOfAdvent, "day")) {
      return this.today.add(1, "year").year();
    }

    // Otherwise, the calendar year and liturgical year are the same.
    return this.today.year();
  }

  /**
   * Get the first Sunday of Advent.
   */
  getFirstSundayOfAdvent(): Dayjs {
    const calendarYear = this.today.year();
    // Get the current year's first sunday of advent
    let firstSundayOfAdvent = this.calculateFirstSundayOfAdvent(calendarYear);
    // This way, we can get the liturgical year
    const liturgicalYear = this.getLiturgicalYear();
    // If we are already in the liturgical year, we need last year's advent dates
    if (calendarYear === liturgicalYear) {
      firstSundayOfAdvent = this.calculateFirstSundayOfAdvent(
        liturgicalYear - 1,
      );
    }
    return firstSundayOfAdvent;
  }

  /**
   * Get next year's First Sunday of Advent.
   */
  getNextFirstSundayOfAdvent(): Dayjs {
    const liturgicalYear = this.getLiturgicalYear();
    return this.calculateFirstSundayOfAdvent(liturgicalYear);
  }

  /**
   * Get the fixed calendar items, sorted starting at the First Sunday of advent.
   */
  getFixedCalendarItems(): CalendarItem[] {
    const firstSundayOfAdvent = this.getFirstSundayOfAdvent();
    return calendarItems
      .map((item) => {
        const [mm, dd] = item.date.split("-");
        // Initial attempt: same year as start
        let fullDate = this.createDate(
          `${firstSundayOfAdvent.year()}-${mm}-${dd}`,
        );

        // If the date is before the starting date, bump to next year
        if (fullDate.isBefore(firstSundayOfAdvent, "day")) {
          fullDate = fullDate.add(1, "year");
        }

        return {
          ...item,
          date: fullDate.format("YYYY-MM-DD"),
        };
      })
      .sort((a, b) => a.date.localeCompare(b.date));
  }

  /**
   * Get all the Sundays in Advent.
   */
  getAdventSundays(): CalendarItem[] {
    const firstSundayOfAdvent = this.getFirstSundayOfAdvent();
    return [
      {
        date: firstSundayOfAdvent.format("YYYY-MM-DD"),
        title: "First Sunday of Advent",
        rank: 1,
        isSunday: true,
        isPrincipalSunday: true,
      },
      {
        date: firstSundayOfAdvent.add(1, "week").format("YYYY-MM-DD"),
        title: "Second Sunday of Advent",
        rank: 1,
        isSunday: true,
        isPrincipalSunday: true,
      },
      {
        date: firstSundayOfAdvent.add(2, "week").format("YYYY-MM-DD"),
        title:
          "Third Sunday of Advent: [Gaudete Sunday](/liturgy/liturgical-year/seasons/advent/gaudete-sunday)",
        rank: 1,
        isSunday: true,
        isPrincipalSunday: true,
      },
      {
        date: firstSundayOfAdvent.add(3, "week").format("YYYY-MM-DD"),
        title: "Fourth Sunday of Advent",
        rank: 1,
        isSunday: true,
        isPrincipalSunday: true,
      },
    ];
  }

  /**
   * Get the Ember Days in Advent.
   */
  getEmberDaysInAdvent(): CalendarItem[] {
    const liturgicalYear = this.getLiturgicalYear();
    const dec13 = this.createDate(`${liturgicalYear - 1}-12-13`);
    const daysUntilWednesday = (3 - dec13.day() + 7) % 7 || 7;
    const wednesdayAfter = dec13.add(daysUntilWednesday, "day");
    return [
      {
        date: wednesdayAfter.format("YYYY-MM-DD"),
        title:
          "[Ember Wednesday in Advent](/glossary/liturgical-terms#ember-days)",
        rank: 5,
        isSpecialObservance: true,
      },
      {
        date: wednesdayAfter.add(2, "day").format("YYYY-MM-DD"),
        title:
          "[Ember Friday in Advent](/glossary/liturgical-terms#ember-days)",
        rank: 5,
        isSpecialObservance: true,
      },
      {
        date: wednesdayAfter.add(3, "day").format("YYYY-MM-DD"),
        title:
          "[Ember Saturday in Advent](/glossary/liturgical-terms#ember-days)",
        rank: 5,
        isSpecialObservance: true,
      },
    ];
  }

  /**
   * Get all the Sundays in Christmastide.
   */
  getChristmastideSundays(): CalendarItem[] {
    const liturgicalYear = this.getLiturgicalYear();
    const calendarYear = liturgicalYear - 1;
    const christmas = this.createDate(`${calendarYear}-12-25`);
    const epiphany = this.createDate(`${liturgicalYear}-01-06`);

    const sundayAfterChristmas =
      christmas.day() === 0
        ? christmas.add(7, "day")
        : christmas.add(7 - christmas.day(), "day");

    const secondSundayAfterChristmas = sundayAfterChristmas.add(7, "day");

    const sundays: CalendarItem[] = [
      {
        date: sundayAfterChristmas.format("YYYY-MM-DD"),
        title: "First Sunday After Christmas",
        rank: 7,
        isSunday: true,
      },
    ];

    // Only include Second Sunday After Christmas if it falls before Epiphany
    if (secondSundayAfterChristmas.isBefore(epiphany, "day")) {
      sundays.push({
        date: secondSundayAfterChristmas.format("YYYY-MM-DD"),
        title: "Second Sunday After Christmas",
        rank: 7,
        isSunday: true,
      });
    }

    return sundays;
  }

  /**
   * Get Easter Sunday.
   */
  getEasterSunday(): Dayjs {
    const liturgicalYear = this.getLiturgicalYear();

    // Meeus/Jones/Butcher algorithm
    const f = Math.floor;
    const G = liturgicalYear % 19;
    const C = f(liturgicalYear / 100);
    const H = (C - f(C / 4) - f((8 * C + 13) / 25) + 19 * G + 15) % 30;
    const I = H - f(H / 28) * (1 - f(29 / (H + 1)) * f((21 - G) / 11));
    const J =
      (liturgicalYear + f(liturgicalYear / 4) + I + 2 - C + f(C / 4)) % 7;
    const L = I - J;
    const month = 3 + f((L + 40) / 44); // 3 = March
    const day = L + 28 - 31 * f(month / 4);
    return this.createDate(`${liturgicalYear}-${month}-${day}`);
  }

  /**
   * Get Ash Wednesday.
   */
  getAshWednesday(): Dayjs {
    const easter = this.getEasterSunday();
    return easter.subtract(46, "day");
  }

  /**
   * Get Septuagesima.
   */
  getSeptuagesima(): Dayjs {
    const easter = this.getEasterSunday();
    return easter.subtract(9, "week");
  }

  /**
   * Get Sexagesima.
   */
  getSexagesima(): Dayjs {
    const easter = this.getEasterSunday();
    return easter.subtract(8, "week");
  }

  /**
   * Get Quinquagesima.
   */
  getQuinquagesima(): Dayjs {
    const easter = this.getEasterSunday();
    return easter.subtract(7, "week");
  }

  /**
   * Get Epiphany.
   */
  getEpiphany(): Dayjs {
    const liturgicalYear = this.getLiturgicalYear();
    return this.createDate(`${liturgicalYear}-01-06`);
  }

  /**
   * Get all the Sundays in Epiphanytide.
   */
  getEpiphanytideSundays(): CalendarItem[] {
    const epiphany = this.getEpiphany();
    const septuagesima = this.getSeptuagesima();

    // First Sunday after Jan 6
    const firstSunday =
      epiphany.day() === 0
        ? epiphany.add(7, "day")
        : epiphany.add(7 - epiphany.day(), "day");

    const titles = [
      "First Sunday of Epiphany",
      "Second Sunday of Epiphany",
      "Third Sunday of Epiphany",
      "Fourth Sunday of Epiphany",
      "Fifth Sunday of Epiphany",
      "Sixth Sunday of Epiphany",
    ];

    const sundays: CalendarItem[] = [];
    for (let i = 0; i < titles.length; i++) {
      const sunday = firstSunday.add(i, "week");
      if (sunday.isSameOrAfter(septuagesima, "day")) break;
      sundays.push({
        date: sunday.format("YYYY-MM-DD"),
        title: titles[i],
        rank: 7,
        isSunday: true,
      });
    }

    return sundays;
  }

  /**
   * Get all the feast days in Pre-Lent.
   */
  getPreLentFeastDays(): CalendarItem[] {
    const septuagesima = this.getSeptuagesima();
    const sexagesima = this.getSexagesima();
    const quinquagesima = this.getQuinquagesima();
    return [
      {
        date: septuagesima.format("YYYY-MM-DD"),
        title:
          "[Septuagesima](/liturgy/liturgical-year/seasons/pre-lent/septuagesima)",
        rank: 1,
        isSunday: true,
        isPrincipalSunday: true,
      },
      {
        date: sexagesima.format("YYYY-MM-DD"),
        title:
          "[Sexagesima](/liturgy/liturgical-year/seasons/pre-lent/sexagesima)",
        rank: 1,
        isSunday: true,
        isPrincipalSunday: true,
      },
      {
        date: quinquagesima.format("YYYY-MM-DD"),
        title:
          "[Quinquagesima](/liturgy/liturgical-year/seasons/pre-lent/quinquagesima)",
        rank: 1,
        isSunday: true,
        isPrincipalSunday: true,
      },
    ];
  }

  /**
   * Get Passion Sunday.
   */
  getPassionSunday(): Dayjs {
    const ashWednesday = this.getAshWednesday();
    const firstSundayOfLent =
      ashWednesday.day() === 0
        ? ashWednesday.add(7, "day")
        : ashWednesday.add(7 - ashWednesday.day(), "day");

    // Passion Sunday is the Fifth Sunday of Lent
    return firstSundayOfLent.add(4, "week");
  }

  /**
   * Get Annunciation.
   */
  getAnnunciation(): Dayjs {
    const liturgicalYear = this.getLiturgicalYear();
    const easter = this.getEasterSunday();
    const march25 = this.createDate(`${liturgicalYear}-03-25`);

    // Holy Week: Palm Sunday to Holy Saturday
    const holyWeekStart = easter.subtract(7, "day"); // Palm Sunday
    const holyWeekEnd = easter.subtract(1, "day"); // Holy Saturday

    if (march25.isBetween(holyWeekStart, holyWeekEnd, "day", "[]")) {
      // If it falls in Holy Week, move to Monday after Second Sunday of Easter
      const secondSundayOfEaster = easter.add(7, "day");
      return secondSundayOfEaster.add(1, "day"); // Monday after
    }

    return march25;
  }

  /**
   * Get all the Sundays in Lent.
   */
  getLentSundays(): CalendarItem[] {
    const passionSunday = this.getPassionSunday();
    return [
      {
        date: passionSunday.subtract(4, "week").format("YYYY-MM-DD"),
        title: "First Sunday of Lent",
        rank: 1,
        isSunday: true,
        isPrincipalSunday: true,
      },
      {
        date: passionSunday.subtract(3, "week").format("YYYY-MM-DD"),
        title: "Second Sunday of Lent",
        rank: 1,
        isSunday: true,
        isPrincipalSunday: true,
      },
      {
        date: passionSunday.subtract(2, "week").format("YYYY-MM-DD"),
        title: "Third Sunday of Lent",
        rank: 1,
        isSunday: true,
        isPrincipalSunday: true,
      },
      {
        date: passionSunday.subtract(1, "week").format("YYYY-MM-DD"),
        title:
          "Fourth Sunday of Lent: [Laetare Sunday](/liturgy/liturgical-year/seasons/lent/laetare-sunday)",
        rank: 1,
        isSunday: true,
        isPrincipalSunday: true,
      },
      {
        date: passionSunday.format("YYYY-MM-DD"),
        title:
          "Fifth Sunday of Lent: [Passion Sunday](/liturgy/liturgical-year/seasons/lent/passiontide/passion-sunday)",
        rank: 1,
        isSunday: true,
        isPrincipalSunday: true,
      },
    ];
  }

  /**
   * Get the Ember Days in Lent.
   */
  getEmberDaysInLent(): CalendarItem[] {
    const passionSunday = this.getPassionSunday();
    const firstSundayOfLent = passionSunday.subtract(4, "week");
    const wednesdayAfter = firstSundayOfLent.add(3, "day");
    return [
      {
        date: wednesdayAfter.format("YYYY-MM-DD"),
        title:
          "[Ember Wednesday in Lent](/glossary/liturgical-terms#ember-days)",
        rank: 5,
        isSpecialObservance: true,
      },
      {
        date: wednesdayAfter.add(2, "day").format("YYYY-MM-DD"),
        title: "[Ember Friday in Lent](/glossary/liturgical-terms#ember-days)",
        rank: 5,
        isSpecialObservance: true,
      },
      {
        date: wednesdayAfter.add(3, "day").format("YYYY-MM-DD"),
        title:
          "[Ember Saturday in Lent](/glossary/liturgical-terms#ember-days)",
        rank: 5,
        isSpecialObservance: true,
      },
    ];
  }

  /**
   * Get all the days in Holy Week.
   */
  getHolyWeekDays(): CalendarItem[] {
    const easter = this.getEasterSunday();
    const holyWeekStart = easter.subtract(7, "day"); // Palm Sunday
    return [
      {
        date: holyWeekStart.format("YYYY-MM-DD"),
        title:
          "[Palm Sunday](/liturgy/liturgical-year/seasons/lent/passiontide/palm-sunday)",
        rank: 3,
        isSunday: true,
        isSpecialObservance: true,
      },
      {
        date: holyWeekStart.add(1, "day").format("YYYY-MM-DD"),
        title:
          "[Monday of Holy Week](/liturgy/liturgical-year/seasons/lent/passiontide/holy-monday)",
        rank: 3,
        isSpecialObservance: true,
      },
      {
        date: holyWeekStart.add(2, "day").format("YYYY-MM-DD"),
        title:
          "[Tuesday of Holy Week](/liturgy/liturgical-year/seasons/lent/passiontide/holy-tuesday)",
        rank: 3,
        isSpecialObservance: true,
      },
      {
        date: holyWeekStart.add(3, "day").format("YYYY-MM-DD"),
        title:
          "[Wednesday of Holy Week](/liturgy/liturgical-year/seasons/lent/passiontide/holy-wednesday)",
        rank: 3,
        isSpecialObservance: true,
      },
      {
        date: holyWeekStart.add(4, "day").format("YYYY-MM-DD"),
        title:
          "[Maundy Thursday](/liturgy/liturgical-year/seasons/lent/passiontide/maundy-thursday)",
        rank: 3,
        isSpecialObservance: true,
      },
      {
        date: holyWeekStart.add(5, "day").format("YYYY-MM-DD"),
        title:
          "[Good Friday](/liturgy/liturgical-year/seasons/lent/passiontide/good-friday)",
        rank: 3,
        isSpecialObservance: true,
      },
      {
        date: holyWeekStart.add(6, "day").format("YYYY-MM-DD"),
        title:
          "[Holy Saturday](/liturgy/liturgical-year/seasons/lent/passiontide/holy-saturday)",
        rank: 3,
        isSpecialObservance: true,
      },
      {
        date: holyWeekStart.add(6, "day").format("YYYY-MM-DD"),
        title:
          "[Easter Vigil](/liturgy/liturgical-year/seasons/eastertide/easter-vigil)",
        rank: 8,
        isVigil: true,
      },
    ];
  }

  /**
   * Get all the days in Lent.
   */
  getLentDays(): CalendarItem[] {
    const ashWednesday = this.getAshWednesday();
    const lentSundays = this.getLentSundays();
    const annunciation = this.getAnnunciation();
    const holyWeekDays = this.getHolyWeekDays();
    return [
      {
        date: ashWednesday.format("YYYY-MM-DD"),
        title:
          "[Ash Wednesday](/liturgy/liturgical-year/seasons/lent/ash-wednesday)",
        rank: 3,
        isSpecialObservance: true,
      },
      {
        date: ashWednesday.add(1, "day").format("YYYY-MM-DD"),
        title: "Thursday in Lent",
        rank: 3,
        isSpecialObservance: true,
      },
      {
        date: ashWednesday.add(2, "day").format("YYYY-MM-DD"),
        title: "Friday in Lent",
        rank: 3,
        isSpecialObservance: true,
      },
      {
        date: ashWednesday.add(3, "day").format("YYYY-MM-DD"),
        title: "Saturday in Lent",
        rank: 3,
        isSpecialObservance: true,
      },
      ...lentSundays,
      {
        date: annunciation.subtract(1, "day").format("YYYY-MM-DD"),
        title: "Vigil of the Annunciation",
        rank: 8,
        isVigil: true,
      },
      {
        date: annunciation.format("YYYY-MM-DD"),
        title:
          "[Annunciation of the Lord](/liturgy/liturgical-year/seasons/eastertide/annunciation)",
        rank: 2,
        isFeast: true,
        isPrincipalFeast: true,
      },
      ...holyWeekDays,
    ];
  }

  /**
   * Get Ascension Day.
   */
  getAscensionDay(): Dayjs {
    const easter = this.getEasterSunday();
    return easter.add(39, "day");
  }

  /**
   * Get all the days in Eastertide.
   */
  getEastertideDays(): CalendarItem[] {
    const easter = this.getEasterSunday();
    const ascension = this.getAscensionDay();
    return [
      {
        date: easter.format("YYYY-MM-DD"),
        title:
          "[Easter Day](/liturgy/liturgical-year/seasons/eastertide/easter-day)",
        rank: 2,
        isFeast: true,
        isPrincipalFeast: true,
        isSunday: true,
      },
      {
        date: easter.add(1, "day").format("YYYY-MM-DD"),
        title: "Monday of Easter Week",
        rank: 2,
        isPrincipalFeast: true,
      },
      {
        date: easter.add(2, "day").format("YYYY-MM-DD"),
        title: "Tuesday of Easter Week",
        rank: 2,
        isFeast: true,
        isPrincipalFeast: true,
      },
      {
        date: easter.add(3, "day").format("YYYY-MM-DD"),
        title: "Wednesday of Easter Week",
        rank: 2,
        isFeast: true,
        isPrincipalFeast: true,
      },
      {
        date: easter.add(4, "day").format("YYYY-MM-DD"),
        title: "Thursday of Easter Week",
        rank: 2,
        isFeast: true,
        isPrincipalFeast: true,
      },
      {
        date: easter.add(5, "day").format("YYYY-MM-DD"),
        title: "Friday of Easter Week",
        rank: 2,
        isFeast: true,
        isPrincipalFeast: true,
      },
      {
        date: easter.add(6, "day").format("YYYY-MM-DD"),
        title: "Saturday of Easter Week",
        rank: 2,
        isFeast: true,
        isPrincipalFeast: true,
      },
      {
        date: easter.add(7, "day").format("YYYY-MM-DD"),
        title:
          "[Second Sunday of Easter](/liturgy/liturgical-year/seasons/eastertide/second-sunday-of-easter)",
        rank: 2,
        isFeast: true,
        isPrincipalFeast: true,
        isSunday: true,
      },
      {
        date: easter.add(14, "day").format("YYYY-MM-DD"),
        title: "Third Sunday of Easter",
        rank: 7,
        isSunday: true,
      },
      {
        date: easter.add(21, "day").format("YYYY-MM-DD"),
        title: "Fourth Sunday of Easter",
        rank: 7,
        isSunday: true,
      },
      {
        date: easter.add(28, "day").format("YYYY-MM-DD"),
        title: "Fifth Sunday of Easter",
        rank: 7,
        isSunday: true,
      },
      {
        date: easter.add(35, "day").format("YYYY-MM-DD"),
        title:
          "Sixth Sunday of Easter: [Rogation Sunday](/glossary/liturgical-terms#rogation-days)",
        rank: 7,
        isSunday: true,
        isPrincipalSunday: true,
      },
      {
        date: ascension.subtract(3, "day").format("YYYY-MM-DD"),
        title: "[Rogation Monday](/glossary/liturgical-terms#rogation-days)",
        rank: 5,
        isSpecialObservance: true,
      },
      {
        date: ascension.subtract(2, "day").format("YYYY-MM-DD"),
        title: "[Rogation Tuesday](/glossary/liturgical-terms#rogation-days)",
        rank: 5,
        isSpecialObservance: true,
      },
      {
        date: ascension.subtract(1, "day").format("YYYY-MM-DD"),
        title: "[Rogation Wednesday](/glossary/liturgical-terms#rogation-days)",
        rank: 5,
        isSpecialObservance: true,
      },
      {
        date: ascension.subtract(1, "day").format("YYYY-MM-DD"),
        title: "Vigil of the Ascension",
        rank: 8,
        isVigil: true,
      },
      {
        date: ascension.format("YYYY-MM-DD"),
        title:
          "[Ascension Day](/liturgy/liturgical-year/seasons/eastertide/ascensiontide/ascension-day)",
        rank: 2,
        isFeast: true,
        isPrincipalFeast: true,
      },
      {
        date: easter.add(42, "day").format("YYYY-MM-DD"),
        title: "Seventh Sunday of Easter (Sunday After Ascension Day)",
        rank: 1,
        isSunday: true,
        isPrincipalSunday: true,
      },
    ];
  }

  /**
   * Get Pentecost (Whitsunday).
   */
  getPentecost(): Dayjs {
    const easter = this.getEasterSunday();
    return easter.add(49, "day");
  }

  /**
   * Get all the days in Whitsuntide.
   */
  getWhitsuntideDays(): CalendarItem[] {
    const easter = this.getEasterSunday();
    const pentecost = this.getPentecost();
    return [
      {
        date: pentecost.subtract(1, "day").format("YYYY-MM-DD"),
        title: "Vigil of Pentecost (Whitsunday)",
        rank: 8,
        isVigil: true,
      },
      {
        date: pentecost.format("YYYY-MM-DD"),
        title:
          "[Pentecost (Whitsunday)](/liturgy/liturgical-year/seasons/whitsuntide/pentecost)",
        rank: 2,
        isFeast: true,
        isPrincipalFeast: true,
        isSunday: true,
      },
      {
        date: easter.add(50, "day").format("YYYY-MM-DD"),
        title: "Monday in Whitsuntide",
        rank: 2,
        isFeast: true,
        isPrincipalFeast: true,
      },
      {
        date: easter.add(51, "day").format("YYYY-MM-DD"),
        title: "Tuesday in Whitsuntide",
        rank: 2,
        isFeast: true,
        isPrincipalFeast: true,
      },
      {
        date: easter.add(53, "day").format("YYYY-MM-DD"),
        title: "Thursday in Whitsuntide",
        rank: 2,
        isFeast: true,
        isPrincipalFeast: true,
      },
    ];
  }

  /**
   * Get the Ember Days in Whitsuntide.
   */
  getEmberDaysInWhitsuntide(): CalendarItem[] {
    const pentecost = this.getPentecost();
    const wednesdayAfter = pentecost.add(3, "day");
    return [
      {
        date: wednesdayAfter.format("YYYY-MM-DD"),
        title:
          "[Ember Wednesday in Whitsuntide](/glossary/liturgical-terms#ember-days)",
        rank: 5,
        isSpecialObservance: true,
      },
      {
        date: wednesdayAfter.add(2, "day").format("YYYY-MM-DD"),
        title:
          "[Ember Friday in Whitsuntide](/glossary/liturgical-terms#ember-days)",
        rank: 5,
        isSpecialObservance: true,
      },
      {
        date: wednesdayAfter.add(3, "day").format("YYYY-MM-DD"),
        title:
          "[Ember Saturday in Whitsuntide](/glossary/liturgical-terms#ember-days)",
        rank: 5,
        isSpecialObservance: true,
      },
    ];
  }

  /**
   * Get Trinity Sunday.
   */
  getTrinitySunday(): Dayjs {
    const easter = this.getEasterSunday();
    return easter.add(56, "day");
  }

  /**
   * Get Corpus Christi.
   */
  getCorpusChristi(): Dayjs {
    const trinitySunday = this.getTrinitySunday();
    return trinitySunday.add(4, "day");
  }

  /**
   * Get Christ the King.
   */
  getChristTheKing(): Dayjs {
    const nextFirstSundayOfAdvent = this.getNextFirstSundayOfAdvent();
    return nextFirstSundayOfAdvent.subtract(7, "day");
  }

  /**
   * Get all the days in Trinitytide.
   */
  getTrinitytideDays(): CalendarItem[] {
    const trinitySunday = this.getTrinitySunday();
    const corpusChristi = this.getCorpusChristi();
    const christTheKing = this.getChristTheKing();
    const days: CalendarItem[] = [];

    // Generate Sundays after Trinity until Sunday Before Advent
    for (let i = 0; i < 26; i++) {
      const sunday = trinitySunday.add(i * 7, "day");
      if (sunday.isSameOrAfter(christTheKing, "day")) break;
      const title =
        i === 0
          ? "[Trinity Sunday](/liturgy/liturgical-year/seasons/trinitytide/trinity-sunday)"
          : `${numberToWords(i)} Sunday After Trinity`;
      const rank = i === 0 ? 2 : 7;
      const isFeast = i === 0;
      const isPrincipalFeast = i === 0;

      days.push({
        date: sunday.format("YYYY-MM-DD"),
        title,
        rank,
        isFeast,
        isPrincipalFeast,
        isSunday: true,
      });
    }

    days.push({
      date: trinitySunday.subtract(1, "day").format("YYYY-MM-DD"),
      title: "Vigil of Trinity Sunday",
      rank: 8,
      isVigil: true,
    });

    days.push({
      date: corpusChristi.format("YYYY-MM-DD"),
      title:
        "[Corpus Christi](/liturgy/liturgical-year/seasons/trinitytide/corpus-christi)",
      rank: 4,
      isFeast: true,
    });

    days.push({
      date: christTheKing.format("YYYY-MM-DD"),
      title: "Sunday Before Advent",
      rank: 7,
      isSunday: true,
    });

    return days;
  }

  /**
   * Get the Ember Days in Trinitytide.
   */
  getEmberDaysInTrinitytide(): CalendarItem[] {
    const liturgicalYear = this.getLiturgicalYear();
    const sep14 = this.createDate(`${liturgicalYear}-09-14`);
    const daysUntilWednesday = (3 - sep14.day() + 7) % 7 || 7;
    const wednesdayAfter = sep14.add(daysUntilWednesday, "day");
    return [
      {
        date: wednesdayAfter.format("YYYY-MM-DD"),
        title:
          "[Ember Wednesday in Trinitytide](/glossary/liturgical-terms#ember-days)",
        rank: 5,
        isSpecialObservance: true,
      },
      {
        date: wednesdayAfter.add(2, "day").format("YYYY-MM-DD"),
        title:
          "[Ember Friday in Trinitytide](/glossary/liturgical-terms#ember-days)",
        rank: 5,
        isSpecialObservance: true,
      },
      {
        date: wednesdayAfter.add(3, "day").format("YYYY-MM-DD"),
        title:
          "[Ember Saturday in Trinitytide](/glossary/liturgical-terms#ember-days)",
        rank: 5,
        isSpecialObservance: true,
      },
    ];
  }

  /**
   * Get all the liturgical seasons for the year.
   */
  getSeasons(): Season[] {
    const firstSundayOfAdvent = this.getFirstSundayOfAdvent();
    const liturgicalYear = this.getLiturgicalYear();
    const septuagesima = this.getSeptuagesima();
    const ashWednesday = this.getAshWednesday();
    const easterSunday = this.getEasterSunday();
    const nextYearsFirstSundayOfAdvent = this.getNextFirstSundayOfAdvent();
    return [
      {
        name: "Advent",
        start: firstSundayOfAdvent.format("YYYY-MM-DD"),
        end: `${liturgicalYear - 1}-12-24`,
      },
      {
        name: "Christmastide",
        start: `${liturgicalYear - 1}-12-25`,
        end: `${liturgicalYear}-01-05`,
      },
      {
        name: "Epiphanytide",
        start: `${liturgicalYear}-01-06`,
        end: septuagesima.subtract(1, "day").format("YYYY-MM-DD"),
      },
      {
        name: "Pre-Lent",
        start: septuagesima.format("YYYY-MM-DD"),
        end: ashWednesday.subtract(1, "day").format("YYYY-MM-DD"),
      },
      {
        name: "Lent",
        start: ashWednesday.format("YYYY-MM-DD"),
        end: easterSunday.subtract(1, "day").format("YYYY-MM-DD"),
      },
      {
        name: "Eastertide",
        start: easterSunday.format("YYYY-MM-DD"),
        end: easterSunday.add(48, "day").format("YYYY-MM-DD"),
      },
      {
        name: "Whitsuntide",
        start: easterSunday.add(49, "day").format("YYYY-MM-DD"),
        end: easterSunday.add(55, "day").format("YYYY-MM-DD"),
      },
      {
        name: "Trinitytide",
        start: easterSunday.add(56, "day").format("YYYY-MM-DD"),
        end: nextYearsFirstSundayOfAdvent
          .subtract(1, "day")
          .format("YYYY-MM-DD"),
      },
    ];
  }

  /**
   * Query the calendar items, sorted by date.
   */
  queryCalendarItems(): CalendarItem[] {
    return [
      ...this.getFixedCalendarItems(),
      ...this.getAdventSundays(),
      ...this.getEmberDaysInAdvent(),
      ...this.getChristmastideSundays(),
      ...this.getEpiphanytideSundays(),
      ...this.getPreLentFeastDays(),
      ...this.getLentDays(),
      ...this.getEmberDaysInLent(),
      ...this.getEastertideDays(),
      ...this.getWhitsuntideDays(),
      ...this.getEmberDaysInWhitsuntide(),
      ...this.getTrinitytideDays(),
      ...this.getEmberDaysInTrinitytide(),
    ].sort((a, b) => {
      const dateCompare = a.date.localeCompare(b.date);
      if (dateCompare !== 0) return dateCompare;
      const rankCompare = a.rank - b.rank;
      if (rankCompare !== 0) return rankCompare;
      return (b.isSunday ? 1 : 0) - (a.isSunday ? 1 : 0);
    });
  }

  /**
   * Get all calendar items with optional ranking.
   */
  getAll(rank: boolean = true): DateMap {
    const items = this.queryCalendarItems();

    // Group by date
    const grouped: DateMap = items.reduce<DateMap>((acc, item) => {
      (acc[item.date] ??= []).push(item);
      return acc;
    }, {});

    // If filter not applied, return as-is
    if (!rank) return grouped;

    // Transfer non-principal feasts that are displaced by rank 1-3 items
    // (principal feasts like Annunciation handle their own displacement)
    const sortedDates = Object.keys(grouped).sort();
    const hasHighRank = (dateItems: CalendarItem[]) =>
      dateItems.some((item) => item.rank <= 3);
    const isDisplaceable = (item: CalendarItem) =>
      item.isFeast && !item.isPrincipalFeast;

    for (const date of sortedDates) {
      const dateItems = grouped[date];
      if (hasHighRank(dateItems)) {
        const displaced = dateItems.filter(isDisplaceable);
        grouped[date] = dateItems.filter((item) => !isDisplaceable(item));

        for (const item of displaced) {
          let nextDate = this.createDate(date).add(1, "day");
          while (true) {
            const dateStr = nextDate.format("YYYY-MM-DD");
            const nextDateItems = grouped[dateStr] || [];
            if (!hasHighRank(nextDateItems)) {
              (grouped[dateStr] ??= []).push(item);
              break;
            }
            nextDate = nextDate.add(1, "day");
          }
        }
      }
    }

    // Apply ranking: 1-6 show highest only, 7-9 always show
    // Sort entries by date since transfers may have added new dates
    return Object.entries(grouped)
      .sort(([a], [b]) => a.localeCompare(b))
      .reduce<DateMap>((acc, [date, items]) => {
        const hasPrincipalFeast = items.some((a) => a.rank === 2);

        // Ranks 7-9 always show (Sunday, Vigil, Note)
        // But Sundays (rank 7) don't show on Principal Feasts
        const alwaysShow = items.filter((a) => {
          if (a.rank === 7 && a.isSunday && hasPrincipalFeast) return false;
          return a.rank >= 7;
        });

        // From ranks 1-6, show only the highest ranked
        const ranked = items
          .filter((a) => a.rank <= 6)
          .sort((a, b) => a.rank - b.rank);
        const topRanked = ranked.length ? [ranked[0]] : [];

        acc[date] = [...topRanked, ...alwaysShow].sort((a, b) => {
          // Sundays (rank 7) come before saints (rank 6) in display order
          if (a.rank === 7 && b.rank === 6) return -1;
          if (a.rank === 6 && b.rank === 7) return 1;
          return a.rank - b.rank;
        });

        return acc;
      }, {});
  }

  getAllSundays(): Record<string, string> {
    const events = this.getAll(false);
    return Object.entries(events).reduce<Record<string, string>>(
      (acc, [date, items]) => {
        const sunday = items
          .filter((item) => item.isSunday)
          .reduce<CalendarItem | null>(
            (lowest, item) =>
              lowest === null || item.rank < lowest.rank ? item : lowest,
            null,
          );
        if (sunday) {
          acc[date] = stripMarkdownLinks(sunday.title);
        }
        return acc;
      },
      {},
    );
  }

  /**
   * Get calendar items by date with optional ranking.
   */
  getByDate(
    date: string = this.today.format("YYYY-MM-DD"),
    rank: boolean = true,
  ): CalendarItem[] {
    const all = this.getAll(rank);
    return all[date] || [];
  }

  /**
   * Get calendar items by season with optional ranking.
   */
  getBySeason(
    seasonName: SeasonName,
    rank: boolean = true,
    items?: DateMap,
    stripHtml?: boolean,
  ): DateMap {
    const season = this.getSeasons().find(
      (season) => season.name === seasonName,
    )!;
    const all = items || this.getAll(rank);
    return Object.entries(all).reduce<DateMap>((acc, [date, items]) => {
      if (
        this.createDate(date).isBetween(
          this.createDate(season.start),
          this.createDate(season.end),
          "day",
          "[]",
        )
      ) {
        acc[date] = stripHtml
          ? items.map((item) => ({
              ...item,
              title: stripMarkdownLinks(item.title),
            }))
          : items;
      }
      return acc;
    }, {});
  }

  /**
   * Get the current season.
   */
  getCurrentSeason(): SeasonName {
    const seasons = this.getSeasons();
    return seasons.find((season) =>
      this.today.isBetween(
        this.createDate(season.start),
        this.createDate(season.end),
        "day",
        "[]",
      ),
    )!.name;
  }

  /**
   * Get all items sorted by season.
   */
  getSeasonItems(stripHtml?: boolean): SeasonItems {
    const seasons = this.getSeasons();
    const all = this.getAll();
    return seasons.reduce<SeasonItems>((acc, season) => {
      acc[season.name] = this.getBySeason(season.name, true, all, stripHtml);
      return acc;
    }, {} as SeasonItems);
  }

  /**
   * Get formatted items sorted by season.
   */
  getFormattedSeasonItems(): FormattedSeasonItems {
    const all = this.getSeasonItems();
    return Object.entries(all).reduce<FormattedSeasonItems>(
      (acc, [season, dateMap]) => {
        acc[season as SeasonName] = Object.entries(dateMap).map(
          ([date, items]) =>
            `${this.createDate(date).format("MMMM D")} — ${items
              .map((i) => i.title)
              .join(" — ")}`,
        );
        return acc;
      },
      {} as FormattedSeasonItems,
    );
  }

  /**
   * Return a formatted string that represents the current day.
   */
  getCurrentDayString(): string {
    const currentSeason = this.getCurrentSeason();
    const currentDay = this.getByDate();
    const dateString = this.today.format("MMMM D");
    const dayString = currentDay.map((i) => i.title).join(" — ");
    return [currentSeason, dateString, dayString]
      .filter((i) => !!i)
      .join(" — ");
  }

  /**
   * Check to see if today is Christmas.
   */
  isChristmas(): boolean {
    const year = this.today.year();
    return this.today.isSame(this.createDate(`${year}-12-25`), "day");
  }

  /**
   * Check to see if today is Epiphany.
   */
  isEpiphany(): boolean {
    const year = this.today.year();
    return this.today.isSame(this.createDate(`${year}-01-06`), "day");
  }

  /**
   * Check to see if today is Easter.
   */
  isEaster(): boolean {
    const easter = this.getEasterSunday();
    return this.today.isSame(easter, "day");
  }

  /**
   * Check to see if today is Ascension.
   */
  isAscension(): boolean {
    const ascension = this.getAscensionDay();
    return this.today.isSame(ascension, "day");
  }

  /**
   * Check to see if today is Pentecost.
   */
  isPentecost(): boolean {
    const pentecost = this.getPentecost();
    return this.today.isSame(pentecost, "day");
  }

  /**
   * Check to see if today is the Nativity of St. John the Baptist.
   */
  isNativityOfStJohnBaptist(): boolean {
    const year = this.today.year();
    return this.today.isSame(this.createDate(`${year}-06-24`), "day");
  }

  /**
   * Check to see if today is the feast of St. James.
   */
  isFeastOfStJames(): boolean {
    const year = this.today.year();
    return this.today.isSame(this.createDate(`${year}-07-25`), "day");
  }

  /**
   * Check to see if today is the feast of St. Bartholomew.
   */
  isFeastOfStBartholomew(): boolean {
    const year = this.today.year();
    return this.today.isSame(this.createDate(`${year}-08-24`), "day");
  }

  /**
   * Check to see if today is the feast of St. Matthew.
   */
  isFeastOfStMatthew(): boolean {
    const year = this.today.year();
    return this.today.isSame(this.createDate(`${year}-09-21`), "day");
  }

  /**
   * Check to see if today is the feast of Ss. Simon and Jude.
   */
  isFeastOfSsSimonAndJude(): boolean {
    const year = this.today.year();
    return this.today.isSame(this.createDate(`${year}-10-28`), "day");
  }

  /**
   * Check to see if today is the feast of St. Andrew.
   */
  isFeastOfStAndrew(): boolean {
    const year = this.today.year();
    return this.today.isSame(this.createDate(`${year}-11-30`), "day");
  }

  /**
   * Check to see if today is Trinity Sunday.
   */
  isTrinitySunday(): boolean {
    const trinitySunday = this.getTrinitySunday();
    return this.today.isSame(trinitySunday, "day");
  }

  /**
   * Check to see if we're in Eastertide.
   */
  isEastertide(): boolean {
    const seasons = this.getSeasons();

    const eastertide = seasons.find((s) => s.name === "Eastertide");

    return (
      !!eastertide &&
      this.today.isSameOrAfter(eastertide.start, "day") &&
      this.today.isSameOrBefore(eastertide.end, "day")
    );
  }

  /**
   * Check to see if we're in Advent.
   */
  isAdvent(): boolean {
    const seasons = this.getSeasons();

    const advent = seasons.find((s) => s.name === "Advent");

    return (
      !!advent &&
      this.today.isSameOrAfter(advent.start, "day") &&
      this.today.isSameOrBefore(advent.end, "day")
    );
  }

  /**
   * Check to see if we're in Christmastide.
   */
  isChristmastide(): boolean {
    const seasons = this.getSeasons();

    const christmastide = seasons.find((s) => s.name === "Christmastide");

    return (
      !!christmastide &&
      this.today.isSameOrAfter(christmastide.start, "day") &&
      this.today.isSameOrBefore(christmastide.end, "day")
    );
  }

  /**
   * Check to see if we're in Epiphanytide.
   */
  isEpiphanytide(): boolean {
    const seasons = this.getSeasons();

    const epiphanytide = seasons.find((s) => s.name === "Epiphanytide");

    return (
      !!epiphanytide &&
      this.today.isSameOrAfter(epiphanytide.start, "day") &&
      this.today.isSameOrBefore(epiphanytide.end, "day")
    );
  }

  /**
   * Check to see if we're in Pre-Lent.
   */
  isPreLent(): boolean {
    const seasons = this.getSeasons();

    const preLent = seasons.find((s) => s.name === "Pre-Lent");

    return (
      !!preLent &&
      this.today.isSameOrAfter(preLent.start, "day") &&
      this.today.isSameOrBefore(preLent.end, "day")
    );
  }

  /**
   * Check to see if we're in Lent.
   */
  isLent(): boolean {
    const seasons = this.getSeasons();

    const lent = seasons.find((s) => s.name === "Lent");

    return (
      !!lent &&
      this.today.isSameOrAfter(lent.start, "day") &&
      this.today.isSameOrBefore(lent.end, "day")
    );
  }

  /**
   * Check to see if we're in Whitsuntide.
   */
  isWhitsuntide(): boolean {
    const seasons = this.getSeasons();

    const whitsundtide = seasons.find((s) => s.name === "Whitsuntide");

    return (
      !!whitsundtide &&
      this.today.isSameOrAfter(whitsundtide.start, "day") &&
      this.today.isSameOrBefore(whitsundtide.end, "day")
    );
  }

  /**
   * Check to see if we're in Trinitytide.
   */
  isTrinitytide(): boolean {
    const seasons = this.getSeasons();

    const trinitytide = seasons.find((s) => s.name === "Trinitytide");

    return (
      !!trinitytide &&
      this.today.isSameOrAfter(trinitytide.start, "day") &&
      this.today.isSameOrBefore(trinitytide.end, "day")
    );
  }

  /**
   * Check to see if it's a Rogation Day.
   */
  isRogationDay(): boolean {
    const ascension = this.getAscensionDay();
    return (
      this.today.isSame(ascension.subtract(3, "day"), "day") ||
      this.today.isSame(ascension.subtract(2, "day"), "day") ||
      this.today.isSame(ascension.subtract(1, "day"), "day")
    );
  }

  /**
   * Check to see if it's an Ember Day in Whitsuntide.
   */
  isEmberDayInWhitsuntide(): boolean {
    const pentecost = this.getPentecost();
    const wednesdayAfter = pentecost.add(3, "day");
    return (
      this.today.isSame(wednesdayAfter, "day") ||
      this.today.isSame(wednesdayAfter.add(2, "day"), "day") ||
      this.today.isSame(wednesdayAfter.add(3, "day"), "day")
    );
  }

  /**
   * Check to see if we're in Ascensiontide.
   */
  isAscensiontide(): boolean {
    const easter = this.getEasterSunday();
    return (
      this.today.isSameOrAfter(easter.add(39, "day"), "day") &&
      this.today.isSameOrBefore(easter.add(48, "day"), "day")
    );
  }

  /**
   * Check to see if we're in the Octave of Christmas.
   */
  isOctaveOfChristmas(): boolean {
    const christmas = this.createDate(`${this.getLiturgicalYear() - 1}-12-25`);
    return (
      this.today.isSameOrAfter(christmas, "day") &&
      this.today.isSameOrBefore(christmas.add(7, "day"), "day")
    );
  }

  /**
   * Check to see if we're in the Octave of Epiphany.
   */
  isOctaveOfEpiphany(): boolean {
    const epiphany = this.getEpiphany();
    return (
      this.today.isSameOrAfter(epiphany, "day") &&
      this.today.isSameOrBefore(epiphany.add(7, "day"), "day")
    );
  }

  /**
   * Check to see if we're in the Octave of Easter.
   */
  isOctaveOfEaster(): boolean {
    const easter = this.getEasterSunday();
    return (
      this.today.isSameOrAfter(easter, "day") &&
      this.today.isSameOrBefore(easter.add(7, "day"), "day")
    );
  }

  /**
   * Check to see if we're in the Octave of Pentecost.
   */
  isOctaveOfPentecost(): boolean {
    const pentecost = this.getPentecost();
    return (
      this.today.isSameOrAfter(pentecost, "day") &&
      this.today.isSameOrBefore(pentecost.add(7, "day"), "day")
    );
  }

  /**
   * Check to see if we're in Holy Week.
   */
  isHolyWeek(date: Dayjs = this.today): boolean {
    const easter = this.getEasterSunday();
    const holyWeekStart = easter.subtract(7, "day");
    const holyWeekEnd = easter.subtract(1, "day");
    return (
      date.isSameOrAfter(holyWeekStart, "day") &&
      date.isSameOrBefore(holyWeekEnd, "day")
    );
  }

  /**
   * Check to see if we're in the time between Septuagesima and Passion Sunday.
   */
  isSeptuagesimaToPassion(): boolean {
    const septuagesima = this.getSeptuagesima();
    const passionSunday = this.getPassionSunday();
    return (
      this.today.isSameOrAfter(septuagesima, "day") &&
      this.today.isSameOrBefore(passionSunday, "day")
    );
  }

  /**
   * Check to see if we're in the time between Septuagesima and Easter (exclusive).
   */
  isSeptuagesimaToEaster(): boolean {
    const septuagesima = this.getSeptuagesima();
    const easter = this.getEasterSunday();
    return (
      this.today.isSameOrAfter(septuagesima, "day") &&
      this.today.isBefore(easter, "day")
    );
  }

  /**
   * Check to see if it's a feast day.
   */
  isFeastDay(): boolean {
    const items = this.getByDate();
    return items.some((item) => item.isFeast);
  }

  /**
   * Check to see if it's a Vigil (First Vespers of a Principal Feast).
   */
  isVigil(): boolean {
    const items = this.getByDate();
    return items.some((item) => item.isVigil);
  }

  /**
   * Check to see if it's a Lord's Day (Sunday).
   */
  isLordsDay(): boolean {
    return this.today.day() === 0;
  }

  /**
   * Check to see if it's Transfiguration.
   */
  isTransfiguration(): boolean {
    const year = this.today.year();
    return this.today.isSame(this.createDate(`${year}-08-06`), "day");
  }

  /**
   * Check to see if it's Purification.
   */
  isPurification(): boolean {
    const year = this.today.year();
    return this.today.isSame(this.createDate(`${year}-02-02`), "day");
  }

  /**
   * Check to see if it's Annunciation.
   */
  isAnnunciation(): boolean {
    const annunciation = this.getAnnunciation();
    return this.today.isSame(annunciation, "day");
  }

  /**
   * Check to see if it's Holy Innocents' Day.
   */
  isHolyInnocents(): boolean {
    const year = this.today.year();
    return this.today.isSame(this.createDate(`${year}-12-28`), "day");
  }

  /**
   * Check to see if it's a solemn day.
   *
   * A solemn day includes:
   *
   * Maundy Thursday, Good Friday, Holy Saturday, All Souls' Day.
   */
  isSolemn(): boolean {
    const dayString = this.getCurrentDayString();
    return [
      "Maundy Thursday",
      "Good Friday",
      "Holy Saturday",
      "All Souls' Day",
    ].some((day) => dayString.includes(day));
  }

  /**
   * Check to see if it's the feast of a saint.
   */
  isFeastOfASaint(): boolean {
    const currentDay = this.getByDate();
    return currentDay.some((item) => item.isFeast && item.isSaint);
  }

  /**
   * Check to see if it's the commemoration of a saint.
   */
  isSaintDay(): boolean {
    const currentDay = this.getByDate();
    return currentDay.length > 0 && !!currentDay[0].isSaint;
  }

  /**
   * Get the O Antiphons.
   */
  getOAntiphons(): AntiphonMap {
    const year = this.getLiturgicalYear() - 1;
    return {
      [`${year}-12-17`]: {
        title: "O Sapientia",
        text: "O come, thou Wisdom from on high,\nWho orderest all things mightily;\nTo us the path of knowledge show,\nAnd teach us in her ways to go.\nRejoice! Rejoice! Emmanuel\nShall come to thee, O Israel!",
        link: "/liturgy/music/chants/o-sapientia",
        verse: "Isaiah 11:2",
      },
      [`${year}-12-18`]: {
        title: "O Adonai",
        text: "O come, O come, thou Lord of Might;\nWho to thy tribes, on Sinai's height,\nIn ancient times didst give the law,\nIn cloud, and majesty, and awe.\nRejoice! Rejoice! Emmanuel\nShall come to thee, O Israel!",
        link: "/liturgy/music/chants/o-adonai",
        verse: "Isaiah 33:22",
      },
      [`${year}-12-19`]: {
        title: "O Radix Jesse",
        text: "O come, thou Rod of Jesse, free\nThine own from Satan's tyranny;\nFrom depths of hell thy people save,\nAnd give them victory o'er the grave.\nRejoice! Rejoice! Emmanuel\nShall come to thee, O Israel!",
        link: "/liturgy/music/chants/o-radix-jesse",
        verse: "Isaiah 11:10",
      },
      [`${year}-12-20`]: {
        title: "O Clavis David",
        text: "O come, thou Key of David, come\nAnd open wide our heavenly home;\nMake safe the way that leads on high,\nAnd close the path to misery.\nRejoice! Rejoice! Emmanuel\nShall come to thee, O Israel!",
        link: "/liturgy/music/chants/o-clavis-david",
        verse: "Isaiah 22:22",
      },
      [`${year}-12-21`]: {
        title: "O Oriens",
        text: "O come, thou Dayspring, come and cheer\nOur spirits by thine Advent here;\nDisperse the gloomy clouds of night,\nAnd death's dark shadows put to flight.\nRejoice! Rejoice! Emmanuel\nShall come to thee, O Israel!",
        link: "/liturgy/music/chants/o-oriens",
        verse: "Isaiah 60:1-3",
      },
      [`${year}-12-22`]: {
        title: "O Rex gentium",
        text: "O come, Desire of Nations, bind\nIn one the hearts of all mankind;\nBid thou our sad divisions cease,\nAnd be thyself our King of Peace.\nRejoice! Rejoice! Emmanuel\nShall come to thee, O Israel!",
        link: "/liturgy/music/chants/o-rex-gentium",
        verse: "Isaiah 2:4",
      },
      [`${year}-12-23`]: {
        title: "O Emmanuel",
        text: "O come, O come, Emmanuel,\nAnd ransom captive Israel;\nThat mourns in lonely exile here,\nUntil the Son of God appear.\nRejoice! Rejoice! Emmanuel\nShall come to thee, O Israel!",
        link: "/liturgy/music/chants/o-emmanuel",
        verse: "Isaiah 7:14",
      },
    };
  }
}
