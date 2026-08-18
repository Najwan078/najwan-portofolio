"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

export default function CaseStudies() {
  const { lang } = useLanguage();
  const tr = t[lang].caseStudies;

  return (
    <section className="relative py-24 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-mist-100 max-w-2xl">
          {tr.heading}
        </h2>
        <p className="mt-4 max-w-xl text-mist-400">{tr.desc}</p>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {tr.cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              className="card-solid rounded-2xl p-6 sm:p-7"
            >
              <span className="eyebrow text-gold-400">{tr.tag}</span>
              <h3 className="font-display font-semibold text-lg text-mist-100 mt-2 mb-5">
                {c.title}
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="eyebrow text-gold-400 mb-1">{tr.labels.problem}</p>
                  <p className="text-sm text-mist-400 leading-relaxed">{c.problem}</p>
                </div>
                <div>
                  <p className="eyebrow text-gold-400 mb-1">{tr.labels.solution}</p>
                  <p className="text-sm text-mist-400 leading-relaxed">{c.solution}</p>
                </div>
                <div>
                  <p className="eyebrow text-gold-400 mb-1">{tr.labels.outcome}</p>
                  <p className="text-sm text-mist-400 leading-relaxed">{c.outcome}</p>
                </div>
              </div>

              <a
                href={c.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors pt-4 border-t border-white/10 w-full"
              >
                {tr.cta} <ArrowUpRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
