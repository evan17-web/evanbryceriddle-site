/**
 * Tiny text helpers for rendering site copy.
 */

const HTML_ESCAPES = { '&': '&amp;', '<': '&lt;', '>': '&gt;' };

/**
 * Convert a string with *asterisk* emphasis into safe HTML, turning
 * `*word*` into `<em>word</em>`. HTML special characters are escaped first,
 * so author copy stays safe to inject with Astro's set:html.
 *
 * @param {string} input
 * @returns {string} HTML-safe string with <em> tags
 */
export function emphasize(input) {
  const escaped = String(input).replace(/[&<>]/g, (c) => HTML_ESCAPES[c]);
  return escaped.replace(/\*([^*]+)\*/g, '<em>$1</em>');
}
