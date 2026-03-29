import { useRef, useState, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { Link } from "react-router-dom";
import {
  Instagram,
  Linkedin,
  Twitter,
  Dribbble,
  Github,
  Facebook,
  Youtube,
  Globe,
  Twitch,
  MessageCircle,
} from "lucide-react";

import { footerNav, legalLinks, socials } from "../../data/navigation";

/* ── Social icon map ── */
const socialIconMap = {
  Instagram,
  LinkedIn: Linkedin,
  "X / Twitter": Twitter,
  Twitter,
  Dribbble,
  GitHub: Github,
  Facebook,
  YouTube: Youtube,
  Twitch,
  Discord: MessageCircle,
};
const getSocialIcon = (label) => socialIconMap[label] || Globe;

/* ── Magnetic wrapper ── */
function Magnetic({ children, strength = 40 }) {
  const ref = useRef(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 20 });
  const sy = useSpring(y, { stiffness: 250, damping: 20 });

  return (
    <motion.div
      ref={ref}
      style={{ x: sx, y: sy }}
      onMouseMove={(e) => {
        const r = ref.current.getBoundingClientRect();
        x.set((e.clientX - r.left - r.width / 2) / (r.width / strength));
        y.set((e.clientY - r.top - r.height / 2) / (r.height / strength));
      }}
      onMouseLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}

/* ─────────────────────────────────────────────
   Color wave — framer-motion driven, NOT CSS.
   Inline styles = highest specificity = always visible.
   ───────────────────────────────────────────── */
const WAVE_COLORS = [
  "#10b981", // emerald
  "#0ea5e9", // sky
  "#06b6d4", // cyan
  "#14b8a6", // teal
  "#10b981", // emerald
  "#06b6d4", // cyan
  "#10b981", // emerald
];

function AnimatedLetter({ char, index, activation = 0, colorOffset = 0 }) {
  if (char === " ") return <span className="inline-block w-[0.3em]" />;

  const i = index + colorOffset;
  const a = activation;
  const delay = i * 0.25;

  return (
    <motion.span
      className="inline-block select-none cursor-default"
      animate={{
        y: [0, -6, 0, -3, 0],
        color: WAVE_COLORS,
      }}
      transition={{
        y: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
        color: {
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay,
        },
      }}
      style={{
        display: "inline-block",
        color: "#10b981",
        transform:
          a > 0 ? `translateY(${-20 * a}px) scale(${1 + 0.15 * a})` : undefined,
        filter:
          a > 0.1
            ? `brightness(${1 + 0.6 * a}) drop-shadow(0 0 ${12 + 20 * a}px currentColor)`
            : `drop-shadow(0 0 8px rgba(16,185,129,0.3))`,
        transition:
          "transform 0.3s cubic-bezier(0.22,1,0.36,1), filter 0.3s ease",
        willChange: "transform, color, filter",
      }}
    >
      {char}
    </motion.span>
  );
}

/* ─────────────────────────────────────────────
   Brand line — proximity hover boost
   ───────────────────────────────────────────── */
function BrandLine({ text, lineIndex = 0, colorOffset = 0 }) {
  const containerRef = useRef(null);
  const [mouseX, setMouseX] = useState(-1);
  const [hovering, setHovering] = useState(false);
  const letters = text.split("");
  const RADIUS = 3.5;

  const onMove = useCallback((e) => {
    const r = containerRef.current?.getBoundingClientRect();
    if (!r) return;
    setMouseX((e.clientX - r.left) / r.width);
  }, []);

  return (
    <div
      ref={containerRef}
      onMouseMove={onMove}
      onMouseEnter={() => setHovering(true)}
      onMouseLeave={() => {
        setHovering(false);
        setMouseX(-1);
      }}
      className="cursor-default"
    >
      <motion.div
        initial={{ opacity: 0, y: 60 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{
          duration: 0.9,
          delay: lineIndex * 0.2,
          ease: [0.22, 1, 0.36, 1],
        }}
        className="flex justify-center"
        style={{
          fontSize: "clamp(3rem, 12vw, 10rem)",
          fontWeight: 900,
          letterSpacing: "-0.04em",
          lineHeight: 0.9,
          textTransform: "uppercase",
        }}
      >
        {letters.map((char, i) => {
          const pos = letters.length > 1 ? i / (letters.length - 1) : 0.5;
          const dist =
            mouseX >= 0 ? Math.abs(pos - mouseX) * letters.length : 999;
          const activation = hovering ? Math.max(0, 1 - dist / RADIUS) : 0;

          return (
            <AnimatedLetter
              key={i}
              char={char}
              index={i}
              activation={activation}
              colorOffset={colorOffset}
            />
          );
        })}
      </motion.div>
    </div>
  );
}

/* ══════════════════════════════════════════════
   FOOTER
   ══════════════════════════════════════════════ */
export default function Footer() {
  const ref = useRef(null);
  const brandRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });

  const bgY = useTransform(scrollYProgress, [0, 1], ["50px", "0px"]);
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  const [currentTime, setCurrentTime] = useState("");
  const [spotPos, setSpotPos] = useState({ x: 50, y: 50 });

  useEffect(() => {
    const tick = () =>
      setCurrentTime(
        new Date().toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          timeZoneName: "short",
          timeZone: "America/Los_Angeles",
        }),
      );
    tick();
    const id = setInterval(tick, 60_000);
    return () => clearInterval(id);
  }, []);

  const handleBrandMouse = useCallback((e) => {
    const r = brandRef.current?.getBoundingClientRect();
    if (!r) return;
    setSpotPos({
      x: ((e.clientX - r.left) / r.width) * 100,
      y: ((e.clientY - r.top) / r.height) * 100,
    });
  }, []);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const stagger = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.08, delayChildren: 0.1 } },
  };
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] },
    },
  };
  const slideIn = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <footer ref={ref} className="relative bg-dark overflow-hidden">
      {/* ── Ambient orbs ── */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(16,185,129,0.03) 0%,transparent 70%)",
          y: bgY,
          opacity: bgOpacity,
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle,rgba(6,182,212,0.03) 0%,transparent 70%)",
          y: bgY,
          opacity: bgOpacity,
        }}
      />

      {/* ═══ CTA Section ═══ */}
      <section className="border-t border-dark-border/20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            className="py-24 md:py-36 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-16"
          >
            <div className="max-w-2xl">
              <motion.p
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="font-body text-sm text-accent uppercase tracking-[0.3em] mb-6 flex items-center gap-4"
              >
                <motion.span
                  className="inline-block w-10 h-px bg-gradient-to-r from-accent to-cyan"
                  initial={{ scaleX: 0 }}
                  whileInView={{ scaleX: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  style={{ transformOrigin: "left" }}
                />
                Got a project?
              </motion.p>

              <motion.h2
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.15,
                  ease: [0.22, 1, 0.36, 1],
                }}
                viewport={{ once: true }}
                className="font-display text-5xl md:text-6xl lg:text-8xl font-bold text-text-primary leading-[1] tracking-tight"
              >
                Let's create
                <br />
                <span className="relative inline-block">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent via-cyan to-accent bg-[length:200%_auto] animate-[gradient-shift_3s_ease-in-out_infinite]">
                    something great.
                  </span>
                  <motion.span
                    className="absolute -bottom-2 left-0 h-[3px] bg-gradient-to-r from-accent via-cyan to-accent rounded-full"
                    initial={{ width: "0%" }}
                    whileInView={{ width: "100%" }}
                    viewport={{ once: true }}
                    transition={{ duration: 1, delay: 0.8, ease: "easeOut" }}
                  />
                </span>
              </motion.h2>

              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="font-body text-text-muted text-base md:text-lg mt-8 max-w-md leading-relaxed"
              >
                We're always excited to collaborate on ambitious projects. Let's
                build something remarkable together.
              </motion.p>
            </div>

            {/* CTA Circle */}
            <Magnetic strength={30}>
              <Link
                to="/#contact"
                className="group relative w-40 h-40 md:w-48 md:h-48 flex items-center justify-center shrink-0 self-center lg:self-auto"
              >
                <motion.div
                  initial={{ opacity: 0, scale: 0.6, rotate: -90 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  transition={{
                    duration: 0.8,
                    delay: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  viewport={{ once: true }}
                  className="w-full h-full flex items-center justify-center"
                >
                  <motion.div
                    className="absolute inset-0 rounded-full border border-dark-border/20 group-hover:border-accent/30 transition-colors duration-700"
                    whileHover={{ scale: 1.05 }}
                  />
                  <svg
                    className="absolute inset-0 w-full h-full"
                    viewBox="0 0 192 192"
                  >
                    <motion.circle
                      cx="96"
                      cy="96"
                      r="90"
                      fill="none"
                      stroke="currentColor"
                      className="text-dark-border/10 group-hover:text-accent/20 transition-colors duration-700"
                      strokeWidth="0.5"
                      strokeDasharray="4 6"
                      animate={{ rotate: -360 }}
                      transition={{
                        duration: 30,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                      style={{ transformOrigin: "center" }}
                    />
                  </svg>
                  <motion.svg
                    viewBox="0 0 192 192"
                    className="absolute inset-0 w-full h-full"
                    animate={{ rotate: 360 }}
                    transition={{
                      duration: 12,
                      repeat: Infinity,
                      ease: "linear",
                    }}
                  >
                    <defs>
                      <path
                        id="footerCirclePath"
                        d="M96,96 m-72,0 a72,72 0 1,1 144,0 a72,72 0 1,1 -144,0"
                      />
                    </defs>
                    <text className="fill-text-dim text-[11px] uppercase tracking-[0.4em] font-body">
                      <textPath href="#footerCirclePath">
                        Get in touch • Start a project •&nbsp;
                      </textPath>
                    </text>
                  </motion.svg>
                  <motion.div
                    className="relative z-10 w-12 h-12 rounded-full bg-accent/10 group-hover:bg-accent/20 flex items-center justify-center transition-colors duration-500"
                    whileHover={{ scale: 1.15 }}
                    whileTap={{ scale: 0.9 }}
                  >
                    <svg
                      className="w-5 h-5 text-accent group-hover:rotate-45 transition-transform duration-500"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path d="M7 17L17 7M17 7H7M17 7v10" />
                    </svg>
                  </motion.div>
                </motion.div>
              </Link>
            </Magnetic>
          </motion.div>
        </div>
      </section>

      {/* ═══ Info Grid ═══ */}
      <section className="border-t border-dark-border/20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-20 md:py-24">
          <motion.div
            variants={stagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-50px" }}
            className="grid grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-6"
          >
            {/* Brand — 4 cols */}
            <motion.div variants={fadeUp} className="col-span-2 lg:col-span-4">
              <Link
                to="/"
                className="flex items-center gap-3 mb-6 group cursor-pointer"
              >
                <motion.div
                  whileHover={{ rotate: 15, scale: 1.1 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <svg
                    width="28"
                    height="28"
                    viewBox="0 0 64 64"
                    fill="none"
                    className="text-accent"
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
                </motion.div>
                <span className="font-grotesk text-xs font-semibold tracking-[0.2em] uppercase text-text-primary group-hover:text-accent transition-colors duration-300">
                  Raccoon Studio
                </span>
              </Link>

              <p className="font-body text-sm text-text-muted leading-[1.8] mb-8 max-w-[300px]">
                Crafting digital experiences that push boundaries and deliver
                measurable results. We bring visions to life through code,
                design, and strategy.
              </p>

              <motion.div
                className="inline-flex items-center gap-3 px-4 py-2.5 rounded-full border border-dark-border/20 bg-dark-surface/30 backdrop-blur-sm"
                whileHover={{ borderColor: "rgba(16,185,129,0.3)" }}
              >
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald" />
                </span>
                <span className="text-[11px] text-text-dim font-body tracking-wide">
                  Available for work
                </span>
                <span className="w-px h-3 bg-dark-border/30" />
                <span className="text-[11px] text-text-dim font-mono">
                  {currentTime}
                </span>
              </motion.div>
            </motion.div>

            {/* Navigation — 2 cols */}
            <motion.div variants={fadeUp} className="col-span-1 lg:col-span-2">
              <h4 className="font-grotesk text-[11px] uppercase tracking-[0.25em] text-accent/70 mb-7 flex items-center gap-2">
                <span className="w-4 h-px bg-accent/40" />
                Navigation
              </h4>
              <ul className="space-y-4">
                {footerNav.map((link) => (
                  <motion.li key={link.label} variants={slideIn}>
                    <Link
                      to={link.href}
                      className="group inline-flex items-center gap-3 font-body text-sm text-text-muted hover:text-text-primary transition-all duration-300"
                    >
                      <span className="font-mono text-[10px] text-text-dim/50 group-hover:text-accent transition-colors duration-300">
                        {link.num}
                      </span>
                      <span className="relative overflow-hidden">
                        <span className="block group-hover:translate-x-1.5 transition-transform duration-300">
                          {link.label}
                        </span>
                        <span className="absolute bottom-0 left-0 w-0 h-px bg-accent group-hover:w-full transition-all duration-500" />
                      </span>
                    </Link>
                  </motion.li>
                ))}
              </ul>
            </motion.div>

            {/* Connect — 3 cols */}
            <motion.div variants={fadeUp} className="col-span-1 lg:col-span-3">
              <h4 className="font-grotesk text-[11px] uppercase tracking-[0.25em] text-accent/70 mb-7 flex items-center gap-2">
                <span className="w-4 h-px bg-accent/40" />
                Connect
              </h4>
              <ul className="space-y-1">
                {socials.map((social) => {
                  const Icon = getSocialIcon(social.label);
                  return (
                    <motion.li key={social.label} variants={slideIn}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center gap-3 font-body text-sm text-text-muted hover:text-text-primary py-2.5 px-2.5 -mx-2.5 rounded-lg hover:bg-white/[0.03] transition-all duration-300"
                      >
                        <span className="inline-flex items-center justify-center w-8 h-8 rounded-lg border border-dark-border/20 bg-dark-surface/30 group-hover:border-accent/40 group-hover:bg-accent/10 transition-all duration-300 shrink-0">
                          <Icon
                            size={14}
                            className="text-text-dim group-hover:text-accent transition-colors duration-300"
                            strokeWidth={1.8}
                          />
                        </span>
                        <span className="group-hover:translate-x-1 transition-transform duration-300">
                          {social.label}
                        </span>
                        <svg
                          className="w-3 h-3 ml-auto opacity-0 -translate-x-2 group-hover:opacity-40 group-hover:translate-x-0 transition-all duration-300"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="2"
                        >
                          <path d="M7 17L17 7M17 7H10M17 7v7" />
                        </svg>
                      </a>
                    </motion.li>
                  );
                })}
              </ul>
            </motion.div>

            {/* Contact — 3 cols */}
            <motion.div variants={fadeUp} className="col-span-2 lg:col-span-3">
              <h4 className="font-grotesk text-[11px] uppercase tracking-[0.25em] text-accent/70 mb-7 flex items-center gap-2">
                <span className="w-4 h-px bg-accent/40" />
                Get in Touch
              </h4>
              <div className="space-y-5">
                <motion.a
                  href="mailto:hello@raccoonstudio.com"
                  className="group block font-body text-sm text-text-muted hover:text-accent transition-colors duration-300 py-3 px-4 rounded-lg border border-transparent hover:border-accent/20 hover:bg-accent/5"
                  whileHover={{ x: 4 }}
                >
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-text-dim mb-1.5 font-grotesk">
                    Email
                  </span>
                  hello@raccoonstudio.com
                </motion.a>
                <div className="font-body text-sm text-text-dim leading-relaxed py-3 px-4">
                  <span className="block text-[10px] uppercase tracking-[0.2em] text-text-dim mb-1.5 font-grotesk">
                    Location
                  </span>
                  <p className="text-text-muted">123 Creative Avenue</p>
                  <p className="text-text-muted">San Francisco, CA 94102</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ═══ Interactive Brand Name ═══ */}
      <section
        ref={brandRef}
        onMouseMove={handleBrandMouse}
        className="relative border-t border-dark-border/10 overflow-hidden"
      >
        {/* Cursor spotlight */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: `radial-gradient(600px circle at ${spotPos.x}% ${spotPos.y}%, rgba(16,185,129,0.06), transparent 60%)`,
            transition: "background 0.35s ease",
          }}
        />

        {/* Center glow */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <div
            className="w-[70%] h-[50%] rounded-full blur-[120px]"
            style={{ background: "rgba(16,185,129,0.03)" }}
          />
        </div>

        {/* Corner marks */}
        <div className="absolute top-6 left-6 w-5 h-5 border-l border-t border-accent/10" />
        <div className="absolute top-6 right-6 w-5 h-5 border-r border-t border-accent/10" />
        <div className="absolute bottom-6 left-6 w-5 h-5 border-l border-b border-accent/10" />
        <div className="absolute bottom-6 right-6 w-5 h-5 border-r border-b border-accent/10" />

        <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10 py-20 md:py-28">
          <div className="flex flex-col items-center gap-2">
            <BrandLine text="RACCOON" lineIndex={0} colorOffset={0} />
            <BrandLine text="STUDIO" lineIndex={1} colorOffset={7} />

            {/* Tagline */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{
                duration: 0.7,
                delay: 0.7,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="mt-10 flex items-center gap-5"
            >
              <motion.span
                className="h-px w-12 md:w-20 bg-gradient-to-r from-transparent to-accent/30"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.9 }}
                style={{ transformOrigin: "left" }}
              />
              <span className="font-body text-[10px] md:text-[11px] uppercase tracking-[0.45em] text-text-dim/50">
                Design&ensp;·&ensp;Develop&ensp;·&ensp;Deploy
              </span>
              <motion.span
                className="h-px w-12 md:w-20 bg-gradient-to-l from-transparent to-accent/30"
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.9 }}
                style={{ transformOrigin: "right" }}
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* ═══ Bottom Bar ═══ */}
      <div className="border-t border-dark-border/20">
        <div className="mx-auto max-w-[1400px] px-6 lg:px-10 py-5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="font-body text-text-dim order-2 sm:order-1 flex items-center gap-2"
          >
            <span>© {new Date().getFullYear()}</span>
            <span className="w-px h-3 bg-dark-border/30" />
            <span>Raccoon Studio. All rights reserved.</span>
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="flex items-center gap-8 order-1 sm:order-2"
          >
            {legalLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="relative font-body text-xs text-text-dim hover:text-text-muted transition-colors duration-300 group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-text-muted group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </motion.div>

          <Magnetic strength={20}>
            <motion.button
              onClick={scrollToTop}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="group flex items-center gap-2.5 font-body text-xs text-text-dim hover:text-accent transition-colors duration-300 order-3 px-3 py-2 rounded-full border border-transparent hover:border-accent/20 hover:bg-accent/5"
              whileHover={{ y: -2 }}
            >
              Back to top
              <motion.svg
                className="w-3.5 h-3.5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
                animate={{ y: [0, -3, 0] }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <path d="M5 15l7-7 7 7" />
              </motion.svg>
            </motion.button>
          </Magnetic>
        </div>
      </div>

      {/* ═══ Only gradient-shift needed now ═══ */}
      <style>{`
        @keyframes gradient-shift {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
      `}</style>
    </footer>
  );
}
