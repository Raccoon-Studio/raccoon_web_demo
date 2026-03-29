import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { testimonials } from "../../data/contact";
import { stagger, fadeUp } from "../animation/contactAnimation";
import TestimonialCard from "../ui/card/contact/TestimonialCard";

export default function TestimonialsSection() {
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
        <motion.div variants={fadeUp} className="max-w-xl mb-12 md:mb-16">
          <span className="inline-block font-mono text-[10px] text-accent/60 uppercase tracking-[0.2em] mb-3">
            Client Love
          </span>
          <h2 className="font-display text-3xl md:text-4xl font-bold text-text-primary mb-4">
            Don't take our word for it —{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-cyan">
              hear from our clients
            </span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-5">
          {testimonials.map((t) => (
            <motion.div key={t.author} variants={fadeUp}>
              <TestimonialCard testimonial={t} />
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
