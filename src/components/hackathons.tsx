import { hackathons } from "@/data/hackathons";

export function Hackathons() {
  return (
    <section id="hackathons" className="pb-18">
      <div className="flex flex-col border-t border-border">
        {hackathons.map((h) => (
          <article
            key={h.slug}
            className="grid gap-6 border-b border-border py-6 sm:grid-cols-[200px_1fr]"
          >
            <div className="space-y-2">
              <p className="text-[14px] text-foreground">{h.name}</p>
              <p className="text-[11px] font-mono uppercase tracking-[0.12em] text-muted-foreground">
                {h.org} · {h.period}
              </p>
              <p className="text-[10px] font-mono uppercase tracking-[0.16em] text-[var(--accent-warm)]">
                {h.outcome}
              </p>
            </div>
            <div>
              <p className="text-[14px] leading-[1.6] text-foreground/90">{h.summary}</p>
              {h.pitchUrl && (
                <a
                  href={h.pitchUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-3 inline-flex items-center text-[11px] font-mono uppercase tracking-[0.08em] text-foreground underline underline-offset-[3px] decoration-border hover:text-[var(--accent-warm)] hover:decoration-[var(--accent-warm)]"
                >
                  Watch the pitch ↗
                </a>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
