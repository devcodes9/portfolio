import { SectionHeader } from "@/components/section-header";
import { ScrollReveal } from "@/components/scroll-reveal";

export function About() {
  return (
    <section id="about" className="py-28">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeader label="About" />
        </ScrollReveal>
        <div className="grid sm:grid-cols-[160px_1fr] gap-10">
          <ScrollReveal delay={100}>
            <p className="text-xs text-muted-foreground font-mono uppercase tracking-widest">
              Background
            </p>
          </ScrollReveal>
          <div className="space-y-5 text-[15px] text-muted-foreground leading-[1.75]">
            <ScrollReveal delay={150}>
              <p>
                I&apos;m a software engineer specializing in AI-powered applications.
                Currently serving as the Founding AI Engineer at{" "}
                <span className="text-foreground font-normal">BuildwayAI</span>, where I
                architect and build Alawyer — an AI legal research platform serving
                the Austrian market.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={200}>
              <p>
                Before that, I spent 1.5 years at{" "}
                <span className="text-foreground font-normal">Shipmnts</span> building
                full-stack logistics software, and freelanced building trading
                tools for <span className="text-foreground font-normal">Zeiierman Trading</span>.
              </p>
            </ScrollReveal>
            <ScrollReveal delay={250}>
              <p>
                I graduated from PDEU with a B.Tech in Computer Engineering
                (9.81 CGPA) and led the tech team at Encode, the university CS club.
                Won DotSlash 7.0, one of Gujarat&apos;s largest hackathons.
              </p>
            </ScrollReveal>
          </div>
        </div>
      </div>
    </section>
  );
}

