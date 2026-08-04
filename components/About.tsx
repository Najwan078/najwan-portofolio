"use client";

import { motion } from "framer-motion";
import { Code2, Server, Database, Sparkles } from "lucide-react";

const facts = [
  { label: "semester 4", value: "UNPAM" },
  { label: "background", value: "F&B → Tech" },
  { label: "status", value: "Freelance" },
];

const stack = [
  {
    icon: Code2,
    label: "Frontend",
    detail: "React, Next.js, TypeScript, Tailwind CSS.",
  },
  {
    icon: Server,
    label: "Backend",
    detail: "Python (Flask, Django), REST API development.",
  },
  {
    icon: Database,
    label: "Database",
    detail: "PostgreSQL — perancangan skema dan optimasi query.",
  },
  {
    icon: Sparkles,
    label: "AI & Kreatif",
    detail: "Prompt engineering, AI media generation, data annotation.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 md:px-10 overflow-hidden">
      <div className="pointer-events-none absolute top-10 left-1/4 h-[320px] w-[320px] rounded-full bg-gold-500/10 blur-[110px]" />
      <div className="pointer-events-none absolute bottom-0 right-10 h-[260px] w-[260px] rounded-full bg-gold-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl">
        <p className="eyebrow bracket mb-4">tentang saya</p>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-mist-100 leading-tight mb-6">
              Mahasiswa Informatika &amp; Freelance Web Developer
            </h2>

            <div className="flex flex-wrap gap-3 mb-7">
              {facts.map((f) => (
                <div
                  key={f.label}
                  className="glass rounded-xl px-4 py-2.5"
                >
                  <p className="eyebrow text-mist-400">{f.label}</p>
                  <p className="text-sm font-semibold text-gold-400">{f.value}</p>
                </div>
              ))}
            </div>

            <p className="text-mist-400 leading-relaxed">
              Saya <span className="text-mist-100 font-medium">Muhammad Najwan Pratomo</span>,
              mahasiswa <span className="text-mist-100 font-medium">Teknik Informatika di Universitas Pamulang</span>,
              semester 4, dengan fokus praktis pada struktur data, teori graf,
              algoritma, dan arsitektur basis data.
            </p>
            <p className="mt-4 text-mist-400 leading-relaxed">
              Sebelum masuk dunia teknologi, saya bekerja di bidang{" "}
              <span className="text-mist-100 font-medium">F&amp;B dan manufaktur</span> —
              pengalaman yang membentuk kebiasaan kerja teliti dan disiplin
              terhadap SOP, yang sekarang saya bawa ke pengembangan software.
            </p>
            <p className="mt-4 text-mist-400 leading-relaxed">
              Saat ini saya aktif sebagai{" "}
              <span className="text-mist-100 font-medium">freelance web developer dan data annotator</span>,
              mengerjakan proyek untuk klien UMKM dan organisasi — mulai dari
              landing page sampai sistem berbasis database.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-mist-100 leading-tight mb-6">
              Spesialisasi &amp; Tech Stack
            </h2>
            <p className="text-mist-400 leading-relaxed mb-6">
              Sebagai <span className="text-mist-100 font-medium">Fullstack Web Developer</span>,
              saya fokus pada pengembangan sistem menggunakan React dan Next.js
              di sisi frontend, serta Flask dan Django di sisi backend.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {stack.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="glass rounded-xl p-4 hover:border-gold-500/30 transition-colors"
                >
                  <s.icon size={18} className="text-gold-400 mb-2.5" />
                  <p className="text-sm font-semibold text-mist-100 mb-1">
                    {s.label}
                  </p>
                  <p className="text-xs text-mist-400 leading-relaxed">
                    {s.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}