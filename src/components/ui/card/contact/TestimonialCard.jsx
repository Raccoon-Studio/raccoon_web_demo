export default function TestimonialCard({ testimonial }) {
  return (
    <div className="relative p-6 rounded-2xl border border-dark-border/15 bg-white/[0.02] hover:bg-white/[0.03] transition-colors duration-300 flex flex-col h-full">
      <div className="absolute top-4 right-5 font-display text-4xl text-accent/8 leading-none">
        "
      </div>

      {/* Stars */}
      <div className="flex gap-0.5 mb-4">
        {[...Array(testimonial.rating)].map((_, i) => (
          <svg
            key={i}
            className="w-3.5 h-3.5 text-amber-400/70"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        ))}
      </div>

      <blockquote className="font-body text-[14px] text-text-primary/80 leading-relaxed italic flex-1 mb-5">
        "{testimonial.quote}"
      </blockquote>

      <div className="flex items-center justify-between pt-4 border-t border-dark-border/10">
        <div className="flex items-center gap-3">
          <img
            src={testimonial.avatar}
            alt={testimonial.author}
            className="w-9 h-9 rounded-full border border-dark-border/15"
            loading="lazy"
          />
          <div>
            <p className="font-body text-[13px] font-medium text-text-primary">
              {testimonial.author}
            </p>
            <p className="font-mono text-[10px] text-text-dim/50 uppercase tracking-wider">
              {testimonial.role}, {testimonial.company}
            </p>
          </div>
        </div>
        {testimonial.metric && (
          <div className="text-right">
            <p className="font-display text-lg font-bold text-accent leading-none">
              {testimonial.metric}
            </p>
            <p className="font-mono text-[8px] text-text-dim/40 uppercase tracking-wider mt-0.5">
              {testimonial.metricLabel}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
