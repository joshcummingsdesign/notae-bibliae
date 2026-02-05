export interface HagiographyReading {
  link?: string;
  morning?: string;
  evening?: string;
}

export interface HagiographyResponse {
  title: string;
  link?: string;
  morning?: string;
  evening?: string;
}

export interface HagiographyDateMap {
  [date: string]: HagiographyResponse;
}
