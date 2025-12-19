import path from "path";
import { promises as fs } from "fs";
import * as yaml from "js-yaml";
import { NextResponse } from "next/server";
import { FamilyTreeResponse } from "@/types/FamilyTree";

export async function GET() {
  const filePath = path.join(
    process.cwd(),
    "src/app/api/family-tree/data.yaml"
  );
  const file = await fs.readFile(filePath, "utf-8");
  const res = yaml.load(file) as FamilyTreeResponse;
  return NextResponse.json(res);
}
