"use client";

import { SectionHeader } from "@/components/section-header";
import { buttonVariants } from "@/components/ui/button";
import { GitHubIcon, LinkedInIcon, XIcon, MailIcon } from "@/components/icons";
import { ScrollReveal } from "@/components/scroll-reveal";
import { cn } from "@/lib/utils";

const socials = [
  { label: "Email", href: "mailto:devdalia9@gmail.com", value: "devdalia9@gmail.com", icon: MailIcon },
  { label: "LinkedIn", href: "https://linkedin.com/in/devdalia", value: "linkedin.com/in/devdalia", icon: LinkedInIcon },
  { label: "GitHub", href: "https://github.com/devcodes9", value: "github.com/devcodes9", icon: GitHubIcon },
  { label: "X / Twitter", href: "https://x.com/devcodes9", value: "@devcodes9", icon: XIcon },
];

export function Contact() {
  return (
    <section id="contact" className="py-28 section-tinted">
      <div className="max-w-4xl mx-auto px-6">
        <ScrollReveal>
          <SectionHeader label="Contact" />
        </ScrollReveal>
        <div className="grid sm:grid-cols-[1fr_1.5fr] gap-10">
          <ScrollReveal delay={80}>
            <div className="space-y-5">
              <p className="text-[15px] text-muted-foreground leading-[1.75]">
                Interested in working together or just want to chat? I&apos;m
                always open to discussing new projects, collaborations, or
                opportunities.
              </p>
              <a
                href="mailto:devdalia9@gmail.com"
                className={cn(buttonVariants({ variant: "default", size: "sm" }))}
              >
                Send me an email
              </a>
            </div>
          </ScrollReveal>
          <div className="space-y-3">
            {socials.map((s, i) => (
              <ScrollReveal key={s.label} delay={i * 60 + 120}>
                <a
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 group py-2"
                >
                  <s.icon className="w-3.5 h-3.5 text-muted-foreground group-hover:text-foreground transition-colors" />
                  <div>
                    <p className="text-[11px] text-muted-foreground font-mono uppercase tracking-[0.15em]">
                      {s.label}
                    </p>
                    <p className="text-[13px] text-foreground group-hover:text-muted-foreground transition-colors">
                      {s.value}
                    </p>
                  </div>
                </a>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
