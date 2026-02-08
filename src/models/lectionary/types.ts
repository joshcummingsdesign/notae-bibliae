import { SeasonName } from "../calendar";
import { CollectItem } from "../collects";
import { CommunionItem } from "../communion";

export interface ThirdLesson {
  title: string;
  reading?: string;
}

export interface Lessons {
  first: string[];
  second: string[];
  third?: ThirdLesson;
  communion?: CommunionItem;
  collects: CollectItem[];
}

export interface LectionaryItem {
  season: SeasonName | "";
  primaryObservance: string;
  secondaryObservance?: string;
  morning: Lessons;
  evening: Lessons;
}

export interface LectionaryDateMap {
  [date: string]: LectionaryItem;
}

export type LectionaryRes = {
  liturgicalYear: number;
} & LectionaryDateMap;
