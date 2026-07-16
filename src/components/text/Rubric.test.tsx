import { ThemeProvider } from "@mui/material/styles";
import { cleanup, render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it } from "vitest";
import { theme } from "@/theme";
import { Rubric } from "./Rubric";

const renderRubric = (text: string[]) => {
  return render(
    <ThemeProvider theme={theme}>
      <Rubric text={text} />
    </ThemeProvider>,
  );
};

afterEach(() => {
  cleanup();
});

describe("Rubric", () => {
  it("renders named quote and apostrophe entities as smart punctuation", () => {
    renderRubric(["❡ Then shall be said &quot;Man&apos;s prayer&quot;."]);

    expect(
      screen.getByText("❡ Then shall be said “Man’s prayer”."),
    ).toBeTruthy();
  });

  it("renders numeric quote and apostrophe entities as smart punctuation", () => {
    renderRubric(["❡ Then shall be said &#34;Man&#39;s prayer&#34;."]);

    expect(
      screen.getByText("❡ Then shall be said “Man’s prayer”."),
    ).toBeTruthy();
  });

  it("renders raw apostrophes as smart apostrophes", () => {
    renderRubric(["❡ Then the Minister shall say the Lord's Prayer."]);

    expect(
      screen.getByText("❡ Then the Minister shall say the Lord’s Prayer."),
    ).toBeTruthy();
  });

  it("renders trailing possessives with smart apostrophes", () => {
    renderRubric([
      "❡ Then shall be said the Apostles' Creed by the Minister and the people, standing.",
    ]);

    expect(
      screen.getByText(
        "❡ Then shall be said the Apostles’ Creed by the Minister and the people, standing.",
      ),
    ).toBeTruthy();
  });

  it("keeps superscript markers after formatting quote entities", () => {
    const { container } = renderRubric([
      "❡ Then shall be read &quot;Man&apos;s prayer&quot;.\\a",
    ]);

    expect(container.textContent).toBe(
      "❡ Then shall be read “Man’s prayer”.[a]",
    );
    expect(container.querySelector("sup")?.textContent).toBe("[a]");
  });
});
