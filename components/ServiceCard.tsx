"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Check } from "lucide-react";
import type { Service } from "@/lib/data";
import { contact } from "@/lib/data";

export default function ServiceCard({ service, delay = 0 }: { service: Service; delay?: number }) {
  // 3D tilt
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [5, -5]), { stiffness: 260, damping: 26 });
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-5, 5]), { stiffness: 260, damping: 26 });

  function handleMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const rect = e.currentTarget.getBoundingClientRect();
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5);
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5);
  }
  function handleMouseLeave() { mouseX.set(0); mouseY.set(0); }

  return (
    <div style={{ perspective: 900 }}>
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: "-80px" }}
      transition={{ duration: 0.55, delay, ease: "easeOut" }}
      style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative rounded-2xl p-7 flex flex-col cursor-default ${
        service.featured
          ? "card-solid border-l-gold-400 card-featured-glow"
          : "card-solid"
      }`}
    >
      {service.featured && (
        <span className="absolute -top-3 left-7 eyebrow rounded-full bg-gold-500 px-3 py-1 text-ink-950 font-semibold">
          populer
        </span>
      )}

      <h3 className="font-display font-semibold text-lg text-mist-100 mb-1">
        {service.name}
      </h3>
      <p className="text-2xl font-display font-bold text-gold-400 mb-4">
        {service.price}
      </p>
      <p className="text-sm text-mist-400 leading-relaxed mb-6">
        {service.description}
      </p>

      <ul className="space-y-2.5 mb-8 flex-1">
        {service.deliverables.map((d) => (
          <li key={d} className="flex items-start gap-2 text-sm text-mist-300">
            <Check size={16} className="text-gold-400 mt-0.5 shrink-0" />
            {d}
          </li>
        ))}
      </ul>

      <a
        href={`https://wa.me/${contact.whatsapp}?text=${encodeURIComponent(
          `Halo Najwan, saya tertarik dengan paket "${service.name}"`
        )}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex items-center justify-center rounded-full px-5 py-2.5 text-sm font-semibold transition-colors ${
          service.featured
            ? "bg-gold-500 text-ink-950 hover:bg-gold-400"
            : "border border-white/15 text-mist-100 hover:border-gold-400/60 hover:text-gold-400"
        }`}
      >
        Pilih Paket
      </a>
    </motion.div>
    </div>
  );
}