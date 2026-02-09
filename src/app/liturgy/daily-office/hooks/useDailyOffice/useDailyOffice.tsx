import { Calendar } from "@/models/calendar";
import { useEffect, useState, useMemo, useCallback } from "react";
import { LectionaryItem, LectionaryRes } from "@/models/lectionary";

export const useDailyOffice = (office: "morning" | "evening") => {
  const [lectionaryData, setLectionaryData] = useState<LectionaryRes | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const calendar = useMemo(() => new Calendar(), []);

  const dateString = useMemo(
    () => calendar.getToday().format("YYYY-MM-DD"),
    [calendar],
  );

  const fullDateString = useMemo(
    () => calendar.getToday().format("dddd, MMMM D"),
    [calendar],
  );

  const getLectionaryData = useCallback((): LectionaryItem | null => {
    if (!lectionaryData) return null;
    return lectionaryData[dateString];
  }, [lectionaryData, dateString]);

  useEffect(() => {
    // Get cached data
    const retrieved = localStorage.getItem("daily-office");
    if (retrieved) {
      const cached = JSON.parse(retrieved);
      if (cached[dateString]) {
        const { lectionaryData } = cached[dateString];
        setLectionaryData(lectionaryData);
        return;
      }
    }

    // Otherwise, fetch new data
    fetch("/api/lectionary/today?withLinks=true")
      .then((res) => res.json())
      .then((lectionaryData) => {
        setLectionaryData(lectionaryData);
      })
      .catch((error) => {
        console.error("Error fetching daily office data:", error);
      });
  }, []);

  // Cache responses
  useEffect(() => {
    if (lectionaryData) {
      setIsLoading(false);
      localStorage.setItem(
        "daily-office",
        JSON.stringify({
          [dateString]: { lectionaryData },
        }),
      );
    }
  }, [lectionaryData, dateString]);

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
    const isOctaveOfChristmas = calendar.isOctaveOfChristmas();
    const isOctaveOfEpiphany = calendar.isOctaveOfEpiphany();
    const isOctaveOfEaster = calendar.isOctaveOfEaster();
    const isOctaveOfPentecost = calendar.isOctaveOfPentecost();
    const isEaster = calendar.isEaster();
    const isPentecost = calendar.isPentecost();
    const isChristmas = calendar.isChristmas();
    const isWhitsuntide = calendar.isWhitsuntide();
    const isAdvent = calendar.isAdvent();
    const isChristmastide = calendar.isChristmastide();
    const isEastertide = calendar.isEastertide();
    const oAntiphons = calendar.getOAntiphons();
    const currentAntiphon = oAntiphons[dateString];
    const isSaintDay = calendar.isSaintDay();
    const isTransfiguration = calendar.isTransfiguration();
    const isAnnunciation = calendar.isAnnunciation();
    const isEmberDayInWhitsuntide = calendar.isEmberDayInWhitsuntide();
    const isPurification = calendar.isPurification();
    const isAscensiontide = calendar.isAscensiontide();
    const isEpiphanytide = calendar.isEpiphanytide();
    const isLent = calendar.isLent();
    const isPreLent = calendar.isPreLent();
    const isTrinitytide = calendar.isTrinitytide();
    const isHolyInnocents = calendar.isHolyInnocents();
    const isSeptuagesimaToEaster = calendar.isSeptuagesimaToEaster();
    const isRogationDay = calendar.isRogationDay();
    const isLordsDay = calendar.isLordsDay();
    const isFeastDay = calendar.isFeastDay();
    const isOctave =
      isOctaveOfChristmas ||
      isOctaveOfEpiphany ||
      isOctaveOfEaster ||
      isOctaveOfPentecost;
    const isVigil = office === "evening" && calendar.isVigil();
    const isFestal = isVigil || isFeastDay || isLordsDay;
    let isFerial = isSolemn || !isFestal;

    // Octaves are not ferial unless Holy Innocents, and Ember Days
    if (isOctave && !isVigil) {
      if ((isHolyInnocents && !isLordsDay) || isEmberDayInWhitsuntide) {
        isFerial = true;
      } else {
        isFerial = false;
      }
    }

    return {
      isSolemn,
      isOctaveOfChristmas,
      isOctaveOfEpiphany,
      isOctaveOfEaster,
      isOctaveOfPentecost,
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
      isSaintDay,
      isTransfiguration,
      isAnnunciation,
      isEmberDayInWhitsuntide,
      isPurification,
      isAscensiontide,
      isEpiphanytide,
      isLent,
      isPreLent,
      isTrinitytide,
      isHolyInnocents,
      isSeptuagesimaToEaster,
      isRogationDay,
    };
  }, [calendar, dateString]);

  const invitatoryPage = useMemo(() => {
    let page = 306; // Default: Advent
    if (calendarData.isSaintDay) {
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
    } else if (calendarData.isLent || calendarData.isPreLent) {
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
    [calendarData],
  );

  const shouldOmitTeDeum = useMemo(
    () =>
      calendarData.isRogationDay ||
      calendarData.isEmberDayInWhitsuntide ||
      calendarData.isAdvent ||
      (calendarData.isHolyInnocents && !calendarData.isLordsDay) ||
      calendarData.isSeptuagesimaToEaster ||
      calendarData.isSolemn,
    [calendarData],
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
    today: fullDateString,
    lectionaryData: getLectionaryData(),
  };
};
