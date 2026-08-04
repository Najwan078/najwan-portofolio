"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";

const cases = [
  {
    title: "BrewCraft — Coffee Shop Website",
    tag: "project mandiri",
    problem:
      "Banyak UMKM F&B skala kecil belum punya website sendiri cuma mengandalkan Instagram dan WhatsApp. Calon pelanggan baru jadi sulit lihat menu lengkap atau kenal profil bisnisnya sebelum datang langsung.",
    solution:
      "Sebagai simulasi kebutuhan itu, aku bangun website interaktif lengkap dengan menu berkategori, filter produk, galeri proses dari kebun ke cangkir, dan form pemesanan.",
    outcome:
      "Project ini jadi contoh nyata kemampuanku membangun etalase digital untuk bisnis F&B dari struktur, desain, sampai interaksi frontendnya.",
    liveUrl: "https://brewcraft-coffe.netlify.app",
  },
  {
    title: "Masjid An-Nadzom — Sistem Manajemen Digital",
    tag: "project mandiri",
    problem:
      "Di banyak masjid, informasi jadwal sholat dan jadwal Jumat masih disampaikan manual lewat papan tulis atau pengumuman langsung. Jamaah yang tidak sempat hadir jadi ketinggalan info.",
    solution:
      "Saya bangun sistem digital dengan jadwal sholat & Jumat otomatis, informasi hari raya, dan fitur baca Al-Qur'an online semua bisa diakses dari HP kapan saja.",
    outcome:
      "Project ini jadi contoh sistem full-stack (Django + PostgreSQL) yang siap dipakai masjid atau organisasi mana pun yang butuh solusi serupa.",
    liveUrl: "https://masjid-annadzom.vercel.app",
  },
];

export default function CaseStudies() {
  return (
    <section className="relative py-24 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-mist-100 max-w-2xl">
          Studi Kasus
        </h2>
        <p className="mt-4 max-w-xl text-mist-400">
          Dua project mandiri ini dibangun sebagai simulasi kebutuhan bisnis dan
          komunitas nyata bukan sekadar demo template.
        </p>

        <div className="mt-12 grid md:grid-cols-2 gap-6">
          {cases.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: "easeOut" }}
              className="card-solid rounded-2xl p-6 sm:p-7"
            >
              <span className="eyebrow text-gold-400">{c.tag}</span>
              <h3 className="font-display font-semibold text-lg text-mist-100 mt-2 mb-5">
                {c.title}
              </h3>

              <div className="space-y-4">
                <div>
                  <p className="eyebrow text-gold-400 mb-1">masalah</p>
                  <p className="text-sm text-mist-400 leading-relaxed">{c.problem}</p>
                </div>
                <div>
                  <p className="eyebrow text-gold-400 mb-1">solusi</p>
                  <p className="text-sm text-mist-400 leading-relaxed">{c.solution}</p>
                </div>
                <div>
                  <p className="eyebrow text-gold-400 mb-1">hasil</p>
                  <p className="text-sm text-mist-400 leading-relaxed">{c.outcome}</p>
                </div>
              </div>

              <a
                href={c.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors pt-4 border-t border-white/10 w-full"
              >
                Lihat Live Demo <ArrowUpRight size={14} />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}