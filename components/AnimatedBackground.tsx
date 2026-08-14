"use client";

import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  alphaDir: number;
}

interface Streak {
  x: number;
  y: number;
  len: number;
  alpha: number;
  speed: number;
  angle: number;
  width: number;
}

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf: number;
    let w = 0, h = 0;

    /* ── Particles (titik debu emas mengambang) ── */
    const particles: Particle[] = [];
    const PARTICLE_COUNT = 80;

    /* ── Streaks (garis cahaya diagonal) ── */
    const streaks: Streak[] = [];
    const STREAK_COUNT = 6;

    const resize = () => {
      w = canvas.offsetWidth;
      h = canvas.offsetHeight;
      canvas.width = w;
      canvas.height = h;
    };

    const initParticles = () => {
      particles.length = 0;
      for (let i = 0; i < PARTICLE_COUNT; i++) {
        particles.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.35,
          vy: -Math.random() * 0.4 - 0.1,
          size: Math.random() * 1.8 + 0.4,
          alpha: Math.random() * 0.5 + 0.1,
          alphaDir: Math.random() > 0.5 ? 1 : -1,
        });
      }
    };

    const initStreaks = () => {
      streaks.length = 0;
      for (let i = 0; i < STREAK_COUNT; i++) {
        streaks.push({
          x: Math.random() * w * 1.5 - w * 0.25,
          y: Math.random() * h,
          len: Math.random() * 200 + 120,
          alpha: Math.random() * 0.12 + 0.04,
          speed: Math.random() * 0.6 + 0.3,
          angle: -Math.PI / 6 + (Math.random() - 0.5) * 0.4,
          width: Math.random() * 1.2 + 0.4,
        });
      }
    };

    resize();
    initParticles();
    initStreaks();
    window.addEventListener("resize", () => { resize(); initParticles(); initStreaks(); });

    let t = 0;

    const draw = () => {
      t += 0.008;
      ctx.clearRect(0, 0, w, h);

      /* ── 1. Aurora glow orbs ── */
      const orbs = [
        { cx: w * 0.72, cy: h * 0.35, r: 320, phase: 0 },
        { cx: w * 0.15, cy: h * 0.6,  r: 220, phase: 1.8 },
        { cx: w * 0.5,  cy: h * 0.1,  r: 180, phase: 3.5 },
      ];
      for (const o of orbs) {
        const pulse = Math.sin(t + o.phase) * 0.06 + 0.94;
        const grad = ctx.createRadialGradient(o.cx, o.cy, 0, o.cx, o.cy, o.r * pulse);
        grad.addColorStop(0,   "rgba(212,175,122,0.09)");
        grad.addColorStop(0.5, "rgba(184,146,90,0.04)");
        grad.addColorStop(1,   "rgba(8,8,13,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(o.cx, o.cy, o.r * pulse, 0, Math.PI * 2);
        ctx.fill();
      }

      /* ── 2. Diagonal streaks ── */
      for (const s of streaks) {
        const dx = Math.cos(s.angle) * s.len;
        const dy = Math.sin(s.angle) * s.len;
        const grad = ctx.createLinearGradient(s.x, s.y, s.x + dx, s.y + dy);
        grad.addColorStop(0,   `rgba(232,201,137,0)`);
        grad.addColorStop(0.4, `rgba(212,175,122,${s.alpha})`);
        grad.addColorStop(0.7, `rgba(232,201,137,${s.alpha * 0.7})`);
        grad.addColorStop(1,   `rgba(232,201,137,0)`);
        ctx.beginPath();
        ctx.strokeStyle = grad;
        ctx.lineWidth = s.width;
        ctx.globalAlpha = 1;
        ctx.moveTo(s.x, s.y);
        ctx.lineTo(s.x + dx, s.y + dy);
        ctx.stroke();

        // Move streak
        s.x += Math.cos(s.angle + Math.PI / 2) * s.speed;
        s.y += Math.sin(s.angle + Math.PI / 2) * s.speed;

        // Reset when off screen
        if (s.y > h + 50 || s.x > w + 200 || s.x < -200) {
          s.x = Math.random() * w * 1.5 - w * 0.25;
          s.y = -80;
          s.alpha = Math.random() * 0.12 + 0.04;
        }
      }

      /* ── 3. Floating gold particles ── */
      ctx.globalAlpha = 1;
      for (const p of particles) {
        p.x += p.vx;
        p.y += p.vy;
        p.alpha += p.alphaDir * 0.004;
        if (p.alpha > 0.65 || p.alpha < 0.05) p.alphaDir *= -1;

        if (p.y < -10) { p.y = h + 10; p.x = Math.random() * w; }
        if (p.x < -10) p.x = w + 10;
        if (p.x > w + 10) p.x = -10;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212,175,122,${p.alpha})`;
        ctx.fill();
      }

      /* ── 4. Horizontal scan line (subtle, slow) ── */
      const scanY = ((t * 0.12) % 1) * h;
      const scanGrad = ctx.createLinearGradient(0, scanY - 60, 0, scanY + 60);
      scanGrad.addColorStop(0,   "rgba(212,175,122,0)");
      scanGrad.addColorStop(0.5, "rgba(212,175,122,0.025)");
      scanGrad.addColorStop(1,   "rgba(212,175,122,0)");
      ctx.fillStyle = scanGrad;
      ctx.fillRect(0, scanY - 60, w, 120);

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 0 }}
    />
  );
}
