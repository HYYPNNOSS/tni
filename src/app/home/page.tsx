"use client";
import { useState, useEffect } from "react";

// ─── Inline styles instead of i18n for standalone artifact ─────────────────
const T = {
  dir: "ltr",
  hero: {
    badge: "TRANSPORT & NÉGOCE INTERNATIONAL",
    title: "Move cargo.\nMove markets.",
    highlight: "Experts en transit international",
    subtitle: "depuis le Maroc vers l'Europe, l'Afrique et au-delà.",
    cta_primary: "Demander un devis",
    cta_secondary: "Appelez-nous",
  },
  atouts: {
    heading: "Pourquoi TNI",
    sub: "Quatre piliers qui définissent notre excellence.",
    items: [
      { title: "Livraison rapide", desc: "Des circuits optimisés pour des délais de livraison compétitifs sur tous vos corridors." },
      { title: "Transport frigorifique", desc: "Camions isothermes et réfrigérés pour vos marchandises sensibles à la température." },
      { title: "Réseau international", desc: "Présence dans 30+ pays avec des partenaires certifiés et des infrastructures dédiées." },
      { title: "Documentation", desc: "Gestion complète de vos documents douaniers, certificats d'origine et formalités administratives." },
    ],
  },
  services: {
    heading: "Nos services",
    learn_more: "En savoir plus",
    items: [
      { title: "Transport routier", desc: "Solutions de fret complet et groupage pour vos expéditions terrestres en Europe et en Afrique." },
      { title: "Transport frigorifique", desc: "Chaîne du froid maîtrisée de bout en bout pour vos denrées alimentaires et produits pharmaceutiques." },
      { title: "Négoce international", desc: "Sourcing, achat et revente de marchandises avec une expertise marché unique." },
    ],
  },
  about: {
    badge: "Notre histoire",
    heading_plain: "Fondés sur la ",
    heading_accent: "confiance.",
    body: "Depuis plus de 15 ans, TNI connecte le Maroc au monde. Notre expertise en transit international, combinée à un réseau de partenaires de confiance, garantit que vos marchandises arrivent à destination en temps et en heure.",
    stat1_value: "15+", stat1_label: "Années d'expérience",
    stat2_value: "98%", stat2_label: "Taux de satisfaction client",
    quote1: "TNI a transformé notre chaîne logistique.",
    quote1_author: "Directeur, AgriMaroc",
    quote2: "Fiabilité et transparence à chaque étape.",
    quote2_author: "CEO, MedExport",
  },
  process: {
    heading: "Comment ça marche",
    steps: [
      { title: "Demande", sub: "Soumettez votre besoin en ligne ou par téléphone" },
      { title: "Devis", sub: "Recevez une offre personnalisée sous 24h" },
      { title: "Confirmation", sub: "Validez et planifiez votre expédition" },
      { title: "Suivi", sub: "Tracking en temps réel de votre cargaison" },
      { title: "Livraison", sub: "Réception et confirmation de livraison" },
    ],
  },
  why: {
    heading: "L'avantage TNI",
    tni_label: "TNI",
    competitor_label: "Concurrents",
    items: [
      { title: "Garantie de conformité", desc: "Certifiés ISO et conformes aux réglementations douanières internationales les plus strictes." },
      { title: "Réactivité 24/7", desc: "Une équipe dédiée disponible à toute heure pour répondre à vos urgences logistiques." },
      { title: "Tarifs transparents", desc: "Pas de frais cachés. Des prix clairs, compétitifs et adaptés à votre volume." },
    ],
    checklist: [
      "Tracking temps réel", "Support dédié 24/7", "Zéro frais cachés",
      "Réseau certifié ISO", "Couverture assurance complète",
    ],
  },
  contact: {
    phone_heading: "Appelez directement",
    phone_number: "+212 522 XXX XXX",
    phone_hours: "Lun–Sam, 8h–20h",
    offices_heading: "Nos bureaux",
    offices: [
      { city: "Casablanca (Siège)", addr: "Zone Industrielle, Lot 42, Casablanca 20600" },
      { city: "Tanger Med", addr: "Port de Tanger Med, Terminal Frêt, Bâtiment C" },
    ],
  },
  form: {
    heading: "Demandez un devis",
    sub: "Réponse garantie sous 24 heures ouvrées.",
    steps: ["Identité", "Transport", "Résumé"],
    step_icons: ["person", "local_shipping", "check"],
    optional: "optionnel",
    consent: "J'accepte que TNI utilise mes données pour traiter ma demande et me recontacter.",
    btn_back: "Retour",
    btn_continue: "Continuer",
    btn_send: "Envoyer",
    new_request: "Nouvelle demande",
    success_title: "Demande envoyée !",
    success_body: "Merci {{name}}, nous vous répondrons à {{email}} sous 24h.",
    fields: { nom: "Nom complet", entreprise: "Entreprise", email: "Email", telephone: "Téléphone", depart: "Ville de départ", arrivee: "Ville d'arrivée", marchandise: "Type de marchandise", sens: "Sens du transport", frequence: "Fréquence", volume: "Volume / Poids", message: "Message" },
    placeholders: { nom: "Jean Dupont", entreprise: "Votre société", email: "jean@entreprise.ma", telephone: "+212 6XX XXX XXX", depart: "Casablanca", arrivee: "Paris", volume: "ex: 10 tonnes", message: "Précisez vos besoins..." },
    marchandise_options: ["Alimentaire", "Pharmaceutique", "Industriel", "Textile", "Autre"],
    sens_options: ["Maroc → Europe", "Europe → Maroc", "Afrique subsaharienne", "Multilatéral"],
    frequence_options: ["Ponctuel", "Hebdomadaire", "Mensuel", "Contrat annuel"],
    summary_labels: { nom: "Nom", entreprise: "Société", email: "Email", telephone: "Tél.", sens: "Sens", trajet: "Trajet", marchandise: "Cargo", frequence: "Fréq.", volume: "Volume" },
  },
};

const SERVICE_IMGS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBiZ-iG5AfqJV04aJZ0gsEK64krkcjHBLqN9fyLYk9fznp6k_g7lVgI1XrtCEXTOnX4YpQWZFol-vBSuy5tPsT_ORiSOfdRGUEZsHHmlXYJU5uFiWa3kQzQJfrf9ccM-4H88UXL4HEhSVdTB8MfTyTazvV162ryZ28GOHNxK3I4kt_ynp8l21JMhn0JG2bTphYYZNEkWkZIKHCQ1ozDDXLIXHBCshIWRNE_fI9BoSIi7xMMxDBFEI5xUZdk6EiJCpARa6Mo4Fo1lTs',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCxvucGHyUiv8DG-QG-4zSYDmbcv_VJxa9zgHbmaTsYAz51FiYnsr-r04OurWUcT7YhEJc9pilsAT8ig4r3CL__N3zwyvD3p5QrO_v5t-zoZBU7VMC1vpPUtZ908PUikfOpse07O0JKtrU5uMJ_7m14sn2aBVONQhEK4VCHMEqnvwEEGH-gsmZ2QbeqixBVlVJgEZefDZyQ5Knc3HyYM90RdpEx22u_okApyTPvZN1VJ5pScFszmkNZvF54w4qOG17Fi2pV8M0LW7g',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuADauQP3u7HkWFHHOVPRVwf7rqM78SgVd26MJCSEk_3rQEAiRioojUc04FqGQmdHSvTObOiXNAFq5QZhQZoB0NUCiYOJecIBRpm6KkH5t5jdbH4qHtqjlyKlPUNVE6fH7Dft0yx9dFPIlmeHQodD_A8waU2vAK4p5gbn6y8uYcjHcJd_Oze6D0KEmjGSfrbwlhDbxrp6w3WfBHhomGyAwa8p_p4tD77OrRLVM25wpM7taIy5NUEcZNfT026eQBvd6kH9PTW6jwmyJo',
];

const ATOUT_ICONS = ['local_shipping', 'ac_unit', 'public', 'description'];

function MultiStepForm() {
  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nom: '', entreprise: '', email: '', telephone: '',
    villeDepart: '', villeArrivee: '', typeMarchandise: '',
    volume: '', sens: '', frequence: '', message: '', consent: false,
  });
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }));
  const step1Valid = form.nom && form.email;

  const inputCls = `
    w-full px-4 py-3 bg-transparent border-0 border-b border-gray-200 
    text-[14px] text-gray-900 outline-none transition-all duration-200
    focus:border-[#0035A1] placeholder-gray-300 font-[inherit]
  `;
  const labelCls = "block text-[10px] font-bold uppercase tracking-[0.12em] text-gray-400 mb-1 mt-4";

  const chipCls = (active) =>
    `px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] cursor-pointer transition-all duration-150 ` +
    (active
      ? "bg-[#0035A1] text-white"
      : "bg-transparent text-gray-400 border border-gray-200 hover:border-gray-400");

  const resetForm = () => {
    setSent(false); setStep(0);
    setForm({ nom: '', entreprise: '', email: '', telephone: '', villeDepart: '', villeArrivee: '', typeMarchandise: '', volume: '', sens: '', frequence: '', message: '', consent: false });
  };

  const summaryRows = [
    { key: 'nom', val: form.nom },
    form.entreprise && { key: 'entreprise', val: form.entreprise },
    { key: 'email', val: form.email },
    form.telephone && { key: 'telephone', val: form.telephone },
    form.sens && { key: 'sens', val: form.sens },
    (form.villeDepart || form.villeArrivee) && { key: 'trajet', val: `${form.villeDepart || '?'} → ${form.villeArrivee || '?'}` },
    form.typeMarchandise && { key: 'marchandise', val: form.typeMarchandise },
    form.frequence && { key: 'frequence', val: form.frequence },
    form.volume && { key: 'volume', val: form.volume },
  ].filter(Boolean);

  const labels = T.form.summary_labels;

  return (
    <div>
      {/* Step indicator */}
      {!sent && (
        <div style={{ display: 'flex', gap: 0, marginBottom: 40 }}>
          {T.form.steps.map((label, i) => (
            <div key={i} style={{ flex: 1, position: 'relative' }}>
              <div style={{
                height: 2,
                background: i <= step ? '#0035A1' : '#e5e7eb',
                transition: 'background 0.3s',
                marginBottom: 8,
              }} />
              <span style={{
                fontSize: 10,
                fontWeight: 700,
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: i === step ? '#0035A1' : i < step ? '#374151' : '#d1d5db',
              }}>{String(i + 1).padStart(2, '0')} {label}</span>
            </div>
          ))}
        </div>
      )}

      {sent ? (
        <div style={{ padding: '40px 0', textAlign: 'left' }}>
          <div style={{ width: 48, height: 48, background: '#f0fdf4', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 24 }}>
            <span className="material-symbols-outlined" style={{ fontSize: 24, color: '#16a34a' }}>check</span>
          </div>
          <h3 style={{ fontSize: 28, fontWeight: 900, margin: '0 0 12px' }}>{T.form.success_title}</h3>
          <p style={{ color: '#6b7280', fontSize: 14, lineHeight: 1.6, margin: '0 0 32px' }}
            dangerouslySetInnerHTML={{
              __html: T.form.success_body.replace("{{name}}", `<strong>${form.nom}</strong>`).replace("{{email}}", `<strong>${form.email}</strong>`),
            }}
          />
          <button onClick={resetForm} style={{ background: '#0035A1', color: '#fff', border: 'none', padding: '12px 28px', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
            {T.form.new_request}
          </button>
        </div>
      ) : step === 0 ? (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
            <div>
              <label className={labelCls}>{T.form.fields.nom} *</label>
              <input className={inputCls} type="text" placeholder={T.form.placeholders.nom} value={form.nom} onChange={e => set('nom', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>{T.form.fields.entreprise}</label>
              <input className={inputCls} type="text" placeholder={T.form.placeholders.entreprise} value={form.entreprise} onChange={e => set('entreprise', e.target.value)} />
            </div>
          </div>
          <label className={labelCls}>{T.form.fields.email} *</label>
          <input className={inputCls} type="email" placeholder={T.form.placeholders.email} value={form.email} onChange={e => set('email', e.target.value)} />
          <label className={labelCls}>{T.form.fields.telephone}</label>
          <input className={inputCls} type="tel" placeholder={T.form.placeholders.telephone} value={form.telephone} onChange={e => set('telephone', e.target.value)} />
        </div>
      ) : step === 1 ? (
        <div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
            <div>
              <label className={labelCls}>{T.form.fields.depart}</label>
              <input className={inputCls} type="text" placeholder={T.form.placeholders.depart} value={form.villeDepart} onChange={e => set('villeDepart', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>{T.form.fields.arrivee}</label>
              <input className={inputCls} type="text" placeholder={T.form.placeholders.arrivee} value={form.villeArrivee} onChange={e => set('villeArrivee', e.target.value)} />
            </div>
          </div>
          <label className={labelCls}>{T.form.fields.marchandise}</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            {T.form.marchandise_options.map(o => (
              <div key={o} className={chipCls(form.typeMarchandise === o)} onClick={() => set('typeMarchandise', o)}>{o}</div>
            ))}
          </div>
          <label className={labelCls}>{T.form.fields.sens}</label>
          <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 8 }}>
            {T.form.sens_options.map(o => (
              <div key={o} className={chipCls(form.sens === o)} onClick={() => set('sens', o)}>{o}</div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 24px' }}>
            <div>
              <label className={labelCls}>{T.form.fields.frequence}</label>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 8 }}>
                {T.form.frequence_options.map(o => (
                  <div key={o} className={chipCls(form.frequence === o)} onClick={() => set('frequence', o)}>{o}</div>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls}>{T.form.fields.volume}</label>
              <input className={inputCls} type="text" placeholder={T.form.placeholders.volume} value={form.volume} onChange={e => set('volume', e.target.value)} />
            </div>
          </div>
          <label className={labelCls}>{T.form.fields.message}</label>
          <textarea className={inputCls} style={{ resize: 'vertical', minHeight: 60 }} rows={2} placeholder={T.form.placeholders.message} value={form.message} onChange={e => set('message', e.target.value)} />
        </div>
      ) : (
        <div>
          <div style={{ border: '1px solid #e5e7eb', padding: '24px', marginBottom: 24 }}>
            {summaryRows.map(({ key, val }) => (
              <div key={key} style={{ display: 'flex', gap: 16, marginBottom: 12, fontSize: 13 }}>
                <span style={{ color: '#9ca3af', width: 90, flexShrink: 0, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', paddingTop: 1 }}>{labels[key]}</span>
                <span style={{ fontWeight: 600, color: '#111' }}>{val}</span>
              </div>
            ))}
          </div>
          <label style={{ display: 'flex', alignItems: 'flex-start', gap: 10, cursor: 'pointer', fontSize: 12, color: '#6b7280', lineHeight: 1.5 }}>
            <input type="checkbox" checked={form.consent} onChange={e => set('consent', e.target.checked)} style={{ marginTop: 2, accentColor: '#0035A1' }} />
            {T.form.consent}
          </label>
        </div>
      )}

      {!sent && (
        <div style={{ display: 'flex', justifyContent: step === 0 ? 'flex-end' : 'space-between', marginTop: 32, paddingTop: 24, borderTop: '1px solid #f3f4f6' }}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} style={{ background: 'transparent', color: '#6b7280', border: '1px solid #e5e7eb', padding: '10px 20px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
              ← {T.form.btn_back}
            </button>
          )}
          {step < 2 && (
            <button onClick={() => setStep(s => s + 1)} disabled={step === 0 && !step1Valid}
              style={{ background: step === 0 && !step1Valid ? '#93b4f7' : '#0035A1', color: '#fff', border: 'none', padding: '10px 28px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: step === 0 && !step1Valid ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              {T.form.btn_continue} →
            </button>
          )}
          {step === 2 && (
            <button onClick={() => form.consent && setSent(true)} disabled={!form.consent}
              style={{ background: !form.consent ? '#93b4f7' : '#0035A1', color: '#fff', border: 'none', padding: '10px 28px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: !form.consent ? 'not-allowed' : 'pointer' }}>
              {T.form.btn_send}
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function TNIHomepage() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', fn);
    return () => window.removeEventListener('scroll', fn);
  }, []);

  return (
    <div style={{ minHeight: '100vh', background: '#fff', color: '#0d121b', fontFamily: "'SF Pro Display', 'Helvetica Neue', Arial, sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;0,9..40,700;0,9..40,900;1,9..40,300&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; font-family: 'DM Sans', 'Helvetica Neue', Arial, sans-serif; }
        .material-symbols-outlined { font-family: 'Material Symbols Outlined'; font-variation-settings: 'FILL' 0,'wght' 300,'GRAD' 0,'opsz' 24; font-style: normal; display: inline-block; line-height: 1; vertical-align: middle; }
        ::selection { background: #0035A1; color: #fff; }
        html { scroll-behavior: smooth; }

        .nav-link { font-size: 12px; font-weight: 500; letter-spacing: 0.06em; text-transform: uppercase; color: #374151; text-decoration: none; transition: color 0.15s; padding: 4px 0; position: relative; }
        .nav-link::after { content: ''; position: absolute; bottom: 0; left: 0; width: 0; height: 1px; background: #0035A1; transition: width 0.2s; }
        .nav-link:hover { color: #0035A1; }
        .nav-link:hover::after { width: 100%; }

        .stat-num { font-size: clamp(48px, 7vw, 80px); font-weight: 900; line-height: 1; letter-spacing: -0.03em; }

        .service-card { transition: transform 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94); }
        .service-card:hover { transform: translateY(-4px); }

        .atout-card { transition: border-color 0.2s; }
        .atout-card:hover { border-color: #0035A1; }

        .process-num { transition: all 0.2s; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .fade-up { animation: fadeUp 0.7s ease-out forwards; }
        .fade-up-1 { animation-delay: 0.1s; opacity: 0; }
        .fade-up-2 { animation-delay: 0.25s; opacity: 0; }
        .fade-up-3 { animation-delay: 0.4s; opacity: 0; }
        .fade-up-4 { animation-delay: 0.55s; opacity: 0; }

        @keyframes slideIn {
          from { opacity: 0; transform: translateX(-16px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>

      {/* ── NAV ── */}
      <nav style={{
        position: 'sticky', top: 0, zIndex: 100,
        background: scrolled ? 'rgba(255,255,255,0.95)' : '#fff',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid #f3f4f6' : '1px solid transparent',
        transition: 'all 0.3s',
        padding: '0 clamp(24px, 5vw, 80px)',
        height: 64,
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 28, height: 28, background: '#0035A1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: 11, fontWeight: 900, letterSpacing: '-0.02em' }}>TNI</span>
          </div>
          <span style={{ fontSize: 13, fontWeight: 700, letterSpacing: '0.02em' }}>Transport & Négoce</span>
        </div>
        <div style={{ display: 'flex', gap: 32, alignItems: 'center' }}>
          {['Services', 'À propos', 'Process', 'Contact'].map(item => (
            <a key={item} href={`#${item.toLowerCase().replace(' ', '')}`} className="nav-link" style={{ display: window.innerWidth < 640 ? 'none' : undefined }}>{item}</a>
          ))}
          <button style={{ background: '#0035A1', color: '#fff', border: 'none', padding: '8px 20px', fontSize: 11, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
            Devis
          </button>
        </div>
      </nav>

      {/* ── HERO ── */}
      <section style={{ padding: 'clamp(40px, 5vw, 80px) clamp(24px, 5vw, 80px)', paddingBottom: 0 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(32px, 5vw, 80px)', alignItems: 'center', minHeight: 'calc(100vh - 200px)', maxWidth: 1400, margin: '0 auto' }}>
          {/* Left */}
          <div>
            <div className="fade-up fade-up-1" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 32 }}>
              <div style={{ width: 24, height: 1, background: '#f59e0b' }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#f59e0b' }}>{T.hero.badge}</span>
            </div>
            <h1 className="fade-up fade-up-2" style={{ fontSize: 'clamp(52px, 7vw, 96px)', fontWeight: 900, lineHeight: 1.0, letterSpacing: '-0.04em', marginBottom: 32, whiteSpace: 'pre-line' }}>
              {T.hero.title}
            </h1>
            <p className="fade-up fade-up-3" style={{ fontSize: 'clamp(15px, 1.5vw, 18px)', lineHeight: 1.6, color: '#6b7280', maxWidth: 480, marginBottom: 48 }}>
              <strong style={{ color: '#0035A1' }}>{T.hero.highlight}</strong>{' '}{T.hero.subtitle}
            </p>
            <div className="fade-up fade-up-4" style={{ display: 'flex', gap: 16 }}>
              <button style={{ background: '#0035A1', color: '#fff', border: 'none', padding: '14px 32px', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer' }}>
                {T.hero.cta_primary}
              </button>
              <button style={{ background: 'transparent', color: '#374151', border: '1px solid #e5e7eb', padding: '14px 32px', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="material-symbols-outlined" style={{ fontSize: 16 }}>phone_in_talk</span>
                {T.hero.cta_secondary}
              </button>
            </div>
          </div>
          {/* Right: hero image */}
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '100%',
              paddingBottom: '120%',
              position: 'relative',
              backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuCNbXOD83dUIP-m2nqwX_aVwx3gJi2icZf0JKx2aZTo6iTelKz514AIMvpQrhG_Sj8fPW8Fhcwwo9v_pJw-EJD17xaxqzn8UzX-0e8BqkBI3K8e5YCiHypYsUpz2_UtIG13yJSIH614F8Q1pEG79OX3S7-58D_2xk1lUFgUS7CFujRdnod8NnS1JHMHDYiKWaceUYmWm7QhJS9dtc91If9c34cUW5wC8eAe7IA7Mf8nS-xIVIUZyi393OkDmDRt1CSZ7x_7SuqkVRY")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}>
              {/* Stat overlay */}
              <div style={{ position: 'absolute', bottom: -1, left: -1, right: -1, padding: '32px 28px', background: 'rgba(255,255,255,0.96)', borderTop: '3px solid #0035A1', display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: 0 }}>
                <div style={{ paddingRight: 24, textAlign: 'center' }}>
                  <div className="stat-num" style={{ color: '#0035A1' }}>{T.about.stat1_value}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9ca3af', marginTop: 4 }}>{T.about.stat1_label}</div>
                </div>
                <div style={{ background: '#f3f4f6' }} />
                <div style={{ paddingLeft: 24, textAlign: 'center' }}>
                  <div className="stat-num" style={{ color: '#f59e0b' }}>{T.about.stat2_value}</div>
                  <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: '#9ca3af', marginTop: 4 }}>{T.about.stat2_label}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── ATOUTS ── */}
      <section style={{ padding: 'clamp(80px, 8vw, 140px) clamp(24px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 64, flexWrap: 'wrap', gap: 24 }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
                <div style={{ width: 24, height: 1, background: '#0035A1' }} />
                <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0035A1' }}>Nos avantages</span>
              </div>
              <h2 style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05 }}>{T.atouts.heading}</h2>
            </div>
            <p style={{ fontSize: 15, color: '#6b7280', maxWidth: 320, lineHeight: 1.6 }}>{T.atouts.sub}</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1, background: '#f3f4f6' }}>
            {T.atouts.items.map(({ title, desc }, i) => (
              <div key={i} className="atout-card" style={{
                background: '#fff',
                padding: 40,
                borderTop: i === 3 ? '3px solid #f59e0b' : '3px solid transparent',
                display: 'flex', flexDirection: 'column', gap: 24,
              }}>
                <div style={{
                  width: 44, height: 44,
                  background: i === 3 ? 'rgba(245,158,11,0.08)' : 'rgba(0,53,161,0.06)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <span className="material-symbols-outlined" style={{ color: i === 3 ? '#f59e0b' : '#0035A1', fontSize: 22 }}>{ATOUT_ICONS[i]}</span>
                </div>
                <div>
                  <h3 style={{ fontSize: 16, fontWeight: 700, marginBottom: 10, letterSpacing: '-0.01em' }}>{title}</h3>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.65 }}>{desc}</p>
                </div>
                <div style={{ marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #f3f4f6' }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: '#9ca3af', letterSpacing: '0.1em', textTransform: 'uppercase' }}>0{i + 1}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SERVICES ── */}
      <section id="services" style={{ padding: 'clamp(80px, 8vw, 140px) clamp(24px, 5vw, 80px)', background: '#fafafa' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ marginBottom: 64 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 16 }}>
              <div style={{ width: 24, height: 1, background: '#0035A1' }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0035A1' }}>Solutions</span>
            </div>
            <h2 style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em' }}>{T.services.heading}</h2>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 2, background: '#e5e7eb' }}>
            {T.services.items.map(({ title, desc }, i) => (
              <div key={i} className="service-card" style={{ background: '#fff', overflow: 'hidden' }}>
                <div style={{ width: '100%', paddingBottom: '62%', backgroundImage: `url("${SERVICE_IMGS[i]}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div style={{ padding: 32 }}>
                  <h4 style={{ fontSize: 20, fontWeight: 800, marginBottom: 12, letterSpacing: '-0.02em' }}>{title}</h4>
                  <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.65, marginBottom: 24 }}>{desc}</p>
                  <a href="#" style={{ fontSize: 11, fontWeight: 700, color: '#0035A1', textDecoration: 'none', letterSpacing: '0.1em', textTransform: 'uppercase', display: 'inline-flex', alignItems: 'center', gap: 6 }}>
                    {T.services.learn_more}
                    <span className="material-symbols-outlined" style={{ fontSize: 14 }}>arrow_forward</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── ABOUT ── */}
      <section id="àpropos" style={{ padding: 'clamp(80px, 8vw, 140px) clamp(24px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 5vw, 100px)', alignItems: 'center' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: '#0035A1' }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0035A1' }}>{T.about.badge}</span>
            </div>
            <h2 style={{ fontSize: 'clamp(36px, 4vw, 60px)', fontWeight: 900, letterSpacing: '-0.03em', lineHeight: 1.05, marginBottom: 28 }}>
              {T.about.heading_plain}<span style={{ color: '#0035A1' }}>{T.about.heading_accent}</span>
            </h2>
            <p style={{ fontSize: 16, color: '#6b7280', lineHeight: 1.7, marginBottom: 48 }}>{T.about.body}</p>

            {/* Testimonials */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              {[
                { quote: T.about.quote1, author: T.about.quote1_author, accent: '#0035A1' },
                { quote: T.about.quote2, author: T.about.quote2_author, accent: '#f59e0b' },
              ].map(({ quote, author, accent }, i) => (
                <div key={i} style={{ padding: '20px 24px', borderLeft: `3px solid ${accent}`, background: '#fafafa' }}>
                  <p style={{ fontSize: 13, fontStyle: 'italic', color: '#4b5563', marginBottom: 8, lineHeight: 1.6 }}>"{quote}"</p>
                  <p style={{ fontSize: 11, fontWeight: 700, color: '#374151', letterSpacing: '0.06em', textTransform: 'uppercase' }}>— {author}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Image collage */}
          <div style={{ display: 'grid', gridTemplateRows: '1fr 1fr', gap: 2, height: 580 }}>
            <div style={{ backgroundImage: 'url("/Frame-14.png")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
            <div style={{ backgroundImage: 'url("/Frame-15.png")', backgroundSize: 'cover', backgroundPosition: 'center' }} />
          </div>
        </div>
      </section>

      {/* ── PROCESS ── */}
      <section id="process" style={{ padding: 'clamp(80px, 8vw, 140px) clamp(24px, 5vw, 80px)', background: '#0035A1' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto' }}>
          <div style={{ marginBottom: 72, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <h2 style={{ fontSize: 'clamp(36px, 4vw, 56px)', fontWeight: 900, letterSpacing: '-0.03em', color: '#fff' }}>
              {T.process.heading}
            </h2>
            <div style={{ width: 64, height: 1, background: 'rgba(255,255,255,0.3)' }} />
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 0 }}>
            {T.process.steps.map(({ title, sub }, i) => {
              const isAccent = i === 3;
              const isFilled = i === 0 || i === 4;
              return (
                <div key={i} style={{ padding: '0 20px 0 0', borderRight: i < 4 ? '1px solid rgba(255,255,255,0.15)' : 'none', paddingRight: i < 4 ? 32 : 0 }}>
                  <div style={{
                    width: 56, height: 56,
                    background: isAccent ? '#f59e0b' : isFilled ? '#fff' : 'transparent',
                    border: isFilled || isAccent ? 'none' : '2px solid rgba(255,255,255,0.4)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 20, fontWeight: 900,
                    color: isAccent ? '#fff' : isFilled ? '#0035A1' : 'rgba(255,255,255,0.7)',
                    marginBottom: 24,
                    letterSpacing: '-0.02em',
                  }}>
                    {String(i + 1).padStart(2, '0')}
                  </div>
                  <h5 style={{ fontSize: 14, fontWeight: 700, color: '#fff', marginBottom: 8, letterSpacing: '-0.01em' }}>{title}</h5>
                  <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.55)', lineHeight: 1.6 }}>{sub}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── WHY CHOOSE ── */}
      <section style={{ padding: 'clamp(80px, 8vw, 140px) clamp(24px, 5vw, 80px)', background: '#fafafa' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 5vw, 100px)', alignItems: 'start' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: '#0035A1' }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0035A1' }}>Différenciation</span>
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 48, lineHeight: 1.1 }}>{T.why.heading}</h2>

            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {T.why.items.map(({ title, desc }, i) => (
                <div key={i} style={{ display: 'flex', gap: 20, padding: '28px 0', borderBottom: '1px solid #e5e7eb' }}>
                  <span className="material-symbols-outlined" style={{ color: '#f59e0b', fontSize: 20, marginTop: 2, flexShrink: 0 }}>
                    {['verified_user', 'speed', 'payments'][i]}
                  </span>
                  <div>
                    <p style={{ fontSize: 15, fontWeight: 700, marginBottom: 6, letterSpacing: '-0.01em' }}>{title}</p>
                    <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.6 }}>{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Comparison card */}
          <div style={{ border: '1px solid #e5e7eb', background: '#fff' }}>
            <div style={{ padding: '24px 32px', borderBottom: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 800, color: '#0035A1', letterSpacing: '0.04em' }}>{T.why.tni_label}</span>
              <span style={{ fontSize: 13, color: '#d1d5db', textDecoration: 'line-through' }}>{T.why.competitor_label}</span>
            </div>
            {T.why.checklist.map((item, i) => (
              <div key={item} style={{ padding: '20px 32px', borderBottom: i < T.why.checklist.length - 1 ? '1px solid #f9fafb' : 'none', display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 28, height: 28, background: 'rgba(0,53,161,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <span className="material-symbols-outlined" style={{ fontSize: 14, color: '#0035A1' }}>check</span>
                </div>
                <span style={{ fontSize: 14, fontWeight: 500 }}>{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CONTACT ── */}
      <section id="contact" style={{ padding: 'clamp(80px, 8vw, 140px) clamp(24px, 5vw, 80px)' }}>
        <div style={{ maxWidth: 1400, margin: '0 auto', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'clamp(40px, 5vw, 100px)' }}>
          <div>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, marginBottom: 20 }}>
              <div style={{ width: 24, height: 1, background: '#0035A1' }} />
              <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#0035A1' }}>Contact</span>
            </div>
            <h2 style={{ fontSize: 'clamp(32px, 3.5vw, 52px)', fontWeight: 900, letterSpacing: '-0.03em', marginBottom: 8, lineHeight: 1.1 }}>{T.form.heading}</h2>
            <p style={{ fontSize: 14, color: '#6b7280', marginBottom: 40 }}>{T.form.sub}</p>
            <MultiStepForm />
          </div>

          <div style={{ paddingLeft: 'clamp(0px, 3vw, 48px)', borderLeft: '1px solid #f3f4f6' }}>
            {/* Phone */}
            <div style={{ marginBottom: 56 }}>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 16 }}>{T.contact.phone_heading}</p>
              <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                <div style={{ width: 52, height: 52, background: 'rgba(0,53,161,0.06)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span className="material-symbols-outlined" style={{ color: '#0035A1', fontSize: 22 }}>call</span>
                </div>
                <div>
                  <p style={{ fontSize: 24, fontWeight: 900, color: '#0035A1', letterSpacing: '-0.02em', marginBottom: 2 }}>{T.contact.phone_number}</p>
                  <p style={{ fontSize: 12, color: '#9ca3af' }}>{T.contact.phone_hours}</p>
                </div>
              </div>
            </div>

            {/* Offices */}
            <div>
              <p style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.18em', textTransform: 'uppercase', color: '#9ca3af', marginBottom: 24 }}>{T.contact.offices_heading}</p>
              {T.contact.offices.map(({ city, addr }) => (
                <div key={city} style={{ display: 'flex', gap: 16, marginBottom: 28 }}>
                  <div style={{ width: 36, height: 36, background: 'rgba(245,158,11,0.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <span className="material-symbols-outlined" style={{ color: '#f59e0b', fontSize: 18 }}>location_on</span>
                  </div>
                  <div>
                    <p style={{ fontSize: 14, fontWeight: 700, marginBottom: 4 }}>{city}</p>
                    <p style={{ fontSize: 13, color: '#6b7280', lineHeight: 1.5 }}>{addr}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer style={{ padding: '32px clamp(24px, 5vw, 80px)', borderTop: '1px solid #f3f4f6', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 22, height: 22, background: '#0035A1', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ color: '#fff', fontSize: 8, fontWeight: 900 }}>TNI</span>
          </div>
          <span style={{ fontSize: 12, color: '#9ca3af' }}>© 2025 Transport & Négoce International</span>
        </div>
        <span style={{ fontSize: 11, color: '#d1d5db', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Casablanca · Tanger</span>
      </footer>
    </div>
  );
}