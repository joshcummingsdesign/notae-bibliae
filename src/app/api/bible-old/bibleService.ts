import { JSDOM } from "jsdom";
import {
  API_DOT_BIBLE_KEY,
  API_DOT_BIBLE_URL,
  BOOKS,
  TRANSLATIONS,
} from "./constants";
import { BiblePassage } from "@/types/BiblePassage";
import { Book } from "./types";

const cache: Record<string, BiblePassage[]> = {};

class BibleService {
  private readonly baseUrl: string;
  private readonly apiKey: string;

  constructor() {
    this.baseUrl = API_DOT_BIBLE_URL;
    this.apiKey = API_DOT_BIBLE_KEY;
  }

  /**
   * Make a GET request to the api.
   */
  private async get(route: string): Promise<Response> {
    return await fetch(`${this.baseUrl}${route}`, {
      headers: {
        "api-key": this.apiKey,
      },
    });
  }

  /**
   * Get passages by search query.
   *
   * Version defaults to KJV.
   *
   * Query example: `John 1:1`
   *
   * `flat` puts all the verses on the same line
   */
  public async getPassages(
    query: string,
    version: keyof typeof TRANSLATIONS,
    flat?: boolean
  ): Promise<BiblePassage[]> {
    const bible = TRANSLATIONS[version];
    const parsedQuery = this.parseSearchQuery(query);

    if (!parsedQuery) return [];

    const matches = parsedQuery.match(
      /([\d]{0,2}\s*[a-zA-Z\.]+ [\d]{1,3})(.*)/
    );

    if (!matches || matches.length < 2) return [];

    const chapter = matches[1];
    const verses =
      matches.length > 2 ? matches[2].replace(":", "").split(",") : [];

    const getVerses = async (
      verses: string[]
    ): Promise<BiblePassage[][] | null> =>
      await Promise.all(
        verses.map(async (verse) => {
          const passage = `${chapter}:${verse}`;

          if (cache[passage]) {
            return cache[passage];
          }

          console.log("api refetched");

          const res = await this.get(
            `/v1/bibles/${bible.id}/search?query=${encodeURIComponent(passage)}`
          );

          if (!res.ok) return null;

          const json = await res.json();

          if (json.data.passages) {
            cache[passage] = json.data.passages;
            return json.data.passages;
          }

          return null;
        })
      );

    const res = await getVerses(verses.length > 0 ? verses : [chapter]);

    if (!res) return [];

    return res.flat().map((passage: BiblePassage) => {
      return {
        ...passage,
        bibleName: version,
        content: this.transformPassage(
          passage.chapterIds,
          passage.content,
          flat
        ),
      };
    });
  }

  /**
   * Parse the search query.
   *
   * If no translation is passed, the default is set to BSB.
   */
  parseSearchQuery(query: string): string | null {
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

  /**
   * Parse the book title and chapter from the book ID.
   */
  parseBookId(bookId: string, singular = false): Book | null {
    const matches = bookId.match(/([0-9A-Z]*)\.?([0-9]*)?/);
    let title = matches ? BOOKS[matches[1] as keyof typeof BOOKS] : undefined;

    // Bail if it's an invalid title
    if (!title) return null;

    if (singular) {
      title = title === "Psalms" ? "Psalm" : title;
    }

    const chapter = matches && matches[2] ? Number(matches[2]) : undefined;

    return { title, chapter };
  }

  /**
   * Add chapter headings and filter out unwanted characters.
   */
  transformPassage(
    chapterIds: string[],
    content: string,
    flat?: boolean
  ): string {
    // Strip content
    const strippedContent = content
      // Remove b tags
      .replaceAll(/<p [^>]*class="b">[^>]*<\/p>/g, "")
      // Remove r tags
      .replaceAll(/<p [^>]*class="r">.*?<\/p>/g, "")
      // Remove paragraph symbols
      .replaceAll("¶", "")
      // LORD => Lord (for css small-caps)
      .replaceAll("LORD", "Lord")
      // Remove space after line numbers
      .replaceAll(/(?<=[0-9]+)<\/span>\s/g, "</span>")
      // Remove space before punctuation
      .replaceAll(/\s(?=[;,?.!])/g, "");

    // Get DOM nodes
    const nodes = new JSDOM(`<!DOCTYPE html>${strippedContent}`).window.document
      .body.childNodes;
    const paragraphs = Array.from(nodes) as HTMLElement[];

    let index = 0;
    let chapterIndex = 0;
    let quoteIndex = 0;
    let prevChapter: string | null = null;

    return paragraphs
      .reduce((acc: string[], p) => {
        const doc = new JSDOM("<!DOCTYPE html>").window.document;
        const body = doc.body;

        // Replace q tag numbers with 0 and 1 alternating for poetry indents
        if (p.className.match(/q[0-9]/)) {
          p.className = p.className.replace(/q[0-9]/, `q${quoteIndex % 2}`);
          quoteIndex++;
        } else {
          quoteIndex = 0;
        }

        // If flat, push innerHTML and bail
        if (flat) {
          acc.push(p.innerHTML);
          return acc;
        }

        const sid =
          p.innerHTML &&
          p.innerHTML.match(/data-sid="[0-9]?[A-Z]+\s([0-9]+):[0-9]+"/);
        const chapter = sid && sid.length >= 2 ? sid[1] : prevChapter;

        // Add h3 headings
        if (chapter !== prevChapter) {
          let i = index;
          const book = this.parseBookId(chapterIds[chapterIndex], true)!;

          if (acc.length >= 2 && acc[index - 2].match(/class="(s[0-9]|d)"/)) {
            i = index - 2;
          } else if (
            acc.length >= 1 &&
            acc[index - 1].match(/class="(s[0-9]|d)"/)
          ) {
            i = index - 1;
          }

          acc.splice(i, 0, `<h3>${book.title} ${book.chapter}</h3>`);
          index++;
          chapterIndex++;
          prevChapter = chapter;
        }

        body.appendChild(p);
        acc.push(body.innerHTML);
        index++;
        return acc;
      }, [])
      .join("");
  }
}

export const bibleService = new BibleService();
