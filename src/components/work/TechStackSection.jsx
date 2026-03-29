import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { techStackUsed } from "../../data/work";
import { stagger, fadeUp, ease } from "../animation/workAnimation";

export default function TechStackSection() {
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
            Technology
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Built with the{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
              right tools
            </span>
          </h2>
          <p className="font-body text-base text-text-muted">
            We choose the best technology for each project's requirements.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {techStackUsed.map((category, ci) => (
            <motion.div
              key={category.category}
              variants={fadeUp}
              className="space-y-3"
            >
              <h3 className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim/40 flex items-center gap-2 mb-4">
                <span className="w-1.5 h-1.5 rounded-full bg-accent/30" />
                {category.category}
              </h3>

              <div className="space-y-2">
                {category.tools.map((tool, ti) => (
                  <motion.div
                    key={tool.name}
                    initial={{ opacity: 0, x: -10 }}
                    animate={isInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ delay: 0.3 + ci * 0.1 + ti * 0.04, ease }}
                    className="group flex items-center gap-3 p-3 rounded-xl border border-dark-border/8 bg-white/[0.01] hover:bg-white/[0.025] hover:border-dark-border/20 transition-all duration-300"
                  >
                    <span
                      className="w-2 h-2 rounded-full transition-shadow duration-300 group-hover:shadow-[0_0_8px]"
                      style={{ backgroundColor: tool.color + "60" }}
                    />
                    <span className="font-body text-[13px] text-text-primary/80 font-medium flex-1">
                      {tool.name}
                    </span>
                    <span className="font-mono text-[9px] text-text-dim/30 uppercase tracking-wider">
                      {tool.projects} projects
                    </span>

                    {/* Usage bar */}
                    <div className="w-16 h-1 rounded-full bg-dark-border/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={
                          isInView
                            ? { width: `${(tool.projects / 42) * 100}%` }
                            : {}
                        }
                        transition={{
                          delay: 0.5 + ci * 0.1 + ti * 0.04,
                          duration: 0.7,
                          ease,
                        }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: tool.color + "40" }}
                      />
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
