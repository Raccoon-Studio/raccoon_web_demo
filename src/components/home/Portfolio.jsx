import { useRef, useState, useCallback } from "react";
import {
  motion,
  useInView,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowUpRight,
  ArrowRight,
  ExternalLink,
  Eye,
  Award,
  TrendingUp,
  Star,
} from "lucide-react";

import { projects as localProjects } from "../../data/portfolio";
import { useFirestoreData } from "../../lib/useFirestoreData";

/* ── Magnetic Wrapper ── */
function Magnetic({ children, strength = 30 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) / (r.width / strength));
        y.set((e.clientY - r.top - r.height / 2) / (r.height / strength));
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ── Animated Counter ── */
function AnimatedNumber({ value, suffix = "", prefix = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const [display, setDisplay] = useState(0);

  const numericValue = parseInt(value, 10);

  useState(() => {
    if (!isInView) return;
    let start = 0;
    const end = numericValue;
    const duration = 2000;
    const startTime = Date.now() + delay;

    const timer = setInterval(() => {
      const now = Date.now();
      if (now < startTime) return;
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      start = Math.floor(eased * end);
      setDisplay(start);
      if (progress >= 1) clearInterval(timer);
    }, 30);

    return () => clearInterval(timer);
  });

  return (
    <span ref={ref}>
      {prefix}
      {isInView ? display : 0}
      {suffix}
    </span>
  );
}

/* ── Trust Metrics Bar ── */
function TrustMetrics({ isInView }) {
  const metrics = [
    { value: "75", suffix: "+", label: "Projects Delivered", icon: Award },
    { value: "98", suffix: "%", label: "Client Satisfaction", icon: Star },
    { value: "40", suffix: "+", label: "Global Clients", icon: TrendingUp },
    { value: "12", suffix: "+", label: "Industry Awards", icon: Award },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.6, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 mb-24"
    >
      {metrics.map((metric, i) => {
        const Icon = metric.icon;
        return (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{
              delay: 0.7 + i * 0.1,
              duration: 0.6,
              ease: [0.22, 1, 0.36, 1],
            }}
            className="group relative p-6 rounded-xl border border-dark-border/20 bg-dark-card/30 hover:border-accent/20 hover:bg-dark-card/50 transition-all duration-500"
          >
            {/* Subtle corner accent */}
            <div className="absolute top-0 left-0 w-8 h-8 border-l border-t border-accent/0 group-hover:border-accent/20 rounded-tl-xl transition-colors duration-500" />

            <div className="flex items-start justify-between mb-3">
              <span className="font-display text-3xl md:text-4xl font-black text-text-primary tracking-tight">
                <AnimatedNumber
                  value={metric.value}
                  suffix={metric.suffix}
                  delay={800 + i * 150}
                />
              </span>
              <Icon
                size={16}
                className="text-accent/40 group-hover:text-accent/70 transition-colors duration-500 mt-1"
                strokeWidth={1.5}
              />
            </div>

            <p className="font-body text-[11px] uppercase tracking-[0.2em] text-text-dim group-hover:text-text-muted transition-colors duration-500">
              {metric.label}
            </p>

            {/* Bottom accent line */}
            <motion.div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          </motion.div>
        );
      })}
    </motion.div>
  );
}

/* ── Premium Project Card ── */
function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const isEven = index % 2 === 0;
  const [isHovered, setIsHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });

  const handleMouse = useCallback((e) => {
    const r = ref.current?.getBoundingClientRect();
    if (!r) return;
    setMousePos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 80 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{
        duration: 1,
        ease: [0.22, 1, 0.36, 1],
        delay: index * 0.1,
      }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="relative group"
    >
      {/* Project number — positioned outside on desktop */}
      <motion.div
        initial={{ opacity: 0, x: isEven ? -20 : 20 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: 0.3 + index * 0.1, duration: 0.6 }}
        className={`hidden lg:flex absolute top-8 ${isEven ? "-left-16" : "-right-16"} flex-col items-center gap-2`}
      >
        <span className="font-mono text-[10px] tracking-[0.3em] text-text-dim/40 uppercase">
          No.
        </span>
        <span className="font-display text-2xl font-black text-accent/30">
          {project.num}
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-accent/20 to-transparent" />
      </motion.div>

      {/* Main card */}
      <div
        className="relative rounded-2xl border border-dark-border/20 overflow-hidden transition-all duration-700 hover:border-accent/20"
        style={{
          background: isHovered
            ? `radial-gradient(800px circle at ${mousePos.x}% ${mousePos.y}%, rgba(16,185,129,0.03), transparent 50%)`
            : undefined,
        }}
      >
        <div className="grid lg:grid-cols-[1.1fr_1fr] gap-0">
          {/* ── Image / Visual Side ── */}
          <div
            className={`relative h-72 sm:h-80 lg:h-[420px] overflow-hidden ${!isEven ? "lg:order-2" : ""}`}
          >
            {/* Gradient background */}
            <div
              className={`absolute inset-0 bg-gradient-to-br ${project.gradient}`}
            />

            {/* Grid pattern overlay */}
            <div
              className="absolute inset-0 opacity-[0.04]"
              style={{
                backgroundImage:
                  "linear-gradient(rgba(255,255,255,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.5) 1px, transparent 1px)",
                backgroundSize: "40px 40px",
              }}
            />

            {/* Placeholder mockup blocks */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                animate={
                  isHovered ? { scale: 1.03, y: -8 } : { scale: 1, y: 0 }
                }
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                className="relative"
              >
                {/* Browser mockup */}
                <div className="w-[280px] sm:w-[320px] bg-dark/80 backdrop-blur-md rounded-lg border border-white/10 shadow-2xl overflow-hidden">
                  {/* Browser bar */}
                  <div className="flex items-center gap-1.5 px-3 py-2 border-b border-white/5">
                    <div className="w-2 h-2 rounded-full bg-red-400/60" />
                    <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                    <div className="w-2 h-2 rounded-full bg-green-400/60" />
                    <div className="flex-1 mx-3 h-4 rounded bg-white/5" />
                  </div>
                  {/* Content area */}
                  <div className="p-4 space-y-3">
                    <div className="h-3 bg-white/10 rounded w-3/4" />
                    <div className="h-3 bg-white/7 rounded w-1/2" />
                    <div className="h-20 bg-white/5 rounded-md mt-3" />
                    <div className="flex gap-2 mt-2">
                      <div className="h-6 bg-accent/15 rounded flex-1" />
                      <div className="h-6 bg-white/5 rounded flex-1" />
                    </div>
                  </div>
                </div>

                {/* Floating accent card */}
                <motion.div
                  animate={
                    isHovered
                      ? { x: 20, y: -15, rotate: 2 }
                      : { x: 0, y: 0, rotate: 0 }
                  }
                  transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-6 -right-8 w-36 bg-dark/90 backdrop-blur-md rounded-lg border border-accent/20 p-3 shadow-xl"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <div className="w-5 h-5 rounded-full bg-accent/20 flex items-center justify-center">
                      <TrendingUp size={10} className="text-accent" />
                    </div>
                    <span className="text-[9px] font-mono text-accent/80 tracking-wider">
                      METRICS
                    </span>
                  </div>
                  <div className="text-lg font-display font-bold text-text-primary">
                    +
                    {project.num === "01"
                      ? "340"
                      : project.num === "02"
                        ? "280"
                        : project.num === "03"
                          ? "195"
                          : "250"}
                    %
                  </div>
                  <div className="text-[8px] text-text-dim tracking-wider uppercase mt-0.5">
                    Growth Achieved
                  </div>
                </motion.div>
              </motion.div>
            </div>

            {/* Hover gradient overlay */}
            <motion.div
              className="absolute inset-0 bg-gradient-to-t from-dark/40 via-transparent to-transparent"
              animate={{ opacity: isHovered ? 1 : 0.5 }}
              transition={{ duration: 0.4 }}
            />

            {/* View project overlay */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0 flex items-center justify-center bg-dark/20 backdrop-blur-[2px]"
                >
                  <Magnetic strength={25}>
                    <motion.div
                      initial={{ scale: 0.8, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.8, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                      className="w-20 h-20 rounded-full border border-accent/40 bg-dark/60 backdrop-blur-md flex items-center justify-center cursor-pointer"
                    >
                      <Eye
                        size={20}
                        className="text-accent"
                        strokeWidth={1.5}
                      />
                    </motion.div>
                  </Magnetic>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ── Content Side ── */}
          <div
            className={`relative p-8 lg:p-10 xl:p-12 flex flex-col justify-center bg-dark-card/30 ${!isEven ? "lg:order-1" : ""}`}
          >
            {/* Category + Year */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex items-center gap-3 mb-5"
            >
              <span
                className={`inline-block px-2.5 py-1 rounded-md text-[10px] font-mono uppercase tracking-[0.15em] border ${project.accent} border-current/20 bg-current/5`}
                style={{ color: "inherit" }}
              >
                {project.tags?.[0] || "Web"}
              </span>
              <span className="w-px h-3 bg-dark-border/30" />
              <span className="font-mono text-[10px] tracking-[0.2em] text-text-dim/50">
                2024
              </span>
            </motion.div>

            {/* Title */}
            <motion.h3
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                delay: 0.35 + index * 0.1,
                duration: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="font-display text-3xl md:text-4xl font-extrabold text-text-primary tracking-tight leading-[1.1] mb-2"
            >
              {project.title}
            </motion.h3>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.4 + index * 0.1 }}
              className={`text-sm font-medium mb-4 ${project.accent}`}
            >
              {project.tagline}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.45 + index * 0.1 }}
              className="text-sm text-text-muted leading-[1.8] mb-6 max-w-md"
            >
              {project.description}
            </motion.p>

            {/* Results highlight */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + index * 0.1 }}
              className="flex items-center gap-4 mb-6 py-3 px-4 rounded-lg bg-accent/[0.03] border border-accent/10"
            >
              <TrendingUp
                size={14}
                className="text-accent shrink-0"
                strokeWidth={1.5}
              />
              <span className="text-[11px] text-text-muted font-body">
                <span className="text-accent font-semibold">Result:</span>{" "}
                {project.num === "01"
                  ? "340% increase in user engagement within 3 months"
                  : project.num === "02"
                    ? "2.5x faster load times, 98% uptime achieved"
                    : project.num === "03"
                      ? "195% growth in conversion rate post-launch"
                      : "Significant measurable improvement across all KPIs"}
              </span>
            </motion.div>

            {/* Tags */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.55 + index * 0.1 }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {project.tags.map((tag, i) => (
                <span
                  key={tag}
                  className="px-3 py-1.5 rounded-full border border-dark-border/20 bg-dark-surface/20 font-mono text-[10px] tracking-[0.12em] text-text-dim hover:border-accent/20 hover:text-text-muted transition-all duration-300"
                >
                  {tag}
                </span>
              ))}
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 0.6 + index * 0.1 }}
              className="flex items-center gap-6"
            >
              <a
                href="#"
                className="group/btn inline-flex items-center gap-2.5 px-6 py-3 rounded-full bg-accent/10 border border-accent/20 hover:bg-accent/20 hover:border-accent/40 transition-all duration-400"
              >
                <span className="font-mono text-[11px] tracking-[0.15em] uppercase text-accent">
                  View Project
                </span>
                <ArrowUpRight
                  size={14}
                  className="text-accent group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform duration-300"
                  strokeWidth={2}
                />
              </a>

              <a
                href="#"
                className="group/link inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-text-dim hover:text-text-muted transition-colors duration-300"
              >
                Case Study
                <ExternalLink
                  size={12}
                  className="opacity-50 group-hover/link:opacity-100 transition-opacity duration-300"
                  strokeWidth={1.5}
                />
              </a>
            </motion.div>

            {/* Bottom accent */}
            <div className="absolute bottom-0 left-[5%] right-[5%] h-px bg-gradient-to-r from-transparent via-accent/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          </div>
        </div>
      </div>
    </motion.div>
  );
}

/* ── Client Trust Bar ── */
function ClientTrustBar({ isInView }) {
  const clients = ["Google", "Stripe", "Airbnb", "Vercel", "Linear", "Figma"];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.8, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className="mb-20"
    >
      <div className="flex items-center gap-4 mb-8">
        <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-text-dim/40">
          Trusted by industry leaders
        </span>
        <div className="flex-1 h-px bg-dark-border/10" />
      </div>

      <div className="flex flex-wrap items-center justify-between gap-8 lg:gap-12">
        {clients.map((client, i) => (
          <motion.div
            key={client}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.9 + i * 0.08, duration: 0.5 }}
            className="group cursor-default"
          >
            <span className="font-grotesk text-sm md:text-base font-semibold tracking-[0.1em] uppercase text-text-dim/20 group-hover:text-text-dim/40 transition-colors duration-500">
              {client}
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

/* ── Testimonial Snippet ── */
function TestimonialSnippet({ isInView }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative mt-24 mb-8"
    >
      <div className="relative max-w-3xl mx-auto text-center">
        {/* Quote mark */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
          className="inline-flex items-center justify-center w-10 h-10 rounded-full border border-accent/20 bg-accent/5 mb-6"
        >
          <span className="font-display text-xl text-accent leading-none">
            "
          </span>
        </motion.div>

        <blockquote className="font-display text-xl md:text-2xl lg:text-3xl font-light text-text-primary/80 leading-relaxed tracking-tight mb-8">
          Raccoon Studio didn't just build our product — they{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan font-medium">
            transformed our vision
          </span>{" "}
          into an experience that our users genuinely love.
        </blockquote>

        <div className="flex items-center justify-center gap-4">
          {/* Avatar placeholder */}
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-accent/20 to-cyan/20 border border-dark-border/20 flex items-center justify-center">
            <span className="font-display text-sm font-bold text-accent/60">
              JC
            </span>
          </div>
          <div className="text-left">
            <p className="font-body text-sm text-text-primary font-medium">
              James Chen
            </p>
            <p className="font-mono text-[10px] tracking-[0.15em] text-text-dim uppercase">
              CTO, TechVenture
            </p>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center justify-center gap-1 mt-5">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className="text-accent fill-accent"
              strokeWidth={0}
            />
          ))}
          <span className="ml-2 font-mono text-[10px] text-text-dim/50 tracking-wider">
            5.0
          </span>
        </div>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════════════
   PORTFOLIO SECTION
   ══════════════════════════════════════════════ */
export default function Portfolio() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });
  const bottomInView = useInView(useRef(null), { once: true, margin: "-50px" });

  // CMS bridge: fetch from Firestore, fall back to local data
  const { data: projects } = useFirestoreData("projects", localProjects);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-32 md:py-40 bg-dark overflow-hidden"
    >
      {/* ── Background elements ── */}
      <motion.div
        className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.02) 0%, transparent 70%)",
          y: bgY,
        }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.02) 0%, transparent 70%)",
          y: bgY,
        }}
      />

      {/* Vertical accent line */}
      <motion.div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-32"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          transformOrigin: "top",
          background:
            "linear-gradient(to bottom, transparent, rgba(16,185,129,0.15), transparent)",
        }}
      />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* ═══ Section Header ═══ */}
        <div className="max-w-4xl mb-20">
          {/* Label */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-8"
          >
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-dark-border/20 bg-dark-surface/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-dim">
                Selected Work
              </span>
            </div>
            <motion.div
              className="flex-1 h-px bg-gradient-to-r from-dark-border/20 to-transparent"
              initial={{ scaleX: 0 }}
              animate={isInView ? { scaleX: 1 } : {}}
              transition={{ duration: 1, delay: 0.3 }}
              style={{ transformOrigin: "left" }}
            />
          </motion.div>

          {/* Heading */}
          <div className="grid lg:grid-cols-[1fr_auto] gap-8 items-end">
            <div>
              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.2,
                  duration: 0.8,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-primary tracking-tight leading-[1.05]"
              >
                Work that{" "}
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan to-accent">
                    speaks
                  </span>
                  <motion.span
                    className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-accent to-cyan rounded-full"
                    initial={{ width: "0%" }}
                    animate={isInView ? { width: "100%" } : {}}
                    transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
                  />
                </span>
                <br />
                for itself.
              </motion.h2>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.4, duration: 0.6 }}
                className="mt-6 text-text-muted text-base md:text-lg max-w-xl leading-relaxed"
              >
                Every project is treated as a product — architected for scale,
                designed for users, and shipped with precision that builds
                lasting trust.
              </motion.p>
            </div>

            {/* Floating stat */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="hidden lg:block text-right"
            >
              <div className="inline-flex flex-col items-end p-5 rounded-xl border border-dark-border/10 bg-dark-card/20">
                <span className="font-display text-5xl font-black text-text-primary/10 leading-none">
                  75+
                </span>
                <span className="font-mono text-[9px] tracking-[0.3em] text-text-dim/40 uppercase mt-2">
                  Projects Shipped
                </span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* ═══ Trust Metrics ═══ */}
        <TrustMetrics isInView={isInView} />

        {/* ═══ Client Trust Bar ═══ */}
        <ClientTrustBar isInView={isInView} />

        {/* ═══ Projects ═══ */}
        <div className="space-y-10 lg:space-y-14">
          {projects.map((project, i) => (
            <ProjectCard key={project.num} project={project} index={i} />
          ))}
        </div>

        {/* ═══ Testimonial ═══ */}
        <TestimonialSnippet isInView={isInView} />

        {/* ═══ CTA Button ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-16"
        >
          <Magnetic strength={20}>
            <a
              href="#"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full bg-accent/10 border border-accent/20 hover:bg-accent/20 hover:border-accent/40 transition-all duration-500"
            >
              <span className="font-mono text-[12px] tracking-[0.2em] uppercase text-accent">
                View All Projects
              </span>
              <ArrowRight
                size={16}
                className="text-accent group-hover:translate-x-1 transition-transform duration-300"
                strokeWidth={2}
              />
            </a>
          </Magnetic>

          <Magnetic strength={20}>
            <a
              href="#contact"
              className="group inline-flex items-center gap-3 px-8 py-4 rounded-full border border-dark-border/20 hover:border-accent/20 text-text-muted hover:text-text-primary transition-all duration-500"
            >
              <span className="font-mono text-[12px] tracking-[0.2em] uppercase">
                Start a Project
              </span>
              <ArrowUpRight
                size={16}
                className="opacity-50 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all duration-300"
                strokeWidth={2}
              />
            </a>
          </Magnetic>
        </motion.div>

        {/* ═══ Bottom trust line ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="flex items-center justify-center gap-6 mt-20 pt-16 border-t border-dark-border/10"
        >
          {[
            "100% NDA Protected",
            "Agile Delivery",
            "24/7 Support",
            "Money-back Guarantee",
          ].map((item, i) => (
            <motion.div
              key={item}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + i * 0.1, duration: 0.5 }}
              className="hidden sm:flex items-center gap-2"
            >
              <span className="w-1 h-1 rounded-full bg-accent/30" />
              <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-dim/30">
                {item}
              </span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* ═══ Keyframes ═══ */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </section>
  );
}
