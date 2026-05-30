import { SectionHeader } from "@/components/section-header";
import { Badge } from "@/components/ui/badge";
import { repos } from "@/data/oss";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Open Source · Dev Dalia",
  description: "Open source contributions across growthbook, formbricks, and usertour.",
};

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

// GitHub's own star display style: 7800 -> "7.8k", 12300 -> "12.3k", 2000 -> "2k".
function formatStars(n: number): string {
  if (n < 1000) return String(n);
  return `${(n / 1000).toFixed(1).replace(/\.0$/, "")}k`;
}

// Live star count, refreshed daily. Falls back to the hardcoded value on failure.
async function getStars(repo: string, fallback: string): Promise<string> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}`, {
      headers: { Accept: "application/vnd.github+json" },
      next: { revalidate: 86400 },
    });
    if (!res.ok) return fallback;
    const data = (await res.json()) as { stargazers_count: number };
    return formatStars(data.stargazers_count);
  } catch {
    return fallback;
  }
}

export default async function OSSPage() {
  const totalPRs = repos.reduce((sum, r) => sum + r.prs.length, 0);
  const stars = await Promise.all(repos.map((r) => getStars(r.name, r.stars)));

  return (
    <div className="max-w-3xl mx-auto px-6 pt-12 pb-20">
      <SectionHeader label="Open Source" />

      <div className="flex items-center gap-6 mb-10 text-[13px] text-muted-foreground">
        <div className="flex items-center gap-2">
          <GitMergeIcon className="w-3.5 h-3.5 text-purple-400" />
          <span>
            <span className="text-foreground font-medium">{totalPRs}</span> merged PRs
          </span>
        </div>
        <span>
          <span className="text-foreground font-medium">{repos.length}</span> repositories
        </span>
      </div>

      <div className="space-y-6">
        {repos.map((repo, i) => (
          <div key={repo.name} className="oss-card rounded-lg border border-border overflow-hidden">
            <div className="px-5 py-3.5 border-b border-border flex items-center justify-between">
              <div>
                <a
                  href={`https://github.com/${repo.name}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[13px] font-medium text-foreground hover:text-muted-foreground transition-colors"
                >
                  {repo.name}
                </a>
                <p className="text-[11px] text-muted-foreground mt-0.5">{repo.description}</p>
              </div>
              <div className="flex items-center gap-1.5 text-[11px] text-muted-foreground font-mono">
                <StarIcon className="w-2.5 h-2.5 text-yellow-500" />
                {stars[i]}
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
        ))}
      </div>
    </div>
  );
}
