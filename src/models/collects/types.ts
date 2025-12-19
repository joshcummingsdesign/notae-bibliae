import { CalendarItem } from "../calendar";

export interface CollectItem {
  title: string;
  text: string;
}

export interface CollectCalendarItem extends CalendarItem {
  collect: string;
}

export interface CollectDateMap {
  [date: string]: CollectCalendarItem[];
}

export interface CurrentCollects {
  primary: CollectCalendarItem | null;
  secondary: CollectCalendarItem[];
}
