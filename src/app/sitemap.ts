import { MetadataRoute } from "next";
import { menuItems, MenuNode } from "./menu";
import { getAllPosts } from "./meditations/actions";

const BASE_URL = "https://notae-bibliae.vercel.app";

/**
 * Recursively collect all links from the menu tree.
 */
function collectLinks(nodes: MenuNode[]): MenuNode[] {
  const result: MenuNode[] = [];

  for (const node of nodes) {
    if (node.link) {
      // strip query strings
      result.push({ ...node, link: node.link.split("?")[0] });
    }
    if (node.children && node.children.length > 0) {
      result.push(...collectLinks(node.children));
    }
  }

  // Deduplicate by link
  const seen = new Set<string>();
  return result.filter((node) => {
    if (seen.has(node.link)) return false;
    seen.add(node.link);
    return true;
  });
}

/**
 * Converts menuItems into a Next.js sitemap.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Start with the homepage
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
  ];

  // Add all other menu links
  const menuNodes = collectLinks(menuItems);
  staticPages.push(
    ...menuNodes.map((node) => {
      let priority = node.priority ?? 0.5;
      let changeFrequency: MetadataRoute.Sitemap[number]["changeFrequency"] =
        "monthly";

      if (node.link === "/meditations") changeFrequency = "weekly";
      if (node.link === "/liturgy/calendar") changeFrequency = "yearly";
      if (node.link === "/liturgy/daily-office/morning-prayer")
        changeFrequency = "daily";
      if (node.link === "/liturgy/daily-office/evening-prayer")
        changeFrequency = "daily";
      else if (node.link.startsWith("/glossary")) priority = 0.2;
      else if (node.link.startsWith("/bible/languages")) priority = 0.2;
      else if (node.link.startsWith("/bible/translations")) priority = 0.2;

      return {
        url: `${BASE_URL}${node.link}`,
        lastModified: new Date(),
        changeFrequency,
        priority,
      };
    })
  );

  // Add individual meditation posts
  const posts = await getAllPosts();
  const postPages: MetadataRoute.Sitemap = posts.map((post) => ({
    url: `${BASE_URL}/meditations/${post.slug}`,
    lastModified: new Date(post.date),
    changeFrequency: "monthly",
    priority: 0.5,
  }));

  return [...staticPages, ...postPages];
}
