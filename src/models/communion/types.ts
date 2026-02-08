import { CalendarItem } from "../calendar";

export interface CommunionItem {
  epistle: string[];
  gospel: string[];
  source?: string;
}

export interface CommunionCalendarItem extends CalendarItem {
  epistle: string[];
  gospel: string[];
  source?: string;
}

export interface CommunionDateMap {
  [date: string]: CommunionCalendarItem[];
}

export type CommunionRes = {
  liturgicalYear: number;
} & CommunionDateMap;
