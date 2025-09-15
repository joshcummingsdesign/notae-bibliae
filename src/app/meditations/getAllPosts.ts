import path from "path";
import { promises as fs } from "fs";
import matter from "gray-matter";

export interface Post {
  slug: string;
  title: string;
  date: string;
  description: string;
  categories: string[];
  content: string;
}

export const getAllPosts = async () => {
  const postsDir = path.join(process.cwd(), "src/app/meditations/posts");
  const files = await fs.readdir(postsDir);

  const posts = await Promise.all(
    files.map(async (file) => {
      const slug = file.replace(/\.mdx$/, "");
      const fullPath = path.join(postsDir, file);
      const fileContents = await fs.readFile(fullPath, "utf8");
      const { data, content } = matter(fileContents);
      return { slug, ...data, content } as Post;
    })
  );

  return posts.sort((a, b) => (a.date < b.date ? 1 : -1));
};
