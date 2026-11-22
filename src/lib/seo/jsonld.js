/**
 * JSON.stringify does not escape `<`, which can allow markup injection in
 * JSON-LD script tags. Next.js recommends replacing it with its unicode form.
 */
export function safeJsonLdStringify(value) {
  return JSON.stringify(value).replace(/</g, "\\u003c");
}

/**
 * Spread these props onto a native JSON-LD <script> element.
 * A native script tag is correct for JSON-LD; it is not executable code.
 */
export function getJsonLdScriptProps(value) {
  return {
    type: "application/ld+json",
    dangerouslySetInnerHTML: { __html: safeJsonLdStringify(value) },
  };
}
