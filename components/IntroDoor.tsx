"use client";

import { useEffect, useRef, useState } from "react";

type Stage = "idle" | "entering" | "opening" | "done";

const buildings = [
  { w: 34, h: 90, color: "#242034", roof: "flat" },
  { w: 42, h: 120, color: "#332B22", roof: "flat" },
  { w: 30, h: 70, color: "#1E2532", roof: "flat" },
  { w: 48, h: 130, color: "#5A4530", roof: "dome" },
  { w: 50, h: 130, color: "#2C2318", roof: "cone" },
  { w: 60, h: 140, color: "#20242F", roof: "antenna" },
  { w: 32, h: 80, color: "#3D2E1E", roof: "flat" },
  { w: 52, h: 120, color: "#26303F", roof: "dome" },
];

const clouds = [
  { top: "10%", left: "8%", size: 90, opacity: 0.35, duration: 10, delay: 0 },
  { top: "18%", left: "70%", size: 120, opacity: 0.28, duration: 13, delay: 1.5 },
  { top: "8%", left: "45%", size: 70, opacity: 0.3, duration: 9, delay: 0.8 },
  { top: "24%", left: "88%", size: 60, opacity: 0.22, duration: 11, delay: 2.2 },
];

const birdConfigs = [
  { top: "16%", size: 14, speed: 1.1, startDelay: 0 },
  { top: "22%", size: 10, speed: 0.8, startDelay: 220 },
  { top: "12%", size: 12, speed: 1.4, startDelay: 480 },
  { top: "27%", size: 9, speed: 0.65, startDelay: 90 },
];

function Bird({ top, refCb }: { top: string; refCb: (el: HTMLDivElement | null) => void }) {
  return (
    <div ref={refCb} className="pointer-events-none absolute" style={{ top, left: 0, willChange: "transform" }}>
      <svg width="24" height="12" viewBox="0 0 20 10">
        <path
          d="M0,5 Q5,0 10,5 Q15,0 20,5"
          fill="none"
          stroke="#B8B8CC"
          strokeWidth="1.4"
          strokeLinecap="round"
          opacity={0.55}
        />
      </svg>
    </div>
  );
}

function Building({ b, scale }: { b: (typeof buildings)[number]; scale: number }) {
  const w = b.w * scale;
  const h = b.h * scale;
  return (
    <div className="relative shrink-0 flex flex-col items-center">
      {b.roof === "cone" && (
        <div
          className="mb-[-2px]"
          style={{
            width: 0,
            height: 0,
            borderLeft: `${w / 2 + 6 * scale}px solid transparent`,
            borderRight: `${w / 2 + 6 * scale}px solid transparent`,
            borderBottom: `${22 * scale}px solid #2F6E68`,
          }}
        />
      )}
      {b.roof === "dome" && (
        <svg
          width={w + 12 * scale}
          height={(w + 12 * scale) / 2}
          viewBox={`0 0 ${w + 12 * scale} ${(w + 12 * scale) / 2}`}
          className="mb-[-2px]"
        >
          <path
            d={`M0,${(w + 12 * scale) / 2} A${(w + 12 * scale) / 2},${(w + 12 * scale) / 2} 0 0 1 ${w + 12 * scale},${(w + 12 * scale) / 2} Z`}
            fill={b.color}
          />
        </svg>
      )}
      {b.roof === "antenna" && (
        <svg width={70 * scale} height={66 * scale} viewBox="0 0 70 66" className="mb-[-4px]">
          <line x1="35" y1="6" x2="35" y2="60" stroke="#B8B8CC" strokeWidth="2" />
          <line x1="25" y1="18" x2="45" y2="18" stroke="#B8B8CC" strokeWidth="1.5" />
          <line x1="23" y1="30" x2="47" y2="30" stroke="#B8B8CC" strokeWidth="1.5" />
          <line x1="21" y1="42" x2="49" y2="42" stroke="#B8B8CC" strokeWidth="1.5" />
          <circle cx="35" cy="5" r="3" fill="#E24B4A" />
          <line x1="15" y1="60" x2="15" y2="38" stroke="#B8B8CC" strokeWidth="1.2" />
          <ellipse cx="15" cy="38" rx="6" ry="3.4" fill="#B8B8CC" transform="rotate(-25 15 38)" />
          <line x1="55" y1="60" x2="55" y2="42" stroke="#B8B8CC" strokeWidth="1.2" />
          <ellipse cx="55" cy="42" rx="5" ry="2.8" fill="#B8B8CC" transform="rotate(20 55 42)" />
        </svg>
      )}
      <div
        className="relative shrink-0"
        style={{
          width: w,
          height: h,
          background: b.color,
          backgroundImage:
            "repeating-linear-gradient(0deg, transparent, transparent 14px, rgba(212,175,122,0.22) 14px, rgba(212,175,122,0.22) 16px), repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(212,175,122,0.22) 14px, rgba(212,175,122,0.22) 16px)",
        }}
      />
    </div>
  );
}

function Cloud({ top, left, size, opacity, duration, delay }: (typeof clouds)[number]) {
  return (
    <div
      className="pointer-events-none absolute animate-drift-cloud"
      style={{ top, left, animationDuration: `${duration}s`, animationDelay: `${delay}s` }}
    >
      <div className="relative" style={{ width: size, height: size * 0.5 }}>
        <div
          className="absolute rounded-full bg-white blur-md"
          style={{ width: size * 0.6, height: size * 0.6, left: 0, top: size * 0.05, opacity }}
        />
        <div
          className="absolute rounded-full bg-white blur-md"
          style={{ width: size * 0.8, height: size * 0.8, left: size * 0.25, top: -size * 0.05, opacity }}
        />
        <div
          className="absolute rounded-full bg-white blur-md"
          style={{ width: size * 0.5, height: size * 0.5, left: size * 0.6, top: size * 0.1, opacity }}
        />
      </div>
    </div>
  );
}

export default function IntroDoor({ onComplete }: { onComplete: () => void }) {
  const charRef = useRef<HTMLDivElement>(null);
  const legFrontRef = useRef<SVGGElement>(null);
  const legBackRef = useRef<SVGGElement>(null);
  const doorAnchorRef = useRef<HTMLDivElement>(null);
  const birdRefs = useRef<(HTMLDivElement | null)[]>([]);
  const birdX = useRef<number[]>(birdConfigs.map((_, i) => -80 - i * 140));

  const [stage, setStage] = useState<Stage>("idle");
  const [activated, setActivated] = useState(false);
  const [skipped, setSkipped] = useState(false);
  const [scale, setScale] = useState(1);
  const [isTouch, setIsTouch] = useState(false);

  const posX = useRef(0);
  const targetX = useRef(0);
  const doorX = useRef(0);
  const startX = useRef(80);
  const walkPhase = useRef(0);
  const rafId = useRef<number>();
  const stageRef = useRef<Stage>("idle");
  const activatedRef = useRef(false);

  useEffect(() => {
    stageRef.current = stage;
  }, [stage]);

  useEffect(() => {
    activatedRef.current = activated;
  }, [activated]);

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      onComplete();
      return;
    }

    document.body.style.overflow = "hidden";

    const computeScale = () => {
      const w = window.innerWidth;
      return Math.min(1, Math.max(0.55, w / 900));
    };

    const measureDoor = () => {
      if (doorAnchorRef.current) {
        const rect = doorAnchorRef.current.getBoundingClientRect();
        doorX.current = rect.left + rect.width / 2;
      }
    };

    const setup = () => {
      const s = computeScale();
      setScale(s);
      startX.current = Math.max(40, 80 * s);
      posX.current = startX.current;
      targetX.current = startX.current;
      // wait a tick for scale-driven layout to settle before measuring the door
      requestAnimationFrame(measureDoor);
      if (charRef.current) {
        charRef.current.style.transform = `translateX(${posX.current}px)`;
      }
    };
    setup();
    window.addEventListener("resize", setup);

    const tryActivate = (clientX: number, clientY: number) => {
      if (activatedRef.current) return true;
      const dx = Math.abs(clientX - posX.current);
      const nearVertically = clientY > window.innerHeight - 280;
      if (dx < 100 && nearVertically) {
        activatedRef.current = true;
        setActivated(true);
        return true;
      }
      return false;
    };

    const updateTarget = (clientX: number) => {
      const w = window.innerWidth;
      targetX.current = Math.max(startX.current, Math.min(w - 20, clientX));
    };

    const handleMove = (e: MouseEvent) => {
      if (stageRef.current !== "idle") return;
      if (!tryActivate(e.clientX, e.clientY)) return;
      updateTarget(e.clientX);
    };
    window.addEventListener("mousemove", handleMove);

    const handleTouchStart = (e: TouchEvent) => {
      if (stageRef.current !== "idle") return;
      const t = e.touches[0];
      if (!t) return;
      if (tryActivate(t.clientX, t.clientY)) {
        updateTarget(t.clientX);
      }
    };
    const handleTouchMove = (e: TouchEvent) => {
      if (stageRef.current !== "idle") return;
      const t = e.touches[0];
      if (!t) return;
      if (!activatedRef.current) {
        tryActivate(t.clientX, t.clientY);
      }
      if (activatedRef.current) {
        e.preventDefault();
        updateTarget(t.clientX);
      }
    };
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });

    const FOLLOW = 0.3;
    let lastPosX = posX.current;

    const tick = () => {
      const s = stageRef.current;

      if (s === "idle") {
        posX.current += (targetX.current - posX.current) * FOLLOW;
        if (
          Math.abs(posX.current - doorX.current) < 30 &&
          Math.abs(targetX.current - doorX.current) < 70
        ) {
          setStage("entering");
        }
      } else if (s === "entering") {
        posX.current += (doorX.current - posX.current) * 0.2;
        if (Math.abs(posX.current - doorX.current) < 1) {
          posX.current = doorX.current;
          setStage("opening");
        }
      }

      if (charRef.current) {
        charRef.current.style.transform = `translateX(${posX.current}px)`;
      }

      const dx = posX.current - lastPosX;
      lastPosX = posX.current;
      const moving = Math.abs(dx) > 0.15;
      walkPhase.current += moving ? 0.28 : 0;

      const legAngle = moving ? Math.sin(walkPhase.current) * 16 : 0;
      if (legFrontRef.current) {
        legFrontRef.current.setAttribute("transform", `rotate(${legAngle} 28 78)`);
      }
      if (legBackRef.current) {
        legBackRef.current.setAttribute("transform", `rotate(${-legAngle} 40 78)`);
      }

      // fly birds across the screen, looping back off-screen left once they exit right
      const w = window.innerWidth;
      birdConfigs.forEach((cfg, i) => {
        birdX.current[i] += cfg.speed;
        if (birdX.current[i] > w + 60) {
          birdX.current[i] = -80 - Math.random() * 200;
        }
        const flap = Math.abs(Math.sin(birdX.current[i] * 0.05)) * 0.7 + 0.3;
        const el = birdRefs.current[i];
        if (el) {
          el.style.transform = `translateX(${birdX.current[i]}px) scaleY(${flap})`;
        }
      });

      if (stageRef.current !== "opening" && stageRef.current !== "done") {
        rafId.current = requestAnimationFrame(tick);
      }
    };
    rafId.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", setup);
      window.removeEventListener("mousemove", handleMove);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [onComplete]);

  useEffect(() => {
    if (stage === "opening") {
      const t = setTimeout(() => setStage("done"), 1000);
      return () => clearTimeout(t);
    }
    if (stage === "done") {
      document.body.style.overflow = "";
      const t = setTimeout(onComplete, 600);
      return () => clearTimeout(t);
    }
  }, [stage, onComplete]);

  const handleSkip = () => {
    document.body.style.overflow = "";
    setSkipped(true);
    onComplete();
  };

  if (skipped) return null;

  const doorW = 130 * scale;
  const doorH = 260 * scale;
  const doorInnerW = 92 * scale;
  const doorInnerH = 170 * scale;
  const charW = 56 * scale;
  const charH = 100 * scale;

  return (
    <div
      className={`fixed inset-0 z-[100] overflow-hidden transition-opacity duration-500 ${
        stage === "done" ? "opacity-0 pointer-events-none" : "opacity-100"
      }`}
      style={{
        background:
          "linear-gradient(to bottom, #0B0714 0%, #241A3D 40%, #4A2E4F 65%, #B8925A 100%)",
      }}
    >
      <div className="pointer-events-none absolute left-1/2 top-[38%] -translate-x-1/2 h-40 w-40 rounded-full bg-gold-400/50 blur-[70px]" />

      {clouds.map((c, i) => (
        <Cloud key={`cloud-${i}`} {...c} />
      ))}
      {birdConfigs.map((b, i) => (
        <Bird key={`bird-${i}`} top={b.top} refCb={(el) => (birdRefs.current[i] = el)} />
      ))}

      <div
        className="absolute bottom-24 left-0 right-0 flex items-end justify-between px-2 sm:px-5 gap-1 sm:gap-2"
      >
        {buildings.slice(0, 4).map((b, i) => (
          <Building key={`l-${i}`} b={b} scale={scale} />
        ))}

        <div
          ref={doorAnchorRef}
          className="relative shrink-0"
          style={{
            width: doorW,
            height: doorH,
            background: "#241E30",
            backgroundImage:
              "repeating-linear-gradient(0deg, transparent, transparent 14px, rgba(212,175,122,0.22) 14px, rgba(212,175,122,0.22) 16px), repeating-linear-gradient(90deg, transparent, transparent 14px, rgba(212,175,122,0.22) 14px, rgba(212,175,122,0.22) 16px)",
          }}
        >
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2" style={{ perspective: "800px" }}>
            <div className="relative" style={{ width: doorInnerW, height: doorInnerH }}>
              <div className="absolute inset-0 -z-10 bg-gradient-to-b from-gold-400/50 via-violet-400/20 to-transparent" />
              <div className="absolute inset-0 border-2 border-gold-500/50 rounded-t-md" />
              <div
                className="absolute inset-0 rounded-t-md bg-ink-900 border border-white/10 origin-left transition-transform duration-[900ms] ease-in-out"
                style={{
                  transform:
                    stage === "opening" || stage === "done" ? "rotateY(-112deg)" : "rotateY(0deg)",
                  transformStyle: "preserve-3d",
                }}
              >
                <div className="absolute top-1/2 right-2.5 h-1.5 w-1.5 rounded-full bg-gold-400" />
              </div>
            </div>
          </div>
        </div>

        {buildings.slice(4).map((b, i) => (
          <Building key={`r-${i}`} b={b} scale={scale} />
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-24 bg-[#0A0810] border-t border-white/5">
        <div
          className="absolute top-1/2 left-0 right-0 h-[3px] -translate-y-1/2"
          style={{
            backgroundImage:
              "repeating-linear-gradient(90deg, rgba(255,255,255,0.35) 0 24px, transparent 24px 48px)",
          }}
        />
      </div>

      <div ref={charRef} className="absolute bottom-24 left-0 -translate-x-1/2 will-change-transform">
        <svg width={charW} height={charH} viewBox="0 0 70 128" fill="none">
          <g ref={legBackRef}>
            <path d="M40,78 L44,120" stroke="black" strokeWidth="10" strokeLinecap="round" />
            <ellipse cx="45" cy="124" rx="7" ry="4" fill="black" />
          </g>

          <g ref={legFrontRef}>
            <path d="M28,78 L24,120" stroke="black" strokeWidth="10" strokeLinecap="round" />
            <ellipse cx="23" cy="124" rx="7" ry="4" fill="black" />
          </g>

          <rect x="20" y="34" width="26" height="46" rx="10" fill="black" />

          <path d="M22,40 L14,70" stroke="black" strokeWidth="9" strokeLinecap="round" />
          <path d="M44,40 L52,66" stroke="black" strokeWidth="9" strokeLinecap="round" />
          <rect x="48" y="62" width="20" height="15" rx="2.5" fill="black" />

          <circle cx="33" cy="18" r="11" fill="black" />
        </svg>
      </div>

      <div
        className={`absolute top-[28%] left-1/2 -translate-x-1/2 text-center px-6 transition-opacity duration-500 ${
          activated ? "opacity-0" : "opacity-100"
        }`}
      >
        <p className="eyebrow text-mist-300">
          {isTouch ? "sentuh & geser jari untuk mulai jalan" : "arahkan mouse ke orangnya untuk mulai jalan"}
        </p>
      </div>
      <div
        className={`absolute top-[28%] left-1/2 -translate-x-1/2 text-center px-6 transition-opacity duration-500 ${
          activated && stage === "idle" ? "opacity-100" : "opacity-0"
        }`}
      >
        <p className="eyebrow text-mist-300">
          {isTouch ? "geser ke gedung paling ujung →" : "arahkan ke gedung paling ujung →"}
        </p>
      </div>

      <button
        onClick={handleSkip}
        className="absolute bottom-6 right-6 eyebrow text-mist-300 hover:text-gold-400 transition-colors"
      >
        lewati →
      </button>
    </div>
  );
}