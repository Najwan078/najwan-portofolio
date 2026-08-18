"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { ArrowUpRight, Github } from "lucide-react";
import type { Project } from "@/lib/data";

export default function ProjectCard({ project, delay = 0 }: { project: Project; delay?: number }) {
  const [loaded, setLoaded] = useState(false);

  // 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [6, -6]), { stiffness: 280, damping: 28 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-6, 6]), { stiffness: 280, damping: 28 });

  function handleMouseMove(e: React.MouseEvent<HTMLElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() { mouseX.set(0); mouseY.set(0); }

  return (
    <div style={{ perspective: 800 }}>
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="card-solid rounded-2xl overflow-hidden hover:border-gold-400/30 transition-colors group cursor-default"
    >
      {project.image && (
        <div className="relative w-full h-48 overflow-hidden border-b border-white/10 bg-ink-800">
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-ink-800 via-ink-700 to-ink-800 bg-[length:200%_100%]" />
          )}
          <Image
            src={project.image}
            alt={project.title}
            fill
            onLoad={() => setLoaded(true)}
            className={`object-cover object-top transition-all duration-500 group-hover:scale-105 ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
        </div>
      )}

      <div className="p-6 sm:p-7">
        <div className="flex items-start justify-between mb-4">
          <span className="eyebrow text-gold-400">
            #{project.index} · {project.category}
          </span>
          {project.status === "live" && (
            <span className="inline-flex items-center gap-1.5 eyebrow text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              live
            </span>
          )}
        </div>

        <h3 className="font-display font-semibold text-xl text-mist-100 mb-2.5 group-hover:text-gold-400 transition-colors">
          {project.title}
        </h3>

        <p className="text-sm text-mist-400 leading-relaxed mb-5">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-6">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="eyebrow rounded-md border border-white/10 px-2 py-1 text-mist-300"
            >
              {tech}
            </span>
          ))}
        </div>

        <div className="flex items-center gap-5 pt-4 border-t border-white/10">
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-gold-400 hover:text-gold-300 transition-colors"
            >
              Live Demo <ArrowUpRight size={14} />
            </a>
          )}
          {project.codeUrl && (
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-sm font-medium text-mist-400 hover:text-mist-200 transition-colors"
            >
              Source Code <Github size={14} />
            </a>
          )}
        </div>
      </div>
    </motion.article>
    </div>
  );
}