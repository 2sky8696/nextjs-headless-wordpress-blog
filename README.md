# Next.js Headless WordPress Blog

Next.js と Headless WordPress を使用したブログサイトです。
WordPress を CMS として使用し、Next.js でフロントエンドを構築しています。

## 🚀 Demo

Coming soon

## 🛠 Tech Stack

* Next.js (App Router)
* TypeScript
* Headless WordPress (REST API)
* CSS / Global CSS
* Git / GitHub

## 📂 Project Structure

```
src
 ├ app
 │   ├ news
 │   │   ├ page.tsx
 │   │   └ [slug]
 │   │       └ page.tsx
 │   ├ layout.tsx
 │   └ page.tsx
 ├ components
 │   ├ NewsCard.tsx
 │   ├ Pagination.tsx
 │   └ Breadcrumb.tsx
 ├ lib
 │   └ wordpress.ts
 ├ utils
 │   └ addHeadingId.ts
 ├ hooks
 └ types
```

## ✨ Features

* WordPress REST API から記事取得
* 記事一覧ページ
* 記事詳細ページ
* ページネーション
* パンくずリスト
* 目次（TOC）
* JSON-LD（構造化データ）
* sitemap 対応
* SEO対策

## 🔍 Example Code

### WordPress API Fetch

```ts
export async function getNews() {
  const res = await fetch(`${process.env.WP_API_URL}/wp-json/wp/v2/posts`)
  return res.json()
}
```

### Heading ID Utility

```ts
export function addHeadingId(html: string) {
  return html.replace(/<h([2-3])>(.*?)<\/h[2-3]>/g, (_, level, text) => {
    const id = text
      .replace(/<[^>]+>/g, "")
      .toLowerCase()
      .replace(/\s+/g, "-")

    return `<h${level} id="${id}">${text}</h${level}>`
  })
}
```

## 🧠 What I Learned

* Headless CMS 構成
* Next.js App Router
* APIデータ取得
* SEO対応
* TypeScriptでの型管理
* コンポーネント設計

## 📌 Future Improvements

* Search機能
* 人気記事表示
* ダークモード
* ISR対応
* パフォーマンス最適化

## 👨‍💻 Author

Yuya Matsura
