import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cultureItems, internalTools } from "../../data/about";
import { stagger, fadeUp } from "../animation/workAnimation";

export default function CultureSection() {
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
            Culture
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            How we{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
              work
            </span>
          </h2>
          <p className="font-body text-base text-text-muted">
            Our culture isn't perks — it's practices that produce great work.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-12">
          {cultureItems.map((item) => (
            <motion.div
              key={item.title}
              variants={fadeUp}
              whileHover={{ y: -2 }}
              className="p-5 rounded-2xl border border-dark-border/12 bg-white/[0.01] hover:bg-white/[0.025] transition-all duration-300"
            >
              <div className="w-9 h-9 rounded-xl bg-accent/[0.07] border border-accent/15 flex items-center justify-center text-accent mb-3">
                {item.icon}
              </div>
              <h3 className="font-display text-[15px] font-bold text-text-primary mb-1.5">
                {item.title}
              </h3>
              <p className="font-body text-[13px] text-text-muted leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Internal tools */}
        <motion.div variants={fadeUp}>
          <span className="font-mono text-[10px] text-text-dim/30 uppercase tracking-widest block mb-4">
            Our Toolkit
          </span>
          <div className="flex flex-wrap gap-2">
            {internalTools.map((tool) => (
              <span
                key={tool.name}
                className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl border border-dark-border/10 bg-white/[0.01] hover:bg-white/[0.025] transition-colors duration-300"
              >
                <span className="text-sm">{tool.icon}</span>
                <span className="font-body text-[12px] text-text-muted">
                  {tool.name}
                </span>
                <span className="font-mono text-[8px] text-text-dim/25 uppercase tracking-wider">
                  {tool.category}
                </span>
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
