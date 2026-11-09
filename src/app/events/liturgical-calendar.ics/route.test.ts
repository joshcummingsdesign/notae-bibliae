import { afterEach, describe, expect, it, vi } from "vitest";
import * as generator from "@/models/calendar/generateCalendarIcs";
import { GET } from "./route";

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

describe("GET /events/liturgical-calendar.ics", () => {
  it("downloads the current calendar and rolls over at Advent without reloading", async () => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-11-29T07:59:00Z"));
    const before = GET();
    expect(before.status).toBe(200);
    expect(before.headers.get("Content-Type")).toBe("text/calendar; charset=utf-8");
    expect(before.headers.get("Content-Disposition"))
      .toBe('attachment; filename="liturgical-calendar.ics"');
    expect(before.headers.get("Cache-Control")).toBe("no-store");
    const previousYear = await before.text();
    expect(previousYear).toContain("BEGIN:VCALENDAR");
    expect(previousYear).toContain("DTSTART;VALUE=DATE:20251130");

    vi.setSystemTime(new Date("2026-11-29T08:00:00Z"));
    const nextYear = await GET().text();
    expect(nextYear).toContain("DTSTART;VALUE=DATE:20261129");
    expect(nextYear).not.toContain("DTSTART;VALUE=DATE:20251130");
  });

  it("returns a generic error if generation fails", async () => {
    vi.spyOn(generator, "generateCalendarIcs").mockImplementation(() => {
      throw new Error("Internal failure details");
    });
    vi.spyOn(console, "error").mockImplementation(() => {});
    const response = GET();
    expect(response.status).toBe(500);
    expect(await response.text()).toBe("Unable to generate calendar");
  });
});
