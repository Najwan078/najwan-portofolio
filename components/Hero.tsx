"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.6, delay: i * 0.12, ease: "easeOut" },
  }),
};

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-grid-fade flex items-center pt-24 pb-16 overflow-hidden">
      {/* ambient glow */}
      <div className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-violet-500/20 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[300px] rounded-full bg-gold-500/10 blur-[100px]" />

      <div className="relative mx-auto max-w-6xl w-full px-6 md:px-10 grid md:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="eyebrow bracket mb-5"
          >
            web developer
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight text-mist-100"
          >
            Membangun{" "}
            <span className="text-gradient-gold">solusi digital</span>{" "}
            untuk bisnis Anda
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-6 max-w-lg text-mist-400 text-base sm:text-lg leading-relaxed"
          >
            Saya merancang dan membangun website dari landing page sederhana
            sampai sistem berbasis database dengan teknik yang rapi
            dan Teliti di setiap prosesnya
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a
              href="#contact"
              className="inline-flex items-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-gold-400 transition-colors shadow-glow"
            >
              Hubungi Saya
            </a>
            <a
              href="#projects"
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-mist-100 hover:border-violet-400/60 hover:text-violet-300 transition-colors"
            >
              Lihat Proyek
            </a>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2, ease: "easeOut" }}
          className="relative mx-auto w-full max-w-sm"
        >
          <div className="relative rounded-3xl overflow-hidden border border-white/10 shadow-glow">
            <Image
              src="/profile.jpg"
              alt="Muhammad Najwan Pratomo"
              width={480}
              height={560}
              className="w-full h-[420px] object-cover"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-950 via-transparent to-transparent" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
