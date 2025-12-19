export const stripMarkdownLinks = (markdown: string) =>
  markdown.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
