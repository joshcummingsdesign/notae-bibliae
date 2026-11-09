import dayjs from "dayjs";
import { describe, expect, it, vi } from "vitest";
import { Calendar } from "./Calendar";
import { generateCalendarIcs } from "./generateCalendarIcs";

describe("generateCalendarIcs", () => {
  it.each([
    ["2026-11-28", "20251130"],
    ["2026-11-29", "20261129"],
  ])("exports the current liturgical year on %s", (today, firstDate) => {
    const calendar = new Calendar(dayjs.tz(today, "America/Los_Angeles"));
    const value = generateCalendarIcs(calendar).replace(/\r\n[ \t]/g, "");
    const dates = [...value.matchAll(/^DTSTART;VALUE=DATE:(\d{8})/gm)]
      .map((match) => match[1]).sort();
    expect(dates[0]).toBe(firstDate);
    const start = calendar.getFirstSundayOfAdvent().format("YYYYMMDD");
    const end = calendar.getNextFirstSundayOfAdvent().format("YYYYMMDD");
    expect(dates.every((date) => date >= start && date < end)).toBe(true);
    expect(dates).toHaveLength(Object.values(calendar.getSeasonItems())
      .reduce((count, items) => count + Object.keys(items).length, 0));
    expect(value).toContain("BEGIN:VCALENDAR");
    expect(value).toContain("DURATION:P1D");
    const titles = [...value.matchAll(/^SUMMARY:(.*)/gm)].map((match) => match[1]);
    expect(titles.length).toBeGreaterThan(0);
    expect(titles.join("\n")).not.toMatch(/<[^>]+>|\[[^\]]+\]\([^)]+\)|\*/);
  });

  it("preserves leap day", () => {
    const calendar = new Calendar(dayjs.tz("2028-02-29", "America/Los_Angeles"));
    // The real calendar has no observance on this leap day; supply one to test export.
    const seasons = calendar.getSeasonItems();
    seasons.Lent["2028-02-29"] = [{ date: "2028-02-29", title: "Leap day", rank: 9 }];
    const spy = vi.spyOn(calendar, "getSeasonItems").mockReturnValue(seasons);
    expect(generateCalendarIcs(calendar)).toContain("DTSTART;VALUE=DATE:20280229");
    spy.mockRestore();
  });
});
