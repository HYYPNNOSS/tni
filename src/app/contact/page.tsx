"use client"
import { useState } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

function MultiStepForm() {
  const { t } = useTranslation("common");

  const [step, setStep] = useState(0);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({
    nom: "", entreprise: "", email: "", telephone: "",
    villeDepart: "", villeArrivee: "", typeMarchandise: "",
    volume: "", sens: "", frequence: "", message: "", consent: false,
  });

  const set = (k: string, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));
  const step1Valid = form.nom && form.email;

  const steps      = t("form.steps",              { returnObjects: true }) as string[];
  const stepIcons  = t("form.step_icons",          { returnObjects: true }) as string[];
  const marcOpts   = t("form.marchandise_options", { returnObjects: true }) as string[];
  const sensOpts   = t("form.sens_options",        { returnObjects: true }) as string[];
  const freqOpts   = t("form.frequence_options",   { returnObjects: true }) as string[];
  const summLabels = t("form.summary_labels",      { returnObjects: true }) as Record<string, string>;

  const inputStyle: React.CSSProperties = {
    padding: "9px 12px", borderRadius: 8, border: "1.5px solid #e5e7eb",
    fontSize: 13, width: "100%", outline: "none", fontFamily: "inherit",
    background: "#fafafa", color: "#0d121b", transition: "border-color 0.2s", boxSizing: "border-box",
  };
  const labelStyle: React.CSSProperties = {
    fontSize: 12, fontWeight: 700, color: "#374151", marginBottom: 4, display: "block",
  };
  const opt = <span style={{ fontWeight: 400, color: "#9ca3af", fontSize: 11 }}> ({t("form.optional")})</span>;
  const chipStyle = (active: boolean): React.CSSProperties => ({
    display: "inline-flex", alignItems: "center", padding: "6px 12px",
    borderRadius: 6, border: `1.5px solid ${active ? "#135bec" : "#e5e7eb"}`,
    cursor: "pointer", fontSize: 12, fontWeight: 600,
    background: active ? "rgba(19,91,236,0.07)" : "#fafafa",
    color: active ? "#135bec" : "#374151", transition: "all 0.15s",
  });

  const resetForm = () => {
    setSent(false); setStep(0);
    setForm({ nom:"",entreprise:"",email:"",telephone:"",villeDepart:"",villeArrivee:"",typeMarchandise:"",volume:"",sens:"",frequence:"",message:"",consent:false });
  };

  const summaryRows = [
    { key:"nom",        val: form.nom },
    form.entreprise && { key:"entreprise", val: form.entreprise },
    { key:"email",      val: form.email },
    form.telephone  && { key:"telephone",  val: form.telephone },
    form.sens       && { key:"sens",        val: form.sens },
    (form.villeDepart||form.villeArrivee) && { key:"trajet", val:`${form.villeDepart||"?"} → ${form.villeArrivee||"?"}` },
    form.typeMarchandise && { key:"marchandise", val: form.typeMarchandise },
    form.frequence  && { key:"frequence",   val: form.frequence },
    form.volume     && { key:"volume",       val: form.volume },
  ].filter(Boolean) as { key:string; val:string }[];

  return (
    <div>
      <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 8 }}>{t("form.heading")}</h2>
      <p style={{ color: "#4c669a", marginBottom: 20, fontSize: 14 }}>{t("form.sub")}</p>

      {/* ── Stepper ── */}
      {!sent && (
        <div style={{ marginBottom: 24 }}>
          <div style={{ display:"flex", justifyContent:"space-between", marginBottom:10, position:"relative" }}>
            <div style={{ position:"absolute", top:14, left:"10%", right:"10%", height:2, background:"#e5e7eb", zIndex:0 }}>
              <div style={{ height:"100%", background:"#135bec", width:`${(step/2)*100}%`, transition:"width 0.35s ease" }} />
            </div>
            {steps.map((label, i) => {
              const done = i < step, active = i === step;
              return (
                <div key={i} style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:4, flex:1, position:"relative", zIndex:2 }}>
                  <div style={{ width:28, height:28, borderRadius:"50%", background: done?"#135bec": active?"#fff":"#f3f4f6", border: active?"2px solid #135bec": done?"none":"2px solid #e5e7eb", color: done?"#fff": active?"#135bec":"#9ca3af", display:"flex", alignItems:"center", justifyContent:"center", boxShadow: active?"0 0 0 3px rgba(19,91,236,0.12)":"none", transition:"all 0.3s", outline:"4px solid #fff" }}>
                    {done ? <span className="material-symbols-outlined" style={{fontSize:14}}>check</span>
                          : <span className="material-symbols-outlined" style={{fontSize:14}}>{stepIcons[i]}</span>}
                  </div>
                  <span style={{ fontSize:10, fontWeight: active?700:500, color: active?"#135bec": done?"#374151":"#9ca3af" }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Success ── */}
      {sent ? (
        <div style={{ textAlign:"center", padding:"24px 0" }}>
          <div style={{ width:56, height:56, borderRadius:"50%", background:"rgba(34,197,94,0.1)", display:"flex", alignItems:"center", justifyContent:"center", margin:"0 auto 16px" }}>
            <span className="material-symbols-outlined" style={{ fontSize:32, color:"#22c55e" }}>check_circle</span>
          </div>
          <h3 style={{ fontSize:20, fontWeight:900, margin:"0 0 8px" }}>{t("form.success_title")}</h3>
          <p style={{ color:"#4c669a", fontSize:13, lineHeight:1.6, margin:"0 0 20px" }}
            dangerouslySetInnerHTML={{ __html: t("form.success_body").replace("{{name}}",`<strong>${form.nom}</strong>`).replace("{{email}}",`<strong>${form.email}</strong>`) }} />
          <button onClick={resetForm} style={{ background:"#135bec", color:"#fff", border:"none", borderRadius:8, padding:"10px 20px", fontSize:14, fontWeight:700, cursor:"pointer" }}>
            {t("form.new_request")}
          </button>
        </div>

      ) : step === 0 ? (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div className="two-col-grid">
            <div>
              <label style={labelStyle}>{t("form.fields.nom")} <span style={{color:"#ef4444"}}>*</span></label>
              <input style={inputStyle} type="text" placeholder={t("form.placeholders.nom")} value={form.nom} onChange={e=>set("nom",e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>{t("form.fields.entreprise")}{opt}</label>
              <input style={inputStyle} type="text" placeholder={t("form.placeholders.entreprise")} value={form.entreprise} onChange={e=>set("entreprise",e.target.value)} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>{t("form.fields.email")} <span style={{color:"#ef4444"}}>*</span></label>
            <input style={inputStyle} type="email" placeholder={t("form.placeholders.email")} value={form.email} onChange={e=>set("email",e.target.value)} />
          </div>
          <div>
            <label style={labelStyle}>{t("form.fields.telephone")}{opt}</label>
            <input style={inputStyle} type="tel" placeholder={t("form.placeholders.telephone")} value={form.telephone} onChange={e=>set("telephone",e.target.value)} />
          </div>
        </div>

      ) : step === 1 ? (
        <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
          <div className="two-col-grid">
            <div>
              <label style={labelStyle}>{t("form.fields.depart")}{opt}</label>
              <input style={inputStyle} type="text" placeholder={t("form.placeholders.depart")} value={form.villeDepart} onChange={e=>set("villeDepart",e.target.value)} />
            </div>
            <div>
              <label style={labelStyle}>{t("form.fields.arrivee")}{opt}</label>
              <input style={inputStyle} type="text" placeholder={t("form.placeholders.arrivee")} value={form.villeArrivee} onChange={e=>set("villeArrivee",e.target.value)} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>{t("form.fields.marchandise")}</label>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:4 }}>
              {marcOpts.map(o=><div key={o} style={chipStyle(form.typeMarchandise===o)} onClick={()=>set("typeMarchandise",o)}>{o}</div>)}
            </div>
          </div>
          <div>
            <label style={labelStyle}>{t("form.fields.sens")}</label>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap", marginTop:4 }}>
              {sensOpts.map(o=><div key={o} style={chipStyle(form.sens===o)} onClick={()=>set("sens",o)}>{o}</div>)}
            </div>
          </div>
          <div className="two-col-grid">
            <div>
              <label style={labelStyle}>{t("form.fields.frequence")}{opt}</label>
              <div style={{ display:"flex", flexDirection:"column", gap:6, marginTop:4 }}>
                {freqOpts.map(o=><div key={o} style={chipStyle(form.frequence===o)} onClick={()=>set("frequence",o)}>{o}</div>)}
              </div>
            </div>
            <div>
              <label style={labelStyle}>{t("form.fields.volume")}{opt}</label>
              <input style={inputStyle} type="text" placeholder={t("form.placeholders.volume")} value={form.volume} onChange={e=>set("volume",e.target.value)} />
            </div>
          </div>
          <div>
            <label style={labelStyle}>{t("form.fields.message")}{opt}</label>
            <textarea style={{...inputStyle, resize:"vertical"}} rows={2} placeholder={t("form.placeholders.message")} value={form.message} onChange={e=>set("message",e.target.value)} />
          </div>
        </div>

      ) : (
        <div style={{ display:"flex", flexDirection:"column", gap:16 }}>
          <div style={{ background:"#f8fafc", borderRadius:10, padding:"16px 20px", border:"1px solid #e5e7eb", display:"flex", flexDirection:"column", gap:10 }}>
            {summaryRows.map(({key,val})=>(
              <div key={key} style={{ display:"flex", gap:12, fontSize:13 }}>
                <span style={{ color:"#9ca3af", width:80, flexShrink:0 }}>{summLabels[key]}</span>
                <span style={{ fontWeight:600, color:"#0d121b" }}>{val}</span>
              </div>
            ))}
          </div>
          <label style={{ display:"flex", alignItems:"flex-start", gap:8, cursor:"pointer", fontSize:12, color:"#374151", lineHeight:1.5 }}>
            <input type="checkbox" checked={form.consent} onChange={e=>set("consent",e.target.checked)} style={{ marginTop:2, accentColor:"#135bec" }} />
            {t("form.consent")}
          </label>
        </div>
      )}

      {/* ── Nav ── */}
      {!sent && (
        <div style={{ display:"flex", justifyContent: step===0?"flex-end":"space-between", marginTop:16, paddingTop:16, borderTop:"1px solid #f3f4f6" }}>
          {step > 0 && (
            <button onClick={()=>setStep(s=>s-1)} style={{ background:"transparent", color:"#4c669a", border:"1.5px solid #e5e7eb", borderRadius:8, padding:"0 16px", height:38, fontSize:13, fontWeight:600, cursor:"pointer" }}>
              ← {t("form.btn_back")}
            </button>
          )}
          {step < 2 && (
            <button onClick={()=>setStep(s=>s+1)} disabled={step===0&&!step1Valid}
              style={{ background: step===0&&!step1Valid?"#93b4f7":"#135bec", color:"#fff", border:"none", borderRadius:8, padding:"0 20px", height:38, fontSize:13, fontWeight:700, cursor: step===0&&!step1Valid?"not-allowed":"pointer", display:"inline-flex", alignItems:"center", gap:6 }}>
              {t("form.btn_continue")} <span className="material-symbols-outlined" style={{fontSize:16}}>arrow_forward</span>
            </button>
          )}
          {step === 2 && (
            <button onClick={()=>form.consent&&setSent(true)} disabled={!form.consent}
              style={{ background: !form.consent?"#93b4f7":"#135bec", color:"#fff", border:"none", borderRadius:8, padding:"0 20px", height:38, fontSize:13, fontWeight:700, cursor: !form.consent?"not-allowed":"pointer", display:"inline-flex", alignItems:"center", gap:6 }}>
              {t("form.btn_send")} <span className="material-symbols-outlined" style={{fontSize:16}}>send</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

export default function ContactPage() {
  const { t } = useTranslation("common");

  const stats    = t("contact_page.stats",    { returnObjects: true }) as { value:string; label:string; icon:string }[];
  const offices  = t("contact_page.offices",  { returnObjects: true }) as { flag:string; city:string; addr:string; hours:string }[];
  const whyItems = t("contact_page.why_items",{ returnObjects: true }) as { icon:string; text:string }[];

  return (
    <div style={{ minHeight:"100vh", background:"#f6f6f8", color:"#0d121b", fontFamily:"'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        *, *::before, *::after { font-family: 'Inter', sans-serif; box-sizing: border-box; }
        .material-symbols-outlined { font-family:'Material Symbols Outlined'; font-variation-settings:'FILL' 0,'wght' 400,'GRAD' 0,'opsz' 24; font-style:normal; display:inline-block; line-height:1; vertical-align:middle; }
        .hero-grid   { display:grid; grid-template-columns:1fr 1fr; gap:64px; padding-bottom:48px; align-items:end; }
        .stats-grid  { display:grid; grid-template-columns:1fr 1fr 1fr; gap:1px; background:rgba(255,255,255,0.08); border-radius:16px; overflow:hidden; }
        .main-grid   { display:grid; grid-template-columns:1fr 1fr; gap:48px; }
        .two-col-grid{ display:grid; grid-template-columns:1fr 1fr; gap:12px; }
        @media (max-width:900px) {
          .hero-grid { grid-template-columns:1fr !important; gap:32px !important; padding-bottom:36px !important; }
          .main-grid { grid-template-columns:1fr !important; gap:24px !important; }
          .hero-h1   { font-size:32px !important; }
          .hero-wrap { padding:32px 20px 0 !important; }
          .main-wrap { padding:40px 20px !important; }
        }
        @media (max-width:600px) {
          .stats-grid    { grid-template-columns:1fr !important; }
          .two-col-grid  { grid-template-columns:1fr !important; }
          .hero-h1       { font-size:26px !important; }
          .form-card     { padding:24px 16px !important; }
          .info-card     { padding:20px 16px !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <div style={{ background:"#101622", borderBottom:"1px solid #1e2a3a" }}>
        <div className="hero-wrap" style={{ maxWidth:1280, margin:"0 auto", padding:"48px 40px 0" }}>
          <div className="hero-grid">
            <div>
              <span style={{ display:"inline-block", padding:"4px 12px", background:"rgba(245,158,11,0.15)", color:"#f59e0b", fontSize:11, fontWeight:700, textTransform:"uppercase", letterSpacing:"0.15em", borderRadius:4, marginBottom:16 }}>
                {t("contact_page.hero_badge")}
              </span>
              <h1 className="hero-h1" style={{ color:"#fff", fontSize:44, fontWeight:900, lineHeight:1.1, margin:"0 0 16px" }}>
                {t("contact_page.hero_title_plain")}<br />
                <span style={{color:"#135bec"}}>{t("contact_page.hero_title_accent")}</span>
              </h1>
              <p style={{ color:"rgba(255,255,255,0.6)", fontSize:16, lineHeight:1.7, margin:0 }}>
                {t("contact_page.hero_body")}
              </p>
            </div>
            <div className="stats-grid">
              {stats.map(({value,label,icon})=>(
                <div key={label} style={{ padding:"24px 20px", background:"#101622", display:"flex", flexDirection:"column", alignItems:"center", gap:8, textAlign:"center" }}>
                  <span className="material-symbols-outlined" style={{color:"#f59e0b",fontSize:22}}>{icon}</span>
                  <p style={{ fontSize:22, fontWeight:900, color:"#fff", margin:0 }}>{value}</p>
                  <p style={{ fontSize:11, color:"rgba(255,255,255,0.5)", margin:0 }}>{label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Main ── */}
      <main className="main-wrap" style={{ maxWidth:1280, margin:"0 auto", padding:"48px 40px 64px" }}>
        <div className="main-grid">

          <div className="form-card" style={{ background:"#fff", borderRadius:16, padding:36, border:"1px solid #e5e7eb", boxShadow:"0 4px 32px rgba(0,0,0,0.06)", alignSelf:"start" }}>
            <MultiStepForm />
          </div>

          <div style={{ display:"flex", flexDirection:"column", gap:20 }}>

            {/* Phone */}
            <div className="info-card" style={{ background:"#fff", borderRadius:16, padding:24, border:"1px solid #e5e7eb", boxShadow:"0 4px 24px rgba(0,0,0,0.05)" }}>
              <h3 style={{ fontSize:15, fontWeight:700, marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
                <span className="material-symbols-outlined" style={{color:"#135bec",fontSize:18}}>call</span>
                {t("contact_page.phone_heading")}
              </h3>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:48, height:48, borderRadius:"50%", background:"rgba(19,91,236,0.08)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span className="material-symbols-outlined" style={{color:"#135bec",fontSize:22}}>phone_in_talk</span>
                </div>
                <div style={{minWidth:0}}>
                  <p style={{ fontSize:20, fontWeight:900, margin:"0 0 3px", color:"#0d121b" }}>{t("contact_page.phone_number")}</p>
                  <p style={{ fontSize:12, color:"#4c669a", margin:0 }}>{t("contact_page.phone_hours")}</p>
                </div>
              </div>
            </div>

            {/* Email */}
            <div className="info-card" style={{ background:"#fff", borderRadius:16, padding:24, border:"1px solid #e5e7eb", boxShadow:"0 4px 24px rgba(0,0,0,0.05)" }}>
              <h3 style={{ fontSize:15, fontWeight:700, marginBottom:14, display:"flex", alignItems:"center", gap:8 }}>
                <span className="material-symbols-outlined" style={{color:"#135bec",fontSize:18}}>mail</span>
                {t("contact_page.email_heading")}
              </h3>
              <div style={{ display:"flex", alignItems:"center", gap:14 }}>
                <div style={{ width:48, height:48, borderRadius:"50%", background:"rgba(19,91,236,0.08)", display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0 }}>
                  <span className="material-symbols-outlined" style={{color:"#135bec",fontSize:22}}>forward_to_inbox</span>
                </div>
                <div style={{minWidth:0}}>
                  <p style={{ fontSize:15, fontWeight:700, margin:"0 0 3px", color:"#0d121b", wordBreak:"break-all" }}>{t("contact_page.email_address")}</p>
                  <p style={{ fontSize:12, color:"#4c669a", margin:0 }}>{t("contact_page.email_delay")}</p>
                </div>
              </div>
            </div>

            {/* Offices */}
            <div className="info-card" style={{ background:"#fff", borderRadius:16, padding:24, border:"1px solid #e5e7eb", boxShadow:"0 4px 24px rgba(0,0,0,0.05)" }}>
              <h3 style={{ fontSize:15, fontWeight:700, marginBottom:16, display:"flex", alignItems:"center", gap:8 }}>
                <span className="material-symbols-outlined" style={{color:"#135bec",fontSize:18}}>apartment</span>
                {t("contact_page.offices_heading")}
              </h3>
              <div style={{ display:"flex", flexDirection:"column", gap:12 }}>
                {offices.map(({flag,city,addr,hours})=>(
                  <div key={city} style={{ display:"flex", gap:14, padding:"14px 16px", background:"#f8fafc", borderRadius:10, border:"1px solid #f0f2f5" }}>
                    <span style={{ fontSize:26, lineHeight:1, flexShrink:0 }}>{flag}</span>
                    <div style={{minWidth:0}}>
                      <p style={{ fontWeight:700, margin:"0 0 3px", fontSize:13 }}>{city}</p>
                      <p style={{ fontSize:12, color:"#4c669a", margin:"0 0 3px" }}>{addr}</p>
                      <p style={{ fontSize:11, color:"#9ca3af", margin:0, display:"flex", alignItems:"center", gap:3 }}>
                        <span className="material-symbols-outlined" style={{fontSize:12}}>schedule</span>
                        {hours}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Why */}
            <div className="info-card" style={{ background:"#101622", borderRadius:16, padding:24 }}>
              <p style={{ color:"#f59e0b", fontWeight:700, fontSize:11, textTransform:"uppercase", letterSpacing:"0.1em", margin:"0 0 14px" }}>
                {t("contact_page.why_badge")}
              </p>
              <div style={{ display:"flex", flexDirection:"column", gap:14 }}>
                {whyItems.map(({icon,text})=>(
                  <div key={text} style={{ display:"flex", gap:12, alignItems:"center" }}>
                    <span className="material-symbols-outlined" style={{color:"#22c55e",fontSize:18,flexShrink:0}}>{icon}</span>
                    <p style={{ fontSize:13, color:"rgba(255,255,255,0.75)", margin:0 }}>{text}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}