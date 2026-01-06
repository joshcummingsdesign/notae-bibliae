import { CollectCalendarItem, CollectRes } from "@/models/collects";
import { Calendar, CalendarItem, CalendarRes } from "@/models/calendar";
import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { LessonRes, Office } from "@/models/lessons/types";

interface TodayData {
  season: string;
  date: string;
  events: CalendarItem[];
}

export const useDailyOffice = (office: "morning" | "evening") => {
  const [today, setToday] = useState<CalendarRes | null>(null);
  const [collects, setCollects] = useState<CollectRes | null>(null);
  const [lessons, setLessons] = useState<LessonRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const calendar = useMemo(() => new Calendar(), []);

  const dateString = useMemo(
    () => calendar.getToday().format("YYYY-MM-DD"),
    [calendar]
  );

  const getToday = useCallback((): TodayData | null => {
    if (!today) return null;

    const season = Object.keys(today)[1];
    const events = today[season][dateString] || [];

    return {
      season,
      date: calendar.getToday().format("dddd, MMMM D"),
      events,
    };
  }, [today, dateString, calendar]);

  const getLessons = useCallback((): Office | null => {
    if (!lessons) return null;
    return lessons[dateString][office];
  }, [lessons, dateString, office]);

  const getCollects = useCallback((): CollectCalendarItem[] | null => {
    if (!collects) return null;
    return collects[dateString];
  }, [collects, dateString]);

  useEffect(() => {
    // Get cached data
    const retrieved = localStorage.getItem(`${office}-prayer`);
    if (retrieved) {
      const cached = JSON.parse(retrieved);
      if (cached[dateString]) {
        const { today, lessons, collects } = cached[dateString];
        setToday(today);
        setLessons(lessons);
        setCollects(collects);
        return;
      }
    }

    // Otherwise, fetch new data in parallel
    Promise.all([
      fetch("/api/calendar/today?withLinks=true").then((res) => res.json()),
      fetch("/api/lectionary/today").then((res) => res.json()),
      fetch("/api/collects/today").then((res) => res.json()),
    ])
      .then(([todayData, lessonsData, collectsData]) => {
        setToday(todayData);
        setLessons(lessonsData);
        setCollects(collectsData);
      })
      .catch((error) => {
        console.error("Error fetching daily office data:", error);
      });
  }, []);

  useEffect(() => {
    if (today && lessons && collects) {
      setIsLoading(false);
      // Cache responses
      localStorage.setItem(
        `${office}-prayer`,
        JSON.stringify({ [dateString]: { today, lessons, collects } })
      );
    }
  }, [today, lessons, collects, dateString, office]);

  useEffect(() => {
    if (!isLoading) {
      // Re-render biblegateway links after content has loaded
      if (window.BGLinks) {
        window.BGLinks.version = "ESV";
        window.BGLinks.linkVerses();
      }
    }
  }, [isLoading]);

  const calendarData = useMemo(() => {
    const isSolemn = calendar.isSolemn();
    const isOctaveOfEaster = calendar.isOctaveOfEaster();
    const isEaster = calendar.isEaster();
    const isPentecost = calendar.isPentecost();
    const isChristmas = calendar.isChristmas();
    const isWhitsuntide = calendar.isWhitsuntide();
    const isAdvent = calendar.isAdvent();
    const isChristmastide = calendar.isChristmastide();
    const isEastertide = calendar.isEastertide();
    const isLordsDay = calendar.isLordsDay();
    const isFeastDay = calendar.isFeastDay();
    const isEve = office === "evening" && calendar.isEve();
    const isFestal = isEve || isFeastDay || isLordsDay;
    const isFerial = isSolemn || !isFestal;
    const oAntiphons = calendar.getOAntiphons();
    const currentAntiphon = oAntiphons[dateString];
    const isFeastOfASaint = calendar.isFeastOfASaint();
    const isTransfiguration = calendar.isTransfiguration();
    const isAnnunciation = calendar.isAnnunciation();
    const isPurification = calendar.isPurification();
    const isAscensiontide = calendar.isAscensiontide();
    const isEpiphanytide = calendar.isEpiphanytide();
    const isLent = calendar.isLent();
    const isTrinitytide = calendar.isTrinitytide();
    const isOctaveOfEpiphany = calendar.isOctaveOfEpiphany();
    const isHolyInnocents = calendar.isHolyInnocents();
    const isSeptuagesimaToPassion = calendar.isSeptuagesimaToPassion();
    const isRogationDay = calendar.isRogationDay();

    return {
      isSolemn,
      isOctaveOfEaster,
      isEaster,
      isPentecost,
      isChristmas,
      isWhitsuntide,
      isAdvent,
      isChristmastide,
      isEastertide,
      isLordsDay,
      isFeastDay,
      isFestal,
      isFerial,
      currentAntiphon,
      isFeastOfASaint,
      isTransfiguration,
      isAnnunciation,
      isPurification,
      isAscensiontide,
      isEpiphanytide,
      isLent,
      isTrinitytide,
      isOctaveOfEpiphany,
      isHolyInnocents,
      isSeptuagesimaToPassion,
      isRogationDay,
    };
  }, [calendar, dateString]);

  const invitatoryPage = useMemo(() => {
    let page = 306; // Default: Advent
    if (calendarData.isFeastOfASaint) {
      page = 324;
    } else if (calendarData.isTransfiguration) {
      page = 310;
    } else if (calendarData.isAnnunciation) {
      page = 322;
    } else if (calendarData.isPurification) {
      page = 322;
    } else if (calendarData.isAscensiontide) {
      page = 316;
    } else if (calendarData.isAdvent) {
      page = 306;
    } else if (calendarData.isChristmastide) {
      page = 308;
    } else if (calendarData.isEpiphanytide) {
      page = 310;
    } else if (calendarData.isLent) {
      page = 312;
    } else if (calendarData.isEastertide) {
      page = 314;
    } else if (calendarData.isWhitsuntide) {
      page = 318;
    } else if (calendarData.isTrinitytide) {
      page = 320;
    }
    return page;
  }, [calendarData]);

  const shouldSingTeDeum = useMemo(
    () =>
      calendarData.isFeastDay ||
      calendarData.isLordsDay ||
      calendarData.isChristmastide ||
      calendarData.isOctaveOfEpiphany ||
      calendarData.isEastertide ||
      calendarData.isWhitsuntide,
    [calendarData]
  );

  const shouldOmitTeDeum = useMemo(
    () =>
      calendarData.isAdvent ||
      (calendarData.isHolyInnocents && !calendarData.isLordsDay) ||
      calendarData.isSeptuagesimaToPassion ||
      calendarData.isRogationDay ||
      calendarData.isSolemn,
    [calendarData]
  );

  return {
    isLoading,
    isLordsDay: calendarData.isLordsDay,
    isFerial: calendarData.isFerial,
    isSolemn: calendarData.isSolemn,
    isChristmas: calendarData.isChristmas,
    isEaster: calendarData.isEaster,
    isOctaveOfEaster: calendarData.isOctaveOfEaster,
    isPentecost: calendarData.isPentecost,
    invitatoryPage,
    shouldSingTeDeum,
    shouldOmitTeDeum,
    currentAntiphon: calendarData.currentAntiphon,
    dateString,
    today: getToday(),
    lessons: getLessons(),
    collects: getCollects(),
  };
};
