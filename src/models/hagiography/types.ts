export interface HagiographyResponse {
  title: string;
}

export interface HagiographyDateMap {
  [date: string]: HagiographyResponse;
}
