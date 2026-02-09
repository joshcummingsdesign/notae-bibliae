import { Calendar } from "@/models/calendar";
import { useEffect, useState, useMemo, useCallback } from "react";
import { LectionaryItem, LectionaryRes } from "@/models/lectionary";

interface LectionaryDay {
  date: string;
  data: LectionaryItem | null;
}

export const useLectionary = () => {
  const [todayRes, setTodayRes] = useState<LectionaryRes | null>(null);
  const [tomorrowRes, setTomorrowRes] = useState<LectionaryRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const calendar = useMemo(() => new Calendar(), []);
  const tomorrowCalendar = useMemo(
    () => new Calendar(calendar.getToday().add(1, "day")),
    [calendar],
  );

  const todayDateString = useMemo(
    () => calendar.getToday().format("YYYY-MM-DD"),
    [calendar],
  );

  const tomorrowDateString = useMemo(
    () => tomorrowCalendar.getToday().format("YYYY-MM-DD"),
    [tomorrowCalendar],
  );

  const todayFormatted = useMemo(
    () => calendar.getToday().format("dddd, MMMM D, YYYY"),
    [calendar],
  );

  const tomorrowFormatted = useMemo(
    () => tomorrowCalendar.getToday().format("dddd, MMMM D, YYYY"),
    [tomorrowCalendar],
  );

  const getTodayData = useCallback((): LectionaryItem | null => {
    if (!todayRes) return null;
    return todayRes[todayDateString];
  }, [todayRes, todayDateString]);

  const getTomorrowData = useCallback((): LectionaryItem | null => {
    if (!tomorrowRes) return null;
    return tomorrowRes[tomorrowDateString];
  }, [tomorrowRes, tomorrowDateString]);

  useEffect(() => {
    // Get cached data
    const retrieved = localStorage.getItem("lectionary");
    if (retrieved) {
      const cached = JSON.parse(retrieved);
      if (cached[todayDateString] && cached[tomorrowDateString]) {
        setTodayRes(cached[todayDateString].data);
        setTomorrowRes(cached[tomorrowDateString].data);
        return;
      }
    }

    // Otherwise, fetch new data
    Promise.all([
      fetch("/api/lectionary/today?withLinks=true").then((res) => res.json()),
      fetch("/api/lectionary/tomorrow?withLinks=true").then((res) =>
        res.json(),
      ),
    ])
      .then(([todayData, tomorrowData]) => {
        setTodayRes(todayData);
        setTomorrowRes(tomorrowData);
      })
      .catch((error) => {
        console.error("Error fetching lectionary data:", error);
      });
  }, [todayDateString, tomorrowDateString]);

  // Cache responses
  useEffect(() => {
    if (todayRes && tomorrowRes) {
      setIsLoading(false);
      localStorage.setItem(
        "lectionary",
        JSON.stringify({
          [todayDateString]: { data: todayRes },
          [tomorrowDateString]: { data: tomorrowRes },
        }),
      );
    }
  }, [todayRes, tomorrowRes, todayDateString, tomorrowDateString]);

  const refreshBibleGatewayLinks = useCallback(() => {
    if (window.BGLinks) {
      window.BGLinks.version = "ESV";
      window.BGLinks.linkVerses();
    }
  }, []);

  useEffect(() => {
    if (!isLoading) {
      refreshBibleGatewayLinks();
    }
  }, [isLoading, refreshBibleGatewayLinks]);

  const today: LectionaryDay = {
    date: todayFormatted,
    data: getTodayData(),
  };

  const tomorrow: LectionaryDay = {
    date: tomorrowFormatted,
    data: getTomorrowData(),
  };

  return {
    isLoading,
    today,
    tomorrow,
    refreshBibleGatewayLinks,
  };
};
