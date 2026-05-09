import { projects } from "@/data/projects";
import Link from "next/link";

export function Projects() {
  return (
    <section id="projects" className="pb-18">
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => {
          const detailHref =
            project.slug === "side-projects" ? "/work" : `/work/${project.slug}`;
          return (
            <article
              key={project.slug}
              className={`group rounded-[10px] border border-border bg-card px-5 py-5 transition hover:-translate-y-px hover:border-foreground ${
                project.spanFull ? "sm:col-span-2" : ""
              }`}
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-7 w-7 items-center justify-center rounded-[7px] bg-foreground text-background text-[12px] font-mono font-semibold">
                  {project.monogram}
                </span>
                <Link
                  href={detailHref}
                  className="text-[16px] font-semibold text-foreground hover:text-[var(--accent-warm)]"
                >
                  {project.title}
                </Link>
                {project.featured && (
                  <span className="ml-auto rounded-[3px] bg-foreground px-2 py-1 text-[9px] font-mono uppercase tracking-[0.16em] text-background">
                    Featured
                  </span>
                )}
              </div>
              <p className="mb-4 text-[14px] leading-[1.55] text-foreground/85">
                {project.summary}
              </p>
              <div className="flex flex-wrap items-center justify-between gap-2 border-t border-border pt-2">
                <p className="text-[11px] font-mono tracking-[0.06em] text-muted-foreground">
                  {project.stack.join(" · ")}
                </p>
                <div className="flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.08em]">
                  {project.live && (
                    <a
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline underline-offset-[3px] decoration-border hover:text-[var(--accent-warm)] hover:decoration-[var(--accent-warm)]"
                    >
                      Live ↗
                    </a>
                  )}
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-foreground underline underline-offset-[3px] decoration-border hover:text-[var(--accent-warm)] hover:decoration-[var(--accent-warm)]"
                    >
                      GitHub ↗
                    </a>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>
    </section>
  );
}
