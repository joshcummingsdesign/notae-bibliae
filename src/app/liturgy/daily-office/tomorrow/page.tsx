import { Metadata } from "next";
import { Content } from "./content";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Daily Office: Tomorrow — Notae Bibliae",
  description: "Tomorrow's Order for the Daily Office.",
};

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
