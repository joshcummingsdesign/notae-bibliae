import { NextRequest, NextResponse } from "next/server";
import { TRANSLATIONS } from "./constants";
import { Bible } from "./Bible";

export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("query");
    const version = searchParams.get("version");

    if (!query) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    const decodedQuery = decodeURIComponent(query).toUpperCase();
    if (!/^[ ,A-Z\d\.:-]+$/.test(decodedQuery) || decodedQuery.length > 50) {
      return NextResponse.json({ error: "Invalid query" }, { status: 400 });
    }

    const translation = version ? version.toUpperCase() : "KJV";
    if (!Object.keys(TRANSLATIONS).includes(translation)) {
      return NextResponse.json({ error: "Invalid version" }, { status: 400 });
    }

    const bible = new Bible();
    const res = await bible.getPassages(
      decodedQuery,
      translation as keyof typeof TRANSLATIONS
    );

    return NextResponse.json(res);
  } catch (error: any) {
    const errorMessage = `Bible API error: ${error.message}`;
    console.error(errorMessage);
    return NextResponse.json(
      { error: errorMessage },
      { status: error.status || 500 }
    );
  }
}
