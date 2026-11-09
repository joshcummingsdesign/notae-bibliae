import { generateCalendarIcs } from "@/models/calendar/generateCalendarIcs";

export const dynamic = "force-dynamic";

export function GET(): Response {
  try {
    return new Response(generateCalendarIcs(), {
      headers: {
        "Content-Type": "text/calendar; charset=utf-8",
        "Content-Disposition": 'attachment; filename="liturgical-calendar.ics"',
        "Cache-Control": "no-store",
      },
    });
  } catch (error) {
    console.error("Calendar generation failed:", error);
    return new Response("Unable to generate calendar", { status: 500 });
  }
}
