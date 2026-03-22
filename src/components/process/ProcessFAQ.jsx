// ─── components/process/ProcessFAQ.jsx ────────────────────
import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

const faqs = [
  {
    q: "How long does a typical MVP take?",
    a: "Most MVPs ship in 4–6 weeks. Complex platforms with integrations may take 8–12 weeks. We'll give you an exact timeline during the Discovery phase — and we stick to it (98% on-time delivery rate).",
  },
  {
    q: "What if the scope changes mid-project?",
    a: "It happens — and we handle it transparently. Any scope change goes through a formal change request. We estimate the impact on timeline and budget, you approve or decline, and we document everything. No silent scope creep.",
  },
  {
    q: "Do I own the source code?",
    a: "100%. On project completion, we transfer all source code, design files, documentation, and IP to your repositories. We retain zero rights. It's your product, period.",
  },
  {
    q: "How do payments work?",
    a: "Fixed-price projects use milestone-based payments (typically 30/30/30/10 split across Discovery, Design, Dev, Launch). You pay for completed milestones — not estimated hours. Retainers are billed monthly.",
  },
  {
    q: "What happens if I'm not happy with the work?",
    a: "You see working software every single week. If something isn't right, we course-correct immediately — not at the end. Our Friday demo model ensures you're never more than 5 days away from giving feedback.",
  },
  {
    q: "Can you work with our existing dev team?",
    a: "Absolutely. Our Staff Augmentation model embeds our engineers directly into your team — same Slack, same standups, same repo. We adapt to your processes, not the other way around.",
  },
  {
    q: "What technologies do you specialize in?",
    a: "React, Next.js, Node.js, Python, and PostgreSQL are our core stack. But we're pragmatic — if your project needs Vue, Rails, or Go, we have senior engineers for those too. We pick the right tool, not the trendy one.",
  },
  {
    q: "Do you sign NDAs?",
    a: "Yes, always. We sign your NDA before the first call if you'd like. We also have our own mutual NDA template we can provide. Confidentiality is non-negotiable.",
  },
];

function FAQItem({ q, a, index, isOpen, toggle }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 15 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.1 + index * 0.05 }}
      className="border border-dark-border/15 rounded-xl overflow-hidden bg-dark-card"
    >
      <button
        onClick={toggle}
        className="w-full flex items-center justify-between p-5 md:p-6 text-left hover:bg-dark-elevated/30 transition-colors"
      >
        <span className="font-grotesk text-sm md:text-base font-bold text-text-primary pr-4">
          {q}
        </span>
        <motion.svg
          animate={{ rotate: isOpen ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 text-accent flex-shrink-0"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4v16m8-8H4"
          />
        </motion.svg>
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-5 md:px-6 pb-5 md:pb-6 pt-0">
              <p className="text-sm text-text-muted leading-relaxed">{a}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function ProcessFAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section
      ref={ref}
      className="py-28 bg-dark-card border-y border-dark-border/20"
    >
      <div className="mx-auto max-w-[800px] px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 25 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <span className="font-mono text-[11px] tracking-[0.25em] text-text-dim uppercase">
            Questions
          </span>
          <h2 className="mt-4 font-display text-3xl sm:text-4xl font-extrabold tracking-tight">
            Everything you'd
            <span className="text-accent"> ask in a call</span>
          </h2>
          <p className="mt-4 max-w-md mx-auto text-text-muted leading-relaxed">
            Straight answers to the questions every founder, CTO, and product
            lead asks us.
          </p>
        </motion.div>

        {inView && (
          <div className="space-y-3">
            {faqs.map((faq, i) => (
              <FAQItem
                key={i}
                q={faq.q}
                a={faq.a}
                index={i}
                isOpen={openIndex === i}
                toggle={() => setOpenIndex(openIndex === i ? null : i)}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
