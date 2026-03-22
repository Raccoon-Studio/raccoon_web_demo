import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

import { marqueeServices as services } from "../../data/services";

function MarqueeRow({ items, reverse = false, speed = 30 }) {
  const duplicated = [...items, ...items, ...items];

  return (
    <div className="flex overflow-hidden py-3">
      <div
        className={`flex gap-6 whitespace-nowrap ${reverse ? "animate-marquee-reverse" : "animate-marquee"}`}
        style={{ animationDuration: `${speed}s` }}
      >
        {duplicated.map((item, i) => (
          <div key={i} className="flex items-center gap-6">
            <span className="font-mono text-[13px] tracking-[0.15em] text-text-dim hover:text-accent transition-colors duration-300 cursor-default">
              {item}
            </span>
            <span className="w-1.5 h-1.5 rounded-full bg-dark-border-light" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function ServiceMarquee() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const x1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const x2 = useTransform(scrollYProgress, [0, 1], [-100, 0]);

  return (
    <section
      ref={ref}
      className="relative py-6 border-y border-dark-border/30 overflow-hidden bg-dark-surface/50"
    >
      <motion.div style={{ x: x1 }}>
        <MarqueeRow items={services} speed={40} />
      </motion.div>
      <motion.div style={{ x: x2 }}>
        <MarqueeRow items={services} reverse speed={35} />
      </motion.div>
    </section>
  );
}
