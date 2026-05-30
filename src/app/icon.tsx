import { renderMark } from "@/lib/icon-mark";

// 96px = a multiple of 48, per Google's favicon size recommendation.
export const size = { width: 96, height: 96 };
export const contentType = "image/png";

// Favicon — DD monogram (matches the nav brand chip and OG card).
export default function Icon() {
  return renderMark({ px: 96, fontSize: 52, letterSpacing: -3 });
}
