import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, PageHero } from "@/components/SiteLayout";
import { ProjectCard } from "@/components/ProjectCard";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { images } from "@/data/images";
import { PROJECT_CATEGORIES } from "@/data/site-data";
import { useSite } from "@/lib/site-store";
import { cn } from "@/lib/utils";

const TITLE = "Projects | Modular Kitchen & Interior Portfolio";
const DESC =
  "A portfolio of modular kitchens, wardrobes, TV units, furniture and complete residential interiors delivered across Pimpri-Chinchwad.";

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
    ],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  const { data } = useSite();
  const [filter, setFilter] = useState("All");
  const filtered =
    filter === "All" ? data.projects : data.projects.filter((p) => p.category === filter);

  return (
    <SiteLayout>
      <PageHero
        label="Portfolio"
        title="Selected Projects"
        text="Demo portfolio entries showing the range of kitchens, storage and woodwork we design and install."
        image={images.ctaBanner}
      />

      <section className="container-x py-24 lg:py-32">
        <div className="flex flex-wrap gap-3">
          {["All", ...PROJECT_CATEGORIES].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setFilter(cat)}
              className={cn(
                "border px-5 py-3 text-[0.68rem] uppercase tracking-[0.18em] transition-colors",
                filter === cat
                  ? "border-brass bg-brass text-background"
                  : "border-border text-muted-foreground hover:border-brass hover:text-brass",
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="mt-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((p, i) => (
            <Reveal key={p.id} delay={i * 70}>
              <ProjectCard project={p} />
            </Reveal>
          ))}
        </div>

        {filtered.length === 0 ? (
          <p className="mt-16 text-center text-sm text-muted-foreground">
            No projects in this category yet.
          </p>
        ) : null}
      </section>

      <CTASection />
    </SiteLayout>
  );
}
