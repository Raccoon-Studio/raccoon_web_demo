import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { openRoles, perks } from "../../data/about";
import { stagger, fadeUp } from "../animation/workAnimation";
import RoleCard from "../ui/card/about/RoleCard";

export default function CareersSection() {
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
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Open Roles */}
          <motion.div variants={fadeUp}>
            <span className="inline-block font-mono text-[10px] text-accent/60 uppercase tracking-[0.2em] mb-3">
              Careers
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Join the{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
                team
              </span>
            </h2>
            <p className="font-body text-base text-text-muted mb-8">
              We're always looking for talented people who share our values.
            </p>

            <div className="space-y-3">
              {openRoles.map((role) => (
                <RoleCard key={role.title} role={role} />
              ))}
            </div>

            <a
              href="/careers"
              className="inline-flex items-center gap-2 mt-6 font-mono text-[11px] uppercase tracking-widest text-accent/60 hover:text-accent transition-colors"
            >
              View all openings
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </a>
          </motion.div>

          {/* Perks */}
          <motion.div variants={fadeUp}>
            <span className="font-mono text-[10px] text-text-dim/30 uppercase tracking-widest block mb-6">
              Why work with us
            </span>
            <div className="grid grid-cols-2 gap-3">
              {perks.map((perk) => (
                <div
                  key={perk.title}
                  className="p-4 rounded-xl border border-dark-border/10 bg-white/[0.01]"
                >
                  <span className="text-lg block mb-2">{perk.icon}</span>
                  <h4 className="font-display text-[13px] font-bold text-text-primary mb-0.5">
                    {perk.title}
                  </h4>
                  <p className="font-body text-[11px] text-text-dim/40">
                    {perk.description}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>
    </div>
  );
}
