import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { ServiceCard } from "@/components/ServiceCard";
import { ProjectCard } from "@/components/ProjectCard";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { resolveImage } from "@/data/images";
import { processSteps, whyChooseUs } from "@/data/site-data";
import { useSite } from "@/lib/site-store";

const TITLE = "Shri Krishna Kitchen And Interior | Modular Kitchen & Interior Design, Nigdi";
const DESC =
  "Premium modular kitchens, wardrobes, TV units and customized residential woodwork designed, fabricated and installed in Nigdi, Pimpri-Chinchwad.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: Index,
});

function Index() {
  const { data } = useSite();
  const { hero, about, services, projects, testimonials, faqs } = data;

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative isolate flex min-h-[92vh] items-center overflow-hidden">
        <img
          src={resolveImage(hero.image)}
          alt="Premium modular kitchen interior"
          width={1920}
          height={1080}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-charcoal/90 via-charcoal/70 to-charcoal/40" />
        <div className="container-x py-32">
          <div className="max-w-2xl animate-fade-up">
            <span className="rule-label">{hero.label}</span>
            <h1 className="mt-7 font-display text-4xl leading-[1.08] text-background sm:text-5xl lg:text-6xl">
              {hero.heading}
            </h1>
            <p className="mt-7 max-w-xl text-base leading-relaxed text-beige/85">
              {hero.description}
            </p>
            <div className="mt-10 flex flex-col gap-4 sm:flex-row">
              <Link
                to="/projects"
                className="bg-brass px-8 py-4 text-center text-[0.72rem] uppercase tracking-[0.2em] text-background transition-opacity hover:opacity-90"
              >
                {hero.primaryCta}
              </Link>
              <Link
                to="/contact"
                className="border border-background/40 px-8 py-4 text-center text-[0.72rem] uppercase tracking-[0.2em] text-background transition-colors hover:border-brass hover:text-brass"
              >
                {hero.secondaryCta}
              </Link>
            </div>
            <p className="mt-12 text-[0.66rem] uppercase tracking-[0.3em] text-beige/60">
              {hero.trustLine}
            </p>
          </div>
        </div>
      </section>

      {/* About preview */}
      <section className="container-x py-24 lg:py-32">
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <div className="overflow-hidden">
              <img
                src={resolveImage(about.image)}
                alt="Craftsmanship at the Shri Krishna workshop"
                loading="lazy"
                width={1200}
                height={1400}
                className="h-full w-full object-cover"
              />
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div>
              <SectionHeading label="About Us" title={about.heading} description={about.description} />
              <ul className="mt-10 grid gap-px border border-border bg-border sm:grid-cols-2">
                {about.features.map((f) => (
                  <li key={f} className="bg-background p-6 text-sm">
                    <span className="text-brass">—</span>
                    <p className="mt-3">{f}</p>
                  </li>
                ))}
              </ul>
              <Link
                to="/about"
                className="mt-10 inline-block border-b border-brass pb-1 text-[0.7rem] uppercase tracking-[0.22em] text-brass"
              >
                Know More About Us
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {/* Services */}
      <section className="bg-ivory py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            label="What We Do"
            title="Interior Solutions Built Around Your Space"
            description="Design, fabrication and installation handled end to end by a single team."
            align="center"
          />
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s, i) => (
              <Reveal key={s.id} delay={i * 80}>
                <ServiceCard service={s} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="container-x py-24 lg:py-32">
        <SectionHeading
          label="Why Us"
          title="Why Choose Shri Krishna Kitchen And Interior?"
          align="center"
        />
        <div className="mt-16 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-5">
          {whyChooseUs.map((item) => (
            <div key={item.title} className="bg-background p-8 transition-colors hover:bg-ivory">
              <span className="text-2xl text-brass">{item.mark}</span>
              <h3 className="mt-6 font-display text-xl">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Projects preview */}
      <section className="bg-ivory py-24 lg:py-32">
        <div className="container-x">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHeading label="Portfolio" title="Recent Work" />
            <Link
              to="/projects"
              className="border-b border-brass pb-1 text-[0.7rem] uppercase tracking-[0.22em] text-brass"
            >
              View All Projects
            </Link>
          </div>
          <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {projects.slice(0, 3).map((p, i) => (
              <Reveal key={p.id} delay={i * 80}>
                <ProjectCard project={p} />
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="container-x py-24 lg:py-32">
        <SectionHeading label="How We Work" title="Our Simple 5-Step Process" align="center" />
        <ol className="mt-16 grid gap-8 md:grid-cols-3 lg:grid-cols-5">
          {processSteps.map((s) => (
            <li key={s.step} className="border-t border-border pt-6">
              <span className="font-display text-3xl text-brass">{s.step}</span>
              <h3 className="mt-4 text-lg">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* Testimonials */}
      <section className="bg-charcoal py-24 lg:py-32">
        <div className="container-x">
          <SectionHeading
            label="Testimonials"
            title="What Clients Say"
            align="center"
            tone="light"
          />
          <div className="mt-14">
            <TestimonialCarousel items={testimonials} />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="container-x py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <SectionHeading label="FAQ" title="Questions, Answered" />
          <FAQAccordion items={faqs.slice(0, 5)} />
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
