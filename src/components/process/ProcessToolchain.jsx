// ─── components/process/ProcessToolchain.jsx ──────────────
import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const categories = [
  {
    label: "Frontend",
    tools: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
  },
  {
    label: "Backend",
    tools: ["Node.js", "Python", "PostgreSQL", "Redis", "GraphQL"],
  },
  {
    label: "Infrastructure",
    tools: ["AWS", "Vercel", "Docker", "GitHub Actions", "Terraform"],
  },
  {
    label: "Design",
    tools: ["Figma", "Storybook", "Design Tokens", "A11y Audit", "Lottie"],
  },
  {
    label: "Project Mgmt",
    tools: ["Linear", "Slack", "Notion", "Loom", "Google Meet"],
  },
  {
    label: "Quality",
    tools: ["Jest", "Playwright", "Sentry", "Lighthouse", "SonarQube"],
  },
];

export default function ProcessToolchain() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      ref={ref}
      className="py-28 bg-dark-card border-y border-dark-border/20"
    >
      <div className="mx-auto max-w-[1200px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <span className="font-mono text-[11px] tracking-[0.25em] text-text-dim uppercase">
            Our Stack
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Tools we
            <span className="text-accent"> trust in production</span>
          </h2>
          <p className="mt-4 max-w-lg mx-auto text-text-muted leading-relaxed">
            We pick boring, battle-tested technology over hype. Every tool here
            has earned its spot through hundreds of deployments.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {categories.map((cat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15 + i * 0.08, duration: 0.5 }}
              className="p-6 rounded-2xl border border-dark-border/20 bg-dark group hover:border-accent/15 transition-colors duration-300"
            >
              <span className="font-mono text-[10px] text-accent tracking-[0.2em] uppercase">
                {cat.label}
              </span>
              <div className="mt-4 flex flex-wrap gap-2">
                {cat.tools.map((tool, j) => (
                  <span
                    key={j}
                    className="px-3 py-1.5 rounded-lg text-xs font-medium text-text-muted bg-dark-elevated border border-dark-border/20 group-hover:border-dark-border/40 transition-colors"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="mt-8 text-center font-mono text-[11px] text-text-dim tracking-wider"
        >
          Stack is adapted per project. We go where the requirements lead — not
          where the trend goes.
        </motion.p>
      </div>
    </section>
  );
}
