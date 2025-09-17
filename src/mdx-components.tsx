import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { Definition } from "@/components/Definition";
import { Initial } from "@/components/text/Initial";
import { Poetry } from "@/components/text/Poetry";
import Link from "@/components/Link";

// Global mdx components
const components: MDXComponents = {
  Definition,
  Image,
  Initial,
  Poetry,
  a: Link,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
