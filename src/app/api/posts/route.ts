// app/api/posts/route.ts

import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const tag = searchParams.get("tag");

  const posts = await prisma.post.findMany({
    where: {
      published: true,
      ...(tag && tag !== "Tout" ? { tag } : {}),
    },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json(posts);
}