interface Props {
  params: Promise<{ slug: string }>;
}

export default async function MeditationsSinglePage({ params }: Props) {
  const { slug } = await params;
  const post = await import(`@/app/meditations/posts/${slug}.mdx`);
  const Post = post.default;
  return <Post />;
}
