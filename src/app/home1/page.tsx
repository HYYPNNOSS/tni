"use client";
import { useState, useEffect, useRef } from "react";

const T = {
  hero: { badge: "Transport & Négoce International", title: "Move cargo.\nMove markets.", highlight: "Experts en transit international", subtitle: "depuis le Maroc vers l'Europe, l'Afrique et au-delà.", cta_primary: "Demander un devis", cta_secondary: "Appelez-nous" },
  atouts: { heading: "Pourquoi TNI", sub: "Quatre piliers qui définissent notre excellence.", items: [ { title: "Livraison rapide", desc: "Des circuits optimisés pour des délais de livraison compétitifs sur tous vos corridors." }, { title: "Transport frigorifique", desc: "Camions isothermes et réfrigérés pour vos marchandises sensibles à la température." }, { title: "Réseau international", desc: "Présence dans 30+ pays avec des partenaires certifiés et des infrastructures dédiées." }, { title: "Documentation", desc: "Gestion complète de vos documents douaniers, certificats d'origine et formalités administratives." } ] },
  services: { heading: "Nos services", learn_more: "Découvrir", items: [ { title: "Transport routier", desc: "Solutions de fret complet et groupage pour vos expéditions terrestres en Europe et en Afrique." }, { title: "Transport frigorifique", desc: "Chaîne du froid maîtrisée de bout en bout pour vos denrées alimentaires et produits pharmaceutiques." }, { title: "Négoce international", desc: "Sourcing, achat et revente de marchandises avec une expertise marché unique." } ] },
  about: { badge: "Notre histoire", heading_plain: "Fondés sur la ", heading_accent: "confiance.", body: "Depuis plus de 15 ans, TNI connecte le Maroc au monde. Notre expertise en transit international, combinée à un réseau de partenaires de confiance, garantit que vos marchandises arrivent à destination en temps et en heure.", stat1_value: "15+", stat1_label: "Années d'expérience", stat2_value: "98%", stat2_label: "Satisfaction client", quote1: "TNI a transformé notre chaîne logistique.", quote1_author: "Directeur, AgriMaroc", quote2: "Fiabilité et transparence à chaque étape.", quote2_author: "CEO, MedExport" },
  process: { heading: "Comment ça marche", steps: [ { title: "Demande", sub: "Soumettez votre besoin en ligne ou par téléphone" }, { title: "Devis", sub: "Recevez une offre personnalisée sous 24h" }, { title: "Confirmation", sub: "Validez et planifiez votre expédition" }, { title: "Suivi", sub: "Tracking en temps réel de votre cargaison" }, { title: "Livraison", sub: "Réception et confirmation de livraison" } ] },
  why: { heading: "L'avantage TNI", tni_label: "TNI", competitor_label: "Concurrents", items: [ { title: "Garantie de conformité", desc: "Certifiés ISO et conformes aux réglementations douanières internationales les plus strictes." }, { title: "Réactivité 24/7", desc: "Une équipe dédiée disponible à toute heure pour répondre à vos urgences logistiques." }, { title: "Tarifs transparents", desc: "Pas de frais cachés. Des prix clairs, compétitifs et adaptés à votre volume." } ], checklist: ["Tracking temps réel", "Support dédié 24/7", "Zéro frais cachés", "Réseau certifié ISO", "Couverture assurance complète"] },
  contact: { phone_heading: "Appelez directement", phone_number: "+212 522 XXX XXX", phone_hours: "Lun–Sam, 8h–20h", offices_heading: "Nos bureaux", offices: [ { city: "Casablanca (Siège)", addr: "Zone Industrielle, Lot 42, Casablanca 20600" }, { city: "Tanger Med", addr: "Port de Tanger Med, Terminal Frêt, Bâtiment C" } ] },
  form: { heading: "Demandez un devis", sub: "Réponse garantie sous 24 heures ouvrées.", steps: ["Identité", "Transport", "Résumé"], optional: "optionnel", consent: "J'accepte que TNI utilise mes données pour traiter ma demande et me recontacter.", btn_back: "Retour", btn_continue: "Continuer", btn_send: "Envoyer", new_request: "Nouvelle demande", success_title: "Demande envoyée !", success_body: "Merci {{name}}, nous vous répondrons à {{email}} sous 24h.", fields: { nom: "Nom complet", entreprise: "Entreprise", email: "Email", telephone: "Téléphone", depart: "Ville de départ", arrivee: "Ville d'arrivée", marchandise: "Type de marchandise", sens: "Sens du transport", frequence: "Fréquence", volume: "Volume / Poids", message: "Message" }, placeholders: { nom: "Jean Dupont", entreprise: "Votre société", email: "jean@entreprise.ma", telephone: "+212 6XX XXX XXX", depart: "Casablanca", arrivee: "Paris", volume: "ex: 10 tonnes", message: "Précisez vos besoins..." }, marchandise_options: ["Alimentaire", "Pharmaceutique", "Industriel", "Textile", "Autre"], sens_options: ["Maroc → Europe", "Europe → Maroc", "Afrique subsaharienne", "Multilatéral"], frequence_options: ["Ponctuel", "Hebdomadaire", "Mensuel", "Contrat annuel"], summary_labels: { nom: "Nom", entreprise: "Société", email: "Email", telephone: "Tél.", sens: "Sens", trajet: "Trajet", marchandise: "Cargo", frequence: "Fréq.", volume: "Volume" } },
};

const SERVICE_IMGS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBiZ-iG5AfqJV04aJZ0gsEK64krkcjHBLqN9fyLYk9fznp6k_g7lVgI1XrtCEXTOnX4YpQWZFol-vBSuy5tPsT_ORiSOfdRGUEZsHHmlXYJU5uFiWa3kQzQJfrf9ccM-4H88UXL4HEhSVdTB8MfTyTazvV162ryZ28GOHNxK3I4kt_ynp8l21JMhn0JG2bTphYYZNEkWkZIKHCQ1ozDDXLIXHBCshIWRNE_fI9BoSIi7xMMxDBFEI5xUZdk6EiJCpARa6Mo4Fo1lTs',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCxvucGHyUiv8DG-QG-4zSYDmbcv_VJxa9zgHbmaTsYAz51FiYnsr-r04OurWUcT7YhEJc9pilsAT8ig4r3CL__N3zwyvD3p5QrO_v5t-zoZBU7VMC1vpPUtZ908PUikfOpse07O0JKtrU5uMJ_7m14sn2aBVONQhEK4VCHMEqnvwEEGH-gsmZ2QbeqixBVlVJgEZefDZyQ5Knc3HyYM90RdpEx22u_okApyTPvZN1VJ5pScFszmkNZvF54w4qOG17Fi2pV8M0LW7g',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuADauQP3u7HkWFHHOVPRVwf7rqM78SgVd26MJCSEk_3rQEAiRioojUc04FqGQmdHSvTObOiXNAFq5QZhQZoB0NUCiYOJecIBRpm6KkH5t5jdbH4qHtqjlyKlPUNVE6fH7Dft0yx9dFPIlmeHQodD_A8waU2vAK4p5gbn6y8uYcjHcJd_Oze6D0KEmjGSfrbwlhDbxrp6w3WfBHhomGyAwa8p_p4tD77OrRLVM25wpM7taIy5NUEcZNfT026eQBvd6kH9PTW6jwmyJo',
];

const ATOUT_ICONS = ['local_shipping', 'ac_unit', 'public', 'description'];
const WHY_ICONS = ['verified_user', 'speed', 'payments'];

// ─── Gold divider ────────────────────────────────────────────────────────────
const GoldRule = ({ width = 48 }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
    <div style={{ width, height: 1, background: 'linear-gradient(90deg, #0035A1, rgba(0,53,161,0.2))' }} />
    <div style={{ width: 4, height: 4, background: '#0035A1', transform: 'rotate(45deg)' }} />
  </div>
);

// ─── Eyebrow label ───────────────────────────────────────────────────────────
const Eyebrow = ({ children, light = false }) => (
  <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: '#0035A1', marginBottom: 0 }}>{children}</p>
);

// ─── Form ────────────────────────────────────────────────────────────────────
function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ nom: '', entreprise: '', email: '', telephone: '', villeDepart: '', villeArrivee: '', typeMarchandise: '', volume: '', sens: '', frequence: '', message: '', consent: false });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const valid = form.nom && form.email;

  const iCls = {
    width: '100%', padding: '12px 0', background: 'transparent',
    border: 'none', borderBottom: '1px solid rgba(13,18,27,0.15)',
    color: '#0d121b', fontSize: 14, outline: 'none', fontFamily: 'inherit',
    transition: 'border-color 0.2s',
  };
  const lCls = { fontSize: 10, fontWeight: 600, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(0,53,161,0.7)', display: 'block', marginTop: 24, marginBottom: 0 };

  const chip = (active) => ({
    padding: '7px 14px', fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase',
    cursor: 'pointer', border: active ? '1px solid #0035A1' : '1px solid rgba(255,255,255,0.12)',
    background: active ? 'rgba(0,53,161,0.18)' : 'transparent',
    color: active ? '#0035A1' : 'rgba(13,18,27,0.5)',
    transition: 'all 0.15s',
  });

  const resetForm = () => { setSent(false); setStep(0); setForm({ nom:'',entreprise:'',email:'',telephone:'',villeDepart:'',villeArrivee:'',typeMarchandise:'',volume:'',sens:'',frequence:'',message:'',consent:false }); };
  const labels = T.form.summary_labels;
  const summaryRows = [
    { key: 'nom', val: form.nom }, form.entreprise && { key: 'entreprise', val: form.entreprise },
    { key: 'email', val: form.email }, form.telephone && { key: 'telephone', val: form.telephone },
    form.sens && { key: 'sens', val: form.sens },
    (form.villeDepart || form.villeArrivee) && { key: 'trajet', val: `${form.villeDepart || '?'} → ${form.villeArrivee || '?'}` },
    form.typeMarchandise && { key: 'marchandise', val: form.typeMarchandise },
    form.frequence && { key: 'frequence', val: form.frequence },
    form.volume && { key: 'volume', val: form.volume },
  ].filter(Boolean);

  return (
    <div>
      {/* Step bar */}
      {!sent && (
        <div style={{ display: 'flex', gap: 4, marginBottom: 36 }}>
          {T.form.steps.map((label, i) => (
            <div key={i} style={{ flex: 1 }}>
              <div style={{ height: 2, marginBottom: 8, background: i <= step ? 'linear-gradient(90deg,#0035A1,rgba(0,53,161,0.15))' : 'rgba(13,18,27,0.08)', transition: 'background 0.3s' }} />
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', color: i <= step ? '#0035A1' : 'rgba(13,18,27,0.2)' }}>{`0${i+1} ${label}`}</span>
            </div>
          ))}
        </div>
      )}

      {sent ? (
        <div style={{ padding: '32px 0' }}>
          <div style={{ width: 52, height: 52, border: '1px solid #0035A1', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <span className="material-symbols-outlined" style={{ color: '#0035A1', fontSize: 24 }}>check</span>
          </div>
          <h3 style={{ fontSize: 28, fontWeight: 700, fontFamily: "'Cormorant Garamond', serif", color: '#0d121b', marginBottom: 12 }}>{T.form.success_title}</h3>
          <p style={{ color: 'rgba(13,18,27,0.6)', fontSize: 13, lineHeight: 1.7, marginBottom: 32 }}
            dangerouslySetInnerHTML={{ __html: T.form.success_body.replace("{{name}}", `<strong style="color:#ffffff">${form.nom}</strong>`).replace("{{email}}", `<strong style="color:#ffffff">${form.email}</strong>`) }} />
          <button onClick={resetForm} style={{ background: 'transparent', border: '1px solid #0035A1', color: '#0035A1', padding: '10px 28px', fontSize: 10, fontWeight: 700, letterSpacing: '0.15em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'inherit' }}>
            {T.form.new_request}
          </button>
        </div>
      ) : step === 0 ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 24 }}>
          <div style={{ gridColumn: '1', }}><label style={lCls}>{T.form.fields.nom} *</label><input style={iCls} type="text" placeholder={T.form.placeholders.nom} value={form.nom} onChange={e=>set('nom',e.target.value)} /></div>
          <div><label style={lCls}>{T.form.fields.entreprise}</label><input style={iCls} type="text" placeholder={T.form.placeholders.entreprise} value={form.entreprise} onChange={e=>set('entreprise',e.target.value)} /></div>
          <div style={{ gridColumn: '1 / -1' }}><label style={lCls}>{T.form.fields.email} *</label><input style={iCls} type="email" placeholder={T.form.placeholders.email} value={form.email} onChange={e=>set('email',e.target.value)} /></div>
          <div style={{ gridColumn: '1 / -1' }}><label style={lCls}>{T.form.fields.telephone}</label><input style={iCls} type="tel" placeholder={T.form.placeholders.telephone} value={form.telephone} onChange={e=>set('telephone',e.target.value)} /></div>
        </div>
      ) : step === 1 ? (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', columnGap: 24 }}>
          <div><label style={lCls}>{T.form.fields.depart}</label><input style={iCls} type="text" placeholder={T.form.placeholders.depart} value={form.villeDepart} onChange={e=>set('villeDepart',e.target.value)} /></div>
          <div><label style={lCls}>{T.form.fields.arrivee}</label><input style={iCls} type="text" placeholder={T.form.placeholders.arrivee} value={form.villeArrivee} onChange={e=>set('villeArrivee',e.target.value)} /></div>
          <div style={{ gridColumn: '1 / -1', marginTop: 20 }}>
            <label style={lCls}>{T.form.fields.marchandise}</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
              {T.form.marchandise_options.map(o => <div key={o} style={chip(form.typeMarchandise===o)} onClick={()=>set('typeMarchandise',o)}>{o}</div>)}
            </div>
          </div>
          <div style={{ gridColumn: '1 / -1', marginTop: 12 }}>
            <label style={lCls}>{T.form.fields.sens}</label>
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 12 }}>
              {T.form.sens_options.map(o => <div key={o} style={chip(form.sens===o)} onClick={()=>set('sens',o)}>{o}</div>)}
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={lCls}>{T.form.fields.frequence}</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              {T.form.frequence_options.map(o => <div key={o} style={chip(form.frequence===o)} onClick={()=>set('frequence',o)}>{o}</div>)}
            </div>
          </div>
          <div style={{ marginTop: 12 }}>
            <label style={lCls}>{T.form.fields.volume}</label>
            <input style={iCls} type="text" placeholder={T.form.placeholders.volume} value={form.volume} onChange={e=>set('volume',e.target.value)} />
            <label style={{...lCls, marginTop: 24}}>{T.form.fields.message}</label>
            <textarea style={{...iCls, resize:'vertical', minHeight:60}} rows={2} placeholder={T.form.placeholders.message} value={form.message} onChange={e=>set('message',e.target.value)} />
          </div>
        </div>
      ) : (
        <div>
          <div style={{ border: '1px solid rgba(0,53,161,0.25)', padding: '24px', marginBottom: 24 }}>
            {summaryRows.map(({ key, val }) => (
              <div key={key} style={{ display: 'flex', gap: 16, marginBottom: 14, fontSize: 13 }}>
                <span style={{ color: 'rgba(201,168,76,0.6)', width: 80, flexShrink: 0, fontSize: 10, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', paddingTop: 2 }}>{labels[key]}</span>
                <span style={{ fontWeight: 500, color: '#0d121b' }}>{val}</span>
              </div>
            ))}
          </div>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 12, color: 'rgba(13,18,27,0.5)', lineHeight: 1.6 }}>
            <input type="checkbox" checked={form.consent} onChange={e=>set('consent',e.target.checked)} style={{ marginTop: 3, accentColor: '#0035A1' }} />
            {T.form.consent}
          </label>
        </div>
      )}

      {!sent && (
        <div style={{ display: 'flex', justifyContent: step===0 ? 'flex-end' : 'space-between', marginTop: 32, paddingTop: 24, borderTop: '1px solid rgba(255,255,255,0.08)' }}>
          {step > 0 && (
            <button onClick={()=>setStep(s=>s-1)} style={{ background:'transparent', color:'rgba(13,18,27,0.5)', border:'1px solid rgba(13,18,27,0.15)', padding:'10px 20px', fontSize:10, fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', cursor:'pointer', fontFamily:'inherit' }}>
              ← {T.form.btn_back}
            </button>
          )}
          {step < 2 && (
            <button onClick={()=>setStep(s=>s+1)} disabled={step===0 && !valid}
              style={{ background: step===0 && !valid ? 'rgba(0,53,161,0.25)' : '#0035A1', color: step===0&&!valid ? 'rgba(0,53,161,0.3)' : '#ffffff', border:'none', padding:'10px 28px', fontSize:10, fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase', cursor: step===0&&!valid?'not-allowed':'pointer', fontFamily:'inherit' }}>
              {T.form.btn_continue} →
            </button>
          )}
          {step === 2 && (
            <button onClick={()=>form.consent && setSent(true)} disabled={!form.consent}
              style={{ background: !form.consent?'rgba(0,53,161,0.25)':'#0035A1', color:!form.consent?'rgba(0,53,161,0.3)':'#ffffff', border:'none', padding:'10px 28px', fontSize:10, fontWeight:800, letterSpacing:'0.14em', textTransform:'uppercase', cursor:!form.consent?'not-allowed':'pointer', fontFamily:'inherit' }}>
              {T.form.btn_send}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// MAIN
// ═══════════════════════════════════════════════════════════════════════════
export default function TNILuxury() {
  const [scrolled, setScrolled] = useState(false);
  const [activeService, setActiveService] = useState(0);
  const [hoveredAtout, setHoveredAtout] = useState(null);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const C = { deep: '#f5f6fa', dark: '#eef0f7', navy: '#e8eaf4', mid: '#dde0f0', gold: '#0035A1', goldLight: '#f59e0b', cream: '#0d121b', muted: 'rgba(13,18,27,0.5)' };

  return (
    <div style={{ minHeight: '100vh', background: C.deep, color: C.cream }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500&family=Outfit:wght@300;400;500;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: 'Outfit', sans-serif; }
        .material-symbols-outlined { font-family:'Material Symbols Outlined'; font-variation-settings:'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24; font-style:normal; display:inline-block; line-height:1; vertical-align:middle; }
        ::selection { background: #0035A1; color: #ffffff; }
        html { scroll-behavior: smooth; }

        .serif { font-family: 'Cormorant Garamond', serif; }
        .sans { font-family: 'Outfit', sans-serif; }

        .nav-item { font-size: 11px; font-weight: 500; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(0, 0, 0, 0.55); text-decoration: none; transition: color 0.2s; cursor: pointer; }
        .nav-item:hover { color: #0035A1; }

        .glow-btn { position: relative; overflow: hidden; transition: all 0.3s; }
        .glow-btn::before { content:''; position:absolute; inset:0; background:linear-gradient(135deg,#0035A1,#1a56d6); opacity:0; transition:opacity 0.3s; z-index:0; }
        .glow-btn:hover::before { opacity:1; }
        .glow-btn > * { position: relative; z-index: 1; }

        .service-tab { transition: all 0.25s; cursor: pointer; }
        .service-tab:hover { background: rgba(201,168,76,0.05) !important; }

        .atout-row { transition: all 0.2s; cursor: default; }
        .atout-row:hover { background: rgba(0,53,161,0.06) !important; }

        .process-step { transition: transform 0.2s; }
        .process-step:hover { transform: translateY(-4px); }

        @keyframes heroReveal {
          from { opacity:0; transform:translateY(32px); }
          to { opacity:1; transform:translateY(0); }
        }
        .h1 { animation: heroReveal 1s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
        .h2 { animation: heroReveal 1s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
        .h3 { animation: heroReveal 1s cubic-bezier(0.16,1,0.3,1) 0.6s both; }
        .h4 { animation: heroReveal 1s cubic-bezier(0.16,1,0.3,1) 0.8s both; }

        @keyframes lineGrow { from { width:0; } to { width:100%; } }
        .gold-line { animation: lineGrow 1.2s cubic-bezier(0.16,1,0.3,1) 0.3s both; }

        input::placeholder, textarea::placeholder { color: rgba(255,255,255,0.2); }
        input:focus, textarea:focus { border-bottom-color: rgba(201,168,76,0.6) !important; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: #f5f6fa; }
        ::-webkit-scrollbar-thumb { background: rgba(0,53,161,0.4); }

        @media (max-width: 768px) {
          .hero-grid { grid-template-columns: 1fr !important; }
          .service-layout { grid-template-columns: 1fr !important; }
          .atouts-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr !important; }
          .process-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .hide-mobile { display: none !important; }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? `rgba(245,246,250,0.97)` : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,53,161,0.18)' : '1px solid transparent',
        transition: 'all 0.4s',
        padding: '0 clamp(24px,5vw,80px)',
        height: 68,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ position: 'relative' }}>
            <div style={{ width: 36, height: 36, border: '1px solid #0035A1', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(45deg)' }}>
              <span style={{ transform: 'rotate(-45deg)', fontSize: 9, fontWeight: 800, letterSpacing: '0.05em', color: C.gold, fontFamily: 'Outfit,sans-serif' }}>TNI</span>
            </div>
          </div>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, letterSpacing: '0.04em', color: C.cream, lineHeight: 1 }}>Transport & Négoce</div>
            <div style={{ fontSize: 9, fontWeight: 400, letterSpacing: '0.18em', textTransform: 'uppercase', color: C.gold, marginTop: 2 }}>International</div>
          </div>
        </div>

        {/* Links */}
        <div style={{ display: 'flex', gap: 40, alignItems: 'center' }}>
          {['Services', 'À propos', 'Process', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase()}`} className="nav-item hide-mobile">{item}</a>
          ))}
          <button style={{ background: 'transparent', border: '1px solid rgba(0,53,161,0.4)', color: C.gold, padding: '8px 22px', fontSize: 10, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Outfit,sans-serif', transition: 'all 0.2s' }}
            onMouseEnter={e => { e.target.style.background='rgba(0,53,161,0.08)'; }}
            onMouseLeave={e => { e.target.style.background='transparent'; }}>
            Devis
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* BG image with deep overlay */}
        <div style={{
          position: 'absolute', inset: 0,
          backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCNbXOD83dUIP-m2nqwX_aVwx3gJi2icZf0JKx2aZTo6iTelKz514AIMvpQrhG_Sj8fPW8Fhcwwo9v_pJw-EJD17xaxqzn8UzX-0e8BqkBI3K8e5YCiHypYsUpz2_UtIG13yJSIH614F8Q1pEG79OX3S7-58D_2xk1lUFgUS7CFujRdnod8NnS1JHMHDYiKWaceUYmWm7QhJS9dtc91If9c34cUW5wC8eAe7IA7Mf8nS-xIVIUZyi393OkDmDRt1CSZ7x_7SuqkVRY")`,
          backgroundSize: 'cover', backgroundPosition: 'center',
          filter: 'grayscale(40%)',
        }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(105deg, rgba(245,246,250,0.97) 45%, rgba(13,15,26,0.65) 100%)' }} />
        {/* Subtle grid texture */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'linear-gradient(rgba(0,53,161,0.04) 1px,transparent 1px),linear-gradient(90deg,rgba(0,53,161,0.04) 1px,transparent 1px)', backgroundSize: '60px 60px' }} />

        <div style={{ position: 'relative', zIndex: 1, padding: 'clamp(40px,5vw,80px)', maxWidth: 900, paddingTop: 120 }}>
          {/* Eyebrow */}
          <div className="h1" style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 28 }}>
            <div className="gold-line" style={{ height: 1, background: 'linear-gradient(90deg,#0035A1,transparent)', width: 48 }} />
            <Eyebrow light>{T.hero.badge}</Eyebrow>
          </div>

          {/* Big serif headline */}
          <h1 className="h2 serif" style={{ fontSize: 'clamp(64px,9vw,140px)', fontWeight: 300, lineHeight: 0.95, letterSpacing: '-0.02em', color: C.cream, marginBottom: 32, whiteSpace: 'pre-line' }}>
            {T.hero.title}
          </h1>

          {/* Subtitle */}
          <p className="h3" style={{ fontSize: 'clamp(15px,1.6vw,19px)', color: C.muted, lineHeight: 1.7, maxWidth: 520, marginBottom: 52, fontWeight: 300 }}>
            <em style={{ fontFamily: 'Cormorant Garamond,serif', color: C.gold, fontStyle: 'italic', fontSize: '1.1em' }}>{T.hero.highlight}</em>
            {' '}{T.hero.subtitle}
          </p>

          {/* CTAs */}
          <div className="h4" style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
            <button style={{ background: '#0035A1', color: '#ffffff', border: 'none', padding: '14px 36px', fontSize: 11, fontWeight: 700, letterSpacing: '0.14em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Outfit,sans-serif' }}>
              {T.hero.cta_primary}
            </button>
            <button style={{ background: 'transparent', color: C.cream, border: '1px solid rgba(13,18,27,0.2)', padding: '14px 32px', fontSize: 11, fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'Outfit,sans-serif', display: 'flex', alignItems: 'center', gap: 10 }}>
              <span className="material-symbols-outlined" style={{ fontSize: 16 }}>phone_in_talk</span>
              {T.hero.cta_secondary}
            </button>
          </div>

          {/* Stats bar */}
          <div style={{ display: 'flex', gap: 0, marginTop: 80 }}>
            {[
              { val: '15+', label: T.about.stat1_label },
              { val: '98%', label: T.about.stat2_label },
              { val: '30+', label: 'Pays desservis' },
            ].map(({ val, label }, i) => (
              <div key={i} style={{ paddingRight: 40, marginRight: 40, borderRight: i < 2 ? '1px solid rgba(0,53,161,0.25)' : 'none' }}>
                <div className="serif" style={{ fontSize: 'clamp(32px,4vw,52px)', fontWeight: 300, color: i===1?'#f59e0b':C.gold, lineHeight: 1, letterSpacing: '-0.02em' }}>{val}</div>
                <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.14em', textTransform: 'uppercase', color: C.muted, marginTop: 6 }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right decoration */}
        <div className="hide-mobile" style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: '35%', background: 'linear-gradient(180deg, rgba(0,53,161,0.04) 0%, transparent 100%)', borderLeft: '1px solid rgba(0,53,161,0.08)' }}>
          <div style={{ position: 'absolute', top: '30%', right: 60, textAlign: 'right' }}>
            <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(0,53,161,0.5)', writingMode: 'vertical-rl' }}>Casablanca · Tanger · Europe</div>
          </div>
        </div>
      </section>

      {/* ── ATOUTS ── */}
      <section style={{ padding: 'clamp(80px,8vw,140px) clamp(24px,5vw,80px)', background: C.dark }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <GoldRule />
              <Eyebrow light>Nos avantages</Eyebrow>
              <h2 className="serif" style={{ fontSize: 'clamp(40px,5vw,72px)', fontWeight: 300, letterSpacing: '-0.02em', color: C.cream, marginTop: 8, lineHeight: 1 }}>{T.atouts.heading}</h2>
            </div>
            <p style={{ fontSize: 14, color: C.muted, maxWidth: 320, lineHeight: 1.7, fontWeight: 300 }}>{T.atouts.sub}</p>
          </div>

          <div className="atouts-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 0, border: '1px solid rgba(0,53,161,0.12)', borderRight: 'none' }}>
            {T.atouts.items.map(({ title, desc }, i) => (
              <div key={i} className="atout-row"
                onMouseEnter={() => setHoveredAtout(i)}
                onMouseLeave={() => setHoveredAtout(null)}
                style={{ padding: '44px 36px', borderRight: '1px solid rgba(0,53,161,0.12)', borderBottom: 'none', background: hoveredAtout === i ? 'rgba(0,53,161,0.04)' : 'transparent', transition: 'background 0.2s', position: 'relative', overflow: 'hidden' }}>
                {/* Large index */}
                <div className="serif" style={{ fontSize: 80, fontWeight: 300, color: 'rgba(0,53,161,0.08)', position: 'absolute', top: 8, right: 20, lineHeight: 1, userSelect: 'none' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ width: 40, height: 40, border: '1px solid rgba(0,53,161,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 28 }}>
                  <span className="material-symbols-outlined" style={{ color: C.gold, fontSize: 18 }}>{ATOUT_ICONS[i]}</span>
                </div>
                <h3 style={{ fontSize: 16, fontWeight: 600, marginBottom: 14, color: C.cream, letterSpacing: '-0.01em' }}>{title}</h3>
                <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, fontWeight: 300 }}>{desc}</p>
                {/* Bottom accent line */}
                <div style={{ position: 'absolute', bottom: 0, left: 0, height: 2, width: hoveredAtout === i ? '100%' : '0%', background: 'linear-gradient(90deg,#0035A1,rgba(0,53,161,0.15))', transition: 'width 0.3s cubic-bezier(0.16,1,0.3,1)' }} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: 'clamp(80px,8vw,140px) clamp(24px,5vw,80px)', background: C.deep }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ marginBottom: 56 }}>
            <GoldRule />
            <Eyebrow light>Solutions</Eyebrow>
            <h2 className="serif" style={{ fontSize: 'clamp(40px,5vw,72px)', fontWeight: 300, letterSpacing: '-0.02em', color: C.cream, marginTop: 8, lineHeight: 1 }}>{T.services.heading}</h2>
          </div>

          {/* Tab-style layout */}
          <div className="service-layout" style={{ display: 'grid', gridTemplateColumns: '280px 1fr', gap: 0, border: '1px solid rgba(0,53,161,0.12)', minHeight: 480 }}>
            {/* Tab list */}
            <div style={{ borderRight: '1px solid rgba(0,53,161,0.12)' }}>
              {T.services.items.map(({ title }, i) => (
                <div key={i} className="service-tab"
                  onClick={() => setActiveService(i)}
                  style={{ padding: '28px 32px', borderBottom: '1px solid rgba(0,53,161,0.1)', background: activeService === i ? 'rgba(0,53,161,0.08)' : 'transparent', borderLeft: activeService === i ? '2px solid #0035A1' : '2px solid transparent', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: 9, fontWeight: 600, letterSpacing: '0.18em', textTransform: 'uppercase', color: activeService === i ? C.gold : 'rgba(0,53,161,0.45)', marginBottom: 8 }}>0{i+1}</div>
                  <div style={{ fontSize: 15, fontWeight: 500, color: activeService === i ? C.cream : C.muted, letterSpacing: '-0.01em' }}>{title}</div>
                </div>
              ))}
            </div>

            {/* Active content */}
            <div style={{ position: 'relative', overflow: 'hidden' }}>
              {T.services.items.map(({ title, desc }, i) => (
                <div key={i} style={{ position: 'absolute', inset: 0, opacity: activeService === i ? 1 : 0, transition: 'opacity 0.4s', pointerEvents: activeService === i ? 'all' : 'none' }}>
                  <div style={{ width: '100%', height: '60%', backgroundImage: `url("${SERVICE_IMGS[i]}")`, backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(30%)' }}>
                    <div style={{ height: '100%', background: 'linear-gradient(to bottom, transparent 40%, rgba(245,246,250,0.9) 100%)' }} />
                  </div>
                  <div style={{ padding: '32px 40px' }}>
                    <h3 className="serif" style={{ fontSize: 28, fontWeight: 400, color: C.cream, marginBottom: 14, letterSpacing: '-0.01em' }}>{title}</h3>
                    <p style={{ fontSize: 14, color: C.muted, lineHeight: 1.7, maxWidth: 480, marginBottom: 24, fontWeight: 300 }}>{desc}</p>
                    <a href="#" style={{ fontSize: 10, fontWeight: 700, color: C.gold, textDecoration: 'none', letterSpacing: '0.16em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 8 }}>
                      {T.services.learn_more}
                      <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="àpropos" style={{ padding: 'clamp(80px,8vw,140px) clamp(24px,5vw,80px)', background: C.navy }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="about-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(48px,6vw,120px)', alignItems: 'center' }}>
            <div>
              <GoldRule />
              <Eyebrow light>{T.about.badge}</Eyebrow>
              <h2 className="serif" style={{ fontSize: 'clamp(36px,4.5vw,68px)', fontWeight: 300, letterSpacing: '-0.02em', color: C.cream, marginTop: 12, marginBottom: 28, lineHeight: 1.05 }}>
                {T.about.heading_plain}<em style={{ color: C.gold, fontStyle: 'italic' }}>{T.about.heading_accent}</em>
              </h2>
              <p style={{ fontSize: 15, color: C.muted, lineHeight: 1.8, marginBottom: 48, fontWeight: 300 }}>{T.about.body}</p>

              {/* Quotes */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {[{ quote: T.about.quote1, author: T.about.quote1_author }, { quote: T.about.quote2, author: T.about.quote2_author }].map(({ quote, author }, i) => (
                  <div key={i} style={{ padding: '20px 24px', borderLeft: `1px solid ${i===0?'rgba(0,53,161,0.5)':'rgba(245,158,11,0.4)'}`, background: i===0 ? 'rgba(0,53,161,0.06)' : 'rgba(245,158,11,0.04)' }}>
                    <p className="serif" style={{ fontSize: 16, fontStyle: 'italic', color: i===0?C.cream:C.muted, marginBottom: 10, lineHeight: 1.5, fontWeight: 300 }}>"{quote}"</p>
                    <p style={{ fontSize: 10, fontWeight: 600, color: i===0 ? C.gold : '#f59e0b', letterSpacing: '0.14em', textTransform: 'uppercase' }}>— {author}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Image stack */}
            <div style={{ position: 'relative', height: 560 }}>
              <div style={{ position: 'absolute', top: 0, left: 0, right: '15%', bottom: '15%', backgroundImage: 'url("/Frame-14.png")', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(20%)' }} />
              <div style={{ position: 'absolute', bottom: 0, right: 0, left: '20%', top: '45%', backgroundImage: 'url("/Frame-15.png")', backgroundSize: 'cover', backgroundPosition: 'center', filter: 'grayscale(20%)', border: `2px solid ${C.navy}` }} />
              {/* Gold corner accent */}
              <div style={{ position: 'absolute', top: -8, left: -8, width: 48, height: 48, border: '1px solid rgba(0,53,161,0.4)', borderRight: 'none', borderBottom: 'none' }} />
              <div style={{ position: 'absolute', bottom: -8, right: -8, width: 48, height: 48, border: '1px solid rgba(0,53,161,0.4)', borderLeft: 'none', borderTop: 'none' }} />
            </div>
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ padding: 'clamp(80px,8vw,140px) clamp(24px,5vw,80px)', background: '#0035A1', position: 'relative', overflow: 'hidden' }}>
        {/* Decorative large serif number */}
        <div className="serif hide-mobile" style={{ position: 'absolute', right: -20, top: -40, fontSize: 400, fontWeight: 300, color: 'rgba(255,255,255,0.04)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>5</div>

        <div style={{ maxWidth: 1400, margin: '0 auto', position: 'relative' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 72, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 24 }}>
                <div style={{ width: 48, height: 1, background: 'rgba(255,255,255,0.4)' }} />
                <div style={{ width: 4, height: 4, background: '#ffffff', transform: 'rotate(45deg)' }} />
              </div>
              <p style={{ fontSize: 10, fontWeight: 600, letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.7)', marginBottom: 0 }}>Processus</p>
              <h2 className="serif" style={{ fontSize: 'clamp(40px,5vw,72px)', fontWeight: 300, letterSpacing: '-0.02em', color: '#ffffff', marginTop: 8, lineHeight: 1 }}>{T.process.heading}</h2>
            </div>
          </div>

          <div className="process-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(5,1fr)', gap: 2 }}>
            {T.process.steps.map(({ title, sub }, i) => (
              <div key={i} className="process-step" style={{ padding: '36px 28px', background: 'rgba(255,255,255,0.07)', position: 'relative', overflow: 'hidden' }}>
                <div className="serif" style={{ fontSize: 100, fontWeight: 300, color: i === 3 ? 'rgba(245,158,11,0.15)' : 'rgba(255,255,255,0.06)', position: 'absolute', bottom: -10, right: 8, lineHeight: 1, userSelect: 'none' }}>
                  {String(i + 1).padStart(2, '0')}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 24 }}>
                  <div style={{ width: 28, height: 28, border: `1px solid ${i===3?'#f59e0b':'rgba(255,255,255,0.3)'}`, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, background: i===3?'rgba(245,158,11,0.15)':'rgba(255,255,255,0.08)' }}>
                    <span style={{ fontSize: 11, fontWeight: 700, color: i===3?'#f59e0b':'#ffffff' }}>{i + 1}</span>
                  </div>
                  {i < 4 && <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,0.15)' }} />}
                </div>
                <h5 style={{ fontSize: 14, fontWeight: 600, color: i===3?'#f59e0b':'#ffffff', marginBottom: 10, letterSpacing: '-0.01em', position: 'relative' }}>{title}</h5>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.6)', lineHeight: 1.65, position: 'relative', fontWeight: 300 }}>{sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHY ── */}
      <section style={{ padding: 'clamp(80px,8vw,140px) clamp(24px,5vw,80px)', background: C.dark }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div className="why-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(48px,6vw,120px)', alignItems: 'start' }}>
            <div>
              <GoldRule />
              <Eyebrow light>Différenciation</Eyebrow>
              <h2 className="serif" style={{ fontSize: 'clamp(36px,4.5vw,64px)', fontWeight: 300, letterSpacing: '-0.02em', color: C.cream, marginTop: 12, marginBottom: 48, lineHeight: 1.05 }}>{T.why.heading}</h2>

              {T.why.items.map(({ title, desc }, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, paddingBottom: 32, marginBottom: 32, borderBottom: '1px solid rgba(0,53,161,0.1)' }}>
                  <div style={{ width: 36, height: 36, border: '1px solid rgba(0,53,161,0.35)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, marginTop: 2 }}>
                    <span className="material-symbols-outlined" style={{ color: C.gold, fontSize: 16 }}>{WHY_ICONS[i]}</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 600, color: C.cream, marginBottom: 8, letterSpacing: '-0.01em' }}>{title}</p>
                    <p style={{ fontSize: 13, color: C.muted, lineHeight: 1.7, fontWeight: 300 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Comparison */}
            <div style={{ border: '1px solid rgba(0,53,161,0.2)', background: 'rgba(0,53,161,0.03)' }}>
              <div style={{ padding: '24px 32px', borderBottom: '1px solid rgba(0,53,161,0.18)', display: 'flex', justifyContent: 'space-between' }}>
                <span className="serif" style={{ fontSize: 20, fontWeight: 400, color: C.gold, letterSpacing: '0.02em' }}>{T.why.tni_label}</span>
                <span style={{ fontSize: 12, color: 'rgba(13,18,27,0.15)', textDecoration: 'line-through' }}>{T.why.competitor_label}</span>
              </div>
              {T.why.checklist.map((item, i) => (
                <div key={item} style={{ padding: '18px 32px', borderBottom: i < T.why.checklist.length-1 ? '1px solid rgba(0,53,161,0.08)' : 'none', display: 'flex', alignItems: 'center', gap: 14 }}>
                  <div style={{ width: 20, height: 20, border: '1px solid rgba(0,53,161,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ fontSize: 12, color: '#f59e0b' }}>check</span>
                  </div>
                  <span style={{ fontSize: 13, fontWeight: 400, color: C.muted }}>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: 'clamp(80px,8vw,140px) clamp(24px,5vw,80px)', background: C.deep }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <GoldRule />
            <Eyebrow light>Contact</Eyebrow>
            <h2 className="serif" style={{ fontSize: 'clamp(40px,5vw,72px)', fontWeight: 300, letterSpacing: '-0.02em', color: C.cream, marginTop: 8, lineHeight: 1 }}>{T.form.heading}</h2>
          </div>

          <div className="contact-grid" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(48px,6vw,100px)' }}>
            {/* Form */}
            <div style={{ border: '1px solid rgba(0,53,161,0.15)', padding: 'clamp(28px,4vw,48px)' }}>
              <p style={{ fontSize: 13, color: C.muted, marginBottom: 32, fontWeight: 300, lineHeight: 1.7 }}>{T.form.sub}</p>
              <MultiStepForm />
            </div>

            {/* Info */}
            <div style={{ paddingTop: 8 }}>
              {/* Phone */}
              <div style={{ marginBottom: 56 }}>
                <Eyebrow light>{T.contact.phone_heading}</Eyebrow>
                <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginTop: 20 }}>
                  <div style={{ width: 52, height: 52, border: '1px solid rgba(0,53,161,0.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ color: C.gold, fontSize: 22 }}>call</span>
                  </div>
                  <div>
                    <p className="serif" style={{ fontSize: 28, fontWeight: 400, color: C.gold, letterSpacing: '-0.01em', lineHeight: 1 }}>{T.contact.phone_number}</p>
                    <p style={{ fontSize: 11, color: C.muted, marginTop: 6 }}>{T.contact.phone_hours}</p>
                  </div>
                </div>
              </div>

              {/* Offices */}
              <div style={{ borderTop: '1px solid rgba(0,53,161,0.12)', paddingTop: 40 }}>
                <Eyebrow light>{T.contact.offices_heading}</Eyebrow>
                <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 28 }}>
                  {T.contact.offices.map(({ city, addr }) => (
                    <div key={city} style={{ display: 'flex', gap: 16 }}>
                      <div style={{ width: 32, height: 32, border: '1px solid rgba(0,53,161,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <span className="material-symbols-outlined" style={{ color: '#f59e0b', fontSize: 16 }}>location_on</span>
                      </div>
                      <div>
                        <p style={{ fontSize: 14, fontWeight: 600, color: C.cream, marginBottom: 4 }}>{city}</p>
                        <p style={{ fontSize: 12, color: C.muted, lineHeight: 1.6, fontWeight: 300 }}>{addr}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '28px clamp(24px,5vw,80px)', borderTop: '1px solid rgba(0,53,161,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 16 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          <div style={{ width: 24, height: 24, border: '1px solid #0035A1', display: 'flex', alignItems: 'center', justifyContent: 'center', transform: 'rotate(45deg)' }}>
            <span style={{ transform: 'rotate(-45deg)', fontSize: 6, fontWeight: 800, color: C.gold }}>TNI</span>
          </div>
          <span style={{ fontSize: 11, color: 'rgba(13,18,27,0.25)' }}>© 2025 Transport & Négoce International</span>
        </div>
        <span style={{ fontSize: 10, color: 'rgba(0,53,161,0.45)', letterSpacing: '0.18em', textTransform: 'uppercase' }}>Casablanca · Tanger · Europe</span>
      </footer>
    </div>
  );
}