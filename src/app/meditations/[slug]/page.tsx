import { PostMeta } from "../actions";
import { Meditation } from "./meditation";

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
