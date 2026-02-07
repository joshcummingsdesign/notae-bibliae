export interface Office {
  first: string[];
  second: string[];
}

export interface Communion {
  epistle: string[];
  gospel: string[];
  source: string;
}

export interface OfficeDay {
  title: string;
  morning: Office;
  evening: Office;
  communion?: Communion;
}

export interface LessonDateMap {
  [date: string]: OfficeDay;
}

export type LessonRes = {
  liturgicalYear: number;
} & LessonDateMap;
