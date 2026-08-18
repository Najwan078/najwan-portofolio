"use client";

import { motion } from "framer-motion";

// Deterministic seed-based pseudo-random untuk menghindari hydration mismatch
function seededRandom(seed: number) {
  const x = Math.sin(seed + 1) * 10000;
  return x - Math.floor(x);
}

const COUNT = 22;
const particleData = Array.from({ length: COUNT }, (_, i) => ({
  id: i,
  x: seededRandom(i * 3) * 100,
  y: seededRandom(i * 7 + 1) * 100,
  size: 2 + Math.floor(seededRandom(i * 5 + 2) * 2.5),
  duration: 9 + seededRandom(i * 11) * 12,
  delay: seededRandom(i * 13 + 3) * 7,
  opacity: 0.1 + seededRandom(i * 17 + 4) * 0.13,
  yRange: 18 + seededRandom(i * 19 + 5) * 16,
}));

export default function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {particleData.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            backgroundColor: "#D4AF7A",
            opacity: p.opacity,
            willChange: "transform, opacity",
          }}
          animate={{
            y: [0, -p.yRange, 0],
            opacity: [p.opacity, p.opacity * 1.6, p.opacity],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}
