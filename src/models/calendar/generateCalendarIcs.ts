import { createEvents, type EventAttributes } from "ics";
import { stripMarkdownLinks } from "@/utils/markdown";
import { Calendar } from "./Calendar";

export function generateCalendarIcs(calendar = new Calendar()): string {
  const events: EventAttributes[] = Object.values(calendar.getSeasonItems())
    .flatMap((dates) => Object.entries(dates).map(([date, items]) => ({
      start: date.split("-").map(Number) as [number, number, number],
      title: stripMarkdownLinks(items.map((item) => item.title).join(" — "))
        .replace(/<[^>]+>/g, "")
        .replace(/\*/g, "")
        .trim(),
      duration: { days: 1 },
    })));

  const { error, value } = createEvents(events);
  if (error || !value) {
    throw new Error("Calendar generation failed", { cause: error });
  }
  return value;
}
