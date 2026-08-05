"use client";

import { motion } from "framer-motion";
import { Code2, Eye, Clock, TrendingUp } from "lucide-react";

const facts = [
  { label: "semester 4", value: "Universitas Pamulang" },
  { label: "background", value: "F&B → Tech" },
  { label: "status", value: "Freelance" },
];

const principles = [
  {
    icon: Code2,
    label: "Kode",
    detail: "Terstruktur, mudah dibaca, dan gampang di maintain jangka panjang.",
  },
  {
    icon: Eye,
    label: "Detail-Oriented",
    detail: "Kebiasaan dari kerja SOP ketat teliti di setiap langkah pengerjaan.",
  },
  {
    icon: Clock,
    label: "Deadline",
    detail: "Terbiasa kerja cepat dan tetap presisi di bawah tekanan waktu.",
  },
  {
    icon: TrendingUp,
    label: "Terus Belajar",
    detail: "Aktif eksplorasi tools dan teknik baru, termasuk AI & prompt engineering.",
  },
];

export default function About() {
  return (
    <section id="about" className="relative py-28 px-6 md:px-10 overflow-hidden">
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
              Mahasiswa Teknik Informatika &amp; Freelance Web Developer
            </h2>

            <div className="flex flex-wrap gap-3 mb-7">
              {facts.map((f) => (
                <div key={f.label} className="card-solid rounded-xl px-4 py-2.5">
                  <p className="eyebrow text-mist-400">{f.label}</p>
                  <p className="text-sm font-semibold text-gold-400">{f.value}</p>
                </div>
              ))}
            </div>

            <p className="text-mist-400 leading-relaxed">
              Saya <span className="text-mist-100 font-medium">Muhammad Najwan Pratomo</span>,
              mahasiswa <span className="text-mist-100 font-medium">Teknik Informatika di Universitas Pamulang</span>,
              semester 4, dengan fokus pada pengembangan web dan pemrograman berbasis data. Saya memiliki ketertarikan yang kuat pada teknologi, terutama dalam membangun aplikasi web yang efisien dan user-friendly.
            </p>
            <p className="mt-4 text-mist-400 leading-relaxed">
              Sebelum masuk dunia teknologi, saya bekerja di bidang{" "}
              <span className="text-mist-100 font-medium">F&amp;B dan manufaktur</span>,
              pengalaman yang membentuk kebiasaan kerja teliti dan disiplin
              terhadap SOP, yang sekarang saya bawa ke pengembangan software.
            </p>
            <p className="mt-4 text-mist-400 leading-relaxed">
              Saat ini saya aktif sebagai{" "}
              <span className="text-mist-100 font-medium">freelance web developer</span>,
              mengerjakan proyek untuk klien UMKM dan organisasi mulai dari
              landing page sampai sistem berbasis database.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h2 className="font-display font-bold text-2xl sm:text-3xl text-mist-100 leading-tight mb-6">
              Cara Saya Kerja
            </h2>
            <p className="text-mist-400 leading-relaxed mb-6">
              Empat prinsip yang saya pegang di setiap project, dari yang kecil
              sampai yang paling kompleks.
            </p>

            <div className="grid sm:grid-cols-2 gap-4">
              {principles.map((pr, i) => (
                <motion.div
                  key={pr.label}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: 0.1 + i * 0.08 }}
                  className="card-solid rounded-xl p-4 hover:border-l-gold-400 transition-colors"
                >
                  <pr.icon size={18} className="text-gold-400 mb-2.5" />
                  <p className="text-sm font-semibold text-mist-100 mb-1">{pr.label}</p>
                  <p className="text-xs text-mist-400 leading-relaxed">{pr.detail}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}