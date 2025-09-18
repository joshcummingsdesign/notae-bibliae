import path from "path";
import { promises as fs } from "fs";
import { NextResponse } from "next/server";

export interface Glossary {
  english: { [anchor: string]: string };
  latin: { [anchor: string]: string };
  greek: { [anchor: string]: string };
  hebrew: { [anchor: string]: string };
}

export async function GET() {
  const filePaths = {
    english: path.join(process.cwd(), "src/app/glossary/english/page.mdx"),
    latin: path.join(process.cwd(), "src/app/glossary/latin/page.mdx"),
    greek: path.join(process.cwd(), "src/app/glossary/greek/page.mdx"),
    hebrew: path.join(process.cwd(), "src/app/glossary/hebrew/page.mdx"),
  };

  const glossary = await Promise.all(
    Object.entries(filePaths).map(async ([lang, filePath]) => {
      const content = await fs.readFile(filePath, "utf-8");
      return {
        lang,
        glossary: [
          ...content.matchAll(/<p id="(.*)">(.*)<\/p>/g).map((match) => ({
            anchor: match[1],
            content: match[2],
          })),
        ],
      };
    })
  );

  const res = glossary.reduce<Glossary>((acc, val) => {
    val.glossary.forEach((item) => {
      const language = val.lang as keyof Glossary;
      if (!acc[language]) {
        acc[language] = {};
      }
      return (acc[language][item.anchor] = item.content);
    });
    return acc;
  }, {} as Glossary);

  return NextResponse.json(res);
}
