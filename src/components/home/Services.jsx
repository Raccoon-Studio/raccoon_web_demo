import { motion, useInView } from "framer-motion";
import { useRef } from "react";

import {
  serviceStats as stats,
  serviceProficiencies as proficiencies,
  serviceDeliverables as deliverables,
} from "../../data/services";

const serviceCards = [
  {
    title: "{ Full-Stack Development }",
    sub: "Modern Web Applications",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 200 140" fill="none">
        <rect
          x="10"
          y="10"
          width="180"
          height="120"
          rx="8"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.3"
        />
        <rect
          x="10"
          y="10"
          width="180"
          height="25"
          rx="8"
          fill="currentColor"
          opacity="0.1"
        />
        <circle cx="25" cy="22" r="4" fill="#ef4444" opacity="0.6" />
        <circle cx="38" cy="22" r="4" fill="#f59e0b" opacity="0.6" />
        <circle cx="51" cy="22" r="4" fill="#10b981" opacity="0.6" />
        <rect
          x="30"
          y="50"
          width="60"
          height="6"
          rx="3"
          fill="currentColor"
          opacity="0.15"
        />
        <rect
          x="30"
          y="65"
          width="100"
          height="6"
          rx="3"
          fill="currentColor"
          opacity="0.1"
        />
        <rect
          x="30"
          y="80"
          width="80"
          height="6"
          rx="3"
          fill="currentColor"
          opacity="0.08"
        />
        <rect
          x="30"
          y="95"
          width="120"
          height="6"
          rx="3"
          fill="currentColor"
          opacity="0.06"
        />
      </svg>
    ),
  },
  {
    title: "{ Product Prototyping }",
    sub: "From Idea to Working Product",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 200 140" fill="none">
        <path
          d="M100 20L160 70L140 130H60L40 70Z"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.3"
        />
        <path
          d="M100 20L160 70L140 130H60L40 70Z"
          fill="currentColor"
          opacity="0.05"
        />
        <circle
          cx="100"
          cy="70"
          r="20"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.2"
        />
        <circle cx="100" cy="70" r="8" fill="currentColor" opacity="0.15" />
        <line
          x1="100"
          y1="50"
          x2="100"
          y2="20"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.2"
          strokeDasharray="4 4"
        />
        <line
          x1="100"
          y1="90"
          x2="140"
          y2="130"
          stroke="currentColor"
          strokeWidth="1"
          opacity="0.2"
          strokeDasharray="4 4"
        />
      </svg>
    ),
  },
  {
    title: "{ Cloud & Deployment }",
    sub: "Reliable Infrastructure",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 200 140" fill="none">
        <path
          d="M55 80C35 80 25 65 30 50C35 35 50 30 65 35C70 20 90 15 105 25C120 15 145 20 150 40C170 40 180 55 175 70C170 85 155 90 140 85H60"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.3"
        />
        <rect
          x="70"
          y="95"
          width="60"
          height="35"
          rx="4"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.2"
        />
        <circle cx="85" cy="108" r="3" fill="currentColor" opacity="0.2" />
        <circle cx="100" cy="108" r="3" fill="currentColor" opacity="0.2" />
        <circle cx="115" cy="108" r="3" fill="currentColor" opacity="0.2" />
        <line
          x1="100"
          y1="85"
          x2="100"
          y2="95"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.2"
        />
        <rect
          x="85"
          y="55"
          width="30"
          height="20"
          rx="4"
          fill="currentColor"
          opacity="0.08"
        />
        <path
          d="M95 62L100 67L105 62"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.3"
        />
      </svg>
    ),
  },
  {
    title: "{ UI / UX Design }",
    sub: "User-Focused Interfaces",
    icon: (
      <svg className="w-full h-full" viewBox="0 0 200 140" fill="none">
        <rect
          x="40"
          y="15"
          width="120"
          height="80"
          rx="6"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.3"
        />
        <rect
          x="40"
          y="15"
          width="120"
          height="20"
          rx="6"
          fill="currentColor"
          opacity="0.08"
        />
        <circle cx="55" cy="25" r="4" fill="currentColor" opacity="0.15" />
        <rect
          x="65"
          y="22"
          width="40"
          height="5"
          rx="2.5"
          fill="currentColor"
          opacity="0.1"
        />
        <rect
          x="50"
          y="45"
          width="45"
          height="40"
          rx="4"
          fill="currentColor"
          opacity="0.06"
        />
        <rect
          x="105"
          y="45"
          width="45"
          height="18"
          rx="4"
          fill="currentColor"
          opacity="0.06"
        />
        <rect
          x="105"
          y="67"
          width="45"
          height="18"
          rx="4"
          fill="currentColor"
          opacity="0.06"
        />
        <path
          d="M60 110L80 105L70 120Z"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.3"
        />
        <circle
          cx="80"
          cy="120"
          r="6"
          stroke="currentColor"
          strokeWidth="1.5"
          opacity="0.2"
        />
      </svg>
    ),
  },
];

// Proficiencies and deliverables are now imported from data/services.js

function AnimatedCounter({ value, suffix = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const numericValue = parseInt(value);

  return (
    <motion.span
      ref={ref}
      className="font-display text-5xl font-extrabold text-text-primary"
    >
      {isInView ? (
        <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
          {value}
        </motion.span>
      ) : (
        "0"
      )}
    </motion.span>
  );
}

function FadeInWhenVisible({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.7, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function Services() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });

  return (
    <section
      id="services"
      ref={sectionRef}
      className="relative py-32 bg-dark-surface overflow-hidden"
    >
      {/* Section border decoration */}
      <div className="absolute top-0 left-10 w-px h-full bg-linear-to-b from-dark-border via-dark-border/30 to-transparent" />

      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Section Header */}
        <FadeInWhenVisible>
          <div className="flex items-center gap-3 mb-8">
            <div className="flex gap-1.5">
              <span className="w-2 h-2 rounded-full bg-accent" />
              <span className="w-2 h-2 rounded-full bg-accent/50" />
            </div>
            <span className="font-mono text-[12px] tracking-[0.3em] uppercase text-text-muted">
              // Our Services
            </span>
            <div className="flex-1 h-px bg-dark-border" />
          </div>
        </FadeInWhenVisible>

        {/* Description + Stats */}
        <div className="grid lg:grid-cols-2 gap-16 items-start mb-20">
          <FadeInWhenVisible delay={0.1}>
            <p className="font-grotesk text-xl md:text-2xl leading-relaxed text-text-secondary">
              We design, build and deliver{" "}
              <span className="text-accent">
                reliable, production-ready software
              </span>{" "}
              — turning ideas into scalable digital products.
            </p>
          </FadeInWhenVisible>

          <FadeInWhenVisible delay={0.2}>
            <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-8 sm:gap-12">
              {stats.map((stat, i) => (
                <div key={i} className="text-center lg:text-left">
                  <AnimatedCounter value={stat.value} />
                  <p className="mt-2 font-mono text-[10px] tracking-[0.2em] uppercase text-text-muted">
                    {stat.label}
                  </p>
                  <p className="mt-1 text-xs text-text-dim">{stat.sub}</p>
                </div>
              ))}
            </div>
          </FadeInWhenVisible>
        </div>

        {/* Service Cards Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {serviceCards.map((card, i) => (
            <FadeInWhenVisible key={i} delay={i * 0.1}>
              <div className="group relative h-full bg-dark-card border border-dark-border/50 rounded-2xl p-6 overflow-hidden hover:border-accent/30 transition-all duration-500">
                {/* Icon */}
                <div className="h-36 mb-6 text-text-dim group-hover:text-accent/50 transition-colors duration-500">
                  {card.icon}
                </div>

                {/* Content */}
                <div className="flex items-end justify-between">
                  <div>
                    <h3 className="font-grotesk text-sm font-semibold text-text-primary">
                      {card.title}
                    </h3>
                    <p className="mt-1 text-xs text-text-muted">{card.sub}</p>
                  </div>
                  <span className="font-mono text-[10px] tracking-widest text-text-dim group-hover:text-accent transition-colors uppercase">
                    Explore
                  </span>
                </div>

                {/* Hover gradient */}
                <div className="absolute inset-0 bg-linear-to-t from-accent/3 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </FadeInWhenVisible>
          ))}
        </div>

        {/* Bottom Grid: Expertise + What You Get */}
        <div className="grid lg:grid-cols-2 gap-4 mt-4">
          {/* What We Build */}
          <FadeInWhenVisible delay={0.2}>
            <div className="bg-dark-card border border-dark-border/50 rounded-2xl p-8">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <span className="font-mono text-[10px] tracking-[0.2em] text-text-dim uppercase">
                    — Expertise
                  </span>
                  <h3 className="font-grotesk text-xl font-bold text-text-primary mt-1">
                    What We Build
                  </h3>
                </div>
                <div className="text-right">
                  <span className="font-mono text-[10px] tracking-widest text-text-dim uppercase">
                    Proficiency
                  </span>
                  <div className="font-display text-4xl font-extrabold text-accent/30">
                    100
                  </div>
                </div>
              </div>

              <div className="space-y-5 mt-6">
                {proficiencies.map((item, i) => (
                  <div key={i}>
                    <div className="flex items-baseline justify-between mb-2">
                      <div className="flex items-baseline gap-3">
                        <span className="font-grotesk text-sm font-semibold text-text-primary">
                          {item.name}
                        </span>
                        <span className="font-mono text-[10px] text-text-dim">
                          {item.techs}
                        </span>
                      </div>
                      <span className="font-mono text-xs text-text-muted">
                        {item.value}%
                      </span>
                    </div>
                    <div className="h-[3px] bg-dark-border rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-linear-to-r from-accent/80 to-accent/30 rounded-full"
                        initial={{ width: 0 }}
                        animate={
                          isInView ? { width: `${item.value}%` } : { width: 0 }
                        }
                        transition={{
                          duration: 1.2,
                          delay: 0.5 + i * 0.15,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <p className="mt-6 font-mono text-[10px] tracking-widest text-text-dim uppercase">
                Based on shipped projects
              </p>
            </div>
          </FadeInWhenVisible>

          {/* What You Get */}
          <FadeInWhenVisible delay={0.3}>
            <div className="bg-dark-card border border-dark-border/50 rounded-2xl p-8">
              <h3 className="font-grotesk text-lg font-bold text-text-primary mb-1">
                {"{ WHAT YOU GET }"}
              </h3>
              <p className="font-mono text-[11px] text-text-dim tracking-wider mb-8">
                Every engagement includes
              </p>

              <div className="space-y-6">
                {deliverables.map((item, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -20 }}
                    animate={
                      isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                    }
                    transition={{ delay: 0.8 + i * 0.15 }}
                    className="flex items-start gap-4"
                  >
                    <div className="mt-0.5 w-5 h-5 rounded-md bg-accent/10 border border-accent/30 flex items-center justify-center shrink-0">
                      <svg
                        className="w-3 h-3 text-accent"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <path d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-sm text-text-secondary">{item}</span>
                  </motion.div>
                ))}
              </div>

              {/* Decorative */}
              <div className="mt-10 pt-6 border-t border-dark-border/50">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald animate-pulse" />
                  <span className="font-mono text-[11px] tracking-wider text-emerald">
                    AVAILABLE FOR NEW PROJECTS
                  </span>
                </div>
              </div>
            </div>
          </FadeInWhenVisible>
        </div>
      </div>
    </section>
  );
}
