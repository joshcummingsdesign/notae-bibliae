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
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date") || undefined;
  const withLinks = searchParams.get("withLinks");
  const isFullDate = date && /^\d{4}-\d{2}-\d{2}$/.test(date);
  const isYear = date && /^\d{4}$/.test(date);
  const shouldShowLinks = withLinks === "true";

  if (date && !isFullDate && !isYear) {
    return NextResponse.json(
      { error: "Date is not formatted as YYYY or YYYY-MM-DD" },
      { status: 400 }
    );
  }

  if (date && isFullDate && !dayjs(date, "YYYY-MM-DD", true).isValid()) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  let day = date && isFullDate ? dayjs(date).tz(TIMEZONE) : undefined;
  day = date && isYear ? dayjs(`${date}-01-01`).tz(TIMEZONE) : undefined;

  let calendar = new Calendar(day);
  let dateString = day
    ? day.format("YYYY-MM-DD")
    : calendar.getToday().format("YYYY-MM-DD");

  if (slug && slug.length && slug[0] === "tomorrow") {
    const tomorrowDate = calendar.getToday().add(1, "day");
    calendar = new Calendar(tomorrowDate);
    dateString = tomorrowDate.format("YYYY-MM-DD");
  }

  const liturgicalYear = calendar.getLiturgicalYear();

  if (!slug && !isFullDate) {
    const calendarData = calendar.getSeasonItems(!shouldShowLinks);
    const res = { liturgicalYear, ...calendarData };

    return NextResponse.json(res);
  }

  const items = calendar.getByDate(dateString).map((item) => ({
    ...item,
    title: !shouldShowLinks ? stripMarkdownLinks(item.title) : item.title,
  }));

  const season = calendar.getCurrentSeason();

  const res = {
    liturgicalYear,
    [season]: {
      [dateString]: items,
    },
  };

  return NextResponse.json(res);
}
