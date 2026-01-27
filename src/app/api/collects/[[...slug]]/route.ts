import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Calendar } from "@/models/calendar";
import { NextRequest, NextResponse } from "next/server";
import { TIMEZONE } from "@/constants";
import { Collects } from "@/models/collects";

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
  const isToday = slug && slug.length && slug[0] === "today";
  const isTomorrow = slug && slug.length && slug[0] === "tomorrow";
  const date = searchParams.get("date");
  const isFullDate = date && /^\d{4}-\d{2}-\d{2}$/.test(date);
  const isYear = date && /^\d{4}$/.test(date);
  const isAll = !isToday && !isTomorrow && !isFullDate;

  if (date && !isFullDate && !isYear) {
    return NextResponse.json(
      { error: "Date is not formatted as YYYY or YYYY-MM-DD" },
      { status: 400 }
    );
  }

  if (date && isFullDate && !dayjs(date, "YYYY-MM-DD", true).isValid()) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  let calendar = new Calendar();

  if (isTomorrow) {
    const tomorrowDate = calendar.getToday().add(1, "day");
    calendar = new Calendar(tomorrowDate);
  } else if (isFullDate) {
    calendar = new Calendar(dayjs.tz(date, TIMEZONE));
  } else if (isYear) {
    calendar = new Calendar(dayjs.tz(`${date}-01-01`, TIMEZONE));
  }

  const liturgicalYear = calendar.getLiturgicalYear();

  const collects = new Collects(calendar);
  const collectData = collects.getAll();

  if (isAll) {
    return NextResponse.json({ liturgicalYear, ...collectData });
  }

  const dateString = calendar.getToday().format("YYYY-MM-DD");
  return NextResponse.json({
    liturgicalYear,
    [dateString]: collectData[dateString] || [],
  });
}
