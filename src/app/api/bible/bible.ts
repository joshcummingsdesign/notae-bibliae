import { BOOKS } from "./constants";

class Bible {
  parseQuery(query: string): string | null {
    const search = query.toUpperCase().split(",");

    const matches = search[0].match(
      /^([0-9])?\s*([a-zA-Z]+)\.?\s*([0-9]+:?[0-9]*-?[0-9]*:?[0-9]*-*[0-9]*)$/
    );

    let parsedQuery = undefined;

    if (matches && matches.length >= 3) {
      let book = `${matches[1] || ""}${matches[2]}`;

      book = BOOKS[book as keyof typeof BOOKS];

      const verses = [matches[3], search.slice(1)]
        .filter((i) => i.length)
        .join(",");

      parsedQuery = book ? `${book} ${verses}` : undefined;
    }

    return parsedQuery || null;
  }
}

export const bible = new Bible();
