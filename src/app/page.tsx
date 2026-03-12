import { getCategories, getPosts } from "@/lib/api";
import Image from "next/image";
import Link from "next/link";

export default async function Home({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const page = Number((await searchParams).page)||1;
  const posts = await getPosts();
  const categories = await getCategories();
  console.log(posts);

  return (
    <div>
      <main>
        <h2>記事一覧</h2>
        {posts.map((post) => {
          const imageUrl = post._embedded?.["wp:featuredmedia"]?.[0].source_url;
          return (
            <>
              <div key={post.id}>
                {imageUrl && (
                  <Image
                    src={imageUrl}
                    alt={post.title.rendered}
                    width={600}
                    height={400}
                  />
                )}
                <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
                <h1>カテゴリー</h1>
                {categories.map((cat) => (
                  <div key={cat.id}>{cat.name}</div>
                ))}
                <Link href={`/posts/${post.slug}`}>記事を見る</Link>
              </div>
            </>
          );
        })}
        <Link href={`/?page=${page + 1}`}>次へ</Link>
      </main>
    </div>
  );
}
