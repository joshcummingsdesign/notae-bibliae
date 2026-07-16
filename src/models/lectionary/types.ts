import { SeasonName } from "../calendar";
import { CollectItem } from "../collects";
import { CommunionItem } from "../communion";

export interface Lessons {
  first: string[];
  second: string[];
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
