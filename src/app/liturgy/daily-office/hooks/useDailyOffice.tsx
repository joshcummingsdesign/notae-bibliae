import { Dayjs } from "dayjs";
import { CollectCalendarItem, CollectRes } from "@/models/collects";
import { Calendar, CalendarItem, CalendarRes } from "@/models/calendar";
import { useEffect, useRef, useState } from "react";
import { LessonRes, Office } from "@/models/lessons/types";

interface TodayData {
  season: string;
  date: string;
  events: CalendarItem[];
}

export const useDailyOffice = (id: "morning" | "evening") => {
  const [today, setToday] = useState<CalendarRes | null>(null);
  const [collects, setCollects] = useState<CollectRes | null>(null);
  const [lessons, setLessons] = useState<LessonRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const linksTimeout = useRef<NodeJS.Timeout | null>(null);

  const calendar = new Calendar();

  const getDate = (): Dayjs => {
    return calendar.getToday();
  };

  const getDateString = (): string => {
    return calendar.getToday().format("YYYY-MM-DD");
  };

  const getToday = (): TodayData | null => {
    if (!today) return null;

    const season = Object.keys(today)[1];
    const date = getDate();
    const dateString = getDateString();
    const events = today[season][dateString] || [];

    return {
      season,
      date: date.format("dddd, MMMM D"),
      events,
    };
  };

  const getLessons = (): Office | null => {
    if (!lessons) return null;
    const dateString = getDateString();
    return lessons[dateString][id];
  };

  const getCollects = (): CollectCalendarItem[] | null => {
    if (!collects) return null;
    const dateString = getDateString();
    return collects[dateString];
  };

  useEffect(() => {
    // Get cached data
    const retrieved = localStorage.getItem(`${id}-prayer`);
    if (retrieved) {
      const cached = JSON.parse(retrieved);
      if (cached[getDateString()]) {
        const { today, lessons, collects } = cached[getDateString()];
        setToday(today);
        setLessons(lessons);
        setCollects(collects);
        return;
      }
    }

    // Otherwise, fetch new data
    fetch("/api/calendar/today")
      .then((res) => res.json())
      .then((data) => setToday(data));

    fetch("/api/lectionary/today")
      .then((res) => res.json())
      .then((data) => setLessons(data));

    fetch("/api/collects/today")
      .then((res) => res.json())
      .then((data) => setCollects(data));
  }, []);

  useEffect(() => {
    if (today && lessons && collects) {
      setIsLoading(false);
      // Cache responses
      localStorage.setItem(
        `${id}-prayer`,
        JSON.stringify({ [getDateString()]: { today, lessons, collects } })
      );
    }
  }, [today, lessons, collects]);

  useEffect(() => {
    if (!isLoading) {
      // Re-render biblegateway links after content has loaded
      linksTimeout.current && clearTimeout(linksTimeout.current);
      linksTimeout.current = setTimeout(() => {
        if (window.BGLinks) {
          window.BGLinks.version = "ESV";
          window.BGLinks.linkVerses();
        }
      }, 300);
    }
  }, [isLoading]);

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
  const isFestal = isFeastDay || isLordsDay;
  const isFerial = isSolemn || !isFestal;
  const oAntiphons = calendar.getOAntiphons();
  const currentAntiphon = oAntiphons[getDateString()];

  let invitatoryPage = 306; // Default: Advent
  if (calendar.isFeastOfASaint()) {
    invitatoryPage = 324;
  } else if (calendar.isTransfiguration()) {
    invitatoryPage = 310;
  } else if (calendar.isAnnunciation()) {
    invitatoryPage = 322;
  } else if (calendar.isPurification()) {
    invitatoryPage = 322;
  } else if (calendar.isAscensiontide()) {
    invitatoryPage = 316;
  } else if (isAdvent) {
    invitatoryPage = 306;
  } else if (isChristmastide) {
    invitatoryPage = 308;
  } else if (calendar.isEpiphanytide()) {
    invitatoryPage = 310;
  } else if (calendar.isLent()) {
    invitatoryPage = 312;
  } else if (isEastertide) {
    invitatoryPage = 314;
  } else if (isWhitsuntide) {
    invitatoryPage = 318;
  } else if (calendar.isTrinitytide()) {
    invitatoryPage = 320;
  }

  const shouldSingTeDeum =
    isFeastDay ||
    isLordsDay ||
    isChristmastide ||
    calendar.isOctaveOfEpiphany() ||
    isEastertide ||
    isWhitsuntide;

  const shouldOmitTeDeum =
    isAdvent ||
    (calendar.isHolyInnocents() && !isLordsDay) ||
    calendar.isSeptuagesimaToPassion() ||
    calendar.isRogationDay() ||
    isSolemn;

  return {
    isLoading,
    isLordsDay,
    isFerial,
    isSolemn,
    isChristmas,
    isEaster,
    isOctaveOfEaster,
    isPentecost,
    invitatoryPage,
    shouldSingTeDeum,
    shouldOmitTeDeum,
    currentAntiphon,
    dateString: getDateString(),
    today: getToday(),
    lessons: getLessons(),
    collects: getCollects(),
  };
};
