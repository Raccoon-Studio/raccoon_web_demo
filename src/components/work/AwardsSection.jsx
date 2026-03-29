import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { awards } from "../../data/work";
import { stagger, fadeUp } from "../animation/workAnimation";
import AwardCard from "../ui/card/work/AwardCard";

export default function AwardsSection() {
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
        <motion.div variants={fadeUp} className="max-w-xl mb-12">
          <span className="inline-block font-mono text-[10px] text-accent/60 uppercase tracking-[0.2em] mb-3">
            Recognition
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Awards &{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-orange-400">
              recognition
            </span>
          </h2>
          <p className="font-body text-base text-text-muted">
            Our work has been recognized by leading industry organizations.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {awards.map((award) => (
            <AwardCard key={`${award.name}-${award.year}`} award={award} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
