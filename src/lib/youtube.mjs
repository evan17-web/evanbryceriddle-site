/**
 * Build-time YouTube helpers.
 *
 * `parseFeed` is a pure function (easy to test). `fetchVideos` wraps a network
 * call, and `getVideos` is the build-time entry point that gracefully falls
 * back to a manual list of IDs if the live feed is unavailable.
 */

/** @param {string} channelId */
const feedUrl = (channelId) =>
  `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;

/** @param {string} s */
function decodeXmlEntities(s) {
  return s
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&');
}

/**
 * Parse a YouTube channel Atom feed (XML string) into video objects.
 * Robust to empty or malformed input — returns [] instead of throwing.
 *
 * @param {unknown} xml
 * @returns {{ id: string, title: string }[]}
 */
export function parseFeed(xml) {
  if (typeof xml !== 'string' || xml.length === 0) return [];

  /** @type {{ id: string, title: string }[]} */
  const videos = [];
  const entryRegex = /<entry>([\s\S]*?)<\/entry>/g;
  let match;
  while ((match = entryRegex.exec(xml)) !== null) {
    const entry = match[1];
    const idMatch = entry.match(/<yt:videoId>([^<]+)<\/yt:videoId>/);
    if (!idMatch) continue;
    const titleMatch = entry.match(/<title>([\s\S]*?)<\/title>/);
    const title = titleMatch ? decodeXmlEntities(titleMatch[1].trim()) : '';
    videos.push({ id: idMatch[1].trim(), title });
  }
  return videos;
}

/**
 * Fetch and parse the newest uploads for a channel. Throws on any failure
 * (HTTP error, empty feed) so callers can decide how to fall back.
 *
 * @param {{ channelId: string, limit?: number, fetchImpl?: typeof fetch }} opts
 * @returns {Promise<{ id: string, title: string }[]>}
 */
export async function fetchVideos({ channelId, limit = 6, fetchImpl = fetch }) {
  const res = await fetchImpl(feedUrl(channelId));
  if (!res || !res.ok) {
    throw new Error(`YouTube feed request failed (HTTP ${res ? res.status : 'no response'})`);
  }
  const xml = await res.text();
  const videos = parseFeed(xml);
  if (videos.length === 0) throw new Error('YouTube feed contained no videos');
  return videos.slice(0, limit);
}

/**
 * Resolve the list of videos to render at build time.
 *  • mode 'manual' → always use `fallbackIds` (no network call)
 *  • mode 'rss'    → try the live feed, fall back to `fallbackIds` on any error
 * Never throws; always returns at least the (trimmed) fallback list.
 *
 * @param {{
 *   mode?: 'rss' | 'manual',
 *   channelId: string,
 *   count?: number,
 *   fallbackIds?: string[],
 *   fetchImpl?: typeof fetch,
 * }} opts
 * @returns {Promise<{ videos: { id: string, title: string }[], source: 'rss' | 'manual' }>}
 */
export async function getVideos(opts) {
  const { mode = 'rss', channelId, count = 6, fallbackIds = [], fetchImpl = fetch } = opts;
  const fallback = fallbackIds.slice(0, count).map((id) => ({ id, title: '' }));

  if (mode === 'manual') return { videos: fallback, source: 'manual' };

  try {
    const videos = await fetchVideos({ channelId, limit: count, fetchImpl });
    return { videos, source: 'rss' };
  } catch (err) {
    console.warn(
      `[videos] Live YouTube feed unavailable, using fallback list — ${
        err instanceof Error ? err.message : String(err)
      }`,
    );
    return { videos: fallback, source: 'manual' };
  }
}

/**
 * Parse an ISO 8601 duration (e.g. "PT5M30S") into seconds.
 * @param {unknown} iso
 * @returns {number}
 */
export function parseIsoDuration(iso) {
  const m = /^PT(?:(\d+)H)?(?:(\d+)M)?(?:(\d+)S)?$/.exec(typeof iso === 'string' ? iso : '');
  if (!m) return 0;
  return (Number(m[1]) || 0) * 3600 + (Number(m[2]) || 0) * 60 + (Number(m[3]) || 0);
}

/**
 * Fetch the channel's newest LONG-FORM uploads via the YouTube Data API,
 * excluding Shorts by duration. Requires an API key. Throws on failure so the
 * caller can fall back to the curated list.
 *
 * @param {{ apiKey: string, channelId: string, count?: number, minDurationSeconds?: number, fetchImpl?: typeof fetch }} opts
 * @returns {Promise<{ id: string, title: string }[]>}
 */
export async function fetchLongFormViaApi({
  apiKey,
  channelId,
  count = 6,
  minDurationSeconds = 90,
  fetchImpl = fetch,
}) {
  // A channel's "uploads" playlist id is its channel id with "UC" → "UU".
  const uploads = 'UU' + channelId.slice(2);
  const listUrl = `https://www.googleapis.com/youtube/v3/playlistItems?part=contentDetails&maxResults=30&playlistId=${uploads}&key=${apiKey}`;
  const listRes = await fetchImpl(listUrl);
  if (!listRes || !listRes.ok) throw new Error(`playlistItems HTTP ${listRes ? listRes.status : 'error'}`);
  const listData = await listRes.json();
  const ids = (listData.items || []).map((i) => i?.contentDetails?.videoId).filter(Boolean);
  if (ids.length === 0) throw new Error('no uploads returned');

  const videosUrl = `https://www.googleapis.com/youtube/v3/videos?part=contentDetails,snippet&id=${ids.join(',')}&key=${apiKey}`;
  const videosRes = await fetchImpl(videosUrl);
  if (!videosRes || !videosRes.ok) throw new Error(`videos HTTP ${videosRes ? videosRes.status : 'error'}`);
  const videosData = await videosRes.json();

  const longform = (videosData.items || [])
    .filter((v) => parseIsoDuration(v?.contentDetails?.duration) >= minDurationSeconds)
    .map((v) => ({ id: v.id, title: (v.snippet && v.snippet.title) || '' }));

  if (longform.length === 0) throw new Error('no long-form videos found');
  return longform.slice(0, count);
}
