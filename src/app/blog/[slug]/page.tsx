// app/blog/[slug]/page.tsx

import { prisma } from "@/lib/prisma";
import { notFound } from "next/navigation";
import Link from "next/link";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({ where: { slug: params.slug } });
  if (!post) return {};
  return { title: post.title, description: post.description };
}

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await prisma.post.findUnique({
    where: { slug: params.slug, published: true },
  });

  if (!post) notFound();

  return (
    <div style={{ minHeight: "100vh", background: "#F9F7F2", fontFamily: "'Inter', sans-serif" }}>
      {/* Nav */}
      <nav style={{ padding: "24px 40px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid rgba(10,17,40,0.06)" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: 8, color: "rgba(10,17,40,0.5)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
          Retour au blog
        </Link>
      </nav>

      {/* Hero image */}
      <div style={{ width: "100%", height: 480, backgroundImage: `url("${post.imageUrl}")`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
        <div style={{ position: "absolute", inset: 0, background: "rgba(10,17,40,0.5)" }} />
        <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column", justifyContent: "flex-end", padding: "48px 80px", maxWidth: 1000, margin: "0 auto" }}>
          <span style={{ display: "inline-block", background: "#d8ae31", color: "#0A1128", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.15em", fontWeight: 700, padding: "4px 16px", borderRadius: 9999, marginBottom: 20, width: "fit-content" }}>{post.tag}</span>
          <h1 className="serif" style={{ fontSize: 48, color: "#fff", lineHeight: 1.2, marginBottom: 16, fontWeight: 300 }}>{post.title}</h1>
          <div style={{ color: "rgba(255,255,255,0.6)", fontSize: 14 }}>
            Par Inès &amp; Zerrif • {post.readTime} de lecture • {new Date(post.createdAt).toLocaleDateString("fr-FR", { year: "numeric", month: "long", day: "numeric" })}
          </div>
        </div>
      </div>

      {/* Content */}
      <article style={{ maxWidth: 800, margin: "0 auto", padding: "64px 40px" }}>
        <p style={{ fontSize: 20, color: "rgba(10,17,40,0.65)", fontWeight: 300, lineHeight: 1.7, marginBottom: 48, borderLeft: "3px solid #d8ae31", paddingLeft: 24 }}>
          {post.description}
        </p>
        <div
          className="prose"
          style={{ fontSize: 17, lineHeight: 1.8, color: "rgba(10,17,40,0.8)" }}
          dangerouslySetInnerHTML={{ __html: post.content }}
        />
      </article>

      {/* Back CTA */}
      <div style={{ textAlign: "center", padding: "0 40px 96px" }}>
        <Link href="/" style={{ display: "inline-flex", alignItems: "center", gap: 8, padding: "16px 40px", background: "#0A1128", color: "#fff", borderRadius: 9999, textDecoration: "none", fontWeight: 600 }}>
          <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_back</span>
          Voir tous les articles
        </Link>
      </div>
    </div>
  );
}