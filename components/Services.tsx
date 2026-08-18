"use client";

import { motion } from "framer-motion";
import { services } from "@/lib/data";
import ServiceCard from "./ServiceCard";
import WordReveal from "./WordReveal";
import FloatingParticles from "./FloatingParticles";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

export default function Services() {
  const { lang } = useLanguage();
  const tr = t[lang].services;

  return (
    <section id="services" className="relative py-24 px-6 md:px-10">
      <FloatingParticles />
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="font-display font-bold text-3xl sm:text-4xl text-mist-100 max-w-2xl"
          initial={{ opacity: 0, y: 18 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.55, ease: "easeOut" }}
        >
          <WordReveal key={lang + "-svc"} text={tr.heading} />
        </motion.h2>
        <p className="mt-4 max-w-xl text-mist-400">{tr.desc}</p>

        <div className="mt-12 grid md:grid-cols-3 gap-6">
          {services.map((service, i) => (
            <ServiceCard key={service.name} service={service} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  );
}
