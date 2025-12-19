import { NextRequest, NextResponse } from "next/server";
import { TRANSLATIONS } from "./constants";
import { bibleService } from "./bibleService";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const version = searchParams.get("version");
    const flat = searchParams.get("flat") === "true";

    if (!query) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    const q = decodeURIComponent(query);
    if (!/[a-zA-Z0-9\-:,\.]/.test(q)) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    const translation = version ? version.toUpperCase() : "KJV";
    if (!Object.keys(TRANSLATIONS).includes(translation)) {
      return NextResponse.json({ error: "Invalid version" }, { status: 400 });
    }

    const passages = await bibleService.getPassages(
      q,
      translation as keyof typeof TRANSLATIONS,
      flat
    );

    return NextResponse.json(passages || []);
  } catch (err: any) {
    console.error("Bible API error:", err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
