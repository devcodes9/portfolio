import { getContentBySlug, getContentSlugs } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { Toc, TocMobile } from "@/components/toc";
import { JsonLd } from "@/components/json-ld";
import { blogPostingSchema } from "@/lib/structured-data";
import { siteConfig } from "@/lib/config";

export async function generateStaticParams() {
  const slugs = getContentSlugs("writing");
  return slugs.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const result = await getContentBySlug("writing", slug);
  if (!result) return {};

  const { date, updated, tags } = result.frontmatter;

  return {
    title: result.frontmatter.title,
    description: result.frontmatter.description,
    alternates: { canonical: `/writing/${slug}` },
    keywords: Array.isArray(tags) ? tags : undefined,
    authors: [{ name: "Dev Dalia", url: "https://dev-dalia.com" }],
    openGraph: {
      title: result.frontmatter.title,
      description: result.frontmatter.description,
      type: "article",
      url: `https://dev-dalia.com/writing/${slug}`,
      ...(typeof date === "string" ? { publishedTime: date } : {}),
      ...(typeof updated === "string" ? { modifiedTime: updated } : {}),
      authors: ["Dev Dalia"],
      ...(Array.isArray(tags) ? { tags } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: result.frontmatter.title,
      description: result.frontmatter.description,
    },
  };
}

export default async function WritingPost({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const result = await getContentBySlug("writing", slug);

  if (!result) notFound();

  return (
    <div className="mx-auto max-w-6xl px-6 pt-12 pb-20 flex justify-center gap-12">
      <article className="w-full max-w-3xl min-w-0">
        <JsonLd data={blogPostingSchema(result.frontmatter, slug)} />
        <header className="mb-10">
          <h1 className="text-[32px] font-semibold tracking-[-0.02em] leading-[1.2] mb-3">
            {result.frontmatter.title}
          </h1>
          <p className="text-[13px] font-mono text-muted-foreground/60">
            {typeof result.frontmatter.updated === "string" &&
            result.frontmatter.updated !== result.frontmatter.date
              ? `Published ${result.frontmatter.date} · Updated ${result.frontmatter.updated}`
              : result.frontmatter.date}
          </p>
        </header>

        <TocMobile items={result.toc} />

        <div className="prose-custom">{result.content}</div>

        <footer className="mt-16 pt-8 border-t border-border flex flex-wrap items-center justify-between gap-x-6 gap-y-3 text-[13px]">
          <Link
            href="/writing"
            className="text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to writing
          </Link>
          <nav className="flex items-center gap-5 text-muted-foreground">
            <a
              href={siteConfig.social.x}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              X
            </a>
            <a
              href={siteConfig.social.github}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href={siteConfig.social.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              LinkedIn
            </a>
            <a
              href="https://cal.com/devdalia/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Hop on a call ↗
            </a>
          </nav>
        </footer>
      </article>

      <aside className="hidden xl:block w-56 shrink-0">
        <div className="sticky top-12 max-h-[calc(100vh-6rem)] overflow-y-auto">
          <Toc items={result.toc} />
        </div>
      </aside>
    </div>
  );
}
