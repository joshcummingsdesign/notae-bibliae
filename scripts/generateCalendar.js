const fs = require("fs");
const path = require("path");
const { createEvents } = require("ics");

// === CONFIGURATION ===

// Liturgical calendar start date
const START_DATE = [11, 30, 2025]; // [month, day, year]

// Map month names to numbers
const months = {
  January: 1,
  February: 2,
  March: 3,
  April: 4,
  May: 5,
  June: 6,
  July: 7,
  August: 8,
  September: 9,
  October: 10,
  November: 11,
  December: 12,
};

// === READ FILE ===
const filePath = path.join(
  process.cwd(),
  "src",
  "app",
  "liturgy",
  "liturgical-calendar",
  "page.mdx"
);
const md = fs.readFileSync(filePath, "utf-8");

// === HELPER FUNCTION ===
function getEventYear(month, day) {
  const [startMonth, startDay, startYear] = START_DATE;

  // If the event is before the START_DATE in the calendar year, assign to next year
  // Otherwise, assign to START_DATE's year
  if (month > startMonth || (month === startMonth && day >= startDay)) {
    return startYear;
  } else {
    return startYear + 1;
  }
}

// === PARSE EVENTS ===
const events = md
  .split("\n")
  .filter((line) => line.trim().startsWith("-") && line.includes("—"))
  .map((line) => {
    const [datePart, ...titleParts] = line
      .slice(1)
      .split("—")
      .map((s) => s.trim());

    // Clean title: remove JSX/HTML and Markdown links
    const title = titleParts
      .join(" — ")
      .replace(/<[^>]+>/g, "")
      .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
      .replace(/\*/g, "")
      .trim();

    const [monthName, dayStr] = datePart.split(" ");
    const month = months[monthName];
    const day = parseInt(dayStr, 10);

    const year = getEventYear(month, day);

    return {
      start: [year, month, day],
      title,
      duration: { days: 1 },
    };
  });

// === GENERATE ICS ===
const { error, value } = createEvents(events);

if (error) {
  console.error(error);
} else {
  const outPath = path.join(
    process.cwd(),
    "public",
    "events",
    "liturgical-calendar.ics"
  );
  fs.writeFileSync(outPath, value);
  console.log(`Calendar file generated at: ${outPath}`);
}
