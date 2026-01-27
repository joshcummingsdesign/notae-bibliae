/**
 * The Calendar Item Interface
 *
 * **Ranking System**
 * ```
 * Principal Sundays: 1
 * Principal Feast: 2
 * Major Observance: 3 // Ash Wed., Holy Week, All Souls
 * Feast: 4
 * Minor Observance: 5 // Ember Days, Rogation Days
 * Saint: 6
 * Sunday: 7
 * Vigil: 8
 * Note: 9
 * ```
 */
export interface CalendarItem {
  date: string; // YYYY-MM-DD
  title: string; // Markdown
  rank: number; // 1-9
  isPrincipalSunday?: boolean;
  isPrincipalFeast?: boolean;
  isSpecialObservance?: boolean;
  isFeast?: boolean;
  isSunday?: boolean;
  isVigil?: boolean;
  isSaint?: boolean;
  isNote?: boolean;
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

export interface SeasonMap {
  [season: string]: DateMap;
}

export type CalendarRes = {
  liturgicalYear: number;
} & SeasonMap;

export type SeasonItems = Record<SeasonName, DateMap>;

export type FormattedSeasonItems = Record<SeasonName, string[]>;

export interface AntiphonData {
  title: string;
  text: string;
  link: string;
  verse: string;
}

export type AntiphonMap = { [date: string]: AntiphonData };
