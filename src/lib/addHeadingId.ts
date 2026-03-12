export function addHeadingId(html: string) {
  return html.replace(/<h[2-3]>(.*?)<\/h[2-3]>/g, (_, level, attrs, text) => {
    const cleanText = text.replace(/<[^>]+>/g, "");

    const id = cleanText.toLowerCase().trim().replace(/\s+/g, "-");

    return `<h${level} id="${id}" ${attrs}>${text}</h${level}`;
  });
}
