import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { In } from "@/components/text/In";
import { Poetry } from "@/components/text/Poetry";

// Global mdx components
const components: MDXComponents = {
  Image,
  In,
  Poetry,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
