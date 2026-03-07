"use client";
import { useState, useEffect, useRef } from "react";

// ─── Data ────────────────────────────────────────────────────────────────────
const T = {
  nav: { links: ["Services", "À propos", "Processus", "Contact"], cta: "Obtenir un devis" },
  hero: {
    badge: "🌍 Présent dans 30+ pays",
    title: ["Transport.", "Négoce.", "International."],
    sub: "La solution logistique de référence depuis le Maroc vers l'Europe, l'Afrique et au-delà. Rapide, fiable, certifié.",
    cta1: "Demander un devis gratuit", cta2: "Voir nos services",
    stats: [{ v: "15+", l: "Années d'expérience" }, { v: "98%", l: "Satisfaction client" }, { v: "30+", l: "Pays desservis" }, { v: "500+", l: "Clients actifs" }],
  },
  logos: ["AgriMaroc", "MedExport", "TransSud", "CasaFresh", "EuroLink", "MaghrebTrade"],
  atouts: {
    badge: "Nos avantages", heading: "Pourquoi choisir TNI ?", sub: "Quatre piliers qui font de TNI le partenaire logistique le plus fiable du Maghreb.",
    items: [
      { icon: "local_shipping", title: "Livraison rapide", desc: "Des circuits optimisés pour des délais de livraison compétitifs sur tous vos corridors internationaux.", tag: "Express" },
      { icon: "ac_unit", title: "Transport frigorifique", desc: "Camions isothermes et réfrigérés pour vos marchandises sensibles à la température.", tag: "Chaîne du froid" },
      { icon: "public", title: "Réseau international", desc: "Présence dans 30+ pays avec des partenaires certifiés et des infrastructures dédiées.", tag: "30+ pays" },
      { icon: "description", title: "Documentation", desc: "Gestion complète de vos documents douaniers, certificats d'origine et formalités administratives.", tag: "Clé en main" },
    ],
  },
  services: {
    badge: "Nos services", heading: "Des solutions pour chaque besoin",
    items: [
      { title: "Transport routier", desc: "Solutions de fret complet et groupage pour vos expéditions terrestres en Europe et en Afrique.", img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBiZ-iG5AfqJV04aJZ0gsEK64krkcjHBLqN9fyLYk9fznp6k_g7lVgI1XrtCEXTOnX4YpQWZFol-vBSuy5tPsT_ORiSOfdRGUEZsHHmlXYJU5uFiWa3kQzQJfrf9ccM-4H88UXL4HEhSVdTB8MfTyTazvV162ryZ28GOHNxK3I4kt_ynp8l21JMhn0JG2bTphYYZNEkWkZIKHCQ1ozDDXLIXHBCshIWRNE_fI9BoSIi7xMMxDBFEI5xUZdk6EiJCpARa6Mo4Fo1lTs', features: ["Fret complet (FTL)", "Groupage (LTL)", "Express 24h/48h"] },
      { title: "Transport frigorifique", desc: "Chaîne du froid maîtrisée de bout en bout pour vos denrées alimentaires et produits pharmaceutiques.", img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCxvucGHyUiv8DG-QG-4zSYDmbcv_VJxa9zgHbmaTsYAz51FiYnsr-r04OurWUcT7YhEJc9pilsAT8ig4r3CL__N3zwyvD3p5QrO_v5t-zoZBU7VMC1vpPUtZ908PUikfOpse07O0JKtrU5uMJ_7m14sn2aBVONQhEK4VCHMEqnvwEEGH-gsmZ2QbeqixBVlVJgEZefDZyQ5Knc3HyYM90RdpEx22u_okApyTPvZN1VJ5pScFszmkNZvF54w4qOG17Fi2pV8M0LW7g', features: ["-18°C à +18°C", "Certifié ATP", "Monitoring GPS"] },
      { title: "Négoce international", desc: "Sourcing, achat et revente de marchandises avec une expertise marché unique en Afrique et en Europe.", img: 'https://lh3.googleusercontent.com/aida-public/AB6AXuADauQP3u7HkWFHHOVPRVwf7rqM78SgVd26MJCSEk_3rQEAiRioojUc04FqGQmdHSvTObOiXNAFq5QZhQZoB0NUCiYOJecIBRpm6KkH5t5jdbH4qHtqjlyKlPUNVE6fH7Dft0yx9dFPIlmeHQodD_A8waU2vAK4p5gbn6y8uYcjHcJd_Oze6D0KEmjGSfrbwlhDbxrp6w3WfBHhomGyAwa8p_p4tD77OrRLVM25wpM7taIy5NUEcZNfT026eQBvd6kH9PTW6jwmyJo', features: ["Sourcing produits", "Gestion des risques", "Financement trade"] },
    ],
  },
  about: {
    badge: "Notre histoire", heading: "15 ans à connecter le Maroc au monde", sub: "Fondée sur la confiance et l'expertise, TNI est aujourd'hui le partenaire logistique de référence pour les entreprises qui veulent s'ouvrir à l'international.",
    points: ["Réseau de 500+ partenaires certifiés", "Couverture douanière dans 30+ pays", "Équipe dédiée disponible 24h/7j", "Certification ISO 9001:2015"],
    quote: "TNI a transformé notre chaîne logistique. Leur réactivité et leur expertise douanière nous ont permis de réduire nos délais de 40%.", quoteAuthor: "Youssef Benmoussa, Directeur Général — AgriMaroc",
  },
  process: {
    badge: "Comment ça marche", heading: "En 5 étapes, votre cargo est livré",
    steps: [
      { n: "01", title: "Demande", desc: "Soumettez votre besoin via notre formulaire ou par téléphone. Réponse sous 2h.", icon: "edit_note" },
      { n: "02", title: "Devis personnalisé", desc: "Notre équipe analyse votre besoin et vous envoie une offre sous 24h.", icon: "request_quote" },
      { n: "03", title: "Confirmation", desc: "Validez le devis et planifiez votre expédition selon vos délais.", icon: "task_alt" },
      { n: "04", title: "Suivi temps réel", desc: "Tracking GPS continu avec alertes automatiques à chaque étape.", icon: "location_on" },
      { n: "05", title: "Livraison", desc: "Réception confirmée et documentation complète remise.", icon: "inventory_2" },
    ],
  },
  why: {
    badge: "L'avantage TNI", heading: "Ce que nos concurrents ne peuvent pas offrir",
    items: [
      { icon: "verified_user", title: "Conformité garantie", desc: "Certifiés ISO et conformes aux réglementations douanières les plus strictes." },
      { icon: "speed", title: "Réactivité 24/7", desc: "Une équipe dédiée disponible à toute heure pour vos urgences logistiques." },
      { icon: "payments", title: "Tarifs transparents", desc: "Pas de frais cachés. Des prix clairs et compétitifs adaptés à votre volume." },
      { icon: "support_agent", title: "Account manager dédié", desc: "Un interlocuteur unique qui connaît votre business et vos contraintes." },
    ],
  },
  contact: {
    badge: "Contact", heading: "Parlons de votre projet",
    sub: "Obtenez un devis personnalisé sous 24h. Notre équipe est disponible du lundi au samedi.",
    phone: "+212 522 XXX XXX", hours: "Lun–Sam · 8h–20h",
    offices: [{ city: "Casablanca — Siège", addr: "Zone Industrielle, Lot 42, 20600" }, { city: "Tanger Med", addr: "Port de Tanger Med, Terminal Frêt, Bât. C" }],
    form: {
      fields: [
        { k: "nom", l: "Nom complet *", p: "Jean Dupont", type: "text" },
        { k: "email", l: "Email professionnel *", p: "jean@entreprise.ma", type: "email" },
        { k: "entreprise", l: "Entreprise", p: "Votre société", type: "text" },
        { k: "telephone", l: "Téléphone", p: "+212 6XX XXX XXX", type: "tel" },
      ],
      options: ["Transport routier", "Transport frigorifique", "Négoce international", "Autre"],
      msg: { k: "message", l: "Décrivez votre besoin", p: "Départ, destination, volume, fréquence..." },
      send: "Envoyer ma demande", sending: "Envoi en cours...", sent: "Demande envoyée ✓",
      consent: "J'accepte que TNI utilise mes informations pour traiter ma demande.",
    },
  },
};

// ─── useInView hook ───────────────────────────────────────────────────────────
function useInView(options = {}) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); obs.disconnect(); }
    }, { threshold: 0.12, ...options });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);
  return [ref, inView];
}

// ─── Animated wrapper ─────────────────────────────────────────────────────────
function Reveal({ children, delay = 0, direction = "up", className = "" }) {
  const [ref, inView] = useInView();
  const transforms = { up: "translateY(40px)", left: "translateX(-40px)", right: "translateX(40px)", scale: "scale(0.94)" };
  return (
    <div ref={ref} className={className} style={{
      opacity: inView ? 1 : 0,
      transform: inView ? "none" : (transforms[direction] || "translateY(40px)"),
      transition: `opacity 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms, transform 0.7s cubic-bezier(0.16,1,0.3,1) ${delay}ms`,
    }}>
      {children}
    </div>
  );
}

// ─── Badge pill ───────────────────────────────────────────────────────────────
function Badge({ children }) {
  return (
    <span style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(0,53,161,0.08)", color: "#0035A1", border: "1px solid rgba(0,53,161,0.15)", borderRadius: 999, padding: "5px 14px", fontSize: 12, fontWeight: 600, letterSpacing: "0.02em" }}>
      {children}
    </span>
  );
}

// ─── Section heading ──────────────────────────────────────────────────────────
function SectionHead({ badge, heading, sub, center = false, light = false }) {
  return (
    <div style={{ textAlign: center ? "center" : "left", maxWidth: center ? 640 : "none", margin: center ? "0 auto" : undefined }}>
      <Reveal><Badge>{badge}</Badge></Reveal>
      <Reveal delay={80}>
        <h2 style={{ fontSize: "clamp(32px,4vw,52px)", fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1.1, margin: "16px 0 20px", color: light ? "#fff" : "#0d121b" }}>
          {heading}
        </h2>
      </Reveal>
      {sub && <Reveal delay={160}><p style={{ fontSize: 17, color: light ? "rgba(255,255,255,0.7)" : "#64748b", lineHeight: 1.7, margin: 0 }}>{sub}</p></Reveal>}
    </div>
  );
}

// ─── Contact form ─────────────────────────────────────────────────────────────
function ContactForm() {
  const [form, setForm] = useState({ nom: "", email: "", entreprise: "", telephone: "", service: "", message: "", consent: false });
  const [status, setStatus] = useState("idle"); // idle | sending | sent
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.nom && form.email && form.consent;

  const iStyle = { width: "100%", padding: "12px 16px", border: "1.5px solid #e2e8f0", borderRadius: 10, fontSize: 14, outline: "none", background: "#fff", color: "#0d121b", fontFamily: "inherit", transition: "border-color 0.2s", boxSizing: "border-box" };
  const lStyle = { display: "block", fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 6 };

  const handleSend = () => {
    if (!valid) return;
    setStatus("sending");
    setTimeout(() => setStatus("sent"), 1800);
  };

  if (status === "sent") return (
    <div style={{ textAlign: "center", padding: "60px 20px" }}>
      <div style={{ width: 64, height: 64, background: "linear-gradient(135deg,#0035A1,#1a56d6)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 20px" }}>
        <span className="material-symbols-outlined" style={{ color: "#fff", fontSize: 30 }}>check</span>
      </div>
      <h3 style={{ fontSize: 22, fontWeight: 800, marginBottom: 8 }}>Demande envoyée !</h3>
      <p style={{ color: "#64748b", fontSize: 14, lineHeight: 1.6 }}>Merci <strong>{form.nom}</strong>, notre équipe vous répondra à <strong>{form.email}</strong> sous 24h.</p>
      <button onClick={() => { setStatus("idle"); setForm({ nom: "", email: "", entreprise: "", telephone: "", service: "", message: "", consent: false }); }}
        style={{ marginTop: 24, background: "#0035A1", color: "#fff", border: "none", borderRadius: 10, padding: "12px 28px", fontWeight: 700, fontSize: 14, cursor: "pointer", fontFamily: "inherit" }}>
        Nouvelle demande
      </button>
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {T.contact.form.fields.slice(0, 2).map(({ k, l, p, type }) => (
          <div key={k}>
            <label style={lStyle}>{l}</label>
            <input type={type} placeholder={p} value={form[k]} onChange={e => set(k, e.target.value)}
              style={iStyle} onFocus={e => e.target.style.borderColor = "#0035A1"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
          </div>
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {T.contact.form.fields.slice(2).map(({ k, l, p, type }) => (
          <div key={k}>
            <label style={lStyle}>{l}</label>
            <input type={type} placeholder={p} value={form[k]} onChange={e => set(k, e.target.value)}
              style={iStyle} onFocus={e => e.target.style.borderColor = "#0035A1"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
          </div>
        ))}
      </div>
      <div>
        <label style={lStyle}>Service souhaité</label>
        <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
          {T.contact.form.options.map(o => (
            <button key={o} onClick={() => set("service", o)}
              style={{ padding: "7px 14px", borderRadius: 8, border: form.service === o ? "1.5px solid #0035A1" : "1.5px solid #e2e8f0", background: form.service === o ? "rgba(0,53,161,0.06)" : "#fff", color: form.service === o ? "#0035A1" : "#64748b", fontSize: 13, fontWeight: 600, cursor: "pointer", transition: "all 0.15s", fontFamily: "inherit" }}>
              {o}
            </button>
          ))}
        </div>
      </div>
      <div>
        <label style={lStyle}>{T.contact.form.msg.l}</label>
        <textarea placeholder={T.contact.form.msg.p} value={form.message} onChange={e => set("message", e.target.value)} rows={4}
          style={{ ...iStyle, resize: "vertical" }} onFocus={e => e.target.style.borderColor = "#0035A1"} onBlur={e => e.target.style.borderColor = "#e2e8f0"} />
      </div>
      <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer", fontSize: 13, color: "#64748b" }}>
        <input type="checkbox" checked={form.consent} onChange={e => set("consent", e.target.checked)} style={{ marginTop: 2, accentColor: "#0035A1", flexShrink: 0 }} />
        {T.contact.form.consent}
      </label>
      <button onClick={handleSend} disabled={!valid || status === "sending"}
        style={{ background: valid ? "linear-gradient(135deg,#0035A1,#1a56d6)" : "#e2e8f0", color: valid ? "#fff" : "#94a3b8", border: "none", borderRadius: 12, padding: "15px", fontSize: 15, fontWeight: 700, cursor: valid ? "pointer" : "not-allowed", fontFamily: "inherit", transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8 }}>
        {status === "sending" ? (
          <><span style={{ width: 18, height: 18, border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%", animation: "spin 0.8s linear infinite", display: "inline-block" }} />{T.contact.form.sending}</>
        ) : T.contact.form.send}
      </button>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
export default function TNIRelume() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  // Horizontal scroll ticker
  const tickerRef = useRef(null);
  useEffect(() => {
    const el = tickerRef.current;
    if (!el) return;
    let x = 0;
    const step = () => { x -= 0.5; if (Math.abs(x) >= el.scrollWidth / 2) x = 0; el.style.transform = `translateX(${x}px)`; requestAnimationFrame(step); };
    const id = requestAnimationFrame(step);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div style={{ minHeight: "100vh", background: "#ffffff", color: "#0d121b", fontFamily: "'Plus Jakarta Sans', sans-serif", overflowX: "hidden" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Plus Jakarta Sans', sans-serif; }
        .material-symbols-outlined { font-family:'Material Symbols Outlined'; font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; font-style:normal; display:inline-block; line-height:1; vertical-align:middle; }
        ::selection { background: #0035A1; color: #fff; }
        html { scroll-behavior: smooth; }

        /* Nav */
        .nav-link { font-size: 14px; font-weight: 600; color: #374151; text-decoration: none; transition: color 0.15s; }
        .nav-link:hover { color: #0035A1; }

        /* Cards */
        .atout-card { transition: transform 0.25s, box-shadow 0.25s; }
        .atout-card:hover { transform: translateY(-6px); box-shadow: 0 20px 60px rgba(0,53,161,0.12) !important; }

        .service-card { transition: transform 0.25s, box-shadow 0.25s; }
        .service-card:hover { transform: translateY(-4px); box-shadow: 0 16px 48px rgba(0,0,0,0.1) !important; }

        .why-card { transition: all 0.2s; }
        .why-card:hover { background: rgba(0,53,161,0.04) !important; border-color: rgba(0,53,161,0.2) !important; }

        /* Process connector */
        .process-line { display: none; }
        @media (min-width: 768px) { .process-line { display: block; } }

        /* Ticker */
        .ticker-wrap { overflow: hidden; }
        .ticker-inner { display: flex; gap: 0; width: max-content; }

        /* Step hover */
        .step-card { transition: all 0.22s; }
        .step-card:hover { background: #0035A1 !important; }
        .step-card:hover .step-num { color: rgba(255,255,255,0.3) !important; }
        .step-card:hover .step-title { color: #fff !important; }
        .step-card:hover .step-desc { color: rgba(255,255,255,0.7) !important; }
        .step-card:hover .step-icon { background: rgba(255,255,255,0.15) !important; color: #fff !important; }

        /* CTA hover */
        .cta-primary { transition: all 0.2s; }
        .cta-primary:hover { transform: translateY(-2px); box-shadow: 0 12px 32px rgba(0,53,161,0.35) !important; }
        .cta-outline { transition: all 0.2s; }
        .cta-outline:hover { background: rgba(0,53,161,0.05) !important; }

        /* Gradient text */
        .grad-text { background: linear-gradient(135deg, #0035A1 0%, #f59e0b 100%); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; }

        /* Scroll-triggered counter animation */
        @keyframes countUp { from { opacity:0; transform:translateY(10px); } to { opacity:1; transform:none; } }

        @keyframes spin { to { transform: rotate(360deg); } }

        /* Hero mesh gradient */
        .hero-mesh { position:absolute; inset:0; background: radial-gradient(ellipse 80% 60% at 60% -10%, rgba(0,53,161,0.07) 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 90% 80%, rgba(245,158,11,0.06) 0%, transparent 60%), radial-gradient(ellipse 60% 50% at -10% 50%, rgba(0,53,161,0.04) 0%, transparent 70%); pointer-events:none; }

        /* Floating badge in hero */
        @keyframes floatBadge { 0%,100% { transform:translateY(0); } 50% { transform:translateY(-8px); } }
        .float-badge { animation: floatBadge 3s ease-in-out infinite; }

        /* Section divider dots */
        .dot-divider { display:flex; gap:6px; }
        .dot-divider span { width:6px; height:6px; border-radius:50%; background:#e2e8f0; }
        .dot-divider span:first-child { background:#0035A1; }

        /* Responsive */
        @media (max-width: 768px) {
          .hide-mobile { display: none !important; }
          .grid-2-mobile { grid-template-columns: 1fr !important; }
          .grid-3-mobile { grid-template-columns: 1fr !important; }
          .grid-4-mobile { grid-template-columns: 1fr 1fr !important; }
        }
      `}</style>

      {/* ══ NAVBAR ══════════════════════════════════════════════════════════ */}
      <nav style={{
        position: "fixed", top: 0, left: 0, right: 0, zIndex: 200,
        background: scrolled ? "rgba(255,255,255,0.95)" : "transparent",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        borderBottom: scrolled ? "1px solid rgba(0,0,0,0.06)" : "none",
        transition: "all 0.3s",
        padding: "0 clamp(20px,5vw,80px)",
        height: 68, display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
          <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#0035A1,#1a56d6)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ color: "#fff", fontSize: 13, fontWeight: 800, letterSpacing: "-0.03em" }}>TNI</span>
          </div>
          <span style={{ fontSize: 15, fontWeight: 800, letterSpacing: "-0.02em" }}>Transport & Négoce</span>
        </div>

        {/* Links */}
        <div className="hide-mobile" style={{ display: "flex", gap: 36, alignItems: "center" }}>
          {T.nav.links.map(l => <a key={l} href={`#${l.toLowerCase()}`} className="nav-link">{l}</a>)}
          <button style={{ background: "linear-gradient(135deg,#0035A1,#1a56d6)", color: "#fff", border: "none", borderRadius: 10, padding: "10px 22px", fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 4px 16px rgba(0,53,161,0.25)" }} className="cta-primary">
            {T.nav.cta}
          </button>
        </div>

        {/* Mobile hamburger */}
        <button className="hide-desktop" onClick={() => setMobileMenu(m => !m)}
          style={{ background: "none", border: "none", cursor: "pointer", color: "#0d121b", display: "none" }}>
          <span className="material-symbols-outlined">{mobileMenu ? "close" : "menu"}</span>
        </button>
      </nav>

      {/* ══ HERO ════════════════════════════════════════════════════════════ */}
      <section style={{ minHeight: "100vh", display: "flex", alignItems: "center", position: "relative", padding: "100px clamp(20px,5vw,80px) 80px", overflow: "hidden" }}>
        <div className="hero-mesh" />
        {/* Background grid pattern */}
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle, rgba(0,53,161,0.06) 1px, transparent 1px)", backgroundSize: "32px 32px", pointerEvents: "none" }} />

        <div style={{ maxWidth: 1320, margin: "0 auto", width: "100%", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,100px)", alignItems: "center" }} className="grid-2-mobile">

          {/* Left */}
          <div>
            <Reveal>
              <div style={{ marginBottom: 24 }}>
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8, background: "rgba(0,53,161,0.07)", border: "1px solid rgba(0,53,161,0.14)", borderRadius: 999, padding: "6px 16px 6px 8px", fontSize: 13, fontWeight: 600, color: "#0035A1" }}>
                  <span style={{ background: "#0035A1", borderRadius: "50%", width: 20, height: 20, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 12, color: "#fff" }}>public</span>
                  </span>
                  {T.hero.badge}
                </span>
              </div>
            </Reveal>

            <div style={{ marginBottom: 28 }}>
              {T.hero.title.map((word, i) => (
                <Reveal key={i} delay={i * 80}>
                  <h1 style={{ fontSize: "clamp(52px,7vw,88px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.0, color: i === 1 ? "#0035A1" : i === 2 ? "#f59e0b" : "#0d121b", display: "block" }}>
                    {word}
                  </h1>
                </Reveal>
              ))}
            </div>

            <Reveal delay={240}>
              <p style={{ fontSize: "clamp(15px,1.5vw,18px)", color: "#64748b", lineHeight: 1.7, marginBottom: 36, maxWidth: 480 }}>{T.hero.sub}</p>
            </Reveal>

            <Reveal delay={300}>
              <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 52 }}>
                <button style={{ background: "linear-gradient(135deg,#0035A1,#1a56d6)", color: "#fff", border: "none", borderRadius: 12, padding: "15px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", boxShadow: "0 8px 24px rgba(0,53,161,0.3)", display: "flex", alignItems: "center", gap: 8 }} className="cta-primary">
                  {T.hero.cta1} <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
                </button>
                <button style={{ background: "#fff", color: "#0d121b", border: "1.5px solid #e2e8f0", borderRadius: 12, padding: "15px 24px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit" }} className="cta-outline">
                  {T.hero.cta2}
                </button>
              </div>
            </Reveal>

            {/* Stats row */}
            <Reveal delay={360}>
              <div style={{ display: "flex", gap: 0, paddingTop: 28, borderTop: "1px solid #f1f5f9" }}>
                {T.hero.stats.map(({ v, l }, i) => (
                  <div key={i} style={{ flex: 1, paddingRight: 20, borderRight: i < 3 ? "1px solid #f1f5f9" : "none", paddingLeft: i > 0 ? 20 : 0 }}>
                    <div style={{ fontSize: "clamp(24px,3vw,36px)", fontWeight: 800, letterSpacing: "-0.03em", color: i === 1 ? "#f59e0b" : "#0035A1", lineHeight: 1 }}>{v}</div>
                    <div style={{ fontSize: 11, color: "#94a3b8", fontWeight: 500, marginTop: 4, lineHeight: 1.3 }}>{l}</div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Right: image stack */}
          <Reveal direction="right" delay={200}>
            <div style={{ position: "relative" }}>
              {/* Main image */}
              <div style={{ borderRadius: 24, overflow: "hidden", aspectRatio: "4/5", backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCNbXOD83dUIP-m2nqwX_aVwx3gJi2icZf0JKx2aZTo6iTelKz514AIMvpQrhG_Sj8fPW8Fhcwwo9v_pJw-EJD17xaxqzn8UzX-0e8BqkBI3K8e5YCiHypYsUpz2_UtIG13yJSIH614F8Q1pEG79OX3S7-58D_2xk1lUFgUS7CFujRdnod8NnS1JHMHDYiKWaceUYmWm7QhJS9dtc91If9c34cUW5wC8eAe7IA7Mf8nS-xIVIUZyi393OkDmDRt1CSZ7x_7SuqkVRY")`, backgroundSize: "cover", backgroundPosition: "center", boxShadow: "0 32px 80px rgba(0,0,0,0.15)" }} />

              {/* Floating card: rating */}
              <div className="float-badge" style={{ position: "absolute", top: 28, left: -28, background: "#fff", borderRadius: 16, padding: "14px 18px", boxShadow: "0 12px 40px rgba(0,0,0,0.12)", display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 40, height: 40, background: "linear-gradient(135deg,#f59e0b,#fbbf24)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ color: "#fff", fontSize: 20 }}>star</span>
                </div>
                <div>
                  <div style={{ fontSize: 18, fontWeight: 800, color: "#0d121b", lineHeight: 1 }}>4.9/5</div>
                  <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>500+ clients satisfaits</div>
                </div>
              </div>

              {/* Floating card: delivery */}
              <div style={{ position: "absolute", bottom: 32, right: -24, background: "#0035A1", borderRadius: 16, padding: "14px 18px", boxShadow: "0 12px 40px rgba(0,53,161,0.3)", color: "#fff" }}>
                <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 4 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 18, color: "#7dd3fc" }}>local_shipping</span>
                  <span style={{ fontSize: 12, fontWeight: 600, opacity: 0.8 }}>Livraison en cours</span>
                </div>
                <div style={{ fontSize: 15, fontWeight: 800 }}>Casablanca → Paris</div>
                <div style={{ fontSize: 11, opacity: 0.65, marginTop: 2 }}>ETA: 3 jours · En transit</div>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ LOGO TICKER ═════════════════════════════════════════════════════ */}
      <div style={{ borderTop: "1px solid #f1f5f9", borderBottom: "1px solid #f1f5f9", padding: "24px 0", overflow: "hidden", background: "#fafafa" }}>
        <p style={{ textAlign: "center", fontSize: 12, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 20 }}>Ils nous font confiance</p>
        <div className="ticker-wrap">
          <div ref={tickerRef} className="ticker-inner">
            {[...T.logos, ...T.logos, ...T.logos, ...T.logos].map((logo, i) => (
              <div key={i} style={{ padding: "0 48px", display: "flex", alignItems: "center", gap: 8, borderRight: "1px solid #e2e8f0", flexShrink: 0 }}>
                <div style={{ width: 8, height: 8, background: "#0035A1", borderRadius: "50%", opacity: 0.4 }} />
                <span style={{ fontSize: 16, fontWeight: 700, color: "#94a3b8", whiteSpace: "nowrap", letterSpacing: "-0.01em" }}>{logo}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ ATOUTS ══════════════════════════════════════════════════════════ */}
      <section id="services" style={{ padding: "clamp(80px,8vw,120px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <SectionHead badge={T.atouts.badge} heading={T.atouts.heading} sub={T.atouts.sub} center />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 20 }} className="grid-4-mobile">
            {T.atouts.items.map(({ icon, title, desc, tag }, i) => (
              <Reveal key={i} delay={i * 80} direction="up">
                <div className="atout-card" style={{ background: "#fff", border: "1.5px solid #f1f5f9", borderRadius: 20, padding: "28px 24px", boxShadow: "0 4px 24px rgba(0,0,0,0.05)", height: "100%" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 20 }}>
                    <div style={{ width: 52, height: 52, background: "linear-gradient(135deg,rgba(0,53,161,0.1),rgba(0,53,161,0.05))", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span className="material-symbols-outlined" style={{ color: "#0035A1", fontSize: 24 }}>{icon}</span>
                    </div>
                    <span style={{ background: "rgba(245,158,11,0.1)", color: "#f59e0b", border: "1px solid rgba(245,158,11,0.2)", borderRadius: 999, padding: "3px 10px", fontSize: 11, fontWeight: 700 }}>{tag}</span>
                  </div>
                  <h3 style={{ fontSize: 17, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.01em" }}>{title}</h3>
                  <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ SERVICES ════════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(80px,8vw,120px) clamp(20px,5vw,80px)", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 56, flexWrap: "wrap", gap: 24 }}>
            <SectionHead badge={T.services.badge} heading={T.services.heading} />
            <Reveal direction="right">
              <button style={{ background: "transparent", border: "1.5px solid #e2e8f0", borderRadius: 10, padding: "10px 20px", fontSize: 14, fontWeight: 600, color: "#374151", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 6 }} className="cta-outline">
                Voir tout <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
              </button>
            </Reveal>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 24 }} className="grid-3-mobile">
            {T.services.items.map(({ title, desc, img, features }, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="service-card" style={{ background: "#fff", borderRadius: 20, overflow: "hidden", boxShadow: "0 4px 24px rgba(0,0,0,0.06)", border: "1.5px solid #f1f5f9" }}>
                  <div style={{ aspectRatio: "16/9", backgroundImage: `url("${img}")`, backgroundSize: "cover", backgroundPosition: "center", position: "relative" }}>
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.3), transparent)" }} />
                    <div style={{ position: "absolute", bottom: 14, left: 14 }}>
                      <span style={{ background: "rgba(255,255,255,0.15)", backdropFilter: "blur(8px)", border: "1px solid rgba(255,255,255,0.25)", borderRadius: 8, padding: "4px 10px", fontSize: 11, fontWeight: 600, color: "#fff" }}>
                        0{i + 1}
                      </span>
                    </div>
                  </div>
                  <div style={{ padding: "24px" }}>
                    <h4 style={{ fontSize: 18, fontWeight: 700, marginBottom: 10, letterSpacing: "-0.02em" }}>{title}</h4>
                    <p style={{ fontSize: 13, color: "#64748b", lineHeight: 1.65, marginBottom: 18 }}>{desc}</p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                      {features.map(f => (
                        <div key={f} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13, color: "#374151", fontWeight: 500 }}>
                          <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#0035A1" }}>check_circle</span>
                          {f}
                        </div>
                      ))}
                    </div>
                    <button style={{ marginTop: 20, width: "100%", background: "rgba(0,53,161,0.05)", border: "1.5px solid rgba(0,53,161,0.12)", borderRadius: 10, padding: "11px", fontSize: 13, fontWeight: 700, color: "#0035A1", cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", justifyContent: "center", gap: 6, transition: "all 0.15s" }}
                      onMouseEnter={e => { e.currentTarget.style.background = "#0035A1"; e.currentTarget.style.color = "#fff"; }}
                      onMouseLeave={e => { e.currentTarget.style.background = "rgba(0,53,161,0.05)"; e.currentTarget.style.color = "#0035A1"; }}>
                      En savoir plus <span className="material-symbols-outlined" style={{ fontSize: 15 }}>arrow_forward</span>
                    </button>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ ABOUT ═══════════════════════════════════════════════════════════ */}
      <section id="à-propos" style={{ padding: "clamp(80px,8vw,120px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(40px,6vw,100px)", alignItems: "center" }} className="grid-2-mobile">

          {/* Images */}
          <Reveal direction="left">
            <div style={{ position: "relative" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div style={{ gridRow: "1 / 3", borderRadius: 20, backgroundImage: 'url("/Frame-14.png")', backgroundSize: "cover", backgroundPosition: "center", minHeight: 380 }} />
                <div style={{ borderRadius: 20, backgroundImage: 'url("/Frame-15.png")', backgroundSize: "cover", backgroundPosition: "center", minHeight: 180 }} />
                {/* Stat card */}
                <div style={{ background: "linear-gradient(135deg,#0035A1,#1a56d6)", borderRadius: 20, padding: "24px", display: "flex", flexDirection: "column", justifyContent: "center" }}>
                  <div style={{ fontSize: 42, fontWeight: 800, color: "#fff", letterSpacing: "-0.04em", lineHeight: 1 }}>98%</div>
                  <div style={{ fontSize: 13, color: "rgba(255,255,255,0.7)", marginTop: 6 }}>Taux de satisfaction client</div>
                  <div style={{ display: "flex", gap: 4, marginTop: 12 }}>
                    {[...Array(5)].map((_, i) => <span key={i} className="material-symbols-outlined" style={{ fontSize: 16, color: "#f59e0b" }}>star</span>)}
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Text */}
          <div>
            <SectionHead badge={T.about.badge} heading={T.about.heading} sub={T.about.sub} />
            <div style={{ display: "flex", flexDirection: "column", gap: 14, margin: "32px 0 36px" }}>
              {T.about.points.map((pt, i) => (
                <Reveal key={i} delay={i * 60}>
                  <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                    <div style={{ width: 28, height: 28, background: "rgba(0,53,161,0.08)", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span className="material-symbols-outlined" style={{ fontSize: 16, color: "#0035A1" }}>check</span>
                    </div>
                    <span style={{ fontSize: 14, fontWeight: 600, color: "#374151" }}>{pt}</span>
                  </div>
                </Reveal>
              ))}
            </div>

            {/* Testimonial */}
            <Reveal delay={200}>
              <div style={{ background: "#f8fafc", border: "1.5px solid #f1f5f9", borderRadius: 16, padding: "24px", borderLeft: "4px solid #0035A1" }}>
                <p style={{ fontSize: 15, fontStyle: "italic", color: "#374151", lineHeight: 1.7, marginBottom: 16 }}>"{T.about.quote}"</p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#0035A1,#1a56d6)", borderRadius: "50%", display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <span style={{ color: "#fff", fontSize: 14, fontWeight: 700 }}>YB</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>{T.about.quoteAuthor}</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ══ PROCESS ═════════════════════════════════════════════════════════ */}
      <section id="processus" style={{ padding: "clamp(80px,8vw,120px) clamp(20px,5vw,80px)", background: "#f8fafc" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 64 }}>
            <SectionHead badge={T.process.badge} heading={T.process.heading} center />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 16, position: "relative" }} className="grid-3-mobile">
            {/* Connecting line */}
            <div className="process-line" style={{ position: "absolute", top: 36, left: "10%", right: "10%", height: 1, background: "linear-gradient(90deg,#0035A1,rgba(0,53,161,0.1))", zIndex: 0, pointerEvents: "none" }} />

            {T.process.steps.map(({ n, title, desc, icon }, i) => (
              <Reveal key={i} delay={i * 100}>
                <div className="step-card" style={{ background: "#fff", border: "1.5px solid #f1f5f9", borderRadius: 20, padding: "28px 20px", textAlign: "center", position: "relative", zIndex: 1, cursor: "default", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
                  <div className="step-num" style={{ fontSize: 11, fontWeight: 800, color: "rgba(0,53,161,0.2)", letterSpacing: "0.1em", textTransform: "uppercase", marginBottom: 16 }}>{n}</div>
                  <div className="step-icon" style={{ width: 52, height: 52, background: "rgba(0,53,161,0.08)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", margin: "0 auto 16px", color: "#0035A1", transition: "all 0.22s" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 24 }}>{icon}</span>
                  </div>
                  <h5 className="step-title" style={{ fontSize: 15, fontWeight: 700, marginBottom: 8, letterSpacing: "-0.01em", color: "#0d121b", transition: "color 0.22s" }}>{title}</h5>
                  <p className="step-desc" style={{ fontSize: 12, color: "#64748b", lineHeight: 1.6, transition: "color 0.22s" }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHY ═════════════════════════════════════════════════════════════ */}
      <section style={{ padding: "clamp(80px,8vw,120px) clamp(20px,5vw,80px)", background: "linear-gradient(135deg,#0035A1 0%,#1a3a8f 100%)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ textAlign: "center", marginBottom: 56 }}>
            <SectionHead badge={T.why.badge} heading={T.why.heading} center light />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 16 }} className="grid-4-mobile">
            {T.why.items.map(({ icon, title, desc }, i) => (
              <Reveal key={i} delay={i * 80}>
                <div className="why-card" style={{ background: "rgba(255,255,255,0.07)", border: "1.5px solid rgba(255,255,255,0.1)", borderRadius: 20, padding: "28px 22px", transition: "all 0.22s" }}>
                  <div style={{ width: 52, height: 52, background: "rgba(255,255,255,0.12)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 20 }}>
                    <span className="material-symbols-outlined" style={{ color: "#f59e0b", fontSize: 24 }}>{icon}</span>
                  </div>
                  <h4 style={{ fontSize: 16, fontWeight: 700, color: "#fff", marginBottom: 10, letterSpacing: "-0.01em" }}>{title}</h4>
                  <p style={{ fontSize: 13, color: "rgba(255,255,255,0.65)", lineHeight: 1.65 }}>{desc}</p>
                </div>
              </Reveal>
            ))}
          </div>

          {/* CTA band */}
          <Reveal delay={200}>
            <div style={{ marginTop: 56, display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
              <button style={{ background: "#fff", color: "#0035A1", border: "none", borderRadius: 12, padding: "15px 32px", fontSize: 15, fontWeight: 800, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8 }} className="cta-primary">
                Demander un devis <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
              </button>
              <button style={{ background: "rgba(255,255,255,0.1)", color: "#fff", border: "1.5px solid rgba(255,255,255,0.25)", borderRadius: 12, padding: "15px 28px", fontSize: 15, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", display: "flex", alignItems: "center", gap: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 18 }}>phone_in_talk</span>
                {T.contact.phone}
              </button>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ CONTACT ═════════════════════════════════════════════════════════ */}
      <section id="contact" style={{ padding: "clamp(80px,8vw,120px) clamp(20px,5vw,80px)" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1.2fr", gap: "clamp(40px,6vw,80px)", alignItems: "start" }} className="grid-2-mobile">

          {/* Left info */}
          <div>
            <SectionHead badge={T.contact.badge} heading={T.contact.heading} sub={T.contact.sub} />

            {/* Phone */}
            <Reveal delay={160}>
              <div style={{ marginTop: 40, display: "flex", alignItems: "center", gap: 16, background: "#f8fafc", border: "1.5px solid #f1f5f9", borderRadius: 16, padding: "20px 24px" }}>
                <div style={{ width: 52, height: 52, background: "linear-gradient(135deg,#0035A1,#1a56d6)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ color: "#fff", fontSize: 24 }}>call</span>
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 600, color: "#94a3b8", letterSpacing: "0.08em", textTransform: "uppercase", marginBottom: 4 }}>{T.contact.phone_heading ?? "Ligne directe"}</div>
                  <div style={{ fontSize: 22, fontWeight: 800, color: "#0035A1", letterSpacing: "-0.02em" }}>{T.contact.phone}</div>
                  <div style={{ fontSize: 12, color: "#94a3b8", marginTop: 2 }}>{T.contact.hours}</div>
                </div>
              </div>
            </Reveal>

            {/* Offices */}
            <Reveal delay={220}>
              <div style={{ marginTop: 24, display: "flex", flexDirection: "column", gap: 16 }}>
                {T.contact.offices.map(({ city, addr }) => (
                  <div key={city} style={{ display: "flex", gap: 14, alignItems: "flex-start" }}>
                    <div style={{ width: 40, height: 40, background: "rgba(245,158,11,0.1)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <span className="material-symbols-outlined" style={{ color: "#f59e0b", fontSize: 20 }}>location_on</span>
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: "#0d121b", marginBottom: 2 }}>{city}</div>
                      <div style={{ fontSize: 13, color: "#64748b" }}>{addr}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* Trust badges */}
            <Reveal delay={280}>
              <div style={{ marginTop: 40, display: "flex", gap: 12, flexWrap: "wrap" }}>
                {["ISO 9001:2015", "FIATA Member", "Certifié ATP"].map(b => (
                  <div key={b} style={{ display: "flex", alignItems: "center", gap: 6, background: "#f8fafc", border: "1.5px solid #e2e8f0", borderRadius: 8, padding: "6px 12px" }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 14, color: "#0035A1" }}>verified</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#374151" }}>{b}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>

          {/* Form */}
          <Reveal direction="right" delay={100}>
            <div style={{ background: "#fff", border: "1.5px solid #f1f5f9", borderRadius: 24, padding: "clamp(24px,4vw,40px)", boxShadow: "0 16px 60px rgba(0,0,0,0.08)" }}>
              <h3 style={{ fontSize: 20, fontWeight: 800, marginBottom: 6, letterSpacing: "-0.02em" }}>Votre demande de devis</h3>
              <p style={{ fontSize: 13, color: "#64748b", marginBottom: 28 }}>Réponse garantie sous 24h ouvrées.</p>
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ══ FOOTER ══════════════════════════════════════════════════════════ */}
      <footer style={{ background: "#0d121b", color: "#fff", padding: "48px clamp(20px,5vw,80px) 32px" }}>
        <div style={{ maxWidth: 1320, margin: "0 auto" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", paddingBottom: 32, borderBottom: "1px solid rgba(255,255,255,0.08)", flexWrap: "wrap", gap: 24 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
              <div style={{ width: 36, height: 36, background: "linear-gradient(135deg,#0035A1,#1a56d6)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <span style={{ color: "#fff", fontSize: 12, fontWeight: 800 }}>TNI</span>
              </div>
              <span style={{ fontSize: 15, fontWeight: 700 }}>Transport & Négoce International</span>
            </div>
            <div style={{ display: "flex", gap: 28 }}>
              {T.nav.links.map(l => <a key={l} href={`#${l.toLowerCase()}`} style={{ fontSize: 13, color: "rgba(255,255,255,0.5)", textDecoration: "none", fontWeight: 500, transition: "color 0.15s" }}>{l}</a>)}
            </div>
          </div>
          <div style={{ marginTop: 24, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
            <span style={{ fontSize: 12, color: "rgba(255,255,255,0.3)" }}>© 2025 TNI · Tous droits réservés</span>
            <div style={{ display: "flex", gap: 16 }}>
              {["Casablanca", "Tanger Med", "Paris"].map((c, i) => (
                <span key={c} style={{ fontSize: 11, color: "rgba(255,255,255,0.25)", display: "flex", alignItems: "center", gap: 4 }}>
                  {i > 0 && <span style={{ width: 3, height: 3, borderRadius: "50%", background: "rgba(255,255,255,0.15)" }} />}
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}