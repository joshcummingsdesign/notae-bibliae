import { Metadata } from "next";
import { Content } from "./content";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Daily Office: Evening Prayer — Notae Bibliae",
  description: "An Order of Evening Prayer.",
};

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
