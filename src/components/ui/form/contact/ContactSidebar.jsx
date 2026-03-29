import { motion } from "framer-motion";
import {
  contactMethods,
  teamMembers,
  certifications,
  socialLinks,
} from "../../../../data/contact";
import { stagger, fadeUp } from "../../../animation/contactAnimation";
import ContactCard from "./ContactCard";
import BookCallButton from "./BookCallButton";

export default function ContactSidebar({ isInView }) {
  return (
    <motion.aside
      className="lg:col-span-5 xl:col-span-4"
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={stagger}
    >
      <div className="lg:sticky lg:top-28 space-y-8">
        {/* Contact Methods */}
        <div>
          <motion.p
            variants={fadeUp}
            className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.15em] text-text-dim/90 mb-4"
          >
            Contact Info
          </motion.p>
          <div className="space-y-2.5">
            {contactMethods.map((method, i) =>
              method.isBooking ? (
                /* Render the booking card as a button instead of <a> */
                <motion.div
                  key={method.label}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.15 + i * 0.08 }}
                >
                  <BookCallButton
                    variant="secondary"
                    size="default"
                    showIcon={false}
                    className="group w-full justify-start p-4 rounded-2xl border-dark-border/15 bg-white/[0.02] hover:bg-white/[0.04] hover:border-dark-border/30 normal-case tracking-normal font-body transition-all duration-300"
                  >
                    <span className="flex items-start gap-4 w-full">
                      <span className="flex-shrink-0 w-11 h-11 rounded-xl bg-gradient-to-br from-white/[0.05] to-white/[0.02] border border-dark-border/15 flex items-center justify-center text-text-dim">
                        {method.icon}
                      </span>
                      <span className="flex-1 min-w-0 text-left">
                        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-text-dim/90 block mb-0.5">
                          {method.label}
                        </span>
                        <span className="font-body text-sm text-text-primary block">
                          {method.value}
                        </span>
                        <span className="font-body text-[11px] text-text-dim/70 block mt-1">
                          {method.description}
                        </span>
                        <span className="flex items-center gap-1.5 mt-1.5">
                          <span className="w-1 h-1 rounded-full bg-emerald/60" />
                          <span className="font-mono text-[9px] text-emerald/60 uppercase tracking-wider">
                            {method.responseTime}
                          </span>
                        </span>
                      </span>
                    </span>
                  </BookCallButton>
                </motion.div>
              ) : (
                <ContactCard key={method.label} method={method} index={i} />
              ),
            )}
          </div>
        </div>

        {/* Availability */}
        <motion.div
          variants={fadeUp}
          className="relative p-5 rounded-2xl border border-dark-border/15 bg-gradient-to-br from-white/[0.02] to-transparent overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-28 h-28 bg-emerald/[0.04] rounded-full blur-2xl -translate-y-1/3 translate-x-1/3" />
          <div className="relative space-y-3">
            <div className="flex items-center gap-2">
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inset-0 rounded-full bg-emerald/40 animate-ping" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald shadow-[0_0_6px_rgba(16,185,129,0.5)]" />
              </span>
              <span className="font-grotesk text-[11px] uppercase tracking-[0.15em] text-emerald font-semibold">
                Available for projects
              </span>
            </div>
            <p className="font-body text-[13px] text-text-muted leading-relaxed">
              Currently accepting new projects for{" "}
              <strong className="text-text-primary font-medium">Q3 2025</strong>
              . Typical response within{" "}
              <strong className="text-text-primary font-medium">
                24 hours
              </strong>
              .
            </p>
            <div className="flex items-center gap-1.5 pt-1">
              <svg
                className="w-3.5 h-3.5 text-text-dim/70"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
              <span className="font-mono text-[10px] text-text-dim/80 tracking-wide">
                Mon – Fri · 9AM – 6PM PST
              </span>
            </div>
          </div>
        </motion.div>

        {/* Team — with BookCallButton instead of calendly */}
        <motion.div variants={fadeUp}>
          <p className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.15em] text-text-dim/90 mb-4">
            Your Point of Contact
          </p>
          <div className="space-y-3">
            {teamMembers.slice(0, 3).map((member) => (
              <div
                key={member.name}
                className="flex items-center gap-3 p-3 rounded-xl border border-dark-border/10 bg-white/[0.015] hover:bg-white/[0.025] transition-colors duration-300"
              >
                <img
                  src={member.avatar}
                  alt={member.name}
                  className="w-10 h-10 rounded-xl border border-dark-border/15 object-cover"
                  loading="lazy"
                />
                <div className="flex-1 min-w-0">
                  <p className="font-body text-[13px] font-medium text-text-primary truncate">
                    {member.name}
                  </p>
                  <p className="font-mono text-[9px] text-text-dim/80 uppercase tracking-wider">
                    {member.role}
                  </p>
                </div>
                {member.bookable && (
                  <BookCallButton
                    variant="ghost"
                    size="sm"
                    className="w-7 h-7 p-0 rounded-lg bg-white/[0.04] border border-dark-border/10 flex items-center justify-center"
                  >
                    <svg
                      className="w-3.5 h-3.5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" />
                      <path d="M16 2v4M8 2v4M3 10h18" />
                    </svg>
                  </BookCallButton>
                )}
              </div>
            ))}
          </div>
        </motion.div>

        {/* Certifications */}
        <motion.div variants={fadeUp}>
          <p className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.15em] text-text-dim/90 mb-3">
            Certifications
          </p>
          <div className="grid grid-cols-2 gap-2">
            {certifications.map((cert) => (
              <div
                key={cert.name}
                className="flex items-center gap-2 p-2.5 rounded-xl border border-dark-border/10 bg-white/[0.015]"
              >
                <span className="text-sm">{cert.icon}</span>
                <span className="font-mono text-[9px] text-text-dim/80 uppercase tracking-wider">
                  {cert.name}
                </span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Social */}
        <motion.div variants={fadeUp}>
          <p className="font-grotesk text-[11px] font-semibold uppercase tracking-[0.15em] text-text-dim/90 mb-4">
            Follow Us
          </p>
          <div className="grid grid-cols-3 gap-2">
            {socialLinks.slice(0, 6).map((link) => (
              <a
                key={link.name}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col items-center gap-1.5 p-3 rounded-xl border border-dark-border/10 bg-white/[0.015] hover:bg-white/[0.03] hover:border-dark-border/25 transition-all duration-300"
              >
                <span className="text-text-dim/70 group-hover:text-accent transition-colors duration-300">
                  {link.icon}
                </span>
                <span className="font-mono text-[8px] text-text-dim/70 uppercase tracking-wider">
                  {link.followers}
                </span>
              </a>
            ))}
          </div>
        </motion.div>
      </div>
    </motion.aside>
  );
}
