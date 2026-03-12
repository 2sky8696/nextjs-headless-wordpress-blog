import NewsCard from "@/components/news/NewsCard";
import Pagination from "@/components/news/Pagination";
import { getNews } from "@/lib/api";
import styles from "./page.module.css";
import Breadcrumb from "@/components/ui/ Breadcrumb";
import SearchBox from "@/components/ui/SearchBox";

export default async function NewsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string, search?: string }>;
}) {
  const { page } = await searchParams;
  const currentPage = Number(page ?? 1);
  const search = (await searchParams).search??""
  const { posts, totalPages } = await getNews(currentPage,search);

  return (
    <main className={styles.container}>
      <Breadcrumb />
      <h1>お知らせ一覧</h1>
      <SearchBox/>
      <section className={styles.grid}>
        {posts.map((post) => (
          <NewsCard key={post.id} post={post} />
        ))}
      </section>

      <Pagination currentPage={currentPage} totalPages={totalPages} />
    </main>
  );
}
