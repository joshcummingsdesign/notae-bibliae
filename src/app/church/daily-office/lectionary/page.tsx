import { Metadata } from "next";
import { Content } from "./content";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Daily Office: Lectionary — Notae Bibliae",
  description:
    "Today's lessons from the 1928 Book of Common Prayer, with supplementary material from the Sarum Use.",
};

export default function Page() {
  return (
    <Suspense>
      <Content />
    </Suspense>
  );
}
