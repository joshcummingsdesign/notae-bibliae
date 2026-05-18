import path from "path";
import { promises as fs } from "fs";
import { generateAllTerms } from "../src/app/glossary/actions/getTerms";

async function main() {
  const terms = await generateAllTerms();
  const outputPath = path.join(
    process.cwd(),
    "src/app/glossary/actions/terms.json"
  );
  await fs.writeFile(outputPath, JSON.stringify(terms, null, 2));
  console.log(`Generated ${terms.length} terms to ${outputPath}`);
}

main();
