export const revalidate = 86400;

import { Metadata } from "next";
import Content from "./content.mdx";

export const metadata: Metadata = {
  title: "Daily Office: Evening Prayer — Notae Bibliae",
  description: "An office of Evening Prayer.",
};

export default function Page() {
  return <Content />;
}
