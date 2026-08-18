"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ArrowRight } from "lucide-react";
import { contact } from "@/lib/data";
import MagneticButton from "./MagneticButton";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { lang, toggleLang } = useLanguage();
  const tr = t[lang].nav;

  const links = [
    { href: "#about",    label: tr.about },
    { href: "#projects", label: tr.projects },
    { href: "#skills",   label: tr.skills },
    { href: "#services", label: tr.services },
    { href: "#contact",  label: tr.contact },
  ];

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleLinkClick = () => setMenuOpen(false);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || menuOpen ? "glass-strong" : "bg-transparent"
      }`}
    >
      <nav className="mx-auto max-w-6xl px-6 md:px-10 h-16 flex items-center justify-between">
        <a href="#" className="font-display font-bold text-mist-100 tracking-tight">
          NP<span className="text-gold-500"></span>
        </a>

        <ul className="hidden md:flex items-center gap-8">
          {links.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className="nav-underline eyebrow text-mist-400 hover:text-gold-400 transition-colors"
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="hidden md:flex items-center gap-3">
          {/* Language toggle */}
          <button
            onClick={toggleLang}
            aria-label="Toggle language"
            className="flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-mono tracking-widest hover:border-gold-400/40 transition-colors"
          >
            <motion.span
              key={lang + "-id"}
              animate={{ opacity: lang === "id" ? 1 : 0.35 }}
              className={lang === "id" ? "text-gold-400" : "text-mist-400"}
            >
              ID
            </motion.span>
            <span className="text-mist-600 mx-0.5">|</span>
            <motion.span
              key={lang + "-en"}
              animate={{ opacity: lang === "en" ? 1 : 0.35 }}
              className={lang === "en" ? "text-gold-400" : "text-mist-400"}
            >
              EN
            </motion.span>
          </button>

          <MagneticButton strength={0.25}>
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full bg-gold-500 px-5 py-2 text-sm font-semibold text-ink-950 hover:bg-gold-400 transition-colors"
            >
              LET&apos;S TALK <ArrowRight size={15} />
            </a>
          </MagneticButton>
        </div>

        {/* mobile menu toggle */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden text-mist-100 p-2 -mr-2"
          aria-label={menuOpen ? "Tutup menu" : "Buka menu"}
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* mobile menu panel */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="md:hidden overflow-hidden glass-strong border-t border-white/10"
          >
            <ul className="flex flex-col px-6 py-4 gap-1">
              {links.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={handleLinkClick}
                    className="block py-3 text-mist-200 hover:text-gold-400 transition-colors border-b border-white/5"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div className="px-6 pb-5 flex items-center gap-3">
              {/* mobile language toggle */}
              <button
                onClick={toggleLang}
                className="flex items-center gap-1 rounded-full border border-white/15 px-3 py-1.5 text-[11px] font-mono tracking-widest hover:border-gold-400/40 transition-colors"
              >
                <span className={lang === "id" ? "text-gold-400" : "text-mist-400"}>ID</span>
                <span className="text-mist-600 mx-0.5">|</span>
                <span className={lang === "en" ? "text-gold-400" : "text-mist-400"}>EN</span>
              </button>
              <a
                href={`https://wa.me/${contact.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleLinkClick}
                className="flex-1 inline-flex items-center justify-center gap-1.5 rounded-full bg-gold-500 px-4 py-2.5 text-sm font-semibold text-ink-950 hover:bg-gold-400 transition-colors"
              >
                LET&apos;S TALK <ArrowRight size={15} />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
