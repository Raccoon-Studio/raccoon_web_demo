import { useRef, useState, useCallback, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";

import {
  serviceCategories,
  budgetRanges,
  currencies,
  timelines,
  referralSources,
} from "../../../../data/contact";

import FormField from "./FormField";
import FormTextarea from "./FormTextarea";
import ServiceChip from "./ServiceChip";
import SingleChip from "./SingleChip";
import CustomBudgetInput from "./CustomBudgetInput";
import FileUpload from "./FileUpload";
import StepIndicator from "./StepIndicator";
import SuccessState from "./SuccessState";

/* ── field icon helper ── */
const icons = {
  name: (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
    </svg>
  ),
  email: (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <rect x="2" y="4" width="20" height="16" rx="3" />
      <path d="M2 7l10 7 10-7" />
    </svg>
  ),
  company: (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
    </svg>
  ),
  role: (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M10 6H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V8a2 2 0 00-2-2h-5m-4 0V5a2 2 0 114 0v1m-4 0a2 2 0 104 0" />
    </svg>
  ),
  phone: (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    </svg>
  ),
  website: (
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20M12 2a15.3 15.3 0 014 10 15.3 15.3 0 01-4 10 15.3 15.3 0 01-4-10 15.3 15.3 0 014-10z" />
    </svg>
  ),
};

export default function ContactForm() {
  const formRef = useRef(null);

  /* ── state ── */
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    phone: "",
    website: "",
    role: "",
    message: "",
    nda: false,
  });
  const [selectedServices, setSelectedServices] = useState([]);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [customBudget, setCustomBudget] = useState("");
  const [selectedCurrency, setSelectedCurrency] = useState("USD");
  const [selectedTimeline, setSelectedTimeline] = useState(null);
  const [selectedReferral, setSelectedReferral] = useState(null);
  const [files, setFiles] = useState([]);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const isOtherBudget = selectedBudget === "other";

  /* ── helpers ── */
  const updateField = useCallback((field, value) => {
    setForm((p) => ({ ...p, [field]: value }));
    setErrors((p) => ({ ...p, [field]: undefined }));
  }, []);

  const toggleService = (label) =>
    setSelectedServices((p) =>
      p.includes(label) ? p.filter((s) => s !== label) : [...p, label],
    );

  const toggleBudget = (value) => {
    if (value === "other") {
      setSelectedBudget((p) => (p === "other" ? null : "other"));
    } else {
      setSelectedBudget((p) => (p === value ? null : value));
      setCustomBudget("");
    }
  };

  const completedFields = useMemo(() => {
    let c = 0;
    if (form.name) c++;
    if (form.email) c++;
    if (form.company) c++;
    if (form.phone) c++;
    if (selectedServices.length) c++;
    if (selectedBudget) c++;
    if (selectedTimeline) c++;
    if (form.message) c++;
    return c;
  }, [form, selectedServices, selectedBudget, selectedTimeline]);

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      errs.email = "Invalid email address";
    if (!form.message.trim()) errs.message = "Please describe your project";
    if (!selectedServices.length) errs.services = "Select at least one service";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      formRef.current?.querySelector("[aria-invalid]")?.focus();
      return;
    }
    setIsSubmitting(true);
    await new Promise((r) => setTimeout(r, 2500));
    setIsSubmitting(false);
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      company: "",
      phone: "",
      website: "",
      role: "",
      message: "",
      nda: false,
    });
    setSelectedServices([]);
    setSelectedBudget(null);
    setCustomBudget("");
    setSelectedCurrency("USD");
    setSelectedTimeline(null);
    setSelectedReferral(null);
    setFiles([]);
    setErrors({});
    setIsSubmitted(false);
  };

  /* ── render ── */
  return (
    <AnimatePresence mode="wait">
      {isSubmitted ? (
        <SuccessState key="success" onReset={resetForm} />
      ) : (
        <motion.form
          key="form"
          ref={formRef}
          onSubmit={handleSubmit}
          exit={{ opacity: 0, y: -16 }}
          className="space-y-14"
        >
          {/* Progress */}
          <div className="flex items-center justify-between">
            <StepIndicator
              currentStep={Math.min(Math.floor(completedFields / 2), 5)}
              totalSteps={6}
              completedFields={completedFields}
            />
            <span className="font-mono text-[10px] text-text-dim/70 uppercase tracking-widest">
              {completedFields}/8 complete
            </span>
          </div>

          {/* ── Step 1: About You ── */}
          <fieldset className="space-y-6">
            <legend className="flex items-center gap-3 mb-4">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 text-accent font-mono text-[11px] font-bold">
                1
              </span>
              <span className="font-grotesk text-[13px] font-semibold uppercase tracking-[0.1em] text-text-primary/80">
                About You
              </span>
              <span className="flex-1 h-px bg-dark-border/15 ml-2" />
            </legend>

            <div className="grid sm:grid-cols-2 gap-5">
              <FormField
                label="Full Name"
                name="name"
                required
                value={form.name}
                onChange={(v) => updateField("name", v)}
                error={errors.name}
                icon={icons.name}
              />
              <FormField
                label="Email Address"
                name="email"
                type="email"
                required
                value={form.email}
                onChange={(v) => updateField("email", v)}
                error={errors.email}
                icon={icons.email}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField
                label="Company / Organization"
                name="company"
                value={form.company}
                onChange={(v) => updateField("company", v)}
                placeholder="Your company name"
                icon={icons.company}
              />
              <FormField
                label="Your Role"
                name="role"
                value={form.role}
                onChange={(v) => updateField("role", v)}
                placeholder="e.g., CTO, Founder, PM"
                icon={icons.role}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-5">
              <FormField
                label="Phone Number"
                name="phone"
                type="tel"
                value={form.phone}
                onChange={(v) => updateField("phone", v)}
                placeholder="+1 (555) 000-0000"
                icon={icons.phone}
              />
              <FormField
                label="Website URL"
                name="website"
                type="url"
                value={form.website}
                onChange={(v) => updateField("website", v)}
                placeholder="https://yoursite.com"
                icon={icons.website}
              />
            </div>
          </fieldset>

          {/* ── Step 2: Services ── */}
          <fieldset className="space-y-5">
            <legend className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 text-accent font-mono text-[11px] font-bold">
                2
              </span>
              <span className="font-grotesk text-[13px] font-semibold uppercase tracking-[0.1em] text-text-primary/80">
                Services Needed
              </span>
              <span className="flex-1 h-px bg-dark-border/15 ml-2" />
              {selectedServices.length > 0 && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="font-mono text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded-md"
                >
                  {selectedServices.length} selected
                </motion.span>
              )}
            </legend>

            {errors.services && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-red-400 text-xs font-body flex items-center gap-1"
              >
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10" />
                  <path d="M12 8v4m0 4h.01" />
                </svg>
                {errors.services}
              </motion.p>
            )}

            {serviceCategories.map((cat) => (
              <div key={cat.category} className="space-y-2.5">
                <p className="font-mono text-[10px] uppercase tracking-[0.15em] text-text-dim/80 flex items-center gap-2">
                  <span
                    className={`w-1.5 h-1.5 rounded-full bg-${cat.color}/40`}
                  />
                  {cat.category}
                </p>
                <div className="flex flex-wrap gap-2">
                  {cat.services.map((service) => (
                    <ServiceChip
                      key={service.label}
                      service={service}
                      isActive={selectedServices.includes(service.label)}
                      onToggle={() => toggleService(service.label)}
                    />
                  ))}
                </div>
              </div>
            ))}
          </fieldset>

          {/* ── Step 3: Budget ── */}
          <fieldset className="space-y-4">
            <legend className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 text-accent font-mono text-[11px] font-bold">
                3
              </span>
              <span className="font-grotesk text-[13px] font-semibold uppercase tracking-[0.1em] text-text-primary/80">
                Budget Range
              </span>
              <span className="flex-1 h-px bg-dark-border/15 ml-2" />
              {selectedBudget && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="font-mono text-[10px] text-accent bg-accent/10 px-2 py-0.5 rounded-md"
                >
                  {isOtherBudget
                    ? customBudget
                      ? `${currencies.find((c) => c.code === selectedCurrency)?.symbol}${Number(customBudget).toLocaleString()}`
                      : "Custom"
                    : budgetRanges.find((b) => b.value === selectedBudget)
                        ?.label}
                </motion.span>
              )}
            </legend>

            <div className="flex flex-wrap gap-2">
              {budgetRanges.map((range) => (
                <SingleChip
                  key={range.value}
                  option={range}
                  isActive={selectedBudget === range.value}
                  onSelect={() => toggleBudget(range.value)}
                />
              ))}
              <SingleChip
                option={{ label: "Other", icon: "✏️" }}
                isActive={isOtherBudget}
                onSelect={() => toggleBudget("other")}
              />
            </div>

            <AnimatePresence>
              {isOtherBudget && (
                <CustomBudgetInput
                  value={customBudget}
                  onChange={setCustomBudget}
                  currency={selectedCurrency}
                  onCurrencyChange={setSelectedCurrency}
                />
              )}
            </AnimatePresence>
          </fieldset>

          {/* ── Step 4: Timeline ── */}
          <fieldset className="space-y-4">
            <legend className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 text-accent font-mono text-[11px] font-bold">
                4
              </span>
              <span className="font-grotesk text-[13px] font-semibold uppercase tracking-[0.1em] text-text-primary/80">
                Timeline
              </span>
              <span className="flex-1 h-px bg-dark-border/15 ml-2" />
            </legend>
            <div className="flex flex-wrap gap-2">
              {timelines.map((t) => (
                <SingleChip
                  key={t.value}
                  option={t}
                  isActive={selectedTimeline === t.value}
                  onSelect={() =>
                    setSelectedTimeline((p) => (p === t.value ? null : t.value))
                  }
                />
              ))}
            </div>
          </fieldset>

          {/* ── Step 5: Project Details ── */}
          <fieldset className="space-y-5">
            <legend className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 text-accent font-mono text-[11px] font-bold">
                5
              </span>
              <span className="font-grotesk text-[13px] font-semibold uppercase tracking-[0.1em] text-text-primary/80">
                Project Details
              </span>
              <span className="flex-1 h-px bg-dark-border/15 ml-2" />
            </legend>

            <FormTextarea
              label="Project Description"
              name="message"
              required
              rows={6}
              maxLength={2000}
              value={form.message}
              onChange={(v) => updateField("message", v)}
              placeholder="Tell us about your project: What problem does it solve? Who is the target audience? What does success look like?"
            />

            <div>
              <label className="font-body text-[12px] font-medium uppercase tracking-[0.08em] text-text-dim flex items-center gap-1.5 mb-2">
                Attachments
                <span className="text-text-dim/30 normal-case tracking-normal text-[11px]">
                  (optional)
                </span>
              </label>
              <FileUpload files={files} setFiles={setFiles} />
            </div>
          </fieldset>

          {/* ── Step 6: Referral ── */}
          <fieldset className="space-y-4">
            <legend className="flex items-center gap-3 mb-2">
              <span className="flex items-center justify-center w-7 h-7 rounded-lg bg-accent/10 text-accent font-mono text-[11px] font-bold">
                6
              </span>
              <span className="font-grotesk text-[13px] font-semibold uppercase tracking-[0.1em] text-text-primary/80">
                How Did You Find Us?
              </span>
              <span className="flex-1 h-px bg-dark-border/15 ml-2" />
            </legend>
            <div className="flex flex-wrap gap-2">
              {referralSources.map((src) => (
                <SingleChip
                  key={src.value}
                  option={src}
                  isActive={selectedReferral === src.value}
                  onSelect={() =>
                    setSelectedReferral((p) =>
                      p === src.value ? null : src.value,
                    )
                  }
                />
              ))}
            </div>
          </fieldset>

          {/* ── NDA ── */}
          <div className="flex items-start gap-3 p-4 rounded-2xl border border-dark-border/15 bg-white/[0.015]">
            <button
              type="button"
              onClick={() => updateField("nda", !form.nda)}
              className={`mt-0.5 w-5 h-5 rounded-md border-2 flex items-center justify-center flex-shrink-0 transition-all duration-200 ${
                form.nda
                  ? "bg-accent border-accent"
                  : "border-dark-border/30 hover:border-dark-border/50"
              }`}
            >
              {form.nda && (
                <svg
                  className="w-3 h-3 text-dark"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3"
                >
                  <path d="M5 13l4 4L19 7" />
                </svg>
              )}
            </button>
            <div>
              <p className="font-body text-[13px] text-text-primary/80 font-medium">
                I'd like to sign an NDA before sharing details
              </p>
              <p className="font-body text-[11px] text-text-dim/40 mt-0.5">
                We'll send a mutual NDA for review within 24 hours.
              </p>
            </div>
          </div>

          {/* ── Submit ── */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-5 pt-4">
            <motion.button
              type="submit"
              disabled={isSubmitting}
              whileHover={{ scale: 1.02, y: -1 }}
              whileTap={{ scale: 0.98 }}
              className="group relative inline-flex items-center gap-3 px-10 py-4.5 bg-accent hover:bg-accent/90 disabled:opacity-60 disabled:cursor-not-allowed rounded-2xl font-grotesk text-sm font-semibold uppercase tracking-[0.12em] text-dark transition-all duration-400 overflow-hidden shadow-lg shadow-accent/10 hover:shadow-accent/25"
            >
              <span className="relative z-10 flex items-center gap-2.5">
                <AnimatePresence mode="wait">
                  {isSubmitting ? (
                    <motion.span
                      key="loading"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2.5"
                    >
                      <motion.span
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 0.8,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        className="inline-block w-4 h-4 border-2 border-dark/20 border-t-dark rounded-full"
                      />
                      Sending…
                    </motion.span>
                  ) : (
                    <motion.span
                      key="default"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="flex items-center gap-2.5"
                    >
                      Send Project Brief
                      <svg
                        className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2.5"
                      >
                        <path d="M7 17L17 7M17 7H7M17 7v10" />
                      </svg>
                    </motion.span>
                  )}
                </AnimatePresence>
              </span>
              <span className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
            </motion.button>

            <div className="flex flex-col gap-1.5">
              <p className="font-body text-[12px] text-text-dim/90 leading-relaxed max-w-xs">
                By submitting, you agree to our{" "}
                <a
                  href="#"
                  className="text-text-dim/95 hover:text-accent underline underline-offset-2 transition-colors"
                >
                  privacy policy
                </a>
                . We never share your data.
              </p>
              <p className="font-body text-[11px] text-text-dim/70 flex items-center gap-1">
                <svg
                  className="w-3 h-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                256-bit SSL encrypted
              </p>
            </div>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
