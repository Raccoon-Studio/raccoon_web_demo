import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useCallback } from "react";
import {
  Code2,
  Layers,
  Cloud,
  Palette,
  ArrowRight,
  Check,
  Shield,
  Zap,
  Clock,
  RefreshCw,
  Lock,
  HeartHandshake,
  ChevronRight,
  Sparkles,
  GitBranch,
  MonitorSmartphone,
  Database,
  Globe,
  Cpu,
  Figma,
} from "lucide-react";

import {
  serviceStats as localStats,
  serviceProficiencies as localProficiencies,
  serviceDeliverables as localDeliverables,
} from "../../data/services";
import { useFirestoreData } from "../../lib/useFirestoreData";

/* ── Helpers ── */
const ease = [0.22, 1, 0.36, 1];

function useInViewRef(margin = "-80px") {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin });
  return [ref, isInView];
}

/* ── Animated Counter ── */
function Counter({ value, suffix = "", delay = 0 }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);
  const num = parseInt(value, 10);

  useState(() => {
    if (!isInView) return;
    const dur = 2000;
    const start = Date.now() + delay;
    const id = setInterval(() => {
      const elapsed = Date.now() - start;
      if (elapsed < 0) return;
      const p = Math.min(elapsed / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setCount(Math.floor(eased * num));
      if (p >= 1) clearInterval(id);
    }, 30);
    return () => clearInterval(id);
  });

  return (
    <span ref={ref} className="tabular-nums">
      {isInView ? count : 0}
      {suffix}
    </span>
  );
}

/* ── Service card data ── */
const services = [
  {
    icon: Code2,
    title: "Full-Stack Development",
    sub: "Modern Web Applications",
    description:
      "Production-grade applications built with React, Next.js, Node.js and modern tooling. Architected for scale from day one.",
    features: [
      "React / Next.js",
      "Node / Express",
      "TypeScript",
      "REST & GraphQL",
    ],
    accent: "from-accent to-emerald-400",
    metric: "3x",
    metricLabel: "Faster delivery",
  },
  {
    icon: Layers,
    title: "Product Prototyping",
    sub: "From Idea to Working Product",
    description:
      "Rapid prototyping that validates ideas fast. We go from concept to clickable prototype in days, not months.",
    features: [
      "Rapid MVP",
      "User Testing",
      "Iterative Design",
      "Market Validation",
    ],
    accent: "from-cyan to-blue-400",
    metric: "72h",
    metricLabel: "To first prototype",
  },
  {
    icon: Cloud,
    title: "Cloud & DevOps",
    sub: "Reliable Infrastructure",
    description:
      "Battle-tested infrastructure on AWS, GCP and Vercel. CI/CD pipelines, monitoring, and 99.9% uptime guaranteed.",
    features: ["AWS / GCP", "Docker / K8s", "CI/CD Pipelines", "99.9% Uptime"],
    accent: "from-violet-400 to-purple-500",
    metric: "99.9%",
    metricLabel: "Uptime SLA",
  },
  {
    icon: Palette,
    title: "UI / UX Design",
    sub: "User-Focused Interfaces",
    description:
      "Research-driven design that converts. Every pixel serves a purpose, every interaction tells a story.",
    features: [
      "Design Systems",
      "User Research",
      "Prototyping",
      "Accessibility",
    ],
    accent: "from-amber-400 to-orange-500",
    metric: "40%",
    metricLabel: "Avg. conversion lift",
  },
];

/* ── Process steps ── */
const processSteps = [
  {
    num: "01",
    title: "Discovery",
    desc: "Deep dive into your business, users, and goals",
    icon: Sparkles,
    duration: "Week 1",
  },
  {
    num: "02",
    title: "Strategy",
    desc: "Architecture planning and technical roadmap",
    icon: GitBranch,
    duration: "Week 1-2",
  },
  {
    num: "03",
    title: "Design & Build",
    desc: "Iterative development with weekly demos",
    icon: MonitorSmartphone,
    duration: "Week 2-8",
  },
  {
    num: "04",
    title: "Launch & Scale",
    desc: "Deployment, monitoring, and growth support",
    icon: Zap,
    duration: "Week 8+",
  },
];

/* ── Trust guarantees ── */
const guarantees = [
  { icon: Shield, label: "100% NDA Protected", desc: "Your IP stays yours" },
  { icon: Lock, label: "Secure by Default", desc: "SOC 2 compliant practices" },
  {
    icon: RefreshCw,
    label: "Iterative Delivery",
    desc: "Weekly updates & demos",
  },
  {
    icon: HeartHandshake,
    label: "Satisfaction Guarantee",
    desc: "We don't stop until you're thrilled",
  },
  { icon: Clock, label: "On-Time Delivery", desc: "97% on-time ship rate" },
  { icon: Zap, label: "Post-Launch Support", desc: "60 days of free support" },
];

/* ── Tech stack icons ── */
const techStack = [
  "React",
  "Next.js",
  "TypeScript",
  "Node.js",
  "PostgreSQL",
  "AWS",
  "Figma",
  "Tailwind",
];

/* ──────────────────────────────────────
   Service Card Component
   ────────────────────────────────────── */
function ServiceCard({ service, index }) {
  const [ref, isInView] = useInViewRef();
  const [hovered, setHovered] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 50, y: 50 });
  const cardRef = useRef(null);

  const Icon = service.icon;

  const handleMouse = useCallback((e) => {
    const r = cardRef.current?.getBoundingClientRect();
    if (!r) return;
    setMousePos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }, []);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease }}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouse}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="group relative h-full rounded-2xl border border-dark-border/20 bg-dark-card/40 overflow-hidden transition-all duration-700 hover:border-accent/25"
        style={{
          background: hovered
            ? `radial-gradient(600px circle at ${mousePos.x}% ${mousePos.y}%, rgba(16,185,129,0.04), transparent 50%)`
            : undefined,
        }}
      >
        {/* Top accent line */}
        <div
          className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${service.accent} opacity-0 group-hover:opacity-40 transition-opacity duration-700`}
        />

        <div className="relative p-7 lg:p-8">
          {/* Header row */}
          <div className="flex items-start justify-between mb-6">
            <motion.div
              className="w-12 h-12 rounded-xl border border-dark-border/20 bg-dark-surface/50 flex items-center justify-center group-hover:border-accent/30 group-hover:bg-accent/5 transition-all duration-500"
              animate={
                hovered ? { scale: 1.05, rotate: -5 } : { scale: 1, rotate: 0 }
              }
              transition={{ duration: 0.4, ease }}
            >
              <Icon
                size={22}
                className="text-text-dim group-hover:text-accent transition-colors duration-500"
                strokeWidth={1.5}
              />
            </motion.div>

            {/* Metric badge */}
            <div className="text-right">
              <span className="block font-display text-2xl font-black text-text-primary/80 group-hover:text-accent transition-colors duration-500">
                {service.metric}
              </span>
              <span className="block font-mono text-[8px] tracking-[0.2em] uppercase text-text-dim/50">
                {service.metricLabel}
              </span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-display text-lg font-bold text-text-primary mb-1 tracking-tight">
            {service.title}
          </h3>
          <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-accent/60 mb-4">
            {service.sub}
          </p>

          {/* Description */}
          <p className="text-sm text-text-muted leading-[1.7] mb-6">
            {service.description}
          </p>

          {/* Feature tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {service.features.map((f) => (
              <span
                key={f}
                className="px-2.5 py-1 rounded-md border border-dark-border/15 bg-dark-surface/20 font-mono text-[9px] tracking-[0.1em] text-text-dim group-hover:border-accent/15 group-hover:text-text-muted transition-all duration-500"
              >
                {f}
              </span>
            ))}
          </div>

          {/* CTA */}
          <a
            href="#contact"
            className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.15em] uppercase text-text-dim group-hover:text-accent transition-colors duration-500"
          >
            Learn more
            <ChevronRight
              size={12}
              className="group-hover:translate-x-1 transition-transform duration-300"
              strokeWidth={2}
            />
          </a>
        </div>

        {/* Bottom gradient */}
        <div className="absolute bottom-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-accent/15 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
      </div>
    </motion.div>
  );
}

/* ──────────────────────────────────────
   Process Step Component
   ────────────────────────────────────── */
function ProcessStep({ step, index, isInView }) {
  const Icon = step.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: 0.3 + index * 0.12, ease }}
      className="group relative"
    >
      {/* Connector line */}
      {index < 3 && (
        <motion.div
          className="hidden lg:block absolute top-8 left-[calc(100%+0.5rem)] w-[calc(100%-1rem)] h-px"
          initial={{ scaleX: 0 }}
          animate={isInView ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.6 + index * 0.15, ease }}
          style={{
            transformOrigin: "left",
            background:
              "linear-gradient(90deg, rgba(16,185,129,0.25), rgba(16,185,129,0.05))",
          }}
        />
      )}

      <div className="relative p-6 rounded-xl border border-dark-border/15 bg-dark-card/20 hover:border-accent/20 hover:bg-dark-card/40 transition-all duration-500">
        {/* Step number */}
        <div className="flex items-center justify-between mb-5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg border border-accent/20 bg-accent/5 flex items-center justify-center group-hover:bg-accent/10 group-hover:border-accent/30 transition-all duration-500">
              <Icon
                size={18}
                className="text-accent/70 group-hover:text-accent transition-colors duration-500"
                strokeWidth={1.5}
              />
            </div>
            <span className="font-display text-3xl font-black text-text-primary/8 group-hover:text-accent/15 transition-colors duration-500">
              {step.num}
            </span>
          </div>
          <span className="font-mono text-[9px] tracking-[0.2em] uppercase text-text-dim/40 px-2 py-1 rounded-full border border-dark-border/10">
            {step.duration}
          </span>
        </div>

        <h4 className="font-display text-base font-bold text-text-primary mb-1.5 tracking-tight">
          {step.title}
        </h4>
        <p className="text-[13px] text-text-muted leading-relaxed">
          {step.desc}
        </p>
      </div>
    </motion.div>
  );
}

/* ══════════════════════════════════════
   SERVICES SECTION
   ══════════════════════════════════════ */
export default function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-80px" });

  const [processRef, processInView] = useInViewRef();
  const [profRef, profInView] = useInViewRef();
  const [trustRef, trustInView] = useInViewRef();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  // CMS bridge: fetch from Firestore, fall back to local data
  const { data: stats } = useFirestoreData("services", localStats);
  const { data: proficiencies } = useFirestoreData("tech_stack", localProficiencies);
  const { data: deliverables } = useFirestoreData("settings", localDeliverables);

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 md:py-40 bg-dark-surface overflow-hidden"
    >
      {/* ── Background ── */}
      <motion.div
        className="absolute top-1/4 right-0 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(16,185,129,0.025) 0%, transparent 70%)",
          y: bgY,
        }}
      />
      <motion.div
        className="absolute bottom-1/4 left-0 w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(6,182,212,0.02) 0%, transparent 70%)",
          y: bgY,
        }}
      />

      {/* Side accent line */}
      <motion.div
        className="absolute top-0 left-10 w-px h-full"
        initial={{ scaleY: 0 }}
        animate={isInView ? { scaleY: 1 } : {}}
        transition={{ duration: 2, ease }}
        style={{
          transformOrigin: "top",
          background:
            "linear-gradient(to bottom, transparent, rgba(16,185,129,0.1) 30%, rgba(16,185,129,0.1) 70%, transparent)",
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
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-dark-border/20 bg-dark-card/20">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-accent" />
              </span>
              <span className="font-mono text-[10px] tracking-[0.25em] uppercase text-text-dim">
                Our Services
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

          {/* Title + description */}
          <motion.h2
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.8, ease }}
            className="font-display text-5xl md:text-6xl lg:text-7xl font-extrabold text-text-primary tracking-tight leading-[1.05]"
          >
            Solutions built{" "}
            <span className="relative inline-block">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan to-accent">
                for trust
              </span>
              <motion.span
                className="absolute -bottom-1 left-0 h-[2px] bg-gradient-to-r from-accent to-cyan rounded-full"
                initial={{ width: "0%" }}
                animate={isInView ? { width: "100%" } : {}}
                transition={{ delay: 0.8, duration: 0.8, ease: "easeOut" }}
              />
            </span>
            <br />
            and performance.
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="mt-6 text-text-muted text-base md:text-lg max-w-2xl leading-relaxed"
          >
            We design, build and deliver{" "}
            <span className="text-accent font-medium">
              reliable, production-ready software
            </span>{" "}
            — turning ideas into scalable digital products that companies depend
            on.
          </motion.p>
        </div>

        {/* ═══ Stats Row ═══ */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.4, duration: 0.7, ease }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-20"
        >
          {stats.map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5 + i * 0.08, duration: 0.5, ease }}
              className="group relative p-5 rounded-xl border border-dark-border/15 bg-dark-card/20 hover:border-accent/20 hover:bg-dark-card/40 text-center transition-all duration-500"
            >
              <span className="block font-display text-3xl md:text-4xl font-black text-text-primary tracking-tight mb-1">
                <Counter
                  value={stat.value}
                  suffix={stat.value.includes("%") ? "" : "+"}
                  delay={600 + i * 100}
                />
              </span>
              <span className="block font-mono text-[9px] tracking-[0.2em] uppercase text-text-dim/60 mb-0.5">
                {stat.label}
              </span>
              {stat.sub && (
                <span className="block text-[10px] text-text-dim/40">
                  {stat.sub}
                </span>
              )}
              <div className="absolute bottom-0 left-[20%] right-[20%] h-px bg-accent/0 group-hover:bg-accent/15 transition-colors duration-500" />
            </motion.div>
          ))}
        </motion.div>

        {/* ═══ Service Cards ═══ */}
        <div className="grid md:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-5 mb-28">
          {services.map((service, i) => (
            <ServiceCard key={service.title} service={service} index={i} />
          ))}
        </div>

        {/* ═══ Our Process ═══ */}
        <div ref={processRef} className="mb-28">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="flex items-center gap-4 mb-4"
          >
            <div className="flex items-center gap-2">
              <span className="w-6 h-px bg-accent/30" />
              <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-accent/60">
                How we work
              </span>
            </div>
          </motion.div>

          <motion.h3
            initial={{ opacity: 0, y: 30 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1, duration: 0.7, ease }}
            className="font-display text-3xl md:text-4xl font-bold text-text-primary tracking-tight mb-12"
          >
            A proven process,{" "}
            <span className="text-text-muted font-normal">
              tailored to you.
            </span>
          </motion.h3>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {processSteps.map((step, i) => (
              <ProcessStep
                key={step.num}
                step={step}
                index={i}
                isInView={processInView}
              />
            ))}
          </div>
        </div>

        {/* ═══ Proficiency + Deliverables Grid ═══ */}
        <div ref={profRef} className="grid lg:grid-cols-2 gap-5 mb-28">
          {/* Proficiency */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={profInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, ease }}
            className="relative rounded-2xl border border-dark-border/20 bg-dark-card/30 p-8 lg:p-10 overflow-hidden"
          >
            {/* Corner accent */}
            <div className="absolute top-0 left-0 w-16 h-16 border-l border-t border-accent/10 rounded-tl-2xl" />

            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-accent/50 uppercase">
                    Expertise
                  </span>
                  <h3 className="font-display text-2xl font-bold text-text-primary mt-1 tracking-tight">
                    What We Build
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-lg border border-dark-border/20 bg-dark-surface/30 flex items-center justify-center">
                  <Database
                    size={18}
                    className="text-accent/50"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              <div className="space-y-6">
                {proficiencies.map((item, i) => (
                  <motion.div
                    key={item.name}
                    initial={{ opacity: 0, x: -20 }}
                    animate={profInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + i * 0.1, duration: 0.6, ease }}
                  >
                    <div className="flex items-baseline justify-between mb-2.5">
                      <div className="flex items-baseline gap-3">
                        <span className="font-display text-sm font-semibold text-text-primary">
                          {item.name}
                        </span>
                        <span className="font-mono text-[9px] text-text-dim/40 tracking-wider">
                          {item.techs}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-accent/70 tabular-nums">
                        {item.value}%
                      </span>
                    </div>

                    {/* Progress bar */}
                    <div className="relative h-1 bg-dark-border/20 rounded-full overflow-hidden">
                      <motion.div
                        className="absolute inset-y-0 left-0 bg-gradient-to-r from-accent to-cyan rounded-full"
                        initial={{ width: 0 }}
                        animate={
                          profInView
                            ? { width: `${item.value}%` }
                            : { width: 0 }
                        }
                        transition={{
                          duration: 1.4,
                          delay: 0.5 + i * 0.12,
                          ease,
                        }}
                      />
                      {/* Glow tip */}
                      <motion.div
                        className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-accent shadow-[0_0_8px_rgba(16,185,129,0.5)]"
                        initial={{ left: "0%" }}
                        animate={
                          profInView
                            ? { left: `${item.value}%` }
                            : { left: "0%" }
                        }
                        transition={{
                          duration: 1.4,
                          delay: 0.5 + i * 0.12,
                          ease,
                        }}
                        style={{ transform: "translate(-50%, -50%)" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Tech stack row */}
              <div className="mt-10 pt-6 border-t border-dark-border/15">
                <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-text-dim/40 block mb-4">
                  Primary Tech Stack
                </span>
                <div className="flex flex-wrap gap-2">
                  {techStack.map((tech, i) => (
                    <motion.span
                      key={tech}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={profInView ? { opacity: 1, scale: 1 } : {}}
                      transition={{ delay: 1 + i * 0.05, duration: 0.4 }}
                      className="px-2.5 py-1 rounded-md border border-dark-border/15 bg-dark-surface/20 font-mono text-[9px] tracking-wider text-text-dim/50 hover:border-accent/20 hover:text-text-dim transition-all duration-300"
                    >
                      {tech}
                    </motion.span>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>

          {/* Deliverables */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={profInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.15, ease }}
            className="relative rounded-2xl border border-dark-border/20 bg-dark-card/30 p-8 lg:p-10 overflow-hidden"
          >
            {/* Corner accent */}
            <div className="absolute top-0 right-0 w-16 h-16 border-r border-t border-accent/10 rounded-tr-2xl" />

            <div className="relative">
              <div className="flex items-center justify-between mb-8">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.25em] text-accent/50 uppercase">
                    Every Engagement
                  </span>
                  <h3 className="font-display text-2xl font-bold text-text-primary mt-1 tracking-tight">
                    What You Get
                  </h3>
                </div>
                <div className="w-10 h-10 rounded-lg border border-dark-border/20 bg-dark-surface/30 flex items-center justify-center">
                  <Check
                    size={18}
                    className="text-accent/50"
                    strokeWidth={1.5}
                  />
                </div>
              </div>

              <div className="space-y-4">
                {deliverables.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={profInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.4 + i * 0.08, duration: 0.5, ease }}
                    className="group/item flex items-start gap-3.5 p-3 -mx-3 rounded-lg hover:bg-accent/[0.02] transition-colors duration-300"
                  >
                    <div className="mt-0.5 w-5 h-5 rounded-md bg-accent/10 border border-accent/25 flex items-center justify-center shrink-0 group-hover/item:bg-accent/15 group-hover/item:border-accent/40 transition-all duration-300">
                      <Check
                        size={11}
                        className="text-accent"
                        strokeWidth={2.5}
                      />
                    </div>
                    <span className="text-sm text-text-muted group-hover/item:text-text-secondary transition-colors duration-300 leading-relaxed">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>

              {/* Available CTA */}
              <div className="mt-8 pt-6 border-t border-dark-border/15">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2.5">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
                    </span>
                    <span className="font-mono text-[11px] tracking-wider text-emerald">
                      Available for new projects
                    </span>
                  </div>
                  <a
                    href="#contact"
                    className="group/cta inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.15em] uppercase text-text-dim hover:text-accent transition-colors duration-300"
                  >
                    Let's talk
                    <ArrowRight
                      size={11}
                      className="group-hover/cta:translate-x-1 transition-transform duration-300"
                      strokeWidth={2}
                    />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ═══ Trust Guarantees ═══ */}
        <div ref={trustRef} className="mb-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={trustInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease }}
            className="text-center mb-12"
          >
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-dark-border/15 bg-dark-card/20 mb-5">
              <Shield size={12} className="text-accent/50" strokeWidth={1.5} />
              <span className="font-mono text-[9px] tracking-[0.25em] uppercase text-text-dim/60">
                Our Commitment
              </span>
            </span>
            <h3 className="font-display text-3xl md:text-4xl font-bold text-text-primary tracking-tight">
              Built on trust,{" "}
              <span className="text-text-muted font-normal">
                delivered with care.
              </span>
            </h3>
          </motion.div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {guarantees.map((g, i) => {
              const Icon = g.icon;
              return (
                <motion.div
                  key={g.label}
                  initial={{ opacity: 0, y: 25 }}
                  animate={trustInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.2 + i * 0.08, duration: 0.6, ease }}
                  className="group flex items-start gap-4 p-5 rounded-xl border border-dark-border/15 bg-dark-card/20 hover:border-accent/15 hover:bg-dark-card/35 transition-all duration-500"
                >
                  <div className="w-9 h-9 rounded-lg border border-dark-border/20 bg-dark-surface/30 flex items-center justify-center shrink-0 group-hover:border-accent/25 group-hover:bg-accent/5 transition-all duration-500">
                    <Icon
                      size={16}
                      className="text-text-dim/50 group-hover:text-accent/70 transition-colors duration-500"
                      strokeWidth={1.5}
                    />
                  </div>
                  <div>
                    <h4 className="font-display text-sm font-semibold text-text-primary mb-0.5">
                      {g.label}
                    </h4>
                    <p className="text-[12px] text-text-dim leading-relaxed">
                      {g.desc}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* ═══ Bottom CTA Strip ═══ */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.8 }}
          className="mt-20 pt-10 border-t border-dark-border/10 flex flex-col sm:flex-row items-center justify-between gap-6"
        >
          <div>
            <p className="font-display text-xl md:text-2xl font-bold text-text-primary tracking-tight">
              Ready to build something great?
            </p>
            <p className="text-sm text-text-muted mt-1">
              Let's discuss your project — no commitment required.
            </p>
          </div>
          <a
            href="#contact"
            className="group shrink-0 inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-accent/10 border border-accent/20 hover:bg-accent/20 hover:border-accent/40 transition-all duration-500"
          >
            <span className="font-mono text-[11px] tracking-[0.2em] uppercase text-accent">
              Start a conversation
            </span>
            <ArrowRight
              size={15}
              className="text-accent group-hover:translate-x-1 transition-transform duration-300"
              strokeWidth={2}
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
