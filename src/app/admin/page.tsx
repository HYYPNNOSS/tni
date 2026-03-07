// app/admin/page.tsx

import { prisma } from "@/lib/prisma";
import Link from "next/link";

export default async function AdminDashboard() {
  const posts = await prisma.post.findMany({ orderBy: { createdAt: "desc" } });

  return (
    <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 40px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <div>
          <h1 style={{ fontSize: 28, fontWeight: 700, color: "#0A1128" }}>Articles</h1>
          <p style={{ color: "rgba(10,17,40,0.5)", marginTop: 4 }}>{posts.length} article{posts.length !== 1 ? "s" : ""} au total</p>
        </div>
        <Link href="/admin/posts/new" style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "#d8ae31", color: "#0A1128", textDecoration: "none", padding: "12px 28px", borderRadius: 9999, fontWeight: 700, fontSize: 15 }}>
          + Nouvel article
        </Link>
      </div>

      <div style={{ background: "#fff", borderRadius: 12, overflow: "hidden", boxShadow: "0 1px 4px rgba(0,0,0,0.06)" }}>
        {posts.length === 0 ? (
          <div style={{ padding: 64, textAlign: "center", color: "rgba(10,17,40,0.4)" }}>
            Aucun article. <Link href="/admin/posts/new" style={{ color: "#d8ae31" }}>Créez le premier.</Link>
          </div>
        ) : (
          <table style={{ width: "100%", borderCollapse: "collapse" }}>
            <thead>
              <tr style={{ borderBottom: "1px solid rgba(10,17,40,0.06)", background: "#fafafa" }}>
                <th style={{ padding: "12px 20px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "rgba(10,17,40,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Article</th>
                <th style={{ padding: "12px 20px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "rgba(10,17,40,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Catégorie</th>
                <th style={{ padding: "12px 20px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "rgba(10,17,40,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Statut</th>
                <th style={{ padding: "12px 20px", textAlign: "left", fontSize: 12, fontWeight: 600, color: "rgba(10,17,40,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Date</th>
                <th style={{ padding: "12px 20px", textAlign: "right", fontSize: 12, fontWeight: 600, color: "rgba(10,17,40,0.4)", textTransform: "uppercase", letterSpacing: "0.05em" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post, i) => (
                <tr key={post.id} style={{ borderBottom: i < posts.length - 1 ? "1px solid rgba(10,17,40,0.05)" : "none" }}>
                  <td style={{ padding: "16px 20px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <div style={{ width: 56, height: 40, borderRadius: 6, backgroundImage: `url("${post.imageUrl}")`, backgroundSize: "cover", backgroundPosition: "center", flexShrink: 0 }} />
                      <div>
                        <div style={{ fontWeight: 600, color: "#0A1128", fontSize: 14 }}>{post.title}</div>
                        <div style={{ color: "rgba(10,17,40,0.4)", fontSize: 12, marginTop: 2 }}>{post.readTime} de lecture</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{ background: "#fef9e7", color: "#b7860b", fontSize: 11, fontWeight: 700, padding: "3px 10px", borderRadius: 9999, textTransform: "uppercase", letterSpacing: "0.08em" }}>{post.tag}</span>
                  </td>
                  <td style={{ padding: "16px 20px" }}>
                    <span style={{ background: post.published ? "#d1fae5" : "#f3f4f6", color: post.published ? "#065f46" : "#6b7280", fontSize: 12, fontWeight: 600, padding: "3px 12px", borderRadius: 9999 }}>
                      {post.published ? "Publié" : "Brouillon"}
                    </span>
                  </td>
                  <td style={{ padding: "16px 20px", color: "rgba(10,17,40,0.5)", fontSize: 13 }}>
                    {new Date(post.createdAt).toLocaleDateString("fr-FR")}
                  </td>
                  <td style={{ padding: "16px 20px", textAlign: "right" }}>
                    <div style={{ display: "flex", justifyContent: "flex-end", gap: 8 }}>
                      <Link href={`/admin/posts/${post.id}/edit`} style={{ padding: "6px 16px", background: "#0A1128", color: "#fff", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600 }}>Éditer</Link>
                      <Link href={`/blog/${post.slug}`} target="_blank" style={{ padding: "6px 16px", border: "1px solid rgba(10,17,40,0.15)", color: "#0A1128", borderRadius: 8, textDecoration: "none", fontSize: 13, fontWeight: 600 }}>Voir</Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}