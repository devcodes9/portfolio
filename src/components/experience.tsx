import { experience } from "@/data/experience";

export function Experience() {
  return (
    <section id="experience" className="pb-18">
      <div className="flex flex-col border-t border-border">
        {experience.map((item) => (
          <article
            key={`${item.company}-${item.role}`}
            className="grid gap-6 border-b border-border py-6 sm:grid-cols-[200px_1fr]"
          >
            <div className="space-y-2">
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[14px] text-foreground underline underline-offset-[3px] decoration-border hover:text-[var(--accent-warm)] hover:decoration-[var(--accent-warm)]"
                >
                  {item.company}
                </a>
              ) : (
                <p className="text-[14px] text-foreground">{item.company}</p>
              )}
              <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-muted-foreground">
                {item.period}
              </p>
              <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-muted-foreground">
                {item.type}
              </p>
            </div>
            <div>
              <h3 className="text-[17px] font-semibold text-foreground">{item.role}</h3>
              <p className="mt-1 text-[14px] text-foreground/90">{item.summary}</p>
              <p className="mt-2 text-[14px] leading-[1.6] text-muted-foreground">
                {item.impact}
              </p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
