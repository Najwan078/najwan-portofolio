"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MessageCircle, Mail, Linkedin, Instagram, Github } from "lucide-react";
import { contact } from "@/lib/data";

export default function Contact() {
  const [form, setForm] = useState({ name: "", message: "" });

  const mailtoHref = `mailto:${contact.email}?subject=${encodeURIComponent(
    `Kebutuhan Website — ${form.name || "dari website"}`
  )}&body=${encodeURIComponent(form.message)}`;

  return (
    <section id="contact" className="relative py-28 px-6 md:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow bracket mb-4">kontak</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-mist-100">
          Punya kebutuhan <span className="text-gradient-gold">website</span>?
        </h2>
        <p className="mt-4 text-mist-400 max-w-xl mx-auto">
          Cocok untuk UMKM, masjid/organisasi, sekolah kecil, atau tim yang
          butuh tools internal. Mari berdiskusi dulu, gratis.
        </p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mt-10 glass rounded-2xl p-6 sm:p-8 text-left"
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <input
              type="text"
              placeholder="Nama kamu"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              className="rounded-xl bg-ink-800 border border-white/10 px-4 py-3 text-sm text-mist-100 placeholder:text-mist-400 focus:outline-none focus:border-gold-500/50"
            />
            <a
              href={`https://wa.me/${contact.whatsapp}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl bg-ink-800 border border-white/10 px-4 py-3 text-sm text-mist-300 flex items-center gap-2 hover:border-emerald-400/40 hover:text-emerald-400 transition-colors"
            >
              <MessageCircle size={16} /> {contact.whatsappDisplay}
            </a>
          </div>

          <textarea
            placeholder="Ceritakan kebutuhan website kamu..."
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="mt-4 w-full rounded-xl bg-ink-800 border border-white/10 px-4 py-3 text-sm text-mist-100 placeholder:text-mist-400 focus:outline-none focus:border-gold-500/50 resize-none"
          />

          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <a
              href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
                `Halo Najwan, nama saya ${form.name || "..."}. ${form.message || "Saya ingin konsultasi soal website."}`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-emerald-500 px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-emerald-400 transition-colors"
            >
              <MessageCircle size={16} /> Kirim via WhatsApp
            </a>
            <a
              href={mailtoHref}
              className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-mist-100 hover:border-gold-400/60 hover:text-gold-400 transition-colors"
            >
              <Mail size={16} /> Kirim via Email
            </a>
          </div>
        </motion.div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mist-400 hover:text-gold-400 transition-colors"
            aria-label="LinkedIn"
          >
            <Linkedin size={20} />
          </a>
          <a
            href={contact.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mist-400 hover:text-gold-400 transition-colors"
            aria-label="Instagram"
          >
            <Instagram size={20} />
          </a>
          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="text-mist-400 hover:text-gold-400 transition-colors"
            aria-label="GitHub"
          >
            <Github size={20} />
          </a>
        </div>
      </div>
    </section>
  );
}
