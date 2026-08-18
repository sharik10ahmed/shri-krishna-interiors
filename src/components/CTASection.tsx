import { Link } from "@tanstack/react-router";
import { images } from "@/data/images";
import { useSite } from "@/lib/site-store";

export function CTASection({
  title = "Let's Design Your Space Together",
  text = "Share your floor plan or requirement and we will plan a kitchen, wardrobe or complete woodwork solution around it.",
}: {
  title?: string;
  text?: string;
}) {
  const { data } = useSite();
  return (
    <section className="relative isolate overflow-hidden">
      <img
        src={images.ctaBanner}
        alt="Warmly lit premium interior corridor"
        loading="lazy"
        width={1600}
        height={700}
        className="absolute inset-0 -z-10 h-full w-full object-cover"
      />
      <div className="absolute inset-0 -z-10 bg-charcoal/80" />
      <div className="container-x flex flex-col items-center py-24 text-center lg:py-28">
        <h2 className="max-w-3xl text-3xl leading-tight text-background sm:text-4xl lg:text-5xl">
          {title}
        </h2>
        <p className="mt-6 max-w-xl text-sm leading-relaxed text-beige/80">{text}</p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <Link
            to="/contact"
            className="bg-brass px-8 py-4 text-[0.72rem] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90"
          >
            {data.contact.consultationCta}
          </Link>
          <a
            href={`tel:${data.contact.phone}`}
            className="border border-background/40 px-8 py-4 text-[0.72rem] uppercase tracking-[0.2em] text-background transition-colors hover:border-brass hover:text-brass"
          >
            Call {data.contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}