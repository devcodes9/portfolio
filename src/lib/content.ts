import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeSlug from "rehype-slug";
import rehypeAutolinkHeadings from "rehype-autolink-headings";
import remarkGfm from "remark-gfm";
import { visit } from "unist-util-visit";
import GithubSlugger from "github-slugger";
import { mdxComponents } from "@/components/mdx";

const contentRoot = path.join(process.cwd(), "content");

export interface TocItem {
  id: string;
  text: string;
  depth: number;
}

export interface ContentItem {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  published?: boolean;
  [key: string]: unknown;
}

// Replaces ```mermaid code blocks with a <mermaid chart="..."> element so the
// syntax highlighter skips them and they render client-side instead. Must run
// before rehypePrettyCode in the pipeline.
function rehypeMermaid() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (tree: any) => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    visit(tree, "element", (node: any, index: number | undefined, parent: any) => {
      if (
        node.tagName === "pre" &&
        node.children?.length === 1 &&
        node.children[0].tagName === "code" &&
        (node.children[0].properties?.className || []).includes("language-mermaid")
      ) {
        const code = node.children[0];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value = (code.children || []).map((c: any) => c.value || "").join("");
        if (parent && typeof index === "number") {
          parent.children[index] = {
            type: "element",
            tagName: "mermaid",
            properties: { chart: value },
            children: [],
          };
        }
      }
    });
  };
}

// Strips inline markdown formatting so TOC slugs match rehype-slug's output,
// which slugs the rendered text content of each heading.
function stripInlineMarkdown(s: string): string {
  return s
    .replace(/`([^`]+)`/g, "$1") // inline code
    .replace(/\*\*([^*]+)\*\*/g, "$1") // bold
    .replace(/\*([^*]+)\*/g, "$1") // italic
    .replace(/__([^_]+)__/g, "$1")
    .replace(/_([^_]+)_/g, "$1")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1") // links
    .trim();
}

// Extracts h2/h3 headings from raw markdown, skipping fenced code blocks.
export function extractToc(raw: string): TocItem[] {
  const slugger = new GithubSlugger();
  const lines = raw.split("\n");
  const toc: TocItem[] = [];
  let inFence = false;

  for (const line of lines) {
    if (/^\s*(```|~~~)/.test(line)) {
      inFence = !inFence;
      continue;
    }
    if (inFence) continue;

    const match = /^(#{2,3})\s+(.+?)\s*#*\s*$/.exec(line);
    if (!match) continue;

    const depth = match[1].length;
    const text = stripInlineMarkdown(match[2]);
    toc.push({ id: slugger.slug(text), text, depth });
  }

  return toc;
}

export async function getContentList(directory: string): Promise<ContentItem[]> {
  const dir = path.join(contentRoot, directory);

  if (!fs.existsSync(dir)) return [];

  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));

  const items = files
    .map((file) => {
      const slug = file.replace(/\.mdx$/, "");
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = matter(raw);

      if (!data.title || !data.description) {
        throw new Error(
          `Missing required frontmatter in ${directory}/${file}. Need: title, description.`
        );
      }

      return {
        slug,
        title: data.title,
        date: data.date,
        description: data.description,
        tags: data.tags,
        published: data.published ?? true,
        ...data,
      } as ContentItem;
    })
    .filter((item) => item.published !== false)
    .sort((a, b) => {
      if (!a.date && !b.date) return 0;
      if (!a.date) return 1;
      if (!b.date) return -1;
      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

  return items;
}

export async function getContentBySlug(directory: string, slug: string) {
  const filePath = path.join(contentRoot, directory, `${slug}.mdx`);

  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf-8");
  const { data, content: rawContent } = matter(raw);

  const { content } = await compileMDX({
    source: rawContent,
    components: mdxComponents,
    options: {
      mdxOptions: {
        remarkPlugins: [remarkGfm],
        rehypePlugins: [
          rehypeMermaid,
          [rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: true }],
          rehypeSlug,
          [
            rehypeAutolinkHeadings,
            {
              behavior: "append",
              properties: {
                className: ["heading-anchor"],
                "aria-hidden": "true",
                tabIndex: -1,
              },
              content: { type: "text", value: "#" },
            },
          ],
        ],
      },
    },
  });

  return {
    frontmatter: data as ContentItem,
    content,
    toc: extractToc(rawContent),
  };
}

// Lightweight frontmatter-only read (no MDX compile). Used by OG image routes.
export function getContentFrontmatter(
  directory: string,
  slug: string
): ContentItem | null {
  const filePath = path.join(contentRoot, directory, `${slug}.mdx`);
  if (!fs.existsSync(filePath)) return null;
  const raw = fs.readFileSync(filePath, "utf-8");
  const { data } = matter(raw);
  return data as ContentItem;
}

export function getContentSlugs(directory: string): string[] {
  const dir = path.join(contentRoot, directory);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
