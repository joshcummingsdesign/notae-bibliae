import path from "path";
import { promises as fs } from "fs";

export interface PostMeta {
  title: string;
  date: string;
  description: string;
  categories: string[];
}

export interface Post extends PostMeta {
  slug: string;
}

export const getAllPosts = async () => {
  const postsDir = path.join(process.cwd(), "src/app/meditations/posts");
  let files = (await fs.readdir(postsDir)).filter((file) =>
    file.endsWith(".mdx")
  );

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const post = await import(`@/app/meditations/posts/${slug}.mdx`);
      return { slug, ...post.metadata } as Post;
    })
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
};
