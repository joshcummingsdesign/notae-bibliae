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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");
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
  if (day && formattedDate && isFullDate) {
    const items = calendar
      .getByDate(formattedDate)
      .map((item) => ({ ...item, title: stripMarkdownLinks(item.title) }));

    const res = {
      date: day.format("YYYY-MM-DD"),
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
