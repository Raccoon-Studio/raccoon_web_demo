import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gridProjects } from "../../data/work";
import { stagger, fadeUp } from "../animation/workAnimation";
import GridProjectCard from "../ui/card/work/GridProjectCard";

export default function ProjectGrid() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const [showAll, setShowAll] = useState(false);

  const visible = showAll ? gridProjects : gridProjects.slice(0, 6);

  return (
    <div
      ref={ref}
      className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-24 md:py-32 border-t border-dark-border/10"
    >
      <motion.div
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={stagger}
      >
        <motion.div variants={fadeUp} className="mb-12">
          <span className="inline-block font-mono text-[10px] text-accent/60 uppercase tracking-[0.2em] mb-3">
            More Projects
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-3">
            Selected works
          </h2>
          <p className="font-body text-base text-text-muted max-w-lg">
            A curated selection across industries and technologies.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {visible.map((project, i) => (
            <GridProjectCard key={project.id} project={project} index={i} />
          ))}
        </div>

        {!showAll && gridProjects.length > 6 && (
          <motion.div variants={fadeUp} className="flex justify-center mt-10">
            <button
              onClick={() => setShowAll(true)}
              className="group inline-flex items-center gap-2.5 px-8 py-3.5 rounded-2xl border border-dark-border/20 bg-white/[0.02] hover:bg-white/[0.04] hover:border-dark-border/35 font-grotesk text-[12px] font-semibold uppercase tracking-[0.12em] text-text-muted hover:text-text-primary transition-all duration-300"
            >
              Show All Projects
              <svg
                className="w-4 h-4 transition-transform group-hover:translate-y-0.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M6 9l6 6 6-6" />
              </svg>
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
