import { useState } from "react";
import BookingModal from "./BookingModal";

export default function BookCallButton({
  children = "Book a Call",
  variant = "primary", // "primary" | "secondary" | "ghost" | "inline"
  className = "",
  size = "default", // "default" | "sm" | "lg"
  showIcon = true,
}) {
  const [isOpen, setIsOpen] = useState(false);

  const sizes = {
    sm: "px-4 py-2 text-[11px]",
    default: "px-6 py-3 text-[12px]",
    lg: "px-8 py-3.5 text-[13px]",
  };

  const variants = {
    primary:
      "bg-accent hover:bg-accent/90 text-dark font-semibold shadow-lg shadow-accent/10 hover:shadow-accent/20",
    secondary:
      "bg-white/[0.03] hover:bg-white/[0.06] border border-dark-border/20 hover:border-dark-border/40 text-text-muted hover:text-text-primary",
    ghost: "text-accent hover:text-accent/80 hover:bg-accent/[0.04]",
    inline:
      "text-accent hover:text-accent/80 underline underline-offset-2 p-0 rounded-none",
  };

  return (
    <>
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className={`
          inline-flex items-center gap-2 rounded-xl font-grotesk uppercase tracking-[0.1em] transition-all duration-300
          ${sizes[size]}
          ${variants[variant]}
          ${className}
        `}
      >
        {variant !== "inline" && showIcon && (
          <svg
            className="w-4 h-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <rect x="3" y="4" width="18" height="18" rx="2" />
            <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01" />
          </svg>
        )}
        {children}
      </button>

      <BookingModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
