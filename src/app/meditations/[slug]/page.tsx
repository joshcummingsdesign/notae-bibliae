import { PostMeta } from "../actions";
import { Meditation } from "./Meditation";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function MeditationsSinglePage({ params }: Props) {
  const { slug } = await params;
  const post: { default: any; metadata: PostMeta } = await import(
    `@/app/meditations/posts/${slug}.mdx`
  );
  const Component = post.default;
  return (
    <Meditation postMeta={post.metadata}>
      <Component />
    </Meditation>
  );
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const post: { default: any; metadata: PostMeta } = await import(
    `@/app/meditations/posts/${slug}.mdx`
  );
  return {
    title: `${post.metadata.title} — Notae Bibliae`,
    description: post.metadata.description,
  };
}
