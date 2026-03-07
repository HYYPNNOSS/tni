"use client"
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import "@/lib/i18n";

const LANG_LABELS: Record<string, string> = { fr: "FR", en: "EN", ar: "AR", es: "ES" };
const LANG_FLAGS:  Record<string, string> = { fr: "🇫🇷", en: "🇬🇧", ar: "🇲🇦", es: "🇪🇸" };

export default function Navbar() {
  const { t, i18n } = useTranslation("common");

  const [mobileOpen, setMobile]  = useState(false);
  const [langOpen,   setLangOpen] = useState(false);
  const [scrolled,   setScrolled] = useState(false);

  // ── Refs for outside-click detection ─────────────────────────────────────
  const desktopLangRef = useRef<HTMLDivElement>(null);
  const mobileLangRef  = useRef<HTMLDivElement>(null);

  const lang  = i18n.language || "fr";
  const isRTL = t("dir") === "rtl";

  const navLinks = [
    { key: "services", href: "services" },
    { key: "about",    href: "about"    },
    { key: "blog",     href: "blog"     },
    { key: "contact",  href: "contact"  },
  ];

  const changeLang = (l: string) => {
    i18n.changeLanguage(l);
    document.documentElement.dir  = l === "ar" ? "rtl" : "ltr";
    document.documentElement.lang = l;
    setLangOpen(false);
    setMobile(false);
  };

  // ── Shadow on scroll ──────────────────────────────────────────────────────
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ── Close dropdown only when clicking OUTSIDE the lang picker ────────────
  // Using mousedown (fires before click) and checking ref containment
  useEffect(() => {
    const handleMouseDown = (e: MouseEvent) => {
      const target = e.target as Node;
      const insideDesktop = desktopLangRef.current?.contains(target);
      const insideMobile  = mobileLangRef.current?.contains(target);
      if (!insideDesktop && !insideMobile) {
        setLangOpen(false);
      }
    };
    document.addEventListener("mousedown", handleMouseDown);
    return () => document.removeEventListener("mousedown", handleMouseDown);
  }, []);

  return (
    <header
      dir={isRTL ? "rtl" : "ltr"}
      className={`sticky top-0 z-50 w-full transition-all duration-300
        ${scrolled
          ? "bg-white backdrop-blur-xl shadow-[0_2px_24px_rgba(13,18,27,0.08)] border-b border-gray-100"
          : "bg-white backdrop-blur-md border-b border-gray-100/60"
        }`}
    >
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-16 xl:px-20 2xl:px-24">
        <div className={`flex items-center justify-between h-14 sm:h-16 lg:h-[68px] ${isRTL ? "flex-row-reverse" : ""}`}>

          {/* ── Brand ── */}
          <a href="/" className="flex items-center gap-2.5 no-underline group shrink-0">
            
            <span className="text-[17px] sm:text-[18px] lg:text-[19px] font-black text-[#0d121b] tracking-[-0.02em]
                             group-hover:text-[#135bec] transition-colors duration-200">
              {t("navbar.brand")}
            </span>
          </a>

          {/* ── Desktop Nav ── */}
          <nav className={`hidden md:flex items-center gap-1 lg:gap-1.5 ${isRTL ? "flex-row-reverse" : ""}`}>
            {navLinks.map(({ key, href }) => (
              <a
                key={key}
                href={`/${href}`}
                className="relative px-3 lg:px-4 py-2 text-[13px] lg:text-[14px] font-medium text-[#4c5568]
                           hover:text-[#135bec] transition-colors duration-200 rounded-lg hover:bg-[#135bec]/5
                           no-underline group"
              >
                {t(`navbar.nav.${key}`)}
                <span className="absolute bottom-1 left-3 right-3 lg:left-4 lg:right-4 h-[2px] rounded-full
                                 bg-[#135bec] scale-x-0 group-hover:scale-x-100
                                 transition-transform duration-200 origin-center" />
              </a>
            ))}
          </nav>

          {/* ── Desktop Right: Lang picker + CTA ── */}
          <div className={`hidden md:flex items-center gap-2 lg:gap-3 ${isRTL ? "flex-row-reverse" : ""}`}>

            {/* Desktop language picker — ref attached here */}
            <div ref={desktopLangRef} className="relative">
              <button
                onClick={() => setLangOpen(o => !o)}
                className="flex items-center gap-1.5 px-2.5 lg:px-3 py-1.5 rounded-lg border border-gray-200
                           text-[12px] lg:text-[13px] font-semibold text-[#4c5568]
                           hover:border-[#135bec] hover:text-[#135bec] hover:bg-[#135bec]/5
                           transition-all duration-200 cursor-pointer bg-white"
              >
                <span>{LANG_FLAGS[lang]}</span>
                <span>{LANG_LABELS[lang]}</span>
                <svg
                  className={`w-3 h-3 transition-transform duration-200 ${langOpen ? "rotate-180" : ""}`}
                  viewBox="0 0 12 12" fill="none"
                >
                  <path d="M2 4 L6 8 L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>

              {langOpen && (
                <div className="absolute top-full mt-1.5 right-0 w-36 bg-white rounded-xl
                                border border-gray-100 shadow-[0_8px_32px_rgba(13,18,27,0.12)]
                                overflow-hidden z-50 py-1">
                  {Object.keys(LANG_LABELS).map(l => (
                    <button
                      key={l}
                      onClick={() => changeLang(l)}
                      className={`w-full flex items-center gap-2.5 px-3.5 py-2.5 text-[13px] font-medium
                                  cursor-pointer transition-colors duration-150 text-left
                                  ${lang === l
                                    ? "bg-[#135bec]/[0.08] text-[#135bec] font-semibold"
                                    : "text-[#4c5568] hover:bg-gray-50 hover:text-[#0d121b]"
                                  }`}
                    >
                      <span className="text-base">{LANG_FLAGS[l]}</span>
                      <span>{LANG_LABELS[l]}</span>
                      {lang === l && (
                        <svg className="w-3.5 h-3.5 ml-auto text-[#135bec]" viewBox="0 0 14 14" fill="none">
                          <path d="M2 7 L6 11 L12 3" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* CTA */}
            <button className="flex items-center gap-2 bg-[#135bec] text-white border-none rounded-lg
                               px-4 lg:px-5 h-9 lg:h-10 text-[13px] lg:text-[14px] font-bold cursor-pointer
                               shadow-[0_2px_8px_rgba(19,91,236,0.3)]
                               hover:bg-[#0f4fd4] hover:shadow-[0_4px_16px_rgba(19,91,236,0.4)]
                               active:scale-[0.98] transition-all duration-200 whitespace-nowrap">
              {t("navbar.cta")}
            </button>
          </div>

          {/* ── Mobile: Lang + Hamburger ── */}
          <div className={`flex md:hidden items-center gap-2 ${isRTL ? "flex-row-reverse" : ""}`}>

            {/* Mobile language picker — ref attached here */}
            <div ref={mobileLangRef} className="relative">
              <button
                onClick={() => setLangOpen(o => !o)}
                className="flex items-center gap-1 px-2 py-1.5 rounded-lg border border-gray-200
                           text-[12px] font-semibold text-[#4c5568] bg-white cursor-pointer"
              >
                <span>{LANG_FLAGS[lang]}</span>
                <span>{LANG_LABELS[lang]}</span>
              </button>
              {langOpen && (
                <div className="absolute top-full mt-1.5 right-0 w-32 bg-white rounded-xl
                                border border-gray-100 shadow-[0_8px_32px_rgba(13,18,27,0.12)]
                                overflow-hidden z-50 py-1">
                  {Object.keys(LANG_LABELS).map(l => (
                    <button
                      key={l}
                      onClick={() => changeLang(l)}
                      className={`w-full flex items-center gap-2 px-3 py-2 text-[12px] font-medium
                                  cursor-pointer transition-colors duration-150
                                  ${lang === l
                                    ? "bg-[#135bec]/[0.08] text-[#135bec]"
                                    : "text-[#4c5568] hover:bg-gray-50"}`}
                    >
                      <span>{LANG_FLAGS[l]}</span>
                      <span>{LANG_LABELS[l]}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Hamburger */}
            <button
              onClick={() => setMobile(o => !o)}
              className="w-9 h-9 flex flex-col items-center justify-center gap-[5px] rounded-lg
                         hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              aria-label="Toggle menu"
            >
              <span className={`block w-[18px] h-[2px] bg-[#0d121b] rounded-full transition-all duration-300 ${mobileOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
              <span className={`block w-[18px] h-[2px] bg-[#0d121b] rounded-full transition-all duration-300 ${mobileOpen ? "opacity-0 scale-x-0" : ""}`} />
              <span className={`block w-[18px] h-[2px] bg-[#0d121b] rounded-full transition-all duration-300 ${mobileOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
            </button>
          </div>
        </div>

        {/* ── Mobile Menu ── */}
        <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out
                         ${mobileOpen ? "max-h-[400px] opacity-100 pb-4" : "max-h-0 opacity-0"}`}>
          <div className={`flex flex-col gap-1 pt-2 border-t border-gray-100 ${isRTL ? "items-end" : "items-start"}`}>
            {navLinks.map(({ key, href }) => (
              <a
                key={key}
                href={`/${href}`}
              
                onClick={() => setMobile(false)}
                className={`w-full px-3 py-2.5 text-[14px] font-medium text-[#4c5568]
                            hover:text-[#135bec] hover:bg-[#135bec]/5 rounded-lg
                            no-underline transition-colors duration-150
                            ${isRTL ? "text-right" : "text-left"}`}
              >
                {t(`navbar.nav.${key}`)}
              </a>
            ))}
            <button className="w-full mt-2 bg-[#135bec] text-white border-none rounded-lg
                               px-4 h-10 text-[14px] font-bold cursor-pointer
                               shadow-[0_2px_8px_rgba(19,91,236,0.3)]
                               hover:bg-[#0f4fd4] transition-all duration-200">
              {t("navbar.cta")}
            </button>
          </div>
        </div>

      </div>
    </header>
  );
}