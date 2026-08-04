"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  SiReact,
  SiNextdotjs,
  SiTypescript,
  SiTailwindcss,
  SiPython,
  SiFlask,
  SiDjango,
  SiHtml5,
  SiGithub,
  SiVercel,
  SiCanva,
} from "react-icons/si";

const techStack = [
  { name: "React", Icon: SiReact },
  { name: "Next.js", Icon: SiNextdotjs },
  { name: "TypeScript", Icon: SiTypescript },
  { name: "Tailwind CSS", Icon: SiTailwindcss },
  { name: "Python", Icon: SiPython },
  { name: "Flask", Icon: SiFlask },
  { name: "Django", Icon: SiDjango },
  { name: "HTML", Icon: SiHtml5 },
  { name: "GitHub", Icon: SiGithub },
  { name: "Vercel", Icon: SiVercel },
  { name: "Canva", Icon: SiCanva },
];

// group the tech stack into pairs, e.g. [[React, Next.js], [TypeScript, Tailwind], ...]
const pairs = techStack.reduce<(typeof techStack)[]>((acc, item, i) => {
  if (i % 2 === 0) acc.push([item]);
  else acc[acc.length - 1].push(item);
  return acc;
}, []);

export default function Skills() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % pairs.length);
    }, 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="skills" className="relative py-24 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <p className="eyebrow bracket mb-4">tech stack</p>
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-mist-100 mb-12">
          Teknologi yang saya pakai
        </h2>

        <div className="flex justify-center items-center min-h-[160px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="flex flex-wrap justify-center gap-6"
            >
              {pairs[index].map((t) => (
                <div
                  key={t.name}
                  className="card-solid rounded-2xl px-10 py-8 flex flex-col items-center gap-3 w-44"
                >
                  <t.Icon size={40} className="text-gold-400" />
                  <span className="text-sm text-mist-300 text-center">{t.name}</span>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* progress dots */}
        <div className="flex justify-center gap-2 mt-8">
          {pairs.map((_, i) => (
            <span
              key={i}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                i === index ? "w-6 bg-gold-400" : "w-1.5 bg-white/15"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}