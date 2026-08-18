import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useSite } from "@/lib/site-store";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/testimonials", label: "Testimonials" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

export function Header() {
  const { data } = useSite();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 transition-all duration-500",
        scrolled || open
          ? "border-b border-border bg-background/95 backdrop-blur-md"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <div className="container-x flex h-20 items-center justify-between gap-4">
        <Link to="/" onClick={() => setOpen(false)} className="group flex flex-col leading-none">
          <span
            className={cn(
              "font-display text-lg tracking-wide sm:text-xl",
              scrolled || open ? "text-foreground" : "text-background",
            )}
          >
            Shri Krishna
          </span>
          <span className="mt-1 text-[0.6rem] uppercase tracking-[0.34em] text-brass">
            Kitchen &amp; Interior
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-brass" }}
              className={cn(
                "text-[0.78rem] uppercase tracking-[0.16em] transition-colors hover:text-brass",
                scrolled ? "text-foreground/80" : "text-background/85",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            to="/contact"
            className="hidden border border-brass px-5 py-3 text-[0.7rem] uppercase tracking-[0.18em] text-brass transition-colors hover:bg-brass hover:text-background md:inline-block"
          >
            {data.contact.consultationCta}
          </Link>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className={cn(
              "flex h-10 w-10 flex-col items-center justify-center gap-[5px] lg:hidden",
              scrolled || open ? "text-foreground" : "text-background",
            )}
          >
            <span
              className={cn(
                "block h-px w-6 bg-current transition-transform duration-300",
                open && "translate-y-[6px] rotate-45",
              )}
            />
            <span
              className={cn(
                "block h-px w-6 bg-current transition-opacity duration-300",
                open && "opacity-0",
              )}
            />
            <span
              className={cn(
                "block h-px w-6 bg-current transition-transform duration-300",
                open && "-translate-y-[6px] -rotate-45",
              )}
            />
          </button>
        </div>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background transition-[max-height,opacity] duration-500 lg:hidden",
          open ? "max-h-[32rem] opacity-100" : "max-h-0 opacity-0",
        )}
      >
        <nav className="container-x flex flex-col py-4">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              onClick={() => setOpen(false)}
              activeOptions={{ exact: item.to === "/" }}
              activeProps={{ className: "text-brass" }}
              className="border-b border-border/60 py-4 text-sm uppercase tracking-[0.16em] text-foreground/85"
            >
              {item.label}
            </Link>
          ))}
          <Link
            to="/contact"
            onClick={() => setOpen(false)}
            className="mt-5 bg-charcoal px-5 py-4 text-center text-[0.72rem] uppercase tracking-[0.2em] text-background"
          >
            {data.contact.consultationCta}
          </Link>
        </nav>
      </div>
    </header>
  );
}