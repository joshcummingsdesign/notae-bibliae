import { LectionaryDateMap } from "./types";

const cache = new Map<string, LectionaryDateMap>();

export function getCachedLectionary(
  liturgicalYear: number,
  withLinks: boolean
): LectionaryDateMap | undefined {
  return cache.get(`${liturgicalYear}-${withLinks}`);
}

export function setCachedLectionary(
  liturgicalYear: number,
  withLinks: boolean,
  data: LectionaryDateMap
): void {
  cache.set(`${liturgicalYear}-${withLinks}`, data);
}
