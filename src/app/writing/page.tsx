import { getContentList } from "@/lib/content";
import { SectionHeader } from "@/components/section-header";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Writing · Dev Dalia",
  description: "Blog posts about AI engineering, TypeScript, and building with LLMs.",
};

export default async function WritingPage() {
  const posts = await getContentList("writing");

  return (
    <div className="max-w-3xl mx-auto px-6 pt-12 pb-20">
        <SectionHeader label="Writing" />

        {posts.length === 0 ? (
          <p className="text-[15px] text-muted-foreground">
            No posts yet. Check back soon.
          </p>
        ) : (
          <ul className="space-y-0">
            {posts.map((post) => (
              <li key={post.slug} className="border-b border-border">
                <Link
                  href={`/writing/${post.slug}`}
                  className="block py-5 group"
                >
                  <span className="text-[15px] font-medium text-foreground/90 group-hover:text-foreground transition-colors block mb-1">
                    {post.title}
                  </span>
                  <span className="text-[12px] font-mono text-muted-foreground/50 block mb-2">
                    {new Date(post.date).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    {post.tags && post.tags.length > 0 && (
                      <span className="ml-3 text-muted-foreground/40">
                        {post.tags.join(", ")}
                      </span>
                    )}
                  </span>
                  <span className="text-[14px] text-muted-foreground block">
                    {post.description}
                  </span>
                </Link>
              </li>
            ))}
          </ul>
        )}
    </div>
  );
}
