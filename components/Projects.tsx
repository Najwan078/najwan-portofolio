"use client";

import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, Github } from "lucide-react";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";

/* ─── Single Card ─────────────────────────────────────────────────── */
function ProjectCard({ project }: { project: Project }) {
  const [loaded, setLoaded] = useState(false);
  const [hovered, setHovered] = useState(false);

  return (
    <article
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="relative flex-shrink-0 w-[85vw] sm:w-[340px] md:w-[380px] rounded-2xl overflow-hidden card-solid transition-all duration-300"
      style={{
        boxShadow: hovered ? "0 0 0 1px rgba(212,175,122,0.35), 0 20px 60px rgba(0,0,0,0.5)" : undefined,
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: "transform 0.35s cubic-bezier(.22,1,.36,1), box-shadow 0.35s ease",
      }}
    >
      {/* Image */}
      {project.image && (
        <div className="relative w-full h-48 overflow-hidden border-b border-white/10 bg-ink-800">
          {!loaded && (
            <div className="absolute inset-0 animate-pulse bg-gradient-to-r from-ink-800 via-ink-700 to-ink-800" />
          )}
          <Image
            src={project.image}
            alt={project.title}
            fill
            onLoad={() => setLoaded(true)}
            className={`object-cover object-top transition-all duration-500 ${hovered ? "scale-105" : "scale-100"} ${
              loaded ? "opacity-100" : "opacity-0"
            }`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-ink-900/80 via-transparent to-transparent" />
        </div>
      )}

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <span className="eyebrow text-gold-400">
            #{project.index} · {project.category}
          </span>
          {project.status === "live" && (
            <span className="inline-flex items-center gap-1.5 eyebrow text-emerald-400">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
              live
            </span>
          )}
        </div>

        {/* Title */}
        <h3
          className="font-display font-semibold text-lg text-mist-100 mb-2 transition-colors duration-200"
          style={{ color: hovered ? "#D4AF7A" : undefined }}
        >
          {project.title}
        </h3>

        {/* Desc */}
        <p className="text-sm text-mist-400 leading-relaxed mb-4 line-clamp-3">
          {project.description}
        </p>

        {/* Stack */}
        <div className="flex flex-wrap gap-1.5 mb-5">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="eyebrow rounded-md border border-white/10 px-2 py-1 text-mist-300"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Links */}
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
    </article>
  );
}

/* ─── Infinite Marquee Track ──────────────────────────────────────── */
function MarqueeTrack({ items, speed = 35, reverse = false }: {
  items: Project[];
  speed?: number;
  reverse?: boolean;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const rafRef = useRef<number>(0);
  const posRef = useRef(0);
  const pausedRef = useRef(false);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;

    const direction = reverse ? 1 : -1;

    const animate = () => {
      if (!pausedRef.current) {
        posRef.current += (speed / 60) * direction;
        const half = track.scrollWidth / 2;
        if (posRef.current <= -half) posRef.current += half;
        if (posRef.current >= 0) posRef.current -= half;
        track.style.transform = `translateX(${posRef.current}px)`;
      }
      rafRef.current = requestAnimationFrame(animate);
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(rafRef.current);
  }, [speed, reverse]);

  const doubled = [...items, ...items];

  return (
    <div
      className="overflow-hidden"
      onMouseEnter={() => { pausedRef.current = true; }}
      onMouseLeave={() => { pausedRef.current = false; }}
      style={{ maskImage: "linear-gradient(to right, transparent, black 8%, black 92%, transparent)" }}
    >
      <div
        ref={trackRef}
        className="flex gap-5 w-max py-3"
        style={{ willChange: "transform" }}
      >
        {doubled.map((project, i) => (
          <ProjectCard key={`${project.id}-${i}`} project={project} />
        ))}
      </div>
    </div>
  );
}

/* ─── Section ─────────────────────────────────────────────────────── */
export default function Projects() {
  return (
    <section id="projects" className="relative py-24 overflow-hidden">
      {/* Header */}
      <div className="px-6 md:px-10 mx-auto max-w-6xl mb-12">
        <h2 className="font-display font-bold text-3xl sm:text-4xl text-mist-100 max-w-2xl">
          Projects
        </h2>
        <p className="mt-4 max-w-xl text-mist-400">
          Dari sistem akademik, Landing page, website bisnis, sampai platform komunitas.
        </p>
      </div>

      {/* Carousel Row 1 — left to right (normal) */}
      <div className="mb-5">
        <MarqueeTrack items={projects} speed={38} reverse={false} />
      </div>

      {/* Carousel Row 2 — right to left (reverse), for visual depth */}
      <div>
        <MarqueeTrack items={[...projects].reverse()} speed={28} reverse={true} />
      </div>
    </section>
  );
}
