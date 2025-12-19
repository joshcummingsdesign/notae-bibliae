import { NextRequest, NextResponse } from "next/server";
import { JSDOM } from "jsdom";
import { BiblePassage } from "@/lib/types/BiblePassage";

const cache: Record<string, BiblePassage> = {};

class BibleGatewayAPI {
  async search(query = "John 3:16", version = "ESV"): Promise<BiblePassage> {
    const key = `${version}|${query}`;
    if (cache[key]) return cache[key];

    const encodedSearch = encodeURIComponent(query);
    const encodedVersion = encodeURIComponent(version);
    const url = `https://www.biblegateway.com/passage?search=${encodedSearch}&version=${encodedVersion}`;

    const res = await fetch(url);
    const html = await res.text();
    const { document } = new JSDOM(html).window;

    const verseElement = document.querySelector(".bcv");
    if (!verseElement) throw new Error("Verse not found");

    const elements = Array.from(
      document.querySelectorAll(".passage-content .text")
    );

    const content = elements.reduce<BiblePassage>((acc, el, i) => {
      const verse = el.querySelector(".versenum");
      if (verse && verse.parentNode) {
        const verseNum = Number(verse.textContent);
        el.querySelectorAll(".versenum").forEach((v) => v.remove());
        el.querySelectorAll(".chapternum").forEach((v) => v.remove());
        acc[verseNum] = el.textContent;
      } else {
        el.querySelectorAll(".versenum").forEach((v) => v.remove());
        el.querySelectorAll(".chapternum").forEach((v) => v.remove());
        acc[1] = el.textContent;
      }
      return acc;
    }, {});

    if (Object.keys(content).length === 0)
      throw new Error("Could not find verse text");

    cache[key] = content; // cache for subsequent requests

    return content;
  }
}

const api = new BibleGatewayAPI();

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const passage = searchParams.get("passage") || "John 3:16";
    const version = searchParams.get("version") || "KJV";

    const result = await api.search(passage, version);
    return NextResponse.json(result);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
