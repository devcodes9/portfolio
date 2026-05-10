import { projects } from "@/data/projects";

export function Projects() {
  return (
    <section id="projects" className="pb-18">
      <div className="grid gap-5 sm:grid-cols-2">
        {projects.map((project) => (
          <article
            key={project.slug}
            className={`flex flex-col rounded-[10px] border border-border bg-card px-5 py-5 transition hover:-translate-y-px hover:border-foreground ${
              project.spanFull ? "sm:col-span-2" : ""
            }`}
          >
            <h3 className="mb-3 text-[16px] font-semibold text-foreground">
              {project.title}
            </h3>
            <p className="mb-4 text-[14px] leading-[1.55] text-foreground/85">
              {project.summary}
            </p>
            <div className="mt-auto flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-border pt-2">
              <p className="text-[11px] font-mono tracking-[0.06em] text-muted-foreground">
                {project.stack.join(" · ")}
              </p>
              <div className="ml-auto flex items-center gap-3 text-[11px] font-mono uppercase tracking-[0.08em]">
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
        ))}
      </div>
    </section>
  );
}
