export type ExperienceEntry = {
  company: string;
  role: string;
  period: string;
  type: "Full-time" | "Freelance" | "Internship";
  summary: string;
  impact: string;
  url?: string;
};

export const experience: ExperienceEntry[] = [
  {
    company: "BuildwayAI",
    role: "Founding AI Engineer",
    period: "Aug 2025 - Present",
    type: "Full-time",
    summary: "Building Alawyer, an AI legal research platform for the Austrian legal market.",
    impact: "Architecting agentic workflows with Claude API + MCP. Custom retrieval pipelines over RIS legal databases. Langfuse for LLM observability.",
    url: "https://buildway.ai/",
  },
  {
    company: "Shipmnts",
    role: "Full-Stack Software Engineer",
    period: "Jan 2024 - Aug 2025",
    type: "Full-time",
    summary: "Built core platform features for a logistics SaaS product.",
    impact: "Designed and shipped the Activity Service, Shipmnts' communication backbone for chats, emails, and SNS/SES notifications. Ruby on Rails + GraphQL + Postgres.",
    url: "https://shipmnts.com/",
  },
  {
    company: "Zeiierman Trading",
    role: "Backend Developer",
    period: "2023 - 2024",
    type: "Freelance",
    summary: "Trading analytics tooling at zeiierman.com.",
    impact: "Real-time data pipelines and API integrations. Python, Node.js, Postgres.",
    url: "https://zeiierman.com/",
  },
  {
    company: "OneAssure",
    role: "SDE Intern",
    period: "May - Jul 2023",
    type: "Internship",
    summary: "Insurtech platform features. First production-shipping experience.",
    impact: "React + Node.js + MongoDB.",
    url: "https://oneassure.in/",
  },
  {
    company: "Meiro Mobility",
    role: "Backend / ML Engineer Intern",
    period: "Oct - Dec 2021",
    type: "Internship",
    summary: "Backend + ML at a mobility startup (formerly Flow Mobility).",
    impact: "Optimized a routing algorithm to run 17% faster. Built backend on Firebase Cloud Functions. Contributed to a real-time admin dashboard with Node.js + React.",
    url: "https://www.meiro.in/",
  },
];
