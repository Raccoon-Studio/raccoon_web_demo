import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

/* ───────────────────── Config ───────────────────── */

const TOTAL_DURATION = 1000; // ms

const greetings = [
  { text: "Hello", script: "Latin" },
  { text: "Bonjour", script: "Latin" },
  { text: "こんにちは", script: "CJK" },
  { text: "مرحبا", script: "Arabic" },
  { text: "Ciao", script: "Latin" },
  { text: "नमस्ते", script: "Devanagari" },
];

/* ───────────────────── Golden Particle System ───────────────────── */

function LuxuryParticles() {
  const particles = useRef(
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 2 + 0.5,
      duration: 4 + Math.random() * 6,
      delay: Math.random() * 3,
      type: Math.random() > 0.7 ? "diamond" : "circle",
    })),
  ).current;

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute"
          style={{ left: `${p.x}%`, top: `${p.y}%` }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{
            opacity: [0, 0.6, 0.3, 0],
            scale: [0, 1, 0.8, 0],
            y: [0, -60, -120],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay + 0.8,
            repeat: Infinity,
            ease: "easeOut",
          }}
        >
          {p.type === "diamond" ? (
            <div
              className="rotate-45"
              style={{
                width: p.size * 2,
                height: p.size * 2,
                background:
                  "linear-gradient(135deg, rgba(212,175,55,0.8), rgba(255,215,0,0.3))",
                boxShadow: "0 0 6px rgba(212,175,55,0.3)",
              }}
            />
          ) : (
            <div
              className="rounded-full"
              style={{
                width: p.size,
                height: p.size,
                background: "rgba(212,175,55,0.5)",
                boxShadow: "0 0 4px rgba(212,175,55,0.2)",
              }}
            />
          )}
        </motion.div>
      ))}
    </div>
  );
}

/* ───────────────────── Morphing Ring ───────────────────── */

function MorphingRing({ progress }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
      <svg
        width="240"
        height="240"
        viewBox="0 0 240 240"
        className="absolute"
        style={{ filter: "drop-shadow(0 0 20px rgba(212,175,55,0.1))" }}
      >
        {/* Track ring */}
        <circle
          cx="120"
          cy="120"
          r="100"
          fill="none"
          stroke="rgba(255,255,255,0.03)"
          strokeWidth="0.5"
        />

        {/* Progress ring */}
        <motion.circle
          cx="120"
          cy="120"
          r="100"
          fill="none"
          stroke="url(#goldGradient)"
          strokeWidth="1"
          strokeLinecap="round"
          strokeDasharray={`${2 * Math.PI * 100}`}
          strokeDashoffset={2 * Math.PI * 100 * (1 - progress / 100)}
          transform="rotate(-90 120 120)"
          style={{
            filter: "drop-shadow(0 0 8px rgba(212,175,55,0.3))",
          }}
        />

        {/* Inner subtle ring */}
        <motion.circle
          cx="120"
          cy="120"
          r="85"
          fill="none"
          stroke="rgba(212,175,55,0.04)"
          strokeWidth="0.5"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Outer glow ring */}
        <motion.circle
          cx="120"
          cy="120"
          r="112"
          fill="none"
          stroke="rgba(212,175,55,0.02)"
          strokeWidth="0.3"
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        />

        {/* Moving dot on ring */}
        {progress > 0 && progress < 100 && (
          <motion.circle
            cx={
              120 +
              100 * Math.cos(((progress / 100) * 360 - 90) * (Math.PI / 180))
            }
            cy={
              120 +
              100 * Math.sin(((progress / 100) * 360 - 90) * (Math.PI / 180))
            }
            r="2.5"
            fill="#d4af37"
            style={{
              filter: "drop-shadow(0 0 6px rgba(212,175,55,0.6))",
            }}
          />
        )}

        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#f5e6a3" stopOpacity="0.7" />
            <stop offset="100%" stopColor="#d4af37" stopOpacity="0.9" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ───────────────────── Raccoon Emblem ───────────────────── */

function RaccoonEmblem() {
  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{
        duration: 1.2,
        ease: [0.22, 1, 0.36, 1],
        delay: 0.2,
      }}
      className="relative"
    >
      {/* Soft glow behind */}
      <motion.div
        className="absolute inset-0 -m-8 rounded-full"
        animate={{
          boxShadow: [
            "0 0 40px rgba(212,175,55,0)",
            "0 0 80px rgba(212,175,55,0.08)",
            "0 0 40px rgba(212,175,55,0)",
          ],
        }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      />

      <motion.div
        animate={{ y: [0, -4, 0] }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <svg
          width="72"
          height="72"
          viewBox="0 0 80 80"
          fill="none"
          className="overflow-visible"
        >
          {/* Left ear */}
          <motion.path
            d="M18 32L10 12C10 12 16 18 26 26"
            stroke="rgba(212,175,55,0.5)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="rgba(212,175,55,0.03)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Right ear */}
          <motion.path
            d="M62 32L70 12C70 12 64 18 54 26"
            stroke="rgba(212,175,55,0.5)"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="rgba(212,175,55,0.03)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Head */}
          <motion.ellipse
            cx="40"
            cy="44"
            rx="24"
            ry="22"
            stroke="url(#emblemGold)"
            strokeWidth="1.2"
            fill="rgba(212,175,55,0.01)"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Eye masks */}
          <motion.ellipse
            cx="31"
            cy="40"
            rx="7.5"
            ry="5.5"
            fill="rgba(212,175,55,0.04)"
            stroke="rgba(212,175,55,0.12)"
            strokeWidth="0.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.5 }}
          />
          <motion.ellipse
            cx="49"
            cy="40"
            rx="7.5"
            ry="5.5"
            fill="rgba(212,175,55,0.04)"
            stroke="rgba(212,175,55,0.12)"
            strokeWidth="0.5"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 1.55, duration: 0.5 }}
          />

          {/* Left eye */}
          <motion.circle
            cx="31"
            cy="40"
            r="2"
            fill="#d4af37"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 1.7,
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          />
          <motion.circle
            cx="32"
            cy="39"
            r="0.8"
            fill="rgba(255,255,255,0.5)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.9, type: "spring", stiffness: 400 }}
          />

          {/* Right eye */}
          <motion.circle
            cx="49"
            cy="40"
            r="2"
            fill="#d4af37"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 1.75,
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          />
          <motion.circle
            cx="50"
            cy="39"
            r="0.8"
            fill="rgba(255,255,255,0.5)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 1.95, type: "spring", stiffness: 400 }}
          />

          {/* Nose */}
          <motion.ellipse
            cx="40"
            cy="48"
            rx="2.5"
            ry="2"
            fill="#d4af37"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              delay: 1.8,
              type: "spring",
              stiffness: 300,
              damping: 15,
            }}
          />
          <motion.ellipse
            cx="39.2"
            cy="47.3"
            rx="1"
            ry="0.6"
            fill="rgba(255,255,255,0.25)"
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 2, type: "spring", stiffness: 400 }}
          />

          {/* Smile */}
          <motion.path
            d="M36 52 C38 54.5, 42 54.5, 44 52"
            stroke="rgba(212,175,55,0.4)"
            strokeWidth="1"
            strokeLinecap="round"
            fill="none"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ delay: 2.1, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          />

          {/* Whiskers */}
          <motion.g
            initial={{ opacity: 0, x: 3 }}
            animate={{ opacity: 0.25, x: 0 }}
            transition={{ delay: 2.2, duration: 0.5 }}
          >
            <line
              x1="14"
              y1="43"
              x2="24"
              y2="45"
              stroke="#d4af37"
              strokeWidth="0.5"
              strokeLinecap="round"
            />
            <line
              x1="14"
              y1="47"
              x2="24"
              y2="47"
              stroke="#d4af37"
              strokeWidth="0.5"
              strokeLinecap="round"
            />
            <line
              x1="15"
              y1="51"
              x2="24"
              y2="49"
              stroke="#d4af37"
              strokeWidth="0.4"
              strokeLinecap="round"
            />
          </motion.g>
          <motion.g
            initial={{ opacity: 0, x: -3 }}
            animate={{ opacity: 0.25, x: 0 }}
            transition={{ delay: 2.25, duration: 0.5 }}
          >
            <line
              x1="66"
              y1="43"
              x2="56"
              y2="45"
              stroke="#d4af37"
              strokeWidth="0.5"
              strokeLinecap="round"
            />
            <line
              x1="66"
              y1="47"
              x2="56"
              y2="47"
              stroke="#d4af37"
              strokeWidth="0.5"
              strokeLinecap="round"
            />
            <line
              x1="65"
              y1="51"
              x2="56"
              y2="49"
              stroke="#d4af37"
              strokeWidth="0.4"
              strokeLinecap="round"
            />
          </motion.g>

          {/* Blink overlays */}
          <motion.rect
            x="24"
            y="35"
            width="14"
            height="10"
            rx="7"
            fill="var(--color-bg, #0a0b0f)"
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 3,
              times: [0, 0.28, 0.3, 0.32, 0.36, 0.6, 0.62, 0.64, 0.66, 0.7, 1],
            }}
            style={{ originY: 0.5 }}
          />
          <motion.rect
            x="42"
            y="35"
            width="14"
            height="10"
            rx="7"
            fill="var(--color-bg, #0a0b0f)"
            initial={{ scaleY: 0 }}
            animate={{
              scaleY: [0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0],
            }}
            transition={{
              duration: 5,
              repeat: Infinity,
              delay: 3,
              times: [0, 0.28, 0.3, 0.32, 0.36, 0.6, 0.62, 0.64, 0.66, 0.7, 1],
            }}
            style={{ originY: 0.5 }}
          />

          <defs>
            <linearGradient id="emblemGold" x1="16" y1="22" x2="64" y2="66">
              <stop offset="0%" stopColor="#d4af37" stopOpacity="0.6" />
              <stop offset="50%" stopColor="#f5e6a3" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#d4af37" stopOpacity="0.6" />
            </linearGradient>
          </defs>
        </svg>
      </motion.div>
    </motion.div>
  );
}

/* ───────────────────── Letter-by-Letter Reveal ───────────────────── */

function StaggerText({
  text,
  className = "",
  delay = 0,
  stagger = 0.03,
  gold = false,
}) {
  const letters = text.split("");

  return (
    <span className={`inline-flex overflow-hidden ${className}`}>
      {letters.map((letter, i) => (
        <motion.span
          key={`${letter}-${i}`}
          initial={{ y: "110%", opacity: 0, rotateX: 40 }}
          animate={{ y: "0%", opacity: 1, rotateX: 0 }}
          transition={{
            duration: 0.6,
            delay: delay + i * stagger,
            ease: [0.22, 1, 0.36, 1],
          }}
          className={
            gold
              ? "text-transparent bg-clip-text bg-linear-to-r from-[#d4af37] via-[#f5e6a3] to-[#d4af37]"
              : ""
          }
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {letter === " " ? "\u00A0" : letter}
        </motion.span>
      ))}
    </span>
  );
}

/* ───────────────────── Horizontal Lines ───────────────────── */

function DecorativeLines() {
  return (
    <>
      {/* Top line */}
      <motion.div
        className="absolute top-[20%] left-0 right-0 h-px"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.03 }}
        transition={{ duration: 2, delay: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)",
          originX: 0.5,
        }}
      />

      {/* Bottom line */}
      <motion.div
        className="absolute bottom-[20%] left-0 right-0 h-px"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 0.03 }}
        transition={{ duration: 2, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(212,175,55,0.3), transparent)",
          originX: 0.5,
        }}
      />

      {/* Left vertical line */}
      <motion.div
        className="absolute left-[15%] top-0 bottom-0 w-px"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 0.02 }}
        transition={{ duration: 2.5, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(212,175,55,0.2), transparent)",
          originY: 0,
        }}
      />

      {/* Right vertical line */}
      <motion.div
        className="absolute right-[15%] top-0 bottom-0 w-px"
        initial={{ scaleY: 0, opacity: 0 }}
        animate={{ scaleY: 1, opacity: 0.02 }}
        transition={{ duration: 2.5, delay: 0.8, ease: [0.22, 1, 0.36, 1] }}
        style={{
          background:
            "linear-gradient(180deg, transparent, rgba(212,175,55,0.2), transparent)",
          originY: 1,
        }}
      />
    </>
  );
}

/* ───────────────────── Main Preloader ───────────────────── */

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [phase, setPhase] = useState("greeting"); // greeting → brand → ready
  const progressValue = useMotionValue(0);
  const smoothProgress = useTransform(progressValue, (v) => Math.round(v));

  // Smooth animated progress
  useEffect(() => {
    const controls = animate(progressValue, 100, {
      duration: TOTAL_DURATION / 1000,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
    });
    return () => controls.stop();
  }, [progressValue]);

  // Greeting rotation
  useEffect(() => {
    if (phase !== "greeting") return;
    const interval = setInterval(() => {
      setGreetingIndex((prev) => {
        if (prev >= greetings.length - 1) {
          clearInterval(interval);
          setTimeout(() => setPhase("brand"), 200);
          return prev;
        }
        return prev + 1;
      });
    }, 300);
    return () => clearInterval(interval);
  }, [phase]);

  // Transition to ready
  useEffect(() => {
    if (progress >= 100 && phase === "brand") {
      const t = setTimeout(() => setPhase("ready"), 600);
      return () => clearTimeout(t);
    }
  }, [progress, phase]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-bg overflow-hidden"
      exit={{
        opacity: 0,
        transition: { duration: 0.5, delay: 0.3 },
      }}
    >
      {/* ── Multi-layer exit curtains ── */}
      <motion.div
        className="absolute inset-0 z-[4] bg-bg"
        exit={{
          y: "-100%",
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0 },
        }}
      />
      <motion.div
        className="absolute inset-0 z-[3]"
        style={{ background: "linear-gradient(to bottom, #0a0b0f, #0d0e14)" }}
        exit={{
          y: "-100%",
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.08 },
        }}
      />
      <motion.div
        className="absolute inset-0 z-[2]"
        style={{ background: "linear-gradient(to bottom, #0d0e14, #111318)" }}
        exit={{
          y: "-100%",
          transition: { duration: 0.8, ease: [0.76, 0, 0.24, 1], delay: 0.16 },
        }}
      />

      {/* ── Background ── */}
      <div className="absolute inset-0 z-[5]">
        {/* Deep vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_50%_at_50%_50%,transparent_20%,rgba(0,0,0,0.6)_100%)]" />

        {/* Golden ambient glow */}
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            opacity: [0.03, 0.07, 0.03],
          }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(212,175,55,0.12) 0%, transparent 60%)",
          }}
        />

        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.02, 0.05, 0.02],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-[40%] w-[500px] h-[500px] rounded-full"
          style={{
            background:
              "radial-gradient(circle, rgba(139,92,246,0.08) 0%, transparent 60%)",
          }}
        />

        <DecorativeLines />
        <LuxuryParticles />
      </div>

      {/* ── Main Content ── */}
      <div className="absolute inset-0 z-[6] flex items-center justify-center">
        <div className="relative flex flex-col items-center">
          {/* Progress ring */}
          <div className="relative w-60 h-60 flex items-center justify-center mb-12">
            <MorphingRing progress={progress} />

            {/* Raccoon emblem in center */}
            <RaccoonEmblem />
          </div>

          {/* ── Text content ── */}
          <div className="h-20 flex items-center justify-center mb-8">
            <AnimatePresence mode="wait">
              {/* Greeting phase */}
              {phase === "greeting" && (
                <motion.div
                  key={`greet-${greetingIndex}`}
                  initial={{ y: 24, opacity: 0, filter: "blur(8px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -24, opacity: 0, filter: "blur(8px)" }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="text-center"
                >
                  <span className="font-display text-3xl sm:text-4xl md:text-5xl font-light tracking-[0.02em] text-white/80">
                    {greetings[greetingIndex].text}
                  </span>
                </motion.div>
              )}

              {/* Brand reveal phase */}
              {phase === "brand" && (
                <motion.div
                  key="brand"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -16, filter: "blur(6px)" }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center gap-4"
                >
                  {/* Thin line above */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="w-12 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
                    }}
                  />

                  {/* Studio name — letter by letter */}
                  <div className="overflow-hidden">
                    <StaggerText
                      text="RACCOON STUDIO"
                      delay={0.15}
                      stagger={0.04}
                      className="font-display text-lg sm:text-xl md:text-2xl font-bold tracking-[0.35em] text-white/90"
                    />
                  </div>

                  {/* Tagline */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      delay: 0.9,
                      duration: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                  >
                    <span className="font-body text-[11px] sm:text-xs tracking-[0.25em] uppercase text-[#d4af37]/40">
                      Premium Digital Craft
                    </span>
                  </motion.div>

                  {/* Thin line below */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.6,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="w-12 h-px"
                    style={{
                      background:
                        "linear-gradient(90deg, transparent, rgba(212,175,55,0.4), transparent)",
                    }}
                  />
                </motion.div>
              )}

              {/* Ready phase */}
              {phase === "ready" && (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="flex flex-col items-center gap-3"
                >
                  <div className="overflow-hidden">
                    <motion.div
                      initial={{ y: "100%" }}
                      animate={{ y: "0%" }}
                      transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <span className="font-display text-xl sm:text-2xl font-light tracking-[0.04em] text-white/80">
                        Let's create something{" "}
                        <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-[#f5e6a3] to-[#d4af37]">
                          extraordinary
                        </span>
                      </span>
                    </motion.div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Progress info ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col items-center gap-5"
          >
            {/* Elegant progress bar */}
            <div className="relative w-48">
              {/* Track */}
              <div className="w-full h-px bg-white/[0.04] rounded-full" />

              {/* Fill */}
              <motion.div
                className="absolute top-0 left-0 h-px rounded-full"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, rgba(212,175,55,0.1), rgba(212,175,55,0.6), rgba(245,230,163,0.5), rgba(212,175,55,0.6), rgba(212,175,55,0.1))",
                  backgroundSize: "200% 100%",
                  boxShadow: "0 0 12px rgba(212,175,55,0.15)",
                }}
                animate={{
                  backgroundPosition: ["0% 0%", "200% 0%"],
                }}
                transition={{
                  backgroundPosition: {
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                  },
                }}
              />

              {/* Glow point at tip */}
              {progress > 0 && progress < 100 && (
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-1 h-1 rounded-full bg-[#f5e6a3]"
                  style={{
                    left: `${progress}%`,
                    boxShadow:
                      "0 0 8px rgba(245,230,163,0.5), 0 0 20px rgba(212,175,55,0.2)",
                  }}
                  animate={{ opacity: [0.5, 1, 0.5] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </div>

            {/* Counter + status */}
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] tracking-[0.3em] tabular-nums text-white/20 w-10 text-right">
                {progress}
              </span>

              <motion.div
                className="w-px h-3"
                style={{
                  background:
                    "linear-gradient(180deg, transparent, rgba(212,175,55,0.2), transparent)",
                }}
              />

              <AnimatePresence mode="wait">
                {progress < 100 ? (
                  <motion.span
                    key="loading"
                    className="flex items-center gap-2"
                    exit={{ opacity: 0, x: -8 }}
                  >
                    {/* Animated dots */}
                    <span className="flex gap-0.5">
                      {[0, 1, 2].map((i) => (
                        <motion.span
                          key={i}
                          className="w-0.5 h-0.5 rounded-full bg-[#d4af37]/40"
                          animate={{ opacity: [0.2, 0.8, 0.2] }}
                          transition={{
                            duration: 1.2,
                            repeat: Infinity,
                            delay: i * 0.2,
                          }}
                        />
                      ))}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-white/12">
                      Preparing your experience
                    </span>
                  </motion.span>
                ) : (
                  <motion.span
                    key="ready"
                    initial={{ opacity: 0, x: 8 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="flex items-center gap-2"
                  >
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 15,
                      }}
                      className="w-1 h-1 rounded-full bg-[#d4af37]"
                      style={{ boxShadow: "0 0 6px rgba(212,175,55,0.4)" }}
                    />
                    <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-[#d4af37]/40">
                      Ready
                    </span>
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Corner elements ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute z-[7] top-8 left-8 hidden sm:block"
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/[0.06]">
          Est. 2019
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute z-[7] top-8 right-8 hidden sm:block"
      >
        <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/[0.06]">
          San Francisco
        </span>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute z-[7] bottom-8 left-1/2 -translate-x-1/2"
      >
        <div className="flex items-center gap-3">
          <motion.div
            className="w-6 h-px"
            style={{
              background:
                "linear-gradient(90deg, transparent, rgba(212,175,55,0.15))",
            }}
          />
          <span className="font-mono text-[8px] uppercase tracking-[0.3em] text-white/[0.06]">
            Raccoon Studio © 2025
          </span>
          <motion.div
            className="w-6 h-px"
            style={{
              background:
                "linear-gradient(90deg, rgba(212,175,55,0.15), transparent)",
            }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
