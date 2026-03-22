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
  carouselSlides,
  clientLogos,
  heroTechStack,
} from "../../data/hero.jsx";

/* ───────── tiny helpers ───────── */

const ease = [0.22, 1, 0.36, 1];

function RevealLine({ children, delay = 0, className = "" }) {
  return (
    <span className="block overflow-hidden">
      <motion.span
        initial={{ y: "120%", opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: "-120%", opacity: 0 }}
        transition={{ duration: 0.7, delay, ease }}
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

/* ──────────────────────────────────
   CARD VARIANTS — one per slide type
   ────────────────────────────────── */

function MetricsCard({ card }) {
  return (
    <div className="p-4 space-y-3">
      {/* Mini chart */}
      <div className="rounded-xl border border-white/6 bg-white/1.5 p-3.5">
        <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/25 block mb-3">
          {card.title}
        </span>
        <div className="flex items-end gap-[3px] h-12 mb-3">
          {card.chart.map((v, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              animate={{ height: `${v}%` }}
              transition={{ delay: 0.8 + i * 0.04, duration: 0.5, ease }}
              className="flex-1 rounded-sm bg-gradient-to-t from-accent/30 to-accent/60"
            />
          ))}
        </div>
        <div className="grid grid-cols-3 gap-2">
          {card.kpis.map((k, i) => (
            <motion.div
              key={k.label}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.1 + i * 0.06 }}
              className="text-center"
            >
              <span
                className={`font-display text-base font-bold ${k.color} block`}
              >
                {k.value}
              </span>
              <span className="font-mono text-[7px] text-white/25 uppercase tracking-wider">
                {k.sub}
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <TestimonialBlock testimonial={card.testimonial} />
    </div>
  );
}

function TimelineCard({ card }) {
  return (
    <div className="p-4 space-y-3">
      <div className="rounded-xl border border-white/6 bg-white/1.5 p-3.5">
        <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/25 block mb-3">
          {card.title}
        </span>
        <div className="space-y-2.5">
          {card.phases.map((phase, i) => (
            <motion.div
              key={phase.name}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.12, ease }}
              className="flex gap-3"
            >
              {/* Timeline dot + line */}
              <div className="flex flex-col items-center pt-1">
                <span
                  className={`w-2 h-2 rounded-full border-2 ${
                    phase.status === "complete"
                      ? "bg-emerald border-emerald"
                      : phase.status === "active"
                        ? "bg-cyan border-cyan animate-pulse"
                        : "bg-transparent border-white/15"
                  }`}
                />
                {i < card.phases.length - 1 && (
                  <span
                    className={`w-px flex-1 mt-1 ${
                      phase.status === "complete"
                        ? "bg-emerald/30"
                        : "bg-white/6"
                    }`}
                  />
                )}
              </div>
              <div className="pb-2">
                <div className="flex items-baseline gap-2 mb-1">
                  <span className="text-[11px] font-semibold text-white/85">
                    {phase.name}
                  </span>
                  <span className="font-mono text-[7px] text-white/25 uppercase tracking-wider">
                    {phase.days}
                  </span>
                </div>
                <div className="flex flex-wrap gap-1">
                  {phase.items.map((item) => (
                    <span
                      key={item}
                      className="px-1.5 py-0.5 rounded bg-white/3 border border-white/5 font-mono text-[7px] text-white/30 uppercase tracking-wider"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <TestimonialBlock testimonial={card.testimonial} />
    </div>
  );
}

function ScaleCard({ card }) {
  return (
    <div className="p-4 space-y-3">
      <div className="rounded-xl border border-white/6 bg-white/1.5 p-3.5">
        <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/25 block mb-3">
          {card.title}
        </span>
        <div className="space-y-2">
          {card.metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, x: -6 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 + i * 0.08, ease }}
              className="space-y-1"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-[8px] text-white/30 uppercase tracking-wider">
                  {m.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className="font-display text-xs font-bold text-white/80">
                    {m.value}
                  </span>
                  <span
                    className={`font-mono text-[7px] ${
                      m.trend.startsWith("+")
                        ? "text-emerald/70"
                        : "text-cyan/70"
                    }`}
                  >
                    {m.trend}
                  </span>
                </div>
              </div>
              <div className="h-1 rounded-full bg-white/5 overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${m.bar}%` }}
                  transition={{ delay: 1 + i * 0.1, duration: 0.7, ease }}
                  className="h-full rounded-full bg-gradient-to-r from-violet-500/50 to-accent/50"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Nodes */}
        <div className="flex gap-2 mt-3">
          {card.nodes.map((n, i) => (
            <motion.div
              key={n.name}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.2 + i * 0.06 }}
              className="flex-1 rounded-lg border border-white/5 bg-white/2 p-2 text-center"
            >
              <span className="relative flex h-1.5 w-1.5 mx-auto mb-1">
                <span className="absolute inset-0 rounded-full bg-emerald/30 animate-ping" />
                <span className="relative rounded-full h-1.5 w-1.5 bg-emerald" />
              </span>
              <span className="font-mono text-[7px] text-white/30 uppercase tracking-wider block">
                {n.name}
              </span>
              <span className="font-display text-[10px] font-bold text-white/60">
                {n.load}%
              </span>
            </motion.div>
          ))}
        </div>
      </div>
      <TestimonialBlock testimonial={card.testimonial} />
    </div>
  );
}

function TechStackCard({ card }) {
  return (
    <div className="p-4 space-y-3">
      <div className="rounded-xl border border-white/6 bg-white/1.5 p-3.5">
        <span className="font-mono text-[8px] uppercase tracking-[0.12em] text-white/25 block mb-3">
          {card.title}
        </span>
        <div className="space-y-3">
          {card.categories.map((cat, ci) => (
            <motion.div
              key={cat.name}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8 + ci * 0.1, ease }}
            >
              <span className="font-mono text-[7px] text-white/20 uppercase tracking-widest block mb-1.5">
                {cat.name}
              </span>
              <div className="flex flex-wrap gap-1.5">
                {cat.tools.map((tool, ti) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.9 + ci * 0.1 + ti * 0.04 }}
                    whileHover={{ scale: 1.08, y: -1 }}
                    className="flex items-center gap-1.5 px-2 py-1 rounded-lg bg-white/3 border border-white/6 cursor-default group"
                  >
                    <span
                      className="w-1.5 h-1.5 rounded-full transition-shadow duration-300 group-hover:shadow-[0_0_6px]"
                      style={{
                        backgroundColor: tool.color + "80",
                        boxShadow: undefined,
                      }}
                    />
                    <span className="font-mono text-[8px] text-white/40 uppercase tracking-wider group-hover:text-white/60 transition-colors">
                      {tool.name}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <TestimonialBlock testimonial={card.testimonial} />
    </div>
  );
}

function TestimonialBlock({ testimonial }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1.3 }}
      className="rounded-xl border border-white/5 bg-white/1 p-3"
    >
      <p className="text-[10px] text-white/40 leading-relaxed italic mb-2">
        "{testimonial.quote}"
      </p>
      <div className="flex items-center gap-2">
        <img src={testimonial.avatar} alt="" className="w-4 h-4 rounded-full" />
        <span className="font-mono text-[8px] text-white/25 uppercase tracking-wider">
          {testimonial.author} · {testimonial.role}
        </span>
      </div>
    </motion.div>
  );
}

/* card type router */
const cardComponents = {
  metrics: MetricsCard,
  timeline: TimelineCard,
  scale: ScaleCard,
  techstack: TechStackCard,
};

/* ──────────────────────────────────
   DASHBOARD SHELL (wraps each card)
   ────────────────────────────────── */

function DashboardShell({ slide }) {
  const CardComponent = cardComponents[slide.card.type];

  return (
    <div className="relative rounded-[24px] border border-white/8 bg-white/3 backdrop-blur-xl shadow-[0_24px_80px_rgba(0,0,0,0.5)] overflow-hidden">
      {/* glow accents */}
      <div className="absolute -top-20 -right-14 w-44 h-44 rounded-full bg-accent/6 blur-[80px] pointer-events-none" />
      <div className="absolute -bottom-16 -left-14 w-40 h-40 rounded-full bg-cyan/5 blur-[70px] pointer-events-none" />

      {/* chrome bar */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/6">
        <div className="flex items-center gap-2.5">
          <div className="flex gap-1.5">
            <span className="w-2 h-2 rounded-full bg-white/10" />
            <span className="w-2 h-2 rounded-full bg-white/7" />
            <span className="w-2 h-2 rounded-full bg-white/7" />
          </div>
          <span className="font-mono text-[8px] tracking-widest text-white/15 uppercase">
            raccoon.studio/{slide.id}
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

      <AnimatePresence mode="wait">
        <motion.div
          key={slide.id}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, ease }}
        >
          <CardComponent card={slide.card} />
        </motion.div>
      </AnimatePresence>

      {/* tech footer */}
      <div className="px-4 pb-3 flex items-center gap-1.5">
        {heroTechStack.map((t, i) => (
          <motion.span
            key={t.name}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.4 + i * 0.04 }}
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
  );
}

/* ──────────────────────────────────
   PROGRESS BAR
   ────────────────────────────────── */

function SlideProgress({ total, active, onSelect, progress }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <button
          key={i}
          onClick={() => onSelect(i)}
          className="relative h-1 rounded-full overflow-hidden transition-all duration-300"
          style={{ width: i === active ? 32 : 12 }}
        >
          <span className="absolute inset-0 bg-white/10 rounded-full" />
          {i === active && (
            <motion.span
              className="absolute inset-0 bg-accent rounded-full origin-left"
              style={{ scaleX: progress }}
            />
          )}
          {i < active && (
            <span className="absolute inset-0 bg-accent/40 rounded-full" />
          )}
        </button>
      ))}
    </div>
  );
}

/* ──────────────────────────────────
   HERO CAROUSEL — main export
   ────────────────────────────────── */

const SLIDE_DURATION = 6000; // ms per slide

export default function HeroCarousel() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const progress = useMotionValue(0);
  const springProgress = useSpring(progress, { stiffness: 100, damping: 30 });

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

  const slide = carouselSlides[active];

  /* auto-advance */
  useEffect(() => {
    if (paused) return;

    let start = Date.now();
    let raf;

    const tick = () => {
      const elapsed = Date.now() - start;
      progress.set(Math.min(elapsed / SLIDE_DURATION, 1));

      if (elapsed >= SLIDE_DURATION) {
        setActive((p) => (p + 1) % carouselSlides.length);
        start = Date.now();
        progress.set(0);
      }

      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [active, paused, progress]);

  const goTo = useCallback(
    (i) => {
      setActive(i);
      progress.set(0);
    },
    [progress],
  );

  const next = useCallback(() => {
    goTo((active + 1) % carouselSlides.length);
  }, [active, goTo]);

  const prev = useCallback(() => {
    goTo((active - 1 + carouselSlides.length) % carouselSlides.length);
  }, [active, goTo]);

  /* keyboard */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
      if (e.key === " ") {
        e.preventDefault();
        setPaused((p) => !p);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [next, prev]);

  const onMove = useCallback(
    (e) => {
      const r = e.currentTarget.getBoundingClientRect();
      mx.set((e.clientX - r.left) / r.width);
      my.set((e.clientY - r.top) / r.height);
    },
    [mx, my],
  );

  /* badge color map */
  const badgeColors = {
    emerald: {
      border: "border-emerald/20",
      bg: "bg-emerald/5",
      dot: "bg-emerald",
      text: "text-emerald/80",
    },
    cyan: {
      border: "border-cyan/20",
      bg: "bg-cyan/5",
      dot: "bg-cyan",
      text: "text-cyan/80",
    },
    violet: {
      border: "border-violet-400/20",
      bg: "bg-violet-400/5",
      dot: "bg-violet-400",
      text: "text-violet-400/80",
    },
    amber: {
      border: "border-amber-400/20",
      bg: "bg-amber-400/5",
      dot: "bg-amber-400",
      text: "text-amber-400/80",
    },
  };

  const bc = badgeColors[slide.badge.color] || badgeColors.emerald;

  return (
    <section
      ref={ref}
      onMouseMove={onMove}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      className="relative min-h-screen overflow-hidden bg-bg flex items-center"
    >
      {/* ── BG ── */}
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

      {/* ── CONTENT ── */}
      <motion.div
        style={{ y, opacity, scale }}
        className="relative z-10 container-custom w-full pt-32 sm:pt-36 lg:pt-40 pb-20"
      >
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 xl:gap-20 items-center">
          {/* ═══════ LEFT ═══════ */}
          <div className="lg:pl-16">
            {/* Badge */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id + "-badge"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35 }}
                className="flex items-center gap-3 mb-8"
              >
                <span
                  className={`inline-flex items-center gap-2 rounded-full border ${bc.border} ${bc.bg} px-3 py-1.5`}
                >
                  <span className="relative flex h-1.5 w-1.5">
                    {slide.badge.pulse && (
                      <span
                        className={`absolute inset-0 rounded-full ${bc.dot}/50 animate-ping`}
                      />
                    )}
                    <span
                      className={`relative rounded-full h-1.5 w-1.5 ${bc.dot}`}
                    />
                  </span>
                  <span
                    className={`font-mono text-[10px] uppercase tracking-[0.13em] ${bc.text} font-medium`}
                  >
                    {slide.badge.text}
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
            </AnimatePresence>

            {/* Headline */}
            <AnimatePresence mode="wait">
              <motion.h1
                key={slide.id + "-h1"}
                className="font-display font-bold tracking-[-0.02em] leading-[1.05] text-[clamp(2.5rem,4vw,4rem)] text-text-primary mb-6"
              >
                {slide.headline.lines.map((line, li) =>
                  line.plain ? (
                    <RevealLine key={li} delay={0.05 + li * 0.1}>
                      {line.text}
                    </RevealLine>
                  ) : (
                    <RevealLine key={li} delay={0.05 + li * 0.1}>
                      <span className="relative inline-block">
                        <span
                          className={`text-transparent bg-clip-text bg-linear-to-r ${line.from} ${line.via} ${line.to}`}
                        >
                          {line.text}
                        </span>
                        <motion.span
                          className={`absolute -bottom-1.5 left-0 w-full h-[3px] rounded-full bg-linear-to-r ${line.from} ${line.to}`}
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.5, duration: 0.7, ease }}
                          style={{ originX: 0 }}
                        />
                      </span>
                    </RevealLine>
                  ),
                )}
              </motion.h1>
            </AnimatePresence>

            {/* Subtitle */}
            <AnimatePresence mode="wait">
              <motion.p
                key={slide.id + "-sub"}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -12 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                className="text-[15px] sm:text-base text-text-secondary leading-relaxed mb-8 max-w-md"
              >
                {slide.subtitle}
              </motion.p>
            </AnimatePresence>

            {/* CTAs */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id + "-cta"}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.28, duration: 0.4 }}
                className="flex flex-wrap items-center gap-3 mb-10"
              >
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.98 }}
                  className="group relative inline-flex items-center gap-2.5 rounded-full bg-accent px-7 py-3.5 font-grotesk text-[13px] font-bold uppercase tracking-[0.12em] text-dark overflow-hidden shadow-lg shadow-accent/20 hover:shadow-accent/30 transition-shadow duration-500"
                >
                  <span className="relative z-10 flex items-center gap-2">
                    {slide.cta.primary}
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
                  {slide.cta.secondary}
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
            </AnimatePresence>

            {/* Stats */}
            <AnimatePresence mode="wait">
              <motion.div
                key={slide.id + "-stats"}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: 0.36, duration: 0.4 }}
                className="flex items-center gap-6 mb-8"
              >
                {slide.stats.map((s, i) => (
                  <div key={s.label} className="flex items-baseline gap-2">
                    <span className="font-display text-lg sm:text-xl font-bold text-text-primary">
                      {s.value}
                    </span>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-text-muted">
                      {s.label}
                    </span>
                    {i < slide.stats.length - 1 && (
                      <span className="ml-4 w-px h-4 bg-border" />
                    )}
                  </div>
                ))}
              </motion.div>
            </AnimatePresence>

            {/* Progress + nav */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="flex items-center gap-4 mb-8"
            >
              <SlideProgress
                total={carouselSlides.length}
                active={active}
                onSelect={goTo}
                progress={springProgress}
              />

              <div className="flex items-center gap-1.5">
                <button
                  onClick={prev}
                  className="w-7 h-7 rounded-full border border-white/8 bg-white/3 flex items-center justify-center hover:bg-white/6 hover:border-white/12 transition-all duration-200"
                  aria-label="Previous slide"
                >
                  <svg
                    className="w-3 h-3 text-white/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={next}
                  className="w-7 h-7 rounded-full border border-white/8 bg-white/3 flex items-center justify-center hover:bg-white/6 hover:border-white/12 transition-all duration-200"
                  aria-label="Next slide"
                >
                  <svg
                    className="w-3 h-3 text-white/40"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>

              <span className="font-mono text-[9px] text-white/15 uppercase tracking-widest">
                {String(active + 1).padStart(2, "0")} /{" "}
                {String(carouselSlides.length).padStart(2, "0")}
              </span>
            </motion.div>

            {/* Client logos */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center gap-4"
            >
              <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-text-dim shrink-0">
                Trusted by
              </span>
              <div className="flex items-center gap-5">
                {clientLogos.map((c) => (
                  <span
                    key={c.name}
                    className="font-grotesk text-[11px] sm:text-xs font-semibold uppercase tracking-[0.15em] text-text-dim hover:text-text-muted transition-colors duration-300 cursor-default"
                  >
                    {c.letters}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>

          {/* ═══════ RIGHT — Dashboard ═══════ */}
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.9, ease }}
            style={{ x: cardX, y: cardY }}
            className="relative hidden lg:block"
          >
            <div className="relative max-w-[500px] mx-auto">
              <DashboardShell slide={slide} />

              {/* Floating pills */}
              <AnimatePresence mode="wait">
                {slide.floats.map((f, i) => (
                  <motion.div
                    key={slide.id + "-float-" + i}
                    initial={{
                      opacity: 0,
                      x: f.direction === "left" ? -16 : 16,
                    }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{
                      opacity: 0,
                      x: f.direction === "left" ? -16 : 16,
                    }}
                    transition={{ delay: 0.9 + i * 0.15, duration: 0.5 }}
                    className={`absolute ${f.position}`}
                  >
                    <motion.div
                      animate={{
                        y: [0, i % 2 === 0 ? -4 : 4, 0],
                      }}
                      transition={{
                        duration: 4.5 + i,
                        repeat: Infinity,
                        ease: "easeInOut",
                      }}
                      className="rounded-xl border border-white/8 bg-[#0d0f14]/95 backdrop-blur-xl px-3.5 py-2.5 shadow-2xl shadow-black/40"
                    >
                      {f.content}
                    </motion.div>
                  </motion.div>
                ))}
              </AnimatePresence>
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
