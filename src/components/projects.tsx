import { projects } from "@/data/projects";
import Link from "next/link";

export function Projects() {
  return (
    <section id="projects" className="pb-18">
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <Link
            href={project.slug === "side-projects" ? "/work" : `/work/${project.slug}`}
            key={project.slug}
            className={`group rounded-[10px] border border-border bg-card px-5 py-5 transition hover:-translate-y-px hover:border-foreground ${project.spanFull ? "sm:col-span-2" : ""}`}
          >
            <div className="mb-3 flex items-center gap-2">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-[7px] bg-foreground text-background text-[12px] font-mono font-semibold">
                {project.monogram}
              </span>
              <h3 className="text-[16px] font-semibold text-foreground">{project.title}</h3>
              {project.featured && (
                <span className="ml-auto rounded-[3px] bg-[var(--accent-warm)] px-2 py-1 text-[9px] font-mono uppercase tracking-[0.16em] text-white">
                  Featured
                </span>
              )}
            </div>
            <p className="mb-4 text-[14px] leading-[1.55] text-foreground/85">
              {project.summary}
            </p>
            <p className="border-t border-border pt-2 text-[11px] font-mono tracking-[0.06em] text-muted-foreground">
              {project.stack.join(" · ")}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
