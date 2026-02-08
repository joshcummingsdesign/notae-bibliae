import dayjs, { Dayjs } from "dayjs";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import { Calendar, SeasonName } from "../calendar";
import { Collects, CollectItem } from "../collects";
import { Communion, CommunionItem } from "../communion";
import { Hagiography } from "../hagiography";
import { Lessons as LessonsModel } from "../lessons";
import { stripMarkdownLinks } from "@/utils/markdown";
import { LectionaryDateMap, LectionaryItem, Lessons } from "./types";

dayjs.extend(isSameOrBefore);
dayjs.extend(isBetween);

export class Lectionary {
  private calendar: Calendar;
  private collects: Collects;
  private communion: Communion;
  private hagiography: Hagiography;
  private lessons: LessonsModel;

  constructor(calendar: Calendar) {
    this.calendar = calendar;
    this.collects = new Collects(calendar);
    this.communion = new Communion(calendar);
    this.hagiography = new Hagiography(calendar);
    this.lessons = new LessonsModel(calendar);
  }

  getAll(withLinks: boolean = false): LectionaryDateMap {
    const calendarData = this.calendar.getAll();
    const seasons = this.calendar.getSeasons();
    const collectData = this.collects.getAll();
    const communionData = this.communion.getAll();
    const hagiographyData = this.hagiography.getAll(withLinks);
    const lessonData = this.lessons.getAll();

    const startDate = this.calendar.getFirstSundayOfAdvent();
    const endDate = this.calendar.getNextFirstSundayOfAdvent().subtract(1, "day");

    const output: LectionaryDateMap = {};
    let currentDay = startDate;

    while (currentDay.isSameOrBefore(endDate, "day")) {
      const date = currentDay.format("YYYY-MM-DD");

      // Get season for this date
      const season = seasons.find(s =>
        currentDay.isBetween(dayjs(s.start), dayjs(s.end), "day", "[]")
      )?.name || "" as SeasonName | "";

      // Get observances from calendar or lessons
      const events = calendarData[date] || [];
      const dayLessons = lessonData[date];

      // Primary observance: calendar event title, or lessons title (e.g., "Tuesday After the Fourth Sunday of Epiphany")
      // When withLinks=false (default), strip markdown links
      const formatTitle = (title: string) => withLinks ? title : stripMarkdownLinks(title);
      const primaryObservance = events[0]
        ? formatTitle(events[0].title)
        : (dayLessons?.title || "");
      const secondaryObservance = events[1] ? formatTitle(events[1].title) : undefined;

      // Get collects for this day (convert to CollectItem format)
      // Morning: exclude vigils; Evening: only vigils if any exist, otherwise all
      const dayCollects = collectData[date] || [];
      const allCollectItems: CollectItem[] = dayCollects.map(c => ({
        title: c.title,
        text: c.collect,
        source: c.source,
        notes: c.notes,
      }));
      const hasVigil = dayCollects.some(c => c.isVigil);
      const morningCollects = allCollectItems.filter((_, i) => !dayCollects[i].isVigil);
      const eveningCollects = hasVigil
        ? allCollectItems.filter((_, i) => dayCollects[i].isVigil)
        : allCollectItems;

      // Get communion for this day - morning uses non-vigil, evening uses vigil
      const dayCommunions = communionData[date] || [];
      const morningCommunion = dayCommunions.find(c => !c.isVigil);
      const eveningCommunion = dayCommunions.find(c => c.isVigil);

      const morningCommunionItem: CommunionItem | undefined = morningCommunion
        ? { epistle: morningCommunion.epistle, gospel: morningCommunion.gospel, source: morningCommunion.source }
        : undefined;
      const eveningCommunionItem: CommunionItem | undefined = eveningCommunion
        ? { epistle: eveningCommunion.epistle, gospel: eveningCommunion.gospel, source: eveningCommunion.source }
        : undefined;

      // Get hagiography for this day
      const dayHagiography = hagiographyData[date];

      // Build morning and evening lessons
      const morning: Lessons = {
        first: dayLessons?.morning?.first || [],
        second: dayLessons?.morning?.second || [],
        third: dayHagiography?.morning
          ? { title: dayHagiography.title, reading: dayHagiography.morning }
          : undefined,
        communion: morningCommunionItem,
        collects: morningCollects,
      };

      const evening: Lessons = {
        first: dayLessons?.evening?.first || [],
        second: dayLessons?.evening?.second || [],
        third: dayHagiography?.evening
          ? { title: dayHagiography.title, reading: dayHagiography.evening }
          : undefined,
        communion: eveningCommunionItem,
        collects: eveningCollects,
      };

      output[date] = {
        season,
        primaryObservance,
        secondaryObservance,
        morning,
        evening,
      };

      currentDay = currentDay.add(1, "day");
    }

    return output;
  }

  getByDay(date: Dayjs = this.calendar.getToday(), withLinks: boolean = false): LectionaryItem | undefined {
    return this.getAll(withLinks)[date.format("YYYY-MM-DD")];
  }
}
