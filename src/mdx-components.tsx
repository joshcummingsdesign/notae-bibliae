import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { Link } from "@/components/Link";
import { Definition } from "@/components/Definition";
import { Initial } from "@/components/text/Initial";
import { Poetry } from "@/components/text/Poetry";

// Global mdx components
const components: MDXComponents = {
  a: Link,
  Definition,
  Image,
  Initial,
  Poetry,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
