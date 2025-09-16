import { use } from "react";
import { getAllPosts } from "./getAllPosts";
import { Meditations } from "./meditations";

export default function MeditationsPage() {
  const posts = use(getAllPosts());
  return <Meditations allPosts={posts} />;
}
