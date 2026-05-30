import { renderMark } from "@/lib/icon-mark";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

// DD monogram for iOS home screen / share targets.
export default function AppleIcon() {
  return renderMark({ px: 180, fontSize: 96, letterSpacing: -6 });
}
