import { json } from "stream/consumers";
import { News, Post, WPCategory } from "@/types/wp";
import { WP_CATEGORIES, WP_NEWS, WP_POSTS } from "./wp";

// 投稿一覧
export async function getPosts(page: number = 1): Promise<Post[]> {
  const res = await fetch(`${WP_POSTS}?_embed&page=${page}&per_page=5`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  return data;
}

// 投稿詳細
export async function getPost(slug: string) {
  const res = await fetch(`${WP_POSTS}?slug=${slug}&_embed`, {
    next: { revalidate: 60 },
  });

  if (!res) throw new Error("Failed to fetch post");

  const data = await res.json();
  return data[0];
}

// お知らせ一覧
export async function getNews(
  page: number = 1,search=""
): Promise<{ posts: Post[]; totalPages: number }> {
  // const res = await fetch(`${WP_NEWS}?page=${page}&per_page=5&_embed`, {
  const res = await fetch(`${WP_NEWS}?page=${page}&per_page=5&_embed&search=${search}`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return { posts: [], totalPages: 0 };
  }

  const posts: Post[] = await res.json();
  const totalPages = Number(res.headers.get("X-WP-TotalPages") ?? 0);
  return {
    posts,
    totalPages,
  };
}

// お知らせ詳細
export async function getSingleNews(slug: string) {
  const res = await fetch(`${WP_NEWS}?slug=${slug}&_embed`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error("Failed to fetch news");

  const data = await res.json();

  console.log("slug", slug);
  console.log("data", data);

  return data[0] ?? null;
}

// カテゴリー取得
export async function getCategories(): Promise<WPCategory[]> {
  const res = await fetch(`${WP_CATEGORIES}`, {
    next: { revalidate: 60 },
  });

  const data = await res.json();
  return data;
}

// カテゴリー別記事の取得（ID)
export async function getPostsByCategory(categoryId: number): Promise<Post[]> {
  const res = await fetch(`${WP_NEWS}?categories=${categoryId}&_embed`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return [];
  }

  const data = await res.json();
  console.log("category data", data);
  return data;
}

// カテゴリー別記事の取得（slug)
export async function getPostsByCategorySlug(slug: string): Promise<Post[]> {
  const categoryRes = await fetch(`${WP_CATEGORIES}?slug=${slug}`);

  const categoryData = await categoryRes.json();

  if (!categoryData.length) {
    return [];
  }

  const categoryId = categoryData[0].id;

  const postRes = await fetch(`${WP_NEWS}?categories=${categoryId}&_embed`, {
    next: { revalidate: 60 },
  });

  if (!postRes.ok) return [];

  return postRes.json();
}

// prev/next
export async function getAdjacentPosts(
  currentId: number,
): Promise<{ prev: Post | null; next: Post | null }> {
  const res = await fetch(`${WP_NEWS}?per_page=100`, {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    return { prev: null, next: null };
  }

  const posts: Post[] = await res.json();
  const index = posts.findIndex((p) => p.id === currentId);

  return {
    prev: index > 0 ? posts[index - 1] : null,
    next: index < posts.length - 1 ? posts[index + 1] : null,
  };
}

// 関連記事の取得
export default async function getRelatedNews(
  categoryId: number,
  currentId: number,
): Promise<Post[]> {
  const res = await fetch(
    `${WP_NEWS}?categories=${categoryId}&exclude=${currentId}&per_page=3&_embed`,
    {
      next: { revalidate: 60 },
    },
  );

  if (!res.ok) {
    return [];
  }

  return res.json();
}
