import Breadcrumb from "@/components/ui/ Breadcrumb";
import RelatedNews from "@/components/RelatedNews";
import TableOfContents from "@/components/ui/TableOfContents";
import { addHeadingId } from "@/lib/addHeadingId";
import { getAdjacentPosts, getNews, getSingleNews } from "@/lib/api";
import { getHeadings } from "@/lib/getHeadings";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const {slug} = await params;
  const post = await getSingleNews(slug);
  if(!post) {
    notFound();
  }

  const description = post.excerpt?.rendered.replace(/<[^>]+>/g, "");

  return {
    title: post.title.rendered,
    description,

    openGraph: {
      title: post.title.rendered,
      description,
      type:"article",
      url:`http://localhost:3001/news/${slug}`,
      images: [
        {
          url:post._embedded["wp:featuredmedia"][0].source_url
        }
      ]
    },
  };
}

export const revalidate = 60;

export async function generateStaticParams(): Promise<{ slug: string }[]> {
  const { posts } = await getNews();

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function NewsDetail({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getSingleNews(slug);
  const content = addHeadingId(post.content.rendered)
  const headings = getHeadings(content)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type":"Article",
    headline:post.title.rendered,
    datePublished:post.date,
    dateModified:post.modified,
    url:`http://localhost:3001/news/${slug}`,
    image:post._embedded?.["wp:featuredmedia"]?.[0].source_url,
  }

  if (!post) {
    notFound();
  }

  const categoryId = post.categories[0];
  // const relatedPosts = await getRelatedNews(categoryId, post.id);
  const { prev, next } = await getAdjacentPosts(post.id);

  return (
    <main>
      <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(jsonLd)}}/>
      <Breadcrumb />
      <h1 dangerouslySetInnerHTML={{ __html: post.title.rendered }} />
      <TableOfContents headings={headings}/>
      <p>{new Date(post.date).toLocaleDateString("ja-JP")}</p>
      <div dangerouslySetInnerHTML={{ __html: content }} />
      <RelatedNews categoryId={categoryId} currentId={post.id} />
      <hr />
      <nav>
        {prev && (
          <Link href={`/news/${prev.slug}`}>←{prev.title.rendered}</Link>
        )}
        {next && (
          <Link href={`/news/${next.slug}`}>{next.title.rendered}→</Link>
        )}
      </nav>
    </main>
  );
}
