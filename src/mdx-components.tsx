import type { MDXComponents } from "mdx/types";
import Image from "next/image";
import { Link } from "@/components/Link";
import { Definition } from "@/components/Definition";
import { Grey } from "@/components/text/Grey";
import { Initial } from "@/components/text/Initial";
import { Large } from "@/components/text/Large";
import { Mermaid } from "@/components/Mermaid";
import { Poetry } from "@/components/text/Poetry";
import { Red } from "@/components/text/Red";
import { Rubric } from "@/components/text/Rubric";
import { Table } from "@/components/Table";

// Global mdx components
const components: MDXComponents = {
  a: Link,
  Definition,
  Grey,
  Image,
  Initial,
  Large,
  Mermaid,
  Poetry,
  Red,
  Rubric,
  Table,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
