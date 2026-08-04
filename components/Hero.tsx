"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { Linkedin, Instagram, Github } from "lucide-react";
import { contact } from "@/lib/data";

const roles = ["WEB DEVELOPER", "MAHASISWA TEKNIK INFORMATIKA", "FREELANCER"];

function TypewriterRole() {
  const [wordIndex, setWordIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[wordIndex];
    const typingSpeed = isDeleting ? 35 : 65;
    const atFullWord = !isDeleting && text === current;
    const atEmpty = isDeleting && text === "";

    let delay = typingSpeed;
    if (atFullWord) delay = 1400;
    if (atEmpty) delay = 300;

    const timeout = setTimeout(() => {
      if (atFullWord) {
        setIsDeleting(true);
        return;
      }
      if (atEmpty) {
        setIsDeleting(false);
        setWordIndex((i) => (i + 1) % roles.length);
        return;
      }
      const next = isDeleting
        ? current.slice(0, text.length - 1)
        : current.slice(0, text.length + 1);
      setText(next);
    }, delay);

    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex]);

  return (
    <span>
      {text}
      <span className="inline-block w-[2px] h-[0.9em] bg-gold-400 ml-0.5 align-middle animate-pulse" />
    </span>
  );
}

const fadeUp = {
  hidden: { opacity: 0, y: 24, filter: "blur(8px)" },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.7, delay: i * 0.14, ease: "easeOut" },
  }),
};

const socialLinks = [
  { href: contact.linkedin, Icon: Linkedin, label: "LinkedIn" },
  { href: contact.instagram, Icon: Instagram, label: "Instagram" },
  { href: contact.github, Icon: Github, label: "GitHub" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen bg-grid-fade flex items-center pt-24 pb-16 overflow-hidden">
      <div className="pointer-events-none absolute -top-32 right-0 h-[420px] w-[420px] rounded-full bg-gold-500/10 blur-[120px]" />

      {/* vertical social icons, animate in from the left */}
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, delay: 0.9, ease: "easeOut" }}
        className="hidden lg:flex flex-col items-center gap-5 absolute left-8 top-1/2 -translate-y-1/2 z-10"
      >
        {socialLinks.map((s, i) => (
          <motion.a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            initial={{ opacity: 0, x: -12 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4, delay: 1.0 + i * 0.1 }}
            className="text-mist-400 hover:text-gold-400 transition-colors"
          >
            <s.Icon size={18} />
          </motion.a>
        ))}
        <div className="w-px h-16 bg-white/15 mt-1" />
      </motion.div>

      <div className="relative mx-auto max-w-6xl w-full px-6 md:px-10 grid md:grid-cols-[1.15fr_0.85fr] gap-14 items-center">
        <div>
          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={0}
            className="eyebrow mb-5 text-gold-400"
          >
          </motion.p>

          <motion.h1
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="font-display font-extrabold text-4xl sm:text-5xl lg:text-6xl leading-[1.05] tracking-tight text-mist-100"
          >
            MUHAMMAD
            <br />
            <span className="text-gradient-gold">NAJWAN</span> PRATOMO
          </motion.h1>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-4 eyebrow text-mist-300 text-lg sm:text-xl tracking-wide"
          >
            <TypewriterRole />
          </motion.p>

          <motion.p
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={3}
            className="mt-5 max-w-lg text-mist-400 text-base sm:text-lg leading-relaxed"
          >
            Saya merancang dan membangun website dari landing page sederhana
            sampai sistem berbasis database dengan struktur teknik yang rapi
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
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
              className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-mist-100 hover:border-gold-400/60 hover:text-gold-400 transition-colors"
            >
              Lihat Projects
            </a>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-12 flex items-center gap-8 border-t border-white/10 pt-6 max-w-md"
          >
            <div>
              <p className="font-display font-bold text-2xl text-mist-100">4</p>
              <p className="eyebrow text-mist-400 mt-1">Project Selesai</p>
            </div>
            <div>
              <p className="font-display font-bold text-2xl text-mist-100">1</p>
              <p className="eyebrow text-mist-400 mt-1">Tahun Freelance</p>
            </div>
            <div>
              <p className="font-display font-bold text-2xl text-mist-100">4</p>
              <p className="eyebrow text-mist-400 mt-1">Semester Kuliah</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, filter: "blur(8px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
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