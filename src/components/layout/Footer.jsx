import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

import { footerNav, legalLinks, socials } from "../../data/navigation";

export default function Footer() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const marqueeX = useTransform(scrollYProgress, [0, 1], ["5%", "-20%"]);

  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const update = () =>
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
        }),
      );
    update();
    const interval = setInterval(update, 60_000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.1 } },
  };

  const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <footer ref={ref} className="relative bg-dark overflow-hidden">
      {/* ═══ CTA Section ═══ */}
      <section className="border-t border-dark-border/20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true, margin: "-80px" }}
            className="py-20 md:py-32 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-12"
          >
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                viewport={{ once: true }}
                className="font-body text-sm text-accent uppercase tracking-[0.25em] mb-5 flex items-center gap-3"
              >
                <span className="inline-block w-8 h-px bg-accent" />
                Got a project?
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.7,
                  delay: 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
                className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-text-primary leading-[1.05] tracking-tight"
              >
                Let's create
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan to-accent">
                  something great.
                </span>
              </motion.h2>
            </div>

            {/* Rotating circle CTA */}
            <motion.a
              href="#contact"
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              viewport={{ once: true }}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className="group relative w-36 h-36 md:w-44 md:h-44 rounded-full border border-dark-border/30 hover:border-accent/40 flex items-center justify-center transition-colors duration-500 shrink-0 self-center lg:self-auto"
            >
              <motion.svg
                viewBox="0 0 176 176"
                className="absolute inset-0 w-full h-full"
                animate={{ rotate: 360 }}
                transition={{
                  duration: 15,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <defs>
                  <path
                    id="footerCirclePath"
                    d="M88,88 m-68,0 a68,68 0 1,1 136,0 a68,68 0 1,1 -136,0"
                  />
                </defs>
                <text className="fill-text-dim text-[11px] uppercase tracking-[0.35em] font-body">
                  <textPath href="#footerCirclePath">
                    Get in touch • Start a project •{" "}
                  </textPath>
                </text>
              </motion.svg>

              <svg
                className="w-7 h-7 text-text-primary group-hover:text-accent group-hover:rotate-45 transition-all duration-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </motion.a>
          </motion.div>
        </div>
      </section>

      {/* ═══ Info Grid ═══ */}
      <section className="border-t border-dark-border/20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-16 md:py-20">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8"
          >
            {/* Brand */}
            <motion.div variants={fadeUp} className="col-span-2 lg:col-span-1">
              <div className="flex items-center gap-2.5 mb-5 group cursor-pointer">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 64 64"
                  fill="none"
                  className="text-accent group-hover:scale-110 transition-transform duration-300"
                >
                  <path
                    d="M12 24L4 6L22 18"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <path
                    d="M52 24L60 6L42 18"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeLinecap="round"
                  />
                  <circle
                    cx="32"
                    cy="34"
                    r="18"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  />
                  <circle cx="24" cy="32" r="3" fill="currentColor" />
                  <circle cx="40" cy="32" r="3" fill="currentColor" />
                </svg>
                <span className="font-grotesk text-xs font-semibold tracking-[0.2em] uppercase text-text-primary group-hover:text-accent transition-colors duration-300">
                  Raccoon Studio
                </span>
              </div>

              <p className="font-body text-sm text-text-muted leading-relaxed mb-6 max-w-[260px]">
                Crafting digital experiences that push boundaries and deliver
                measurable results.
              </p>

              <div className="flex items-center gap-2 text-[11px] text-text-dim font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald shadow-[0_0_6px_rgba(16,185,129,0.6)] animate-pulse" />
                <span>Available for work</span>
                <span className="mx-0.5 opacity-30">·</span>
                <span>{currentTime}</span>
              </div>
            </motion.div>

            {/* Navigation */}
            <motion.div variants={fadeUp}>
              <h4 className="font-grotesk text-[11px] uppercase tracking-[0.2em] text-text-dim mb-6">
                Navigation
              </h4>
              <ul className="space-y-3.5">
                {footerNav.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      className="group inline-flex items-center gap-3 font-body text-sm text-text-muted hover:text-text-primary transition-colors duration-300"
                    >
                      <span className="font-mono text-[10px] text-text-dim group-hover:text-accent transition-colors duration-300">
                        {link.num}
                      </span>
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {link.label}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Connect */}
            <motion.div variants={fadeUp}>
              <h4 className="font-grotesk text-[11px] uppercase tracking-[0.2em] text-text-dim mb-6">
                Connect
              </h4>
              <ul className="space-y-3.5">
                {socials.map((social) => (
                  <li key={social.label}>
                    <a
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group inline-flex items-center gap-2.5 font-body text-sm text-text-muted hover:text-text-primary transition-colors duration-300"
                    >
                      <span className="inline-block w-1 h-1 rounded-full bg-dark-border group-hover:bg-accent group-hover:shadow-[0_0_8px_rgba(16,185,129,0.4)] transition-all duration-300" />
                      <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {social.label}
                      </span>
                      <svg
                        className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-50 group-hover:translate-x-0 transition-all duration-300"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path d="M7 17L17 7M17 7H10M17 7v7" />
                      </svg>
                    </a>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* Contact */}
            <motion.div variants={fadeUp}>
              <h4 className="font-grotesk text-[11px] uppercase tracking-[0.2em] text-text-dim mb-6">
                Get in Touch
              </h4>
              <div className="space-y-4">
                <a
                  href="mailto:hello@raccoonstudio.com"
                  className="block font-body text-sm text-text-muted hover:text-accent transition-colors duration-300"
                >
                  hello@raccoonstudio.com
                </a>
                <div className="font-body text-sm text-text-dim leading-relaxed">
                  <p>123 Creative Avenue</p>
                  <p>San Francisco, CA 94102</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Large Parallax Brand Text ═══ */}
      <div className="relative border-t border-dark-border/10 py-8 md:py-12 overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div className="w-[60%] h-[80%] bg-accent/[0.02] rounded-full blur-3xl" />
        </div>

        <motion.div
          style={{ x: marqueeX }}
          className="relative whitespace-nowrap flex items-center"
        >
          {[0, 1, 2].map((i) => (
            <span key={i} className="flex items-center">
              <span className="font-display text-[18vw] md:text-[13vw] font-black uppercase text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.05)] leading-none tracking-tighter select-none px-[2vw]">
                RACCOON STUDIO
              </span>
              <span className="text-accent/20 text-[4vw] md:text-[2.5vw] select-none">
                ✦
              </span>
            </span>
          ))}
        </motion.div>
      </div>

      {/* ═══ Bottom Bar ═══ */}
      <div className="border-t border-dark-border/20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="font-body text-text-dim order-2 sm:order-1">
            © {new Date().getFullYear()} Raccoon Studio. All rights reserved.
          </p>

          <div className="flex items-center gap-6 order-1 sm:order-2">
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="font-body text-text-dim hover:text-text-muted transition-colors duration-300"
              >
                {link.label}
              </a>
            ))}
          </div>

          <button
            onClick={scrollToTop}
            className="group flex items-center gap-2 font-body text-text-dim hover:text-accent transition-colors duration-300 order-3"
          >
            Back to top
            <svg
              className="w-3.5 h-3.5 group-hover:-translate-y-1 transition-transform duration-300"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path d="M5 15l7-7 7 7" />
            </svg>
          </button>
        </div>
      </div>
    </footer>
  );
}
