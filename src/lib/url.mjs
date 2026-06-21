/**
 * Append UTM parameters to an outbound URL so clicks from this site are
 * trackable in the destination's analytics. Internal (#…) and mailto links
 * pass through unchanged.
 *
 * @param {string} url
 * @param {string} [content] - utm_content value (identifies which link/section)
 * @returns {string}
 */
export function withUtm(url, content) {
  if (typeof url !== 'string' || url.startsWith('#') || url.startsWith('mailto:')) {
    return url;
  }
  try {
    const u = new URL(url);
    u.searchParams.set('utm_source', 'evanbryceriddle.com');
    u.searchParams.set('utm_medium', 'website');
    if (content) u.searchParams.set('utm_content', content);
    return u.toString();
  } catch {
    return url;
  }
}
