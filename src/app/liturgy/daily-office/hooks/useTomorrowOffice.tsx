import { Calendar, CalendarItem, CalendarRes } from "@/models/calendar";
import { useEffect, useState, useMemo, useCallback } from "react";
import { LessonRes, OfficeDay } from "@/models/lessons/types";

interface TomorrowData {
  season: string;
  date: string;
  events: CalendarItem[];
}

export const useTomorrowOffice = () => {
  const [tomorrow, setTomorrow] = useState<CalendarRes | null>(null);
  const [lessons, setLessons] = useState<LessonRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const calendar = useMemo(() => new Calendar(), []);

  const dateString = useMemo(
    () => calendar.getToday().add(1, "day").format("YYYY-MM-DD"),
    [calendar],
  );

  const getTomorrow = useCallback((): TomorrowData | null => {
    if (!tomorrow) return null;

    const season = Object.keys(tomorrow)[1];
    const events = tomorrow[season][dateString] || [];

    return {
      season,
      date: calendar.getToday().add(1, "day").format("dddd, MMMM D"),
      events,
    };
  }, [tomorrow, dateString, calendar]);

  const getOffice = useCallback((): OfficeDay | null => {
    if (!lessons) return null;
    return lessons[dateString];
  }, [lessons, dateString]);

  useEffect(() => {
    // Get cached data
    const retrieved = localStorage.getItem("tomorrow-office");
    if (retrieved) {
      const cached = JSON.parse(retrieved);
      if (cached[dateString]) {
        const { tomorrow, lessons } = cached[dateString];
        setTomorrow(tomorrow);
        setLessons(lessons);
        return;
      }
    }

    // Otherwise, fetch new data in parallel
    Promise.all([
      fetch("/api/calendar/tomorrow?withLinks=true").then((res) => res.json()),
      fetch("/api/lessons/tomorrow").then((res) => res.json()),
    ])
      .then(([tomorrowData, lessonsData]) => {
        setTomorrow(tomorrowData);
        setLessons(lessonsData);
      })
      .catch((error) => {
        console.error("Error fetching tomorrow office data:", error);
      });
  }, [dateString]);

  useEffect(() => {
    if (tomorrow && lessons) {
      setIsLoading(false);
      // Cache responses
      localStorage.setItem(
        "tomorrow-office",
        JSON.stringify({ [dateString]: { tomorrow, lessons } }),
      );
    }
  }, [tomorrow, lessons, dateString]);

  useEffect(() => {
    if (!isLoading) {
      // Re-render biblegateway links after content has loaded
      if (window.BGLinks) {
        window.BGLinks.version = "ESV";
        window.BGLinks.linkVerses();
      }
    }
  }, [isLoading]);

  return {
    isLoading,
    dateString,
    tomorrow: getTomorrow(),
    office: getOffice(),
  };
};
