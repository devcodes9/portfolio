import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { compileMDX } from "next-mdx-remote/rsc";
import rehypePrettyCode from "rehype-pretty-code";
import { mdxComponents } from "@/components/mdx";

const contentRoot = path.join(process.cwd(), "content");

export interface ContentItem {
  slug: string;
  title: string;
  date: string;
  description: string;
  tags?: string[];
  published?: boolean;
  [key: string]: unknown;
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
        rehypePlugins: [
          [rehypePrettyCode, { theme: "github-dark-dimmed", keepBackground: true }],
        ],
      },
    },
  });

  return {
    frontmatter: data as ContentItem,
    content,
  };
}

export function getContentSlugs(directory: string): string[] {
  const dir = path.join(contentRoot, directory);
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir)
    .filter((f) => f.endsWith(".mdx"))
    .map((f) => f.replace(/\.mdx$/, ""));
}
