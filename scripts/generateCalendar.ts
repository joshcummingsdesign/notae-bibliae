import fs from "fs";
import path from "path";
import { createEvents, EventAttributes } from "ics";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { getCalendarData } from "../src/components/Calendar/getCalendarData";

dayjs.extend(customParseFormat);

// === CALENDAR DATA ===

const today = dayjs();
const { calendarData } = getCalendarData(today);

// === CONFIG ===

// Start of the liturgical year (used to determine calendar rollover)
const START_DATE: [number, number, number] = [11, 30, 2025];

// === HELPERS ===

// Determine whether an event belongs to current or next year
function getEventYear(month: number, day: number): number {
  const [startMonth, startDay, startYear] = START_DATE;

  if (month > startMonth || (month === startMonth && day >= startDay)) {
    return startYear;
  } else {
    return startYear + 1;
  }
}

// Convert a single formatted line:
// "December 25 — Christmas Day — [Saint Stephen](/people/...)" → ICS event
const parseEvent = (line: string): EventAttributes => {
  const segments = line.split(" — ").map((s) => s.trim());
  const datePart = segments[0];
  const titleParts = segments.slice(1);

  const parsedDate = dayjs(datePart, "MMMM D");
  const month = parsedDate.month() + 1; // 0-indexed
  const day = parsedDate.date();
  const year = getEventYear(month, day);

  // Convert markdown → plain text
  const cleanTitle = titleParts
    .join(" — ")
    .replace(/<[^>]+>/g, "")
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/\*/g, "")
    .trim();

  return {
    title: cleanTitle,
    start: [year, month, day],
    duration: { days: 1 },
  };
};

// === BUILD ICS EVENT ARRAY ===

const events: EventAttributes[] = [];

for (const season of Object.keys(calendarData)) {
  const lines: string[] = calendarData[season];

  for (const line of lines) {
    events.push(parseEvent(line));
  }
}

// === GENERATE ICS ===

const { error, value } = createEvents(events);

if (error || !value) {
  console.error("ICS Error:", error);
  process.exit(1);
}

const outputPath = path.join(
  process.cwd(),
  "public",
  "events",
  "liturgical-calendar.ics"
);

// Ensure directory exists
fs.mkdirSync(path.dirname(outputPath), { recursive: true });

// Write the ICS file
fs.writeFileSync(outputPath, value);

console.log("✔ ICS file generated at:", outputPath);
