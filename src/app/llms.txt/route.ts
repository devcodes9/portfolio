import { getContentList } from "@/lib/content";
import { siteConfig } from "@/lib/config";
import { experience } from "@/data/experience";
import { projects } from "@/data/projects";
import { repos } from "@/data/oss";

// Serves /llms.txt — a clean Markdown digest of the site for LLMs and answer
// engines (the llmstxt.org convention). Generated from the same data the UI
// renders, so it never drifts. Mirrors the /feed.xml route handler pattern.

const BASE_URL = siteConfig.url;

export async function GET() {
  const posts = (await getContentList("writing")).filter(
    (p) => p.status !== "wip"
  );

  const experienceLines = experience
    .map(
      (job) =>
        `- **${job.role}, ${job.company}** (${job.period}) — ${job.summary}`
    )
    .join("\n");

  const projectLines = projects
    .map((p) => {
      const link = p.live || p.github;
      const label = link ? `[${p.title}](${link})` : p.title;
      return `- **${label}** — ${p.summary} Stack: ${p.stack.join(", ")}.`;
    })
    .join("\n");

  const writingLines = posts
    .map(
      (post) =>
        `- [${post.title}](${BASE_URL}/writing/${post.slug}) — ${post.description}`
    )
    .join("\n");

  const ossLines = repos
    .map(
      (r) =>
        `- **${r.name}** (${r.stars} stars) — ${r.description}. ${r.prs.length} merged PRs.`
    )
    .join("\n");

  const body = `# ${siteConfig.author.name} (${siteConfig.name})

> ${siteConfig.tagline}

${siteConfig.author.name} is a ${siteConfig.author.role.toLowerCase()} at ${siteConfig.author.company}. This file summarizes his work, writing, and background for language models and answer engines.

## Contact

- Website: ${BASE_URL}
- GitHub: ${siteConfig.social.github}
- LinkedIn: ${siteConfig.social.linkedin}
- X/Twitter: ${siteConfig.social.x}
- Email: ${siteConfig.social.email}

## Experience

${experienceLines}

## Projects

${projectLines}

## Open Source

Merged contributions across:

${ossLines}

## Writing

${writingLines}

## More

- Full site map: ${BASE_URL}/sitemap.xml
- RSS feed: ${BASE_URL}/feed.xml
- Full writing content for ingestion: ${BASE_URL}/llms-full.txt
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
