const quoteEntities: Record<string, string> = {
  "&quot;": '"',
  "&#34;": '"',
  "&apos;": "'",
  "&#39;": "'",
};

export const smartQuotes = (text: string) => {
  return text
    .replace(/&quot;|&#34;|&apos;|&#39;/g, (entity) => quoteEntities[entity])
    .replace(/"([^"]*)"/g, "“$1”")
    .replace(/(\w)'(\w)/g, "$1’$2");
};
