export type Project = {
  slug: string;
  monogram: string;
  title: string;
  summary: string;
  stack: readonly string[];
  featured?: boolean;
  status: "shipped" | "live" | "archived";
  spanFull?: boolean;
  live?: string;
  github?: string;
};

export const projects: readonly Project[] = [
  {
    slug: "alawyer",
    monogram: "A",
    title: "Alawyer",
    summary: "AI-powered legal research platform for the Austrian market. Agentic workflows over RIS legal databases.",
    stack: ["TypeScript", "Next.js", "Claude API", "MCP", "Langfuse", "PostgreSQL"],
    featured: true,
    status: "shipped",
    live: "https://alawyer.at/",
  },
  {
    slug: "web-research-agent",
    monogram: "W",
    title: "Web Research Agent",
    summary: "Autonomous research assistant with grounded citations. Searches, reads, synthesizes web sources.",
    stack: ["TypeScript", "Vercel AI SDK", "E2B", "Next.js"],
    status: "live",
    github: "https://github.com/devcodes9/web-research-agent",
  },
  {
    slug: "activity-service",
    monogram: "S",
    title: "Activity Service",
    summary: "Communication backbone at Shipmnts. Chats, emails, and SNS/SES notifications across the platform.",
    stack: ["Ruby on Rails", "GraphQL", "PostgreSQL", "Redis", "AWS"],
    status: "shipped",
    live: "https://shipmnts.com/",
  },
  {
    slug: "zeiierman-trading-tools",
    monogram: "Z",
    title: "Zeiierman Trading Tools",
    summary: "Backend services for trading analytics. Real-time data processing pipelines and API integrations.",
    stack: ["Node.js", "Python", "APIs", "PostgreSQL"],
    status: "shipped",
    live: "https://zeiierman.com/",
  },
  {
    slug: "side-projects",
    monogram: "+",
    title: "EatEase, LocalUp, Devobase, and other side projects",
    summary: "Food subscription web app, local commerce marketplace, and a few other things I built to learn. Full list at /work.",
    stack: ["Next.js", "React", "Firebase", "Stripe", "MongoDB"],
    status: "shipped",
    spanFull: true,
    github: "https://github.com/devcodes9",
  },
];
