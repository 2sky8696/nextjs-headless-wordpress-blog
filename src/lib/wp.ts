export const WP_API_URL = process.env.NEXT_PUBLIC_WP_API_URL;

if (!WP_API_URL) {
  throw new Error("NEXT_PUBLIC_WP_API_URL is not defined");
}

export const WP_POSTS = `${WP_API_URL}/posts`
export const WP_NEWS = `${WP_API_URL}/news`
export const WP_CATEGORIES = `${WP_API_URL}/categories`