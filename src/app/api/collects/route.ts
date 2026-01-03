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

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const date = searchParams.get("date");

  if (!date) {
    return NextResponse.json({ error: "Date is required" }, { status: 400 });
  }

  if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    return NextResponse.json(
      { error: "Date is not formatted as YYYY-MM-DD" },
      { status: 400 }
    );
  }

  if (!dayjs(date, "YYYY-MM-DD", true).isValid()) {
    return NextResponse.json({ error: "Invalid date" }, { status: 400 });
  }

  const day = dayjs(date).tz(TIMEZONE);
  const calendar = new Calendar(day);
  const collects = new Collects(calendar);
  const { primary, secondary } = collects.getByDay();
  const items = [];
  if (primary) {
    items.push(primary);
  }

  const res = { date, items: [...items, ...secondary] };

  return NextResponse.json(res);
}
