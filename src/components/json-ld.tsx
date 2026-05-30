// Renders a schema.org JSON-LD <script> in the document. Server component, so
// the structured data is present in the initial HTML that crawlers and LLM
// fetchers read (no JS execution required). JSON.stringify drops any keys whose
// value is `undefined`, which is how the builders omit optional fields.
export function JsonLd({ data }: { data: object }) {
  // Escape `<` so a stray "</script>" or "<!--" inside any string value can't
  // break out of the script element. Standard hardening for inline JSON-LD.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: json }}
    />
  );
}
