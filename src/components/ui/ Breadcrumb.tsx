"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const breadcrumbMap: Record<string, string> = {
  news: "NEWS",
  category: "CATEGORY",
};

export default function Breadcrumb() {
  const pathname = usePathname();
  const paths = pathname.split("/").filter(Boolean);

  return (
    <nav
      aria-label="breadcrumb"
      itemScope
      itemType="https://schema.org/BreadcrumbList"
    >
      <ul style={{ display: "flex", gap: "8px" }}>
        <li
          itemProp="itemListElement"
          itemScope
          itemType="https://schema.org/ListItem"
        >
          <Link href="/" itemProp="item">
            <span itemProp="name">HOME</span>
          </Link>

          <meta itemProp="position" content="1"/>
        </li>
        {paths.map((path, index) => {
          const href = "/" + paths.slice(0, index + 1).join("/");

          return (
            <li key={href}>
              {"> "}
              <Link href={href}>{breadcrumbMap[path] ?? path}</Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
