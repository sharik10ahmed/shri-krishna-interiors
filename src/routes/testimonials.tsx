import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { TestimonialCard } from "@/components/TestimonialCard";
import { TestimonialCarousel } from "@/components/TestimonialCarousel";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { images } from "@/data/images";
import { useSite } from "@/lib/site-store";

const TITLE = "Testimonials | Shri Krishna Kitchen And Interior";
const DESC =
  "Demo client feedback on modular kitchens, wardrobes, TV units and residential woodwork by Shri Krishna Kitchen And Interior.";

export const Route = createFileRoute("/testimonials")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: TestimonialsPage,
});

function TestimonialsPage() {
  const { data } = useSite();

  return (
    <SiteLayout>
      <PageHero
        label="Testimonials"
        title="What Clients Say About Our Work"
        text="Demo content presented for portfolio purposes."
        image={images.project05b}
      />

      <section className="bg-charcoal py-24 lg:py-28">
        <div className="container-x">
          <TestimonialCarousel items={data.testimonials} />
        </div>
      </section>

      <section className="container-x py-24 lg:py-32">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {data.testimonials.map((t, i) => (
            <Reveal key={t.id} delay={i * 70}>
              <TestimonialCard testimonial={t} />
            </Reveal>
          ))}
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
