import { getContentList } from "@/lib/content";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { SectionHeader } from "@/components/section-header";
import Link from "next/link";

export default async function Home() {
  const posts = await getContentList("writing");

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
          {posts.map((post) => (
            <li key={post.slug}>
              <Link href={`/writing/${post.slug}`} className="block py-4">
                <p className="text-[15px] font-medium text-foreground">{post.title}</p>
                <p className="mt-1 text-[13px] text-muted-foreground">{post.description}</p>
              </Link>
            </li>
          ))}
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
