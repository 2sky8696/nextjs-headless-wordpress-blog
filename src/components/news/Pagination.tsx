import Link from "next/link";

export default function Pagination({
  currentPage,
  totalPages,
}: {
  currentPage: number;
  totalPages: number;
}) {
  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav>
      {currentPage > 1 && (
        <Link href={`/news?page=${currentPage - 1}`}>← Prev</Link>
      )}
      {pages.map((page) => (
        <Link key={page} href={`/news?page=${page}`}>
          {page}
        </Link>
      ))}
      {currentPage < 1 && (
        <Link href={`/news?page=${currentPage + 1}`}>→ Next</Link>
      )}
    </nav>
  );
}
