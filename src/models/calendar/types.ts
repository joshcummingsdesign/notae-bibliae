export interface CalendarItem {
  date: string; // YYYY-MM-DD | liturgicalYear-MM-DD | calendarYear-MM-DD
  title: string; // Markdown
  rank: number; // Arbitrary rank for view: 1-5
  class: number; // Sarum Rank: PPS = 1, PD = 2, GPS = 3, GD = 4...L/IPS = 7...V = 12
  isFeast?: boolean;
  isSaint?: boolean;
}

export type SeasonName =
  | "Advent"
  | "Christmastide"
  | "Epiphanytide"
  | "Pre-Lent"
  | "Lent"
  | "Eastertide"
  | "Whitsuntide"
  | "Trinitytide";

export interface Season {
  name: SeasonName;
  start: string;
  end: string;
}

export interface DateMap {
  [date: string]: CalendarItem[];
}

export type SeasonItems = Record<SeasonName, DateMap>;

export type FormattedSeasonItems = Record<SeasonName, string[]>;

export interface AntiphonData {
  title: string;
  text: string;
  link: string;
  verse: string;
}

export type AntiphonMap = { [date: string]: AntiphonData };
