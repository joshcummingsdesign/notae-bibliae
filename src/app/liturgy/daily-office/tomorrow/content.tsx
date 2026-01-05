"use client";
import { Today } from "@/components/Calendar";
import { Loader } from "@/components/Loader";
import { Initial } from "@/components/text/Initial";
import { Calendar, CalendarItem, CalendarRes } from "@/models/calendar";
import { LessonRes, OfficeDay } from "@/models/lessons/types";
import { styled } from "@mui/material";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface TodayData {
  season: string;
  date: string;
  events: CalendarItem[];
}

export const Content = () => {
  const [tomorrow, setTomorrow] = useState<CalendarRes | null>(null);
  const [lessons, setLessons] = useState<LessonRes | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const linksTimeout = useRef<NodeJS.Timeout | null>(null);

  const calendar = useMemo(() => new Calendar(), []);

  const dateString = useMemo(
    () => calendar.getToday().add(1, "day").format("YYYY-MM-DD"),
    [calendar]
  );

  const getOffice = (): OfficeDay | null => {
    if (!lessons) return null;
    return lessons[dateString];
  };

  const office = getOffice();

  const getTomorrow = useCallback((): TodayData | null => {
    if (!tomorrow) return null;

    const season = Object.keys(tomorrow)[1];
    const events = tomorrow[season][dateString] || [];

    return {
      season,
      date: calendar.getToday().format("dddd, MMMM D"),
      events,
    };
  }, [tomorrow, dateString, calendar]);

  useEffect(() => {
    fetch("/api/calendar/tomorrow")
      .then((res) => res.json())
      .then((data) => setTomorrow(data));

    fetch("/api/lectionary/tomorrow")
      .then((res) => res.json())
      .then((data) => setLessons(data));
  }, []);

  useEffect(() => {
    if (lessons) {
      setIsLoading(false);
    }
  }, [lessons]);

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

  return (
    <>
      {isLoading && <Loader />}
      <Wrapper isLoading={isLoading}>
        <Initial text="Daily Office: Tomorrow" />
        {!isLoading && <Today {...getTomorrow()!} />}
        {office && (
          <>
            <h2>Morning</h2>
            <p>
              <strong>First Lesson: {office.morning.first}</strong>
            </p>
            <p>
              <strong>Second Lesson: {office.morning.second}</strong>
            </p>
            <h2>Evening</h2>
            <p>
              <strong>First Lesson: {office.evening.first}</strong>
            </p>
            <p>
              <strong>Second Lesson: {office.evening.second}</strong>
            </p>
          </>
        )}
      </Wrapper>
    </>
  );
};

const Wrapper = styled("div", {
  shouldForwardProp: (prop) => prop !== "isLoading",
})<{ isLoading: boolean }>(({ isLoading }) => ({
  opacity: isLoading ? 0 : 1,
  visibility: isLoading ? "hidden" : "visible",
  lineHeight: isLoading ? 0 : undefined,
  height: isLoading ? 0 : undefined,
  overflow: isLoading ? "hidden" : undefined,
  transition: "opacity 0.3s ease-in-out",
}));
