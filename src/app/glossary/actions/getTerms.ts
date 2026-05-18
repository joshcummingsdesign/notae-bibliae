import path from "path";
import { promises as fs } from "fs";

export interface Terms {
  title: string;
  link: string;
}

export const TERMS_SOURCES = [
  { file: "src/app/glossary/liturgical-terms/page.mdx", path: "/glossary/liturgical-terms" },
  { file: "src/app/glossary/historical-terms/page.mdx", path: "/glossary/historical-terms" },
  { file: "src/app/glossary/theological-terms/page.mdx", path: "/glossary/theological-terms" },
] as const;

export const parseTermsFromContent = (content: string, pathname: string): Terms[] => {
  const matches = [...content.matchAll(/^##\s+(.*)$/gm)].map((m) => m[1]);

  return matches.map((text) => ({
    title: "Term: " + text,
    link:
      pathname +
      "#" +
      text
        .toLowerCase()
        .replace(/[*_~`]/g, "")
        .replace(/[^a-z0-9\s-]/g, "")
        .trim()
        .replace(/\s+/g, "-"),
  }));
};

export const generateAllTerms = async (): Promise<Terms[]> => {
  const results = await Promise.all(
    TERMS_SOURCES.map(async ({ file, path: pathname }) => {
      const filePath = path.join(process.cwd(), file);
      const content = await fs.readFile(filePath, "utf-8");
      return parseTermsFromContent(content, pathname);
    })
  );
  return results.flat();
};

export const getTerms = async (): Promise<Terms[]> => {
  if (process.env.NODE_ENV === "production") {
    const terms = await import("./terms.json");
    return terms.default;
  }
  return generateAllTerms();
};
