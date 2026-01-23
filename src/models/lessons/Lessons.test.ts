import dayjs from "dayjs";
import { describe, test, expect } from "vitest";
import { Lessons } from "./Lessons";
import { Calendar } from "../calendar";

describe("Lessons", () => {
  test("should get all lessons", () => {
    const c = new Calendar(dayjs("2025-11-30"));
    const l = new Lessons(c);
    const a = l.getAll();
    const entries = Object.entries(a);
    expect(entries.length).toBe(363);
    expect(entries[0]).toEqual([
      "2025-11-30",
      {
        evening: {
          first: ["Isa. 62:1-12"],
          second: ["Matt. 25:1-13"],
        },
        morning: {
          first: ["Mal. 3:1-6, Mal. 4:4-6"],
          second: ["Luke 1:5-25"],
        },
        title: "First Sunday of Advent",
      },
    ]);
    expect(entries[entries.length - 1]).toEqual([
      "2026-11-28",
      {
        evening: {
          first: ["Wisdom 13:1-9"],
          second: ["Rev. 3:7-13"],
        },
        morning: {
          first: ["Joel 3:9-17"],
          second: ["2 Pet. 3:11-18"],
        },
        title: "Sunday Before Advent - Saturday",
      },
    ]);
  });

  test("should handle 2028-2029 with no Second Sunday After Christmas", () => {
    // In 2028-2029: Dec 31 is First Sunday After Christmas, Jan 6 is Epiphany (Sat), Jan 7 is First Sunday of Epiphany
    const c = new Calendar(dayjs("2028-12-03"));
    const l = new Lessons(c);
    const all = l.getAll();

    // Dec 31, 2028 - First Sunday After Christmas
    expect(all["2028-12-31"]?.title).toBe("First Sunday After Christmas");
    // Jan 1, 2029 - Circumcision of the Lord (feast day)
    expect(all["2029-01-01"]?.title).toBe(
      "Circumcision and Holy Name of Jesus",
    );
    // Jan 2-4, 2029 - Should use explicit date lessons since First Sunday After Christmas has no weekday lessons
    expect(all["2029-01-02"]?.title).toBe("January 2");
    expect(all["2029-01-03"]?.title).toBe("January 3");
    expect(all["2029-01-04"]?.title).toBe("January 4");
    // Jan 5, 2029 - Epiphany Eve
    expect(all["2029-01-05"]?.title).toBe("Epiphany Eve");
    // Jan 6, 2029 - Epiphany
    expect(all["2029-01-06"]?.title).toBe("The Epiphany");
    // Jan 7, 2029 - First Sunday of Epiphany
    expect(all["2029-01-07"]?.title).toBe(
      "First Sunday of Epiphany: Baptism of the Lord",
    );
  });

  test("should get today's lessons", () => {
    const ac = new Calendar(dayjs("2025-11-30"));
    const al = new Lessons(ac);
    const a = al.getToday();
    expect(a).toEqual({
      evening: {
        first: ["Isa. 62:1-12"],
        second: ["Matt. 25:1-13"],
      },
      morning: {
        first: ["Mal. 3:1-6, Mal. 4:4-6"],
        second: ["Luke 1:5-25"],
      },
      title: "First Sunday of Advent",
    });
    const bc = new Calendar(dayjs("2026-01-24"));
    const bl = new Lessons(bc);
    const b = bl.getToday();
    expect(b).toEqual({
      evening: {
        first: ["Ezek. 18:26-32"],
        second: ["John 4:43-54"],
      },
      morning: {
        first: ["Prov. 9:1-6, Prov. 9:13-18"],
        second: ["Phil. 1:12-26"],
      },
      title: "Second Sunday of Epiphany - Saturday",
    });
  });
});
