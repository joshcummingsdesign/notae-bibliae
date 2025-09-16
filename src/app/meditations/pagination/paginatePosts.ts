import { Post } from "../getAllPosts";

export const paginatePosts = (posts: Post[], page: number, perPage: number) => {
  const total = posts.length;
  const totalPages = Math.ceil(total / perPage);

  const start = (page - 1) * perPage;
  const end = start + perPage;

  const paginatedPosts = posts.slice(start, end);

  return {
    posts: paginatedPosts,
    page,
    perPage,
    total,
    totalPages,
  };
};
