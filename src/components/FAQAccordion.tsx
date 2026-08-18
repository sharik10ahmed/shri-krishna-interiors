import { useState } from "react";
import type { Faq } from "@/data/site-data";
import { cn } from "@/lib/utils";

export function FAQAccordion({ items }: { items: Faq[] }) {
  const [openId, setOpenId] = useState<string | null>(items[0]?.id ?? null);

  return (
    <div className="divide-y divide-border border-y border-border">
      {items.map((item) => {
        const open = openId === item.id;
        return (
          <div key={item.id}>
            <button
              type="button"
              onClick={() => setOpenId(open ? null : item.id)}
              aria-expanded={open}
              className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-brass"
            >
              <span className="font-display text-lg sm:text-xl">{item.question}</span>
              <span
                className={cn(
                  "mt-1 shrink-0 text-brass transition-transform duration-300",
                  open && "rotate-45",
                )}
              >
                +
              </span>
            </button>
            <div
              className={cn(
                "grid transition-all duration-500 ease-out",
                open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
              )}
            >
              <div className="overflow-hidden">
                <p className="max-w-3xl pb-7 text-sm leading-relaxed text-muted-foreground">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}