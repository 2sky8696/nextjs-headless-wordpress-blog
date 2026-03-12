export function getHeadings(html: string) {
  const regex = /<h([2-3])[^>]*>(.*?)<\/h[2-3]>/g;
  const headings: { id: string; text: string; level: number }[] = [];

  let match;

  while ((match = regex.exec(html)) !== null) {
    const level = Number(match[1]);
    const id = match[2];
    const text = match[3].replace(/<[^>]+>/g, "");

    headings.push({
      id,
      text,
      level,
    });
  }

  return headings;
}
