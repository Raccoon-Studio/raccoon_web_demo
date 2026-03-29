import { useState } from "react";

export default function FormTextarea({
  label,
  name,
  required = false,
  rows = 4,
  maxLength = 1000,
  value,
  onChange,
  placeholder,
}) {
  const [focused, setFocused] = useState(false);
  const hasContent = value?.length > 0;

  return (
    <div className="relative flex flex-col gap-1.5">
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="font-body text-[12px] font-medium uppercase tracking-[0.08em] text-text-dim flex items-center gap-1.5"
        >
          {label}
          {required && <span className="text-accent text-[10px]">*</span>}
        </label>
        <span
          className={`font-mono text-[10px] transition-colors duration-300 ${
            hasContent ? "text-text-dim/50" : "text-transparent"
          }`}
        >
          {value?.length || 0}/{maxLength}
        </span>
      </div>
      <textarea
        id={name}
        name={name}
        required={required}
        rows={rows}
        maxLength={maxLength}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full bg-white/[0.03] backdrop-blur-sm rounded-xl px-4 py-3.5 text-sm font-body text-text-primary placeholder:text-text-dim/30 border transition-all duration-300 outline-none resize-none ${
          focused
            ? "border-accent/50 shadow-[0_0_0_3px_rgba(99,102,241,0.08)]"
            : hasContent
              ? "border-dark-border/40"
              : "border-dark-border/20 hover:border-dark-border/40"
        }`}
        placeholder={
          placeholder ||
          "Describe your project goals, timeline, and any specific requirements..."
        }
      />
    </div>
  );
}
