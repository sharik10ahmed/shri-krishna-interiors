import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { SectionHeading } from "@/components/SectionHeading";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { resolveImage } from "@/data/images";
import { processSteps } from "@/data/site-data";
import { useSite } from "@/lib/site-store";

const TITLE = "About Us | Shri Krishna Kitchen And Interior";
const DESC =
  "Interior design, modular kitchen fabrication and customized furniture manufacturing in Pimpri-Chinchwad — designed, fabricated and installed by one team.";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: AboutPage,
});

const HIGHLIGHTS = [
  { title: "Interior Design", text: "Layouts and finishes planned around how each room is used." },
  { title: "Modular Kitchen Fabrication", text: "Precision fabrication in premium, moisture-resistant materials." },
  { title: "Customized Furniture", text: "Made-to-measure pieces for spaces standard furniture never fits." },
  { title: "Residential Woodwork", text: "Complete home woodwork, panelling and built-in storage." },
  { title: "Installation", text: "Site installation and handover by our own trained team." },
];

function AboutPage() {
  const { data } = useSite();
  const { about, contact } = data;

  return (
    <SiteLayout>
      <PageHero
        label="About Us"
        title={about.pageHeading}
        text={about.description}
        image={resolveImage(about.pageImage)}
      />

      <section className="container-x py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <img
              src={resolveImage(about.image)}
              alt="Workshop fabrication detail"
              loading="lazy"
              width={1200}
              height={1400}
              className="h-full w-full object-cover"
            />
          </Reveal>
          <Reveal delay={100}>
            <div>
              <SectionHeading label="Our Studio" title={about.heading} />
              <p className="mt-7 text-base leading-relaxed text-muted-foreground">
                {about.longDescription}
              </p>
              <dl className="mt-10 divide-y divide-border border-y border-border">
                {HIGHLIGHTS.map((h) => (
                  <div key={h.title} className="py-5">
                    <dt className="text-[0.7rem] uppercase tracking-[0.22em] text-brass">{h.title}</dt>
                    <dd className="mt-2 text-sm leading-relaxed text-muted-foreground">{h.text}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-8 text-sm text-muted-foreground">
                {contact.businessName} · {contact.address}
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      <section className="bg-ivory py-24 lg:py-32">
        <div className="container-x">
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
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
