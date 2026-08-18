import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { FAQAccordion } from "@/components/FAQAccordion";
import { CTASection } from "@/components/CTASection";
import { SectionHeading } from "@/components/SectionHeading";
import { images } from "@/data/images";
import { useSite } from "@/lib/site-store";

const TITLE = "FAQ | Modular Kitchen & Interior Design Questions";
const DESC =
  "Answers on modular kitchen types, customized wardrobes, installation, quotations and the areas we serve around Pimpri-Chinchwad.";

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const { data } = useSite();

  return (
    <SiteLayout>
      <PageHero
        label="FAQ"
        title="Frequently Asked Questions"
        text="Everything clients usually ask before starting a kitchen or woodwork project."
        image={images.project03b}
      />

      <section className="container-x py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.75fr_1.25fr] lg:gap-20">
          <SectionHeading label="Answers" title="Good to know before we start" />
          <FAQAccordion items={data.faqs} />
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
