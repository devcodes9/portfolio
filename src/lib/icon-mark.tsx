import { ImageResponse } from "next/og";

// Single source of truth for the DD monogram mark, used by both the favicon
// (icon.tsx) and the Apple touch icon (apple-icon.tsx). Only the size and
// type scale per surface; the look stays identical.
export function renderMark({
  px,
  fontSize,
  letterSpacing,
}: {
  px: number;
  fontSize: number;
  letterSpacing: number;
}) {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#0b0b0c",
          color: "#fafafa",
          fontSize,
          fontWeight: 800,
          letterSpacing,
          fontFamily: "sans-serif",
        }}
      >
        DD
      </div>
    ),
    { width: px, height: px }
  );
}
