import { ImageResponse } from "next/og";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// DD monogram for iOS home screen / share targets.
export default function AppleIcon() {
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
          fontSize: 96,
          fontWeight: 800,
          letterSpacing: -6,
          fontFamily: "sans-serif",
        }}
      >
        DD
      </div>
    ),
    { ...size }
  );
}
