import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { CTASection } from "@/components/CTASection";
import { Reveal } from "@/components/Reveal";
import { resolveImage } from "@/data/images";
import { defaultSiteData } from "@/data/site-data";
import { useSite } from "@/lib/site-store";

export const Route = createFileRoute("/projects/$id")({
  loader: ({ params }) => {
    const project = defaultSiteData.projects.find((p) => p.id === params.id);
    if (!project) throw notFound();
    return { title: project.title, description: project.description };
  },
  head: ({ loaderData }) => {
    if (!loaderData) {
      return { meta: [{ title: "Project not found" }, { name: "robots", content: "noindex" }] };
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
  component: ProjectDetail,
});

function ProjectDetail() {
  const { id } = Route.useParams();
  const { data } = useSite();
  const project = data.projects.find((p) => p.id === id);

  if (!project) {
    return (
      <SiteLayout>
        <div className="container-x py-48 text-center">
          <h1 className="font-display text-3xl">Project not found</h1>
          <Link to="/projects" className="mt-6 inline-block border-b border-brass pb-1 text-brass">
            Back to projects
          </Link>
        </div>
      </SiteLayout>
    );
  }

  const facts = [
    { label: "Category", value: project.category },
    { label: "Location", value: project.location },
    { label: "Project Type", value: project.projectType },
    { label: "Design Style", value: project.designStyle },
    { label: "Materials", value: project.materials },
    { label: "Status", value: project.status },
  ];

  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden">
        <img
          src={resolveImage(project.image)}
          alt={project.title}
          width={1920}
          height={1080}
          className="h-[70vh] w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal/90 via-charcoal/40 to-charcoal/20" />
        <div className="container-x absolute inset-x-0 bottom-0 pb-14">
          <span className="rule-label">{project.category}</span>
          <h1 className="mt-5 font-display text-4xl text-background sm:text-5xl lg:text-6xl">
            {project.title}
          </h1>
          <p className="mt-4 text-[0.7rem] uppercase tracking-[0.24em] text-beige/70">
            {project.location}
          </p>
        </div>
      </section>

      <section className="container-x py-24 lg:py-32">
        <div className="grid gap-14 lg:grid-cols-[1.15fr_0.85fr] lg:gap-20">
          <Reveal>
            <div>
              <h2 className="font-display text-3xl">About this project</h2>
              <p className="mt-6 text-base leading-relaxed text-muted-foreground">
                {project.description}
              </p>
              <h3 className="mt-12 text-[0.7rem] uppercase tracking-[0.24em] text-brass">
                Key Features
              </h3>
              <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                {project.features.map((f) => (
                  <li key={f} className="flex items-start gap-3 text-sm">
                    <span className="mt-2 h-px w-4 shrink-0 bg-brass" />
                    {f}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
          <Reveal delay={100}>
            <dl className="divide-y divide-border border border-border">
              {facts.map((f) => (
                <div key={f.label} className="grid gap-1 p-6 sm:grid-cols-[9rem_1fr] sm:gap-4">
                  <dt className="text-[0.65rem] uppercase tracking-[0.22em] text-brass">
                    {f.label}
                  </dt>
                  <dd className="text-sm leading-relaxed">{f.value}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>

        {project.gallery.length > 0 ? (
          <div className="mt-20 grid gap-8 sm:grid-cols-2">
            {project.gallery.map((g) => (
              <Reveal key={g}>
                <img
                  src={resolveImage(g)}
                  alt={`${project.title} detail`}
                  loading="lazy"
                  width={1200}
                  height={900}
                  className="h-full w-full object-cover"
                />
              </Reveal>
            ))}
          </div>
        ) : null}

        <div className="mt-20 flex flex-wrap items-center justify-between gap-6 border-t border-border pt-10">
          <Link
            to="/projects"
            className="text-[0.7rem] uppercase tracking-[0.22em] text-muted-foreground hover:text-brass"
          >
            ← All Projects
          </Link>
          <Link
            to="/contact"
            className="bg-charcoal px-8 py-4 text-[0.7rem] uppercase tracking-[0.2em] text-background"
          >
            Request a Similar Design
          </Link>
        </div>
      </section>

      <CTASection />
    </SiteLayout>
  );
}
