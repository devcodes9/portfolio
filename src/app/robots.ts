import type { MetadataRoute } from "next";

const BASE_URL = "https://dev-dalia.com";

// Crawlers used by LLMs / answer engines to build and ground their responses.
// Explicitly welcomed so this site is eligible for citation in ChatGPT,
// Claude, Perplexity, Gemini, and Google AI Overviews.
const AI_CRAWLERS = [
  "GPTBot", // OpenAI training + retrieval
  "OAI-SearchBot", // ChatGPT Search
  "ChatGPT-User", // ChatGPT live browsing
  "ClaudeBot", // Anthropic crawler
  "Claude-Web", // Claude live browsing
  "anthropic-ai", // Anthropic (legacy UA)
  "PerplexityBot", // Perplexity index
  "Perplexity-User", // Perplexity live fetch
  "Google-Extended", // Gemini / Vertex grounding
  "Applebot-Extended", // Apple Intelligence
  "Bytespider", // TikTok / Doubao
  "Amazonbot", // Amazon / Alexa
  "cohere-ai", // Cohere
  "DuckAssistBot", // DuckDuckGo AI
];

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      { userAgent: "*", allow: "/" },
      ...AI_CRAWLERS.map((userAgent) => ({ userAgent, allow: "/" })),
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
