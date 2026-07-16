import { describe, expect, it } from "vitest";
import { formatPoetryText } from "./Poetry";

describe("formatPoetryText", () => {
  it("formats large text notation", () => {
    expect(formatPoetryText("|  \\large[O God,] from whom")).toBe(
      '<span class="poetry-large">O God,</span> from whom',
    );
  });

  it("formats chant dots as inline text", () => {
    expect(formatPoetryText("|  all just works _ do proceed")).toBe(
      'all just works <span class="symbol dot"></span> do proceed',
    );
  });

  it("keeps existing symbol notation", () => {
    expect(formatPoetryText("|    \\R and my mouth shall _ show")).toBe(
      '  <span class="symbol r"></span> and my mouth shall <span class="symbol dot"></span> show',
    );
  });
});
