import { config } from "@/config";
import { BOOKS, TRANSLATIONS } from "./constants";
import { HttpError } from "@/types/errors";
import { BiblePassage } from "@/types/BiblePassage";

interface Chapter {
  name: string;
  verses: string[];
}

const cache: Record<string, BiblePassage[]> = {};

export class Bible {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor(cfg: typeof config = config) {
    this.baseUrl = "https://api.scripture.api.bible/v1";
    const apiKey = cfg.API_DOT_BIBLE_KEY;
    if (!apiKey) {
      throw new Error("Missing API key");
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
  ): Promise<BiblePassage[]> {
    const bible = TRANSLATIONS[version];
    const verses = chapter.verses.length
      ? chapter.verses.map((v) => `${chapter.name}:${v}`)
      : [chapter.name];

    const errors: { status: number; message: string }[] = [];

    const all = await Promise.all(
      verses.map(async (verse) => {
        if (cache[verse]) {
          return cache[verse];
        }

        const res = await this.get(
          `/bibles/${bible.id}/search?query=${encodeURIComponent(verse)}`
        );

        const json = await res.json();

        if (!res.ok) {
          errors.push({ status: 500, message: json.message });
          return null;
        }

        if (!json.data.passages) {
          errors.push({ status: 404, message: `Passage not found — ${verse}` });
          return null;
        }

        cache[verse] = json.data.passages;

        return json.data.passages;
      })
    );

    if (errors.length) {
      throw new HttpError(errors[0].message, errors[0].status);
    }

    return all.flat();
  }

  /**
   * Get the Bible passages.
   */
  async getPassages(
    query: string,
    version: keyof typeof TRANSLATIONS
  ): Promise<BiblePassage[]> {
    const parsedQuery = this.parseQuery(query);

    if (!parsedQuery) {
      throw new HttpError("Invalid passage in query", 400);
    }

    const chapter = this.parseChapter(parsedQuery);

    if (!chapter) {
      throw new HttpError("Invalid chapter in query", 400);
    }

    return await this.requestPassages(chapter, version);
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
