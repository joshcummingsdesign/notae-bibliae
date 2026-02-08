import { CalendarItem } from "../calendar";

export interface CollectItem {
  title: string;
  text: string;
  source?: string;
  notes?: string;
}

export interface CollectCalendarItem extends CalendarItem {
  collect: string;
  source?: string;
  notes?: string;
}

export interface CollectDateMap {
  [date: string]: CollectCalendarItem[];
}

export type CollectRes = {
  liturgicalYear: number;
} & CollectDateMap;
