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
