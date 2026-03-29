import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { timeline } from "../../data/about";
import { stagger, fadeUp } from "../animation/workAnimation";
import TimelineItem from "../ui/card/about/TimelineItem";

export default function TimelineSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

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
        <motion.div
          variants={fadeUp}
          className="text-center max-w-xl mx-auto mb-16"
        >
          <span className="inline-block font-mono text-[10px] text-accent/60 uppercase tracking-[0.2em] mb-3">
            Our Journey
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            From 3 people to{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
              50+ projects
            </span>
          </h2>
          <p className="font-body text-base text-text-muted">
            Five years of growth, one deadline at a time.
          </p>
        </motion.div>

        <div className="space-y-6 md:space-y-0">
          {timeline.map((item, i) => (
            <TimelineItem
              key={`${item.year}-${item.quarter}`}
              item={item}
              index={i}
              isLast={i === timeline.length - 1}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
