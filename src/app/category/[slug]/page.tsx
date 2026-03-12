import { getPostsByCategorySlug } from "@/lib/api";
import Link from "next/link";
import { Post } from "@/types/wp";

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const {slug} = await params;
  const posts = await getPostsByCategorySlug(slug);

  // if(!posts.length){
  //   return<main>記事がありません</main>
  // }

  return (
    <main>
      <h1>カテゴリー記事</h1>
      <p>記事数: {posts.length}</p>
      {posts.map((post:Post) => (
        <div key={post.id}>
          <h2 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
          <Link href={`/posts/${post.slug}`}> 記事を見る</Link>
        </div>
      ))}
    </main>
  );
}
