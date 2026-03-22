import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

import { navLinks as links } from "../../data/navigation";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Handle scroll state
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [open]);

  // Framer Motion Variants for Mobile Menu
  const menuVars = {
    initial: { opacity: 0, y: -20 },
    animate: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: [0.12, 0, 0.39, 0] },
    },
    exit: {
      opacity: 0,
      y: -20,
      transition: { duration: 0.3, ease: [0.12, 0, 0.39, 1] },
    },
  };

  const linkVars = {
    initial: { y: "30vh", opacity: 0 },
    open: {
      y: 0,
      opacity: 1,
      transition: { duration: 0.5, ease: [0.33, 1, 0.68, 1] },
    },
    exit: { y: 20, opacity: 0, transition: { duration: 0.2 } },
  };

  const containerVars = {
    initial: { transition: { staggerChildren: 0.09, staggerDirection: -1 } },
    open: {
      transition: {
        delayChildren: 0.2,
        staggerChildren: 0.09,
        staggerDirection: 1,
      },
    },
  };

  return (
    <>
      <motion.header
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="fixed top-0 inset-x-0 z-[100] flex justify-center px-4 sm:px-6 pt-4 sm:pt-6 pointer-events-none"
      >
        {/* Floating Pill Container */}
        <div
          className={`pointer-events-auto w-full max-w-6xl transition-all duration-500 ease-in-out ${
            scrolled
              ? "bg-zinc-950/80 backdrop-blur-xl border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)] rounded-full px-4 sm:px-6 py-3"
              : "bg-transparent border-transparent px-2 py-2"
          }`}
        >
          <div className="flex items-center justify-between w-full">
            {/* Logo Section */}
            <a href="#" className="flex items-center gap-3 group">
              <div className="relative flex items-center justify-center w-10 h-10 bg-zinc-900 rounded-full border border-white/5 transition-transform duration-500 group-hover:scale-105 group-hover:border-cyan-500/50">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 64 64"
                  fill="none"
                  className="text-cyan-400 transition-all duration-500 group-hover:drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]"
                >
                  <path
                    d="M14 26L6 8L24 20"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <path
                    d="M50 26L58 8L40 20"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                  <circle
                    cx="32"
                    cy="36"
                    r="20"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                  <circle cx="24" cy="34" r="3" fill="currentColor" />
                  <circle cx="40" cy="34" r="3" fill="currentColor" />
                  <ellipse
                    cx="32"
                    cy="42"
                    rx="2.5"
                    ry="2"
                    fill="currentColor"
                  />
                </svg>
              </div>
              <span className="font-sans text-sm font-semibold tracking-widest uppercase text-text-primary">
                Raccoon
                <span className="hidden sm:inline text-text-secondary">
                  {" "}
                  Studio
                </span>
              </span>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {links.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="relative px-4 py-2 text-[11px] font-semibold tracking-[0.2em] uppercase transition-colors duration-300 rounded-full text-zinc-400 hover:text-zinc-50 hover:bg-white/5"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            {/* Desktop CTA & Mobile Toggle */}
            <div className="flex items-center gap-4">
              {/* --- NEW PREMIUM BUTTON --- */}
              <a
                href="#contact"
                className="relative hidden sm:inline-flex group"
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 transition-opacity duration-500 rounded-full opacity-0 bg-gradient-to-r from-cyan-400 to-blue-500 blur-md group-hover:opacity-40"></div>

                {/* Button Body */}
                <div className="relative flex items-center gap-2.5 px-6 py-2.5 bg-zinc-900 border border-white/10 rounded-full group-hover:border-white/20 transition-colors duration-300">
                  <span className="font-sans text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-100 mt-[1px]">
                    Book a Call
                  </span>
                  <svg
                    className="w-3.5 h-3.5 text-cyan-400 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2.5"
                  >
                    <path
                      d="M7 17L17 7M17 7H7M17 7V17"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </a>

              {/* Hamburger Button */}
              <button
                onClick={() => setOpen(!open)}
                className="relative z-50 flex flex-col justify-center items-center w-10 h-10 gap-1.5 lg:hidden rounded-full hover:bg-white/5 transition-colors"
                aria-label="Toggle Menu"
              >
                <span
                  className={`h-[1.5px] w-4 bg-text-primary transition-all duration-300 ${open ? "rotate-45 translate-y-[7.5px]" : ""}`}
                />
                <span
                  className={`h-[1.5px] w-4 bg-text-primary transition-all duration-300 ${open ? "opacity-0" : ""}`}
                />
                <span
                  className={`h-[1.5px] w-4 bg-text-primary transition-all duration-300 ${open ? "-rotate-45 -translate-y-[7.5px]" : ""}`}
                />
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Full-Screen Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            variants={menuVars}
            initial="initial"
            animate="animate"
            exit="exit"
            className="fixed inset-0 z-[90] flex flex-col justify-center px-8 bg-zinc-950/95 backdrop-blur-3xl lg:hidden"
          >
            {/* Menu Links */}
            <motion.nav
              variants={containerVars}
              initial="initial"
              animate="open"
              exit="initial"
              className="flex flex-col gap-6"
            >
              {links.map((link, i) => (
                <div key={link.label} className="overflow-hidden">
                  <motion.a
                    variants={linkVars}
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="flex items-end gap-4 group"
                  >
                    <span className="text-sm font-mono text-cyan-400/50 mb-1.5">
                      0{i + 1}
                    </span>
                    <span className="text-5xl font-light tracking-tight text-zinc-300 group-hover:text-cyan-400 transition-colors duration-300">
                      {link.label}
                    </span>
                  </motion.a>
                </div>
              ))}
            </motion.nav>

            {/* Mobile Footer Area */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="absolute bottom-10 inset-x-8 flex items-center justify-between border-t border-white/10 pt-6"
            >
              <a
                href="mailto:hello@raccoonstudio.dev"
                className="text-xs font-mono text-zinc-500 hover:text-zinc-300 transition-colors tracking-widest"
              >
                hello@raccoonstudio.dev
              </a>
              <div className="flex gap-4 text-xs font-medium tracking-widest text-zinc-500 uppercase">
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  X
                </a>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  IN
                </a>
                <a href="#" className="hover:text-cyan-400 transition-colors">
                  IG
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
