import { getContentBySlug, getContentSlugs } from "@/lib/content";
import { notFound } from "next/navigation";
import Link from "next/link";
import type { Metadata } from "next";
import { JsonLd } from "@/components/json-ld";
import { blogPostingSchema } from "@/lib/structured-data";

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
    title: `${result.frontmatter.title} · Dev Dalia`,
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
    <article className="max-w-3xl mx-auto px-6 pt-28 pb-20">
        <JsonLd data={blogPostingSchema(result.frontmatter, slug)} />
        <header className="mb-10">
          <h1 className="text-[32px] font-semibold tracking-[-0.02em] leading-[1.2] mb-3">
            {result.frontmatter.title}
          </h1>
          <p className="text-[13px] font-mono text-muted-foreground/60">
            {result.frontmatter.date}
          </p>
        </header>

        <div className="prose-custom">{result.content}</div>

        <footer className="mt-16 pt-8 border-t border-border">
          <Link
            href="/writing"
            className="text-[14px] text-muted-foreground hover:text-foreground transition-colors"
          >
            ← Back to writing
          </Link>
        </footer>
    </article>
  );
}
