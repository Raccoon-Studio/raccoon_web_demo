import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { featuredProjects, categories } from "../../data/work";
import { stagger, fadeUp, ease } from "../animation/workAnimation";
import FeaturedProjectCard from "../ui/card/work/FeaturedProjectCard";

export default function FeaturedProjects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered =
    activeFilter === "all"
      ? featuredProjects
      : featuredProjects.filter((p) => p.category === activeFilter);

  return (
    <div
      ref={ref}
      className="relative mx-auto max-w-[1400px] px-6 lg:px-10 pb-24 md:pb-32"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
      >
        {/* Section header */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div>
            <span className="inline-block font-mono text-[10px] text-accent/60 uppercase tracking-[0.2em] mb-3">
              Featured Case Studies
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary">
              Deep dives into our{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
                best work
              </span>
            </h2>
          </div>

          {/* Filters */}
          <div className="flex flex-wrap gap-1.5">
            {categories.slice(0, 5).map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveFilter(cat.id)}
                className={`px-3.5 py-2 rounded-xl text-[11px] font-body font-medium border transition-all duration-300 ${
                  activeFilter === cat.id
                    ? "bg-accent/[0.08] border-accent/30 text-accent"
                    : "bg-white/[0.02] border-dark-border/12 text-text-dim/50 hover:text-text-muted hover:border-dark-border/25"
                }`}
              >
                {cat.label}
                <span className="ml-1.5 font-mono text-[9px] opacity-50">
                  {cat.count}
                </span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Projects list */}
        <div className="space-y-10">
          {filtered.map((project, i) => (
            <FeaturedProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {filtered.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-20"
          >
            <p className="font-body text-text-dim/40">
              No projects in this category yet.
            </p>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
