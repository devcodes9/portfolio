import { renderMark } from "@/lib/icon-mark";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

// Favicon — DD monogram (matches the nav brand chip and OG card).
export default function Icon() {
  return renderMark({ px: 64, fontSize: 34, letterSpacing: -2 });
}
