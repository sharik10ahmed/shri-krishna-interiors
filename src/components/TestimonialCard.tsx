import type { Testimonial } from "@/data/site-data";

export function Stars({ rating }: { rating: number }) {
  return (
    <span className="text-sm tracking-[0.3em] text-brass" aria-label={`${rating} out of 5`}>
      {"★".repeat(Math.max(0, Math.min(5, rating)))}
      <span className="text-brass/30">{"★".repeat(5 - Math.max(0, Math.min(5, rating)))}</span>
    </span>
  );
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <figure className="flex h-full flex-col border border-border bg-card p-8">
      <Stars rating={testimonial.rating} />
      <blockquote className="mt-6 flex-1 font-display text-xl leading-relaxed text-foreground/90">
        “{testimonial.review}”
      </blockquote>
      <figcaption className="mt-8 border-t border-border pt-5">
        <p className="text-sm text-foreground">{testimonial.name}</p>
        <p className="mt-1 text-[0.65rem] uppercase tracking-[0.22em] text-brass">
          {testimonial.projectType}
        </p>
      </figcaption>
    </figure>
  );
}