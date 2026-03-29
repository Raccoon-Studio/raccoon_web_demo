import { useState, useMemo, useCallback, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  buildGoogleCalendarUrl,
  getAvailableSlots,
  getNextBusinessDays,
  formatDate,
  formatTime,
  formatDateFull,
} from "../../../utils/googleCalendar";
import { ease } from "../../../animation/contactAnimation";

const MEETING_TYPES = [
  {
    id: "discovery",
    label: "Discovery Call",
    duration: 30,
    icon: "💬",
    description: "Discuss your project vision, goals & timeline",
  },
  {
    id: "technical",
    label: "Technical Deep-Dive",
    duration: 45,
    icon: "⚙️",
    description: "Architecture, stack & technical requirements",
  },
  {
    id: "review",
    label: "Portfolio Review",
    duration: 20,
    icon: "📋",
    description: "Walk through relevant case studies",
  },
];

const TIMEZONES = [
  { label: "Pacific (PT)", value: "America/Los_Angeles", offset: "UTC-8" },
  { label: "Mountain (MT)", value: "America/Denver", offset: "UTC-7" },
  { label: "Central (CT)", value: "America/Chicago", offset: "UTC-6" },
  { label: "Eastern (ET)", value: "America/New_York", offset: "UTC-5" },
  { label: "London (GMT)", value: "Europe/London", offset: "UTC+0" },
  { label: "Berlin (CET)", value: "Europe/Berlin", offset: "UTC+1" },
  { label: "Dubai (GST)", value: "Asia/Dubai", offset: "UTC+4" },
  { label: "Mumbai (IST)", value: "Asia/Kolkata", offset: "UTC+5:30" },
  { label: "Singapore (SGT)", value: "Asia/Singapore", offset: "UTC+8" },
  { label: "Tokyo (JST)", value: "Asia/Tokyo", offset: "UTC+9" },
  { label: "Sydney (AEST)", value: "Australia/Sydney", offset: "UTC+11" },
];

export default function BookingModal({ isOpen, onClose }) {
  const modalRef = useRef(null);

  /* ── state ── */
  const [step, setStep] = useState(1); // 1=type, 2=date, 3=time, 4=confirm
  const [meetingType, setMeetingType] = useState(MEETING_TYPES[0]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [timezone, setTimezone] = useState("America/Los_Angeles");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [notes, setNotes] = useState("");

  const businessDays = useMemo(() => getNextBusinessDays(14), []);

  const slots = useMemo(() => {
    if (!selectedDate) return [];
    return getAvailableSlots(selectedDate, 30, timezone);
  }, [selectedDate, timezone]);

  /* ── close on ESC ── */
  useEffect(() => {
    const handler = (e) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [isOpen, onClose]);

  /* ── close on backdrop click ── */
  const handleBackdrop = useCallback(
    (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target)) {
        onClose();
      }
    },
    [onClose],
  );

  /* ── reset on close ── */
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setStep(1);
        setSelectedDate(null);
        setSelectedSlot(null);
        setName("");
        setEmail("");
        setNotes("");
      }, 300);
    }
  }, [isOpen]);

  /* ── generate calendar URL ── */
  const calendarUrl = useMemo(() => {
    if (!selectedSlot) return "#";

    const description = [
      `Meeting Type: ${meetingType.label}`,
      `Duration: ${meetingType.duration} minutes`,
      name && `Guest: ${name}`,
      email && `Email: ${email}`,
      notes && `\nNotes:\n${notes}`,
      `\n---\nBooked via Raccoon Studio`,
    ]
      .filter(Boolean)
      .join("\n");

    return buildGoogleCalendarUrl({
      title: `${meetingType.label} — Raccoon Studio`,
      startDate: selectedSlot,
      durationMin: meetingType.duration,
      description,
      location: "Google Meet (link will be auto-generated)",
      guestEmail: email || "",
    });
  }, [selectedSlot, meetingType, name, email, notes]);

  /* ── can proceed? ── */
  const canProceed = {
    1: !!meetingType,
    2: !!selectedDate,
    3: !!selectedSlot,
    4: name.trim().length > 0 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email),
  };

  /* ── step navigation ── */
  const next = () => {
    if (canProceed[step] && step < 4) setStep(step + 1);
  };
  const back = () => {
    if (step > 1) setStep(step - 1);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={handleBackdrop}
          className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
        >
          <motion.div
            ref={modalRef}
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.35, ease }}
            className="relative w-full max-w-lg bg-[#0e1015] border border-dark-border/25 rounded-3xl shadow-2xl shadow-black/50 overflow-hidden"
          >
            {/* ── Header ── */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-dark-border/15">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-xl bg-accent/10 flex items-center justify-center">
                  <svg
                    className="w-4 h-4 text-accent"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  >
                    <rect x="3" y="4" width="18" height="18" rx="2" />
                    <path d="M16 2v4M8 2v4M3 10h18M8 14h.01M12 14h.01M16 14h.01M8 18h.01M12 18h.01" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-display text-sm font-bold text-text-primary">
                    Book a Call
                  </h3>
                  <p className="font-mono text-[9px] text-text-dim/80 uppercase tracking-widest">
                    Step {step} of 4
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="w-8 h-8 rounded-xl bg-white/[0.04] border border-dark-border/10 flex items-center justify-center text-text-dim/70 hover:text-text-primary hover:bg-white/[0.08] transition-all duration-200"
              >
                <svg
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            {/* ── Progress ── */}
            <div className="px-6 pt-4">
              <div className="flex gap-1.5">
                {[1, 2, 3, 4].map((s) => (
                  <div
                    key={s}
                    className={`h-1 rounded-full flex-1 transition-all duration-500 ${
                      s < step
                        ? "bg-accent"
                        : s === step
                          ? "bg-accent/50"
                          : "bg-dark-border/15"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* ── Body ── */}
            <div className="px-6 py-5 min-h-[320px]">
              <AnimatePresence mode="wait">
                {/* STEP 1 — Meeting Type */}
                {step === 1 && (
                  <motion.div
                    key="step1"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, ease }}
                    className="space-y-4"
                  >
                    <div>
                      <h4 className="font-display text-lg font-bold text-text-primary mb-1">
                        What type of meeting?
                      </h4>
                      <p className="font-body text-[13px] text-text-muted">
                        Choose the format that best fits your needs.
                      </p>
                    </div>

                    <div className="space-y-2.5">
                      {MEETING_TYPES.map((type) => (
                        <button
                          key={type.id}
                          type="button"
                          onClick={() => setMeetingType(type)}
                          className={`w-full flex items-start gap-3.5 p-4 rounded-2xl border text-left transition-all duration-300 ${
                            meetingType.id === type.id
                              ? "bg-accent/[0.06] border-accent/35 shadow-[0_0_0_1px_rgba(99,102,241,0.1)]"
                              : "bg-white/[0.02] border-dark-border/15 hover:bg-white/[0.04] hover:border-dark-border/30"
                          }`}
                        >
                          <span className="text-xl mt-0.5">{type.icon}</span>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-0.5">
                              <span
                                className={`font-body text-[14px] font-semibold ${
                                  meetingType.id === type.id
                                    ? "text-accent"
                                    : "text-text-primary"
                                }`}
                              >
                                {type.label}
                              </span>
                              <span className="font-mono text-[9px] text-text-dim/70 uppercase tracking-wider">
                                {type.duration} min
                              </span>
                            </div>
                            <p className="font-body text-[12px] text-text-dim/90">
                              {type.description}
                            </p>
                          </div>
                          {meetingType.id === type.id && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="w-5 h-5 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1"
                            >
                              <svg
                                className="w-3 h-3 text-dark"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                                strokeWidth="3"
                              >
                                <path d="M5 13l4 4L19 7" />
                              </svg>
                            </motion.div>
                          )}
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* STEP 2 — Date */}
                {step === 2 && (
                  <motion.div
                    key="step2"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, ease }}
                    className="space-y-4"
                  >
                    <div>
                      <h4 className="font-display text-lg font-bold text-text-primary mb-1">
                        Pick a date
                      </h4>
                      <p className="font-body text-[13px] text-text-muted">
                        Available weekdays for the next 2 weeks.
                      </p>
                    </div>

                    {/* Timezone selector */}
                    <div className="flex items-center gap-2">
                      <svg
                        className="w-3.5 h-3.5 text-text-dim/70"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="1.5"
                      >
                        <circle cx="12" cy="12" r="10" />
                        <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
                      </svg>
                      <select
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className="bg-white/[0.03] border border-dark-border/20 rounded-lg px-2.5 py-1.5 text-[11px] font-mono text-text-muted outline-none focus:border-accent/30 cursor-pointer"
                      >
                        {TIMEZONES.map((tz) => (
                          <option key={tz.value} value={tz.value}>
                            {tz.label} ({tz.offset})
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Date grid */}
                    <div className="grid grid-cols-4 sm:grid-cols-5 gap-2">
                      {businessDays.map((day) => {
                        const isSelected =
                          selectedDate?.toDateString() === day.toDateString();
                        const dayName = day.toLocaleDateString("en-US", {
                          weekday: "short",
                        });
                        const dayNum = day.getDate();
                        const month = day.toLocaleDateString("en-US", {
                          month: "short",
                        });

                        return (
                          <button
                            key={day.toISOString()}
                            type="button"
                            onClick={() => {
                              setSelectedDate(day);
                              setSelectedSlot(null);
                            }}
                            className={`flex flex-col items-center gap-0.5 p-3 rounded-xl border transition-all duration-200 ${
                              isSelected
                                ? "bg-accent/[0.08] border-accent/40 shadow-[0_0_0_1px_rgba(99,102,241,0.12)]"
                                : "bg-white/[0.02] border-dark-border/12 hover:bg-white/[0.04] hover:border-dark-border/25"
                            }`}
                          >
                            <span
                              className={`font-mono text-[9px] uppercase tracking-wider ${
                                isSelected ? "text-accent" : "text-text-dim/70"
                              }`}
                            >
                              {dayName}
                            </span>
                            <span
                              className={`font-display text-lg font-bold ${
                                isSelected ? "text-accent" : "text-text-primary"
                              }`}
                            >
                              {dayNum}
                            </span>
                            <span
                              className={`font-mono text-[8px] uppercase tracking-widest ${
                                isSelected
                                  ? "text-accent/60"
                                  : "text-text-dim/60"
                              }`}
                            >
                              {month}
                            </span>
                          </button>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* STEP 3 — Time */}
                {step === 3 && (
                  <motion.div
                    key="step3"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, ease }}
                    className="space-y-4"
                  >
                    <div>
                      <h4 className="font-display text-lg font-bold text-text-primary mb-1">
                        Pick a time
                      </h4>
                      <p className="font-body text-[13px] text-text-muted">
                        {formatDate(selectedDate)} · {meetingType.duration}
                        -minute {meetingType.label.toLowerCase()}
                      </p>
                    </div>

                    {slots.length === 0 ? (
                      <div className="text-center py-8">
                        <p className="font-body text-sm text-text-dim/50">
                          No available slots for this date.
                        </p>
                        <button
                          type="button"
                          onClick={back}
                          className="mt-3 text-accent text-sm font-body font-medium hover:underline"
                        >
                          Choose another date
                        </button>
                      </div>
                    ) : (
                      <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 max-h-[240px] overflow-y-auto pr-1">
                        {slots.map((slot) => {
                          const isSelected =
                            selectedSlot?.getTime() === slot.getTime();
                          return (
                            <button
                              key={slot.toISOString()}
                              type="button"
                              onClick={() => setSelectedSlot(slot)}
                              className={`px-3 py-2.5 rounded-xl border text-center transition-all duration-200 ${
                                isSelected
                                  ? "bg-accent/[0.08] border-accent/40 shadow-[0_0_0_1px_rgba(99,102,241,0.12)]"
                                  : "bg-white/[0.02] border-dark-border/12 hover:bg-white/[0.04] hover:border-dark-border/25"
                              }`}
                            >
                              <span
                                className={`font-mono text-[12px] font-medium ${
                                  isSelected
                                    ? "text-accent"
                                    : "text-text-primary"
                                }`}
                              >
                                {formatTime(slot)}
                              </span>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {selectedSlot && (
                      <motion.div
                        initial={{ opacity: 0, y: 6 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="flex items-center gap-2 p-3 rounded-xl bg-accent/[0.04] border border-accent/15"
                      >
                        <svg
                          className="w-4 h-4 text-accent flex-shrink-0"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        <span className="font-body text-[12px] text-accent/80">
                          {formatDateFull(selectedSlot)} at{" "}
                          {formatTime(selectedSlot)} –{" "}
                          {formatTime(
                            new Date(
                              selectedSlot.getTime() +
                                meetingType.duration * 60000,
                            ),
                          )}
                        </span>
                      </motion.div>
                    )}
                  </motion.div>
                )}

                {/* STEP 4 — Confirm */}
                {step === 4 && (
                  <motion.div
                    key="step4"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.25, ease }}
                    className="space-y-4"
                  >
                    <div>
                      <h4 className="font-display text-lg font-bold text-text-primary mb-1">
                        Confirm your booking
                      </h4>
                      <p className="font-body text-[13px] text-text-muted">
                        We'll add this to your Google Calendar.
                      </p>
                    </div>

                    {/* Summary */}
                    <div className="p-4 rounded-2xl border border-dark-border/15 bg-white/[0.02] space-y-3">
                      <div className="flex items-center gap-2.5">
                        <span className="text-lg">{meetingType.icon}</span>
                        <div>
                          <p className="font-body text-[13px] font-semibold text-text-primary">
                            {meetingType.label}
                          </p>
                          <p className="font-mono text-[9px] text-text-dim/50 uppercase tracking-wider">
                            {meetingType.duration} minutes
                          </p>
                        </div>
                      </div>
                      <div className="h-px bg-dark-border/10" />
                      <div className="flex items-center gap-2.5">
                        <svg
                          className="w-4 h-4 text-text-dim/70"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <rect x="3" y="4" width="18" height="18" rx="2" />
                          <path d="M16 2v4M8 2v4M3 10h18" />
                        </svg>
                        <span className="font-body text-[13px] text-text-primary">
                          {formatDateFull(selectedSlot)}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <svg
                          className="w-4 h-4 text-text-dim/70"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <circle cx="12" cy="12" r="10" />
                          <path d="M12 6v6l4 2" />
                        </svg>
                        <span className="font-body text-[13px] text-text-primary">
                          {formatTime(selectedSlot)} –{" "}
                          {formatTime(
                            new Date(
                              selectedSlot.getTime() +
                                meetingType.duration * 60000,
                            ),
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-2.5">
                        <svg
                          className="w-4 h-4 text-text-dim/70"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        >
                          <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                        </svg>
                        <span className="font-body text-[13px] text-text-muted">
                          Google Meet (auto-generated)
                        </span>
                      </div>
                    </div>

                    {/* Guest info */}
                    <div className="space-y-3">
                      <div className="grid sm:grid-cols-2 gap-3">
                        <div className="flex flex-col gap-1">
                          <label className="font-body text-[11px] font-medium uppercase tracking-[0.08em] text-text-dim">
                            Your Name{" "}
                            <span className="text-accent text-[10px]">*</span>
                          </label>
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="John Doe"
                            className="bg-white/[0.03] rounded-xl px-3.5 py-2.5 text-sm font-body text-text-primary placeholder:text-text-dim/60 border border-dark-border/20 focus:border-accent/40 outline-none transition-colors"
                          />
                        </div>
                        <div className="flex flex-col gap-1">
                          <label className="font-body text-[11px] font-medium uppercase tracking-[0.08em] text-text-dim">
                            Your Email{" "}
                            <span className="text-accent text-[10px]">*</span>
                          </label>
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="john@company.com"
                            className="bg-white/[0.03] rounded-xl px-3.5 py-2.5 text-sm font-body text-text-primary placeholder:text-text-dim/60 border border-dark-border/20 focus:border-accent/40 outline-none transition-colors"
                          />
                        </div>
                      </div>
                      <div className="flex flex-col gap-1">
                        <label className="font-body text-[11px] font-medium uppercase tracking-[0.08em] text-text-dim">
                          Notes{" "}
                          <span className="text-text-dim/60 normal-case tracking-normal">
                            (optional)
                          </span>
                        </label>
                        <textarea
                          value={notes}
                          onChange={(e) => setNotes(e.target.value)}
                          rows={2}
                          placeholder="Anything you'd like to discuss..."
                          className="bg-white/[0.03] rounded-xl px-3.5 py-2.5 text-sm font-body text-text-primary placeholder:text-text-dim/60 border border-dark-border/20 focus:border-accent/40 outline-none resize-none transition-colors"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* ── Footer ── */}
            <div className="flex items-center justify-between px-6 py-4 border-t border-dark-border/15">
              <button
                type="button"
                onClick={step > 1 ? back : onClose}
                className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-[12px] font-body text-text-dim/90 hover:text-text-muted transition-colors"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M15 19l-7-7 7-7" />
                </svg>
                {step > 1 ? "Back" : "Cancel"}
              </button>

              {step < 4 ? (
                <motion.button
                  type="button"
                  onClick={next}
                  disabled={!canProceed[step]}
                  whileHover={canProceed[step] ? { scale: 1.02 } : {}}
                  whileTap={canProceed[step] ? { scale: 0.98 } : {}}
                  className={`inline-flex items-center gap-2 px-6 py-2.5 rounded-xl font-grotesk text-[12px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
                    canProceed[step]
                      ? "bg-accent text-dark hover:bg-accent/90 shadow-lg shadow-accent/10"
                      : "bg-dark-border/20 text-text-dim/60 cursor-not-allowed"
                  }`}
                >
                  Continue
                  <svg
                    className="w-3.5 h-3.5"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              ) : (
                <motion.a
                  href={calendarUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={onClose}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`inline-flex items-center gap-2.5 px-6 py-2.5 rounded-xl font-grotesk text-[12px] font-semibold uppercase tracking-[0.1em] transition-all duration-300 ${
                    canProceed[4]
                      ? "bg-accent text-dark hover:bg-accent/90 shadow-lg shadow-accent/10"
                      : "bg-dark-border/20 text-text-dim/60 pointer-events-none"
                  }`}
                >
                  {/* Google Calendar icon */}
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M19.5 3h-3V1.5a.75.75 0 00-1.5 0V3h-6V1.5a.75.75 0 00-1.5 0V3h-3A1.5 1.5 0 003 4.5v15A1.5 1.5 0 004.5 21h15a1.5 1.5 0 001.5-1.5v-15A1.5 1.5 0 0019.5 3zM19 19.5H5V9h14v10.5z" />
                  </svg>
                  Add to Google Calendar
                </motion.a>
              )}
            </div>

            {/* Google branding hint */}
            <div className="px-6 pb-3 flex items-center justify-center gap-1.5">
              <svg
                className="w-3 h-3 text-text-dim/50"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <span className="font-mono text-[8px] text-text-dim/50 uppercase tracking-widest">
                Opens in Google Calendar · No account required on our end
              </span>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
