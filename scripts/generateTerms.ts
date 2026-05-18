import path from "path";
import { promises as fs } from "fs";

interface Terms {
  title: string;
  link: string;
}

const TERMS_SOURCES = [
  { file: "src/app/glossary/liturgical-terms/page.mdx", path: "/glossary/liturgical-terms" },
  { file: "src/app/glossary/historical-terms/page.mdx", path: "/glossary/historical-terms" },
  { file: "src/app/glossary/theological-terms/page.mdx", path: "/glossary/theological-terms" },
];

const parseTermsFromFile = async (
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

async function main() {
  const results = await Promise.all(
    TERMS_SOURCES.map(({ file, path: pathname }) =>
      parseTermsFromFile(file, pathname)
    )
  );
  const terms = results.flat();

  const outputPath = path.join(
    process.cwd(),
    "src/app/glossary/actions/terms.json"
  );
  await fs.writeFile(outputPath, JSON.stringify(terms, null, 2));
  console.log(`Generated ${terms.length} terms to ${outputPath}`);
}

main();
