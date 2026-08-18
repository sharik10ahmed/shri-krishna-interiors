import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { resolveImage, images } from "@/data/images";
import { useSite } from "@/lib/site-store";
import { Link } from "@tanstack/react-router";

const TITLE = "Services | Modular Kitchens, Wardrobes & TV Units";
const DESC =
  "Modular kitchens, wardrobes, TV units, customized furniture and complete residential interiors — designed, fabricated and installed in Pimpri-Chinchwad.";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const { data } = useSite();

  return (
    <SiteLayout>
      <PageHero
        label="Our Services"
        title="Complete Interior & Modular Woodwork Services"
        text="Every service below is planned around your room dimensions, storage habits and finish preferences."
        image={images.processPlanning}
      />

      <div className="container-x py-24 lg:py-32">
        <div className="space-y-24 lg:space-y-32">
          {data.services.map((service, i) => (
            <Reveal key={service.id}>
              <section
                className={`grid items-center gap-12 lg:grid-cols-2 lg:gap-20 ${
                  i % 2 === 1 ? "lg:[&>*:first-child]:order-2" : ""
                }`}
              >
                <div className="overflow-hidden">
                  <img
                    src={resolveImage(service.image)}
                    alt={service.title}
                    loading="lazy"
                    width={1200}
                    height={900}
                    className="h-full w-full object-cover transition-transform duration-[900ms] hover:scale-105"
                  />
                </div>
                <div>
                  <span className="rule-label">{service.category}</span>
                  <h2 className="mt-5 font-display text-3xl sm:text-4xl">{service.title}</h2>
                  <p className="mt-5 text-base leading-relaxed text-muted-foreground">
                    {service.intro}
                  </p>
                  <ul className="mt-8 grid gap-3 sm:grid-cols-2">
                    {service.points.map((p) => (
                      <li key={p} className="flex items-start gap-3 text-sm">
                        <span className="mt-2 h-px w-4 shrink-0 bg-brass" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <Link
                    to="/services/$slug"
                    params={{ slug: service.slug }}
                    className="mt-9 inline-block border-b border-brass pb-1 text-[0.7rem] uppercase tracking-[0.22em] text-brass"
                  >
                    Explore {service.title}
                  </Link>
                </div>
              </section>
            </Reveal>
          ))}
        </div>
      </div>

      <CTASection />
    </SiteLayout>
  );
}
