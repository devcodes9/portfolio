import { ImageResponse } from "next/og";
import { siteConfig } from "@/lib/config";

export const alt = "Dev Dalia — AI Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Default OG card for the homepage and any page without its own
// opengraph-image (per-post cards under /writing/[slug] override this).
export default function Image() {
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
        <div
          style={{
            display: "flex",
            fontSize: 22,
            letterSpacing: 2,
            color: "#9b9ba3",
            fontWeight: 600,
          }}
        >
          dev-dalia.com
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 84,
              lineHeight: 1.05,
              letterSpacing: -2,
              color: "#fafafa",
              fontWeight: 700,
            }}
          >
            Dev Dalia
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 16,
              fontSize: 34,
              color: "#c7c7cf",
              fontWeight: 500,
            }}
          >
            {siteConfig.author.role}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            fontSize: 23,
            lineHeight: 1.4,
            color: "#7c7c85",
            maxWidth: 1010,
          }}
        >
          I build AI systems + full-stack SaaS: agent runtimes, retrieval
          pipelines, orchestration, observability, payment + auth infra,
          security, the whole product surface.
        </div>
      </div>
    ),
    { ...size }
  );
}
