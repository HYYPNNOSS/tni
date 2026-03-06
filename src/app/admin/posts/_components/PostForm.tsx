// app/admin/posts/_components/PostForm.tsx

"use client";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";


const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

const CATEGORIES = ["Douanes", "Logistique", "Réglementations", "Conseils PME", "Guide", "Transport Frigorifique"];
const READ_TIMES = ["3 min", "5 min", "6 min", "7 min", "8 min", "10 min", "12 min", "15 min"];

type PostData = {
  id?: string;
  title?: string;
  description?: string;
  content?: string;
  imageUrl?: string;
  tag?: string;
  readTime?: string;
  published?: boolean;
};

export default function PostForm({ initial }: { initial?: PostData }) {
  const router = useRouter();
  const isEdit = !!initial?.id;

  const [title, setTitle] = useState(initial?.title || "");
  const [description, setDescription] = useState(initial?.description || "");
  const [content, setContent] = useState(initial?.content || "");
  const [tag, setTag] = useState(initial?.tag || CATEGORIES[0]);
  const [readTime, setReadTime] = useState(initial?.readTime || "5 min");
  const [published, setPublished] = useState(initial?.published ?? false);
  const [imagePreview, setImagePreview] = useState(initial?.imageUrl || "");
  const [imageBase64, setImageBase64] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [deleting, setDeleting] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  function handleImageChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      setImageBase64(result);
      setImagePreview(result);
    };
    reader.readAsDataURL(file);
  }

  async function handleSave(pub?: boolean) {
    const publishedValue = pub !== undefined ? pub : published;

    if (!title || !description || !content || !tag) {
      setError("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    if (!isEdit && !imageBase64) {
      setError("Veuillez choisir une image.");
      return;
    }

    setSaving(true);
    setError("");

    const payload = {
      title,
      description,
      content,
      tag,
      readTime,
      published: publishedValue,
      ...(imageBase64 ? { imageBase64 } : {}),
    };

    const url = isEdit ? `/api/admin/posts/${initial!.id}` : "/api/admin/posts";
    const method = isEdit ? "PATCH" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      router.push("/admin");
      router.refresh();
    } else {
      const data = await res.json();
      setError(data.error || "Une erreur est survenue.");
    }
    setSaving(false);
  }

  async function handleDelete() {
    if (!confirm("Supprimer définitivement cet article ?")) return;
    setDeleting(true);
    await fetch(`/api/admin/posts/${initial!.id}`, { method: "DELETE" });
    router.push("/admin");
    router.refresh();
  }

  const inputStyle = {
    width: "100%",
    padding: "12px 16px",
    border: "1px solid rgba(10,17,40,0.15)",
    borderRadius: 8,
    fontSize: 15,
    outline: "none",
    fontFamily: "'Inter', sans-serif",
    background: "#fff",
  };

  const labelStyle = {
    display: "block" as const,
    fontSize: 13,
    fontWeight: 600 as const,
    color: "#0A1128",
    marginBottom: 8,
  };

  return (
    <div style={{ maxWidth: 900, margin: "0 auto", padding: "40px" }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 32 }}>
        <h1 style={{ fontSize: 26, fontWeight: 700, color: "#0A1128" }}>
          {isEdit ? "Modifier l'article" : "Nouvel article"}
        </h1>
        {isEdit && (
          <button onClick={handleDelete} disabled={deleting} style={{ background: "#fee2e2", color: "#b91c1c", border: "none", borderRadius: 8, padding: "8px 20px", cursor: "pointer", fontWeight: 600 }}>
            {deleting ? "Suppression..." : "Supprimer"}
          </button>
        )}
      </div>

      {error && <div style={{ background: "#fee2e2", color: "#b91c1c", padding: "12px 16px", borderRadius: 8, marginBottom: 24, fontSize: 14 }}>{error}</div>}

      <div style={{ background: "#fff", borderRadius: 12, padding: 40, boxShadow: "0 1px 4px rgba(0,0,0,0.06)", display: "flex", flexDirection: "column", gap: 28 }}>

        {/* Title */}
        <div>
          <label style={labelStyle}>Titre *</label>
          <input value={title} onChange={(e) => setTitle(e.target.value)} style={inputStyle} placeholder="Ex: Optimiser le dédouanement Casablanca-Marseille" />
        </div>

        {/* Description */}
        <div>
          <label style={labelStyle}>Description courte *</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} style={{ ...inputStyle, minHeight: 80, resize: "vertical" }} placeholder="Résumé affiché sur la carte..." />
        </div>

        {/* Image */}
        <div>
          <label style={labelStyle}>Image de couverture *</label>
          <div
            onClick={() => fileRef.current?.click()}
            style={{ border: "2px dashed rgba(10,17,40,0.15)", borderRadius: 12, height: 200, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer", overflow: "hidden", position: "relative", background: "#fafafa" }}
          >
            {imagePreview ? (
              <img src={imagePreview} alt="preview" style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            ) : (
              <div style={{ textAlign: "center", color: "rgba(10,17,40,0.35)" }}>
                <div style={{ fontSize: 40, marginBottom: 8 }}>📷</div>
                <div style={{ fontSize: 14 }}>Cliquez pour choisir une image</div>
                <div style={{ fontSize: 12, marginTop: 4 }}>JPG, PNG, WebP — max 10MB</div>
              </div>
            )}
            <input ref={fileRef} type="file" accept="image/*" onChange={handleImageChange} style={{ display: "none" }} />
          </div>
          {imagePreview && (
            <button onClick={() => fileRef.current?.click()} style={{ marginTop: 8, background: "none", border: "none", color: "#d8ae31", cursor: "pointer", fontSize: 13, fontWeight: 600 }}>
              Changer l'image
            </button>
          )}
        </div>

        {/* Tag + ReadTime */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
          <div>
            <label style={labelStyle}>Catégorie *</label>
            <select value={tag} onChange={(e) => setTag(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
          </div>
          <div>
            <label style={labelStyle}>Temps de lecture</label>
            <select value={readTime} onChange={(e) => setReadTime(e.target.value)} style={{ ...inputStyle, cursor: "pointer" }}>
              {READ_TIMES.map((t) => <option key={t} value={t}>{t}</option>)}
            </select>
          </div>
        </div>

        {/* Content Editor */}
        <div>
          <label style={labelStyle}>Contenu de l'article *</label>
          <div style={{ border: "1px solid rgba(10,17,40,0.15)", borderRadius: 8, overflow: "hidden" }}>
            <ReactQuill
              theme="snow"
              value={content}
              onChange={setContent}
              style={{ minHeight: 320 }}
              modules={{
                toolbar: [
                  [{ header: [1, 2, 3, false] }],
                  ["bold", "italic", "underline"],
                  [{ list: "ordered" }, { list: "bullet" }],
                  ["link", "blockquote"],
                  ["clean"],
                ],
              }}
            />
          </div>
        </div>

        {/* Publish toggle */}
        <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <div
            onClick={() => setPublished(!published)}
            style={{ width: 48, height: 26, borderRadius: 13, background: published ? "#0A1128" : "#d1d5db", cursor: "pointer", position: "relative", transition: "background 0.2s" }}
          >
            <div style={{ position: "absolute", top: 3, left: published ? 25 : 3, width: 20, height: 20, borderRadius: "50%", background: "#fff", transition: "left 0.2s", boxShadow: "0 1px 3px rgba(0,0,0,0.2)" }} />
          </div>
          <span style={{ fontSize: 14, fontWeight: 600, color: "#0A1128" }}>
            {published ? "Publié" : "Brouillon (non visible)"}
          </span>
        </div>

        {/* Actions */}
        <div style={{ display: "flex", gap: 12, paddingTop: 8 }}>
          <button
            onClick={() => handleSave(false)}
            disabled={saving}
            style={{ padding: "12px 28px", border: "1px solid rgba(10,17,40,0.2)", borderRadius: 9999, background: "#fff", color: "#0A1128", fontWeight: 600, cursor: "pointer", fontSize: 15 }}
          >
            Enregistrer en brouillon
          </button>
          <button
            onClick={() => handleSave(true)}
            disabled={saving}
            style={{ padding: "12px 32px", background: saving ? "rgba(10,17,40,0.4)" : "#d8ae31", border: "none", borderRadius: 9999, color: "#0A1128", fontWeight: 700, cursor: saving ? "not-allowed" : "pointer", fontSize: 15 }}
          >
            {saving ? "Enregistrement..." : "✓ Publier"}
          </button>
        </div>
      </div>
    </div>
  );
}