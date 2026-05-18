import termsData from "./terms.json";

export interface Terms {
  title: string;
  link: string;
}

export const getTerms = (): Terms[] => {
  return termsData;
};
