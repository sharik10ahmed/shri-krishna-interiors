import { Link } from "@tanstack/react-router";
import { resolveImage } from "@/data/images";
import type { Service } from "@/data/site-data";

export function ServiceCard({ service }: { service: Service }) {
  return (
    <Link
      to="/services/$slug"
      params={{ slug: service.slug }}
      className="group block border border-border bg-card transition-colors duration-500 hover:border-brass"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={resolveImage(service.image)}
          alt={service.title}
          loading="lazy"
          width={1200}
          height={900}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
      </div>
      <div className="p-7">
        <p className="text-[0.62rem] uppercase tracking-[0.26em] text-brass">{service.category}</p>
        <h3 className="mt-3 text-2xl">{service.title}</h3>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{service.description}</p>
        <span className="mt-6 inline-block text-[0.68rem] uppercase tracking-[0.22em] text-foreground/70 transition-colors group-hover:text-brass">
          View Service →
        </span>
      </div>
    </Link>
  );
}