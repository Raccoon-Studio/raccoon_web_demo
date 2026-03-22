import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useMotionValue,
  useTransform,
  animate,
} from "framer-motion";

/* ───────────────────── Config ───────────────────── */

const TOTAL_DURATION = 3200;

const greetings = [
  { text: "Hello", lang: "English" },
  { text: "Bonjour", lang: "French" },
  { text: "こんにちは", lang: "Japanese" },
  { text: "مرحبا", lang: "Arabic" },
  { text: "Ciao", lang: "Italian" },
  { text: "नमस्ते", lang: "Hindi" },
  { text: "Hola", lang: "Spanish" },
];

/* ───────────────────── Letter Stagger ───────────────────── */

function RevealText({
  text,
  className = "",
  delay = 0,
  stagger = 0.035,
  gradient = false,
}) {
  return (
    <span className={`inline-flex flex-nowrap justify-center ${className}`}>
      {text.split("").map((char, i) => (
        <span
          key={`${char}-${i}`}
          className="overflow-hidden inline-block shrink-0"
        >
          <motion.span
            initial={{ y: "120%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.7,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            className={`inline-block ${
              gradient
                ? "text-transparent bg-clip-text bg-linear-to-r from-accent via-cyan to-accent"
                : ""
            }`}
          >
            {char === " " ? "\u00A0" : char}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ───────────────────── Word Reveal ───────────────────── */

function WordReveal({ text, className = "", delay = 0, stagger = 0.12 }) {
  const words = text.split(" ");

  return (
    <span
      className={`inline-flex flex-wrap justify-center gap-x-[0.3em] ${className}`}
    >
      {words.map((word, i) => (
        <span key={`${word}-${i}`} className="overflow-hidden inline-block">
          <motion.span
            initial={{ y: "110%", opacity: 0 }}
            animate={{ y: "0%", opacity: 1 }}
            transition={{
              duration: 0.8,
              delay: delay + i * stagger,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="inline-block"
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}

/* ───────────────────── Progress Ring (minimal) ───────────────────── */

function ProgressArc({ progress }) {
  const r = 54;
  const circumference = 2 * Math.PI * r;

  return (
    <svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      className="absolute inset-0 m-auto"
    >
      {/* Track */}
      <circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke="currentColor"
        className="text-white/[0.03]"
        strokeWidth="0.5"
      />

      {/* Fill */}
      <motion.circle
        cx="60"
        cy="60"
        r={r}
        fill="none"
        stroke="url(#progressGrad)"
        strokeWidth="1"
        strokeLinecap="round"
        strokeDasharray={circumference}
        strokeDashoffset={circumference * (1 - progress / 100)}
        transform="rotate(-90 60 60)"
        style={{ filter: "drop-shadow(0 0 6px rgba(16,185,129,0.25))" }}
      />

      <defs>
        <linearGradient id="progressGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-accent, #10b981)" />
          <stop offset="50%" stopColor="var(--color-cyan, #06b6d4)" />
          <stop offset="100%" stopColor="var(--color-accent, #10b981)" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ───────────────────── Main Preloader ───────────────────── */

export default function Preloader() {
  const [progress, setProgress] = useState(0);
  const [greetingIndex, setGreetingIndex] = useState(0);
  const [phase, setPhase] = useState("greeting"); // greeting → brand → tagline → ready
  const progressValue = useMotionValue(0);

  /* smooth progress counter */
  useEffect(() => {
    const controls = animate(progressValue, 100, {
      duration: TOTAL_DURATION / 1000,
      ease: [0.25, 0.1, 0.25, 1],
      onUpdate: (v) => setProgress(Math.round(v)),
    });
    return () => controls.stop();
  }, [progressValue]);

  /* greeting rotation */
  useEffect(() => {
    if (phase !== "greeting") return;
    const id = setInterval(() => {
      setGreetingIndex((prev) => {
        if (prev >= greetings.length - 1) {
          clearInterval(id);
          setTimeout(() => setPhase("brand"), 250);
          return prev;
        }
        return prev + 1;
      });
    }, 220);
    return () => clearInterval(id);
  }, [phase]);

  /* phase progression */
  useEffect(() => {
    if (phase === "brand") {
      const t = setTimeout(() => setPhase("tagline"), 1200);
      return () => clearTimeout(t);
    }
    if (phase === "tagline" && progress >= 100) {
      const t = setTimeout(() => setPhase("ready"), 800);
      return () => clearTimeout(t);
    }
  }, [phase, progress]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] bg-dark overflow-hidden"
      exit={{ opacity: 0, transition: { duration: 0.4, delay: 0.3 } }}
    >
      {/* ── Exit curtains ── */}
      <motion.div
        className="absolute inset-0 z-[4] bg-dark"
        exit={{
          y: "-100%",
          transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1] },
        }}
      />
      <motion.div
        className="absolute inset-0 z-[3] bg-dark/80"
        exit={{
          y: "-100%",
          transition: { duration: 0.9, ease: [0.76, 0, 0.24, 1], delay: 0.06 },
        }}
      />

      {/* ── Background ── */}
      <div className="absolute inset-0 z-[5]">
        {/* Vignette */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_60%_at_50%_50%,transparent_20%,rgba(0,0,0,0.5)_100%)]" />

        {/* Accent glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full"
          animate={{ scale: [1, 1.1, 1], opacity: [0.02, 0.05, 0.02] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          style={{
            background:
              "radial-gradient(circle, rgba(16,185,129,0.1) 0%, transparent 60%)",
          }}
        />

        {/* Cyan glow */}
        <motion.div
          className="absolute top-[45%] left-[55%] -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full"
          animate={{ scale: [1, 1.15, 1], opacity: [0.01, 0.04, 0.01] }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1.5,
          }}
          style={{
            background:
              "radial-gradient(circle, rgba(6,182,212,0.08) 0%, transparent 60%)",
          }}
        />

        {/* Horizontal line */}
        <motion.div
          className="absolute top-1/2 left-0 right-0 h-px -translate-y-1/2"
          initial={{ scaleX: 0, opacity: 0 }}
          animate={{ scaleX: 1, opacity: 0.03 }}
          transition={{ duration: 2.5, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background:
              "linear-gradient(90deg, transparent, rgba(16,185,129,0.3), transparent)",
          }}
        />
      </div>

      {/* ── Content ── */}
      <div className="absolute inset-0 z-[6] flex items-center justify-center">
        <div className="relative flex flex-col items-center w-full max-w-3xl px-6">
          {/* ── Greeting / Brand / Tagline ── */}
          <div className="relative h-[200px] flex items-center justify-center w-full mb-16">
            <AnimatePresence mode="wait">
              {/* Greeting Phase */}
              {phase === "greeting" && (
                <motion.div
                  key={`greet-${greetingIndex}`}
                  initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  exit={{ y: -30, opacity: 0, filter: "blur(10px)" }}
                  transition={{ duration: 0.18, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute flex flex-col items-center gap-3"
                >
                  <span className="font-display text-4xl sm:text-5xl md:text-6xl font-light tracking-[0.02em] text-text-primary/80">
                    {greetings[greetingIndex].text}
                  </span>
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.05 }}
                    className="font-mono text-[9px] uppercase tracking-[0.4em] text-text-dim/30"
                  >
                    {greetings[greetingIndex].lang}
                  </motion.span>
                </motion.div>
              )}

              {/* Brand Phase */}
              {phase === "brand" && (
                <motion.div
                  key="brand"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, scale: 0.98, filter: "blur(4px)" }}
                  transition={{ duration: 0.5 }}
                  className="absolute flex flex-col items-center"
                >
                  {/* Accent line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.1,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="w-8 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent mb-8"
                  />

                  {/* RACCOON */}
                  <div className="overflow-hidden">
                    <RevealText
                      text="RACCOON"
                      delay={0.15}
                      stagger={0.04}
                      className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.15em] text-text-primary/90 leading-none"
                    />
                  </div>

                  {/* STUDIO */}
                  <div className="overflow-hidden mt-1">
                    <RevealText
                      text="STUDIO"
                      delay={0.45}
                      stagger={0.04}
                      gradient
                      className="font-display text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black tracking-[0.15em] leading-none"
                    />
                  </div>

                  {/* Accent line */}
                  <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      duration: 0.8,
                      delay: 0.8,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="w-8 h-px bg-linear-to-r from-transparent via-accent/40 to-transparent mt-8"
                  />
                </motion.div>
              )}

              {/* Tagline Phase */}
              {phase === "tagline" && (
                <motion.div
                  key="tagline"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -12, filter: "blur(6px)" }}
                  transition={{ duration: 0.6 }}
                  className="absolute flex flex-col items-center"
                >
                  {/* Compact brand */}
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-4 mb-8"
                  >
                    <motion.span
                      className="h-px w-6 bg-linear-to-r from-transparent to-accent/30"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      style={{ transformOrigin: "left" }}
                    />
                    <span className="font-grotesk text-[10px] font-semibold tracking-[0.35em] uppercase text-text-dim/50">
                      Raccoon Studio
                    </span>
                    <motion.span
                      className="h-px w-6 bg-linear-to-l from-transparent to-accent/30"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: 0.2 }}
                      style={{ transformOrigin: "right" }}
                    />
                  </motion.div>

                  {/* Main tagline */}
                  <WordReveal
                    text="Crafting digital experiences"
                    delay={0.2}
                    stagger={0.1}
                    className="font-display text-2xl sm:text-3xl md:text-4xl font-light text-text-primary/80 tracking-tight leading-snug"
                  />

                  <div className="mt-2">
                    <WordReveal
                      text="that push boundaries."
                      delay={0.6}
                      stagger={0.1}
                      className="font-display text-2xl sm:text-3xl md:text-4xl font-light tracking-tight leading-snug text-transparent bg-clip-text bg-linear-to-r from-accent via-cyan to-accent"
                    />
                  </div>

                  {/* Sub-labels */}
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.1, duration: 0.6 }}
                    className="mt-8 flex items-center gap-6"
                  >
                    {["Design", "Develop", "Deploy"].map((word, i) => (
                      <motion.span
                        key={word}
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          delay: 1.2 + i * 0.1,
                          duration: 0.5,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        className="font-mono text-[9px] uppercase tracking-[0.3em] text-text-dim/30 flex items-center gap-3"
                      >
                        {i > 0 && (
                          <span className="w-1 h-1 rounded-full bg-accent/20" />
                        )}
                        {word}
                      </motion.span>
                    ))}
                  </motion.div>
                </motion.div>
              )}

              {/* Ready Phase */}
              {phase === "ready" && (
                <motion.div
                  key="ready"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute flex flex-col items-center gap-4"
                >
                  <motion.div
                    animate={{ opacity: [0.4, 1, 0.4] }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="w-2 h-2 rounded-full bg-accent"
                    style={{ boxShadow: "0 0 12px rgba(16,185,129,0.4)" }}
                  />

                  <span className="font-display text-xl sm:text-2xl font-light tracking-[0.03em] text-text-primary/70">
                    Welcome
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Progress Section ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="flex flex-col items-center gap-6 w-full max-w-xs"
          >
            {/* Progress bar */}
            <div className="relative w-full">
              {/* Track */}
              <div className="w-full h-px bg-white/[0.04] rounded-full" />

              {/* Fill */}
              <motion.div
                className="absolute top-0 left-0 h-px rounded-full"
                style={{
                  width: `${progress}%`,
                  background:
                    "linear-gradient(90deg, rgba(16,185,129,0.05), rgba(16,185,129,0.5), rgba(6,182,212,0.4), rgba(16,185,129,0.5), rgba(16,185,129,0.05))",
                  boxShadow: "0 0 10px rgba(16,185,129,0.15)",
                }}
              />

              {/* Tip glow */}
              {progress > 0 && progress < 100 && (
                <motion.div
                  className="absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full"
                  style={{
                    left: `${progress}%`,
                    background: "rgba(16,185,129,0.8)",
                    boxShadow:
                      "0 0 8px rgba(16,185,129,0.5), 0 0 20px rgba(16,185,129,0.2)",
                    transform: "translate(-50%, -50%)",
                  }}
                  animate={{ opacity: [0.6, 1, 0.6] }}
                  transition={{ duration: 1.2, repeat: Infinity }}
                />
              )}
            </div>

            {/* Counter row */}
            <div className="flex items-center justify-between w-full">
              <div className="flex items-center gap-2">
                <AnimatePresence mode="wait">
                  {progress < 100 ? (
                    <motion.span
                      key="loading-label"
                      exit={{ opacity: 0, x: -6 }}
                      className="flex items-center gap-2"
                    >
                      <span className="flex gap-[3px]">
                        {[0, 1, 2].map((i) => (
                          <motion.span
                            key={i}
                            className="w-[3px] h-[3px] rounded-full bg-accent/30"
                            animate={{ opacity: [0.2, 0.8, 0.2] }}
                            transition={{
                              duration: 1,
                              repeat: Infinity,
                              delay: i * 0.15,
                            }}
                          />
                        ))}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-text-dim/25">
                        Loading
                      </span>
                    </motion.span>
                  ) : (
                    <motion.span
                      key="complete-label"
                      initial={{ opacity: 0, x: 6 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-2"
                    >
                      <span className="w-1 h-1 rounded-full bg-accent shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
                      <span className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent/40">
                        Complete
                      </span>
                    </motion.span>
                  )}
                </AnimatePresence>
              </div>

              <span className="font-mono text-[10px] tabular-nums tracking-[0.2em] text-text-dim/20">
                {String(progress).padStart(3, "0")}
              </span>
            </div>
          </motion.div>
        </div>
      </div>

      {/* ── Corner Typography ── */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute z-[7] top-7 left-7 font-mono text-[8px] uppercase tracking-[0.35em] text-text-dim/8 hidden sm:block"
      >
        Est. 2019
      </motion.span>

      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1, duration: 1 }}
        className="absolute z-[7] top-7 right-7 font-mono text-[8px] uppercase tracking-[0.35em] text-text-dim/8 hidden sm:block"
      >
        San Francisco, CA
      </motion.span>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute z-[7] bottom-7 left-1/2 -translate-x-1/2 flex items-center gap-3"
      >
        <motion.span
          className="w-5 h-px bg-linear-to-r from-transparent to-accent/10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{ transformOrigin: "left" }}
        />
        <span className="font-mono text-[8px] uppercase tracking-[0.35em] text-text-dim/8">
          Raccoon Studio © {new Date().getFullYear()}
        </span>
        <motion.span
          className="w-5 h-px bg-linear-to-l from-transparent to-accent/10"
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          style={{ transformOrigin: "right" }}
        />
      </motion.div>
    </motion.div>
  );
}
