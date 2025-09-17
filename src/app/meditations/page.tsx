import { Suspense, use } from "react";
import { getAllPosts } from "./actions";
import { Meditations } from "./meditations";

export default function MeditationsPage() {
  const posts = use(getAllPosts());
  return (
    <Suspense>
      <Meditations allPosts={posts} />
    </Suspense>
  );
}
