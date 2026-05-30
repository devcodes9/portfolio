import { siteConfig } from "@/lib/config";
import type { ContentItem } from "@/lib/content";

// JSON-LD structured data. This is the highest-leverage GEO lever: it tells
// LLMs and search engines, unambiguously, who Dev is, what he does, and what
// he has authored. Builders pull from the same data files the UI renders, so
// the machine-readable graph never drifts from the human-readable site.

const BASE_URL = siteConfig.url;

// Topics Dev can speak to. Used for Person.knowsAbout so models can match
// queries like "AI engineer who works with MCP / Claude Agent SDK".
const KNOWS_ABOUT = [
  "AI Engineering",
  "Large Language Models",
  "Claude API",
  "Claude Agent SDK",
  "Model Context Protocol (MCP)",
  "Retrieval-Augmented Generation (RAG)",
  "TypeScript",
  "Next.js",
  "React",
  "Node.js",
  "tRPC",
  "PostgreSQL",
  "Python",
  "FastAPI",
  "Ruby on Rails",
  "LLM Observability",
  "AI Agents",
];

export function personSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "@id": `${BASE_URL}/#person`,
    name: siteConfig.author.name,
    alternateName: "Dev Dalia",
    url: BASE_URL,
    image: `${BASE_URL}/headshot.png`,
    jobTitle: siteConfig.author.role,
    description: siteConfig.description,
    email: `mailto:${siteConfig.social.email}`,
    worksFor: {
      "@type": "Organization",
      name: siteConfig.author.company,
      url: "https://buildway.ai/",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Pandit Deendayal Energy University (PDEU)",
    },
    address: {
      "@type": "PostalAddress",
      addressLocality: "Surat",
      addressRegion: "Gujarat",
      addressCountry: "IN",
    },
    knowsAbout: KNOWS_ABOUT,
    hasOccupation: {
      "@type": "Occupation",
      name: "AI Engineer",
      occupationLocation: { "@type": "Country", name: "India" },
    },
    knowsLanguage: ["en", "gu"],
    sameAs: [
      siteConfig.social.github,
      siteConfig.social.linkedin,
      siteConfig.social.x,
    ],
  };
}

export function websiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${BASE_URL}/#website`,
    url: BASE_URL,
    name: siteConfig.title,
    description: siteConfig.description,
    inLanguage: "en",
    author: { "@id": `${BASE_URL}/#person` },
    publisher: { "@id": `${BASE_URL}/#person` },
  };
}

// Combined node graph for the homepage: one <script> covering Person + WebSite.
export function homepageGraph() {
  return {
    "@context": "https://schema.org",
    "@graph": [
      { ...personSchema(), "@context": undefined },
      { ...websiteSchema(), "@context": undefined },
    ],
  };
}

export function blogPostingSchema(post: ContentItem, slug: string) {
  const url = `${BASE_URL}/writing/${slug}`;
  const published = typeof post.date === "string" ? post.date : undefined;
  const modified =
    typeof post.updated === "string" ? post.updated : published;

  return {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "@id": `${url}/#article`,
    headline: post.title,
    description: post.description,
    url,
    mainEntityOfPage: { "@type": "WebPage", "@id": url },
    image: `${url}/opengraph-image`,
    ...(published ? { datePublished: published } : {}),
    ...(modified ? { dateModified: modified } : {}),
    ...(Array.isArray(post.tags) && post.tags.length
      ? { keywords: post.tags.join(", ") }
      : {}),
    inLanguage: "en",
    author: {
      "@type": "Person",
      "@id": `${BASE_URL}/#person`,
      name: siteConfig.author.name,
      url: BASE_URL,
    },
    publisher: { "@id": `${BASE_URL}/#person` },
  };
}
