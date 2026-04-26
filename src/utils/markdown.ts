export const stripMarkdownLinks = (markdown: string) =>
  markdown.replace(/\[([^\]]+)\]\([^)]+\)/g, "$1");

export const appendAnchorToMarkdownLink = (markdown: string, anchor: string): string =>
  markdown.replace(/\]\(([^)]+)\)/, `]($1${anchor})`);
