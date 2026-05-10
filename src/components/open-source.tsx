import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRightIcon, GitHubIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/scroll-reveal";
import { repos } from "@/data/oss";

function StarIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279L12 19.771l-7.416 3.642 1.48-8.279L0 9.306l8.332-1.151z" />
    </svg>
  );
}

function GitMergeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" xmlns="http://www.w3.org/2000/svg">
      <circle cx="18" cy="18" r="3" />
      <circle cx="6" cy="6" r="3" />
      <path d="M6 21V9a9 9 0 0 0 9 9" />
    </svg>
  );
}

export function OpenSource() {
  const totalPRs = repos.reduce((sum, r) => sum + r.prs.length, 0);

  return (
    <section id="open-source" className="py-28 section-tinted">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeader label="Open Source" />
        </ScrollReveal>

        <ScrollReveal delay={80}>
          <div className="flex items-center gap-6 mb-10 text-[13px] text-muted-foreground">
            <div className="flex items-center gap-2">
              <GitMergeIcon className="w-3.5 h-3.5 text-purple-400" />
              <span>
                <span className="text-foreground font-normal">{totalPRs}</span>{" "}
                merged PRs
              </span>
            </div>
            <div className="flex items-center gap-2">
              <GitHubIcon className="w-3.5 h-3.5" />
              <span>
                <span className="text-foreground font-normal">{repos.length}</span>{" "}
                repositories
              </span>
            </div>
          </div>
        </ScrollReveal>

        <div className="space-y-6">
          {repos.map((repo, i) => (
            <ScrollReveal key={repo.name} delay={i * 100 + 120}>
              <div className="oss-card rounded-lg border border-border bg-card/40 overflow-hidden">
                <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <GitHubIcon className="w-4 h-4 text-muted-foreground" />
                    <div>
                      <a
                        href={`https://github.com/${repo.name}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-[13px] font-normal text-foreground hover:text-muted-foreground transition-colors flex items-center gap-1.5"
                      >
                        {repo.name}
                        <ArrowUpRightIcon className="w-3 h-3 opacity-40" />
                      </a>
                      <p className="text-[11px] text-muted-foreground mt-0.5">
                        {repo.description}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
                    <StarIcon className="w-2.5 h-2.5 text-yellow-500" />
                    {repo.stars}
                  </div>
                </div>
                <div className="divide-y divide-border">
                  {repo.prs.map((pr) => (
                    <a
                      key={pr.number}
                      href={pr.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 px-5 py-2.5 group hover:bg-muted/20 transition-colors"
                    >
                      <GitMergeIcon className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                      <span className="text-[13px] text-muted-foreground group-hover:text-foreground transition-colors flex-1 min-w-0 truncate">
                        {pr.title}
                      </span>
                      <Badge variant="secondary" className="text-[10px] font-mono font-normal shrink-0">
                        #{pr.number}
                      </Badge>
                      <Badge
                        variant={pr.type === "feature" ? "default" : "outline"}
                        className="text-[10px] font-mono font-normal shrink-0"
                      >
                        {pr.type}
                      </Badge>
                    </a>
                  ))}
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}
