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
} from "react-icons/si";

function CanvaIcon({ size = 56 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24">
      <defs>
        <linearGradient id="canvaGradient" x1="0" y1="0" x2="24" y2="24">
          <stop stopColor="#00C4CC" />
          <stop offset="1" stopColor="#7D2AE8" />
        </linearGradient>
      </defs>
      <circle cx="12" cy="12" r="12" fill="url(#canvaGradient)" />
      <text
        x="12"
        y="16.5"
        textAnchor="middle"
        fontFamily="Georgia, serif"
        fontSize="13"
        fontWeight="bold"
        fill="#fff"
      >
        C
      </text>
    </svg>
  );
}

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
  { name: "Canva", Icon: CanvaIcon, custom: true },
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
    }, 3400);
    return () => clearInterval(id);
  }, []);

  return (
    <section id="skills" className="relative py-24 px-6 md:px-10">
      <div className="mx-auto max-w-6xl">
        <motion.h2
          className="font-display font-bold text-3xl sm:text-4xl text-mist-100 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          Skills &amp; Technologies
        </motion.h2>

        <div className="flex justify-center items-center min-h-[220px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="flex flex-wrap justify-center gap-6"
            >
              {pairs[index].map((t) => (
                <motion.div
                  key={t.name}
                  className="card-solid rounded-2xl px-8 py-8 sm:px-14 sm:py-10 flex flex-col items-center gap-3 w-36 sm:w-56 cursor-default"
                  whileHover={{ scale: 1.07, y: -4 }}
                  transition={{ type: "spring", stiffness: 320, damping: 18 }}
                >
                  <motion.div
                    whileHover={{ scale: 1.18, rotate: 8 }}
                    transition={{ type: "spring", stiffness: 350, damping: 15 }}
                  >
                    {"custom" in t && t.custom ? (
                      <t.Icon size={44} />
                    ) : (
                      <t.Icon size={44} className="text-gold-400" />
                    )}
                  </motion.div>
                  <span className="text-sm sm:text-base text-mist-200 text-center font-medium">{t.name}</span>
                </motion.div>
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