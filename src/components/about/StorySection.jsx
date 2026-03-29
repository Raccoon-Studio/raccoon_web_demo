import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { companyOverview } from "../../data/about";
import { stagger, fadeUp, ease } from "../animation/workAnimation";

export default function StorySection() {
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          <motion.div variants={fadeUp}>
            <span className="inline-block font-mono text-[10px] text-accent/60 uppercase tracking-[0.2em] mb-3">
              Our Story
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-6">
              Born from{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
                frustration
              </span>
              , built with{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-400 to-accent">
                purpose
              </span>
            </h2>
            <div className="space-y-4 font-body text-[14px] text-text-muted leading-relaxed">
              <p>{companyOverview.longDescription}</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp} className="space-y-5">
            {/* Mission */}
            <div className="p-6 rounded-2xl border border-dark-border/15 bg-white/[0.015]">
              <span className="font-mono text-[10px] text-accent/50 uppercase tracking-widest block mb-2">
                Mission
              </span>
              <p className="font-display text-lg font-bold text-text-primary leading-relaxed">
                {companyOverview.mission}
              </p>
            </div>

            {/* Vision */}
            <div className="p-6 rounded-2xl border border-dark-border/15 bg-white/[0.015]">
              <span className="font-mono text-[10px] text-cyan/50 uppercase tracking-widest block mb-2">
                Vision
              </span>
              <p className="font-body text-[14px] text-text-muted leading-relaxed">
                {companyOverview.vision}
              </p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
