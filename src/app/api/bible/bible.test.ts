import { describe, it, expect } from "vitest";
import { bible } from "./bible";

describe("bible", () => {
  it("should parse the query", () => {
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
});
