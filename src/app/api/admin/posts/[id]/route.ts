// app/api/admin/posts/[id]/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../../auth";
import { prisma } from "@/lib/prisma";
import { uploadImage, deleteImage } from "@/lib/cloudinary";

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, description, content, imageBase64, tag, readTime, published } = body;

  const existing = await prisma.post.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  let imageUrl = existing.imageUrl;
  let imagePublicId = existing.imagePublicId;

  if (imageBase64) {
    await deleteImage(existing.imagePublicId);
    const uploaded = await uploadImage(imageBase64);
    imageUrl = uploaded.url;
    imagePublicId = uploaded.publicId;
  }

  const post = await prisma.post.update({
    where: { id: params.id },
    data: {
      ...(title && { title }),
      ...(description && { description }),
      ...(content && { content }),
      ...(tag && { tag }),
      ...(readTime && { readTime }),
      ...(published !== undefined && { published }),
      imageUrl,
      imagePublicId,
    },
  });

  return NextResponse.json(post);
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const existing = await prisma.post.findUnique({ where: { id: params.id } });
  if (!existing) return NextResponse.json({ error: "Not found" }, { status: 404 });

  await deleteImage(existing.imagePublicId);
  await prisma.post.delete({ where: { id: params.id } });

  return NextResponse.json({ success: true });
}