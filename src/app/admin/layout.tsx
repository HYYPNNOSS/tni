// src/app/admin/layout.tsx

import { auth } from "../../../auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { signOut } from "../../../auth";

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const session = await auth();

  // Don't protect the login page
  if (!session) {
    // Let middleware handle it, just render children (login page)
    return <>{children}</>;
  }

  return (
    <div style={{ minHeight: "100vh", background: "#f4f4f5", fontFamily: "'Inter', sans-serif" }}>
      <nav style={{ background: "#0A1128", padding: "0 40px", display: "flex", alignItems: "center", justifyContent: "space-between", height: 64 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 32 }}>
          <span style={{ color: "#d8ae31", fontWeight: 700, fontSize: 16, fontFamily: "'Playfair Display', serif" }}>TNI Admin</span>
          <Link href="/admin" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Articles</Link>
          <Link href="/admin/posts/new" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Nouvel article</Link>
          <Link href="/" target="_blank" style={{ color: "rgba(255,255,255,0.7)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Voir le blog ↗</Link>
        </div>
        <form action={async () => { "use server"; await signOut({ redirectTo: "/admin/login" }); }}>
          <button type="submit" style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "none", borderRadius: 8, padding: "8px 16px", cursor: "pointer", fontSize: 13 }}>
            Se déconnecter
          </button>
        </form>
      </nav>
      <main>{children}</main>
    </div>
  );
}