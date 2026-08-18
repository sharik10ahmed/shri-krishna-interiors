import { Link } from "@tanstack/react-router";
import { resolveImage } from "@/data/images";
import type { Project } from "@/data/site-data";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group border border-border bg-card transition-colors duration-500 hover:border-brass">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={resolveImage(project.image)}
          alt={`${project.title} — ${project.category} in ${project.location}`}
          loading="lazy"
          width={1200}
          height={900}
          className="h-full w-full object-cover transition-transform duration-[900ms] ease-out group-hover:scale-105"
        />
        <span className="absolute left-4 top-4 bg-background/90 px-3 py-1.5 text-[0.6rem] uppercase tracking-[0.2em] text-foreground">
          {project.category}
        </span>
      </div>
      <div className="p-7">
        <h3 className="text-2xl">{project.title}</h3>
        <p className="mt-2 text-[0.68rem] uppercase tracking-[0.2em] text-muted-foreground">
          {project.location}
        </p>
        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">{project.description}</p>
        <Link
          to="/projects/$id"
          params={{ id: project.id }}
          className="mt-6 inline-block border-b border-brass pb-1 text-[0.68rem] uppercase tracking-[0.22em] text-brass"
        >
          View Project
        </Link>
      </div>
    </article>
  );
}