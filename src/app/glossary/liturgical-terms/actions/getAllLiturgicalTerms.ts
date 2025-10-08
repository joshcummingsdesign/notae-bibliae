import path from "path";
import { promises as fs } from "fs";

export interface Terms {
  title: string;
  link: string;
}

export const getAllLiturgicalTerms = async (): Promise<Terms[]> => {
  const pathname = "/glossary/liturgical-terms";
  const filePath = path.join(process.cwd(), `src/app${pathname}/page.mdx`);
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
