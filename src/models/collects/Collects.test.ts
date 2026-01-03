import { describe, test, expect, vi } from "vitest";
import { Collects } from "./Collects";
import { Calendar } from "../calendar";
import dayjs from "dayjs";

vi.mock("../calendar", () => ({
  Calendar: class {
    getToday = vi.fn().mockReturnValue(dayjs("2026-04-04"));
    getAll = vi.fn().mockReturnValue({
      "2025-11-30": [
        {
          date: "2025-11-30",
          title: "First Sunday of Advent",
          rank: 3,
          class: 1,
          isFeast: true,
        },
        {
          date: "2025-11-30",
          title: "Saint Andrew, Apostle",
          rank: 5,
          class: 6,
          isFeast: true,
          isSaint: true,
        },
      ],
      "2026-04-04": [
        {
          date: "2026-04-04",
          title: "Holy Week: Holy Saturday",
          rank: 1,
          class: 2,
          isFeast: true,
        },
        {
          date: "2026-04-04",
          title: "Easter Vigil",
          rank: 4,
          class: 5,
          isFeast: true,
        },
        {
          date: "2026-04-04",
          title: "Saint Isidore, Bishop and Doctor of the Church",
          rank: 5,
          class: 10,
          isSaint: true,
        },
      ],
    });
  },
}));

describe("Collects", () => {
  test("should query the collects", () => {
    const mockCalendar = new Calendar(dayjs("2025-11-30"));
    const c = new Collects(mockCalendar);
    const items = c.queryCollects();

    expect(items.length).toBe(187);
    expect(items[0].title).toBe("First Sunday of Advent");
    expect(items[0].text).toBeTruthy();
    expect(items[items.length - 1].title).toBe("Saint Jacob of Serugh, Bishop");
    expect(items[items.length - 1].text).toBeTruthy();
  });

  test("should get all collects", () => {
    const mockCalendar = new Calendar(dayjs("2025-11-30"));
    const c = new Collects(mockCalendar);
    const items = c.getAll();
    expect(Object.keys(items).length).toBe(2);
    expect(items["2025-11-30"].length).toBe(2);
    expect(items["2025-11-30"][0].title).toBe("First Sunday of Advent");
    expect(items["2025-11-30"][0].collect).toBeTruthy();
    expect(items["2026-04-04"].length).toBe(3);
    expect(items["2026-04-04"][0].title).toBe("Holy Week: Holy Saturday");
    expect(items["2026-04-04"][0].collect).toBeTruthy();
  });

  test("should get current day's collects", () => {
    const mockCalendar = new Calendar(dayjs("2025-11-30"));
    const c = new Collects(mockCalendar);
    const items = c.getByDay();
    expect(items.primary!.title).toBe("Holy Week: Holy Saturday");
    expect(items.secondary.length).toBe(2);
    expect(items.secondary[0].title).toBe("Easter Vigil");
    expect(items.secondary[1].title).toBe(
      "Saint Isidore, Bishop and Doctor of the Church"
    );
  });
});
