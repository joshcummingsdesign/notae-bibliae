import type { MDXComponents } from "mdx/types";
import { Suspense } from "react";
import Image from "next/image";
import { Link } from "@/components/Link";
import { Definition } from "@/components/Definition";
import { Initial } from "@/components/text/Initial";
import { Mermaid } from "@/components/Mermaid";
import { Poetry } from "@/components/text/Poetry";
import { Red } from "@/components/text/Red";
import { Table } from "@/components/Table";

// Global mdx components
const components: MDXComponents = {
  a: Link,
  Definition,
  Image,
  Initial,
  Mermaid,
  Poetry: (props) => (
    <Suspense>
      <Poetry {...props} />
    </Suspense>
  ),
  Red,
  Table,
};

export function useMDXComponents(): MDXComponents {
  return components;
}
