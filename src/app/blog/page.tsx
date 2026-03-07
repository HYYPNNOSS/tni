"use client"
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

type Post = {
  id: string;
  title: string;
  slug: string;
  description: string;
  imageUrl: string;
  tag: string;
  readTime: string;
  createdAt: string;
};

export default function BlogPage() {
  const { t } = useTranslation("common");

  const categories = t("blog_page.categories", { returnObjects: true }) as string[];

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [posts, setPosts]   = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    // Pass the active category as a query param — backend handles mapping if needed
    const isAll = activeCategory === categories[0];
    const query = !isAll ? `?tag=${encodeURIComponent(activeCategory)}` : "";
    fetch(`/api/posts${query}`)
      .then(r => r.json())
      .then(data => { setPosts(data); setLoading(false); })
      .catch(() => setLoading(false));
  }, [activeCategory]);

  const half       = Math.ceil(posts.length / 2);
  const firstHalf  = posts.slice(0, half);
  const secondHalf = posts.slice(half);

  return (
    <div style={{ minHeight:"100vh", background:"#F9F7F2", color:"#0A1128", fontFamily:"'Inter', sans-serif", overflowX:"hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        *, *::before, *::after { box-sizing: border-box; }
        .material-symbols-outlined { font-family:'Material Symbols Outlined'; font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; font-style:normal; display:inline-block; line-height:1; vertical-align:middle; }
        .serif { font-family: 'Playfair Display', serif; }
        .article-card { transition: transform 0.2s; }
        .article-card:hover { transform: translateY(-2px); }
        .filter-bar { display:flex; justify-content:center; gap:10px; overflow-x:auto; padding:14px 20px; -webkit-overflow-scrolling:touch; scrollbar-width:none; }
        .filter-bar::-webkit-scrollbar { display:none; }
        .filter-btn { flex-shrink:0; padding:7px 18px; border-radius:9999px; border:1px solid; font-size:13px; font-weight:500; cursor:pointer; transition:all 0.2s; white-space:nowrap; font-family:inherit; }
        .posts-grid { display:grid; grid-template-columns:repeat(auto-fill, minmax(300px, 1fr)); gap:32px; }
        .cta-actions { display:flex; justify-content:center; gap:16px; flex-wrap:wrap; }
        @keyframes bounce { 0%,100%{transform:translateY(0)} 50%{transform:translateY(-8px)} }
        @keyframes spin   { to { transform: rotate(360deg); } }
        @media (max-width:768px) {
          .hero-h1       { font-size:36px !important; }
          .hero-section  { padding:64px 20px 48px !important; }
          .posts-grid    { gap:24px !important; }
          .main-pad      { padding:48px 20px !important; }
          .lead-pad      { padding:0 20px 64px !important; }
          .lead-content  { padding:32px 24px !important; }
          .lead-visual   { padding:32px 24px !important; }
          .mid-cta-inner { padding:48px 24px !important; }
          .mid-cta-h2    { font-size:26px !important; }
          .bottom-cta    { padding:56px 20px 80px !important; }
          .bottom-cta-h2 { font-size:26px !important; }
          .cta-actions a { width:100%; justify-content:center; }
        }
        @media (max-width:480px) {
          .hero-h1    { font-size:28px !important; }
          .filter-btn { font-size:12px !important; padding:6px 14px !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="hero-section" style={{ padding:"96px 40px 64px", textAlign:"center", position:"relative", overflow:"hidden" }}>
        <div style={{ position:"absolute", right:-80, top:-80, width:320, height:320, borderRadius:"50%", background:"rgba(216,174,49,0.05)", filter:"blur(60px)", pointerEvents:"none" }} />
        <h1 className="serif hero-h1" style={{ fontSize:56, fontWeight:300, color:"#0A1128", lineHeight:1.2, marginBottom:28 }}>
          {t("blog_page.hero_title_plain")} <br />
          <em style={{ fontStyle:"italic", fontWeight:400 }}>{t("blog_page.hero_title_italic")}</em>
        </h1>
        <p style={{ fontSize:17, color:"rgba(10,17,40,0.6)", fontWeight:300, maxWidth:560, margin:"0 auto 48px", lineHeight:1.7 }}>
          {t("blog_page.hero_body")}
        </p>
        <div style={{ display:"flex", justifyContent:"center" }}>
          <div style={{ width:1, height:56, background:"rgba(216,174,49,0.4)", animation:"bounce 2s infinite" }} />
        </div>
      </section>

      {/* ── Filter bar ── */}
      <div style={{ position:"sticky", top:0, zIndex:40, background:"rgba(249,247,242,0.97)", backdropFilter:"blur(8px)", borderBottom:"1px solid rgba(10,17,40,0.06)" }}>
        <div className="filter-bar">
          {categories.map(cat => (
            <button key={cat} className="filter-btn" onClick={() => setActiveCategory(cat)}
              style={{ borderColor: activeCategory===cat?"#0A1128":"rgba(10,17,40,0.12)", background: activeCategory===cat?"#0A1128":"transparent", color: activeCategory===cat?"#fff":"#0A1128" }}>
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* ── Posts ── */}
      <main className="main-pad" style={{ maxWidth:1280, margin:"0 auto", padding:"64px 40px" }}>
        {loading ? (
          <div style={{ display:"flex", justifyContent:"center", padding:80 }}>
            <div style={{ width:40, height:40, border:"3px solid rgba(10,17,40,0.1)", borderTopColor:"#d8ae31", borderRadius:"50%", animation:"spin 0.8s linear infinite" }} />
          </div>
        ) : posts.length === 0 ? (
          <div style={{ textAlign:"center", padding:80, color:"rgba(10,17,40,0.4)", fontSize:17 }}>
            {t("blog_page.empty_state")}
          </div>
        ) : (
          <>
            <div className="posts-grid">
              {firstHalf.map(post => <ArticleCard key={post.id} post={post} />)}
            </div>

            {secondHalf.length > 0 && (
              <>
                {/* Mid CTA */}
                <section style={{ background:"#0A1128", borderRadius:16, overflow:"hidden", margin:"64px 0" }}>
                  <div className="mid-cta-inner" style={{ padding:"72px 40px", textAlign:"center" }}>
                    <div style={{ maxWidth:680, margin:"0 auto" }}>
                      <span style={{ display:"block", color:"#d8ae31", fontWeight:700, letterSpacing:"0.3em", textTransform:"uppercase", fontSize:11, marginBottom:20 }}>
                        {t("blog_page.mid_cta_badge")}
                      </span>
                      <h2 className="serif mid-cta-h2" style={{ fontSize:38, fontWeight:300, color:"#d8ae31", lineHeight:1.5, marginBottom:28 }}>
                        {t("blog_page.mid_cta_heading")}
                      </h2>
                      <p style={{ color:"rgba(255,255,255,0.5)", fontSize:17, fontWeight:300, lineHeight:1.7, margin:0 }}>
                        {t("blog_page.mid_cta_body")}
                      </p>
                    </div>
                  </div>
                </section>

                <div className="posts-grid">
                  {secondHalf.map(post => <ArticleCard key={post.id} post={post} />)}
                </div>
              </>
            )}
          </>
        )}
      </main>

      {/* ── Lead Magnet ── */}
      <section className="lead-pad" style={{ maxWidth:1280, margin:"0 auto", padding:"0 40px 80px" }}>
        <div style={{ background:"#0A1128", borderRadius:16, overflow:"hidden", display:"flex", flexWrap:"wrap" }}>
          <div className="lead-content" style={{ padding:48, flex:3, minWidth:280, display:"flex", flexDirection:"column", justifyContent:"center" }}>
            <span style={{ color:"#d8ae31", fontSize:11, fontWeight:700, letterSpacing:"0.2em", textTransform:"uppercase", marginBottom:14, display:"block" }}>
              {t("blog_page.lead_badge")}
            </span>
            <h2 className="serif" style={{ fontSize:28, color:"#fff", marginBottom:20, lineHeight:1.35 }}>
              {t("blog_page.lead_heading")}
            </h2>
            <p style={{ color:"rgba(255,255,255,0.5)", marginBottom:28, lineHeight:1.7, fontWeight:300, fontSize:15 }}>
              {t("blog_page.lead_body")}
            </p>
            <button style={{ display:"inline-flex", alignItems:"center", gap:8, width:"fit-content", background:"#d8ae31", color:"#0A1128", border:"none", borderRadius:9999, height:52, padding:"0 32px", fontSize:15, fontWeight:700, cursor:"pointer", fontFamily:"inherit" }}>
              {t("blog_page.lead_cta")}
              <span className="material-symbols-outlined" style={{fontSize:18}}>download</span>
            </button>
          </div>
          <div className="lead-visual" style={{ flex:2, minWidth:200, background:"rgba(216,174,49,0.08)", display:"flex", alignItems:"center", justifyContent:"center", padding:32 }}>
            <div style={{ width:180, height:252, background:"#fff", borderRadius:4, boxShadow:"0 20px 60px rgba(0,0,0,0.4)", transform:"rotate(6deg)", overflow:"hidden", border:"6px solid #0A1128" }}>
              <div style={{ position:"relative", width:"100%", height:"100%", background:"#0A1128", display:"flex", flexDirection:"column", justifyContent:"space-between", padding:14 }}>
                <div style={{ color:"#d8ae31", fontSize:8, fontWeight:700, letterSpacing:"0.15em", textTransform:"uppercase" }}>{t("blog_page.lead_book_label")}</div>
                <div className="serif" style={{ color:"#fff", fontSize:14, lineHeight:1.4 }}>{t("blog_page.lead_book_title")}</div>
                <div style={{ height:2, width:36, background:"#d8ae31" }} />
                <div style={{ color:"rgba(255,255,255,0.35)", fontSize:7 }}>{t("blog_page.lead_book_sub")}</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="bottom-cta" style={{ borderTop:"1px solid rgba(10,17,40,0.06)", padding:"72px 40px 112px", background:"#F9F7F2", textAlign:"center" }}>
        <h2 className="serif bottom-cta-h2" style={{ fontSize:34, color:"#0A1128", marginBottom:20 }}>
          {t("blog_page.bottom_heading")}
        </h2>
        <p style={{ color:"rgba(10,17,40,0.5)", fontSize:17, fontWeight:300, maxWidth:540, margin:"0 auto 36px", lineHeight:1.7 }}>
          {t("blog_page.bottom_body")}
        </p>
        <div className="cta-actions">
          <a href="mailto:contact@tnigroup.ma" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 28px", border:"1px solid #0A1128", borderRadius:9999, color:"#0A1128", fontWeight:700, textDecoration:"none", fontSize:15, fontFamily:"inherit" }}>
            <span className="material-symbols-outlined" style={{fontSize:18}}>mail</span>
            {t("blog_page.bottom_cta_email")}
          </a>
          <a href="#" style={{ display:"inline-flex", alignItems:"center", gap:8, padding:"14px 28px", background:"#d8ae31", borderRadius:9999, color:"#0A1128", fontWeight:700, textDecoration:"none", fontSize:15, fontFamily:"inherit" }}>
            <span className="material-symbols-outlined" style={{fontSize:18}}>event</span>
            {t("blog_page.bottom_cta_meeting")}
          </a>
        </div>
      </section>
    </div>
  );
}

function ArticleCard({ post }: { post: Post }) {
  const { t } = useTranslation("common");
  const [hovered, setHovered] = useState(false);

  return (
    <article
      className="article-card"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => window.location.href = `/blog/${post.slug}`}
      style={{ cursor:"pointer" }}
    >
      <div style={{ position:"relative", overflow:"hidden", borderRadius:12, marginBottom:20, aspectRatio:"4/3" }}>
        <div style={{ position:"absolute", inset:0, background: hovered?"rgba(10,17,40,0)":"rgba(10,17,40,0.18)", transition:"background 0.5s", zIndex:10 }} />
        <div style={{ width:"100%", height:"100%", backgroundImage:`url("${post.imageUrl}")`, backgroundSize:"cover", backgroundPosition:"center", transform: hovered?"scale(1.05)":"scale(1)", transition:"transform 0.65s" }} />
        <span style={{ position:"absolute", top:14, left:14, zIndex:20, background:"#d8ae31", color:"#0A1128", fontSize:10, textTransform:"uppercase", letterSpacing:"0.15em", fontWeight:700, padding:"4px 10px", borderRadius:9999 }}>
          {post.tag}
        </span>
      </div>
      <div>
        <h3 className="serif" style={{ fontSize:20, color: hovered?"#d8ae31":"#0A1128", marginBottom:10, transition:"color 0.3s", lineHeight:1.35 }}>
          {post.title}
        </h3>
        <p style={{ color:"rgba(10,17,40,0.5)", fontSize:13, marginBottom:14, fontWeight:300, lineHeight:1.65, overflow:"hidden", display:"-webkit-box", WebkitLineClamp:2, WebkitBoxOrient:"vertical" }}>
          {post.description}
        </p>
        <div style={{ display:"flex", alignItems:"center", justifyContent:"space-between", fontSize:12, fontWeight:600, color:"rgba(10,17,40,0.38)", borderTop:"1px solid rgba(10,17,40,0.06)", paddingTop:14, flexWrap:"wrap", gap:8 }}>
          <span>{t("blog_page.by_authors")} • {post.readTime} {t("blog_page.read_time_suffix")}</span>
          <span style={{ color:"#d8ae31", display:"inline-flex", alignItems:"center", gap:4, transform: hovered?"translateX(4px)":"translateX(0)", transition:"transform 0.3s" }}>
            {t("blog_page.read_article")}
            <span className="material-symbols-outlined" style={{fontSize:15}}>arrow_forward</span>
          </span>
        </div>
      </div>
    </article>
  );
}