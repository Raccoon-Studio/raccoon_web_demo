import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";

import { projects } from "../../data/portfolio";

function ProjectCard({ project, index }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const isEven = index % 2 === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 60 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      className="relative grid lg:grid-cols-[1fr_1fr] gap-0 border border-dark-border/30 rounded-2xl overflow-hidden group hover:border-dark-border-light/50 transition-colors duration-500"
    >
      {/* Image Side */}
      <div
        className={`relative h-64 lg:h-auto bg-linear-to-br ${project.gradient} overflow-hidden ${!isEven ? "lg:order-2" : ""}`}
      >
        <div className="absolute inset-0 flex items-center justify-center">
          {/* Placeholder visual */}
          <div className="grid grid-cols-3 gap-2 p-8 opacity-30">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="w-16 h-20 rounded-lg bg-white/10 backdrop-blur-sm"
              />
            ))}
          </div>
          {/* Project number watermark */}
          <span className="absolute bottom-4 left-6 font-display text-6xl font-extrabold text-white/4">
            {project.num}
          </span>
        </div>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-accent/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </div>

      {/* Content Side */}
      <div
        className={`p-8 lg:p-10 bg-dark-card/50 ${!isEven ? "lg:order-1" : ""}`}
      >
        <h3 className="font-display text-3xl font-extrabold text-text-primary italic">
          {project.title}
        </h3>
        <p className={`mt-2 text-sm ${project.accent} font-medium`}>
          {project.tagline}
        </p>
        <p className="mt-4 text-sm text-text-muted leading-relaxed">
          {project.description}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mt-6">
          {project.tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1.5 rounded-md border border-dark-border-light/50 font-mono text-[10px] tracking-[0.15em] text-text-dim"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* View link */}
        <motion.a
          href="#"
          className={`inline-flex items-center gap-2 mt-8 font-mono text-[12px] tracking-[0.15em] uppercase ${project.accent} hover:gap-3 transition-all duration-300`}
        >
          View Project
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M7 17L17 7M17 7H7M17 7V17" />
          </svg>
        </motion.a>
      </div>

      {/* Project number - side label */}
      <div
        className={`absolute top-8 ${isEven ? "left-8" : "right-8"} lg:hidden`}
      >
        <span className="font-display text-5xl font-extrabold text-accent/20">
          {project.num}
        </span>
        <p className="font-mono text-[10px] tracking-widest text-text-dim uppercase mt-1">
          Project {project.num}
        </p>
      </div>

      {/* Desktop project number */}
      <div
        className={`hidden lg:block absolute top-8 ${isEven ? "left-0" : "right-0"}`}
      >
        {/* Numbers shown outside on desktop */}
      </div>
    </motion.div>
  );
}

export default function Portfolio() {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-50px" });

  return (
    <section
      id="work"
      ref={sectionRef}
      className="relative py-32 bg-dark overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Section Header */}
        <div className="grid lg:grid-cols-2 gap-8 items-end mb-20">
          <div>
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              className="flex items-center gap-3 mb-6"
            >
              <div className="flex gap-1.5">
                <span className="w-2 h-2 rounded-full bg-accent" />
                <span className="w-2 h-2 rounded-full bg-accent/50" />
                <span className="w-2 h-2 rounded-full bg-accent/25" />
              </div>
              <span className="font-mono text-[12px] tracking-[0.3em] uppercase text-text-muted">
                // Selected Work
              </span>
              <div className="flex-1 h-px bg-dark-border" />
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2, duration: 0.7 }}
              className="font-display text-5xl md:text-7xl font-extrabold italic text-text-primary"
            >
              Our Craft
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 }}
              className="mt-4 text-text-secondary max-w-lg"
            >
              Every project is treated as a product — architected for scale,
              designed for users, shipped with precision.
            </motion.p>
          </div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="lg:text-right"
          >
            <span className="font-display text-[120px] lg:text-[160px] font-extrabold text-text-primary/3 leading-none">
              75
            </span>
            <div className="font-mono text-[11px] tracking-[0.3em] text-text-dim uppercase -mt-8 lg:-mt-12">
              Projects
              <br />
              Shipped
            </div>
          </motion.div>
        </div>

        {/* Projects */}
        <div className="space-y-8">
          {projects.map((project, i) => (
            <ProjectCard key={project.num} project={project} index={i} />
          ))}
        </div>

        {/* View All Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.8 }}
          className="flex justify-center mt-16"
        >
          <a
            href="#"
            className="group inline-flex items-center gap-3 px-10 py-4 rounded-full border border-dark-border-light text-text-secondary font-mono text-[12px] tracking-[0.2em] uppercase hover:border-accent/50 hover:text-text-primary transition-all duration-400"
          >
            View All Products
            <svg
              className="w-4 h-4 transition-transform group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
