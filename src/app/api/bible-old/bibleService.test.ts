import { describe, it, expect, vi, beforeEach } from "vitest";
import { bibleService } from "./bibleService";
import response from "./stubs/response.json";
import expected from "./stubs/expected.json";

beforeEach(() => {
  vi.restoreAllMocks();

  global.fetch = vi.fn(() =>
    Promise.resolve({
      ok: true,
      json: () =>
        Promise.resolve({
          data: {
            passages: response,
          },
        }),
    } as Response)
  );
});

describe("bibleService", () => {
  it("should get passages", async () => {
    const passages = await bibleService.getPassages("Psalms 1:1-4:3", "KJV");
    expect(passages).toEqual(expected);
  });

  it("should parse the search query", () => {
    expect(bibleService.parseSearchQuery("Matt 1")).toBe("Matthew 1");

    expect(bibleService.parseSearchQuery("Gen 1:4")).toBe("Genesis 1:4");

    expect(bibleService.parseSearchQuery("Judg. 4:7")).toBe("Judges 4:7");

    expect(bibleService.parseSearchQuery("John 3:16")).toBe("John 3:16");

    expect(bibleService.parseSearchQuery("Ex. 12:1")).toBe("Exodus 12:1");

    expect(bibleService.parseSearchQuery("1 Pet. 1:1-2:1-3")).toBe(
      "1 Peter 1:1-2:1-3"
    );

    expect(bibleService.parseSearchQuery("ps 3")).toBe("Psalms 3");

    expect(bibleService.parseSearchQuery("acts 3")).toBe("Acts 3");

    expect(bibleService.parseSearchQuery("1 Chron. 16:8,31")).toBe(
      "1 Chronicles 16:8,31"
    );
  });

  it("should parse book title and chapter from bookId", () => {
    expect(bibleService.parseBookId("GEN.1")).toEqual({
      title: "Genesis",
      chapter: 1,
    });
    expect(bibleService.parseBookId("EXO")).toEqual({ title: "Exodus" });
    expect(bibleService.parseBookId("NUM.10")).toEqual({
      title: "Numbers",
      chapter: 10,
    });
    expect(bibleService.parseBookId("FOO.1")).toEqual(null);
    expect(bibleService.parseBookId("REV.3")).toEqual({
      title: "Revelation",
      chapter: 3,
    });
  });

  it("should transform a passage", () => {
    expect(
      bibleService.transformPassage(response[0].chapterIds, response[0].content)
    ).toEqual(expected[0].content);
  });
});
