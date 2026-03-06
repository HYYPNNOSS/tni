// app/admin/login/page.tsx

"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit() {
    setLoading(true);
    setError("");
    const res = await signIn("credentials", {
      username,
      password,
      redirect: false,
    });
    if (res?.ok) {
      router.push("/admin");
    } else {
      setError("Identifiants incorrects.");
    }
    setLoading(false);
  }

  return (
    <div style={{ minHeight: "100vh", background: "#0A1128", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ background: "#fff", borderRadius: 16, padding: 48, width: "100%", maxWidth: 420, boxShadow: "0 32px 80px rgba(0,0,0,0.3)" }}>
        <div style={{ marginBottom: 40, textAlign: "center" }}>
          <div className="serif" style={{ fontSize: 28, color: "#0A1128", fontFamily: "'Playfair Display', serif" }}>TNI Group</div>
          <div style={{ color: "#d8ae31", fontSize: 12, fontWeight: 700, letterSpacing: "0.2em", textTransform: "uppercase", marginTop: 8 }}>Administration</div>
        </div>

        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#0A1128", marginBottom: 8 }}>Nom d'utilisateur</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(10,17,40,0.2)", borderRadius: 8, fontSize: 15, outline: "none" }}
            placeholder="admin"
          />
        </div>

        <div style={{ marginBottom: 32 }}>
          <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "#0A1128", marginBottom: 8 }}>Mot de passe</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
            style={{ width: "100%", padding: "12px 16px", border: "1px solid rgba(10,17,40,0.2)", borderRadius: 8, fontSize: 15, outline: "none" }}
            placeholder="••••••••"
          />
        </div>

        {error && <div style={{ color: "#e53e3e", fontSize: 14, marginBottom: 16, textAlign: "center" }}>{error}</div>}

        <button
          onClick={handleSubmit}
          disabled={loading}
          style={{ width: "100%", padding: "14px", background: loading ? "rgba(10,17,40,0.4)" : "#0A1128", color: "#fff", border: "none", borderRadius: 9999, fontSize: 16, fontWeight: 700, cursor: loading ? "not-allowed" : "pointer" }}
        >
          {loading ? "Connexion..." : "Se connecter"}
        </button>
      </div>
    </div>
  );
}