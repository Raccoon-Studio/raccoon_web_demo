export default function StepIndicator({
  currentStep,
  totalSteps,
  completedFields,
}) {
  return (
    <div className="flex items-center gap-1.5">
      {Array.from({ length: totalSteps }).map((_, i) => (
        <div
          key={i}
          className={`h-1 rounded-full transition-all duration-500 ${
            i < currentStep
              ? "bg-accent w-6"
              : i === currentStep
                ? "bg-accent/50 w-4"
                : "bg-dark-border/20 w-2"
          }`}
        />
      ))}
      <span className="ml-2 font-mono text-[9px] text-text-dim/40 uppercase tracking-widest">
        {completedFields} fields
      </span>
    </div>
  );
}
