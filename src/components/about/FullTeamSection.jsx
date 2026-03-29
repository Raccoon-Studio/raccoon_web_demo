import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { fullTeam } from "../../data/about";
import { stagger, fadeUp, ease } from "../animation/workAnimation";

export default function FullTeamSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [showAll, setShowAll] = useState(false);
  const visible = showAll ? fullTeam : fullTeam.slice(0, 8);

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
        <motion.div variants={fadeUp} className="mb-8">
          <h3 className="font-display text-xl font-bold text-text-primary mb-2">
            The Full Team
          </h3>
          <p className="font-body text-[13px] text-text-dim/50">
            {fullTeam.length} specialists across engineering, design, and
            delivery.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {visible.map((member, i) => (
            <motion.div
              key={member.name}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.1 + i * 0.04, ease }}
              className="flex items-center gap-3 p-3 rounded-xl border border-dark-border/10 bg-white/[0.01] hover:bg-white/[0.02] transition-colors duration-300"
            >
              <img
                src={member.avatar}
                alt={member.name}
                className="w-9 h-9 rounded-xl border border-dark-border/10 object-cover"
                loading="lazy"
              />
              <div className="min-w-0">
                <p className="font-body text-[12px] font-medium text-text-primary truncate">
                  {member.name}
                </p>
                <p className="font-mono text-[8px] text-text-dim/40 uppercase tracking-wider truncate">
                  {member.role}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {!showAll && fullTeam.length > 8 && (
          <motion.div variants={fadeUp} className="flex justify-center mt-6">
            <button
              onClick={() => setShowAll(true)}
              className="font-mono text-[10px] uppercase tracking-widest text-text-dim/30 hover:text-accent/60 transition-colors"
            >
              Show all {fullTeam.length} members →
            </button>
          </motion.div>
        )}
      </motion.div>
    </div>
  );
}
