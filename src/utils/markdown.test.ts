import { describe, test, expect } from "vitest";
import { stripMarkdownLinks, appendAnchorToMarkdownLink } from "./markdown";

describe("stripMarkdownLinks", () => {
  test("removes markdown link syntax keeping text", () => {
    expect(stripMarkdownLinks("[Saint Nicholas](/path), Bishop")).toBe(
      "Saint Nicholas, Bishop"
    );
  });

  test("handles multiple links", () => {
    expect(stripMarkdownLinks("[A](/a) and [B](/b)")).toBe("A and B");
  });

  test("returns unchanged string with no links", () => {
    expect(stripMarkdownLinks("Plain text")).toBe("Plain text");
  });
});

describe("appendAnchorToMarkdownLink", () => {
  test("appends anchor to markdown link", () => {
    expect(
      appendAnchorToMarkdownLink("[Saint Nicholas](/path), Bishop", "#morning-prayer")
    ).toBe("[Saint Nicholas](/path#morning-prayer), Bishop");
  });

  test("appends anchor to link with existing path segments", () => {
    expect(
      appendAnchorToMarkdownLink(
        "[Saint John Chrysostom](/liturgy/liturgical-year/saints/saint-john-chrysostom), Bishop",
        "#evening-prayer"
      )
    ).toBe(
      "[Saint John Chrysostom](/liturgy/liturgical-year/saints/saint-john-chrysostom#evening-prayer), Bishop"
    );
  });

  test("only modifies first link when multiple present", () => {
    expect(
      appendAnchorToMarkdownLink("[A](/a) and [B](/b)", "#anchor")
    ).toBe("[A](/a#anchor) and [B](/b)");
  });
});
