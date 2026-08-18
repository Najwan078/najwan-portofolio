"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageCircle, Mail, Linkedin, Instagram, Github, Send, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { contact } from "@/lib/data";
import { useLanguage } from "@/context/LanguageContext";
import { t } from "@/lib/translations";

type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const { lang } = useLanguage();
  const tr = t[lang].contact;

  const handleSendEmail = async () => {
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setErrorMsg(tr.errors.required);
      setStatus("error");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      setErrorMsg(tr.errors.email);
      setStatus("error");
      return;
    }
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || tr.errors.server);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err: unknown) {
      setErrorMsg(err instanceof Error ? err.message : tr.errors.generic);
      setStatus("error");
    }
  };

  const waMessage = encodeURIComponent(
    `${tr.waPrefix}${form.name || "..."}${tr.waMid}${form.message || tr.waDefault}`
  );

  return (
    <section id="contact" className="relative py-28 px-6 md:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

      <div className="mx-auto max-w-3xl text-center">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-mist-100">
          {tr.heading} <span className="text-gradient-gold">{tr.headingHighlight}</span>{tr.headingEnd}
        </h2>
        <p className="mt-4 text-mist-400 max-w-xl mx-auto">{tr.desc}</p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="mt-10 glass rounded-2xl p-6 sm:p-8 text-left"
        >
          <AnimatePresence>
            {status === "success" && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center gap-4 py-8 text-center"
              >
                <div className="w-16 h-16 rounded-full bg-emerald-500/15 flex items-center justify-center">
                  <CheckCircle2 size={32} className="text-emerald-400" />
                </div>
                <div>
                  <p className="font-display font-semibold text-lg text-mist-100">{tr.success.title}</p>
                  <p className="mt-1 text-sm text-mist-400">{tr.success.desc}</p>
                </div>
                <button
                  onClick={() => setStatus("idle")}
                  className="mt-2 text-sm text-gold-400 hover:text-gold-300 transition-colors underline underline-offset-4"
                >
                  {tr.success.again}
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {status !== "success" && (
            <>
              <div className="grid sm:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder={tr.form.name}
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  disabled={status === "loading"}
                  className="rounded-xl bg-ink-800 border border-white/10 px-4 py-3 text-sm text-mist-100 placeholder:text-mist-400 focus:outline-none focus:border-gold-500/50 disabled:opacity-50 transition-colors"
                />
                <input
                  type="email"
                  placeholder={tr.form.email}
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  disabled={status === "loading"}
                  className="rounded-xl bg-ink-800 border border-white/10 px-4 py-3 text-sm text-mist-100 placeholder:text-mist-400 focus:outline-none focus:border-gold-500/50 disabled:opacity-50 transition-colors"
                />
              </div>

              <textarea
                placeholder={tr.form.message}
                rows={4}
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                disabled={status === "loading"}
                className="mt-4 w-full rounded-xl bg-ink-800 border border-white/10 px-4 py-3 text-sm text-mist-100 placeholder:text-mist-400 focus:outline-none focus:border-gold-500/50 resize-none disabled:opacity-50 transition-colors"
              />

              <AnimatePresence>
                {status === "error" && errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="mt-3 flex items-center gap-2 text-sm text-red-400"
                  >
                    <AlertCircle size={15} />
                    {errorMsg}
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="mt-5 flex flex-col sm:flex-row gap-3">
                <button
                  onClick={handleSendEmail}
                  disabled={status === "loading"}
                  className="inline-flex items-center justify-center gap-2 rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-gold-400 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {status === "loading" ? (
                    <><Loader2 size={16} className="animate-spin" />{tr.sending}</>
                  ) : (
                    <><Send size={15} />{tr.send}</>
                  )}
                </button>

                <a
                  href={`https://wa.me/${contact.whatsapp}?text=${waMessage}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-mist-100 hover:border-emerald-400/60 hover:text-emerald-400 transition-colors"
                >
                  <MessageCircle size={16} /> {tr.whatsapp}
                </a>
              </div>
            </>
          )}
        </motion.div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <a href={contact.linkedin} target="_blank" rel="noopener noreferrer" className="text-mist-400 hover:text-gold-400 transition-colors" aria-label="LinkedIn"><Linkedin size={20} /></a>
          <a href={contact.instagram} target="_blank" rel="noopener noreferrer" className="text-mist-400 hover:text-gold-400 transition-colors" aria-label="Instagram"><Instagram size={20} /></a>
          <a href={contact.github} target="_blank" rel="noopener noreferrer" className="text-mist-400 hover:text-gold-400 transition-colors" aria-label="GitHub"><Github size={20} /></a>
        </div>
      </div>
    </section>
  );
}
