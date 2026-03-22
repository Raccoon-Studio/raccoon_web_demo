import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";

import { testimonials } from "../../data/testimonials";

export default function Testimonials() {
  const [page, setPage] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const itemsPerPage = 4;
  const totalPages = Math.ceil(testimonials.length / itemsPerPage);

  return (
    <section
      ref={ref}
      className="relative py-32 bg-dark-surface overflow-hidden"
    >
      <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          className="text-center mb-16"
        >
          <span className="font-mono text-[12px] tracking-[0.3em] uppercase text-text-muted">
            ✦ Client Voices ✦
          </span>
        </motion.div>

        {/* Testimonial Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.7 }}
              className="group relative bg-dark-card border border-dark-border/30 rounded-2xl p-7 hover:border-dark-border-light/50 transition-all duration-500"
            >
              {/* Quote marks */}
              <div className="mb-6">
                <svg
                  className="w-8 h-8 text-accent/30"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M4.583 17.321C3.553 16.227 3 15 3 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179zm10 0C13.553 16.227 13 15 13 13.011c0-3.5 2.457-6.637 6.03-8.188l.893 1.378c-3.335 1.804-3.987 4.145-4.247 5.621.537-.278 1.24-.375 1.929-.311 1.804.167 3.226 1.648 3.226 3.489a3.5 3.5 0 01-3.5 3.5c-1.073 0-2.099-.49-2.748-1.179z" />
                </svg>
              </div>

              {/* Quote text */}
              <p className="text-[15px] leading-relaxed text-text-secondary mb-8">
                "{testimonial.quote}"
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 mt-auto">
                <div className="w-10 h-10 rounded-full bg-dark-elevated border border-dark-border flex items-center justify-center">
                  <span className="font-mono text-xs font-bold text-accent">
                    {testimonial.initials}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-semibold text-text-primary font-grotesk">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-text-muted">{testimonial.role}</p>
                </div>
              </div>

              {/* Hover glow */}
              <div className="absolute -inset-px rounded-2xl bg-gradient-to-b from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10" />
            </motion.div>
          ))}
        </div>

        {/* Navigation */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8 }}
          className="flex items-center justify-between mt-12"
        >
          <div className="flex gap-2">
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => setPage(i)}
                className={`h-1 rounded-full transition-all duration-300 ${
                  i === page
                    ? "w-8 bg-text-primary"
                    : "w-4 bg-dark-border-light"
                }`}
              />
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              className="w-10 h-10 rounded-full border border-dark-border-light flex items-center justify-center text-text-muted hover:text-text-primary hover:border-accent/50 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              className="w-10 h-10 rounded-full border border-dark-border-light flex items-center justify-center text-text-muted hover:text-text-primary hover:border-accent/50 transition-colors"
            >
              <svg
                className="w-4 h-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
