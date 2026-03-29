import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { faqs } from "../../data/contact";
import { stagger, fadeUp, ease } from "../animation/contactAnimation";
import FAQItem from "../ui/card/contact/FAQItem";

export default function FAQSection() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const [activeCategory, setActiveCategory] = useState("Process");
  const [openIndex, setOpenIndex] = useState(null);

  const activeFaqs =
    faqs.find((f) => f.category === activeCategory)?.items || [];

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
        {/* Header + tabs */}
        <motion.div
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12"
        >
          <div className="max-w-xl">
            <span className="inline-block font-mono text-[10px] text-accent/60 uppercase tracking-[0.2em] mb-3">
              FAQ
            </span>
            <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
              Frequently asked{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
                questions
              </span>
            </h2>
            <p className="font-body text-base text-text-muted leading-relaxed">
              Everything you need to know before getting started.
            </p>
          </div>

          <div className="flex flex-wrap gap-2">
            {faqs.map((cat) => (
              <button
                key={cat.category}
                onClick={() => {
                  setActiveCategory(cat.category);
                  setOpenIndex(null);
                }}
                className={`px-4 py-2 rounded-xl text-[12px] font-body font-medium border transition-all duration-300 ${
                  activeCategory === cat.category
                    ? "bg-accent/[0.08] border-accent/30 text-accent"
                    : "bg-white/[0.02] border-dark-border/15 text-text-dim/90 hover:text-text-muted hover:border-dark-border/30"
                }`}
              >
                {cat.category}
              </button>
            ))}
          </div>
        </motion.div>

        {/* Items */}
        <motion.div variants={fadeUp} className="max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.25, ease }}
              className="space-y-2.5"
            >
              {activeFaqs.map((faq, i) => (
                <FAQItem
                  key={faq.q}
                  faq={faq}
                  isOpen={openIndex === i}
                  onToggle={() => setOpenIndex((p) => (p === i ? null : i))}
                />
              ))}
            </motion.div>
          </AnimatePresence>
        </motion.div>

        {/* CTA */}
        <motion.div
          variants={fadeUp}
          className="mt-10 p-6 rounded-2xl border border-dark-border/12 bg-white/[0.01] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 max-w-3xl"
        >
          <div>
            <p className="font-body text-[14px] text-text-primary/80 font-medium">
              Still have questions?
            </p>
            <p className="font-body text-[13px] text-text-dim/80">
              Book a free 30-minute consultation — no strings attached.
            </p>
          </div>
          <a
            href="https://calendly.com/raccoonstudio"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-accent hover:bg-accent/90 font-grotesk text-[12px] font-semibold uppercase tracking-[0.1em] text-dark transition-colors duration-300 flex-shrink-0"
          >
            Book a Call
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M7 17L17 7M17 7H7M17 7V17" />
            </svg>
          </a>
        </motion.div>
      </motion.div>
    </div>
  );
}
