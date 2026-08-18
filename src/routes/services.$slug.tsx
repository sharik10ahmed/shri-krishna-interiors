import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { resolveImage } from "@/data/images";
import { defaultSiteData, processSteps } from "@/data/site-data";
import { useSite } from "@/lib/site-store";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const service = defaultSiteData.services.find((s) => s.slug === params.slug);
    if (!service) throw notFound();
    return { title: service.title, description: service.description };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Service not found" }, { name: "robots", content: "noindex" }] };
    }
    const title = `${loaderData.title} | Shri Krishna Kitchen And Interior`;
    return {
      meta: [
        { title },
        { name: "description", content: loaderData.description },
        { property: "og:title", content: title },
        { property: "og:description", content: loaderData.description },
      ],
    };
  },
  component: ServiceDetail,
});

function ServiceDetail() {
  const { slug } = Route.useParams();
  const { data } = useSite();
  const service = data.services.find((s) => s.slug === slug) ?? data.services[0];
  if (!service) return null;
  const others = data.services.filter((s) => s.slug !== service.slug);

  return (
    <SiteLayout>
      <PageHero
        label={service.category}
        title={service.title}
        text={service.intro}
        image={resolveImage(service.image)}
      />

      <section className="container-x py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20">
          <Reveal>
            <div>
              <span className="rule-label">What's Included</span>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                {service.description}
              </p>
              <ul className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2">
                {service.points.map((p) => (
                  <li key={p} className="bg-background p-6 text-sm">
                    <span className="text-brass">◆</span>
                    <p className="mt-3">{p}</p>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <div className="border border-border bg-ivory p-8 lg:p-10">
              <h2 className="font-display text-2xl">How this service is delivered</h2>
              <ol className="mt-8 space-y-6">
                {processSteps.map((s) => (
                  <li key={s.step} className="flex gap-5">
                    <span className="font-display text-xl text-brass">{s.step}</span>
                    <div>
                      <p className="text-sm">{s.title}</p>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Link
                to="/contact"
                className="mt-10 inline-block bg-charcoal px-7 py-4 text-[0.7rem] uppercase tracking-[0.2em] text-background"
              >
                {data.contact.consultationCta}
              </Link>
            </div>
          </Reveal>
        </div>

        <div className="mt-24 border-t border-border pt-12">
          <p className="text-[0.68rem] uppercase tracking-[0.24em] text-brass">Other Services</p>
          <div className="mt-6 flex flex-wrap gap-4">
            {others.map((s) => (
              <Link
                key={s.id}
                to="/services/$slug"
                params={{ slug: s.slug }}
                className="border border-border px-5 py-3 text-sm transition-colors hover:border-brass hover:text-brass"
              >
                {s.title}
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
