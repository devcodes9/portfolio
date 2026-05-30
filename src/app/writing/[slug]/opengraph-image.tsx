import { ImageResponse } from "next/og";
import { getContentFrontmatter, getContentSlugs } from "@/lib/content";

export const alt = "Dev Dalia — Writing";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Pre-generate one OG image per post at build time.
export function generateStaticParams() {
  return getContentSlugs("writing").map((slug) => ({ slug }));
}

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const fm = getContentFrontmatter("writing", slug);

  const title = fm?.title ?? "Dev Dalia";
  const date = fm?.date ?? "";
  const tags = Array.isArray(fm?.tags) ? (fm!.tags as string[]).slice(0, 4) : [];

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#0b0b0c",
          backgroundImage:
            "radial-gradient(circle at 0% 0%, #1a1a1f 0%, #0b0b0c 55%)",
          padding: "72px 80px",
          fontFamily: "sans-serif",
        }}
      >
        {/* Top: wordmark */}
        <div style={{ display: "flex", alignItems: "center" }}>
          <div
            style={{
              fontSize: 22,
              letterSpacing: 2,
              color: "#9b9ba3",
              fontWeight: 600,
            }}
          >
            dev-dalia.com
          </div>
        </div>

        {/* Middle: title */}
        <div
          style={{
            display: "flex",
            fontSize: title.length > 60 ? 60 : 72,
            lineHeight: 1.08,
            letterSpacing: -1.5,
            color: "#fafafa",
            fontWeight: 700,
            maxWidth: 1000,
          }}
        >
          {title}
        </div>

        {/* Bottom: date + tags */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 24,
            color: "#7c7c85",
          }}
        >
          {date && <div style={{ display: "flex" }}>{date}</div>}
          {date && tags.length > 0 && (
            <div style={{ display: "flex", margin: "0 16px" }}>·</div>
          )}
          {tags.length > 0 && (
            <div style={{ display: "flex" }}>{tags.join("  /  ")}</div>
          )}
        </div>
      </div>
    ),
    { ...size }
  );
}
