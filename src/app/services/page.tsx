"use client"
import { useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

// ─── FAQ accordion item ───────────────────────────────────────────────────
function FaqItem({ question, answer }: { question: string; answer: string }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-black/[0.06] pb-4 mb-4 last:mb-0 last:border-0">
      <button
        onClick={() => setOpen(o => !o)}
        className="w-full flex justify-between items-center font-bold text-[15px] bg-none border-none
                   cursor-pointer p-0 text-left text-[#1c180d] gap-3"
      >
        <span>{question}</span>
        <span
          className={`material-symbols-outlined shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >expand_more</span>
      </button>
      {open && (
        <p className="text-sm text-gray-400 mt-2 leading-relaxed m-0">{answer}</p>
      )}
    </div>
  );
}

// ─── Multi-step contact form ──────────────────────────────────────────────
function MultiStepForm() {
  const { t } = useTranslation("common");

  const [step, setStep] = useState(0);
  const [sent, setSent]  = useState(false);
  const [form, setForm]  = useState({
    nom: "", entreprise: "", email: "", telephone: "",
    villeDepart: "", villeArrivee: "", typeMarchandise: "",
    volume: "", sens: "", frequence: "", message: "", consent: false,
  });

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));
  const step1Valid = form.nom && form.email;

  const steps     = t("form.steps",      { returnObjects: true }) as string[];
  const stepIcons = t("form.step_icons", { returnObjects: true }) as string[];
  const marcOpts  = t("form.marchandise_options", { returnObjects: true }) as string[];
  const sensOpts  = t("form.sens_options",         { returnObjects: true }) as string[];
  const freqOpts  = t("form.frequence_options",    { returnObjects: true }) as string[];
  const summLabels= t("form.summary_labels",       { returnObjects: true }) as Record<string,string>;

  const inputCls = "w-full px-3 py-2 rounded-lg border border-gray-200 text-[13px] outline-none bg-[#fafafa] text-[#0d121b] transition-colors duration-200 focus:border-[#135bec] box-border font-[inherit]";
  const labelCls = "block text-[12px] font-bold text-gray-700 mb-1";
  const opt = <span className="font-normal text-gray-400 text-[11px]"> ({t("form.optional")})</span>;
  const chipCls = (active: boolean) =>
    `inline-flex items-center gap-1 px-3 py-1.5 rounded-md border text-[12px] font-semibold cursor-pointer transition-all duration-150 ` +
    (active ? "border-[#135bec] bg-[rgba(19,91,236,0.07)] text-[#135bec]" : "border-gray-200 bg-[#fafafa] text-gray-700");

  const summaryRows = [
    { key: "nom",         val: form.nom },
    form.entreprise && { key: "entreprise",  val: form.entreprise },
    { key: "email",       val: form.email },
    form.telephone  && { key: "telephone",   val: form.telephone },
    form.sens       && { key: "sens",        val: form.sens },
    (form.villeDepart || form.villeArrivee) && { key: "trajet", val: `${form.villeDepart || "?"} → ${form.villeArrivee || "?"}` },
    form.typeMarchandise && { key: "marchandise", val: form.typeMarchandise },
    form.frequence       && { key: "frequence",   val: form.frequence },
    form.volume          && { key: "volume",       val: form.volume },
  ].filter(Boolean) as { key: string; val: string }[];

  const resetForm = () => {
    setSent(false); setStep(0);
    setForm({ nom:"",entreprise:"",email:"",telephone:"",villeDepart:"",villeArrivee:"",typeMarchandise:"",volume:"",sens:"",frequence:"",message:"",consent:false });
  };

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-black mb-2">{t("form.heading")}</h2>
      <p className="text-[#4c669a] mb-5 text-sm">{t("form.sub")}</p>

      {/* Stepper */}
      {!sent && (
        <div className="mb-6">
          <div className="flex justify-between mb-2.5 relative">
            <div className="absolute top-3.5 left-[10%] right-[10%] h-0.5 bg-gray-200 z-0">
              <div className="h-full bg-[#135bec] transition-all duration-[350ms] ease-in-out" style={{ width: `${(step / 2) * 100}%` }} />
            </div>
            {steps.map((label, i) => {
              const done = i < step, active = i === step;
              return (
                <div key={i} className="flex flex-col items-center gap-1 flex-1 relative z-10">
                  <div className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      fontSize: 14,
                      background: done ? "#135bec" : active ? "#fff" : "#f3f4f6",
                      border: active ? "2px solid #135bec" : done ? "none" : "2px solid #e5e7eb",
                      color: done ? "#fff" : active ? "#135bec" : "#9ca3af",
                      boxShadow: active ? "0 0 0 3px rgba(19,91,236,0.12)" : "none",
                      outline: "4px solid #f6f6f8",
                    }}>
                    {done
                      ? <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check</span>
                      : <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{stepIcons[i]}</span>}
                  </div>
                  <span className="text-[10px]" style={{ fontWeight: active ? 700 : 500, color: active ? "#135bec" : done ? "#374151" : "#9ca3af" }}>{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Success */}
      {sent ? (
        <div className="text-center py-6">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[32px] text-green-500">check_circle</span>
          </div>
          <h3 className="text-xl font-black mb-2">{t("form.success_title")}</h3>
          <p className="text-[#4c669a] text-[13px] leading-relaxed mb-5"
            dangerouslySetInnerHTML={{ __html: t("form.success_body").replace("{{name}}", `<strong>${form.nom}</strong>`).replace("{{email}}", `<strong>${form.email}</strong>`) }}
          />
          <button onClick={resetForm} className="bg-[#135bec] text-white border-none rounded-lg px-5 py-2.5 text-sm font-bold cursor-pointer">
            {t("form.new_request")}
          </button>
        </div>

      /* Step 0 */
      ) : step === 0 ? (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>{t("form.fields.nom")} <span className="text-red-500">*</span></label>
              <input className={inputCls} type="text" placeholder={t("form.placeholders.nom")} value={form.nom} onChange={e => set("nom", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>{t("form.fields.entreprise")}{opt}</label>
              <input className={inputCls} type="text" placeholder={t("form.placeholders.entreprise")} value={form.entreprise} onChange={e => set("entreprise", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelCls}>{t("form.fields.email")} <span className="text-red-500">*</span></label>
            <input className={inputCls} type="email" placeholder={t("form.placeholders.email")} value={form.email} onChange={e => set("email", e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>{t("form.fields.telephone")}{opt}</label>
            <input className={inputCls} type="tel" placeholder={t("form.placeholders.telephone")} value={form.telephone} onChange={e => set("telephone", e.target.value)} />
          </div>
        </div>

      /* Step 1 */
      ) : step === 1 ? (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>{t("form.fields.depart")}{opt}</label>
              <input className={inputCls} type="text" placeholder={t("form.placeholders.depart")} value={form.villeDepart} onChange={e => set("villeDepart", e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>{t("form.fields.arrivee")}{opt}</label>
              <input className={inputCls} type="text" placeholder={t("form.placeholders.arrivee")} value={form.villeArrivee} onChange={e => set("villeArrivee", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelCls}>{t("form.fields.marchandise")}</label>
            <div className="flex gap-2 flex-wrap mt-1">{marcOpts.map(o => <div key={o} className={chipCls(form.typeMarchandise === o)} onClick={() => set("typeMarchandise", o)}>{o}</div>)}</div>
          </div>
          <div>
            <label className={labelCls}>{t("form.fields.sens")}</label>
            <div className="flex gap-2 flex-wrap mt-1">{sensOpts.map(o => <div key={o} className={chipCls(form.sens === o)} onClick={() => set("sens", o)}>{o}</div>)}</div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>{t("form.fields.frequence")}{opt}</label>
              <div className="flex flex-col gap-1.5 mt-1">{freqOpts.map(o => <div key={o} className={chipCls(form.frequence === o)} onClick={() => set("frequence", o)}>{o}</div>)}</div>
            </div>
            <div>
              <label className={labelCls}>{t("form.fields.volume")}{opt}</label>
              <input className={inputCls} type="text" placeholder={t("form.placeholders.volume")} value={form.volume} onChange={e => set("volume", e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelCls}>{t("form.fields.message")}{opt}</label>
            <textarea className={`${inputCls} resize-y`} rows={2} placeholder={t("form.placeholders.message")} value={form.message} onChange={e => set("message", e.target.value)} />
          </div>
        </div>

      /* Step 2: Summary */
      ) : (
        <div className="flex flex-col gap-4">
          <div className="bg-slate-50 rounded-xl p-4 border border-gray-200 flex flex-col gap-2.5">
            {summaryRows.map(({ key, val }) => (
              <div key={key} className="flex gap-3 text-[13px]">
                <span className="text-gray-400 w-20 shrink-0">{summLabels[key]}</span>
                <span className="font-semibold text-[#0d121b]">{val}</span>
              </div>
            ))}
          </div>
          <label className="flex items-start gap-2 cursor-pointer text-[12px] text-gray-700 leading-relaxed">
            <input type="checkbox" checked={form.consent} onChange={e => set("consent", e.target.checked)} className="mt-0.5 accent-[#135bec]" />
            {t("form.consent")}
          </label>
        </div>
      )}

      {/* Nav buttons */}
      {!sent && (
        <div className={`flex mt-4 pt-4 border-t border-gray-100 ${step === 0 ? "justify-end" : "justify-between"}`}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)} className="bg-transparent text-[#4c669a] border border-gray-200 rounded-lg px-4 h-[38px] text-[13px] font-semibold cursor-pointer">
              ← {t("form.btn_back")}
            </button>
          )}
          {step < 2 && (
            <button onClick={() => setStep(s => s + 1)} disabled={step === 0 && !step1Valid}
              className={`text-white border-none rounded-lg px-5 h-[38px] text-[13px] font-bold inline-flex items-center gap-1.5 transition-colors ${step === 0 && !step1Valid ? "bg-[#93b4f7] cursor-not-allowed" : "bg-[#135bec] cursor-pointer"}`}>
              {t("form.btn_continue")} <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
            </button>
          )}
          {step === 2 && (
            <button onClick={() => form.consent && setSent(true)} disabled={!form.consent}
              className={`text-white border-none rounded-lg px-5 h-[38px] text-[13px] font-bold inline-flex items-center gap-1.5 transition-colors ${!form.consent ? "bg-[#93b4f7] cursor-not-allowed" : "bg-[#135bec] cursor-pointer"}`}>
              {t("form.btn_send")} <span className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TNIServices — main page
// ═══════════════════════════════════════════════════════════════════════════
export default function TNIServices() {
  const { t } = useTranslation("common");

  const isRTL      = t("dir") === "rtl";
  const svc        = (k: string) => t(`svc_page.${k}`);
  const frigoRows  = t("svc_page.frigo_rows",    { returnObjects: true }) as { type: string; temp: string }[];
  const faqItems   = t("svc_page.faq_items",     { returnObjects: true }) as { q: string; a: string }[];
  const ctaCards   = t("svc_page.cta_cards",     { returnObjects: true }) as { icon: string; label: string; sub: string }[];
  const procSteps  = t("svc_page.process_steps", { returnObjects: true }) as { title: string; sub: string }[];
  const whyItems   = t("svc_page.why_items",     { returnObjects: true }) as { title: string; desc: string }[];
  const inclItems  = t("svc_page.included_items",{ returnObjects: true }) as string[];
  const offices    = t("contact.offices",        { returnObjects: true }) as { city: string; addr: string }[];

  return (
    <div className="min-h-screen bg-[#f8f8f5] text-[#1c180d]" dir={isRTL ? "rtl" : "ltr"}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-style: normal; display: inline-block; line-height: 1; vertical-align: middle;
        }
        .step-circle:hover { background: #f2b90d !important; color: #1c180d !important; }
      `}</style>

      <main className="max-w-[1600px] mx-auto
                       px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24
                       py-5 sm:py-6 md:py-8 lg:py-10 2xl:py-12
                       flex flex-col gap-12 sm:gap-16 md:gap-20 lg:gap-24 2xl:gap-28">

        {/* ══════════ HERO ══════════ */}
        <section className="rounded-2xl overflow-hidden">
          <div
            className="min-h-[320px] sm:min-h-[420px] md:min-h-[500px] lg:min-h-[560px] 2xl:min-h-[640px]
                       flex flex-col items-center justify-center text-center
                       px-5 sm:px-10 md:px-16 py-10 sm:py-14"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.5), rgba(0,0,0,0.7)), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCgMXleLRPe-ZV2AMnalpRZAiBRKxZBp-JnJ6kzY_dCD6ixBuHOtEmVxrOSprgPRYaqSPaGRAac8OB0APdkIv-_xyukgENLL_DkCQnclqtxY36AXcNrV_lh6itxdO_n6FidOrQrOjQRkGFVKmfVzt7nj-x2OJp0mzd4v21FPgQY4nPEpRcN_YJ0EXAvEkqU7IhlKod6N3IRzxdUr6FsoePIK6SNjdrphcR1r2RfIB86T_QrQAf8EyFLNc37gM89T9RLm3dUfQloGVw")`,
              backgroundSize: "cover", backgroundPosition: "center",
            }}
          >
            <h1 className="text-white font-black leading-tight max-w-[860px]
                           text-[26px] sm:text-4xl md:text-[42px] lg:text-[52px] 2xl:text-[60px]
                           mb-4 sm:mb-5">
              {svc("hero_title")}
            </h1>
            <p className="text-white/90 font-medium max-w-[600px]
                          text-sm sm:text-base md:text-[17px] lg:text-lg
                          mb-6 sm:mb-8">
              {svc("hero_sub")}
            </p>
            <div className="flex gap-3 sm:gap-4 flex-wrap justify-center">
              <button className="bg-[#f2b90d] text-[#1c180d] border-none rounded-lg font-bold cursor-pointer
                                 px-5 sm:px-7 lg:px-9 h-10 sm:h-11 md:h-12 lg:h-[52px]
                                 text-sm sm:text-base">
                {svc("hero_cta_primary")}
              </button>
              <button className="bg-white/10 text-white border border-white/20 rounded-lg font-bold cursor-pointer backdrop-blur-sm
                                 px-5 sm:px-7 lg:px-9 h-10 sm:h-11 md:h-12 lg:h-[52px]
                                 text-sm sm:text-base">
                {svc("hero_cta_secondary")}
              </button>
            </div>
          </div>
        </section>

        {/* ══════════ SERVICE 1: STANDARD ══════════ */}
        <section id="standard">
          <h2 className={`font-black mb-6 sm:mb-8
                          text-xl sm:text-2xl md:text-[26px] lg:text-[30px] 2xl:text-[34px]
                          pl-4 border-l-4 border-[#f2b90d]
                          ${isRTL ? "pl-0 pr-4 border-l-0 border-r-4" : ""}`}>
            {svc("standard_heading")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2
                          gap-5 sm:gap-6 md:gap-8 lg:gap-10 2xl:gap-14
                          items-start">
            {/* Card */}
            <div className="bg-white rounded-xl overflow-hidden border border-black/[0.06]">
              <div className="w-full aspect-video bg-cover bg-center"
                style={{ backgroundImage: `url("https://lh3.googleusercontent.com/aida-public/AB6AXuAXQLLAbBh4k3lY5aHa7UB5TAq440959QEOZYc-gpGnJ19WF6X6VZvsISYvMPOoH5ynnJyVYvTgyCJUf2WNrY8XE9asvTjHUpH0-WB3C8U-v6HRFpymXecgVP9cClAboV6iuTZj-zwC-US6WDe994AxPpFuzfAIBU0ntMLN4vRyT-cMKHTz_OgyFoKz4BjHu4FOSZ5aN0nDRmSTNmazGYM_b9XHP8-LfXyeiq1rf04MxkR4fkON4Qypi_35iYNKYiTpLfGFuiL2DY0")` }}
              />
              <div className="p-5 sm:p-6 lg:p-8 2xl:p-10">
                <h3 className="font-bold mb-3 text-[15px] sm:text-base lg:text-lg 2xl:text-xl">
                  {svc("standard_title")}
                </h3>
                <p className="text-gray-500 leading-relaxed mb-6 text-[13px] sm:text-sm lg:text-[15px]">
                  {svc("standard_body")}
                </p>
                <div className="grid grid-cols-2 gap-3 sm:gap-4">
                  {[
                    { icon: "inventory_2", label: svc("standard_stat1_label"), val: svc("standard_stat1_val") },
                    { icon: "schedule",    label: svc("standard_stat2_label"), val: svc("standard_stat2_val") },
                  ].map(({ icon, label, val }) => (
                    <div key={label} className="bg-[#f8f8f5] p-3 sm:p-4 rounded-lg">
                      <span className="material-symbols-outlined text-[#f2b90d] block mb-1">{icon}</span>
                      <p className="text-[10px] sm:text-[11px] font-bold uppercase text-gray-400 mb-1 m-0">{label}</p>
                      <p className="text-[12px] sm:text-[13px] font-semibold m-0">{val}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Included panel */}
            <div className="bg-[rgba(242,185,13,0.08)] rounded-xl border border-[rgba(242,185,13,0.25)]
                            p-5 sm:p-6 lg:p-8 2xl:p-10">
              <h4 className="font-bold mb-5 sm:mb-6 flex items-center gap-2
                             text-sm sm:text-base lg:text-lg 2xl:text-xl">
                <span className="material-symbols-outlined text-[#f2b90d]">verified</span>
                {svc("included_heading")}
              </h4>
              <div className="flex flex-col gap-4 sm:gap-5 mb-6 sm:mb-8">
                {inclItems.map(item => (
                  <div key={item} className="flex items-center gap-3">
                    <div className="w-6 h-6 bg-[#f2b90d] rounded flex items-center justify-center shrink-0">
                      <span className="material-symbols-outlined text-[#1c180d] font-bold" style={{ fontSize: 16 }}>check</span>
                    </div>
                    <span className="font-semibold text-[13px] sm:text-sm lg:text-[15px]">{item}</span>
                  </div>
                ))}
              </div>
              <button className="w-full bg-[#f2b90d] text-[#1c180d] border-none rounded-lg
                                 flex items-center justify-center gap-2 font-bold cursor-pointer
                                 h-11 sm:h-12 lg:h-[52px] text-sm sm:text-base">
                {svc("included_cta")} <span className="material-symbols-outlined">arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* ══════════ SERVICE 2: FRIGORIFIQUE ══════════ */}
        <section id="frigorifique" className="bg-white rounded-2xl
                                              border border-blue-100/60
                                              p-6 sm:p-8 md:p-10 lg:p-12 2xl:p-14">
          <div className="flex flex-col md:flex-row gap-8 sm:gap-10 md:gap-12 lg:gap-14 2xl:gap-20 items-center">
            {/* Left */}
            <div className="flex-1 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-blue-50 text-blue-600
                              rounded-full text-[11px] font-bold uppercase tracking-widest mb-5">
                {svc("frigo_badge")}
              </div>
              <h2 className="font-black text-[#1c180d] mb-4
                             text-[22px] sm:text-3xl md:text-[28px] lg:text-[34px] 2xl:text-[38px]">
                {svc("frigo_heading")}
              </h2>
              <p className="text-gray-600 leading-relaxed mb-7
                            text-sm sm:text-base lg:text-[17px]">
                {svc("frigo_body")}
              </p>
              <div className="grid grid-cols-2 gap-5 sm:gap-6 mb-7">
                {[
                  { icon: "vaccines",    label: svc("frigo_sector1") },
                  { icon: "restaurant",  label: svc("frigo_sector2") },
                ].map(({ icon, label }) => (
                  <div key={label} className="flex items-center gap-3 sm:gap-4">
                    <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center
                                    shadow-[0_2px_8px_rgba(0,0,0,0.08)] shrink-0">
                      <span className="material-symbols-outlined text-blue-500">{icon}</span>
                    </div>
                    <span className="font-bold text-sm sm:text-base">{label}</span>
                  </div>
                ))}
              </div>
              <div className="border-t border-blue-100 pt-5 flex items-center gap-5 sm:gap-6 flex-wrap">
                <div className="flex">
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-blue-100 flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-blue-600">+20°C</div>
                  <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full border-2 border-white bg-blue-600 flex items-center justify-center text-[10px] sm:text-[11px] font-bold text-white -ml-2">-25°C</div>
                </div>
                <p className="text-sm font-medium text-gray-500 m-0">{svc("frigo_temp_label")}</p>
              </div>
            </div>

            {/* Right: monitoring card */}
            <div className="flex-1 w-full">
              <div className="bg-white rounded-xl shadow-[0_8px_32px_rgba(0,0,0,0.08)] overflow-hidden">
                <div className="bg-[#0035A1] px-5 py-4 text-white flex items-center justify-center gap-2 font-bold">
                  <span className="material-symbols-outlined">thermostat</span>
                  {svc("frigo_monitor")}
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse" style={{ minWidth: 260 }}>
                    <thead>
                      <tr className="bg-gray-50">
                        <th className="px-4 sm:px-5 py-3 text-left text-[10px] sm:text-[11px] font-bold uppercase text-gray-400">{svc("frigo_table_type")}</th>
                        <th className="px-4 sm:px-5 py-3 text-left text-[10px] sm:text-[11px] font-bold uppercase text-gray-400">{svc("frigo_table_temp")}</th>
                      </tr>
                    </thead>
                    <tbody>
                      {frigoRows.map(({ type, temp }) => (
                        <tr key={type} className="border-t border-gray-100">
                          <td className="px-4 sm:px-5 py-3 sm:py-4 font-semibold text-sm">{type}</td>
                          <td className="px-4 sm:px-5 py-3 sm:py-4 text-blue-600 font-mono font-semibold text-sm">{temp}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="p-5 sm:p-6 bg-[#f2b90d]">
                  <p className="text-white text-center font-bold mb-4">{svc("frigo_emergency")}</p>
                  <a href="tel:+2120000000"
                    className="flex items-center justify-center gap-3 bg-[#0035A1] text-white
                               px-4 py-3 rounded-lg font-bold no-underline text-sm sm:text-base">
                    <span className="material-symbols-outlined">call</span>
                    {t("contact.phone_number")}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════ SERVICE 3: CUSTOMS ══════════ */}
        <section id="customs">
          <h2 className="font-black text-center mb-8 sm:mb-10 md:mb-12
                         text-xl sm:text-2xl md:text-[26px] lg:text-[30px] 2xl:text-[34px]
                         underline decoration-[#f2b90d] underline-offset-[6px]">
            {svc("customs_heading")}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2
                          gap-6 sm:gap-8 md:gap-10 lg:gap-12 2xl:gap-16">
            {/* Left: challenge + solution + langs */}
            <div className="flex flex-col gap-5 sm:gap-6">
              <div className="bg-red-50/80 rounded-lg border-l-4 border-red-500 p-5 sm:p-6">
                <h4 className="font-bold text-red-600 mb-2 text-sm sm:text-base">{svc("challenge_title")}</h4>
                <p className="text-sm leading-relaxed m-0">{svc("challenge_body")}</p>
              </div>
              <div className="bg-green-50/80 rounded-lg border-l-4 border-green-500 p-5 sm:p-6">
                <h4 className="font-bold text-green-600 mb-2 text-sm sm:text-base">{svc("solution_title")}</h4>
                <p className="text-sm leading-relaxed m-0">{svc("solution_body")}</p>
              </div>
              <div>
                <h4 className="font-bold mb-4 text-sm sm:text-base">{svc("multilang_label")}</h4>
                <div className="flex gap-3 sm:gap-4 flex-wrap">
                  {["FR", "ES", "EN", "MA"].map(l => (
                    <div key={l} className="w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-gray-100 border border-gray-200
                                           flex items-center justify-center font-bold text-[11px] sm:text-[12px]">
                      {l}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right: FAQ */}
            <div className="bg-white rounded-xl shadow-[0_2px_12px_rgba(0,0,0,0.05)]
                            p-5 sm:p-6 lg:p-8 2xl:p-10">
              <h4 className="font-bold mb-6 text-base sm:text-lg lg:text-xl 2xl:text-[22px]">
                {svc("faq_heading")}
              </h4>
              {faqItems.map(({ q, a }) => (
                <FaqItem key={q} question={q} answer={a} />
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ CTA CARDS ══════════ */}
        <section className="rounded-3xl text-center
                            px-6 sm:px-10 md:px-14 py-8 sm:py-10 md:py-12">
          <h2 className="font-black mb-6 sm:mb-8 md:mb-10
                         text-xl sm:text-2xl md:text-[26px] lg:text-[30px] 2xl:text-[34px]">
            {svc("cta_heading")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 2xl:gap-8">
            {ctaCards.map(({ icon, label, sub }) => (
              <a key={label} href="#"
                className="flex flex-col items-center
                           p-5 sm:p-6 lg:p-7 2xl:p-8
                           rounded-2xl bg-[#f8f8f6] no-underline text-[#1c180d]
                           hover:bg-[#f2b90d]/10 transition-colors duration-200">
                <span className="material-symbols-outlined text-[#eccb13] mb-3 sm:mb-4" style={{ fontSize: 36 }}>{icon}</span>
                <span className="font-bold mb-1 text-sm sm:text-base">{label}</span>
                <span className="text-[13px] sm:text-sm text-gray-400">{sub}</span>
              </a>
            ))}
          </div>
        </section>

        {/* ══════════ PROCESS ══════════ */}
        <section id="process">
          <h2 className="font-black text-center mb-8 sm:mb-10 md:mb-14 lg:mb-16
                         text-xl sm:text-2xl md:text-[26px] lg:text-[30px] 2xl:text-[34px]">
            {svc("process_heading")}
          </h2>
          <div className="relative">
            {/* connector line — only visible when grid is 5 cols */}
            <div className="hidden md:block absolute top-[30px] lg:top-[34px] 2xl:top-[38px]
                            left-0 w-full h-1 bg-black/[0.05] z-0" />
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5
                            gap-4 sm:gap-5 lg:gap-6 2xl:gap-8
                            relative z-10">
              {procSteps.map(({ title, sub }, i) => (
                <div key={i} className="flex flex-col items-center text-center">
                  <div className="step-circle rounded-full border-2 border-[#f2b90d]
                                  bg-white text-[#1c180d] font-black flex items-center justify-center
                                  shadow-[0_4px_16px_rgba(0,0,0,0.08)] cursor-default
                                  transition-colors duration-200 mb-3 sm:mb-4
                                  w-10 h-10 text-base
                                  sm:w-12 sm:h-12 sm:text-lg
                                  lg:w-14 lg:h-14 lg:text-xl
                                  2xl:w-16 2xl:h-16 2xl:text-2xl">
                    {i + 1}
                  </div>
                  <h4 className="font-bold mb-1 text-[12px] sm:text-[13px] lg:text-sm 2xl:text-[15px]">{title}</h4>
                  <p className="text-gray-400 m-0 text-[10px] sm:text-[11px] lg:text-[12px] 2xl:text-[13px]">{sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ══════════ WHY US ══════════ */}
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                            gap-4 sm:gap-5 lg:gap-6 2xl:gap-8">
          {whyItems.map(({ title, desc }, i) => (
            <div key={i}
              className={`p-5 sm:p-6 lg:p-7 2xl:p-8 bg-white rounded-xl text-center
                          shadow-[0_2px_8px_rgba(0,0,0,0.04)]
                          ${i === 1 ? "border-t-4 border-[#f2b90d]" : "border border-gray-100"}`}>
              <span className="material-symbols-outlined text-[#f2b90d] block mb-3 sm:mb-4" style={{ fontSize: 36 }}>
                {["public", "support_agent", "translate"][i]}
              </span>
              <h3 className="font-bold mb-2 text-base sm:text-lg lg:text-xl 2xl:text-[22px]">{title}</h3>
              <p className="text-gray-400 m-0 leading-relaxed text-[12px] sm:text-[13px] lg:text-sm 2xl:text-[15px]">{desc}</p>
            </div>
          ))}
        </section>

        {/* ══════════ CONTACT / FORM ══════════ */}
        <section id="contact"
          className="pb-8 sm:pb-10 md:pb-14 lg:pb-16 2xl:pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2
                          gap-8 sm:gap-10 md:gap-8 lg:gap-14 xl:gap-20">
            <MultiStepForm />
            <div className={`flex flex-col justify-center gap-8 sm:gap-10
                            border-t border-gray-200 pt-8
                            md:border-t-0 md:pt-0
                            ${isRTL
                              ? "md:border-r md:pr-8 lg:pr-12 xl:pr-16"
                              : "md:border-l md:pl-8 lg:pl-12 xl:pl-16"
                            }`}>
              <div>
                <h3 className="font-bold mb-4 text-base sm:text-lg lg:text-xl 2xl:text-[22px]">
                  {t("contact.phone_heading")}
                </h3>
                <div className="flex items-center gap-4 text-[#135bec] flex-wrap">
                  <span className="material-symbols-outlined text-[28px] sm:text-[34px] lg:text-[40px] 2xl:text-[44px]">call</span>
                  <div>
                    <p className="font-black mb-1 m-0 text-xl sm:text-2xl lg:text-[24px] 2xl:text-[26px]">{t("contact.phone_number")}</p>
                    <p className="text-sm text-[#4c669a] m-0">{t("contact.phone_hours")}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-base sm:text-lg lg:text-xl 2xl:text-[22px]">
                  {t("contact.offices_heading")}
                </h3>
                {offices.map(({ city, addr }) => (
                  <div key={city} className="flex gap-3 mb-4">
                    <span className="material-symbols-outlined text-amber-400 shrink-0">location_on</span>
                    <div>
                      <p className="font-bold mb-1 m-0 text-[14px] sm:text-[15px]">{city}</p>
                      <p className="text-sm text-[#4c669a] m-0">{addr}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}