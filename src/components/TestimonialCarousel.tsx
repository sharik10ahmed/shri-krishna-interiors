import { useState } from "react";
import { Stars } from "@/components/TestimonialCard";
import type { Testimonial } from "@/data/site-data";
import { cn } from "@/lib/utils";

export function TestimonialCarousel({ items }: { items: Testimonial[] }) {
  const [index, setIndex] = useState(0);
  if (items.length === 0) return null;
  const safe = index % items.length;
  const active = items[safe]!;

  return (
    <div className="mx-auto max-w-3xl text-center">
      <div key={active.id} className="animate-fade-up">
        <div className="flex justify-center">
          <Stars rating={active.rating} />
        </div>
        <blockquote className="mt-8 font-display text-2xl leading-relaxed text-background sm:text-3xl">
          “{active.review}”
        </blockquote>
        <p className="mt-8 text-sm text-beige">{active.name}</p>
        <p className="mt-1 text-[0.65rem] uppercase tracking-[0.24em] text-brass">
          {active.projectType}
        </p>
      </div>

      <div className="mt-10 flex items-center justify-center gap-6">
        <button
          type="button"
          aria-label="Previous testimonial"
          onClick={() => setIndex((i) => (i - 1 + items.length) % items.length)}
          className="h-10 w-10 border border-background/25 text-background/70 transition-colors hover:border-brass hover:text-brass"
        >
          ←
        </button>
        <div className="flex gap-2">
          {items.map((t, i) => (
            <button
              key={t.id}
              type="button"
              aria-label={`Show testimonial ${i + 1}`}
              onClick={() => setIndex(i)}
              className={cn(
                "h-1.5 w-8 transition-colors",
                i === safe ? "bg-brass" : "bg-background/25",
              )}
            />
          ))}
        </div>
        <button
          type="button"
          aria-label="Next testimonial"
          onClick={() => setIndex((i) => (i + 1) % items.length)}
          className="h-10 w-10 border border-background/25 text-background/70 transition-colors hover:border-brass hover:text-brass"
        >
          →
        </button>
      </div>
      <p className="mt-8 text-[0.62rem] uppercase tracking-[0.2em] text-beige/50">
        Demo content shown for presentation purposes
      </p>
    </div>
  );
}