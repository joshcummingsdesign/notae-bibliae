import { describe, it, expect, vi, beforeEach } from "vitest";
import { Bible } from "./Bible";
import response from "./stubs/response.json";
import twoResponses from "./stubs/two-responses.json";

const MOCK_CONFIG = {
  API_DOT_BIBLE_KEY: "12345",
};

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

describe("bible", () => {
  it("should parse the query", () => {
    const bible = new Bible(MOCK_CONFIG);

    expect(bible.parseQuery("Matt 1")).toBe("Matthew 1");

    expect(bible.parseQuery("Gen 1:4")).toBe("Genesis 1:4");

    expect(bible.parseQuery("Judg. 4:7")).toBe("Judges 4:7");

    expect(bible.parseQuery("John 3:16")).toBe("John 3:16");

    expect(bible.parseQuery("Ex. 12:1")).toBe("Exodus 12:1");

    expect(bible.parseQuery("1 Pet. 1:1-2:1-3")).toBe("1 Peter 1:1-2:1-3");

    expect(bible.parseQuery("ps 3")).toBe("Psalms 3");

    expect(bible.parseQuery("acts 3")).toBe("Acts 3");

    expect(bible.parseQuery("1 Chron. 16:8,31")).toBe("1 Chronicles 16:8,31");
  });

  it("should parse the chapter", () => {
    const bible = new Bible(MOCK_CONFIG);

    expect(bible.parseChapter("1 Chronicles 16:8,31")).toEqual({
      name: "1 Chronicles 16",
      verses: ["8", "31"],
    });

    expect(bible.parseChapter("1 Chronicles 16:23-24,30")).toEqual({
      name: "1 Chronicles 16",
      verses: ["23-24", "30"],
    });

    expect(bible.parseChapter("Psalms 23:1")).toEqual({
      name: "Psalms 23",
      verses: ["1"],
    });

    expect(bible.parseChapter("John 1")).toEqual({
      name: "John 1",
      verses: [],
    });

    expect(bible.parseChapter("John")).toBeNull();
  });

  it("should get the passages", async () => {
    const bible = new Bible(MOCK_CONFIG);

    const a = await bible.getPassages("1 Chronicles 16:28", "KJV");
    expect(a).toEqual(response);

    const b = await bible.getPassages("1 Chronicles 16:28,31", "KJV");
    expect(b).toEqual(twoResponses);
  });
});
