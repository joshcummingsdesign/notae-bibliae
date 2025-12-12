export interface CalendarItem {
  date: string; // YYYY-MM-DD | liturgicalYear-MM-DD | calendarYear-MM-DD
  title: string; // Markdown
  rank: number; // Arbitrary rank for view: 1-5
  class: number; // Sarum Rank: PPS = 1, PD = 2, GPS = 3, GD = 4...L/IPS = 7...V = 12
  isFeast?: boolean;
  isSaint?: boolean;
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
