import { config } from "@/config";
import { BOOKS, TRANSLATIONS } from "./constants";

interface Chapter {
  name: string;
  verses: string[];
}

export class Bible {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(cfg: typeof config = config) {
    this.baseUrl = "https://api.scripture.api.bible";
    const apiKey = cfg.API_DOT_BIBLE_KEY;
    if (!apiKey) {
      throw new Error("Missing API key for api.bible");
    }
    this.apiKey = apiKey;
  }

  /**
   * Make a GET request to the API.
   */
  private async get(route: string): Promise<Response> {
    return await fetch(`${this.baseUrl}${route}`, {
      headers: {
        "api-key": this.apiKey,
      },
    });
  }

  /**
   * Parse the chapter from the query.
   */
  parseChapter(parsedQuery: string): Chapter | null {
    const matches = parsedQuery.match(
      /([\d]{0,2}\s*[a-zA-Z\.]+ [\d]{1,3})(.*)/
    );

    if (!matches || matches.length < 2) return null;

    const name = matches[1];
    const verses =
      matches.length > 2
        ? matches[2]
            .replace(":", "")
            .split(",")
            .filter((v) => !!v)
        : [];

    return { name, verses };
  }

  /**
   * Request the passages from the API.
   */
  async requestPassages(
    chapter: Chapter,
    version: keyof typeof TRANSLATIONS
  ): Promise<any> {
    return await Promise.all([]);
  }

  /**
   * Get the Bible passages.
   */
  async getPassages(query: string, version: keyof typeof TRANSLATIONS) {
    const parsedQuery = this.parseQuery(query);

    if (!parsedQuery) {
      throw new Error("Invalid Bible passage in query");
    }

    const chapter = this.parseChapter(parsedQuery);

    if (!chapter) {
      throw new Error("Invalid Bible chapter in query");
    }

    const res = await this.requestPassages(chapter, version);

    return res;
  }

  /**
   * Parse the user's search query and format the book name.
   *
   * 1 CHRON. 16:28,31 => 1 Chronicles 16:28,31
   */
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
