import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { getContentList } from "@/lib/content";
import { siteConfig } from "@/lib/config";

// Serves /llms-full.txt — the llms.txt digest plus the full Markdown body of
// every published article, so an LLM can ingest the actual writing in one
// fetch rather than crawling each page. Companion to /llms.txt.

const BASE_URL = siteConfig.url;
const contentRoot = path.join(process.cwd(), "content");

export async function GET() {
  const posts = (await getContentList("writing")).filter(
    (p) => p.status !== "wip"
  );

  const articles = posts
    .map((post) => {
      const filePath = path.join(contentRoot, "writing", `${post.slug}.mdx`);
      if (!fs.existsSync(filePath)) return "";
      const raw = fs.readFileSync(filePath, "utf-8");
      const { content } = matter(raw);
      return [
        `# ${post.title}`,
        `Source: ${BASE_URL}/writing/${post.slug}`,
        post.date ? `Published: ${post.date}` : "",
        "",
        content.trim(),
      ]
        .filter(Boolean)
        .join("\n");
    })
    .filter(Boolean)
    .join("\n\n---\n\n");

  const body = `# ${siteConfig.author.name} — Full Writing Corpus

> ${siteConfig.tagline}

Index and contact: ${BASE_URL}/llms.txt

${"=".repeat(72)}

${articles}
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "s-maxage=3600, stale-while-revalidate",
    },
  });
}
