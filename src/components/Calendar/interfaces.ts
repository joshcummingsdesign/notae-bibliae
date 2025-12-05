export interface CalendarItem {
  date: string; // YYYY-MM-DD | liturgicalYear-MM-DD | calendarYear-MM-DD
  title: string; // Markdown
  rank: number;
}

export interface Season {
  name: string;
  start: string;
  end: string;
}

export interface SeasonMap {
  [season: string]: CalendarItem[];
}

export interface DateMap {
  [date: string]: CalendarItem[];
}

export interface FormattedSeasonMap {
  [season: string]: string[];
}
