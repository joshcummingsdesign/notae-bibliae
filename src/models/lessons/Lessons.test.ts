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
    expect(entries.length).toBe(230);
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
      "2026-07-18",
      {
        evening: {
          first: ["Dan. 3:19-30"],
          second: ["Acts 22:17-29"],
        },
        morning: {
          first: ["1 Sam. 4:12-22"],
          second: ["Luke 12:49-59"],
        },
        title: "Sixth Sunday After Trinity - Saturday",
      },
    ]);
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
