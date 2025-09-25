import { Suspense, use } from "react";
import { getAllPosts } from "./actions";
import { Meditations } from "./Meditations";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Meditations — Notae Bibliae",
  description: "A collection of biblical meditations.",
};

export default function MeditationsPage() {
  const posts = use(getAllPosts());
  return (
    <Suspense>
      <Meditations allPosts={posts} />
    </Suspense>
  );
}
