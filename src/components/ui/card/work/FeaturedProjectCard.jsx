import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ease } from "../../../animation/workAnimation";

export default function FeaturedProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;
  const [activeImage, setActiveImage] = useState(0);
  const [showDetails, setShowDetails] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease }}
      className="relative"
    >
      {/* Project Number — floating */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={isInView ? { opacity: 1, scale: 1 } : {}}
        transition={{ delay: 0.3, duration: 0.5, ease }}
        className={`hidden lg:flex absolute top-8 ${isEven ? "-left-16" : "-right-16"} z-20 w-12 h-12 rounded-2xl bg-white/[0.03] border border-dark-border/15 items-center justify-center`}
      >
        <span className="font-mono text-[11px] text-accent/60 font-bold">
          {project.num}
        </span>
      </motion.div>

      <div className="relative grid lg:grid-cols-[1fr_1fr] gap-0 border border-dark-border/20 rounded-3xl overflow-hidden group hover:border-dark-border/40 transition-all duration-500">
        {/* ── Image Side ── */}
        <div
          className={`relative h-72 lg:h-[480px] bg-gradient-to-br ${project.gradient} overflow-hidden ${!isEven ? "lg:order-2" : ""}`}
        >
          {/* Image carousel */}
          <AnimatePresence mode="wait">
            <motion.img
              key={activeImage}
              src={project.images[activeImage]}
              alt={project.title}
              initial={{ opacity: 0, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5, ease }}
              className="absolute inset-0 w-full h-full object-cover"
              loading="lazy"
            />
          </AnimatePresence>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/30 to-transparent opacity-60" />
          <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          {/* Image dots */}
          {project.images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
              {project.images.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImage(i)}
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeImage
                      ? `${project.accentBg} w-5`
                      : "bg-white/20 w-1.5 hover:bg-white/40"
                  }`}
                />
              ))}
            </div>
          )}

          {/* Category + Year */}
          <div className="absolute top-4 left-4 flex items-center gap-2 z-10">
            <span className="px-2.5 py-1 rounded-lg bg-dark/60 backdrop-blur-sm border border-white/10 font-mono text-[9px] uppercase tracking-widest text-white/70">
              {project.industry}
            </span>
            <span className="px-2.5 py-1 rounded-lg bg-dark/60 backdrop-blur-sm border border-white/10 font-mono text-[9px] uppercase tracking-widest text-white/50">
              {project.year}
            </span>
          </div>

          {/* Awards badge */}
          {project.awards.length > 0 && (
            <div className="absolute top-4 right-4 z-10">
              <span className="flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-400/10 border border-amber-400/20 backdrop-blur-sm">
                <span className="text-xs">🏆</span>
                <span className="font-mono text-[8px] text-amber-400/80 uppercase tracking-wider">
                  {project.awards[0]}
                </span>
              </span>
            </div>
          )}

          {/* Number watermark */}
          <span className="absolute bottom-6 left-8 font-display text-[100px] font-extrabold text-white/[0.03] leading-none select-none pointer-events-none">
            {project.num}
          </span>
        </div>

        {/* ── Content Side ── */}
        <div
          className={`p-8 lg:p-10 xl:p-12 bg-white/[0.01] flex flex-col ${!isEven ? "lg:order-1" : ""}`}
        >
          {/* Header */}
          <div className="mb-6">
            <div className="flex items-center gap-3 mb-2">
              <span
                className={`w-1.5 h-1.5 rounded-full ${project.accentBg}`}
              />
              <span className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim/50">
                {project.client} · {project.duration}
              </span>
            </div>
            <h3 className="font-display text-3xl lg:text-4xl font-bold text-text-primary mb-2">
              {project.title}
            </h3>
            <p className={`text-sm font-medium ${project.accentColor}`}>
              {project.tagline}
            </p>
          </div>

          {/* Description */}
          <p className="text-sm text-text-muted leading-relaxed mb-6">
            {project.description}
          </p>

          {/* Metrics */}
          <div className="grid grid-cols-2 gap-3 mb-6">
            {project.metrics.map((m) => (
              <div
                key={m.label}
                className="p-3 rounded-xl border border-dark-border/10 bg-white/[0.015]"
              >
                <span
                  className={`font-display text-xl font-bold ${project.accentColor} block`}
                >
                  {m.value}
                </span>
                <span className="font-mono text-[8px] text-text-dim/40 uppercase tracking-widest">
                  {m.label}
                </span>
              </div>
            ))}
          </div>

          {/* Challenge/Solution toggle */}
          <AnimatePresence>
            {showDetails && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                transition={{ duration: 0.35, ease }}
                className="overflow-hidden mb-6"
              >
                <div className="space-y-4 p-4 rounded-xl border border-dark-border/10 bg-white/[0.01]">
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-red-400/60 block mb-1">
                      Challenge
                    </span>
                    <p className="text-[13px] text-text-muted leading-relaxed">
                      {project.challenge}
                    </p>
                  </div>
                  <div className="h-px bg-dark-border/10" />
                  <div>
                    <span className="font-mono text-[9px] uppercase tracking-widest text-emerald/60 block mb-1">
                      Solution
                    </span>
                    <p className="text-[13px] text-text-muted leading-relaxed">
                      {project.solution}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          <button
            type="button"
            onClick={() => setShowDetails(!showDetails)}
            className="flex items-center gap-1.5 mb-6 font-mono text-[10px] uppercase tracking-widest text-text-dim/40 hover:text-text-dim transition-colors"
          >
            {showDetails ? "Hide" : "Challenge & Solution"}
            <motion.svg
              animate={{ rotate: showDetails ? 180 : 0 }}
              transition={{ duration: 0.2 }}
              className="w-3 h-3"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M6 9l6 6 6-6" />
            </motion.svg>
          </button>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {project.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-lg border border-dark-border/15 bg-white/[0.02] font-mono text-[9px] tracking-[0.12em] text-text-dim/50 uppercase"
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Testimonial */}
          {project.testimonial && (
            <div className="p-4 rounded-xl border border-dark-border/10 bg-white/[0.01] mb-6">
              <p className="text-[12px] text-text-muted/70 leading-relaxed italic mb-3">
                "{project.testimonial.quote}"
              </p>
              <div className="flex items-center gap-2.5">
                <img
                  src={project.testimonial.avatar}
                  alt={project.testimonial.author}
                  className="w-6 h-6 rounded-full border border-dark-border/15"
                  loading="lazy"
                />
                <span className="font-mono text-[9px] text-text-dim/40 uppercase tracking-wider">
                  {project.testimonial.author} · {project.testimonial.role}
                </span>
              </div>
            </div>
          )}

          {/* Actions */}
          <div className="mt-auto flex items-center gap-3">
            <motion.a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl ${project.accentBg}/10 border border-current/20 font-mono text-[11px] tracking-[0.12em] uppercase ${project.accentColor} hover:${project.accentBg}/20 transition-colors duration-300`}
            >
              View Live
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6M15 3h6v6M10 14L21 3" />
              </svg>
            </motion.a>
            <a
              href={`/work/${project.id}`}
              className="inline-flex items-center gap-2 font-mono text-[11px] tracking-[0.12em] uppercase text-text-dim/50 hover:text-text-primary transition-colors duration-300"
            >
              Full Case Study
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
