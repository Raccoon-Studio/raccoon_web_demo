import { useRef } from "react";
import { motion, useInView } from "framer-motion";

import { techRow1, techRow2 } from "../../data/techStack";

function TechBadge({ tech }) {
  return (
    <div className="flex-shrink-0 flex items-center gap-3 px-5 py-3 rounded-full border border-dark-border/50 bg-dark-card/50 hover:border-accent/30 transition-colors duration-300 group cursor-default">
      <span className="w-2 h-2 rounded-full bg-accent/50 group-hover:bg-accent transition-colors" />
      <span className="font-grotesk text-sm font-medium text-text-primary whitespace-nowrap">
        {tech.name}
      </span>
      <span className="font-mono text-[9px] tracking-[0.2em] text-text-dim uppercase whitespace-nowrap">
        {tech.category}
      </span>
    </div>
  );
}

function MarqueeRow({ items, reverse = false, speed = 35 }) {
  const duplicated = [...items, ...items, ...items];

  return (
    <div className="flex overflow-hidden py-2">
      <div
        className={`flex gap-3 ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicated.map((tech, i) => (
          <TechBadge key={`${tech.name}-${i}`} tech={tech} />
        ))}
      </div>
    </div>
  );
}

export default function TechStack() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative py-24 bg-dark overflow-hidden border-t border-dark-border/20"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-12"
        >
          <span className="font-mono text-[11px] tracking-[0.3em] text-accent uppercase">
            Built With
          </span>
          <h3 className="mt-3 font-grotesk text-2xl font-bold text-text-primary">
            Our Technology Stack
          </h3>
          <p className="mt-2 text-sm text-text-muted">
            The real tools powering every project we ship.
          </p>
        </motion.div>
      </div>

      {/* Full-width marquee */}
      <div className="space-y-3">
        <MarqueeRow items={techRow1} speed={40} />
        <MarqueeRow items={techRow2} reverse speed={35} />
      </div>
    </section>
  );
}
