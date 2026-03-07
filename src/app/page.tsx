"use client"
import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

// ─── Atout icons (order matches translation items array) ───────────────────
const ATOUT_ICONS   = ['local_shipping', 'ac_unit', 'public', 'description'];
const ATOUT_ACCENTS = [false, false, false, true];

// ─── Why-choose icons (order matches translation items array) ──────────────
const WHY_ICONS = ['verified_user', 'speed', 'payments'];

// ─── Process step styles (filled / accent / outline) ──────────────────────
const STEP_STYLES = [
  { filled: true,  accent: false },
  { filled: false, accent: false },
  { filled: false, accent: false },
  { filled: false, accent: true  },
  { filled: true,  accent: false },
];

// ─── Service images ────────────────────────────────────────────────────────
const SERVICE_IMGS = [
  'https://lh3.googleusercontent.com/aida-public/AB6AXuBiZ-iG5AfqJV04aJZ0gsEK64krkcjHBLqN9fyLYk9fznp6k_g7lVgI1XrtCEXTOnX4YpQWZFol-vBSuy5tPsT_ORiSOfdRGUEZsHHmlXYJU5uFiWa3kQzQJfrf9ccM-4H88UXL4HEhSVdTB8MfTyTazvV162ryZ28GOHNxK3I4kt_ynp8l21JMhn0JG2bTphYYZNEkWkZIKHCQ1ozDDXLIXHBCshIWRNE_fI9BoSIi7xMMxDBFEI5xUZdk6EiJCpARa6Mo4Fo1lTs',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuCxvucGHyUiv8DG-QG-4zSYDmbcv_VJxa9zgHbmaTsYAz51FiYnsr-r04OurWUcT7YhEJc9pilsAT8ig4r3CL__N3zwyvD3p5QrO_v5t-zoZBU7VMC1vpPUtZ908PUikfOpse07O0JKtrU5uMJ_7m14sn2aBVONQhEK4VCHMEqnvwEEGH-gsmZ2QbeqixBVlVJgEZefDZyQ5Knc3HyYM90RdpEx22u_okApyTPvZN1VJ5pScFszmkNZvF54w4qOG17Fi2pV8M0LW7g',
  'https://lh3.googleusercontent.com/aida-public/AB6AXuADauQP3u7HkWFHHOVPRVwf7rqM78SgVd26MJCSEk_3rQEAiRioojUc04FqGQmdHSvTObOiXNAFq5QZhQZoB0NUCiYOJecIBRpm6KkH5t5jdbH4qHtqjlyKlPUNVE6fH7Dft0yx9dFPIlmeHQodD_A8waU2vAK4p5gbn6y8uYcjHcJd_Oze6D0KEmjGSfrbwlhDbxrp6w3WfBHhomGyAwa8p_p4tD77OrRLVM25wpM7taIy5NUEcZNfT026eQBvd6kH9PTW6jwmyJo',
];

// ═══════════════════════════════════════════════════════════════════════════
// MultiStepForm
// ═══════════════════════════════════════════════════════════════════════════
function MultiStepForm() {
  const { t } = useTranslation("common");

  const [step, setStep] = useState(0);
  const [sent, setSent]  = useState(false);
  const [form, setForm]  = useState({
    nom: '', entreprise: '', email: '', telephone: '',
    villeDepart: '', villeArrivee: '', typeMarchandise: '',
    volume: '', sens: '', frequence: '', message: '', consent: false,
  });

  const set = (k: string, v: any) => setForm(f => ({ ...f, [k]: v }));
  const step1Valid = form.nom && form.email;

  const steps      = t("form.steps",      { returnObjects: true }) as string[];
  const stepIcons  = t("form.step_icons", { returnObjects: true }) as string[];
  const marcOpts   = t("form.marchandise_options", { returnObjects: true }) as string[];
  const sensOpts   = t("form.sens_options",        { returnObjects: true }) as string[];
  const freqOpts   = t("form.frequence_options",   { returnObjects: true }) as string[];
  const summLabels = t("form.summary_labels",      { returnObjects: true }) as Record<string, string>;

  const inputCls =
    "w-full px-3 py-2 rounded-lg border border-gray-200 text-[13px] outline-none bg-[#fafafa] text-[#0d121b] transition-colors duration-200 focus:border-[#0035A1] box-border font-[inherit]";
  const labelCls = "block text-[12px] font-bold text-gray-700 mb-1";
  const opt = <span className="font-normal text-gray-400 text-[11px]"> ({t("form.optional")})</span>;

  const chipCls = (active: boolean) =>
    `inline-flex items-center gap-1 px-3 py-1.5 rounded-md border text-[12px] font-semibold cursor-pointer transition-all duration-150 ` +
    (active
      ? "border-[#0035A1] bg-[rgba(19,91,236,0.07)] text-[#0035A1]"
      : "border-gray-200 bg-[#fafafa] text-gray-700");

  const resetForm = () => {
    setSent(false); setStep(0);
    setForm({ nom:'',entreprise:'',email:'',telephone:'',villeDepart:'',villeArrivee:'',typeMarchandise:'',volume:'',sens:'',frequence:'',message:'',consent:false });
  };

  const summaryRows = [
    { key: 'nom',        val: form.nom },
    form.entreprise  && { key: 'entreprise', val: form.entreprise },
    { key: 'email',      val: form.email },
    form.telephone   && { key: 'telephone',  val: form.telephone },
    form.sens        && { key: 'sens',        val: form.sens },
    (form.villeDepart || form.villeArrivee) && {
      key: 'trajet',
      val: `${form.villeDepart || '?'} → ${form.villeArrivee || '?'}`,
    },
    form.typeMarchandise && { key: 'marchandise', val: form.typeMarchandise },
    form.frequence       && { key: 'frequence',   val: form.frequence },
    form.volume          && { key: 'volume',       val: form.volume },
  ].filter(Boolean) as { key: string; val: string }[];

  return (
    <div>
      <h2 className="text-2xl sm:text-3xl font-black mb-2">{t("form.heading")}</h2>
      <p className="text-[#4c669a] mb-5 text-sm">{t("form.sub")}</p>

      {/* ── Stepper ── */}
      {!sent && (
        <div className="mb-6">
          <div className="flex justify-between mb-2.5 relative">
            <div className="absolute top-3.5 left-[10%] right-[10%] h-0.5 bg-gray-200 z-0">
              <div
                className="h-full bg-[#0035A1] transition-all duration-[350ms] ease-in-out"
                style={{ width: `${(step / 2) * 100}%` }}
              />
            </div>
            {steps.map((label, i) => {
              const done = i < step, active = i === step;
              return (
                <div key={i} className="flex flex-col items-center gap-1 flex-1 relative z-10">
                  <div
                    className="w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300"
                    style={{
                      fontSize: 14,
                      background: done ? '#0035A1' : active ? '#fff' : '#f3f4f6',
                      border: active ? '2px solid #0035A1' : done ? 'none' : '2px solid #e5e7eb',
                      color: done ? '#fff' : active ? '#0035A1' : '#9ca3af',
                      boxShadow: active ? '0 0 0 3px rgba(19,91,236,0.12)' : 'none',
                      outline: '4px solid #f6f6f8',
                    }}
                  >
                    {done
                      ? <span className="material-symbols-outlined" style={{ fontSize: 14 }}>check</span>
                      : <span className="material-symbols-outlined" style={{ fontSize: 14 }}>{stepIcons[i]}</span>}
                  </div>
                  <span
                    className="text-[10px]"
                    style={{ fontWeight: active ? 700 : 500, color: active ? '#0035A1' : done ? '#374151' : '#9ca3af' }}
                  >{label}</span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ── Success screen ── */}
      {sent ? (
        <div className="text-center py-6">
          <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-4">
            <span className="material-symbols-outlined text-[32px] text-green-500">check_circle</span>
          </div>
          <h3 className="text-xl font-black mb-2">{t("form.success_title")}</h3>
          <p className="text-[#4c669a] text-[13px] leading-relaxed mb-5"
            dangerouslySetInnerHTML={{
              __html: t("form.success_body")
                .replace("{{name}}", `<strong>${form.nom}</strong>`)
                .replace("{{email}}", `<strong>${form.email}</strong>`),
            }}
          />
          <button onClick={resetForm}
            className="bg-[#0035A1] text-white border-none rounded-lg px-5 py-2.5 text-sm font-bold cursor-pointer">
            {t("form.new_request")}
          </button>
        </div>

      /* ── Step 0: Identity ── */
      ) : step === 0 ? (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>{t("form.fields.nom")} <span className="text-red-500">*</span></label>
              <input className={inputCls} type="text" placeholder={t("form.placeholders.nom")} value={form.nom} onChange={e => set('nom', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>{t("form.fields.entreprise")}{opt}</label>
              <input className={inputCls} type="text" placeholder={t("form.placeholders.entreprise")} value={form.entreprise} onChange={e => set('entreprise', e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelCls}>{t("form.fields.email")} <span className="text-red-500">*</span></label>
            <input className={inputCls} type="email" placeholder={t("form.placeholders.email")} value={form.email} onChange={e => set('email', e.target.value)} />
          </div>
          <div>
            <label className={labelCls}>{t("form.fields.telephone")}{opt}</label>
            <input className={inputCls} type="tel" placeholder={t("form.placeholders.telephone")} value={form.telephone} onChange={e => set('telephone', e.target.value)} />
          </div>
        </div>

      /* ── Step 1: Transport ── */
      ) : step === 1 ? (
        <div className="flex flex-col gap-3">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>{t("form.fields.depart")}{opt}</label>
              <input className={inputCls} type="text" placeholder={t("form.placeholders.depart")} value={form.villeDepart} onChange={e => set('villeDepart', e.target.value)} />
            </div>
            <div>
              <label className={labelCls}>{t("form.fields.arrivee")}{opt}</label>
              <input className={inputCls} type="text" placeholder={t("form.placeholders.arrivee")} value={form.villeArrivee} onChange={e => set('villeArrivee', e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelCls}>{t("form.fields.marchandise")}</label>
            <div className="flex gap-2 flex-wrap mt-1">
              {marcOpts.map(o => (
                <div key={o} className={chipCls(form.typeMarchandise === o)} onClick={() => set('typeMarchandise', o)}>{o}</div>
              ))}
            </div>
          </div>
          <div>
            <label className={labelCls}>{t("form.fields.sens")}</label>
            <div className="flex gap-2 flex-wrap mt-1">
              {sensOpts.map(o => (
                <div key={o} className={chipCls(form.sens === o)} onClick={() => set('sens', o)}>{o}</div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className={labelCls}>{t("form.fields.frequence")}{opt}</label>
              <div className="flex flex-col gap-1.5 mt-1">
                {freqOpts.map(o => (
                  <div key={o} className={chipCls(form.frequence === o)} onClick={() => set('frequence', o)}>{o}</div>
                ))}
              </div>
            </div>
            <div>
              <label className={labelCls}>{t("form.fields.volume")}{opt}</label>
              <input className={inputCls} type="text" placeholder={t("form.placeholders.volume")} value={form.volume} onChange={e => set('volume', e.target.value)} />
            </div>
          </div>
          <div>
            <label className={labelCls}>{t("form.fields.message")}{opt}</label>
            <textarea className={`${inputCls} resize-y`} rows={2} placeholder={t("form.placeholders.message")} value={form.message} onChange={e => set('message', e.target.value)} />
          </div>
        </div>

      /* ── Step 2: Summary ── */
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
            <input type="checkbox" checked={form.consent} onChange={e => set('consent', e.target.checked)} className="mt-0.5 accent-[#0035A1]" />
            {t("form.consent")}
          </label>
        </div>
      )}

      {/* ── Navigation buttons ── */}
      {!sent && (
        <div className={`flex mt-4 pt-4 border-t border-gray-100 ${step === 0 ? 'justify-end' : 'justify-between'}`}>
          {step > 0 && (
            <button onClick={() => setStep(s => s - 1)}
              className="bg-transparent text-[#4c669a] border border-gray-200 rounded-lg px-4 h-[38px] text-[13px] font-semibold cursor-pointer">
              ← {t("form.btn_back")}
            </button>
          )}
          {step < 2 && (
            <button onClick={() => setStep(s => s + 1)} disabled={step === 0 && !step1Valid}
              className={`text-white border-none rounded-lg px-5 h-[38px] text-[13px] font-bold inline-flex items-center gap-1.5 transition-colors ${step === 0 && !step1Valid ? 'bg-[#93b4f7] cursor-not-allowed' : 'bg-[#0035A1] cursor-pointer'}`}>
              {t("form.btn_continue")} <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
            </button>
          )}
          {step === 2 && (
            <button onClick={() => form.consent && setSent(true)} disabled={!form.consent}
              className={`text-white border-none rounded-lg px-5 h-[38px] text-[13px] font-bold inline-flex items-center gap-1.5 transition-colors ${!form.consent ? 'bg-[#93b4f7] cursor-not-allowed' : 'bg-[#0035A1] cursor-pointer'}`}>
              {t("form.btn_send")} <span className="material-symbols-outlined" style={{ fontSize: 16 }}>send</span>
            </button>
          )}
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════
// TNIHomepage
// ═══════════════════════════════════════════════════════════════════════════
export default function TNIHomepage() {
  const { t, i18n } = useTranslation("common");
  const isRTL = t("dir") === "rtl";

  // Sync <html dir> + <html lang> when language changes
  useEffect(() => {
    document.documentElement.dir  = isRTL ? "rtl" : "ltr";
    document.documentElement.lang = i18n.language;
  }, [i18n.language, isRTL]);

  const atoutItems  = t("atouts.items",   { returnObjects: true }) as { title: string; desc: string }[];
  const serviceItems= t("services.items", { returnObjects: true }) as { title: string; desc: string }[];
  const processSteps= t("process.steps",  { returnObjects: true }) as { title: string; sub: string }[];
  const whyItems    = t("why.items",      { returnObjects: true }) as { title: string; desc: string }[];
  const whyList     = t("why.checklist",  { returnObjects: true }) as string[];
  const offices     = t("contact.offices",{ returnObjects: true }) as { city: string; addr: string }[];

  return (
    <div className="min-h-screen bg-[#f6f6f8] text-[#0d121b] font-sans" dir={isRTL ? "rtl" : "ltr"}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;700;900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');
        * { font-family: 'Inter', sans-serif; box-sizing: border-box; }
        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-style: normal; display: inline-block; line-height: 1; vertical-align: middle;
        }
      `}</style>

      <main className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">

        {/* ══════════════════ HERO ══════════════════ */}
        <section className="py-3 sm:py-4 md:py-5 lg:py-6 2xl:py-8">
          <div
            className="rounded-2xl flex flex-col items-start justify-end
                       min-h-[320px] sm:min-h-[420px] md:min-h-[500px] lg:min-h-[580px] xl:min-h-[640px] 2xl:min-h-[720px]
                       p-6 sm:p-10 md:p-14 lg:p-16 2xl:p-20"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.2) 0%, rgba(16,22,34,0.82) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCNbXOD83dUIP-m2nqwX_aVwx3gJi2icZf0JKx2aZTo6iTelKz514AIMvpQrhG_Sj8fPW8Fhcwwo9v_pJw-EJD17xaxqzn8UzX-0e8BqkBI3K8e5YCiHypYsUpz2_UtIG13yJSIH614F8Q1pEG79OX3S7-58D_2xk1lUFgUS7CFujRdnod8NnS1JHMHDYiKWaceUYmWm7QhJS9dtc91If9c34cUW5wC8eAe7IA7Mf8nS-xIVIUZyi393OkDmDRt1CSZ7x_7SuqkVRY")`,
              backgroundSize: 'cover', backgroundPosition: 'center',
            }}
          >
            <div className="w-full max-w-full sm:max-w-[80%] md:max-w-[640px] lg:max-w-[700px] 2xl:max-w-[800px]">
              <span className="inline-block px-3 py-1 bg-amber-400 text-white text-[10px] sm:text-[11px] font-bold uppercase tracking-[0.15em] rounded mb-3 sm:mb-4">
                {t("hero.badge")}
              </span>
              <h1 className="text-white font-black leading-tight mb-3 sm:mb-4 text-[26px] sm:text-4xl md:text-[40px] lg:text-[50px] xl:text-[56px] 2xl:text-[60px]">
                {t("hero.title")}
              </h1>
              <p className="text-white/90 leading-relaxed mb-6 sm:mb-8 text-sm sm:text-base md:text-[17px] lg:text-xl">
                <span className="font-bold text-amber-400">{t("hero.highlight")}</span>{" "}
                {t("hero.subtitle")}
              </p>
              <div className="flex flex-wrap gap-3 sm:gap-4">
                <button className="bg-[#0035A1] text-white border-none rounded-lg font-bold cursor-pointer px-4 sm:px-6 lg:px-7 h-10 sm:h-11 md:h-12 lg:h-[52px] text-sm md:text-base">
                  {t("hero.cta_primary")}
                </button>
                <button className="bg-white/10 text-white border border-white/20 rounded-lg font-bold cursor-pointer backdrop-blur-sm flex items-center gap-2 px-4 sm:px-6 lg:px-7 h-10 sm:h-11 md:h-12 lg:h-[52px] text-sm md:text-base">
                  <span className="material-symbols-outlined text-[18px] sm:text-[20px]">phone_in_talk</span>
                  {t("hero.cta_secondary")}
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════ ATOUTS ══════════════════ */}
        <div className="pt-10 sm:pt-12 md:pt-16 lg:pt-20 pb-5 sm:pb-6 md:pb-8 lg:pb-10">
          <h2 className="font-black text-2xl sm:text-3xl md:text-[30px] lg:text-[34px] 2xl:text-[38px]">
            {t("atouts.heading")}
          </h2>
          <p className="text-[#4c669a] mt-2 text-sm sm:text-base lg:text-lg">{t("atouts.sub")}</p>
        </div>

        <section className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 2xl:gap-6 pb-10 sm:pb-12 md:pb-16 lg:pb-20">
          {atoutItems.map(({ title, desc }, i) => (
            <div key={i} className={`flex flex-col gap-4 rounded-xl bg-white p-5 sm:p-6 lg:p-7 2xl:p-8 border ${ATOUT_ACCENTS[i] ? 'border-amber-400 border-b-4' : 'border-gray-200'}`}>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center shrink-0 ${ATOUT_ACCENTS[i] ? 'bg-amber-400/10 text-amber-400' : 'bg-[#0035A1]/10 text-[#0035A1]'}`}>
                <span className="material-symbols-outlined">{ATOUT_ICONS[i]}</span>
              </div>
              <div>
                <h3 className="font-bold mb-2 text-[15px] sm:text-base lg:text-[17px]">{title}</h3>
                <p className="text-[#4c669a] leading-relaxed m-0 text-[13px] sm:text-sm">{desc}</p>
              </div>
            </div>
          ))}
        </section>

        {/* ══════════════════ SERVICES ══════════════════ */}
        <section id="services" className="bg-white rounded-3xl mb-6 sm:mb-8 p-6 sm:p-8 md:p-12 lg:p-14 xl:p-16 2xl:p-20">
          <h2 className="font-black text-center text-2xl sm:text-3xl md:text-[30px] lg:text-[34px] 2xl:text-[38px] mb-6 sm:mb-8 md:mb-12 lg:mb-14">
            {t("services.heading")}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 lg:gap-10 2xl:gap-14">
            {serviceItems.map(({ title, desc }, i) => (
              <div key={i} className="flex flex-col gap-4">
                <div className="w-full rounded-xl border border-gray-100" style={{ aspectRatio: '16/9', backgroundImage: `url("${SERVICE_IMGS[i]}")`, backgroundSize: 'cover', backgroundPosition: 'center' }} />
                <div className="px-1">
                  <h4 className="font-bold mb-2 text-lg sm:text-xl lg:text-[22px] 2xl:text-2xl">{title}</h4>
                  <p className="text-[#4c669a] leading-relaxed mb-4 text-[13px] sm:text-sm">{desc}</p>
                  <a href="#" className="text-[#0035A1] font-bold text-sm no-underline inline-flex items-center gap-1">
                    {t("services.learn_more")} <span className="material-symbols-outlined" style={{ fontSize: 16 }}>arrow_forward</span>
                  </a>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ══════════════════ ABOUT ══════════════════ */}
        <section id="about" className="py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12 lg:gap-16 xl:gap-20 items-center">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div>
              <div className="rounded-2xl bg-cover bg-center shadow-[0_4px_24px_rgba(0,0,0,0.12)] mb-3 h-36 sm:h-44 md:h-48 lg:h-56 xl:h-64 2xl:h-72" style={{ backgroundImage: 'url("/Frame-14.png")' }} />
              <div className="p-3 sm:p-4 bg-[rgba(19,91,236,0.05)] rounded-2xl">
                <p className="text-[11px] sm:text-[13px] italic text-[#4c669a] mb-2 leading-relaxed">"{t("about.quote1")}"</p>
                <p className="text-[11px] sm:text-[13px] font-bold m-0">— {t("about.quote1_author")}</p>
              </div>
            </div>
            <div className="pt-10 sm:pt-12">
              <div className="rounded-2xl bg-cover bg-center shadow-[0_4px_24px_rgba(0,0,0,0.12)] mb-3 h-36 sm:h-44 md:h-48 lg:h-56 xl:h-64 2xl:h-72" style={{ backgroundImage: 'url("/Frame-15.png")' }} />
              <div className="p-3 sm:p-4 bg-[rgba(245,158,11,0.05)] rounded-2xl">
                <p className="text-[11px] sm:text-[13px] italic text-[#4c669a] mb-2 leading-relaxed">"{t("about.quote2")}"</p>
                <p className="text-[11px] sm:text-[13px] font-bold m-0">— {t("about.quote2_author")}</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-5 sm:gap-6">
            <div className="inline-block px-4 py-1.5 bg-[rgba(19,91,236,0.1)] text-[#0035A1] text-sm font-bold rounded-full self-start">
              {t("about.badge")}
            </div>
            <h2 className="font-black leading-tight m-0 text-[28px] sm:text-4xl md:text-[36px] lg:text-[42px] xl:text-[48px] 2xl:text-[54px]">
              {t("about.heading_plain")}<span className="text-[#0035A1]">{t("about.heading_accent")}</span>
            </h2>
            <p className="text-[#4c669a] leading-relaxed m-0 text-sm sm:text-base lg:text-[17px] xl:text-lg">{t("about.body")}</p>
            <div className="grid grid-cols-2 gap-4 sm:gap-6 mt-2">
              <div>
                <p className="font-black text-[#0035A1] mb-1 text-[28px] sm:text-[32px] lg:text-[36px] 2xl:text-[42px]">{t("about.stat1_value")}</p>
                <p className="text-sm text-[#4c669a] m-0">{t("about.stat1_label")}</p>
              </div>
              <div>
                <p className="font-black text-amber-400 mb-1 text-[28px] sm:text-[32px] lg:text-[36px] 2xl:text-[42px]">{t("about.stat2_value")}</p>
                <p className="text-sm text-[#4c669a] m-0">{t("about.stat2_label")}</p>
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════ PROCESS ══════════════════ */}
        <section id="process" className="py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24 border-t border-gray-200">
          <h2 className="font-black text-center text-2xl sm:text-3xl md:text-[30px] lg:text-[34px] 2xl:text-[38px] mb-8 sm:mb-10 md:mb-14 lg:mb-16">
            {t("process.heading")}
          </h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 sm:gap-5 lg:gap-6 2xl:gap-8 relative">
            <div className="hidden md:block absolute top-[30px] lg:top-[36px] 2xl:top-[40px] left-0 w-full h-0.5 bg-gray-200 z-0" />
            {processSteps.map(({ title, sub }, i) => {
              const { filled, accent } = STEP_STYLES[i];
              return (
                <div key={i} className="flex flex-col items-center text-center gap-3 sm:gap-4 relative z-10">
                  <div
                    className="rounded-full flex items-center justify-center font-bold shadow-[0_4px_16px_rgba(0,0,0,0.12)] w-12 h-12 text-base sm:w-14 sm:h-14 sm:text-lg lg:w-16 lg:h-16 lg:text-xl 2xl:w-[72px] 2xl:h-[72px] 2xl:text-[22px]"
                    style={{
                      background: accent ? '#f59e0b' : filled ? '#0035A1' : '#fff',
                      border: filled || accent ? 'none' : '4px solid #0035A1',
                      color: filled || accent ? '#fff' : '#0035A1',
                      outline: '8px solid #f6f6f8',
                    }}
                  >{i + 1}</div>
                  <div>
                    <h5 className="font-bold m-0 mb-1 text-[12px] sm:text-[13px] lg:text-[14px] 2xl:text-[15px]">{title}</h5>
                    <p className="text-[#4c669a] m-0 text-[10px] sm:text-[11px] lg:text-[12px] 2xl:text-[13px]">{sub}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* ══════════════════ WHY CHOOSE ══════════════════ */}
        <section className="py-8 sm:py-10 md:py-12 lg:py-14 xl:py-16">
          <div className="bg-[#232D40] rounded-3xl text-white p-6 sm:p-8 md:p-10 lg:p-14 xl:p-16 2xl:p-20">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-10 lg:gap-16 xl:gap-20 items-center">
              <div>
                <h2 className="font-black mb-6 text-2xl sm:text-3xl lg:text-[34px] xl:text-[36px] 2xl:text-[38px]">
                  {t("why.heading")}
                </h2>
                <ul className="list-none p-0 m-0 flex flex-col gap-5 sm:gap-6">
                  {whyItems.map(({ title, desc }, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="material-symbols-outlined text-amber-400 shrink-0 mt-0.5">{WHY_ICONS[i]}</span>
                      <div>
                        <p className="font-bold mb-1 m-0 text-[14px] sm:text-[15px] lg:text-base">{title}</p>
                        <p className="text-white/60 m-0 text-[13px] sm:text-sm leading-relaxed">{desc}</p>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-white/5 rounded-2xl border border-white/10 p-5 sm:p-6 md:p-7 lg:p-8 xl:p-10">
                <div className="flex justify-between mb-6 sm:mb-8 pb-4 border-b border-white/10">
                  <span className="font-bold text-amber-400 text-sm sm:text-base">{t("why.tni_label")}</span>
                  <span className="text-gray-500 line-through text-sm sm:text-base">{t("why.competitor_label")}</span>
                </div>
                {whyList.map(item => (
                  <div key={item} className="flex items-center gap-3 mb-4">
                    <span className="material-symbols-outlined text-green-500">check_circle</span>
                    <span className="text-[14px] sm:text-[15px]">{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ══════════════════ CONTACT ══════════════════ */}
        <section id="contact" className="py-10 sm:py-12 md:py-16 lg:py-20 xl:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-8 lg:gap-14 xl:gap-20">
            <MultiStepForm />
            <div className="flex flex-col justify-center gap-8 sm:gap-10 border-t border-gray-200 pt-8 md:border-t-0 md:pt-0 md:border-l md:border-gray-200 md:pl-8 lg:pl-12 xl:pl-16">
              <div>
                <h3 className="font-bold mb-4 text-base sm:text-lg lg:text-xl 2xl:text-[22px]">{t("contact.phone_heading")}</h3>
                <div className="flex items-center gap-4 text-[#0035A1]">
                  <span className="material-symbols-outlined text-[28px] sm:text-[34px] lg:text-[40px] 2xl:text-[44px]">call</span>
                  <div>
                    <p className="font-black mb-1 m-0 text-xl sm:text-2xl lg:text-[24px] 2xl:text-[26px]">{t("contact.phone_number")}</p>
                    <p className="text-sm text-[#4c669a] m-0">{t("contact.phone_hours")}</p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold mb-4 text-base sm:text-lg lg:text-xl 2xl:text-[22px]">{t("contact.offices_heading")}</h3>
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