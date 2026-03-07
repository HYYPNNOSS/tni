// app/admin/posts/[id]/edit/page.tsx

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import PostForm from "../../_components/PostForm";

export default async function EditPostPage({ params }: { params: { id: string } }) {
  const post = await prisma.post.findUnique({ where: { id: params.id } });
  if (!post) notFound();

  return (
    <PostForm
      initial={{
        id: post.id,
        title: post.title,
        description: post.description,
        content: post.content,
        imageUrl: post.imageUrl,
        tag: post.tag,
        readTime: post.readTime,
        published: post.published,
      }}
    />
  );
}