import { getNews } from "@/lib/api";

export default async function sitemap() {
  const {posts} = await getNews()

  return posts.map((post)=>({
    url:`http://localhost:3001/news/${post.slug}`,
    lastModified: new Date(post.modified)
  }))
}