import { Metadata } from "next";
import { Container } from "./container";

export const metadata: Metadata = {
  title: "Daily Office: Morning Prayer — Notae Bibliae",
  description: "An Order of Morning Prayer.",
};

export default function Page() {
  return <Container />;
}
