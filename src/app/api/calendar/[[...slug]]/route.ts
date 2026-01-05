import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import isBetween from "dayjs/plugin/isBetween";
import { Calendar } from "@/models/calendar";
import { NextRequest, NextResponse } from "next/server";
import { TIMEZONE } from "@/constants";
import { stripMarkdownLinks } from "@/utils/markdown";

dayjs.extend(customParseFormat);
dayjs.extend(isBetween);
dayjs.extend(utc);
dayjs.extend(timezone);

export async function GET(
  req: NextRequest,
  { params }: { params: Promise<{ slug?: string[] }> }
) {
  const { slug } = await params;

  if (slug && slug.length && slug[0] !== "today" && slug[0] !== "tomorrow") {
    return NextResponse.json({ error: `${slug} not found` }, { status: 404 });
  }

  const { searchParams } = new URL(req.url);
  let date = searchParams.get("date");
  const isFullDate = date && /^\d{4}-\d{2}-\d{2}$/.test(date);
  const isYear = date && /^\d{4}$/.test(date);

  if (date && !isFullDate && !isYear) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const formattedDate = date && isYear ? `${date}-01-01` : date;
  const day = formattedDate ? dayjs(formattedDate).tz(TIMEZONE) : undefined;
  const calendar = new Calendar(day);
  const liturgicalYear = calendar.getLiturgicalYear();

  // If full date, return items
  if (slug || (day && formattedDate && isFullDate)) {
    const t =
      slug && slug.length && slug[0] === "tomorrow"
        ? dayjs().tz(TIMEZONE).add(1, "day")
        : dayjs().tz(TIMEZONE);
    const d = slug ? t.format("YYYY-MM-DD") : formattedDate!;

    const items = calendar
      .getByDate(d)
      .map((item) => ({ ...item, title: stripMarkdownLinks(item.title) }));

    const res = {
      date: d,
      liturgicalYear,
      items,
    };

    return NextResponse.json(res);
  }

  // Otherwise return the season items
  const calendarData = calendar.getSeasonItems(true);
  const res = { liturgicalYear, ...calendarData };

  return NextResponse.json(res);
}
