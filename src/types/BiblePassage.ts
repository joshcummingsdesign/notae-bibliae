export interface BiblePassage {
  id: string;
  orgId: string;
  bibleId: string;
  bibleName: string;
  bookId: string;
  chapterIds: string[];
  reference: string;
  content: string;
  verseCount: number;
  copyright: string;
}
