import getRelatedNews from "@/lib/api";
import NewsCard from "./news/NewsCard";

type Props = {
  categoryId:number;
  currentId:number;
}

export default async function RelatedNews({categoryId,currentId}:Props) {
  const posts = await getRelatedNews(categoryId,currentId)

  if(posts.length === 0) return null

  return(
    <section>
      <h2>関連記事</h2>
      <div>
        {posts.map((post)=> (
          <NewsCard key={post.id} post={post}/>
        ))}
      </div>
    </section>
  )
}