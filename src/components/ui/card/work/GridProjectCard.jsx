import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ease } from "../../../animation/workAnimation";

export default function GridProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.a
      ref={ref}
      href={`/work/${project.id}`}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06, ease }}
      whileHover={{ y: -4 }}
      className="group relative rounded-2xl border border-dark-border/15 bg-white/[0.01] overflow-hidden hover:border-dark-border/35 transition-all duration-500 block"
    >
      {/* Image */}
      <div
        className={`relative h-48 bg-gradient-to-br ${project.gradient} overflow-hidden`}
      >
        <img
          src={project.image}
          alt={project.title}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-dark via-dark/20 to-transparent opacity-70" />

        {/* Metric overlay */}
        {project.metric && (
          <div className="absolute bottom-3 right-3">
            <div className="px-2.5 py-1.5 rounded-lg bg-dark/70 backdrop-blur-sm border border-white/10">
              <span
                className={`font-display text-sm font-bold ${project.accentColor} block leading-none`}
              >
                {project.metric.value}
              </span>
              <span className="font-mono text-[7px] text-white/40 uppercase tracking-wider">
                {project.metric.label}
              </span>
            </div>
          </div>
        )}

        {/* Year */}
        <span className="absolute top-3 left-3 px-2 py-0.5 rounded-md bg-dark/50 backdrop-blur-sm font-mono text-[8px] text-white/50 uppercase tracking-widest">
          {project.year}
        </span>
      </div>

      {/* Content */}
      <div className="p-5">
        <h4 className="font-display text-lg font-bold text-text-primary mb-1 group-hover:text-accent transition-colors duration-300">
          {project.title}
        </h4>
        <p className="font-body text-[13px] text-text-muted mb-4 line-clamp-2">
          {project.tagline}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-0.5 rounded bg-white/[0.03] border border-dark-border/10 font-mono text-[8px] text-text-dim/40 uppercase tracking-wider"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Link */}
        <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-widest text-text-dim/30 group-hover:text-accent/60 transition-colors duration-300">
          View project
          <svg
            className="w-3 h-3 transition-transform duration-300 group-hover:translate-x-0.5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </motion.a>
  );
}
