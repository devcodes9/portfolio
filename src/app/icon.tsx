import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// DD monogram — matches the nav brand chip and OG card.
export default function Icon() {
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
          fontSize: 34,
          fontWeight: 800,
          letterSpacing: -2,
          fontFamily: "sans-serif",
        }}
      >
        DD
      </div>
    ),
    { ...size }
  );
}
