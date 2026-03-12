import { getPost } from "@/lib/api";


export default async function PostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const {slug} = await params;
  const post = await getPost(slug);

  return(
    <main>
      <h1 dangerouslySetInnerHTML={{__html:post.title.rendered}}/>
    </main>
  )
}
