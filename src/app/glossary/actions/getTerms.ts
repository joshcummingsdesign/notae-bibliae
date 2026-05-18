import path from "path";
import { promises as fs } from "fs";

export interface Terms {
  title: string;
  link: string;
}

const parseTerms = async (
  filename: string,
  pathname: string
): Promise<Terms[]> => {
  const filePath = path.join(process.cwd(), filename);
  const content = await fs.readFile(filePath, "utf-8");
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

export const getTerms = async (): Promise<Terms[]> => {
  const [liturgical, historical, theological] = await Promise.all([
    parseTerms(
      "src/app/glossary/liturgical-terms/page.mdx",
      "/glossary/liturgical-terms"
    ),
    parseTerms(
      "src/app/glossary/historical-terms/page.mdx",
      "/glossary/historical-terms"
    ),
    parseTerms(
      "src/app/glossary/theological-terms/page.mdx",
      "/glossary/theological-terms"
    ),
  ]);

  return [...liturgical, ...historical, ...theological];
};
