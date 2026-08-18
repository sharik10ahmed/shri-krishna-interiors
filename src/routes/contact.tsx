import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { ContactForm } from "@/components/ContactForm";
import { Reveal } from "@/components/Reveal";
import { images } from "@/data/images";
import { useSite } from "@/lib/site-store";

const TITLE = "Contact | Modular Kitchen & Interior Design in Nigdi";
const DESC =
  "Talk to Shri Krishna Kitchen And Interior about your modular kitchen, wardrobe or residential woodwork project in Nigdi, Pimpri-Chinchwad.";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { data } = useSite();
  const { contact } = data;

  return (
    <SiteLayout>
      <PageHero
        label="Contact"
        title="Let's Plan Your Space"
        text="Share your requirement and we'll get back with a design approach and material plan."
        image={images.serviceResidential}
      />

      <section className="container-x py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
          <Reveal>
            <div>
              <h2 className="font-display text-3xl">{contact.businessName}</h2>
              <dl className="mt-10 divide-y divide-border border-y border-border">
                <div className="py-6">
                  <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-brass">Address</dt>
                  <dd className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    {contact.address}
                  </dd>
                </div>
                <div className="py-6">
                  <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-brass">Phone</dt>
                  <dd className="mt-3 text-sm">
                    <a href={`tel:${contact.phone}`} className="hover:text-brass">
                      {contact.phone}
                    </a>
                  </dd>
                </div>
                <div className="py-6">
                  <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-brass">Email</dt>
                  <dd className="mt-3 break-all text-sm">
                    <a href={`mailto:${contact.email}`} className="hover:text-brass">
                      {contact.email}
                    </a>
                  </dd>
                </div>
              </dl>

              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href={`tel:${contact.phone}`}
                  className="bg-charcoal px-7 py-4 text-[0.7rem] uppercase tracking-[0.2em] text-background"
                >
                  Call Now
                </a>
                <a
                  href={`mailto:${contact.email}`}
                  className="border border-border px-7 py-4 text-[0.7rem] uppercase tracking-[0.2em] transition-colors hover:border-brass hover:text-brass"
                >
                  Email Us
                </a>
                <a
                  href="#consultation"
                  className="border border-brass px-7 py-4 text-[0.7rem] uppercase tracking-[0.2em] text-brass transition-colors hover:bg-brass hover:text-background"
                >
                  {contact.consultationCta}
                </a>
              </div>
            </div>
          </Reveal>

          <Reveal delay={100}>
            <div id="consultation" className="border border-border bg-ivory p-8 lg:p-10">
              <h2 className="font-display text-2xl">Request a Free Consultation</h2>
              <p className="mt-3 text-sm text-muted-foreground">
                This demo form does not store any data — it shows a confirmation only.
              </p>
              <div className="mt-8">
                <ContactForm />
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </SiteLayout>
  );
}
