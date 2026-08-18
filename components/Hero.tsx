"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useScroll, useTransform, useSpring, useInView } from "framer-motion";
import { Linkedin, Instagram, Github, FileText, ChevronDown, Globe } from "lucide-react";
import { contact } from "@/lib/data";
import MagneticButton from "./MagneticButton";
import AnimatedBackground from "./AnimatedBackground";

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

const cvOptions = [
  {
    label: "CV Design",
    sublabel: "Full layout",
    href: "/cv/CV_Muhammad_Najwan_Pratomo.pdf",
    icon: FileText,
  },
  {
    label: "ATS — Indonesia",
    sublabel: "Bahasa Indonesia",
    href: "/cv/CV%20ATS%20Muhammad%20Najwan%20Pratomo%20%28Indonesia%29.pdf",
    icon: Globe,
  },
  {
    label: "ATS — English",
    sublabel: "English version",
    href: "/cv/CV%20ATS%20Muhammad%20Najwan%20Pratomo%20%28English%29.pdf",
    icon: Globe,
  },
];

/* ── CountUp: animasikan angka dari 0 ke target saat masuk viewport ── */
function CountUp({ to, duration = 1.4 }: { to: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const step = to / (duration * 60);
    const timer = setInterval(() => {
      start += step;
      if (start >= to) {
        setCount(to);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, to, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function Hero() {
  const [cvOpen, setCvOpen] = useState(false);
  const cvRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLElement>(null);

  // Parallax: foto bergerak 30% lebih lambat dari scroll
  const { scrollY } = useScroll();
  const rawParallax = useTransform(scrollY, [0, 600], [0, -80]);
  const photoParallax = useSpring(rawParallax, { stiffness: 60, damping: 20 });

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (cvRef.current && !cvRef.current.contains(e.target as Node)) {
        setCvOpen(false);
      }
    }
    if (cvOpen) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [cvOpen]);
  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden" style={{ background: "#08080D" }}>
      <AnimatedBackground />

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
            whileHover={{ scale: 1.28, y: -3 }}
            transition={{ duration: 0.4, delay: 1.0 + i * 0.1 }}
            className="text-mist-400 hover:text-gold-400 transition-colors"
          >
            <s.Icon size={18} />
          </motion.a>
        ))}
        <div className="w-px h-16 bg-white/15 mt-1" />
      </motion.div>

      <div className="relative z-10 mx-auto max-w-6xl w-full px-6 md:px-10 flex flex-col md:flex-row items-center justify-between min-h-screen gap-6 md:gap-8 pt-24 md:pt-0">
        {/* ── Teks kiri ── */}
        <div className="w-full md:w-1/2 flex-shrink-0 order-2 md:order-1">
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
            className="font-display font-bold text-2xl sm:text-4xl lg:text-5xl leading-[1.1] tracking-tight text-mist-100"
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
            className="mt-5 max-w-lg text-mist-400 text-sm sm:text-lg leading-relaxed"
          >
            Saya merancang dan membangun website dari landing page sederhana
            sampai sistem berbasis database dengan fondasi teknik yang rapi
          </motion.p>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={4}
            className="mt-7 flex flex-wrap items-center gap-3"
          >
            <MagneticButton>
              <a
                href="#contact"
                className="inline-flex items-center rounded-full bg-gold-500 px-6 py-3 text-sm font-semibold text-ink-950 hover:bg-gold-400 transition-colors shadow-glow"
              >
                Hubungi Saya
              </a>
            </MagneticButton>
            <MagneticButton>
              <a
                href="#projects"
                className="inline-flex items-center rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-mist-100 hover:border-gold-400/60 hover:text-gold-400 transition-colors"
              >
                Lihat Projects
              </a>
            </MagneticButton>
            {/* ── CV Dropdown ── */}
            <div ref={cvRef} className="relative">
              <button
                onClick={() => setCvOpen((v) => !v)}
                className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-6 py-3 text-sm font-medium text-mist-100 hover:border-gold-400/60 hover:text-gold-400 transition-colors cursor-pointer"
              >
                <FileText size={15} />
                Lihat CV
                <ChevronDown
                  size={13}
                  className={`transition-transform duration-200 ${
                    cvOpen ? "rotate-180" : "rotate-0"
                  }`}
                />
              </button>

              <AnimatePresence>
                {cvOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -8, scale: 0.97 }}
                    transition={{ duration: 0.18, ease: "easeOut" }}
                    className="absolute left-0 top-full mt-2 z-50 min-w-[220px] rounded-2xl border border-white/10 bg-ink-800 shadow-glow overflow-hidden"
                  >
                    {cvOptions.map((opt, i) => (
                      <a
                        key={i}
                        href={opt.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setCvOpen(false)}
                        className="flex items-center gap-3 px-4 py-3 text-sm text-mist-100 hover:bg-white/5 hover:text-gold-400 transition-colors group"
                      >
                        <span className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-white/5 group-hover:bg-gold-500/10 transition-colors">
                          <opt.icon size={14} className="text-mist-400 group-hover:text-gold-400 transition-colors" />
                        </span>
                        <span className="flex flex-col">
                          <span className="font-medium leading-tight">{opt.label}</span>
                          <span className="text-[11px] text-mist-400 leading-tight mt-0.5">{opt.sublabel}</span>
                        </span>
                      </a>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>

          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={5}
            className="mt-8 flex items-center gap-6 border-t border-white/10 pt-5 w-full max-w-md"
          >
            <div>
              <p className="font-display font-bold text-xl sm:text-2xl text-mist-100"><CountUp to={4} /></p>
              <p className="eyebrow text-mist-400 mt-1 text-[10px] sm:text-xs">Project Selesai</p>
            </div>
            <div>
              <p className="font-display font-bold text-xl sm:text-2xl text-mist-100"><CountUp to={1} duration={0.8} /></p>
              <p className="eyebrow text-mist-400 mt-1 text-[10px] sm:text-xs">Tahun Freelance</p>
            </div>
            <div>
              <p className="font-display font-bold text-xl sm:text-2xl text-mist-100"><CountUp to={4} /></p>
              <p className="eyebrow text-mist-400 mt-1 text-[10px] sm:text-xs">Semester Kuliah</p>
            </div>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(12px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          style={{ y: photoParallax }}
          transition={{ duration: 1.0, delay: 0.2, ease: "easeOut" }}
          className="flex flex-col items-center justify-center flex-shrink-0 relative order-1 md:order-2 w-full md:w-[48%]"
        >
          {/* Glow emas samar di belakang foto */}
          <div
            className="absolute inset-0 rounded-full blur-[140px] pointer-events-none"
            style={{ background: "radial-gradient(ellipse, rgba(212,175,55,0.20) 0%, transparent 70%)" }}
          />

          <Image
            src="/profile_nobg.png"
            alt="Muhammad Najwan Pratomo"
            width={829}
            height={898}
            className="relative w-[200px] sm:w-[280px] md:w-full md:max-w-[560px] h-auto object-contain drop-shadow-[0_8px_40px_rgba(0,0,0,0.6)]"
            priority
          />
        </motion.div>
      </div>
    </section>
  );
}