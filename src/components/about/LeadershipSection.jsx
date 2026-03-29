import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { leadershipTeam } from "../../data/about";
import { stagger, fadeUp } from "../animation/workAnimation";
import LeaderCard from "../ui/card/about/LeaderCard";

export default function LeadershipSection() {
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
            Leadership
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            The people{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
              behind the products
            </span>
          </h2>
          <p className="font-body text-base text-text-muted">
            Veterans from Google, Spotify, Pentagram, and McKinsey — united by a
            shared obsession with craft.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {leadershipTeam.map((member) => (
            <LeaderCard key={member.name} member={member} />
          ))}
        </div>
      </motion.div>
    </div>
  );
}
