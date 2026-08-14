"use client";

import { useEffect, useRef, useState } from "react";

type Phase = "gate" | "playing" | "fading" | "done";

export default function IntroDoor({ onComplete }: { onComplete: () => void }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [phase, setPhase] = useState<Phase>("gate");

  /* ── Lock scroll ── */
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, []);

  /* ── Reduced-motion: skip langsung ── */
  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      document.body.style.overflow = "";
      onComplete();
    }
  }, [onComplete]);

  /* ── Klik gate → langsung play dengan suara ── */
  const handleEnter = () => {
    const vid = videoRef.current;
    if (!vid || phase !== "gate") return;
    vid.muted = false;
    vid.play().catch(() => {
      // Fallback: jika browser tetap blokir, play tetap tapi muted
      vid.muted = true;
      vid.play();
    });
    setPhase("playing");
  };

  /* ── Video selesai → fade ── */
  const triggerFade = () => {
    if (phase !== "playing") return;
    setPhase("fading");
    setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
      onComplete();
    }, 900);
  };

  /* ── Skip langsung ── */
  const handleSkip = (e: React.MouseEvent) => {
    e.stopPropagation();
    setPhase("fading");
    setTimeout(() => {
      setPhase("done");
      document.body.style.overflow = "";
      onComplete();
    }, 900);
  };

  if (phase === "done") return null;

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 z-[100] bg-black"
      style={{
        opacity: phase === "fading" ? 0 : 1,
        transition: phase === "fading" ? "opacity 0.9s cubic-bezier(0.4,0,0.2,1)" : "none",
        pointerEvents: phase === "fading" ? "none" : "auto",
      }}
    >
      {/* ── VIDEO (preload, paused sampai diklik) ── */}
      <video
        ref={videoRef}
        src="/intro.mp4"
        muted
        playsInline
        preload="auto"
        onEnded={triggerFade}
        className="absolute inset-0 w-full h-full object-cover"
        style={{
          opacity: phase === "playing" ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* ── GATE SCREEN ── */}
      {phase === "gate" && (
        <div
          onClick={handleEnter}
          className="absolute inset-0 flex flex-col items-center justify-center cursor-pointer select-none overflow-hidden"
          style={{ background: "#08080D" }}
        >
          {/* ── Scrolling dot-grid (sama seperti portfolio) ── */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              backgroundImage:
                "radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px)",
              backgroundSize: "40px 40px",
              animation: "grid-scroll 4s linear infinite",
              maskImage: "radial-gradient(ellipse 80% 80% at 50% 50%, black 30%, transparent 100%)",
            }}
          />

          {/* ── Rotating beam 1 (panjang, gold, blur) ── */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "50%", left: "50%",
              width: "180vmax", height: "2px",
              background: "linear-gradient(90deg, transparent 0%, rgba(212,175,122,0.0) 30%, rgba(212,175,122,0.55) 50%, rgba(212,175,122,0.0) 70%, transparent 100%)",
              filter: "blur(3px)",
              animation: "beam-rotate 9s linear infinite",
              transformOrigin: "center center",
            }}
          />
          {/* ── Rotating beam 2 (lebih tipis, kebalikan arah) ── */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "50%", left: "50%",
              width: "180vmax", height: "1px",
              background: "linear-gradient(90deg, transparent 0%, rgba(232,201,137,0.0) 35%, rgba(232,201,137,0.35) 50%, rgba(232,201,137,0.0) 65%, transparent 100%)",
              filter: "blur(5px)",
              animation: "beam-rotate-reverse 13s linear infinite",
              transformOrigin: "center center",
            }}
          />
          {/* ── Rotating beam 3 (offset 60deg) ── */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "50%", left: "50%",
              width: "180vmax", height: "1.5px",
              background: "linear-gradient(90deg, transparent 0%, rgba(184,146,90,0.0) 35%, rgba(184,146,90,0.4) 50%, rgba(184,146,90,0.0) 65%, transparent 100%)",
              filter: "blur(4px)",
              animation: "beam-rotate 17s linear infinite",
              transform: "translate(-50%, -50%) rotate(60deg)",
              transformOrigin: "center center",
            }}
          />

          {/* ── Sweeping streak lines ── */}
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="absolute pointer-events-none"
              style={{
                top: `${28 + i * 22}%`,
                left: 0,
                width: "35vw",
                height: i === 1 ? "1px" : "0.5px",
                background: "linear-gradient(90deg, transparent, rgba(212,175,122,0.6), transparent)",
                filter: "blur(1px)",
                animation: `streak-sweep ${6 + i * 2.4}s ease-in-out infinite`,
                animationDelay: `${i * 2.1}s`,
              }}
            />
          ))}

          {/* ── Glow besar di tengah ── */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "50%", left: "50%",
              transform: "translate(-50%, -50%)",
              width: "600px", height: "600px",
              borderRadius: "50%",
              background: "radial-gradient(circle, rgba(212,175,122,0.12) 0%, rgba(184,146,90,0.05) 40%, transparent 70%)",
              animation: "gate-glow-pulse 4s ease-in-out infinite",
            }}
          />

          {/* ── Glow kecil tajam di balik NP ── */}
          <div
            className="absolute pointer-events-none"
            style={{
              top: "50%", left: "50%",
              transform: "translate(-50%, -60%)",
              width: "200px", height: "80px",
              borderRadius: "50%",
              background: "radial-gradient(ellipse, rgba(232,201,137,0.25) 0%, transparent 70%)",
              filter: "blur(20px)",
              animation: "gate-glow-pulse 2.5s ease-in-out infinite",
              animationDelay: "0.5s",
            }}
          />

          {/* ── Logo NP floating ── */}
          <div
            className="relative z-10 font-display font-extrabold tracking-widest select-none"
            style={{
              fontSize: "clamp(5rem, 14vw, 10rem)",
              background: "linear-gradient(135deg, #F0D88A 0%, #D4AF7A 45%, #B8925A 80%, #E8C989 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              filter: "drop-shadow(0 0 50px rgba(212,175,122,0.5)) drop-shadow(0 0 20px rgba(212,175,122,0.3))",
              animation: "gate-float 4s ease-in-out infinite",
              marginBottom: "2rem",
            }}
          >
            NP
          </div>

          {/* ── Garis dekoratif tipis ── */}
          <div
            className="relative z-10 flex items-center gap-3 mb-6"
            style={{ animation: "gate-fade-in 1s ease-out 0.3s both" }}
          >
            <div style={{ width: "48px", height: "1px", background: "linear-gradient(to right, transparent, rgba(212,175,122,0.5))" }} />
            <span style={{ fontFamily: "monospace", fontSize: "0.65rem", letterSpacing: "0.3em", color: "rgba(212,175,122,0.5)" }}>
              MUHAMMAD NAJWAN PRATOMO
            </span>
            <div style={{ width: "48px", height: "1px", background: "linear-gradient(to left, transparent, rgba(212,175,122,0.5))" }} />
          </div>

          {/* ── Play button ── */}
          <div
            className="relative z-10 flex flex-col items-center gap-4"
            style={{ animation: "gate-fade-in 1s ease-out 0.6s both" }}
          >
            <div
              className="flex items-center justify-center w-16 h-16 rounded-full"
              style={{
                border: "1.5px solid rgba(212,175,122,0.5)",
                background: "rgba(212,175,122,0.06)",
                backdropFilter: "blur(8px)",
                animation: "gate-ring-pulse 2s ease-out infinite",
              }}
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                <polygon
                  points="7,4 21,12 7,20"
                  fill="rgba(212,175,122,0.85)"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

            <p style={{
              fontFamily: "monospace",
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              color: "rgba(212,175,122,0.55)",
            }}>
              KLIK UNTUK MASUK
            </p>
          </div>
        </div>
      )}

      {/* ── Gradient bawah (saat video play) ── */}
      {phase === "playing" && (
        <>
          <div
            className="absolute inset-x-0 bottom-0 h-32 pointer-events-none z-10"
            style={{ background: "linear-gradient(to top, rgba(0,0,0,0.65) 0%, transparent 100%)" }}
          />
          {/* Tombol Lewati */}
          <button
            onClick={handleSkip}
            className="absolute bottom-6 right-6 z-20 group flex items-center gap-2 rounded-full border border-white/20 bg-black/40 px-4 py-2.5 text-sm font-medium text-white/70 backdrop-blur-sm transition-all duration-200 hover:border-white/50 hover:text-white hover:bg-black/60 active:scale-95"
            style={{ fontFamily: "monospace", letterSpacing: "0.05em" }}
          >
            <span>lewati</span>
            <svg className="transition-transform duration-200 group-hover:translate-x-1" width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </>
      )}

      {/* Tombol skip juga di gate screen */}
      {phase === "gate" && (
        <button
          onClick={handleSkip}
          className="absolute bottom-6 right-6 z-20 group flex items-center gap-2 rounded-full border border-white/10 bg-transparent px-4 py-2.5 text-sm font-medium text-white/30 backdrop-blur-sm transition-all duration-200 hover:border-white/30 hover:text-white/60 active:scale-95"
          style={{ fontFamily: "monospace", letterSpacing: "0.05em" }}
        >
          <span>lewati</span>
          <svg className="transition-transform duration-200 group-hover:translate-x-1" width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>
      )}
    </div>
  );
}