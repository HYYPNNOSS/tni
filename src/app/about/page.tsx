"use client"
import { useState } from "react";

export default function TNIAbout() {
  const [activeReview, setActiveReview] = useState(0);

  const reviews = [
    { name: 'Rachid B.', role: 'Directeur Logistique', review: 'En pleine campagne de clémentines, TNI Group a géré un pic de 40 camions en une semaine sans un seul retard documentaire.', avatar: 'R' },
    { name: 'Sofia M.', role: 'Responsable Supply Chain', review: "Je reçois une alerte dès qu'il y a le moindre aléa douanier, avant même d'avoir à poser la question. Un vrai partenaire.", avatar: 'S' },
    { name: 'Karim A.', role: 'Gérant', review: 'On est une PME, pas un grand compte. Mais chez TNI Group, on est traités avec autant de sérieux que les gros.', avatar: 'K' },
    { name: 'Nadia T.', role: 'Export Manager', review: "La chaîne du froid respectée à 100%, de Taroudant jusqu'à Rungis. Aucune perte de marchandise en 18 mois.", avatar: 'N' },
    { name: 'Youssef E.', role: 'Directeur Commercial', review: 'TNI a résolu en une journée un blocage douanier qui nous paralysait depuis 4 jours. Maîtrise exceptionnelle.', avatar: 'Y' },
    { name: 'Leila H.', role: 'CEO', review: 'Même avec de petits volumes, on a eu droit à un interlocuteur dédié et un vrai suivi. TNI Group a su grandir avec nous.', avatar: 'L' },
  ];

  return (
    <div className="min-h-screen bg-[#f8f8f6] text-[#1a1c2e]" style={{ fontFamily: "'Inter', sans-serif" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap');

        *, *::before, *::after { box-sizing: border-box; }

        .material-symbols-outlined {
          font-family: 'Material Symbols Outlined';
          font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
          font-style: normal;
          display: inline-block;
          line-height: 1;
          vertical-align: middle;
        }

        .value-card { transition: border-color 0.2s, transform 0.2s; }
        .value-card:hover { border-color: #eccb13 !important; transform: translateY(-2px); }
        .cta-card { transition: background 0.2s, transform 0.2s; }
        .cta-card:hover { background: #eccb13 !important; transform: translateY(-2px); }
        .cta-card:hover .cta-icon { color: #1a1c2e !important; }
        .cta-card:hover .cta-label { color: #1a1c2e !important; }
        .cta-card:hover .cta-sub { color: rgba(28,24,13,0.65) !important; }
        .founder-card { transition: box-shadow 0.2s, transform 0.2s; }
        .founder-card:hover { box-shadow: 0 8px 40px rgba(0,0,0,0.12) !important; transform: translateY(-2px); }
      `}</style>

      <main className="max-w-[1440px] mx-auto
                       px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24
                       py-5 sm:py-6 md:py-8 lg:py-10 2xl:py-12
                       flex flex-col gap-12 sm:gap-16 md:gap-20 lg:gap-24 2xl:gap-28">

        {/* ── Hero ── */}
        <section>
          <div
            className="flex flex-col items-start justify-end rounded-2xl overflow-hidden
                       min-h-[300px] sm:min-h-[400px] md:min-h-[480px] lg:min-h-[540px] 2xl:min-h-[620px]
                       px-6 sm:px-10 md:px-14 lg:px-16 2xl:px-20
                       py-8 sm:py-10 md:py-12 lg:py-14 2xl:py-16"
            style={{
              backgroundImage: `linear-gradient(rgba(0,0,0,0.2) 0%, rgba(16,22,34,0.88) 100%), url("https://lh3.googleusercontent.com/aida-public/AB6AXuCNbXOD83dUIP-m2nqwX_aVwx3gJi2icZf0JKx2aZTo6iTelKz514AIMvpQrhG_Sj8fPW8Fhcwwo9v_pJw-EJD17xaxqzn8UzX-0e8BqkBI3K8e5YCiHypYsUpz2_UtIG13yJSIH614F8Q1pEG79OX3S7-58D_2xk1lUFgUS7CFujRdnod8NnS1JHMHDYiKWaceUYmWm7QhJS9dtc91If9c34cUW5wC8eAe7IA7Mf8nS-xIVIUZyi393OkDmDRt1CSZ7x_7SuqkVRY")`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            <div className="max-w-[680px] z-10">
              <span className="inline-block px-3 py-1 bg-[#135bec] text-white
                               text-[11px] font-bold uppercase tracking-[0.15em] rounded mb-4">
                Notre Histoire
              </span>
              <h1 className="text-white font-black leading-tight mb-4
                             text-[26px] sm:text-4xl md:text-[42px] lg:text-[50px] 2xl:text-[58px]">
                Deux Experts,<br />Une Vision Commune
              </h1>
              <p className="text-white/90 mb-7 leading-relaxed
                            text-sm sm:text-base md:text-[17px] lg:text-lg">
                <span className="font-bold text-[#135bec]">TNI Group allie stratégie internationale et expertise terrain.</span>{' '}
                Une approche humaine pour révolutionner la logistique Maroc-Europe.
              </p>
              <button className="bg-white/10 text-white border border-white/25 rounded-lg
                                 backdrop-blur-sm font-bold cursor-pointer
                                 inline-flex items-center gap-2
                                 px-5 sm:px-6 h-11 sm:h-12 text-sm sm:text-base">
                Notre approche <span className="material-symbols-outlined" style={{ fontSize: 18 }}>arrow_forward</span>
              </button>
            </div>
          </div>
        </section>

        {/* ── Founders ── */}
        <section>
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="font-black mb-3
                           text-xl sm:text-2xl md:text-[26px] lg:text-[30px] 2xl:text-[34px]">
              Rencontrez les Fondateurs
            </h2>
            <div className="h-1 w-16 bg-[#eccb13] mx-auto" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2
                          gap-5 sm:gap-6 md:gap-8 lg:gap-10 2xl:gap-14">
            {[
              { name: 'Inès Sudres', role: 'Stratégie & Logistique Internationale', quote: '"La logistique est un jeu de précision. Mon rôle est de transformer la complexité douanière en un parcours fluide pour nos partenaires."', exp: "8 ans d'expérience stratégique", expIcon: 'verified', img: '/Frame-14.png' },
              { name: 'Zerrif Nasredine', role: 'Opérations & Terrain', quote: '"Le terrain ne ment jamais. Après 200 trajets, j\'ai appris que la réactivité est la seule réponse face à l\'imprévu."', exp: '7 ans & 200+ trajets terrain', expIcon: 'distance', img: '/Frame-15.png' },
            ].map((f) => (
              <div key={f.name} className="founder-card bg-white rounded-2xl border border-gray-100
                                           shadow-[0_4px_20px_rgba(0,0,0,0.05)]
                                           p-5 sm:p-6 lg:p-8 2xl:p-10">
                <div className="flex gap-4 sm:gap-5 mb-5 items-start flex-wrap">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 lg:w-24 lg:h-24 rounded-full overflow-hidden
                                  border-[3px] border-[rgba(236,203,19,0.3)] shrink-0">
                    <img src={f.img} alt={f.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-black mb-1
                                   text-base sm:text-lg lg:text-xl 2xl:text-[22px]">{f.name}</h3>
                    <p className="text-[#eccb13] font-bold uppercase tracking-[0.08em] m-0
                                  text-[10px] sm:text-[11px]">{f.role}</p>
                  </div>
                </div>
                <p className="text-gray-500 italic mb-5 leading-relaxed
                              text-[12px] sm:text-[13px] lg:text-sm 2xl:text-[15px]">{f.quote}</p>
                <div className="flex items-center gap-2 font-semibold text-[#374151]
                                bg-gray-50 rounded-lg px-3 py-2.5
                                text-[12px] sm:text-[13px]">
                  <span className="material-symbols-outlined text-[#eccb13]" style={{ fontSize: 18 }}>{f.expIcon}</span>
                  {f.exp}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Expertise ── */}
        <section>
          <div className="mb-8 sm:mb-10">
            <h2 className="font-black mb-1
                           text-xl sm:text-2xl md:text-[26px] lg:text-[30px] 2xl:text-[34px]">
              Notre Expertise
            </h2>
            <p className="text-gray-400 text-sm">Six domaines où TNI Group fait la différence</p>
          </div>
          <div className="rounded-2xl overflow-hidden border border-gray-100
                          grid grid-cols-2 md:grid-cols-3"
               style={{ gap: 1, background: '#f3f4f6' }}>
            {[
              { icon: 'local_shipping', title: 'Transport Routier Maroc–Europe', stat: '500+ trajets/an' },
              { icon: 'inventory_2',    title: 'Gestion Douanière',               stat: '0 blocage non résolu' },
              { icon: 'ac_unit',        title: 'Froid & Périssables',             stat: 'Traçabilité temps réel' },
              { icon: 'groups',         title: 'Dédié PME & ETI',                 stat: '5 = 50 palettes' },
              { icon: 'schedule',       title: 'Pics Saisonniers',                stat: 'Flexibilité garantie' },
              { icon: 'analytics',      title: 'Visibilité & Reporting',          stat: 'Dashboard dédié' },
            ].map(({ icon, title, stat }) => (
              <div key={title} className="bg-white flex items-center gap-3 sm:gap-4
                                          p-4 sm:p-5 lg:p-6 2xl:p-7">
                <span className="material-symbols-outlined text-[#eccb13] shrink-0
                                 text-[20px] sm:text-[24px] lg:text-[28px]">{icon}</span>
                <div className="min-w-0">
                  <p className="font-bold text-[#111827] m-0 mb-0.5
                                text-[11px] sm:text-[12px] lg:text-[13px] 2xl:text-[14px]">{title}</p>
                  <p className="text-gray-400 m-0 text-[10px] sm:text-[11px] lg:text-[12px]">{stat}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Ils vous ressemblent ── */}
        <section className="border-t-[3px] border-[#eccb13] pt-10 sm:pt-12 md:pt-14
                            grid grid-cols-1 md:grid-cols-2
                            gap-8 sm:gap-10 md:gap-12 lg:gap-16 2xl:gap-20
                            items-center">
          <div>
            <span className="block text-[11px] font-bold tracking-[0.12em] uppercase text-[#eccb13] mb-3">
              Ils vous ressemblent
            </span>
            <h2 className="font-black text-[#111827] mb-4 leading-snug
                           text-xl sm:text-2xl md:text-[26px] lg:text-[30px] 2xl:text-[34px]">
              Vous gérez un corridor Maroc–Europe au quotidien ?
            </h2>
            <p className="text-gray-500 leading-relaxed m-0
                          text-[13px] sm:text-sm lg:text-[15px]">
              Douanes imprévisibles, produits périssables, délais intransigeants, pics saisonniers — découvrez comment des entreprises comme la vôtre ont vaincu ces défis avec TNI Group.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 sm:gap-3">
            {["PME exportatrices d'agrumes", 'Industriels agroalimentaires', 'Distributeurs spécialisés B2B'].map((item, i) => (
              <div key={item} className="flex items-center gap-3 sm:gap-4 rounded-xl border border-gray-100
                                         px-4 sm:px-5 py-3 sm:py-4"
                   style={{ background: i === 0 ? '#1a1c2e' : '#f9fafb' }}>
                <span className="material-symbols-outlined shrink-0" style={{ fontSize: 18, color: i === 0 ? '#eccb13' : '#9ca3af' }}>check_circle</span>
                <span className="font-semibold text-[13px] sm:text-sm lg:text-[15px]"
                      style={{ color: i === 0 ? '#fff' : '#374151' }}>{item}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ── Valeurs ── */}
        <section>
          <div className="mb-8 sm:mb-10">
            <h2 className="font-black mb-1
                           text-xl sm:text-2xl md:text-[26px] lg:text-[30px] 2xl:text-[34px]">
              Nos Valeurs Cardinales
            </h2>
            <p className="text-gray-400 text-sm">Ce qui guide chacun de nos chargements</p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5
                          gap-3 sm:gap-4 lg:gap-5 2xl:gap-6">
            {[
              { icon: 'visibility',   title: 'Transparence',      desc: 'Aucun frais caché, géolocalisation temps réel.' },
              { icon: 'support_agent',title: 'Personnalisé',      desc: 'Un interlocuteur unique, une voix qui vous connaît.' },
              { icon: 'verified_user',title: 'Professionnalisme', desc: 'Rigueur administrative et conformité totale.' },
              { icon: 'translate',    title: 'Multilinguisme',    desc: 'Nous parlons votre langue et celle de vos partenaires.' },
              { icon: 'diversity_3',  title: 'Parité',            desc: "Autant de femmes que d'hommes — notre force collective." },
            ].map(({ icon, title, desc }) => (
              <div key={title} className="value-card bg-white rounded-xl border border-gray-100
                                          p-4 sm:p-5 lg:p-6">
                <span className="material-symbols-outlined text-[#eccb13] block mb-2.5
                                 text-[22px] sm:text-[24px] lg:text-[26px] 2xl:text-[28px]">{icon}</span>
                <p className="font-bold text-[#111827] m-0 mb-1
                              text-[12px] sm:text-[13px] lg:text-sm">{title}</p>
                <p className="text-gray-400 leading-snug m-0
                              text-[11px] sm:text-[12px]">{desc}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── Engagement ── */}
        <section className="bg-[#1a1c2e] rounded-2xl
                            px-6 sm:px-10 md:px-12 lg:px-14 2xl:px-16
                            py-8 sm:py-10 md:py-12 lg:py-14 2xl:py-16">
          <div className="grid grid-cols-1 md:grid-cols-2
                          gap-8 sm:gap-10 md:gap-12 lg:gap-16 2xl:gap-20
                          items-center">
            <div>
              <p className="text-[11px] font-bold tracking-[0.12em] uppercase text-[#eccb13] mb-3">
                Notre philosophie
              </p>
              <h2 className="font-bold italic text-white leading-snug mb-4
                             text-[18px] sm:text-xl md:text-[22px] lg:text-[26px] 2xl:text-[28px]">
                "Les PME méritent une logistique de classe mondiale."
              </h2>
              <p className="text-white/50 leading-relaxed m-0
                            text-[13px] sm:text-sm lg:text-[15px]">
                5 palettes ou 100 — la rigueur opérationnelle ne dépend pas de la taille de votre compte.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {[
                { icon: 'schedule',   label: 'H24 / 7j·7' },
                { icon: 'bolt',       label: 'Réponse 15 min' },
                { icon: 'person',     label: 'Interlocuteur unique' },
                { icon: 'visibility', label: 'Zéro frais cachés' },
              ].map(({ icon, label }) => (
                <div key={label} className="flex items-center gap-2.5 rounded-xl bg-white/5
                                            px-3 sm:px-4 py-3 sm:py-4">
                  <span className="material-symbols-outlined text-[#eccb13] shrink-0" style={{ fontSize: 18 }}>{icon}</span>
                  <span className="font-semibold text-white leading-snug
                                   text-[11px] sm:text-[12px] lg:text-[13px]">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Vision Roadmap ── */}
        <section>
          <div className="text-center mb-10 sm:mb-12 md:mb-14">
            <h2 className="font-black
                           text-xl sm:text-2xl md:text-[26px] lg:text-[30px] 2xl:text-[34px]">
              Vision &amp; Futur
            </h2>
          </div>
          <div className="relative py-8 sm:py-10">
            <div className="hidden sm:block absolute top-[50%] left-0 w-full h-1 bg-gray-100 -translate-y-1/2 z-0" />
            <div className="grid grid-cols-1 sm:grid-cols-3
                            gap-6 sm:gap-8 lg:gap-10 2xl:gap-14
                            relative z-10">
              {[
                { year: '2026', label: 'Doublement Flotte', icon: 'local_shipping', highlight: false },
                { year: '2027', label: 'Hub Europe Est',    icon: 'warehouse',      highlight: false },
                { year: '2030', label: 'CO₂ –50%',         icon: 'eco',            highlight: true  },
              ].map(({ year, label, icon, highlight }) => (
                <div key={year} className="text-center">
                  <div className="rounded-full border-4 border-[#f8f8f6] mx-auto mb-3 flex items-center justify-center
                                  w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14"
                       style={{ background: highlight ? '#16a34a' : '#eccb13' }}>
                    <span className="material-symbols-outlined text-white
                                     text-[18px] sm:text-[20px] lg:text-[22px]">{icon}</span>
                  </div>
                  <h6 className="font-black mb-1
                                 text-[20px] sm:text-[22px] lg:text-[26px] 2xl:text-[28px]"
                      style={{ color: highlight ? '#16a34a' : '#111827' }}>{year}</h6>
                  <p className="font-bold uppercase tracking-[0.08em] m-0 text-[10px] sm:text-[11px]"
                     style={{ color: highlight ? '#16a34a' : '#9ca3af' }}>{label}</p>
                  {highlight && (
                    <p className="text-[#4b5563] mt-1.5 text-[11px] sm:text-[12px]">
                      Réduction de nos émissions CO₂ d'ici 2030
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Avis clients ── */}
        <section>
          <div className="mb-8 sm:mb-10">
            <h2 className="font-black mb-1
                           text-xl sm:text-2xl md:text-[26px] lg:text-[30px] 2xl:text-[34px]">
              Ce que disent nos clients
            </h2>
            <p className="text-gray-400 text-sm">Des partenaires sur le corridor Maroc–Europe</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3
                          gap-3 sm:gap-4 lg:gap-5 2xl:gap-6">
            {reviews.map(({ name, role, review, avatar }) => (
              <div key={name} className="bg-white rounded-xl border border-gray-100 flex flex-col gap-2.5
                                          p-4 sm:p-5 lg:p-6">
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="material-symbols-outlined text-[#eccb13]" style={{ fontSize: 13 }}>star</span>
                  ))}
                </div>
                <p className="text-gray-600 leading-relaxed m-0 flex-1
                              text-[12px] sm:text-[13px] lg:text-sm">"{review}"</p>
                <div className="flex items-center gap-2.5 pt-2.5 border-t border-gray-50">
                  <div className="w-8 h-8 rounded-full bg-[#1a1c2e] flex items-center justify-center
                                  text-[#eccb13] font-black text-[12px] shrink-0">
                    {avatar}
                  </div>
                  <div>
                    <p className="font-bold text-[#111827] m-0 text-[13px]">{name}</p>
                    <p className="text-gray-400 m-0 text-[11px]">{role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Final CTA ── */}
        <section className="pb-4 sm:pb-6 md:pb-8 lg:pb-10 2xl:pb-12">
          <div className="bg-white rounded-[28px] border border-gray-100 shadow-[0_8px_40px_rgba(0,0,0,0.07)]
                          text-center
                          px-6 sm:px-10 md:px-14 lg:px-16 2xl:px-20
                          py-10 sm:py-12 md:py-14 lg:py-16 2xl:py-20">
            <h2 className="font-black mb-4
                           text-2xl sm:text-3xl md:text-[32px] lg:text-[36px] 2xl:text-[40px]">
              Parlons de votre projet
            </h2>
            <p className="text-gray-400 mb-10 max-w-[440px] mx-auto
                          text-[14px] sm:text-[15px] lg:text-base">
              Inès et Zerrif sont à votre écoute pour concevoir votre prochaine chaîne logistique.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3
                            gap-3 sm:gap-4 lg:gap-5 2xl:gap-7">
              {[
                { icon: 'call',  label: 'Téléphone', sub: 'Réponse immédiate', href: 'tel:#' },
                { icon: 'mail',  label: 'Email',     sub: 'Sous 2 heures',     href: 'mailto:#' },
                { icon: 'forum', label: 'WhatsApp',  sub: 'Conseil direct',    href: '#' },
              ].map(({ icon, label, sub, href }) => (
                <a key={label} href={href} className="cta-card flex flex-col items-center rounded-2xl
                                                       p-5 sm:p-6 lg:p-7 2xl:p-8
                                                       no-underline text-[#1c180d]"
                   style={{ background: '#f8f8f6' }}>
                  <span className="material-symbols-outlined cta-icon text-[#eccb13] mb-3
                                   text-[28px] sm:text-[32px] lg:text-[36px]"
                        style={{ transition: 'color 0.2s' }}>{icon}</span>
                  <span className="cta-label font-bold mb-1 block
                                   text-[13px] sm:text-sm lg:text-[15px]"
                        style={{ transition: 'color 0.2s' }}>{label}</span>
                  <span className="cta-sub text-gray-400 text-[12px] sm:text-[13px]"
                        style={{ transition: 'color 0.2s' }}>{sub}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

      </main>
    </div>
  );
}