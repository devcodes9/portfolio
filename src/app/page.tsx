import { getContentList } from "@/lib/content";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { SectionHeader } from "@/components/section-header";
import Link from "next/link";

export default async function Home() {
  const allPosts = await getContentList("writing");
  // variant-E lists shipped posts before in-progress drafts
  const posts = [...allPosts].sort((a, b) => {
    const aWip = a.status === "wip" ? 1 : 0;
    const bWip = b.status === "wip" ? 1 : 0;
    return aWip - bWip;
  });

  return (
    <div className="mx-auto max-w-5xl px-6 sm:px-10">
      <Hero />

      <SectionHeader label="Experience" count="5 years" />
      <Experience />

      <SectionHeader label="Projects" count="5 shipped" />
      <Projects />

      <SectionHeader label="Writing" count={`${posts.length} posts`} />
      <section className="pb-18">
        <ul className="divide-y divide-border">
          {posts.map((post, index) => {
            const status = post.status === "wip" ? "In progress" : "Shipped";
            const statusClass =
              post.status === "wip"
                ? "border-border text-muted-foreground"
                : "border-green-700 text-green-700 dark:border-green-400 dark:text-green-400";
            return (
              <li key={post.slug} className="grid grid-cols-[36px_1fr_auto] gap-4 py-4">
                <span className="pt-0.5 text-[13px] font-mono text-muted-foreground">
                  {String(index + 1).padStart(2, "0")}.
                </span>
                <Link href={`/writing/${post.slug}`} className="group block">
                  <p className="text-[15px] font-medium text-foreground group-hover:text-[var(--accent-warm)]">
                    {post.title}
                  </p>
                  <p className="mt-1 text-[13px] text-muted-foreground">{post.description}</p>
                </Link>
                <span
                  className={`inline-flex h-fit rounded-[3px] border px-2 py-1 text-[10px] font-mono uppercase tracking-[0.14em] ${statusClass}`}
                >
                  {status}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <SectionHeader label="Open Source" count="12 PRs · 3 repos" />
      <section className="pb-20">
        <p className="text-[15px] leading-[1.6] text-foreground/85">
          Merged contributions in{" "}
          <a className="border-b border-border hover:text-[var(--accent-warm)]" href="https://github.com/growthbook/growthbook" target="_blank" rel="noopener noreferrer">growthbook</a>{" "}
          (yc w20),{" "}
          <a className="border-b border-border hover:text-[var(--accent-warm)]" href="https://github.com/formbricks/formbricks" target="_blank" rel="noopener noreferrer">formbricks</a>,
          {" "}and{" "}
          <a className="border-b border-border hover:text-[var(--accent-warm)]" href="https://github.com/usertour/usertour" target="_blank" rel="noopener noreferrer">usertour</a>.
          {" "}Mostly ergonomics fixes, a few features. Full list with PR numbers at <span className="font-mono">/oss</span>.
        </p>
      </section>
    </div>
  );
}
