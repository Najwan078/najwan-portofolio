"use client";

import { motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiFlask,
  SiDjango,
  SiPostgresql,
  SiGit,
  SiVercel,
  SiFigma,
} from "react-icons/si";
import { Sparkles } from "lucide-react";

const techStack = [
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Python", Icon: SiPython },
  { name: "Flask", Icon: SiFlask },
  { name: "Django", Icon: SiDjango },
  { name: "PostgreSQL", Icon: SiPostgresql },
  { name: "Git", Icon: SiGit },
  { name: "Vercel", Icon: SiVercel },
  { name: "Figma", Icon: SiFigma },
  { name: "AI & Prompt Engineering", Icon: Sparkles },
];

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow bracket mb-4">tech stack</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-mist-100 mb-12">
          Teknologi yang saya pakai
        </h2>

        <div className="flex flex-wrap gap-4">
          {techStack.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className="flex items-center gap-2.5 rounded-full border border-white/10 bg-ink-800 px-4 py-2.5 hover:border-gold-400/40 transition-colors"
            >
              <t.Icon size={18} className="text-gold-400 shrink-0" />
              <span className="text-sm text-mist-300">{t.name}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}