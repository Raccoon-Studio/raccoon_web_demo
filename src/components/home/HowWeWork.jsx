import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const phases = [
  { num: "01", title: "DISCOVER", sub: "Scope & plan", color: "bg-accent" },
  { num: "02", title: "BUILD", sub: "Sprint delivery", color: "bg-cyan" },
  { num: "03", title: "LAUNCH", sub: "Ship & iterate", color: "bg-emerald" },
];

const timelinePhases = [
  { label: "DISCOVERY", width: "25%", color: "from-white/40 to-white/10" },
  { label: "DESIGN", width: "40%", color: "from-accent/50 to-accent/10" },
  { label: "DEV", width: "55%", color: "from-white/50 to-white/10" },
  { label: "QA+LAUNCH", width: "75%", color: "from-white/30 to-transparent" },
];

export default function HowWeWork() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="process"
      ref={ref}
      className="relative py-32 bg-dark overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Delivery Timeline */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
            className="bg-dark-card border border-dark-border/50 rounded-2xl p-8 lg:p-10"
          >
            <h3 className="font-grotesk text-lg font-bold text-text-primary mb-1">
              {"{ DELIVERY TIMELINE }"}
            </h3>
            <p className="font-mono text-[11px] text-text-dim tracking-wider mb-10">
              Typical MVP: 4 - 6 weeks
            </p>

            <div className="space-y-8">
              {timelinePhases.map((phase, i) => (
                <div key={i}>
                  <span className="font-grotesk text-sm font-bold text-text-primary tracking-wider">
                    {phase.label}
                  </span>
                  <div className="mt-2 h-3 bg-dark-border/30 rounded-full overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${phase.color}`}
                      initial={{ width: 0 }}
                      animate={isInView ? { width: phase.width } : { width: 0 }}
                      transition={{
                        duration: 1.5,
                        delay: 0.3 + i * 0.2,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>

            {/* Week markers */}
            <div className="flex justify-between mt-6 px-1">
              {["W1", "W2", "W3", "W4"].map((w) => (
                <span key={w} className="font-mono text-xs text-text-dim">
                  {w}
                </span>
              ))}
            </div>
          </motion.div>

          {/* How We Work */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="bg-dark-card border border-dark-border/50 rounded-2xl p-8 lg:p-10"
          >
            <h3 className="font-grotesk text-lg font-bold text-accent text-center mb-1">
              {"{ HOW WE WORK }"}
            </h3>
            <p className="font-mono text-[11px] text-text-dim tracking-wider text-center mb-12">
              Our three-phase delivery framework
            </p>

            {/* Process Steps */}
            <div className="flex items-center justify-between mb-10 px-4">
              {phases.map((phase, i) => (
                <div key={i} className="flex items-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={isInView ? { scale: 1 } : { scale: 0 }}
                    transition={{
                      delay: 0.5 + i * 0.2,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className={`relative w-14 h-14 rounded-full border-2 border-text-dim flex items-center justify-center ${
                      i === phases.length - 1 ? "bg-dark-elevated" : ""
                    }`}
                  >
                    <span className="font-mono text-sm font-bold text-text-primary">
                      {phase.num}
                    </span>
                    {/* Pulse ring for active */}
                    {i === 0 && (
                      <span className="absolute inset-0 rounded-full border border-accent animate-ping opacity-20" />
                    )}
                  </motion.div>
                  {i < phases.length - 1 && (
                    <motion.div
                      className="w-16 lg:w-24 h-[2px] bg-dark-border-light mx-2"
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : { scaleX: 0 }}
                      transition={{ delay: 0.7 + i * 0.2, duration: 0.5 }}
                      style={{ originX: 0 }}
                    />
                  )}
                </div>
              ))}
            </div>

            {/* Labels */}
            <div className="grid grid-cols-3 gap-4 text-center">
              {phases.map((phase, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.8 + i * 0.15 }}
                >
                  <h4 className="font-display text-xl lg:text-2xl font-extrabold text-text-primary tracking-wide">
                    {phase.title}
                  </h4>
                  <p className="mt-2 text-sm text-text-muted">{phase.sub}</p>
                </motion.div>
              ))}
            </div>

            {/* Bottom decoration */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={isInView ? { opacity: 1 } : {}}
              transition={{ delay: 1.2 }}
              className="mt-12 flex items-center justify-center gap-3"
            >
              <span className="w-8 h-[1px] bg-dark-border-light" />
              <span className="font-mono text-[10px] text-text-dim tracking-widest">
                REPEAT & REFINE
              </span>
              <span className="w-8 h-[1px] bg-dark-border-light" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
