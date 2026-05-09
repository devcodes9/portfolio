import { extracurriculars } from "@/data/extracurriculars";

export function Extracurriculars() {
  if (extracurriculars.length === 0) return null;

  return (
    <section id="extracurriculars" className="pb-18">
      <p className="mb-4 text-[11px] font-mono uppercase tracking-[0.18em] text-muted-foreground">
        Extracurriculars
      </p>
      <ul className="flex flex-col">
        {extracurriculars.map((item) => (
          <li
            key={item.slug}
            className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-t border-border py-3"
          >
            <div className="flex flex-wrap items-baseline gap-x-2 text-[14px]">
              <span className="text-foreground">{item.role}</span>
              <span className="text-muted-foreground">·</span>
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-foreground underline underline-offset-[3px] decoration-border hover:decoration-foreground"
                >
                  {item.org}
                </a>
              ) : (
                <span className="text-foreground">{item.org}</span>
              )}
              <span className="ml-2 text-[13px] text-muted-foreground">
                {item.summary}
              </span>
            </div>
            <span className="text-[11px] font-mono uppercase tracking-[0.12em] text-muted-foreground">
              {item.period}
            </span>
          </li>
        ))}
      </ul>
    </section>
  );
}
