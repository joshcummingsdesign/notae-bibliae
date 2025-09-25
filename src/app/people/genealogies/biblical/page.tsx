import { Metadata } from "next";
import { Suspense } from "react";
import { FamilyTreeContainer } from "./FamilyTree";

export const metadata: Metadata = {
  title: "Biblical Genealogy — Notae Bibliae",
  description: "A genealogy of biblical figures.",
};

export default function BiblicalGenealogyPage() {
  return (
    <Suspense>
      <FamilyTreeContainer />
    </Suspense>
  );
}
