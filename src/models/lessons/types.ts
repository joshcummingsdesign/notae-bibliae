export interface Office {
  first: string[];
  second: string[];
}

export interface OfficeDay {
  title: string;
  morning: Office;
  evening: Office;
}

export interface LessonDateMap {
  [date: string]: OfficeDay;
}

export type LessonRes = {
  liturgicalYear: number;
} & LessonDateMap;

export interface AlternateReadings {
  morning?: Partial<Office>;
  evening?: Partial<Office>;
}

export interface Alternates {
  afterSeptuagesima?: AlternateReadings;
  afterEaster?: AlternateReadings;
  inFirstSundayAfterTrinity?: AlternateReadings;
  afterThirdSundayAfterTrinity?: AlternateReadings;
  inOrAfterThirdSundayAfterTrinity?: AlternateReadings;
}

export interface LessonEntry {
  morning: Office;
  evening: Office;
  alternates?: Alternates;
}
