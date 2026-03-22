import { useRef, useEffect, useState } from "react";
import { motion, useInView, animate } from "framer-motion";

import { globalStats as stats } from "../../data/stats";

function Counter({ value, suffix }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (isInView) {
      const controls = animate(0, value, {
        duration: 2,
        ease: [0.22, 1, 0.36, 1],
        onUpdate(v) {
          setDisplay(Math.round(v));
        },
      });
      return controls.stop;
    }
  }, [isInView, value]);

  return (
    <span
      ref={ref}
      className="font-display text-5xl md:text-6xl font-extrabold italic gradient-text"
    >
      {display}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative py-24 bg-dark overflow-hidden">
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Showreel Label */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          className="text-center mb-8"
        >
          <span className="font-mono text-[12px] tracking-[0.3em] text-text-dim uppercase">
            Our Showreel
          </span>
        </motion.div>

        {/* Video/Showreel Placeholder */}
        <motion.div
          initial={{ opacity: 0, y: 30, scale: 0.95 }}
          animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative rounded-2xl overflow-hidden mb-20 aspect-video max-w-4xl mx-auto"
        >
          <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-cyan/10 to-accent/5" />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              {/* Browser mockup */}
              <div className="bg-dark-card/80 backdrop-blur-xl rounded-xl border border-dark-border p-6 max-w-md">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-2 h-2 rounded-full bg-red-400/60" />
                  <div className="w-2 h-2 rounded-full bg-yellow-400/60" />
                  <div className="w-2 h-2 rounded-full bg-green-400/60" />
                </div>
                <ul className="space-y-4 text-left">
                  {[
                    "MVP in weeks",
                    "Clean scalable code",
                    "Built for growth",
                  ].map((item, i) => (
                    <motion.li
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={isInView ? { opacity: 1, x: 0 } : {}}
                      transition={{ delay: 0.6 + i * 0.2 }}
                      className="flex items-center gap-3"
                    >
                      <span className="w-1.5 h-1.5 rounded-full bg-accent" />
                      <span className="font-grotesk text-lg md:text-xl font-bold text-text-primary">
                        {item}
                      </span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Live badge */}
          <div className="absolute top-4 left-4 flex items-center gap-2 px-3 py-1 rounded-full bg-dark/60 backdrop-blur-sm">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
            <span className="font-mono text-[10px] tracking-widest text-red-400 uppercase">
              Live
            </span>
          </div>

          {/* Decorative floating elements */}
          <motion.div
            animate={{ y: [-10, 10, -10], rotate: [0, 5, 0] }}
            transition={{ duration: 6, repeat: Infinity }}
            className="absolute top-1/4 right-1/4 w-24 h-16 rounded-lg bg-accent/10 border border-accent/20 backdrop-blur-sm"
          />
          <motion.div
            animate={{ y: [10, -10, 10], rotate: [0, -3, 0] }}
            transition={{ duration: 5, repeat: Infinity }}
            className="absolute bottom-1/4 right-1/3 w-20 h-14 rounded-lg bg-cyan/10 border border-cyan/20 backdrop-blur-sm"
          />
        </motion.div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-3 gap-0 border border-dark-border/30 rounded-2xl overflow-hidden">
          {stats.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.4 + i * 0.15 }}
              className={`p-10 ${i < stats.length - 1 ? "md:border-r border-dark-border/30" : ""} text-center`}
            >
              <Counter value={stat.value} suffix={stat.suffix} />
              <h4 className="mt-3 font-grotesk text-base font-semibold text-text-primary">
                {stat.label}
              </h4>
              <p className="mt-1 text-sm text-text-muted">{stat.sub}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
