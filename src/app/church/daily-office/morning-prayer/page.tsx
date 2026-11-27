import { Metadata } from "next";
import { Content } from "./content";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Daily Office: Morning Prayer — Notae Bibliae",
  description: "An Order of Morning Prayer.",
};

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
