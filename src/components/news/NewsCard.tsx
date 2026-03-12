import { Post } from "@/types/wp";
import Image from "next/image";
import Link from "next/link";
import styles from "./NewsCard.module.css";

type Props = {
  post: Post;
};

export default function NewsCard({ post }: Props) {
  const image =
    post._embedded?.["wp:featuredmedia"]?.[0]?.source_url ?? "/no-image.jpg";

  return (
    <article className={styles.card}>
      <Link href={`/news/${post.slug}`}>
        <Image
          src={image}
          alt={post.title.rendered}
          width={600}
          height={400}
          className={styles.image}
        />
        <h2
          className={styles.title}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        <time className={styles.time}>{new Date(post.date).toLocaleDateString("ja-JP")}</time>
      </Link>
    </article>
  );
}
