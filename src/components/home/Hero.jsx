import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";

import {
  clientLogos,
  heroStats as stats,
  heroCaseStudies as caseStudies,
  heroTechStack as techStack,
} from "../../data/hero";

/* ───────────────────── Utilities ───────────────────── */

function RevealLine({ children, delay = 0, className = "" }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "120%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.9, delay, ease: [0.22, 1, 0.36, 1] }}
        className={`block ${className}`}
      >
        {children}
      </motion.span>
    </span>
  );
}

function GlowOrb({ className, color, delay = 0, duration = 20 }) {
  return (
    <motion.div
      animate={{
        x: [0, 40, -20, 0],
        y: [0, -30, 20, 0],
        scale: [1, 1.08, 0.95, 1],
      }}
      transition={{ duration, repeat: Infinity, ease: "linear", delay }}
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{
        background: `radial-gradient(circle, ${color} 0%, transparent 65%)`,
      }}
    />
  );
}

/* ───────────────────── Dashboard ───────────────────── */

function DashboardPreview() {
  const [activeCase, setActiveCase] = useState(0);

  useEffect(() => {
    const t = setInterval(
      () => setActiveCase((p) => (p + 1) % caseStudies.length),
      4000,
    );
    return () => clearInterval(t);
  }, []);

  const current = caseStudies[activeCase];

  return (
    <div className="relative rounded-[24px] border border-white/8 bg-white/3 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* Glow */}
      <div className="absolute -top-20 -right-14 w-44 h-44 rounded-full bg-accent/6 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-16 -left-14 w-40 h-40 rounded-full bg-cyan/5 blur-[70px] pointer-events-none" />

      {/* Chrome */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/6">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="w-2 h-2 rounded-full bg-white/7" />
            <span className="w-2 h-2 rounded-full bg-white/7" />
          </div>
          <span className="font-mono text-[8px] tracking-widest text-white/15 uppercase">
            raccoon.studio/dashboard
          </span>
        </div>
        <motion.span
          animate={{ opacity: [1, 0.4, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-emerald/8 border border-emerald/15"
        >
          <span className="w-1 h-1 rounded-full bg-emerald" />
          <span className="font-mono text-[7px] uppercase tracking-widest text-emerald/80">
            Live
          </span>
        </motion.span>
      </div>

      <div className="p-4 space-y-3">
        {/* Case study rotator */}
        <div className="rounded-xl border border-white/6 bg-white/1.5 p-3.5">
          <div className="flex items-center justify-between mb-3">
            <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/25">
              Client Results
            </span>
            <div className="flex gap-1">
              {caseStudies.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveCase(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeCase ? "bg-accent w-4" : "bg-white/10 w-1.5"
                  }`}
                />
              ))}
            </div>
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeCase}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.3 }}
              className="flex items-center justify-between"
            >
              <div>
                <h4 className="text-[13px] font-semibold text-white/90">
                  {current.client}
                </h4>
                <p className="text-[9px] text-white/25 font-mono uppercase tracking-wider mt-0.5">
                  {current.type} · {current.timeline}
                </p>
              </div>
              <div className="text-right">
                <div className="font-display text-2xl font-bold text-accent leading-none">
                  {current.metric}
                </div>
                <p className="text-[8px] text-white/20 font-mono mt-0.5">
                  {current.metricLabel}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* KPI row */}
        <div className="grid grid-cols-3 gap-2">
          {[
            { label: "Retention", val: "93%", sub: "+8%" },
            { label: "On-Time", val: "100%", sub: null },
            { label: "NPS", val: "78", sub: "+12" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9 + i * 0.07 }}
              className="rounded-lg border border-white/5 bg-white/1.5 p-2.5"
            >
              <span className="font-mono text-[7px] uppercase tracking-wider text-white/20 block mb-1">
                {s.label}
              </span>
              <div className="flex items-baseline gap-1">
                <span className="font-display text-sm font-bold text-white/80">
                  {s.val}
                </span>
                {s.sub && (
                  <span className="text-[8px] font-mono text-emerald/70">
                    {s.sub}
                  </span>
                )}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Testimonial */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.1 }}
          className="rounded-xl border border-white/5 bg-white/1 p-3"
        >
          <p className="text-[10px] text-white/40 leading-relaxed italic mb-2">
            "Shipped 3 weeks early. 10k users in month one."
          </p>
          <div className="flex items-center gap-2">
            <img
              src="https://i.pravatar.cc/32?img=23"
              alt=""
              className="w-4 h-4 rounded-full"
            />
            <span className="font-mono text-[8px] text-white/25 uppercase tracking-wider">
              Sarah Chen · CEO, Helios Finance
            </span>
          </div>
        </motion.div>

        {/* Tech */}
        <div className="flex items-center gap-1.5 pt-0.5">
          {techStack.map((t, i) => (
            <motion.span
              key={t.name}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 + i * 0.04 }}
              className="inline-flex items-center gap-1 px-1.5 py-0.5 rounded bg-white/2 border border-white/4"
            >
              <span
                className="w-1 h-1 rounded-full"
                style={{ backgroundColor: t.color + "50" }}
              />
              <span className="font-mono text-[7px] uppercase tracking-wider text-white/20">
                {t.name}
              </span>
            </motion.span>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ───────────────────── HERO ───────────────────── */

export default function Hero() {
  const ref = useRef(null);
  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 0.97]);

  const cfg = { stiffness: 80, damping: 30 };
  const cardX = useSpring(useTransform(mx, [0, 1], [-4, 4]), cfg);
  const cardY = useSpring(useTransform(my, [0, 1], [-4, 4]), cfg);

  const onMove = useCallback(
    (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    },
    [mx, my],
  );

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      className="relative min-h-screen overflow-hidden bg-bg flex items-center"
    >
      {/* BG grid */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.06) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.06) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_50%,transparent,var(--color-bg)_80%)]" />
      </div>

      <GlowOrb
        className="top-[-8%] right-[-6%] w-120 h-120"
        color="rgba(139,92,246,0.08)"
        duration={24}
      />
      <GlowOrb
        className="bottom-[-10%] left-[-6%] w-104 h-104"
        color="rgba(34,211,238,0.05)"
        delay={4}
        duration={20}
      />

      <div className="absolute bottom-0 inset-x-0 h-32 bg-linear-to-t from-bg to-transparent pointer-events-none z-5" />

      {/* ── Content ── */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 container-custom w-full pt-32 sm:pt-36 lg:pt-40 pb-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* ════════ LEFT — Compact & Visual ════════ */}
          <div className="lg:pl-16">
            {/* ── Row 1: Badge + Inline stats ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.08, duration: 0.5 }}
              className="flex items-center gap-3 mb-8"
            >
              <span className="inline-flex items-center gap-2 rounded-full border border-emerald/20 bg-emerald/5 px-3 py-1.5">
                <span className="relative flex h-1.5 w-1.5">
                  <span className="absolute inset-0 rounded-full bg-emerald/50 animate-ping" />
                  <span className="relative rounded-full h-1.5 w-1.5 bg-emerald" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.13em] text-emerald/80 font-medium">
                  Accepting projects
                </span>
              </span>

              <span className="hidden sm:flex items-center gap-1 text-amber-400/60">
                {[...Array(5)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-2.5 h-2.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="font-mono text-[9px] text-white/25 ml-0.5">
                  4.9
                </span>
              </span>
            </motion.div>

            {/* ── Headline — 2 lines max ── */}
            <h1 className="font-display font-extrabold tracking-[-0.045em] leading-[0.95] text-[clamp(3rem,6vw,5.5rem)] text-text-primary mb-6">
              <RevealLine delay={0.15}>Ideas in.</RevealLine>
              <RevealLine delay={0.25}>
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-linear-to-r from-accent via-violet-400 to-cyan">
                    Revenue out.
                  </span>
                  <motion.span
                    className="absolute -bottom-1.5 left-0 w-full h-[3px] rounded-full bg-linear-to-r from-accent to-cyan"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{
                      delay: 0.7,
                      duration: 0.7,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    style={{ originX: 0 }}
                  />
                </span>
              </RevealLine>
            </h1>

            {/* ── Subtitle — single line ── */}
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.38, duration: 0.5 }}
              className="text-[15px] sm:text-base text-text-secondary leading-relaxed mb-8 max-w-md"
            >
              We design, build & launch digital products.{" "}
              <span className="text-text-secondary/80">
                50+ shipped. MVPs in 3–5 weeks.
              </span>
            </motion.p>

            {/* ── CTAs — HIGH up on page ── */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.46, duration: 0.5 }}
              className="flex flex-wrap items-center gap-3 mb-10"
            >
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.03, y: -1 }}
                whileTap={{ scale: 0.98 }}
                className="group relative inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 font-grotesk text-[13px] font-bold uppercase tracking-[0.12em] text-dark overflow-hidden shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-shadow duration-500"
              >
                <span className="relative z-10 flex items-center gap-2">
                  Book a Call
                  <svg
                    className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path d="M7 17L17 7M17 7H7M17 7V17" />
                  </svg>
                </span>
                <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
              </motion.a>

              <motion.a
                href="#work"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="group inline-flex items-center gap-2 rounded-full border border-border bg-white/3 px-7 py-3.5 font-grotesk text-[13px] font-semibold uppercase tracking-[0.12em] text-text-secondary hover:text-text-primary hover:border-border-hover hover:bg-white/5 transition-all duration-300"
              >
                Case Studies
                <svg
                  className="w-3.5 h-3.5 opacity-40 group-hover:opacity-70 group-hover:translate-x-0.5 transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M9 5l7 7-7 7" />
                </svg>
              </motion.a>
            </motion.div>

            {/* ── Stats as compact inline row ── */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.5 }}
              className="flex items-center gap-6 mb-8"
            >
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.6 + i * 0.06 }}
                  className="flex items-baseline gap-2"
                >
                  <span className="font-display text-lg sm:text-xl font-bold text-text-primary">
                    {s.value}
                  </span>
                  <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
                    {s.label}
                  </span>
                  {i < stats.length - 1 && (
                    <span className="ml-4 w-px h-4 bg-border" />
                  )}
                </motion.div>
              ))}
            </motion.div>

            {/* ── Client logos — readable text, not cryptic icons ── */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7, duration: 0.5 }}
              className="flex items-center gap-4"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-dim shrink-0">
                Trusted by
              </span>
              <div className="flex items-center gap-5">
                {clientLogos.map((c, i) => (
                  <motion.span
                    key={c.name}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.75 + i * 0.05 }}
                    className="font-grotesk text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-text-dim hover:text-text-muted transition-colors duration-300 cursor-default"
                  >
                    {c.letters}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ════════ RIGHT ════════ */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{
              delay: 0.3,
              duration: 0.9,
              ease: [0.22, 1, 0.36, 1],
            }}
            style={{ x: cardX, y: cardY }}
            className="relative hidden lg:block"
          >
            <div className="relative max-w-[500px] mx-auto">
              <DashboardPreview />

              {/* Float — delivery (positioned to NOT overlap dashboard) */}
              <motion.div
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.1, duration: 0.5 }}
                className="absolute -left-8 top-[35%]"
              >
                <motion.div
                  animate={{ y: [0, -4, 0] }}
                  transition={{
                    duration: 4.5,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="rounded-xl border border-white/8 bg-[#0d0f14]/95 backdrop-blur-xl px-3.5 py-2.5 shadow-2xl shadow-black/40"
                >
                  <div className="flex items-center gap-2">
                    <div className="w-7 h-7 rounded-lg bg-accent/10 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3.5 h-3.5 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <path d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-[11px] text-white/80 font-semibold leading-none">
                        3–5 <span className="text-accent">weeks</span>
                      </p>
                      <p className="font-mono text-[7px] text-white/25 uppercase tracking-wider mt-0.5">
                        avg. delivery
                      </p>
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              {/* Float — availability */}
              <motion.div
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.25, duration: 0.5 }}
                className="absolute -right-6 bottom-[20%]"
              >
                <motion.div
                  animate={{ y: [0, 4, 0] }}
                  transition={{
                    duration: 5,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: 1,
                  }}
                  className="rounded-xl border border-white/8 bg-[#0d0f14]/95 backdrop-blur-xl px-3 py-2 shadow-2xl shadow-black/40"
                >
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inset-0 rounded-full bg-emerald/40 animate-ping" />
                      <span className="relative rounded-full h-2 w-2 bg-emerald" />
                    </span>
                    <span className="font-mono text-[8px] uppercase tracking-widest text-emerald/80 font-medium">
                      Q3 open
                    </span>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10"
      >
        <motion.div
          animate={{ y: [0, 6, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="w-4 h-7 rounded-full border border-white/10 flex items-start justify-center p-1"
        >
          <span className="w-0.5 h-1.5 rounded-full bg-white/20" />
        </motion.div>
      </motion.div>
    </section>
  );
}
