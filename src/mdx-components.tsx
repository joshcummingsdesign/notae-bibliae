import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { Initial } from "@/components/text/Initial";
import { Poetry } from "@/components/text/Poetry";
import Link from "next/link";

// Global mdx components
const components: MDXComponents = {
  Image,
  Initial,
  Poetry,
  a: Link,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
