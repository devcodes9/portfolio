import { getContentList } from "@/lib/content";
import { Hero } from "@/components/hero";
import { Experience } from "@/components/experience";
import { Projects } from "@/components/projects";
import { Hackathons } from "@/components/hackathons";
import { SectionHeader } from "@/components/section-header";
import { JsonLd } from "@/components/json-ld";
import { homepageGraph } from "@/lib/structured-data";
import Link from "next/link";

export default async function Home() {
  const allPosts = await getContentList("writing");
  // Hide WIP drafts from the public list. Stubs stay in content/writing/
  // and become visible once their frontmatter status flips to "shipped".
  const posts = allPosts.filter((p) => p.status !== "wip");

  return (
    <div className="mx-auto max-w-[1100px] px-6 sm:px-10">
      <JsonLd data={homepageGraph()} />
      <Hero />

      <SectionHeader label="Experience" />
      <Experience />

      <SectionHeader label="Projects" />
      <Projects />

      <SectionHeader label="Writing" />
      <section className="pb-18">
        <ul className="divide-y divide-border">
          {posts.map((post, index) => (
            <li key={post.slug} className="grid grid-cols-[36px_1fr] gap-4 py-4">
              <span className="pt-0.5 text-[13px] font-mono text-muted-foreground">
                {String(index + 1).padStart(2, "0")}.
              </span>
              <Link href={`/writing/${post.slug}`} className="group block">
                <p className="text-[15px] font-medium text-foreground group-hover:text-[var(--accent-warm)]">
                  {post.title}
                </p>
                <p className="mt-1 text-[13px] text-muted-foreground">{post.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <SectionHeader label="Hackathons" />
      <Hackathons />

      <SectionHeader label="Open Source" />
      <section className="pb-18">
        <p className="text-[15px] leading-[1.6] text-foreground/85">
          Merged contributions in{" "}
          <a className="border-b border-border hover:text-[var(--accent-warm)]" href="https://github.com/growthbook/growthbook" target="_blank" rel="noopener noreferrer">growthbook</a>{" "}
          (yc w20),{" "}
          <a className="border-b border-border hover:text-[var(--accent-warm)]" href="https://github.com/formbricks/formbricks" target="_blank" rel="noopener noreferrer">formbricks</a>,
          {" "}and{" "}
          <a className="border-b border-border hover:text-[var(--accent-warm)]" href="https://github.com/usertour/usertour" target="_blank" rel="noopener noreferrer">usertour</a>.
        </p>
      </section>

      <section className="border-t border-border pt-8 pb-20">
        <p className="text-[15px] leading-[1.6] text-foreground/85">
          I love meeting other cool people. Working on something? Hiring? Want a collaborator? Just curious? Or want to chat?{" "}
          <a
            href="https://cal.com/devdalia/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="text-foreground underline underline-offset-[3px] decoration-[var(--accent-warm)] hover:text-[var(--accent-warm)]"
          >
            Hop on a call ↗
          </a>
          .
        </p>
      </section>
    </div>
  );
}
