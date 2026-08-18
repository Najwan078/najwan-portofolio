"use client";

import { motion } from "framer-motion";
import { Code2, Eye, Clock, TrendingUp } from "lucide-react";
import WordReveal from "./WordReveal";
import FloatingParticles from "./FloatingParticles";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

const icons = [Code2, Eye, Clock, TrendingUp];

export default function About() {
  const { lang } = useLanguage();
  const tr = t[lang].about;

  return (
    <section id="about" className="relative py-28 px-6 md:px-10 overflow-hidden">
      <FloatingParticles />
      <div className="pointer-events-none absolute top-10 left-1/4 h-[320px] w-[320px] rounded-full bg-gold-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-[260px] w-[260px] rounded-full bg-gold-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-mist-100 leading-tight mb-6">
              <WordReveal key={lang + "-h1"} text={tr.heading1} />
            </h2>

            <div className="flex flex-wrap gap-3 mb-7">
              {tr.facts.map((f) => (
                <div key={f.label} className="card-solid rounded-xl px-4 py-2.5">
                  <p className="eyebrow text-mist-400">{f.label}</p>
                  <p className="text-sm font-semibold text-gold-400">{f.value}</p>
                </div>
              ))}
            </div>

            {tr.bio.map((paragraph, pi) => (
              <p
                key={pi}
                className={`${pi > 0 ? "mt-4 " : ""}text-mist-400 leading-relaxed`}
              >
                {paragraph.map((seg, si) =>
                  seg.h ? (
                    <span key={si} className="text-mist-100 font-medium">{seg.text}</span>
                  ) : (
                    <span key={si}>{seg.text}</span>
                  )
                )}
              </p>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-mist-100 leading-tight mb-6">
              <WordReveal key={lang + "-h2"} text={tr.heading2} />
            </h2>
            <p className="text-mist-400 leading-relaxed mb-6">{tr.sub2}</p>

            <div className="grid sm:grid-cols-2 gap-4">
              {tr.principles.map((pr, i) => {
                const Icon = icons[i];
                return (
                  <motion.div
                    key={pr.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: false, margin: "-60px" }}
                    transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                    className="card-solid rounded-xl p-4 hover:border-l-gold-400 transition-colors"
                  >
                    <Icon size={18} className="text-gold-400 mb-2.5" />
                    <p className="text-sm font-semibold text-mist-100 mb-1">{pr.label}</p>
                    <p className="text-xs text-mist-400 leading-relaxed">{pr.detail}</p>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
