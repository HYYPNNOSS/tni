// app/api/admin/posts/route.ts

import { NextRequest, NextResponse } from "next/server";
import { auth } from "../../../../../auth";
import { prisma } from "@/lib/prisma";
import { uploadImage } from "@/lib/cloudinary";
import slugify from "slugify";

export async function POST(req: NextRequest) {
  const session = await auth();
  if (!session) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await req.json();
  const { title, description, content, imageBase64, tag, readTime, published } = body;

  if (!title || !description || !content || !imageBase64 || !tag) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const { url, publicId } = await uploadImage(imageBase64);

  const slug = slugify(title, { lower: true, strict: true }) + "-" + Date.now();

  const post = await prisma.post.create({
    data: {
      title,
      slug,
      description,
      content,
      imageUrl: url,
      imagePublicId: publicId,
      tag,
      readTime: readTime || "5 min",
      published: published ?? false,
    },
  });

  return NextResponse.json(post, { status: 201 });
}