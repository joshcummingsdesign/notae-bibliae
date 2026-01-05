import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import isBetween from "dayjs/plugin/isBetween";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { Calendar } from "@/models/calendar";
import { Lessons } from "@/models/lessons";
import { NextRequest, NextResponse } from "next/server";
import { TIMEZONE } from "@/constants";

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
  const isFullDate = date && /^\d{4}-\d{2}-\d{2}$/.test(date);
  const isYear = date && /^\d{4}$/.test(date);

  if (date && !isFullDate && !isYear) {
    return NextResponse.json(
      { error: "Date is not formatted as YYYY or YYYY-MM-DD" },
      { status: 400 }
    );
  }

  if (date && isFullDate && !dayjs(date, "YYYY-MM-DD", true).isValid()) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const day =
    slug && slug.length && slug[0] === "tomorrow"
      ? dayjs(date).tz(TIMEZONE).add(1, "day")
      : dayjs(date).tz(TIMEZONE);
  const dateString = day.format("YYYY-MM-DD");
  const calendar = new Calendar(day);
  const liturgicalYear = calendar.getLiturgicalYear();

  const lessons = new Lessons(calendar);
  const lessonData = lessons.getAll();

  if (!slug && !isFullDate) {
    const res = { liturgicalYear, ...lessonData };
    return NextResponse.json(res);
  }

  const daily = lessonData[dateString] as any;
  const title = daily.title;
  delete daily.title;

  if (!daily) {
    return NextResponse.json(
      { error: `Lesson not found for ${date}` },
      { status: 404 }
    );
  }

  const res = {
    liturgicalYear,
    [dateString]: {
      title,
      ...daily,
    },
  };

  return NextResponse.json(res);
}
