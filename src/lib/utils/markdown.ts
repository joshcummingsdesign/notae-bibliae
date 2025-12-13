export const markdownLinksToHtmlTags = (markdown: string) =>
  markdown.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

export const stripMarkdownLinks = (markdown: string) =>
  markdown.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");
