export interface HagiographyReading {
  morning?: string;
  evening?: string;
}

export interface HagiographyResponse {
  title: string;
  morning?: string;
  evening?: string;
}

export interface HagiographyDateMap {
  [date: string]: HagiographyResponse;
}
